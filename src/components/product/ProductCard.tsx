'use client';

import React from 'react';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { ProductItem } from '@/lib/queries/products';
import { useWishlistStore } from '@/lib/store/wishlist';

interface ProductCardProps {
  product: ProductItem;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { isInWishlist, toggleWishlist } = useWishlistStore();
  const wishlisted = isInWishlist(product.id);

  return (
    <div className="group cursor-pointer flex flex-col">
      <div className="aspect-[2/3] relative overflow-hidden bg-surface-container-low mb-4">
        {product.tag && (
          <div className="absolute top-0 left-0 z-10">
            <Badge variant={product.tag === 'SALE' ? 'sale' : 'new'}>{product.tag}</Badge>
          </div>
        )}

        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className="absolute top-3 right-3 z-10 p-2 text-primary hover:opacity-70 transition-opacity"
          aria-label="Toggle Wishlist"
        >
          <Heart
            className={`w-5 h-5 transition-colors ${
              wishlisted ? 'fill-vermilion text-vermilion' : 'text-primary'
            }`}
          />
        </button>

        <Link href={`/product/${product.id}`} className="block w-full h-full">
          <img
            src={product.images[0]}
            alt={product.nameEn}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
        </Link>
      </div>

      <Link href={`/product/${product.id}`} className="block">
        <p className="font-body-md text-body-md uppercase text-primary mb-1 font-medium group-hover:underline underline-offset-4">
          {product.nameEn}
        </p>
        <div className="flex items-center gap-3">
          <p className="font-price text-price text-secondary">
            ৳ {product.priceBDT.toLocaleString()}
          </p>
          {product.originalPriceBDT && (
            <p className="font-price text-price text-outline line-through text-xs">
              ৳ {product.originalPriceBDT.toLocaleString()}
            </p>
          )}
        </div>
      </Link>
    </div>
  );
};
