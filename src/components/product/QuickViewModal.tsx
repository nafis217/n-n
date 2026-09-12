'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ProductItem } from '@/lib/queries/products';
import { useCartStore } from '@/lib/store/cart';
import { useWishlistStore } from '@/lib/store/wishlist';
import { toast } from '@/lib/store/toast';
import { X, Heart, ShoppingBag, Star, Check, ArrowRight } from 'lucide-react';

interface QuickViewModalProps {
  product: ProductItem | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenSizeGuide?: () => void;
}

export function QuickViewModal({ product, isOpen, onClose, onOpenSizeGuide }: QuickViewModalProps) {
  const { addItem, openDrawer } = useCartStore();
  const { isInWishlist, toggleWishlist } = useWishlistStore();

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState(1);

  // Initialize defaults on product change
  React.useEffect(() => {
    if (product) {
      setSelectedImageIndex(0);
      setSelectedSize(product.sizes[0] || 'M');
      setSelectedColor(product.colors[0]?.name || '');
      setQuantity(1);
    }
  }, [product]);

  if (!isOpen || !product) return null;

  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.warning('Please Select a Size');
      return;
    }

    addItem({
      id: product.id,
      title: product.nameEn,
      price: product.priceBDT,
      currency: 'BDT',
      image: product.images[selectedImageIndex] || product.images[0],
      quantity,
      selectedSize,
      selectedColor,
    });

    onClose();
    openDrawer();
  };

  return (
    <div className="fixed inset-0 z-[9995] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity animate-in fade-in"
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-4xl bg-white border border-neutral-300 text-neutral-900 overflow-hidden shadow-2xl z-10 grid grid-cols-1 md:grid-cols-2 animate-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-neutral-100 text-neutral-700 hover:text-black hover:bg-neutral-200 transition-colors border border-neutral-300 shadow-xs"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Product Gallery (Left) */}
        <div className="bg-neutral-50 p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-neutral-200">
          <div className="relative aspect-[3/4] w-full bg-neutral-100 overflow-hidden border border-neutral-200">
            <Image
              src={product.images[selectedImageIndex] || product.images[0]}
              alt={product.nameEn}
              fill
              className="object-cover transition-all duration-300"
            />
            {product.tag && (
              <span className="absolute top-3 left-3 px-2.5 py-1 bg-black border border-black text-[10px] font-mono tracking-widest uppercase text-white font-bold shadow-xs">
                {product.tag}
              </span>
            )}
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`relative w-14 h-18 aspect-[3/4] shrink-0 border transition-all ${
                    selectedImageIndex === idx ? 'border-black ring-1 ring-black' : 'border-neutral-200 opacity-60 hover:opacity-100'
                  }`}
                >
                  <Image src={img} alt="" fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Config (Right) */}
        <div className="p-6 md:p-8 flex flex-col justify-between overflow-y-auto max-h-[80vh] md:max-h-[600px] bg-white">
          <div>
            {/* Category & Rating */}
            <div className="flex items-center justify-between text-xs font-mono text-neutral-500 uppercase tracking-wider mb-2">
              <span>{product.category} • {product.gender}</span>
              <div className="flex items-center gap-1 text-black">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span className="font-bold text-black">{product.rating}</span>
                <span className="text-neutral-400">({product.reviewCount})</span>
              </div>
            </div>

            {/* Title & Bengali Subtitle */}
            <h2 className="font-display text-xl font-bold uppercase tracking-wider text-black mb-1">
              {product.nameEn}
            </h2>
            <div className="text-xs text-neutral-500 font-serif mb-4">
              {product.nameBn}
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-2xl font-mono font-bold text-black">
                ৳{product.priceBDT.toLocaleString()}
              </span>
              {product.originalPriceBDT && (
                <span className="text-sm font-mono text-neutral-400 line-through">
                  ৳{product.originalPriceBDT.toLocaleString()}
                </span>
              )}
            </div>

            {/* Short Description */}
            <p className="text-xs text-neutral-600 leading-relaxed mb-6 font-sans">
              {product.shortDescription}
            </p>

            {/* Color Selector */}
            {product.colors.length > 0 && (
              <div className="mb-5">
                <div className="flex justify-between text-xs font-mono uppercase tracking-wider text-neutral-600 mb-2">
                  <span>Color: <strong className="text-black">{selectedColor}</strong></span>
                </div>
                <div className="flex gap-2">
                  {product.colors.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => {
                        setSelectedColor(c.name);
                        if (c.imageIndex !== undefined) setSelectedImageIndex(c.imageIndex);
                      }}
                      className={`w-7 h-7 rounded-full border-2 transition-transform ${
                        selectedColor === c.name ? 'border-black scale-110 shadow-md ring-2 ring-black' : 'border-neutral-300 opacity-70 hover:opacity-100'
                      }`}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Size Selector */}
            <div className="mb-6">
              <div className="flex justify-between text-xs font-mono uppercase tracking-wider text-neutral-600 mb-2">
                <span>Select Size: <strong className="text-black">{selectedSize}</strong></span>
                {onOpenSizeGuide && (
                  <button
                    onClick={onOpenSizeGuide}
                    className="text-black hover:underline font-bold text-[11px]"
                  >
                    Size Guide
                  </button>
                )}
              </div>
              <div className="grid grid-cols-4 gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`py-2 text-xs font-mono uppercase tracking-wider border text-center transition-all ${
                      selectedSize === s
                        ? 'border-black bg-black text-white font-bold shadow-sm'
                        : 'border-neutral-300 bg-white text-neutral-800 hover:border-black'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-4 border-t border-neutral-200 space-y-3">
            <div className="flex gap-3">
              <button
                onClick={handleAddToCart}
                className="flex-1 py-3.5 bg-black text-white hover:bg-neutral-800 font-display font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 transition-all shadow-md group"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Bag • ৳{(product.priceBDT * quantity).toLocaleString()}</span>
              </button>

              <button
                onClick={() => toggleWishlist(product.id, product.nameEn)}
                className={`p-3.5 border transition-colors ${
                  inWishlist
                    ? 'border-black bg-neutral-100 text-black font-bold'
                    : 'border-neutral-300 bg-white text-neutral-600 hover:text-black hover:border-black'
                }`}
                aria-label="Toggle wishlist"
              >
                <Heart className={`w-4 h-4 ${inWishlist ? 'fill-current' : ''}`} />
              </button>
            </div>

            <Link
              href={`/product/${product.id}`}
              onClick={onClose}
              className="w-full py-2.5 text-center text-xs font-mono text-neutral-600 hover:text-black flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>View Full Garment Dossier & Reviews</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
