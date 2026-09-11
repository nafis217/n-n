'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Heart, Plus, Check } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { ProductItem } from '@/lib/queries/products';
import { useWishlistStore } from '@/lib/store/wishlist';
import { useCartStore } from '@/lib/store/cart';

interface ProductCardProps {
  product: ProductItem;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { isInWishlist, toggleWishlist } = useWishlistStore();
  const { addItem } = useCartStore();
  const wishlisted = isInWishlist(product.id);
  const [added, setAdded] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    addItem({
      id: product.id,
      productId: product.id,
      variantId: `${product.id}-default`,
      title: product.nameEn,
      sku: product.id.toUpperCase(),
      color: product.colors[0]?.name || 'Standard',
      size: product.sizes[0] || 'M',
      priceBDT: product.priceBDT,
      image: product.images[0],
      stockAvailable: 10,
    });

    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="group cursor-pointer flex flex-col relative">
      <div className="aspect-[2/3] relative overflow-hidden bg-neutral-100 mb-3">
        {product.tag && (
          <div className="absolute top-3 left-3 z-10">
            <Badge variant={product.tag === 'SALE' ? 'sale' : 'new'}>{product.tag}</Badge>
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/80 backdrop-blur-sm text-neutral-900 hover:bg-white transition-all shadow-sm"
          aria-label="Toggle Wishlist"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              wishlisted ? 'fill-vermilion text-vermilion' : 'text-neutral-900'
            }`}
          />
        </button>

        {/* Product Image */}
        <Link href={`/product/${product.id}`} className="block w-full h-full">
          <img
            src={product.images[0]}
            alt={product.nameEn}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
        </Link>

        {/* Quick Add To Bag Button (Zara Style Slide Up on Hover) */}
        <button
          onClick={handleQuickAdd}
          className={`absolute bottom-0 left-0 w-full py-3 px-4 text-xs font-label-caps uppercase tracking-widest font-extrabold flex items-center justify-center gap-2 transition-all duration-300 z-10 ${
            added
              ? 'bg-emerald-700 text-white translate-y-0 opacity-100'
              : 'bg-black/90 hover:bg-black text-white translate-y-full group-hover:translate-y-0 opacity-0 group-hover:opacity-100'
          }`}
        >
          {added ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>ADDED TO BAG</span>
            </>
          ) : (
            <>
              <Plus className="w-3.5 h-3.5" />
              <span>ADD TO BAG</span>
            </>
          )}
        </button>
      </div>

      {/* Product Details */}
      <Link href={`/product/${product.id}`} className="block">
        <p className="font-body-md text-xs md:text-sm uppercase text-neutral-900 mb-1 font-semibold group-hover:underline underline-offset-4 line-clamp-1">
          {product.nameEn}
        </p>
        <div className="flex items-center gap-2">
          <p className="font-price text-xs md:text-sm font-bold text-neutral-900">
            ৳ {product.priceBDT.toLocaleString()}
          </p>
          {product.originalPriceBDT && (
            <p className="font-price text-xs text-neutral-400 line-through">
              ৳ {product.originalPriceBDT.toLocaleString()}
            </p>
          )}
        </div>
      </Link>
    </div>
  );
};
