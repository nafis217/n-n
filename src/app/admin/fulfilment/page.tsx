import React from 'react';
import { db } from '@/lib/db';
import { Button } from '@/components/ui/Button';

export const revalidate = 0;

export default async function AdminFulfilmentPage() {
  const pendingOrders = await db.order.findMany({
    where: { orderStatus: { in: ['PLACED', 'CONFIRMED', 'PROCESSING'] } },
    orderBy: { createdAt: 'asc' },
    include: {
      items: true,
      address: true,
    },
  });

  const dispatchedOrders = await db.order.findMany({
    where: { orderStatus: { in: ['PACKED', 'DISPATCHED', 'DELIVERED'] } },
    orderBy: { updatedAt: 'desc' },
    take: 10,
    include: { address: true },
  });

  return (
    <div className="w-full">
      <div className="border-b border-outline-variant pb-6 mb-8 flex flex-col md:flex-row justify-between items-start md:items-end">
        <div>
          <span className="font-label-caps text-label-caps text-outline uppercase block mb-2 font-semibold">
            Warehouse Operations
          </span>
          <h1 className="font-headline-lg text-3xl uppercase font-semibold text-primary">
            Fulfilment, Pick Lists &amp; Courier Dispatch
          </h1>
        </div>
        <Button variant="primary" size="md" className="mt-2 md:mt-0">
          + GENERATE BATCH WAVE PICK LIST
        </Button>
      </div>

      {/* Wave Picking & Order Packing Table */}
      <div className="bg-surface-container-low border border-outline-variant overflow-x-auto mb-10">
        <div className="p-4 bg-surface-container border-b border-outline-variant font-label-caps text-xs font-bold text-primary uppercase">
          Awaiting Barcode-Verified Picking &amp; Packing ({pendingOrders.length})
        </div>
        {pendingOrders.length === 0 ? (
          <p className="font-label-caps text-xs text-secondary p-8 text-center uppercase">
            All storefront orders are packed and dispatched.
          </p>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-outline-variant font-label-caps text-[11px] uppercase text-primary">
                <th className="p-4">Order Ref</th>
                <th className="p-4">Customer &amp; Area</th>
                <th className="p-4">SKU Pick Items</th>
                <th className="p-4">Payment</th>
                <th className="p-4">Fulfilment Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant font-nav-item text-xs text-secondary">
              {pendingOrders.map((ord) => (
                <tr key={ord.id} className="hover:bg-white transition-colors">
                  <td className="p-4 font-bold text-primary">{ord.orderNumber}</td>
                  <td className="p-4">
                    <span className="font-bold text-primary uppercase block">{ord.address?.recipient || 'Customer'}</span>
                    <span className="text-[11px] text-secondary">{ord.address?.thana}, {ord.address?.district}</span>
                  </td>
                  <td className="p-4 font-bold text-primary">
                    {ord.items.map((i) => `${i.variantSku} (x${i.quantity})`).join(', ')}
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-0.5 bg-neutral-200 text-primary font-label-caps text-[10px] font-bold uppercase">
                      {ord.paymentMethod} (৳ {ord.totalBDT.toLocaleString()})
                    </span>
                  </td>
                  <td className="p-4">
                    <Button variant="primary" size="sm">
                      PACK &amp; ASSIGN COURIER
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Dispatched Orders & COD Remittance */}
      <div className="bg-surface-container-low border border-outline-variant p-6">
        <h3 className="font-label-caps text-xs uppercase font-bold text-primary mb-4">
          Courier Dispatch &amp; COD Cash Reconciliation
        </h3>
        <div className="flex flex-col divide-y divide-outline-variant">
          {dispatchedOrders.map((d) => (
            <div key={d.id} className="py-3 flex justify-between items-center font-nav-item text-xs">
              <div>
                <span className="font-bold text-primary uppercase">{d.orderNumber}</span> — {d.address?.recipient} ({d.address?.district})
                <p className="text-[11px] text-secondary">Status: {d.orderStatus} | Payment: {d.paymentMethod}</p>
              </div>
              <span className="font-label-caps text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 uppercase">
                ৳ {d.totalBDT.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
