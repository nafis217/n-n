import React from 'react';
import { db } from '@/lib/db';
import { Button } from '@/components/ui/Button';

export const revalidate = 0;

export default async function AdminOrdersPage() {
  const orders = await db.order.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      customer: true,
      address: true,
      items: true,
      payments: true,
    },
  });

  return (
    <div className="w-full">
      <div className="border-b border-outline-variant pb-6 mb-8 flex flex-col md:flex-row justify-between items-start md:items-end">
        <div>
          <span className="font-label-caps text-label-caps text-outline uppercase block mb-2 font-semibold">
            Warehouse &amp; Fulfilment Operations
          </span>
          <h1 className="font-headline-lg text-3xl uppercase font-semibold text-primary">
            Storefront Orders Queue ({orders.length})
          </h1>
        </div>
      </div>

      <div className="bg-surface-container-low border border-outline-variant overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-outline-variant bg-surface-container font-label-caps text-[11px] uppercase text-primary">
              <th className="p-4">Order Reference</th>
              <th className="p-4">Customer &amp; Phone</th>
              <th className="p-4">Items Count</th>
              <th className="p-4">Total (BDT)</th>
              <th className="p-4">Payment</th>
              <th className="p-4">Order Status</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant font-nav-item text-xs text-secondary">
            {orders.map((ord) => (
              <tr key={ord.id} className="hover:bg-white transition-colors">
                <td className="p-4 font-bold text-primary">{ord.orderNumber}</td>
                <td className="p-4">
                  <span className="font-bold text-primary uppercase block">{ord.address?.recipient || ord.customer?.name || 'Guest'}</span>
                  <span className="text-[11px] text-secondary">{ord.address?.phone || ord.customer?.mobile}</span>
                </td>
                <td className="p-4">{ord.items.length} Items</td>
                <td className="p-4 font-bold text-primary">৳ {ord.totalBDT.toLocaleString()}</td>
                <td className="p-4">
                  <span className="px-2 py-0.5 bg-neutral-200 text-primary font-label-caps text-[10px] font-bold uppercase block w-fit">
                    {ord.paymentMethod}
                  </span>
                  <span className="text-[10px] text-emerald-700 font-bold uppercase">{ord.paymentStatus}</span>
                </td>
                <td className="p-4">
                  <span className="px-2 py-1 bg-emerald-100 text-emerald-800 font-label-caps text-[10px] font-bold uppercase">
                    {ord.orderStatus}
                  </span>
                </td>
                <td className="p-4">
                  <Button variant="secondary" size="sm">
                    Fulfill / Dispatch
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
