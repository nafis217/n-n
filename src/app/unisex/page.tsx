import React from 'react';
import { ProductCard } from '@/components/product/ProductCard';
import { CATALOG_PRODUCTS } from '@/lib/queries/products';

export default function UnisexCategoryPage() {
  const unisexProducts = CATALOG_PRODUCTS.filter((p) => p.gender === 'UNISEX');

  return (
    <div className="w-full px-margin-mobile md:px-margin-desktop py-10">
      <div className="border-b border-outline-variant pb-8 mb-10">
        <span className="font-label-caps text-label-caps text-outline uppercase block mb-2 font-semibold">
          Category
        </span>
        <h1 className="font-headline-lg text-4xl uppercase font-semibold text-primary">
          Unisex Collection
        </h1>
        <p className="font-body-md text-sm text-secondary mt-2 max-w-2xl">
          Gender-neutral high-fashion garments designed with geometric precision and hand-loomed textures.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {unisexProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
