'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ProductItem } from '@/lib/queries/products';
import { useWishlistStore } from '@/lib/store/wishlist';
import { useCartStore } from '@/lib/store/cart';
import { Heart, ArrowUpRight } from 'lucide-react';

interface ProductCardProps {
  product: ProductItem;
  onQuickView?: (product: ProductItem) => void;
  editorial?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onQuickView,
  editorial = false,
}) => {
  const { isInWishlist, toggleWishlist } = useWishlistStore();
  const { addItem, openCart } = useCartStore();
  const wishlisted = isInWishlist(product.id);
  const [isHovered, setIsHovered] = useState(false);

  const primaryImage = product.images[0] || '/images/products/architectural-black-suit-1.jpg';
  const hoverImage = product.secondaryImage || product.images[1] || primaryImage;

  // Single badge priority logic
  const getBadge = () => {
    if (product.atelierSelection || product.atelierNumber) {
      return {
        text: `ATELIER / ${product.atelierNumber || '042'}`,
        bg: 'bg-[#542B2E] text-[#F2EDE4]', // Oxblood
      };
    }
    if (product.tag === 'NEW' || product.isNewArrival) {
      return {
        text: 'NEW ARRIVAL',
        bg: 'bg-[#241E1A] text-[#F2EDE4]', // Deep Espresso
      };
    }
    if (product.tag === 'LIMITED') {
      return {
        text: 'LIMITED EDITION',
        bg: 'bg-[#686B5E] text-[#F2EDE4]', // Muted Olive
      };
    }
    if (product.tag === 'SALE' || (product.originalPriceBDT && product.originalPriceBDT > product.priceBDT)) {
      return {
        text: 'PRIVATE ARCHIVE',
        bg: 'bg-[#38312B] text-[#F2EDE4]',
      };
    }
    return null;
  };

  const badge = getBadge();

  return (
    <div
      className="group relative flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* ── IMAGE CANVAS (3:4 Ratio, Unboxed) ── */}
      <Link
        href={`/products/${product.slug}`}
        className={`relative overflow-hidden bg-[#EBE5DB] block ${
          editorial ? 'aspect-[3/4]' : 'aspect-[3/4]'
        }`}
        aria-label={`View ${product.nameEn}`}
      >
        {/* Primary and Hover Image with Smooth Crossfade */}
        <img
          src={primaryImage}
          alt={product.nameEn}
          className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isHovered && hoverImage !== primaryImage
              ? 'opacity-0 scale-105'
              : 'opacity-100 scale-100 group-hover:scale-103'
          }`}
          loading="lazy"
        />

        {hoverImage !== primaryImage && (
          <img
            src={hoverImage}
            alt={`${product.nameEn} alternative perspective`}
            className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isHovered ? 'opacity-100 scale-103' : 'opacity-0 scale-100'
            }`}
            loading="lazy"
          />
        )}

        {/* Micro Badge (Quiet top-left placement) */}
        {badge && (
          <div className="absolute top-3 left-3 z-10">
            <span
              className={`text-[9px] uppercase tracking-[0.2em] px-2.5 py-1 font-medium select-none ${badge.bg}`}
            >
              {badge.text}
            </span>
          </div>
        )}

        {/* Wishlist Button (Minimal top-right, visible on mobile touch, hover on desktop) */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product.id, product.nameEn);
          }}
          className={`absolute top-2.5 right-2.5 z-10 w-8 h-8 flex items-center justify-center transition-all duration-300 ${
            wishlisted
              ? 'opacity-100 bg-[#241E1A] text-[#F2EDE4]'
              : 'opacity-90 sm:opacity-0 group-hover:opacity-100 bg-[#F2EDE4]/90 text-[#241E1A] hover:bg-[#241E1A] hover:text-[#F2EDE4]'
          }`}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
        >
          <Heart size={14} fill={wishlisted ? '#F2EDE4' : 'none'} strokeWidth={1.5} />
        </button>

        {/* Subtle quick-look hover bar at bottom (desktop) */}
        <div className="hidden sm:flex absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-[#241E1A]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 items-center justify-between text-[#F2EDE4]">
          <span className="text-[10px] uppercase tracking-[0.2em] font-medium">
            Explore Piece
          </span>
          <ArrowUpRight size={14} />
        </div>
      </Link>

      {/* ── PRODUCT INFORMATION (Unboxed, generous whitespace) ── */}
      <div className="mt-2.5 sm:mt-3.5 flex flex-col">
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-2">
          <Link
            href={`/products/${product.slug}`}
            className="font-serif text-xs sm:text-base text-[#241E1A] hover:text-[#686B5E] transition-colors leading-snug line-clamp-1"
          >
            {product.nameEn}
          </Link>
          <span className="text-xs sm:text-sm font-sans font-semibold text-[#241E1A] whitespace-nowrap tracking-wide">
            BDT {product.priceBDT.toLocaleString()}
          </span>
        </div>

        {/* Material & Tailoring note */}
        <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-[#686B5E] tracking-wider mt-0.5 sm:mt-1">
          <span className="truncate max-w-[140px] sm:max-w-[200px]">{product.material}</span>
          {product.colors && product.colors.length > 1 && (
            <span className="text-[9px] sm:text-[10px] text-[#B8B0A3] uppercase whitespace-nowrap">
              {product.colors.length} shades
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
