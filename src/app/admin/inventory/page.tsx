import React from 'react';
import { db } from '@/lib/db';

export const revalidate = 0;

export default async function AdminInventoryPage() {
  let balances: any[] = [
    {
      id: 'bal-1',
      physical: 45,
      reserved: 3,
      damaged: 0,
      location: { name: 'Gulshan Flagship Store' },
      variant: {
        sku: 'FUKU-CYB-KIM-M',
        priceBDT: 18500,
        product: { titleEn: 'Tactical Cyber Kimono' },
        color: { nameEn: 'Onyx Black' },
        size: { name: 'M' },
      },
    },
    {
      id: 'bal-2',
      physical: 80,
      reserved: 8,
      damaged: 1,
      location: { name: 'Tejgaon Central Warehouse' },
      variant: {
        sku: 'FUKU-JMD-BLK-42',
        priceBDT: 14500,
        product: { titleEn: 'Jamdani Geometric Panjabi' },
        color: { nameEn: 'Jet Black' },
        size: { name: '42' },
      },
    },
    {
      id: 'bal-3',
      physical: 120,
      reserved: 12,
      damaged: 2,
      location: { name: 'Tejgaon Central Warehouse' },
      variant: {
        sku: 'FUKU-OVS-TEE-L',
        priceBDT: 6500,
        product: { titleEn: 'Architectural Oversized Tee' },
        color: { nameEn: 'Bone White' },
        size: { name: 'L' },
      },
    },
  ];

  let movements: any[] = [
    {
      id: 'mov-1',
      movementType: 'DISPATCH',
      quantity: 1,
      createdAt: new Date(),
      variant: { product: { titleEn: 'Tactical Cyber Kimono' } },
      fromLocation: { name: 'Gulshan Flagship Store' },
      toLocation: { name: 'Courier Transit' },
    },
    {
      id: 'mov-2',
      movementType: 'RECEIVING',
      quantity: 50,
      createdAt: new Date(Date.now() - 86400000),
      variant: { product: { titleEn: 'Jamdani Geometric Panjabi' } },
      fromLocation: { name: 'Narayanganj Atelier' },
      toLocation: { name: 'Tejgaon Central Warehouse' },
    },
  ];

  try {
    const dbBalances = await db.inventoryBalance.findMany({
      include: {
        location: true,
        variant: {
          include: { product: true, color: true, size: true },
        },
      },
      orderBy: { physical: 'asc' },
    });
    if (dbBalances && dbBalances.length > 0) balances = dbBalances;

    const dbMovements = await db.inventoryMovement.findMany({
      take: 10,
      orderBy: { createdAt: 'desc' },
      include: {
        variant: { include: { product: true } },
        fromLocation: true,
        toLocation: true,
      },
    });
    if (dbMovements && dbMovements.length > 0) movements = dbMovements;
  } catch (err) {
    console.warn('Using fallback inventory data:', err);
  }

  return (
    <div className="w-full">
      <div className="border-b border-neutral-200 pb-6 mb-8 flex flex-col md:flex-row justify-between items-start md:items-end">
        <div>
          <span className="font-mono text-xs text-neutral-500 uppercase block mb-2 font-medium tracking-wider">
            Stock Control
          </span>
          <h1 className="text-3xl uppercase font-semibold text-black tracking-tight">
            Digital Inventory Balances &amp; Ledger
          </h1>
        </div>
      </div>

      {/* Stock Balances Table */}
      <div className="bg-white border border-neutral-200 overflow-x-auto shadow-sm mb-12">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-neutral-200 bg-neutral-50 font-mono text-[11px] uppercase text-black">
              <th className="p-4">SKU / Garment</th>
              <th className="p-4">Location</th>
              <th className="p-4">Physical Stock</th>
              <th className="p-4">Reserved</th>
              <th className="p-4">Available (ATP)</th>
              <th className="p-4">Damaged / QC</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100 text-xs text-neutral-600 font-sans">
            {balances.map((b) => {
              const atp = Math.max(0, b.physical - b.reserved - b.damaged);
              return (
                <tr key={b.id} className="hover:bg-neutral-50 transition-colors">
                  <td className="p-4">
                    <span className="font-bold text-black uppercase block">{b.variant?.product?.titleEn || 'Product'}</span>
                    <span className="font-mono text-[11px] text-neutral-500">{b.variant?.sku} • {b.variant?.color?.nameEn} ({b.variant?.size?.name})</span>
                  </td>
                  <td className="p-4 font-mono uppercase text-black">{b.location?.name || 'Warehouse'}</td>
                  <td className="p-4 font-bold font-mono text-black">{b.physical} Units</td>
                  <td className="p-4 font-mono text-amber-700">{b.reserved} Units</td>
                  <td className="p-4 font-bold font-mono text-emerald-700">{atp} Available</td>
                  <td className="p-4 font-mono text-red-600">{b.damaged} Units</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Inventory Movements */}
      <div className="border-b border-neutral-200 pb-4 mb-6">
        <h2 className="font-mono text-base uppercase font-bold text-black tracking-tight">
          Recent Immutable Ledger Movements
        </h2>
      </div>

      <div className="bg-white border border-neutral-200 overflow-x-auto shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-neutral-200 bg-neutral-50 font-mono text-[11px] uppercase text-black">
              <th className="p-4">Movement Type</th>
              <th className="p-4">Garment</th>
              <th className="p-4">Quantity</th>
              <th className="p-4">Origin &rarr; Destination</th>
              <th className="p-4">Timestamp</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100 text-xs text-neutral-600 font-sans">
            {movements.map((m) => (
              <tr key={m.id} className="hover:bg-neutral-50 transition-colors">
                <td className="p-4">
                  <span className="px-2 py-0.5 bg-neutral-100 text-black font-mono text-[10px] font-bold uppercase border border-neutral-200">
                    {m.movementType}
                  </span>
                </td>
                <td className="p-4 font-bold text-black">{m.variant?.product?.titleEn || 'Product'}</td>
                <td className="p-4 font-mono font-bold text-black">{m.quantity} Units</td>
                <td className="p-4 font-mono text-[11px]">
                  {m.fromLocation?.name || 'External'} &rarr; {m.toLocation?.name || 'Transit'}
                </td>
                <td className="p-4 font-mono text-[11px] text-neutral-500">
                  {new Date(m.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
