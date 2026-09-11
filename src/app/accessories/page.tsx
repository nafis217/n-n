import React from 'react';
import { ProductCard } from '@/components/product/ProductCard';
import { CATALOG_PRODUCTS } from '@/lib/queries/products';

export default function AccessoriesCategoryPage() {
  const accessories = CATALOG_PRODUCTS.filter((p) => p.category === 'accessories');

  return (
    <div className="w-full px-margin-mobile md:px-margin-desktop pt-24 md:pt-28 pb-16">
      <div className="border-b border-outline-variant pb-8 mb-10">
        <span className="font-label-caps text-label-caps text-outline uppercase block mb-2 font-semibold">
          Category
        </span>
        <h1 className="font-headline-lg text-4xl uppercase font-semibold text-primary">
          Accessories &amp; Stoles
        </h1>
        <p className="font-body-md text-sm text-secondary mt-2 max-w-2xl">
          Geo-Jamdani stoles, industrial sterling silver pendants, and tactile textile accents.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {accessories.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
