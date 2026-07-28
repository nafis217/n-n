import React from 'react';
import { ProductCard } from '@/components/product/ProductCard';
import { CATALOG_PRODUCTS } from '@/lib/queries/products';

export default function NewDropPage() {
  const newDropProducts = CATALOG_PRODUCTS.filter(
    (p) => p.collection === 'new-drop-2026' || p.tag === 'NEW'
  );

  return (
    <div className="w-full px-margin-mobile md:px-margin-desktop py-10">
      <div className="w-full aspect-[21/9] bg-surface-container mb-8 overflow-hidden">
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBhN9KXDhW5X0_uSX8proRPzhXUzAdbN5F1LT221FDpVHz1Eh2NqiWwwJvZyO1-OD7cvm8pln68IcbESiyRUr-3P3AGMVzpSMCldYMl1spVvnQRFVPyQEXWn5BMELL-TXHMMHQpj-HUoEmy0aNpsUX74PZzxMbcj1ey0VmQAWOFn7mqk2JaZfdPhT9AWz0ciKtLuNKXdOh4FVWCrxU4JxbucGMACl2m4RPF3RGb_3xb5ieA69jK3VrD"
          alt="New Drop 2026 Editorial"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="border-b border-outline-variant pb-8 mb-10">
        <span className="font-label-caps text-label-caps text-vermilion uppercase block mb-2 font-bold">
          Limited Capsule Drop
        </span>
        <h1 className="font-headline-lg text-4xl uppercase font-semibold text-primary">
          New Drop 2026
        </h1>
        <p className="font-body-md text-sm text-secondary mt-2 max-w-2xl">
          The debut capsule celebrating Future Bengal Industrial aesthetic — stark whites, carbon blacks, and structural textiles.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {newDropProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
