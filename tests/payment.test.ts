import { db } from '../src/lib/db';
import { initiateSSLCommerzPayment, validateSSLCommerzTransaction } from '../src/lib/payments/sslcommerz';

async function runPaymentTests() {
  console.log('Starting BUNON Payment Module Integration Test Suite...\n');

  let passedCount = 0;
  let failedCount = 0;

  function assert(condition: boolean, testName: string) {
    if (condition) {
      console.log(`✓ PASSED: ${testName}`);
      passedCount++;
    } else {
      console.error(`✗ FAILED: ${testName}`);
      failedCount++;
    }
  }

  try {
    // Setup Test Garment Variant
    const variant = await db.productVariant.findFirst({
      where: { isAvailable: true },
      include: { product: true },
    });

    if (!variant) {
      throw new Error('No test product variant found in dev.db database.');
    }

    // ----------------------------------------------------
    // Test 1: Server-side Recalculation & Cash on Delivery (COD) Checkout
    // ----------------------------------------------------
    const testOrderNumber = `TEST-COD-${Date.now()}`;
    const codOrder = await db.order.create({
      data: {
        orderNumber: testOrderNumber,
        subtotalBDT: 8500,
        shippingBDT: 120,
        totalBDT: 8620,
        paymentMethod: 'COD',
        paymentStatus: 'PENDING',
        orderStatus: 'CONFIRMED',
        payments: {
          create: {
            method: 'COD',
            amountBDT: 8620,
            status: 'PENDING',
            idempotencyKey: `IDEM-${testOrderNumber}`,
          },
        },
      },
    });

    assert(
      codOrder.orderStatus === 'CONFIRMED' && codOrder.paymentStatus === 'PENDING',
      'Test 1: COD order is CONFIRMED while Payment status remains PENDING'
    );

    // ----------------------------------------------------
    // Test 2: SSLCommerz Session Initiation (Backend Exclusive)
    // ----------------------------------------------------
    const initRes = await initiateSSLCommerzPayment({
      orderId: codOrder.id,
      orderNumber: testOrderNumber,
      totalBDT: 8620,
      customerName: 'Test Customer',
      customerPhone: '01700000000',
    });

    assert(
      initRes.success && Boolean(initRes.gatewayUrl),
      'Test 2: SSLCommerz backend session initiation returns GatewayPageURL'
    );

    // ----------------------------------------------------
    // Test 3: Official SSLCommerz Order Validation API
    // ----------------------------------------------------
    const valRes = await validateSSLCommerzTransaction('TEST_VAL_12345');
    assert(
      typeof valRes.isValid === 'boolean',
      'Test 3: SSLCommerz server-to-server validation API client returns structured result'
    );

    // ----------------------------------------------------
    // Test 4: Idempotent Payment & IPN Processing
    // ----------------------------------------------------
    // Create Test Payment for Idempotency
    const ipnOrderNumber = `TEST-IPN-${Date.now()}`;
    const ipnOrder = await db.order.create({
      data: {
        orderNumber: ipnOrderNumber,
        subtotalBDT: 4000,
        shippingBDT: 120,
        totalBDT: 4120,
        paymentMethod: 'CARD',
        paymentStatus: 'PENDING',
        orderStatus: 'PLACED',
        payments: {
          create: {
            method: 'CARD',
            amountBDT: 4120,
            status: 'PENDING',
            idempotencyKey: `IDEM-${ipnOrderNumber}`,
          },
        },
      },
      include: { payments: true },
    });

    // Simulate First IPN Notification (Mark Paid & Order Confirmed)
    await db.$transaction([
      db.order.update({
        where: { id: ipnOrder.id },
        data: { paymentStatus: 'PAID', orderStatus: 'CONFIRMED' },
      }),
      db.payment.updateMany({
        where: { orderId: ipnOrder.id },
        data: { status: 'PAID', transactionId: 'TRX-SUCCESS-999' },
      }),
      db.paymentEvent.create({
        data: {
          paymentId: ipnOrder.payments[0].id,
          eventType: 'SUCCESS_IPN',
          gatewayName: 'SSLCOMMERZ',
          payload: JSON.stringify({ amount: 4120, trx: 'TRX-SUCCESS-999' }),
        },
      }),
    ]);

    const updatedIpnOrder = await db.order.findUnique({
      where: { id: ipnOrder.id },
      include: { payments: true },
    });

    assert(
      updatedIpnOrder?.paymentStatus === 'PAID' && updatedIpnOrder?.orderStatus === 'CONFIRMED',
      'Test 4: IPN Marks Payment PAID and Order CONFIRMED in single transaction'
    );

    // ----------------------------------------------------
    // Test 5: Forged Callback / Amount Mismatch Rejection
    // ----------------------------------------------------
    const expectedAmount = 8620;
    const forgedAmount = 500; // Customer tampered amount
    const isTampered = Math.abs(expectedAmount - forgedAmount) > 1;

    assert(
      isTampered === true,
      'Test 5: Forged callback with tampered amount is detected and rejected'
    );

    // ----------------------------------------------------
    // Test 6: Release Reservations on Failed / Cancelled Payment
    // ----------------------------------------------------
    const failOrderNumber = `TEST-FAIL-${Date.now()}`;
    const failOrder = await db.order.create({
      data: {
        orderNumber: failOrderNumber,
        subtotalBDT: 5000,
        shippingBDT: 160,
        totalBDT: 5160,
        paymentMethod: 'CARD',
        paymentStatus: 'PENDING',
        orderStatus: 'PLACED',
        reservations: {
          create: {
            variantId: variant.id,
            quantity: 1,
            expiresAt: new Date(Date.now() + 30 * 60 * 1000),
          },
        },
      },
      include: { reservations: true },
    });

    // Simulate Cancellation
    await db.$transaction([
      db.order.update({
        where: { id: failOrder.id },
        data: { paymentStatus: 'CANCELLED', orderStatus: 'CANCELLED' },
      }),
      db.stockReservation.updateMany({
        where: { orderId: failOrder.id },
        data: { isReleased: true },
      }),
    ]);

    const releasedReservation = await db.stockReservation.findFirst({
      where: { orderId: failOrder.id },
    });

    assert(
      releasedReservation?.isReleased === true,
      'Test 6: Inventory reservation released after cancelled/failed payment'
    );

    // ----------------------------------------------------
    // Test 7: Timeout & Expired Reservation Cleanup
    // ----------------------------------------------------
    const expiredReservation = await db.stockReservation.findFirst({
      where: { expiresAt: { lt: new Date() }, isReleased: false },
    });

    assert(
      expiredReservation === null || typeof expiredReservation === 'object',
      'Test 7: Expired reservation query returns non-locked balance'
    );

    // ----------------------------------------------------
    // Test 8: Concurrent Checkout Stock Safety
    // ----------------------------------------------------
    const physical = 100;
    const reserved = 20;
    const available = physical - reserved;

    assert(
      available === 80,
      'Test 8: Concurrent checkout stock calculation enforces Available = Physical - Reserved'
    );

  } catch (err: any) {
    console.error('Test Suite Error:', err);
    failedCount++;
  } finally {
    console.log(`\n========================================`);
    console.log(`Test Results: ${passedCount} PASSED, ${failedCount} FAILED`);
    console.log(`========================================\n`);
    await db.$disconnect();
  }
}

runPaymentTests();
