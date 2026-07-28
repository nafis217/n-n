import React from 'react';
import { db } from '@/lib/db';

export const revalidate = 0;

export default async function AdminPaymentsPage() {
  const payments = await db.payment.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      order: { include: { customer: true } },
      events: { orderBy: { createdAt: 'desc' } },
    },
  });

  const refunds = await db.refund.findMany({
    orderBy: { createdAt: 'desc' },
    include: { order: true },
  });

  return (
    <div className="w-full">
      <div className="border-b border-outline-variant pb-6 mb-8 flex flex-col md:flex-row justify-between items-start md:items-end">
        <div>
          <span className="font-label-caps text-label-caps text-outline uppercase block mb-2 font-semibold">
            Financial &amp; Payment Ledger
          </span>
          <h1 className="font-headline-lg text-3xl uppercase font-semibold text-primary">
            Payment History &amp; Transaction Events ({payments.length})
          </h1>
        </div>
      </div>

      {/* Payments History Table */}
      <div className="bg-surface-container-low border border-outline-variant overflow-x-auto mb-10">
        <div className="p-4 bg-surface-container border-b border-outline-variant font-label-caps text-xs font-bold text-primary uppercase">
          Transactions &amp; Gateway Audits
        </div>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-outline-variant font-label-caps text-[11px] uppercase text-primary">
              <th className="p-4">Order Ref</th>
              <th className="p-4">Customer</th>
              <th className="p-4">Payment Method</th>
              <th className="p-4">Amount (BDT)</th>
              <th className="p-4">Transaction ID</th>
              <th className="p-4">Status</th>
              <th className="p-4">Latest Gateway Event</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant font-nav-item text-xs text-secondary">
            {payments.map((p) => {
              const latestEvent = p.events[0];
              const isPaid = p.status === 'PAID';
              const isFailed = p.status === 'FAILED' || p.status === 'CANCELLED';

              return (
                <tr key={p.id} className="hover:bg-white transition-colors">
                  <td className="p-4 font-bold text-primary">{p.order.orderNumber}</td>
                  <td className="p-4 uppercase">{p.order.customer?.name || 'Customer'}</td>
                  <td className="p-4">
                    <span className="px-2 py-0.5 bg-neutral-200 text-primary font-label-caps text-[10px] font-bold uppercase">
                      {p.method}
                    </span>
                  </td>
                  <td className="p-4 font-bold text-primary">৳ {p.amountBDT.toLocaleString()}</td>
                  <td className="p-4 font-mono text-[11px]">{p.transactionId || p.gatewayTranId || 'N/A'}</td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-1 font-label-caps text-[10px] font-bold uppercase ${
                        isPaid
                          ? 'bg-emerald-100 text-emerald-800'
                          : isFailed
                          ? 'bg-red-100 text-red-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {p.status}
                    </span>
                  </td>
                  <td className="p-4 font-mono text-[11px]">
                    {latestEvent ? (
                      <span className="text-primary font-bold">[{latestEvent.eventType}] {latestEvent.gatewayName}</span>
                    ) : (
                      'INITIALIZED'
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Refunds History Table */}
      <div className="bg-surface-container-low border border-outline-variant p-6">
        <h3 className="font-label-caps text-xs uppercase font-bold text-primary mb-4">
          Refunds &amp; Chargebacks Ledger ({refunds.length})
        </h3>
        {refunds.length === 0 ? (
          <p className="font-label-caps text-xs text-secondary py-4 text-center uppercase">
            No refunds issued yet.
          </p>
        ) : (
          <div className="flex flex-col divide-y divide-outline-variant font-nav-item text-xs">
            {refunds.map((r) => (
              <div key={r.id} className="py-3 flex justify-between items-center">
                <div>
                  <span className="font-bold text-primary uppercase">{r.order.orderNumber}</span> — Reason: {r.reason}
                </div>
                <span className="font-bold text-error">৳ {r.amountBDT.toLocaleString()} ({r.status})</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
