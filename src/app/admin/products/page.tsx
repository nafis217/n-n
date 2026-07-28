import React from 'react';
import { db } from '@/lib/db';
import { Button } from '@/components/ui/Button';

export const revalidate = 0;

export default async function AdminProductsPage() {
  const products = await db.product.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      category: true,
      collection: true,
      variants: {
        include: { color: true, size: true, inventory: true },
      },
    },
  });

  return (
    <div className="w-full">
      <div className="border-b border-outline-variant pb-6 mb-8 flex flex-col md:flex-row justify-between items-start md:items-end">
        <div>
          <span className="font-label-caps text-label-caps text-outline uppercase block mb-2 font-semibold">
            Catalog Management
          </span>
          <h1 className="font-headline-lg text-3xl uppercase font-semibold text-primary">
            Products &amp; Variant Administration
          </h1>
        </div>
        <Button variant="primary" size="md" className="mt-2 md:mt-0">
          + CREATE NEW PRODUCT
        </Button>
      </div>

      <div className="bg-surface-container-low border border-outline-variant overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-outline-variant bg-surface-container font-label-caps text-[11px] uppercase text-primary">
              <th className="p-4">Product / Title</th>
              <th className="p-4">Category</th>
              <th className="p-4">Gender</th>
              <th className="p-4">Variants</th>
              <th className="p-4">Price Range (BDT)</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant font-nav-item text-xs text-secondary">
            {products.map((prod) => {
              const prices = prod.variants.map((v) => v.priceBDT);
              const minPrice = prices.length > 0 ? Math.min(...prices) : 0;
              const maxPrice = prices.length > 0 ? Math.max(...prices) : 0;

              return (
                <tr key={prod.id} className="hover:bg-white transition-colors">
                  <td className="p-4 font-bold text-primary uppercase">
                    {prod.titleEn}
                    <span className="block text-[11px] text-outline font-normal">Slug: {prod.slug}</span>
                  </td>
                  <td className="p-4 uppercase">{prod.category.nameEn}</td>
                  <td className="p-4 font-bold">{prod.gender}</td>
                  <td className="p-4">{prod.variants.length} Variants</td>
                  <td className="p-4 font-bold text-primary">
                    {minPrice === maxPrice ? `৳ ${minPrice.toLocaleString()}` : `৳ ${minPrice.toLocaleString()} - ৳ ${maxPrice.toLocaleString()}`}
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-1 bg-emerald-100 text-emerald-800 font-label-caps text-[10px] font-bold uppercase">
                      PUBLISHED
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
