import React from 'react';
import { db } from '@/lib/db';

export const revalidate = 0;

export default async function AdminInventoryPage() {
  const balances = await db.inventoryBalance.findMany({
    include: {
      location: true,
      variant: {
        include: { product: true, color: true, size: true },
      },
    },
    orderBy: { physical: 'asc' },
  });

  const movements = await db.inventoryMovement.findMany({
    take: 10,
    orderBy: { createdAt: 'desc' },
    include: {
      variant: { include: { product: true } },
      fromLocation: true,
      toLocation: true,
    },
  });

  return (
    <div className="w-full">
      <div className="border-b border-outline-variant pb-6 mb-8 flex flex-col md:flex-row justify-between items-start md:items-end">
        <div>
          <span className="font-label-caps text-label-caps text-outline uppercase block mb-2 font-semibold">
            Stock Control
          </span>
          <h1 className="font-headline-lg text-3xl uppercase font-semibold text-primary">
            Digital Inventory Balances &amp; Ledger
          </h1>
        </div>
      </div>

      {/* Stock Balances Table */}
      <div className="bg-surface-container-low border border-outline-variant overflow-x-auto mb-10">
        <div className="p-4 bg-surface-container border-b border-outline-variant font-label-caps text-xs font-bold text-primary uppercase">
          Real-Time Stock Balances by Location
        </div>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-outline-variant font-label-caps text-[11px] uppercase text-primary">
              <th className="p-4">SKU / Barcode</th>
              <th className="p-4">Garment Title</th>
              <th className="p-4">Color &amp; Size</th>
              <th className="p-4">Location</th>
              <th className="p-4">Physical</th>
              <th className="p-4">Reserved</th>
              <th className="p-4">Damaged</th>
              <th className="p-4">Net Available</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant font-nav-item text-xs text-secondary">
            {balances.map((b) => {
              const available = Math.max(0, b.physical - b.reserved - b.damaged);
              return (
                <tr key={b.id} className="hover:bg-white transition-colors">
                  <td className="p-4 font-bold text-primary">{b.variant.sku}</td>
                  <td className="p-4 uppercase">{b.variant.product.titleEn}</td>
                  <td className="p-4">{b.variant.color.nameEn} | {b.variant.size.name}</td>
                  <td className="p-4 font-bold text-primary">{b.location.name}</td>
                  <td className="p-4 font-bold">{b.physical}</td>
                  <td className="p-4 text-secondary">{b.reserved}</td>
                  <td className="p-4 text-error font-bold">{b.damaged}</td>
                  <td className="p-4 font-bold text-emerald-800 bg-emerald-50">{available}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Ledger Log */}
      <div className="bg-surface-container-low border border-outline-variant p-6">
        <h3 className="font-label-caps text-xs uppercase font-bold text-primary mb-4">
          Recent Immutable Movement Ledger Entries
        </h3>
        <div className="flex flex-col divide-y divide-outline-variant">
          {movements.map((m) => (
            <div key={m.id} className="py-3 flex justify-between items-center font-nav-item text-xs">
              <div>
                <span className="font-bold text-primary uppercase">{m.movementType}</span> — {m.variant.product.titleEn} (Qty: {m.quantity})
                <p className="text-[11px] text-secondary">{m.notes || 'Ledger entry logged'}</p>
              </div>
              <span className="font-label-caps text-[11px] text-outline">
                {new Date(m.createdAt).toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
