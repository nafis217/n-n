import React from 'react';
import { db } from '@/lib/db';
import { Button } from '@/components/ui/Button';
import { CATALOG_PRODUCTS } from '@/lib/queries/products';

export const revalidate = 0;

export default async function AdminProductsPage() {
  let products: any[] = CATALOG_PRODUCTS.map((cp) => ({
    id: cp.id,
    titleEn: cp.nameEn,
    slug: cp.slug,
    gender: cp.gender,
    isPublished: true,
    category: { nameEn: cp.category.toUpperCase() },
    variants: cp.colors.map((c, idx) => ({
      id: `var-${cp.id}-${idx}`,
      sku: `FUKU-${cp.slug.toUpperCase().slice(0, 3)}-${c.name.slice(0, 3).toUpperCase()}`,
      priceBDT: cp.priceBDT,
      color: { nameEn: c.name },
      size: { name: cp.sizes[0] || 'M' },
    })),
  }));

  try {
    const dbProducts = await db.product.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        category: true,
        collection: true,
        variants: {
          include: { color: true, size: true, inventory: true },
        },
      },
    });
    if (dbProducts && dbProducts.length > 0) {
      products = dbProducts;
    }
  } catch (err) {
    console.warn('Using catalog products fallback for admin products page:', err);
  }

  return (
    <div className="w-full">
      <div className="border-b border-neutral-200 pb-6 mb-8 flex flex-col md:flex-row justify-between items-start md:items-end">
        <div>
          <span className="font-mono text-xs text-neutral-500 uppercase block mb-2 font-medium tracking-wider">
            Catalog Management
          </span>
          <h1 className="text-3xl uppercase font-semibold text-black tracking-tight">
            Products &amp; Variant Administration ({products.length})
          </h1>
        </div>
        <Button variant="primary" size="md" className="mt-2 md:mt-0">
          + CREATE NEW PRODUCT
        </Button>
      </div>

      <div className="bg-white border border-neutral-200 overflow-x-auto shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-neutral-200 bg-neutral-50 font-mono text-[11px] uppercase text-black">
              <th className="p-4">Product / Title</th>
              <th className="p-4">Category</th>
              <th className="p-4">Gender</th>
              <th className="p-4">Variants</th>
              <th className="p-4">Price (BDT)</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100 text-xs text-neutral-600 font-sans">
            {products.map((prod) => {
              const prices = prod.variants?.map((v: any) => v.priceBDT) || [];
              const minPrice = prices.length > 0 ? Math.min(...prices) : 0;
              const maxPrice = prices.length > 0 ? Math.max(...prices) : 0;

              return (
                <tr key={prod.id} className="hover:bg-neutral-50 transition-colors">
                  <td className="p-4 font-bold text-black uppercase">
                    {prod.titleEn}
                    <span className="block text-[11px] text-neutral-500 font-mono font-normal">Slug: {prod.slug}</span>
                  </td>
                  <td className="p-4 font-mono uppercase text-black">{prod.category?.nameEn || 'General'}</td>
                  <td className="p-4 font-mono font-bold text-black">{prod.gender}</td>
                  <td className="p-4 font-mono text-neutral-600">{prod.variants?.length || 0} Variants</td>
                  <td className="p-4 font-bold font-mono text-black">
                    {minPrice === maxPrice ? `৳ ${minPrice.toLocaleString()}` : `৳ ${minPrice.toLocaleString()} - ৳ ${maxPrice.toLocaleString()}`}
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 font-mono text-[10px] font-bold uppercase">
                      {prod.isPublished ? 'ACTIVE' : 'DRAFT'}
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
