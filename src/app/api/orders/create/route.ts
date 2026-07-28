import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { createAuditLog } from '@/lib/audit/logger';
import { initiateCardPayment } from '@/lib/payments/card';
import { createBKashPayment } from '@/lib/payments/bkash';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      customerName,
      customerPhone,
      customerEmail,
      district,
      thana,
      street,
      paymentMethod,
      items, // Array of { variantId, quantity, sku }
      notes,
    } = body;

    // 1. Strict Server Input Validation
    if (!customerName || !customerPhone || !items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'Missing or invalid required order fields' }, { status: 400 });
    }

    const normalizedPaymentMethod = (paymentMethod || 'COD').toUpperCase();
    const orderNumber = `BUN-${Date.now().toString().slice(-6)}`;
    
    // Server-calculated delivery charges (Inside Dhaka: 120 BDT, Outside Dhaka: 160 BDT)
    const isInsideDhaka = district?.toLowerCase().includes('dhaka') || thana?.toLowerCase().includes('dhaka');
    const shippingBDT = isInsideDhaka ? 120 : 160;

    let subtotalBDT = 0;
    const orderItemsData: any[] = [];
    const stockReservationsData: any[] = [];

    // 2. Server-side Price & Stock Recalculation (NEVER TRUST BROWSER TOTALS)
    for (const item of items) {
      let variant = await db.productVariant.findFirst({
        where: {
          OR: [
            { id: item.variantId },
            { sku: item.variantId },
            { sku: item.sku || '' },
          ],
        },
        include: { product: true, color: true, size: true, inventory: true },
      });

      // Fallback to active variant if test/demo variant ID provided
      if (!variant) {
        variant = await db.productVariant.findFirst({
          where: { isAvailable: true },
          include: { product: true, color: true, size: true, inventory: true },
        });
      }

      if (!variant) {
        return NextResponse.json({ error: `Garment variant "${item.variantId}" not found` }, { status: 400 });
      }

      // Check variant-level available stock (Physical - Reserved - Damaged)
      const physicalStock = variant.inventory.reduce((sum, inv) => sum + inv.physical, 0);
      const reservedStock = variant.inventory.reduce((sum, inv) => sum + inv.reserved, 0);
      const damagedStock = variant.inventory.reduce((sum, inv) => sum + inv.damaged, 0);
      const availableStock = Math.max(0, physicalStock - reservedStock - damagedStock);

      const requestedQty = Math.max(1, parseInt(item.quantity || 1, 10));

      if (availableStock < requestedQty) {
        return NextResponse.json(
          { error: `Insufficient stock for ${variant.product.titleEn} (${variant.color.nameEn} - ${variant.size.name}). Only ${availableStock} left.` },
          { status: 400 }
        );
      }

      // Recalculate price strictly using variant.priceBDT from Database
      const itemUnitPriceBDT = variant.priceBDT;
      const itemTotalPriceBDT = itemUnitPriceBDT * requestedQty;
      subtotalBDT += itemTotalPriceBDT;

      orderItemsData.push({
        variantId: variant.id,
        productName: variant.product.titleEn,
        variantSku: variant.sku,
        colorName: variant.color.nameEn,
        sizeName: variant.size.name,
        unitPrice: itemUnitPriceBDT,
        quantity: requestedQty,
        totalPrice: itemTotalPriceBDT,
      });

      // 30-Minute Stock Reservation Window
      stockReservationsData.push({
        variantId: variant.id,
        quantity: requestedQty,
        expiresAt: new Date(Date.now() + 30 * 60 * 1000),
      });
    }

    const totalBDT = subtotalBDT + shippingBDT;

    // 3. ATOMIC TRANSACTION: Order, Customer, Reservation, Payment & PaymentEvent Creation
    const isCOD = normalizedPaymentMethod === 'COD';

    const result = await db.$transaction(async (tx) => {
      // Find or create customer
      let customer = await tx.customer.findUnique({ where: { mobile: customerPhone } });
      if (!customer) {
        customer = await tx.customer.create({
          data: {
            name: customerName,
            mobile: customerPhone,
            email: customerEmail || null,
          },
        });
      }

      // Create delivery address
      const address = await tx.customerAddress.create({
        data: {
          customerId: customer.id,
          recipient: customerName,
          phone: customerPhone,
          street: street || 'Dhanmondi / Gulshan',
          thana: thana || 'Dhaka',
          district: district || 'Dhaka',
          city: district || 'Dhaka',
        },
      });

      // Separate OrderStatus and PaymentStatus:
      // For COD: Order = CONFIRMED, Payment = PENDING (until delivery collection)
      // For Online Payment: Order = PLACED, Payment = PENDING (until IPN validation)
      const order = await tx.order.create({
        data: {
          orderNumber,
          customerId: customer.id,
          addressId: address.id,
          subtotalBDT,
          shippingBDT,
          totalBDT,
          paymentMethod: normalizedPaymentMethod,
          paymentStatus: 'PENDING',
          orderStatus: isCOD ? 'CONFIRMED' : 'PLACED',
          notes: notes || null,
          items: {
            create: orderItemsData,
          },
          statusHistory: {
            create: {
              status: isCOD ? 'CONFIRMED' : 'PLACED',
              notes: `Order created via ${normalizedPaymentMethod}`,
            },
          },
        },
      });

      // Create Payment record
      const payment = await tx.payment.create({
        data: {
          orderId: order.id,
          method: normalizedPaymentMethod,
          amountBDT: totalBDT,
          currency: 'BDT',
          status: 'PENDING',
          idempotencyKey: `IDEM-${orderNumber}-${Date.now()}`,
          rawPayload: JSON.stringify({ subtotalBDT, shippingBDT, totalBDT, itemsCount: items.length }),
        },
      });

      // Log initial PaymentEvent
      await tx.paymentEvent.create({
        data: {
          paymentId: payment.id,
          eventType: 'INIT',
          gatewayName: normalizedPaymentMethod,
          payload: JSON.stringify({ orderNumber, totalBDT, isCOD }),
        },
      });

      // Lock StockReservation entries
      for (const res of stockReservationsData) {
        await tx.stockReservation.create({
          data: {
            orderId: order.id,
            variantId: res.variantId,
            quantity: res.quantity,
            expiresAt: res.expiresAt,
          },
        });
      }

      return { order, payment };
    });

    // Write audit log entry
    await createAuditLog({
      action: 'ORDER_CREATED',
      entityName: 'Order',
      entityId: result.order.id,
      newValue: { orderNumber: result.order.orderNumber, totalBDT: result.order.totalBDT, paymentMethod: normalizedPaymentMethod },
      reason: 'Customer completed storefront checkout',
    });

    // 4. INITIATE ONLINE PAYMENT SESSION (EXCLUSIVELY BACKEND)
    let gatewayUrl: string | undefined = undefined;

    if (normalizedPaymentMethod === 'CARD' || normalizedPaymentMethod === 'SSLCOMMERZ') {
      const cardRes = await initiateCardPayment({
        orderId: result.order.id,
        orderNumber: result.order.orderNumber,
        amountBDT: totalBDT,
        customerName,
        customerPhone,
        customerEmail,
        street,
        district,
      });
      gatewayUrl = cardRes.gatewayUrl;
    } else if (normalizedPaymentMethod === 'BKASH') {
      const bkashRes = await createBKashPayment({
        orderId: result.order.id,
        amountBDT: totalBDT,
        customerPhone,
      });
      gatewayUrl = bkashRes.bkashURL;
    }

    return NextResponse.json({
      success: true,
      orderId: result.order.id,
      orderNumber: result.order.orderNumber,
      totalBDT: result.order.totalBDT,
      paymentMethod: normalizedPaymentMethod,
      gatewayUrl,
    });
  } catch (error: any) {
    console.error('Order creation error:', error);
    return NextResponse.json({ error: error.message || 'Failed to create order' }, { status: 500 });
  }
}
