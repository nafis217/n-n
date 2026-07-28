'use client';

import React from 'react';
import Link from 'next/link';
import { ProductCard } from '@/components/product/ProductCard';
import { CATALOG_PRODUCTS } from '@/lib/queries/products';
import { useWishlistStore } from '@/lib/store/wishlist';

export default function WishlistPage() {
  const { wishlistIds } = useWishlistStore();

  const wishlistedProducts = CATALOG_PRODUCTS.filter((p) => wishlistIds.includes(p.id));

  return (
    <div className="w-full px-margin-mobile md:px-margin-desktop py-12">
      <div className="border-b border-outline-variant pb-8 mb-10">
        <span className="font-label-caps text-label-caps text-outline uppercase block mb-2 font-semibold">
          Saved Items
        </span>
        <h1 className="font-headline-lg text-4xl uppercase font-semibold text-primary">
          Your Wishlist ({wishlistedProducts.length})
        </h1>
      </div>

      {wishlistedProducts.length === 0 ? (
        <div className="py-20 text-center border border-dashed border-outline-variant">
          <p className="font-label-caps text-sm text-secondary uppercase mb-4">
            Your wishlist is currently empty
          </p>
          <Link
            href="/products"
            className="font-label-caps text-xs text-primary uppercase font-bold underline underline-offset-4"
          >
            Explore Catalogue
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlistedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
