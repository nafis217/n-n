import React from 'react';
import { db } from '@/lib/db';
import { Button } from '@/components/ui/Button';

export const revalidate = 0;

export default async function AdminOrdersPage() {
  let orders: any[] = [
    {
      id: 'ord-101',
      orderNumber: 'FUKU-20260918-8472',
      customer: { name: 'Ahsanul Islam', mobile: '+880 1712-345678' },
      address: { recipient: 'Ahsanul Islam', phone: '+880 1712-345678', city: 'Dhaka', street: 'Gulshan 2' },
      items: [
        { id: 'it-1', productName: 'Tactical Cyber Kimono', quantity: 1, totalPrice: 18500 },
      ],
      totalBDT: 18500,
      paymentMethod: 'BKASH',
      paymentStatus: 'PAID',
      orderStatus: 'CONFIRMED',
    },
    {
      id: 'ord-102',
      orderNumber: 'FUKU-20260918-7911',
      customer: { name: 'Tasnim Rahman', mobile: '+880 1819-876543' },
      address: { recipient: 'Tasnim Rahman', phone: '+880 1819-876543', city: 'Dhaka', street: 'Banani Block C' },
      items: [
        { id: 'it-2', productName: 'Jamdani Geometric Panjabi', quantity: 1, totalPrice: 14500 },
        { id: 'it-3', productName: 'Pleated Minimalist Trouser', quantity: 1, totalPrice: 9500 },
      ],
      totalBDT: 24000,
      paymentMethod: 'CARD',
      paymentStatus: 'PAID',
      orderStatus: 'PROCESSING',
    },
    {
      id: 'ord-103',
      orderNumber: 'FUKU-20260917-6523',
      customer: { name: 'Farhan Kabir', mobile: '+880 1911-223344' },
      address: { recipient: 'Farhan Kabir', phone: '+880 1911-223344', city: 'Chittagong', street: 'GEC Circle' },
      items: [
        { id: 'it-4', productName: 'Architectural Oversized Tee', quantity: 2, totalPrice: 12500 },
      ],
      totalBDT: 12500,
      paymentMethod: 'COD',
      paymentStatus: 'PENDING',
      orderStatus: 'DELIVERED',
    },
  ];

  try {
    const dbOrders = await db.order.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        customer: true,
        address: true,
        items: true,
        payments: true,
      },
    });
    if (dbOrders && dbOrders.length > 0) {
      orders = dbOrders;
    }
  } catch (err) {
    console.warn('Using fallback orders data:', err);
  }

  return (
    <div className="w-full">
      <div className="border-b border-neutral-200 pb-6 mb-8 flex flex-col md:flex-row justify-between items-start md:items-end">
        <div>
          <span className="font-mono text-xs text-neutral-500 uppercase block mb-2 font-medium tracking-wider">
            Warehouse &amp; Fulfilment Operations
          </span>
          <h1 className="text-3xl uppercase font-semibold text-black tracking-tight">
            Storefront Orders Queue ({orders.length})
          </h1>
        </div>
      </div>

      <div className="bg-white border border-neutral-200 overflow-x-auto shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-neutral-200 bg-neutral-50 font-mono text-[11px] uppercase text-black">
              <th className="p-4">Order Reference</th>
              <th className="p-4">Customer &amp; Phone</th>
              <th className="p-4">Items Count</th>
              <th className="p-4">Total (BDT)</th>
              <th className="p-4">Payment</th>
              <th className="p-4">Order Status</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100 text-xs text-neutral-600 font-sans">
            {orders.map((ord) => (
              <tr key={ord.id} className="hover:bg-neutral-50 transition-colors">
                <td className="p-4 font-bold font-mono text-black">{ord.orderNumber}</td>
                <td className="p-4">
                  <span className="font-bold text-black uppercase block">{ord.address?.recipient || ord.customer?.name || 'Guest'}</span>
                  <span className="text-[11px] text-neutral-500 font-mono">{ord.address?.phone || ord.customer?.mobile}</span>
                </td>
                <td className="p-4">{ord.items?.length || 1} Items</td>
                <td className="p-4 font-bold text-black">৳ {ord.totalBDT.toLocaleString()}</td>
                <td className="p-4">
                  <span className="px-2 py-0.5 bg-neutral-100 text-black font-mono text-[10px] font-bold uppercase block w-fit border border-neutral-200">
                    {ord.paymentMethod}
                  </span>
                  <span className="text-[10px] text-emerald-700 font-mono font-bold uppercase">{ord.paymentStatus}</span>
                </td>
                <td className="p-4">
                  <span className="px-2 py-0.5 bg-black text-white font-mono text-[10px] font-semibold uppercase">
                    {ord.orderStatus}
                  </span>
                </td>
                <td className="p-4">
                  <Button variant="secondary" size="sm">Inspect</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
