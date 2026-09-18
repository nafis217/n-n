import React from 'react';
import { db } from '@/lib/db';
import { PaymentsClientManager, PaymentTransactionRecord } from '@/components/admin/PaymentsClientManager';

export const revalidate = 0;

export default async function AdminPaymentsPage() {
  let payments: PaymentTransactionRecord[] = [
    {
      id: 'pay-1',
      orderNumber: 'FUKU-20260918-8472',
      customerName: 'Ahsanul Islam',
      method: 'BKASH',
      amountBDT: 28500,
      currency: 'BDT',
      transactionId: 'BKASH_TRX_9921498',
      status: 'PAID',
      createdAt: new Date(),
      gatewayEvent: 'VALIDATION_PASS (bKash IPN)',
    },
    {
      id: 'pay-2',
      orderNumber: 'FUKU-20260918-7911',
      customerName: 'Tasnim Rahman',
      method: 'CARD',
      amountBDT: 22800,
      currency: 'BDT',
      transactionId: 'SSL_VISA_8492019',
      status: 'PAID',
      createdAt: new Date(Date.now() - 3600000 * 4),
      gatewayEvent: 'SUCCESS_IPN (SSLCommerz)',
    },
    {
      id: 'pay-3',
      orderNumber: 'FUKU-20260917-6523',
      customerName: 'Farhan Kabir',
      method: 'COD',
      amountBDT: 18650,
      currency: 'BDT',
      transactionId: 'COD_AUTH_65230',
      status: 'PAID',
      createdAt: new Date(Date.now() - 3600000 * 24),
      gatewayEvent: 'CASH_COLLECTED (Steadfast)',
    },
    {
      id: 'pay-4',
      orderNumber: 'FUKU-20260917-3819',
      customerName: 'Nabil Hasan',
      method: 'NAGAD',
      amountBDT: 7800,
      currency: 'BDT',
      transactionId: 'NGD_AUTH_38190',
      status: 'PENDING',
      createdAt: new Date(Date.now() - 3600000 * 36),
      gatewayEvent: 'OTP_PENDING (Nagad)',
    },
  ];

  try {
    const dbPayments = await db.payment.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        order: { include: { customer: true } },
        events: { orderBy: { createdAt: 'desc' } },
      },
    });

    if (dbPayments && dbPayments.length > 0) {
      payments = dbPayments.map((p: any) => ({
        id: p.id,
        orderNumber: p.order?.orderNumber || 'FUKU-ORDER',
        customerName: p.order?.customer?.name || 'Customer',
        method: p.method as any,
        amountBDT: p.amountBDT,
        currency: p.currency || 'BDT',
        transactionId: p.transactionId || 'Awaiting',
        status: p.status as any,
        createdAt: p.createdAt,
        gatewayEvent: p.events?.[0]?.eventType ? `${p.events[0].eventType} (${p.events[0].gatewayName})` : undefined,
      }));
    }
  } catch (err) {
    console.warn('Using fallback payments data:', err);
  }

  return (
    <div className="w-full">
      <PaymentsClientManager initialPayments={payments} />
    </div>
  );
}
