import React from 'react';
import { db } from '@/lib/db';
import { CATALOG_PRODUCTS } from '@/lib/queries/products';
import { ProductAdminManager } from '@/components/admin/ProductAdminManager';

export const revalidate = 0;

export default async function AdminProductsPage() {
  let products: Array<{
    id: string;
    titleEn: string;
    nameBn?: string;
    slug: string;
    gender: string;
    category: string;
    priceBDT: number;
    stock: number;
    images: string[];
    isPublished: boolean;
  }> = CATALOG_PRODUCTS.map((cp) => ({
    id: cp.id,
    titleEn: cp.nameEn,
    nameBn: cp.nameBn,
    slug: cp.slug,
    gender: cp.gender,
    category: cp.category.toUpperCase(),
    priceBDT: cp.priceBDT,
    stock: cp.stockCount || 15,
    images: cp.images,
    isPublished: true,
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
      products = dbProducts.map((p: any) => {
        const prices = p.variants?.map((v: any) => v.priceBDT) || [];
        const minPrice = prices.length > 0 ? Math.min(...prices) : 0;
        const totalStock = p.variants?.reduce((acc: number, v: any) => {
          const bal = v.inventory?.reduce((bAcc: number, b: any) => bAcc + (b.physical || 0), 0) || 0;
          return acc + bal;
        }, 0) || 15;

        return {
          id: p.id,
          titleEn: p.titleEn || 'Product',
          nameBn: p.titleBn || p.nameBn || '',
          slug: p.slug,
          gender: p.gender || 'UNISEX',
          category: p.category?.nameEn || 'GENERAL',
          priceBDT: minPrice || 8500,
          stock: totalStock,
          images: [] as string[],
          isPublished: p.isPublished,
        };
      });
    }
  } catch (err) {
    console.warn('Using fallback catalog data for admin products:', err);
  }

  return (
    <div className="w-full">
      <ProductAdminManager initialProducts={products} />
    </div>
  );
}
