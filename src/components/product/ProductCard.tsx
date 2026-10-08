'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ProductItem } from '@/lib/queries/products';
import { useWishlistStore } from '@/lib/store/wishlist';
import { useCartStore } from '@/lib/store/cart';
import { Heart, ArrowUpRight, ShoppingBag, Plus, Check } from 'lucide-react';
import { toast } from '@/lib/store/toast';

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
  const { addItem, openDrawer } = useCartStore();
  const wishlisted = isInWishlist(product.id);
  const [isHovered, setIsHovered] = useState(false);
  const [showSizePicker, setShowSizePicker] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [addedSize, setAddedSize] = useState<string | null>(null);

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

  // Quick Add Item with specific size
  const handleQuickAdd = (e: React.MouseEvent, chosenSize?: string) => {
    e.preventDefault();
    e.stopPropagation();

    const sizeToAdd = chosenSize || product.sizes[0] || 'M';
    setIsAdding(true);
    setAddedSize(sizeToAdd);

    addItem({
      id: `${product.id}-${sizeToAdd}`,
      productId: product.id,
      title: product.nameEn,
      price: product.priceBDT,
      priceBDT: product.priceBDT,
      currency: 'BDT',
      image: primaryImage,
      selectedSize: sizeToAdd,
      selectedColor: product.colors[0]?.name || 'Standard',
      quantity: 1,
    });

    toast.success('Added to Bag', `${product.nameEn} (${sizeToAdd}) has been added.`);
    openDrawer();

    setTimeout(() => {
      setIsAdding(false);
      setAddedSize(null);
      setShowSizePicker(false);
    }, 1200);
  };

  return (
    <div
      className="group relative flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setShowSizePicker(false);
      }}
    >
      {/* ── IMAGE CANVAS (3:4 Ratio, Unboxed) ── */}
      <div
        className={`relative overflow-hidden bg-[#EBE5DB] block ${
          editorial ? 'aspect-[3/4]' : 'aspect-[3/4]'
        }`}
      >
        <Link
          href={`/products/${product.slug}`}
          className="absolute inset-0 block w-full h-full"
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
        </Link>

        {/* Micro Badge (Quiet top-left placement) */}
        {badge && (
          <div className="absolute top-3 left-3 z-10 pointer-events-none">
            <span
              className={`text-[9px] uppercase tracking-[0.2em] px-2.5 py-1 font-medium select-none shadow-xs ${badge.bg}`}
            >
              {badge.text}
            </span>
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product.id, product.nameEn);
          }}
          className={`absolute top-2.5 right-2.5 z-20 w-8 h-8 flex items-center justify-center transition-all duration-300 rounded-xs ${
            wishlisted
              ? 'opacity-100 bg-[#241E1A] text-[#F2EDE4]'
              : 'opacity-90 sm:opacity-0 group-hover:opacity-100 bg-[#F2EDE4]/90 text-[#241E1A] hover:bg-[#241E1A] hover:text-[#F2EDE4]'
          }`}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
        >
          <Heart size={14} fill={wishlisted ? '#F2EDE4' : 'none'} strokeWidth={1.5} />
        </button>

        {/* ── QUICK ADD HOVER OVERLAY ── */}
        <div className="absolute inset-x-0 bottom-0 z-20 p-2 sm:p-3 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0">
          {!showSizePicker ? (
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (product.sizes && product.sizes.length > 1) {
                    setShowSizePicker(true);
                  } else {
                    handleQuickAdd(e, product.sizes[0]);
                  }
                }}
                disabled={isAdding}
                className="flex-1 bg-[#F2EDE4] hover:bg-white text-[#241E1A] py-2.5 px-3 font-mono text-[11px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-lg transition-all active:scale-95 cursor-pointer"
              >
                {isAdding ? (
                  <>
                    <Check size={13} className="text-emerald-600 stroke-[3]" />
                    <span>Added to Bag</span>
                  </>
                ) : (
                  <>
                    <Plus size={13} className="stroke-[2.5]" />
                    <span>Quick Add {product.sizes && product.sizes.length > 1 ? '• Select Size' : ''}</span>
                  </>
                )}
              </button>

              <Link
                href={`/products/${product.slug}`}
                className="p-2.5 bg-black/60 hover:bg-black text-white flex items-center justify-center transition-colors cursor-pointer"
                title="View Full Product Details"
              >
                <ArrowUpRight size={14} />
              </Link>
            </div>
          ) : (
            /* Quick Size Selector Bar */
            <div className="bg-[#241E1A]/95 p-2 rounded-xs border border-white/20 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-white/10 text-[10px] font-mono text-neutral-300">
                <span className="font-bold uppercase tracking-wider text-amber-300">Select Size</span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setShowSizePicker(false);
                  }}
                  className="text-neutral-400 hover:text-white uppercase font-bold"
                >
                  Close ✕
                </button>
              </div>

              <div className="grid grid-cols-4 gap-1.5">
                {product.sizes.map((sizeOption) => (
                  <button
                    key={sizeOption}
                    type="button"
                    onClick={(e) => handleQuickAdd(e, sizeOption)}
                    disabled={isAdding && addedSize === sizeOption}
                    className={`py-1.5 text-center font-mono text-xs font-bold uppercase transition-all cursor-pointer ${
                      addedSize === sizeOption
                        ? 'bg-emerald-600 text-white'
                        : 'bg-white/10 hover:bg-white text-white hover:text-[#241E1A]'
                    }`}
                  >
                    {addedSize === sizeOption ? '✓' : sizeOption}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── PRODUCT INFORMATION & MOBILE QUICK ADD ── */}
      <div className="mt-2 sm:mt-3.5 flex flex-col">
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-0.5 sm:gap-2">
          <Link
            href={`/products/${product.slug}`}
            className="font-serif text-xs sm:text-base text-[#241E1A] hover:text-[#686B5E] transition-colors leading-snug line-clamp-1 font-bold"
          >
            {product.nameEn}
          </Link>
          <span className="text-xs sm:text-sm font-sans font-semibold text-[#241E1A] whitespace-nowrap tracking-wide">
            BDT {product.priceBDT.toLocaleString()}
          </span>
        </div>

        {/* Material & Tailoring note */}
        <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-[#686B5E] tracking-wider mt-0.5 sm:mt-1">
          <span className="truncate max-w-[130px] sm:max-w-[200px]">{product.material}</span>
          {product.colors && product.colors.length > 1 && (
            <span className="text-[9px] sm:text-[10px] text-[#B8B0A3] uppercase whitespace-nowrap">
              {product.colors.length} shades
            </span>
          )}
        </div>

        {/* Dedicated Mobile Quick Add Button (Visible on Touch Screens / Mobile) */}
        <div className="sm:hidden mt-2 pt-1.5 border-t border-[#B8B0A3]/25">
          {!showSizePicker ? (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (product.sizes && product.sizes.length > 1) {
                  setShowSizePicker(true);
                } else {
                  handleQuickAdd(e, product.sizes[0]);
                }
              }}
              disabled={isAdding}
              className="w-full bg-[#241E1A] active:bg-black text-[#F2EDE4] py-2 px-2.5 font-mono text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 rounded-sm shadow-xs active:scale-[0.98] transition-all"
            >
              {isAdding ? (
                <>
                  <Check size={12} className="text-emerald-400 stroke-[3]" />
                  <span>Added to Bag</span>
                </>
              ) : (
                <>
                  <Plus size={12} className="stroke-[2.5]" />
                  <span>Add to Bag {product.sizes && product.sizes.length > 1 ? `(${product.sizes[0]})` : ''}</span>
                </>
              )}
            </button>
          ) : (
            <div className="bg-[#241E1A] p-2 rounded-sm text-white animate-in fade-in duration-150">
              <div className="flex items-center justify-between pb-1 mb-1 border-b border-white/15 text-[9px] font-mono">
                <span className="text-amber-300 font-bold uppercase">Select Size</span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setShowSizePicker(false);
                  }}
                  className="text-neutral-400 hover:text-white"
                >
                  ✕
                </button>
              </div>
              <div className="grid grid-cols-4 gap-1">
                {product.sizes.map((sz) => (
                  <button
                    key={sz}
                    type="button"
                    onClick={(e) => handleQuickAdd(e, sz)}
                    className="py-1 text-center font-mono text-[10px] font-bold bg-white/10 active:bg-white active:text-[#241E1A] rounded-xs"
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
