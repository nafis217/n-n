import React from 'react';
import { db } from '@/lib/db';
import { Button } from '@/components/ui/Button';

export const revalidate = 0;

export default async function AdminPurchasingPage() {
  const purchaseOrders = await db.purchaseOrder.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      supplier: true,
      items: { include: { variant: { include: { product: true } } } },
    },
  });

  const suppliers = await db.supplier.findMany();

  return (
    <div className="w-full">
      <div className="border-b border-outline-variant pb-6 mb-8 flex flex-col md:flex-row justify-between items-start md:items-end">
        <div>
          <span className="font-label-caps text-label-caps text-outline uppercase block mb-2 font-semibold">
            Supply Chain Management
          </span>
          <h1 className="font-headline-lg text-3xl uppercase font-semibold text-primary">
            Purchasing &amp; Goods Receiving
          </h1>
        </div>
        <Button variant="primary" size="md" className="mt-2 md:mt-0">
          + CREATE PURCHASE ORDER
        </Button>
      </div>

      {/* Purchase Orders Table */}
      <div className="bg-surface-container-low border border-outline-variant overflow-x-auto mb-10">
        <div className="p-4 bg-surface-container border-b border-outline-variant font-label-caps text-xs font-bold text-primary uppercase">
          Purchase Orders (PO) Status &amp; Goods Receiving
        </div>
        {purchaseOrders.length === 0 ? (
          <p className="font-label-caps text-xs text-secondary p-8 text-center uppercase">
            No purchase orders generated yet.
          </p>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-outline-variant font-label-caps text-[11px] uppercase text-primary">
                <th className="p-4">PO Reference</th>
                <th className="p-4">Supplier</th>
                <th className="p-4">Items Count</th>
                <th className="p-4">Total Cost (BDT)</th>
                <th className="p-4">PO Status</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant font-nav-item text-xs text-secondary">
              {purchaseOrders.map((po) => (
                <tr key={po.id} className="hover:bg-white transition-colors">
                  <td className="p-4 font-bold text-primary">{po.poNumber}</td>
                  <td className="p-4 uppercase font-bold text-primary">{po.supplier.name}</td>
                  <td className="p-4">{po.items.length} Items</td>
                  <td className="p-4 font-bold text-primary">৳ {po.totalBDT.toLocaleString()}</td>
                  <td className="p-4">
                    <span className="px-2 py-1 bg-neutral-200 text-primary font-label-caps text-[10px] font-bold uppercase">
                      {po.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <Button variant="secondary" size="sm">
                      Receive GRN
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Registered Suppliers */}
      <div className="bg-surface-container-low border border-outline-variant p-6">
        <h3 className="font-label-caps text-xs uppercase font-bold text-primary mb-4">
          Registered Textile &amp; Yarn Suppliers ({suppliers.length})
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {suppliers.map((s) => (
            <div key={s.id} className="p-4 border border-outline-variant bg-white font-nav-item text-xs">
              <span className="font-bold text-primary uppercase block mb-1">{s.name}</span>
              <p className="text-secondary text-[11px]">Phone: {s.phone}</p>
              <p className="text-secondary text-[11px]">Lead Time: {s.leadTimeDays} Days</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
