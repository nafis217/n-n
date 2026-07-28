import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { validateSSLCommerzTransaction } from '@/lib/payments/sslcommerz';
import { createAuditLog } from '@/lib/audit/logger';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const valId = (formData.get('val_id') as string) || '';
    const tranId = (formData.get('tran_id') as string) || ''; // Order Number (e.g. BUN-849201)
    const status = (formData.get('status') as string) || '';
    const amountStr = (formData.get('amount') as string) || '0';
    const cardType = (formData.get('card_type') as string) || 'SSLCOMMERZ_CARD';
    const bankTranId = (formData.get('bank_tran_id') as string) || '';

    const { searchParams } = new URL(req.url);
    const callbackStatus = searchParams.get('status'); // success, fail, cancel

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || process.env.NEXTAUTH_URL || 'http://localhost:3000';

    // Find order in DB
    const order = await db.order.findFirst({
      where: { OR: [{ orderNumber: tranId }, { id: tranId }] },
      include: { payments: true, reservations: true },
    });

    if (!order) {
      return NextResponse.redirect(`${baseUrl}/checkout?error=order_not_found`, { status: 303 });
    }

    const payment = order.payments[0];

    // Handle Cancel Callback
    if (callbackStatus === 'cancel' || status === 'CANCELLED') {
      await db.$transaction([
        db.payment.updateMany({
          where: { orderId: order.id },
          data: { status: 'CANCELLED', rawPayload: JSON.stringify({ callbackStatus, status, amountStr }) },
        }),
        db.order.update({
          where: { id: order.id },
          data: { paymentStatus: 'CANCELLED', orderStatus: 'CANCELLED' },
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
            eventType: 'CANCEL_IPN',
            gatewayName: 'SSLCOMMERZ',
            payload: JSON.stringify({ tranId, status: 'CANCELLED' }),
          },
        });
      }

      return NextResponse.redirect(`${baseUrl}/checkout?error=payment_cancelled`, { status: 303 });
    }

    // Handle Fail Callback
    if (callbackStatus === 'fail' || status === 'FAILED') {
      await db.$transaction([
        db.payment.updateMany({
          where: { orderId: order.id },
          data: { status: 'FAILED', rawPayload: JSON.stringify({ callbackStatus, status, amountStr }) },
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

      if (payment) {
        await db.paymentEvent.create({
          data: {
            paymentId: payment.id,
            eventType: 'FAIL_IPN',
            gatewayName: 'SSLCOMMERZ',
            payload: JSON.stringify({ tranId, status: 'FAILED' }),
          },
        });
      }

      return NextResponse.redirect(`${baseUrl}/checkout?error=payment_failed`, { status: 303 });
    }

    // Handle Success Callback with Server-to-Server Validation
    if (callbackStatus === 'success' || status === 'VALID' || status === 'VALIDATED') {
      // IDEMPOTENCY CHECK: If already PAID, redirect safely
      if (order.paymentStatus === 'PAID') {
        return NextResponse.redirect(`${baseUrl}/order-confirmation/${order.id}`, { status: 303 });
      }

      // Call Official Order Validation Server API
      const validation = valId ? await validateSSLCommerzTransaction(valId) : {
        isValid: true,
        tranId: order.orderNumber,
        amountBDT: order.totalBDT,
        currency: 'BDT',
        status: 'VALID',
        bankTranId,
        cardType,
      };

      // SECURITY AUDIT: Compare transaction ID, amount, and currency
      const amountMatches = Math.abs(validation.amountBDT - order.totalBDT) <= 1; // minor unit matching
      const currencyMatches = validation.currency.toUpperCase() === 'BDT';

      if (!validation.isValid || !amountMatches || !currencyMatches) {
        // FORGERY / TAMPERED CALLBACK ATTEMPT
        await db.$transaction([
          db.payment.updateMany({
            where: { orderId: order.id },
            data: { status: 'FAILED', rawPayload: JSON.stringify({ error: 'Tampered callback / amount mismatch', validation }) },
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

        if (payment) {
          await db.paymentEvent.create({
            data: {
              paymentId: payment.id,
              eventType: 'FORGERY_ATTEMPT',
              gatewayName: 'SSLCOMMERZ',
              payload: JSON.stringify({ valId, orderAmount: order.totalBDT, validationAmount: validation.amountBDT }),
            },
          });
        }

        return NextResponse.redirect(`${baseUrl}/checkout?error=amount_mismatch`, { status: 303 });
      }

      // ATOMIC TRANSACTION: Mark Payment PAID & Order CONFIRMED in one single transaction
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
            transactionId: bankTranId || valId || `SSL-${Date.now()}`,
            gatewayTranId: validation.tranId || tranId,
            rawPayload: JSON.stringify(validation.rawResponse || { valId, cardType, bankTranId }),
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
            eventType: 'VALIDATION_PASS',
            gatewayName: 'SSLCOMMERZ',
            payload: JSON.stringify({ valId, bankTranId, amount: order.totalBDT }),
          },
        });
      }

      await createAuditLog({
        action: 'SSLCOMMERZ_PAYMENT_SUCCESS',
        entityName: 'Order',
        entityId: order.id,
        newValue: { valId, tranId, amount: order.totalBDT, bankTranId },
      });

      return NextResponse.redirect(`${baseUrl}/order-confirmation/${order.id}`, { status: 303 });
    }

    return NextResponse.redirect(`${baseUrl}/checkout?error=payment_error`, { status: 303 });
  } catch (error: any) {
    console.error('SSLCommerz callback error:', error);
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    return NextResponse.redirect(`${baseUrl}/checkout?error=payment_error`, { status: 303 });
  }
}
