'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, Plus, Check, Eye } from 'lucide-react';
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
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'M');

  const secondaryImg = product.secondaryImage || product.images[1] || product.images[0];
  const hasSecondary = secondaryImg !== product.images[0];

  const discountPercent = product.originalPriceBDT && product.originalPriceBDT > product.priceBDT
    ? Math.round(((product.originalPriceBDT - product.priceBDT) / product.originalPriceBDT) * 100)
    : null;

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
      selectedSize: selectedSize || product.sizes[0] || 'M',
      selectedColor: product.colors[0]?.name || 'Standard',
    });
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      openDrawer();
    }, 500);
  };

  const handleQuickViewClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onQuickView) {
      onQuickView(product);
    }
  };

  return (
    <div
      className="group relative flex flex-col transition-all duration-300"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* ── Image Frame ── */}
      <div className={`relative overflow-hidden bg-[#F3F3F1] rounded-sm mb-3.5 ${editorial ? 'aspect-[3/4]' : 'aspect-[3/4] sm:aspect-[4/5]'}`}>
        
        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 z-20 flex flex-col gap-1.5 items-start">
          {product.tag && (
            <span
              className={`text-[9px] uppercase tracking-[0.16em] px-2 py-0.5 rounded-xs font-semibold shadow-xs ${
                product.tag === 'SALE'
                  ? 'bg-red-700 text-white'
                  : product.tag === 'NEW'
                  ? 'bg-black text-white'
                  : 'bg-zinc-800 text-white'
              }`}
            >
              {product.tag}
            </span>
          )}
          {discountPercent && !product.tag && (
            <span className="text-[9px] uppercase tracking-[0.14em] px-2 py-0.5 rounded-xs font-semibold bg-red-700 text-white shadow-xs">
              -{discountPercent}%
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product.id, product.nameEn);
          }}
          className={`absolute top-2.5 right-2.5 z-20 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer shadow-xs ${
            wishlisted
              ? 'bg-black text-white opacity-100'
              : 'bg-white/90 text-neutral-800 hover:bg-white hover:text-black opacity-100 md:opacity-0 md:group-hover:opacity-100 backdrop-blur-xs'
          }`}
          aria-label="Toggle wishlist"
        >
          <Heart
            className={`w-3.5 h-3.5 stroke-[1.5] transition-transform active:scale-125 ${
              wishlisted ? 'fill-white stroke-white' : 'stroke-current'
            }`}
          />
        </button>

        {/* Product Images with smooth Crossfade & Zoom */}
        <Link href={`/product/${product.id}`} className="absolute inset-0 block overflow-hidden">
          <Image
            src={product.images[0]}
            alt={product.nameEn}
            fill
            sizes={editorial
              ? '(max-width: 640px) 100vw, 50vw'
              : '(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw'
            }
            className={`object-cover object-top transition-all duration-500 ease-out group-hover:scale-[1.04] ${
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
              className={`object-cover object-top transition-all duration-500 ease-out group-hover:scale-[1.04] ${
                hovered ? 'opacity-100' : 'opacity-0'
              }`}
              priority={false}
            />
          )}
        </Link>

        {/* Quick View Button (Desktop center overlay) */}
        {onQuickView && (
          <button
            onClick={handleQuickViewClick}
            className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 items-center gap-1.5 px-3 py-1.5 bg-white/90 hover:bg-white text-black text-[11px] uppercase tracking-[0.1em] font-medium rounded-full shadow-md backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-105 cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 stroke-[1.5]" />
            Quick View
          </button>
        )}

        {/* Quick Add Bar — slides up on hover for desktop, compact action on mobile */}
        <div className="absolute bottom-0 left-0 w-full z-20">
          <button
            onClick={handleQuickAdd}
            className={`w-full py-2.5 px-3 bg-white/95 backdrop-blur-md border-t border-neutral-200 text-[11px] uppercase tracking-[0.14em] font-medium text-black flex items-center justify-center gap-1.5 transition-all duration-200 cursor-pointer hover:bg-black hover:text-white ${
              hovered
                ? 'translate-y-0 opacity-100'
                : 'translate-y-full opacity-0 md:translate-y-full md:opacity-0'
            } ${added ? '!bg-black !text-white !translate-y-0 !opacity-100' : ''}`}
            aria-label="Quick add to bag"
          >
            {added ? (
              <>
                <Check className="w-3.5 h-3.5 stroke-[2] text-emerald-400" />
                <span>Added to Bag</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5 stroke-[1.5]" />
                <span>Quick Add</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* ── Product Info ── */}
      <div className="flex flex-col gap-1 px-1">
        {/* Colors / Category subtext */}
        <div className="flex items-center justify-between text-[11px] text-neutral-500">
          <span className="capitalize">{product.category}</span>
          {product.colors.length > 0 && (
            <div className="flex items-center gap-1">
              <span className="text-[10px] uppercase text-neutral-400 font-mono">
                {product.colors.length} {product.colors.length === 1 ? 'Color' : 'Colors'}
              </span>
            </div>
          )}
        </div>

        {/* Product Title */}
        <Link
          href={`/product/${product.id}`}
          className="text-xs uppercase tracking-[0.06em] font-medium text-neutral-900 hover:text-neutral-500 transition-colors duration-150 line-clamp-1"
          title={product.nameEn}
        >
          {product.nameEn}
        </Link>

        {/* Price display */}
        <div className="flex items-baseline gap-2 mt-0.5">
          <span className={`text-xs font-semibold ${product.originalPriceBDT ? 'text-red-700' : 'text-black'}`}>
            ৳{product.priceBDT.toLocaleString()}
          </span>
          {product.originalPriceBDT && (
            <span className="text-[11px] text-neutral-400 line-through">
              ৳{product.originalPriceBDT.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
