import React from 'react';
import Link from 'next/link';
import { db } from '@/lib/db';
import { Button } from '@/components/ui/Button';

export default async function CustomerOrdersHistoryPage() {
  const orders = await db.order.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      items: true,
      payments: true,
    },
    take: 10,
  });

  return (
    <div className="w-full px-margin-mobile md:px-margin-desktop py-12 max-w-4xl mx-auto">
      <div className="border-b border-outline-variant pb-8 mb-10">
        <span className="font-label-caps text-label-caps text-outline uppercase block mb-2 font-semibold">
          Order Archives
        </span>
        <h1 className="font-headline-lg text-4xl uppercase font-semibold text-primary">
          Customer Order History
        </h1>
      </div>

      {orders.length === 0 ? (
        <div className="py-20 text-center border border-dashed border-outline-variant">
          <p className="font-label-caps text-sm text-secondary uppercase mb-4">
            No orders found in your account history
          </p>
          <Link href="/products">
            <Button variant="primary" size="md">Explore Catalogue</Button>
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {orders.map((ord) => (
            <div key={ord.id} className="p-6 bg-surface-container-low border border-outline-variant">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-4 border-b border-outline-variant mb-4 gap-2">
                <div>
                  <span className="font-label-caps text-xs text-secondary uppercase">ORDER NUMBER</span>
                  <p className="font-display text-base font-bold text-primary">{ord.orderNumber}</p>
                </div>
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-neutral-200 text-primary font-label-caps text-[11px] uppercase font-bold">
                    {ord.orderStatus}
                  </span>
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-800 font-label-caps text-[11px] uppercase font-bold">
                    {ord.paymentMethod} — {ord.paymentStatus}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-2 font-nav-item text-xs mb-4">
                {ord.items.map((it) => (
                  <div key={it.id} className="flex justify-between">
                    <span>{it.productName} ({it.colorName} | {it.sizeName}) × {it.quantity}</span>
                    <span className="font-bold text-primary">৳ {it.totalPrice.toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-outline-variant flex justify-between items-center">
                <span className="font-label-caps text-xs text-secondary">
                  Total Paid: <span className="font-bold text-primary">৳ {ord.totalBDT.toLocaleString()}</span>
                </span>
                <Link href={`/order-confirmation/${ord.id}`}>
                  <Button variant="secondary" size="sm">
                    View Invoice &amp; Tracking
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
