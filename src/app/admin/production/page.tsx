import React from 'react';
import { db } from '@/lib/db';
import { Button } from '@/components/ui/Button';

export const revalidate = 0;

export default async function AdminProductionPage() {
  let productionOrders: any[] = [
    {
      id: 'pr-101',
      orderNumber: 'BATCH-2026-084',
      targetQty: 100,
      completedQty: 65,
      status: 'STITCHING',
      bom: { product: { titleEn: 'Tactical Cyber Kimono' } },
    },
    {
      id: 'pr-102',
      orderNumber: 'BATCH-2026-085',
      targetQty: 50,
      completedQty: 50,
      status: 'QC',
      bom: { product: { titleEn: 'Jamdani Geometric Panjabi' } },
    },
  ];

  try {
    const dbPOs = await db.productionOrder.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        bom: { include: { product: true } },
        consumptions: { include: { rawMaterial: true } },
        inspections: true,
      },
    });
    if (dbPOs && dbPOs.length > 0) productionOrders = dbPOs;
  } catch (err) {
    console.warn('Using fallback production data:', err);
  }

  return (
    <div className="w-full">
      <div className="border-b border-neutral-200 pb-6 mb-8 flex flex-col md:flex-row justify-between items-start md:items-end">
        <div>
          <span className="font-mono text-xs text-neutral-500 uppercase block mb-2 font-medium tracking-wider">
            Garment Manufacturing
          </span>
          <h1 className="text-3xl uppercase font-semibold text-black tracking-tight">
            Apparel Production &amp; BOM Management
          </h1>
        </div>
        <Button variant="primary" size="md" className="mt-2 md:mt-0">
          + CREATE PRODUCTION ORDER
        </Button>
      </div>

      <div className="bg-white border border-neutral-200 overflow-x-auto mb-10 shadow-sm">
        <div className="p-4 bg-neutral-50 border-b border-neutral-200 font-mono text-xs font-bold text-black uppercase">
          Active Production Batch Orders &amp; Stages
        </div>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-neutral-200 font-mono text-[11px] uppercase text-black">
              <th className="p-4">Batch Order</th>
              <th className="p-4">Target Garment</th>
              <th className="p-4">Target Qty</th>
              <th className="p-4">Completed Qty</th>
              <th className="p-4">Manufacturing Stage</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100 text-xs text-neutral-600 font-sans">
            {productionOrders.map((po) => (
              <tr key={po.id} className="hover:bg-neutral-50 transition-colors">
                <td className="p-4 font-bold font-mono text-black">{po.orderNumber}</td>
                <td className="p-4 font-bold text-black">{po.bom?.product?.titleEn || 'Apparel Unit'}</td>
                <td className="p-4 font-mono font-bold text-black">{po.targetQty} Units</td>
                <td className="p-4 font-mono text-emerald-700 font-bold">{po.completedQty} Units</td>
                <td className="p-4">
                  <span className="px-2 py-0.5 bg-neutral-100 text-black font-mono text-[10px] font-bold uppercase border border-neutral-200">
                    {po.status}
                  </span>
                </td>
                <td className="p-4">
                  <Button variant="secondary" size="sm">QC Log</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
