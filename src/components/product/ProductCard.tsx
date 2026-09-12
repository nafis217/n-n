'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, Plus, Check, Eye, Star, ShoppingBag } from 'lucide-react';
import { ProductItem } from '@/lib/queries/products';
import { useWishlistStore } from '@/lib/store/wishlist';
import { useCartStore } from '@/lib/store/cart';

interface ProductCardProps {
  product: ProductItem;
  onQuickView?: (product: ProductItem) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  const { isInWishlist, toggleWishlist } = useWishlistStore();
  const { addItem, openDrawer } = useCartStore();
  const wishlisted = isInWishlist(product.id);
  const [added, setAdded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

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
    setTimeout(() => {
      setAdded(false);
      openDrawer();
    }, 400);
  };

  const handleQuickViewClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onQuickView) {
      onQuickView(product);
    }
  };

  const secondaryImg = product.secondaryImage || product.images[1] || product.images[0];

  return (
    <div
      className="group flex flex-col relative bg-transparent"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image Frame */}
      <div className="aspect-[3/4] relative overflow-hidden bg-[#F4F4F5] border border-neutral-200 mb-3 group/frame">
        {/* Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
          {product.tag && (
            <span
              className={`px-2.5 py-1 text-[9px] font-mono font-bold uppercase tracking-widest ${
                product.tag === 'SALE'
                  ? 'bg-black text-white border border-black'
                  : product.tag === 'NEW'
                  ? 'bg-neutral-900 text-white border border-neutral-900'
                  : 'bg-white text-black border border-neutral-300'
              }`}
            >
              {product.tag}
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
          className={`absolute top-3 right-3 z-10 p-2 backdrop-blur-md transition-all rounded-full ${
            wishlisted
              ? 'bg-black text-white'
              : 'bg-white/90 text-neutral-700 hover:text-white hover:bg-black border border-neutral-200 shadow-sm'
          }`}
          aria-label="Toggle Wishlist"
        >
          <Heart className={`w-3.5 h-3.5 ${wishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Dual Layer Images for Transition */}
        <Link href={`/product/${product.id}`} className="block w-full h-full relative">
          <Image
            src={product.images[0]}
            alt={product.nameEn}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className={`object-cover transition-opacity duration-700 ease-out ${
              isHovered && secondaryImg ? 'opacity-0' : 'opacity-100'
            }`}
          />
          {secondaryImg && (
            <Image
              src={secondaryImg}
              alt={product.nameEn}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className={`object-cover transition-all duration-700 ease-out ${
                isHovered ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
              }`}
            />
          )}
        </Link>

        {/* Quick View Button (Desktop Hover) */}
        {onQuickView && (
          <button
            onClick={handleQuickViewClick}
            className="hidden md:flex items-center gap-1.5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 px-4 py-2.5 bg-white/95 backdrop-blur-md border border-neutral-300 text-black text-[10px] font-display uppercase tracking-widest font-bold opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-black hover:text-white hover:border-black shadow-lg"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>
        )}

        {/* Quick Add To Bag Bar */}
        <button
          onClick={handleQuickAdd}
          className={`absolute bottom-0 left-0 w-full py-3 px-4 text-[10px] font-display uppercase tracking-widest font-bold flex items-center justify-center gap-2 transition-all duration-300 z-10 ${
            added
              ? 'bg-black text-white translate-y-0 opacity-100'
              : 'bg-black text-white hover:bg-neutral-800 md:translate-y-full md:group-hover:translate-y-0 md:opacity-0 md:group-hover:opacity-100 translate-y-0 opacity-100'
          }`}
        >
          {added ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>Added to Bag</span>
            </>
          ) : (
            <>
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Quick Add</span>
            </>
          )}
        </button>
      </div>

      {/* Product Information */}
      <div className="flex flex-col flex-1">
        {/* Category & Star Rating */}
        <div className="flex items-center justify-between text-[10px] font-mono text-neutral-500 uppercase tracking-wider mb-1">
          <span>{product.category}</span>
          <div className="flex items-center gap-1 text-black">
            <Star className="w-3 h-3 fill-current" />
            <span className="text-black font-bold">{product.rating}</span>
          </div>
        </div>

        {/* Product Title */}
        <Link
          href={`/product/${product.id}`}
          className="font-display text-xs tracking-wider uppercase text-neutral-900 font-semibold hover:text-neutral-500 transition-colors line-clamp-1 mb-1.5"
        >
          {product.nameEn}
        </Link>

        {/* Color Palette Indicators */}
        {product.colors.length > 0 && (
          <div className="flex gap-1.5 mb-2">
            {product.colors.map((c) => (
              <span
                key={c.id}
                className="w-2.5 h-2.5 rounded-full border border-neutral-300 shadow-xs"
                style={{ backgroundColor: c.hex }}
                title={c.name}
              />
            ))}
          </div>
        )}

        {/* Price Row */}
        <div className="flex items-center gap-2 mt-auto">
          <p className="font-mono text-xs font-bold text-black">
            ৳{product.priceBDT.toLocaleString()}
          </p>
          {product.originalPriceBDT && (
            <p className="font-mono text-[10px] text-neutral-400 line-through">
              ৳{product.originalPriceBDT.toLocaleString()}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
