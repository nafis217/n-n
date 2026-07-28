import React from 'react';
import { db } from '@/lib/db';
import { Button } from '@/components/ui/Button';

export const revalidate = 0;

export default async function AdminProductionPage() {
  const productionOrders = await db.productionOrder.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      bom: { include: { product: true } },
      consumptions: { include: { rawMaterial: true } },
      inspections: true,
    },
  });

  const boms = await db.billOfMaterials.findMany({
    include: { product: true, items: { include: { rawMaterial: true } } },
  });

  return (
    <div className="w-full">
      <div className="border-b border-outline-variant pb-6 mb-8 flex flex-col md:flex-row justify-between items-start md:items-end">
        <div>
          <span className="font-label-caps text-label-caps text-outline uppercase block mb-2 font-semibold">
            Garment Manufacturing
          </span>
          <h1 className="font-headline-lg text-3xl uppercase font-semibold text-primary">
            Apparel Production &amp; BOM Management
          </h1>
        </div>
        <Button variant="primary" size="md" className="mt-2 md:mt-0">
          + CREATE PRODUCTION ORDER
        </Button>
      </div>

      {/* Production Orders Table */}
      <div className="bg-surface-container-low border border-outline-variant overflow-x-auto mb-10">
        <div className="p-4 bg-surface-container border-b border-outline-variant font-label-caps text-xs font-bold text-primary uppercase">
          Active Production Batch Orders &amp; Stages
        </div>
        {productionOrders.length === 0 ? (
          <p className="font-label-caps text-xs text-secondary p-8 text-center uppercase">
            No production orders currently in pipeline.
          </p>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-outline-variant font-label-caps text-[11px] uppercase text-primary">
                <th className="p-4">Batch Order</th>
                <th className="p-4">Target Garment</th>
                <th className="p-4">Target Qty</th>
                <th className="p-4">Completed Qty</th>
                <th className="p-4">Manufacturing Stage</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant font-nav-item text-xs text-secondary">
              {productionOrders.map((po) => (
                <tr key={po.id} className="hover:bg-white transition-colors">
                  <td className="p-4 font-bold text-primary">{po.orderNumber}</td>
                  <td className="p-4 font-bold text-primary uppercase">{po.bom.product.titleEn}</td>
                  <td className="p-4">{po.targetQty} Units</td>
                  <td className="p-4 font-bold text-emerald-800">{po.completedQty} Units</td>
                  <td className="p-4">
                    <span className="px-2 py-1 bg-neutral-200 text-primary font-label-caps text-[10px] font-bold uppercase">
                      {po.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <Button variant="secondary" size="sm">
                      Update Stage
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Bill of Materials (BOM) Specifications */}
      <div className="bg-surface-container-low border border-outline-variant p-6">
        <h3 className="font-label-caps text-xs uppercase font-bold text-primary mb-4">
          Configured Bill of Materials (BOM Specs) ({boms.length})
        </h3>
        {boms.length === 0 ? (
          <p className="font-label-caps text-xs text-secondary py-4 text-center uppercase">
            No BOM specs configured.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {boms.map((b) => (
              <div key={b.id} className="p-4 border border-outline-variant bg-white font-nav-item text-xs">
                <span className="font-bold text-primary uppercase block mb-1">{b.name} — {b.product.titleEn}</span>
                <div className="mt-2 flex flex-col gap-1 text-[11px] text-secondary">
                  {b.items.map((it) => (
                    <p key={it.id}>
                      • {it.rawMaterial.name}: {it.qtyRequired} {it.rawMaterial.unitOfMeasure} per unit
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
