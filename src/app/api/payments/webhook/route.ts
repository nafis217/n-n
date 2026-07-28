import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { validateSSLCommerzTransaction } from '@/lib/payments/sslcommerz';
import { createAuditLog } from '@/lib/audit/logger';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    let body: any = {};
    const contentType = req.headers.get('content-type') || '';

    if (contentType.includes('application/x-www-form-urlencoded') || contentType.includes('multipart/form-data')) {
      const formData = await req.formData();
      formData.forEach((value, key) => {
        body[key] = value;
      });
    } else {
      body = await req.json();
    }

    const valId = body.val_id || body.valId || '';
    const tranId = body.tran_id || body.tranId || body.orderNumber || '';
    const status = (body.status || '').toUpperCase();
    const bankTranId = body.bank_tran_id || body.bankTranId || '';
    const cardType = body.card_type || body.cardType || '';

    if (!tranId) {
      return NextResponse.json({ error: 'Missing tran_id in IPN webhook payload' }, { status: 400 });
    }

    // Find Order
    const order = await db.order.findFirst({
      where: { OR: [{ orderNumber: tranId }, { id: tranId }] },
      include: { payments: true },
    });

    if (!order) {
      return NextResponse.json({ error: 'Order not found for IPN notification' }, { status: 444 });
    }

    const payment = order.payments[0];

    // IDEMPOTENCY CHECK: If payment is ALREADY marked PAID, return HTTP 200 without duplicate updates
    if (order.paymentStatus === 'PAID' && payment?.status === 'PAID') {
      return NextResponse.json({
        success: true,
        message: 'IPN notification already processed idempotently',
        orderNumber: order.orderNumber,
        status: 'PAID',
      });
    }

    // Validate transaction with official SSLCommerz Order Validation API
    const validation = valId ? await validateSSLCommerzTransaction(valId) : {
      isValid: status === 'VALID' || status === 'VALIDATED' || status === 'SUCCESS',
      tranId: order.orderNumber,
      amountBDT: order.totalBDT,
      currency: 'BDT',
      status,
      bankTranId,
      cardType,
      rawResponse: body,
    };

    const amountMatches = Math.abs(validation.amountBDT - order.totalBDT) <= 1;
    const currencyMatches = validation.currency.toUpperCase() === 'BDT';

    if (!validation.isValid || !amountMatches || !currencyMatches) {
      // Record Forgery Attempt
      if (payment) {
        await db.paymentEvent.create({
          data: {
            paymentId: payment.id,
            eventType: 'FORGERY_ATTEMPT',
            gatewayName: 'SSLCOMMERZ',
            payload: JSON.stringify({ body, validation }),
            ipAddress: req.headers.get('x-forwarded-for') || '127.0.0.1',
          },
        });
      }

      await db.$transaction([
        db.payment.updateMany({
          where: { orderId: order.id },
          data: { status: 'FAILED', rawPayload: JSON.stringify({ error: 'Tampered IPN / amount mismatch', validation }) },
        }),
        db.order.update({
          where: { id: order.id },
          data: { paymentStatus: 'FAILED' },
        }),
        db.stockReservation.updateMany({
          where: { orderId: order.id },
          data: { isReleased: true },
        }),
      ]);

      return NextResponse.json({ error: 'IPN Validation Failed / Amount Mismatch' }, { status: 400 });
    }

    // ATOMIC TRANSACTION: Mark Payment PAID and Order CONFIRMED in one transaction
    await db.$transaction([
      db.order.update({
        where: { id: order.id },
        data: {
          paymentStatus: 'PAID',
          orderStatus: 'CONFIRMED',
        },
      }),
      db.payment.updateMany({
        where: { orderId: order.id },
        data: {
          status: 'PAID',
          transactionId: bankTranId || valId || `IPN-${Date.now()}`,
          gatewayTranId: validation.tranId || tranId,
          rawPayload: JSON.stringify(validation.rawResponse || body),
        },
      }),
      db.stockReservation.updateMany({
        where: { orderId: order.id },
        data: { isReleased: true },
      }),
    ]);

    if (payment) {
      await db.paymentEvent.create({
        data: {
          paymentId: payment.id,
          eventType: 'SUCCESS_IPN',
          gatewayName: 'SSLCOMMERZ',
          payload: JSON.stringify({ valId, bankTranId, amount: order.totalBDT }),
          ipAddress: req.headers.get('x-forwarded-for') || '127.0.0.1',
        },
      });
    }

    await createAuditLog({
      action: 'IPN_PAYMENT_VERIFIED',
      entityName: 'Order',
      entityId: order.id,
      newValue: { valId, tranId, amount: order.totalBDT, bankTranId },
    });

    return NextResponse.json({
      success: true,
      message: 'IPN processed successfully',
      orderNumber: order.orderNumber,
      paymentStatus: 'PAID',
    });
  } catch (error: any) {
    console.error('IPN webhook error:', error);
    return NextResponse.json({ error: error.message || 'IPN webhook processing failed' }, { status: 500 });
  }
}
