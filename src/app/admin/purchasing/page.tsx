import React from 'react';
import { db } from '@/lib/db';
import { Button } from '@/components/ui/Button';

export const revalidate = 0;

export default async function AdminPurchasingPage() {
  let purchaseOrders: any[] = [
    {
      id: 'po-101',
      poNumber: 'PO-2026-NRY-01',
      supplier: { name: 'Narayanganj Handloom Co-Op' },
      items: [{ id: 'poi-1', variant: { product: { titleEn: 'Jamdani Saree Fabric' } } }],
      totalBDT: 120000,
      status: 'ISSUED',
    },
    {
      id: 'po-102',
      poNumber: 'PO-2026-JPN-04',
      supplier: { name: 'Osaka Technical Knits Ltd' },
      items: [{ id: 'poi-2', variant: { product: { titleEn: 'Heavy Cotton Twill' } } }],
      totalBDT: 340000,
      status: 'COMPLETED',
    },
  ];

  let suppliers: any[] = [];

  try {
    const dbPOs = await db.purchaseOrder.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        supplier: true,
        items: { include: { variant: { include: { product: true } } } },
      },
    });
    if (dbPOs && dbPOs.length > 0) purchaseOrders = dbPOs;

    const dbSuppliers = await db.supplier.findMany();
    if (dbSuppliers && dbSuppliers.length > 0) suppliers = dbSuppliers;
  } catch (err) {
    console.warn('Using fallback purchasing data:', err);
  }

  return (
    <div className="w-full">
      <div className="border-b border-neutral-200 pb-6 mb-8 flex flex-col md:flex-row justify-between items-start md:items-end">
        <div>
          <span className="font-mono text-xs text-neutral-500 uppercase block mb-2 font-medium tracking-wider">
            Supply Chain Management
          </span>
          <h1 className="text-3xl uppercase font-semibold text-black tracking-tight">
            Purchasing &amp; Goods Receiving
          </h1>
        </div>
        <Button variant="primary" size="md" className="mt-2 md:mt-0">
          + CREATE PURCHASE ORDER
        </Button>
      </div>

      <div className="bg-white border border-neutral-200 overflow-x-auto mb-10 shadow-sm">
        <div className="p-4 bg-neutral-50 border-b border-neutral-200 font-mono text-xs font-bold text-black uppercase">
          Purchase Orders (PO) Status &amp; Goods Receiving
        </div>
        {purchaseOrders.length === 0 ? (
          <p className="font-mono text-xs text-neutral-500 p-8 text-center uppercase">
            No purchase orders generated yet.
          </p>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-neutral-200 font-mono text-[11px] uppercase text-black">
                <th className="p-4">PO Reference</th>
                <th className="p-4">Supplier</th>
                <th className="p-4">Items Count</th>
                <th className="p-4">Total Cost (BDT)</th>
                <th className="p-4">PO Status</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 text-xs text-neutral-600 font-sans">
              {purchaseOrders.map((po) => (
                <tr key={po.id} className="hover:bg-neutral-50 transition-colors">
                  <td className="p-4 font-bold font-mono text-black">{po.poNumber}</td>
                  <td className="p-4 uppercase font-bold text-black">{po.supplier?.name || 'Supplier'}</td>
                  <td className="p-4">{po.items?.length || 1} Items</td>
                  <td className="p-4 font-bold font-mono text-black">৳ {po.totalBDT.toLocaleString()}</td>
                  <td className="p-4">
                    <span className="px-2 py-0.5 bg-neutral-100 text-black font-mono text-[10px] font-bold uppercase border border-neutral-200">
                      {po.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <Button variant="secondary" size="sm">Receive GRN</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
