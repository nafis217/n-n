import React from 'react';
import { db } from '@/lib/db';
import { Button } from '@/components/ui/Button';

export const revalidate = 0;

export default async function AdminFulfilmentPage() {
  let pendingOrders: any[] = [
    {
      id: 'ord-101',
      orderNumber: 'FUKU-20260918-8472',
      paymentMethod: 'BKASH',
      address: { recipient: 'Ahsanul Islam', city: 'Dhaka', street: 'Gulshan 2' },
      items: [{ id: 'it-1', productName: 'Tactical Cyber Kimono', quantity: 1, variantSku: 'FUKU-CYB-KIM-M' }],
    },
    {
      id: 'ord-102',
      orderNumber: 'FUKU-20260918-7911',
      paymentMethod: 'CARD',
      address: { recipient: 'Tasnim Rahman', city: 'Dhaka', street: 'Banani Block C' },
      items: [{ id: 'it-2', productName: 'Jamdani Geometric Panjabi', quantity: 1, variantSku: 'FUKU-JMD-BLK-42' }],
    },
  ];

  let dispatchedOrders: any[] = [];

  try {
    const dbPending = await db.order.findMany({
      where: { orderStatus: { in: ['PLACED', 'CONFIRMED', 'PROCESSING'] } },
      orderBy: { createdAt: 'asc' },
      include: {
        items: true,
        address: true,
      },
    });
    if (dbPending && dbPending.length > 0) pendingOrders = dbPending;

    const dbDispatched = await db.order.findMany({
      where: { orderStatus: { in: ['PACKED', 'DISPATCHED', 'DELIVERED'] } },
      orderBy: { updatedAt: 'desc' },
      take: 10,
      include: { address: true },
    });
    if (dbDispatched && dbDispatched.length > 0) dispatchedOrders = dbDispatched;
  } catch (err) {
    console.warn('Using fallback fulfilment data:', err);
  }

  return (
    <div className="w-full">
      <div className="border-b border-neutral-200 pb-6 mb-8 flex flex-col md:flex-row justify-between items-start md:items-end">
        <div>
          <span className="font-mono text-xs text-neutral-500 uppercase block mb-2 font-medium tracking-wider">
            Warehouse Operations
          </span>
          <h1 className="text-3xl uppercase font-semibold text-black tracking-tight">
            Fulfilment, Pick Lists &amp; Courier Dispatch
          </h1>
        </div>
        <Button variant="primary" size="md" className="mt-2 md:mt-0">
          + GENERATE BATCH WAVE PICK LIST
        </Button>
      </div>

      {/* Wave Picking & Order Packing Table */}
      <div className="bg-white border border-neutral-200 overflow-x-auto mb-10 shadow-sm">
        <div className="p-4 bg-neutral-50 border-b border-neutral-200 font-mono text-xs font-bold text-black uppercase">
          Awaiting Barcode-Verified Picking &amp; Packing ({pendingOrders.length})
        </div>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-neutral-200 font-mono text-[11px] uppercase text-black">
              <th className="p-4">Order Ref</th>
              <th className="p-4">Customer &amp; Area</th>
              <th className="p-4">SKU Pick Items</th>
              <th className="p-4">Payment</th>
              <th className="p-4">Fulfilment Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100 text-xs text-neutral-600 font-sans">
            {pendingOrders.map((ord) => (
              <tr key={ord.id} className="hover:bg-neutral-50 transition-colors">
                <td className="p-4 font-bold font-mono text-black">{ord.orderNumber}</td>
                <td className="p-4">
                  <span className="font-bold text-black uppercase block">{ord.address?.recipient || 'Customer'}</span>
                  <span className="text-[11px] text-neutral-500">{ord.address?.street}, {ord.address?.city}</span>
                </td>
                <td className="p-4">
                  {ord.items?.map((it: any) => (
                    <span key={it.id} className="block font-mono text-[11px] text-black">
                      {it.quantity}x {it.productName || it.variantSku}
                    </span>
                  ))}
                </td>
                <td className="p-4 font-mono font-bold text-black">{ord.paymentMethod}</td>
                <td className="p-4">
                  <Button variant="primary" size="sm">Pack &amp; Scan Courier</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
