'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, Plus, Check } from 'lucide-react';
import { ProductItem } from '@/lib/queries/products';
import { useWishlistStore } from '@/lib/store/wishlist';
import { useCartStore } from '@/lib/store/cart';

interface ProductCardProps {
  product: ProductItem;
  onQuickView?: (product: ProductItem) => void;
  /** Display in 2-column editorial mode (larger images) */
  editorial?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView, editorial = false }) => {
  const { isInWishlist, toggleWishlist } = useWishlistStore();
  const { addItem, openDrawer } = useCartStore();
  const wishlisted = isInWishlist(product.id);
  const [added, setAdded] = useState(false);
  const [hovered, setHovered] = useState(false);

  const secondaryImg = product.secondaryImage || product.images[1] || product.images[0];
  const hasSecondary = secondaryImg !== product.images[0];

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id: product.id,
      title: product.nameEn,
      price: product.priceBDT,
      currency: 'BDT',
      image: product.images[0],
      quantity: 1,
      selectedSize: product.sizes[0] || 'M',
      selectedColor: product.colors[0]?.name || 'Standard',
    });
    setAdded(true);
    setTimeout(() => { setAdded(false); openDrawer(); }, 600);
  };

  return (
    <div
      className="group flex flex-col"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* ── Image Frame ── */}
      <div className={`relative overflow-hidden bg-[#F3F3F1] mb-3 ${editorial ? 'aspect-[3/4]' : 'aspect-[4/5]'}`}>

        {/* Sale / New badge — minimal */}
        {product.tag && (product.tag === 'SALE' || product.tag === 'NEW' || product.tag === 'LIMITED') && (
          <div className="absolute top-3 left-3 z-10">
            <span
              className={`text-[9px] uppercase tracking-[0.15em] px-2 py-1 font-medium ${
                product.tag === 'SALE'
                  ? 'bg-[#B42318] text-white'
                  : 'bg-[#111111] text-white'
              }`}
            >
              {product.tag}
            </span>
          </div>
        )}

        {/* Wishlist — appears on hover */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product.id, product.nameEn);
          }}
          className={`absolute top-3 right-3 z-10 p-1.5 transition-all duration-200 ${
            hovered || wishlisted ? 'opacity-100' : 'opacity-0'
          }`}
          aria-label="Toggle wishlist"
        >
          <Heart
            className={`w-4 h-4 stroke-[1.25] transition-colors duration-150 ${
              wishlisted ? 'fill-[#111111] stroke-[#111111]' : 'stroke-[#111111]'
            }`}
          />
        </button>

        {/* Product image with hover crossfade */}
        <Link href={`/product/${product.id}`} className="absolute inset-0 block">
          <Image
            src={product.images[0]}
            alt={product.nameEn}
            fill
            sizes={editorial
              ? '(max-width: 640px) 100vw, 50vw'
              : '(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw'
            }
            className={`object-cover transition-opacity duration-300 ${
              hovered && hasSecondary ? 'opacity-0' : 'opacity-100'
            }`}
            priority={false}
          />
          {hasSecondary && (
            <Image
              src={secondaryImg}
              alt={product.nameEn}
              fill
              sizes={editorial
                ? '(max-width: 640px) 100vw, 50vw'
                : '(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw'
              }
              className={`object-cover transition-opacity duration-300 ${
                hovered ? 'opacity-100' : 'opacity-0'
              }`}
              priority={false}
            />
          )}
        </Link>

        {/* Quick add — slides up from bottom on hover (desktop), always visible mobile */}
        <button
          onClick={handleQuickAdd}
          className={`absolute bottom-0 left-0 w-full z-10 py-3 bg-white/95 backdrop-blur-sm border-t border-[#E8E8E5] text-label uppercase tracking-[0.12em] text-[#111111] flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer hover:bg-[#111111] hover:text-white ${
            hovered
              ? 'translate-y-0 opacity-100'
              : 'translate-y-full opacity-0 md:translate-y-full md:opacity-0'
          } ${added ? 'bg-[#111111] text-white translate-y-0 opacity-100' : ''}`}
          aria-label="Quick add to bag"
        >
          {added ? (
            <>
              <Check className="w-3.5 h-3.5 stroke-[1.5]" />
              <span>Added</span>
            </>
          ) : (
            <>
              <Plus className="w-3.5 h-3.5 stroke-[1.5]" />
              <span>Quick Add</span>
            </>
          )}
        </button>
      </div>

      {/* ── Product Info ── */}
      <div className="flex flex-col gap-0.5 px-0.5">
        <Link
          href={`/product/${product.id}`}
          className="text-label uppercase tracking-[0.08em] text-[#111111] hover:text-[#6B6B6B] transition-colors duration-150 line-clamp-1"
        >
          {product.nameEn}
        </Link>

        {product.colors.length > 0 && (
          <p className="text-label text-[#9B9B9B]">
            {product.colors[0]?.name}
            {product.colors.length > 1 && ` +${product.colors.length - 1}`}
          </p>
        )}

        <div className="flex items-center gap-2.5 mt-0.5">
          <span className={`text-label ${product.originalPriceBDT ? 'price-sale' : 'text-[#111111]'}`}>
            ৳{product.priceBDT.toLocaleString()}
          </span>
          {product.originalPriceBDT && (
            <span className="text-label price-original">
              ৳{product.originalPriceBDT.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
