'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProductBySlug, CATALOG_PRODUCTS, getRelatedProducts } from '@/lib/queries/products';
import { useCartStore } from '@/lib/store/cart';
import { useWishlistStore } from '@/lib/store/wishlist';
import { ProductCard } from '@/components/product/ProductCard';
import { SHMonogram } from '@/components/brand/SHMonogram';
import { Heart, ShieldCheck, Truck, RotateCcw, ChevronDown, Check, ArrowLeft } from 'lucide-react';

interface ProductDetailPageProps {
  params: { slug: string };
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = params;
  const product = getProductBySlug(slug) || CATALOG_PRODUCTS.find((p) => p.id === slug);

  if (!product) {
    notFound();
  }

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || '40R');
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0]?.name || 'Standard');
  const [activeTab, setActiveTab] = useState<'details' | 'specs' | 'care' | 'delivery'>('details');
  const [added, setAdded] = useState(false);

  const { addItem, openCart } = useCartStore();
  const { isInWishlist, toggleWishlist } = useWishlistStore();
  const wishlisted = isInWishlist(product.id);

  const relatedProducts = getRelatedProducts(product.id, 3);

  const handleAddToBag = () => {
    addItem({
      id: product.id,
      title: product.nameEn,
      price: product.priceBDT,
      image: product.images[selectedImageIndex] || product.images[0],
      selectedSize,
      selectedColor,
      quantity: 1,
    });
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      openCart();
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#F2EDE4] text-[#241E1A] pt-8 sm:pt-12 pb-24">
      {/* ── Breadcrumb Navigation ── */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 mb-8">
        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#686B5E]">
          <Link href="/" className="hover:text-[#241E1A] transition-colors">
            Home
          </Link>
          <span className="text-[#B8B0A3]">•</span>
          <Link href="/collections/clothing" className="hover:text-[#241E1A] transition-colors">
            {product.category}
          </Link>
          <span className="text-[#B8B0A3]">•</span>
          <span className="text-[#241E1A] font-medium truncate max-w-xs">{product.nameEn}</span>
        </div>
      </div>

      {/* ── Main PDP Split: 58% Gallery / 42% Sticky Info ── */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* ──────────────────────────────────────────────────
              LEFT: 58% Image Gallery (3:4 ratio, multi-view)
          ────────────────────────────────────────────────── */}
          <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4">
            {/* Thumbnails list */}
            {product.images.length > 1 && (
              <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto md:w-20 flex-shrink-0">
                {product.images.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`aspect-[3/4] w-16 md:w-full bg-[#EBE5DB] border transition-all overflow-hidden ${
                      selectedImageIndex === idx
                        ? 'border-[#241E1A] opacity-100'
                        : 'border-[#B8B0A3]/30 opacity-70 hover:opacity-100'
                    }`}
                    aria-label={`View image ${idx + 1}`}
                  >
                    <img
                      src={imgUrl}
                      alt={`${product.nameEn} thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Main Stage Image (3:4 Aspect Ratio) */}
            <div className="flex-1 aspect-[3/4] bg-[#EBE5DB] overflow-hidden relative shadow-sm">
              <img
                src={product.images[selectedImageIndex] || product.images[0]}
                alt={product.nameEn}
                className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
              />

              {/* Atelier Badge Overlay */}
              {(product.atelierSelection || product.atelierNumber) && (
                <div className="absolute top-4 left-4 bg-[#542B2E] text-[#F2EDE4] px-3 py-1 text-[9px] uppercase tracking-[0.25em] font-medium">
                  ATELIER SELECTION / {product.atelierNumber || '042'}
                </div>
              )}
            </div>
          </div>

          {/* ──────────────────────────────────────────────────
              RIGHT: 42% Sticky Information Panel
          ────────────────────────────────────────────────── */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 flex flex-col space-y-6">
            {/* Title & Atelier Line */}
            <div>
              <div className="flex items-center justify-between gap-4 mb-2">
                <span className="text-[10px] uppercase tracking-[0.28em] text-[#686B5E] font-medium">
                  {product.category} • {product.gender}
                </span>
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#A8946C] font-semibold">
                  Atelier Dhaka
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-serif text-[#241E1A] font-normal leading-tight">
                {product.nameEn}
              </h1>

              <div className="mt-3 flex items-baseline gap-3">
                <span className="text-lg sm:text-xl font-sans font-medium text-[#241E1A] tracking-wide">
                  BDT {product.priceBDT.toLocaleString()}
                </span>
                {product.originalPriceBDT && product.originalPriceBDT > product.priceBDT && (
                  <span className="text-sm font-sans text-[#B8B0A3] line-through">
                    BDT {product.originalPriceBDT.toLocaleString()}
                  </span>
                )}
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-[#686B5E] font-sans leading-relaxed border-t border-[#B8B0A3]/25 pt-4">
              {product.description || product.shortDescription}
            </p>

            {/* Color Selection */}
            {product.colors && product.colors.length > 0 && (
              <div className="border-t border-[#B8B0A3]/25 pt-4">
                <div className="flex items-center justify-between text-xs tracking-wider uppercase mb-2.5">
                  <span className="text-[#686B5E]">Color</span>
                  <span className="text-[#241E1A] font-medium">{selectedColor}</span>
                </div>
                <div className="flex gap-2">
                  {product.colors.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setSelectedColor(c.name)}
                      className={`text-xs px-3.5 py-1.5 border transition-all ${
                        selectedColor === c.name
                          ? 'border-[#241E1A] bg-[#241E1A] text-[#F2EDE4]'
                          : 'border-[#B8B0A3]/50 text-[#241E1A] hover:border-[#241E1A]'
                      }`}
                    >
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Rectilinear Size Selection */}
            <div className="border-t border-[#B8B0A3]/25 pt-4">
              <div className="flex items-center justify-between text-xs tracking-wider uppercase mb-2.5">
                <span className="text-[#686B5E]">Select Proportions</span>
                <span className="text-[10px] text-[#A8946C] cursor-pointer hover:underline">
                  Size Guide
                </span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {product.sizes.map((sz) => {
                  const isSelected = selectedSize === sz;
                  return (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`h-11 text-xs uppercase font-medium tracking-wider transition-all flex items-center justify-center border ${
                        isSelected
                          ? 'bg-[#241E1A] text-[#F2EDE4] border-[#241E1A]'
                          : 'bg-transparent text-[#241E1A] border-[#B8B0A3]/60 hover:border-[#241E1A]'
                      }`}
                    >
                      {sz}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Add to Bag CTA & Wishlist Button */}
            <div className="pt-2 flex gap-3">
              <button
                onClick={handleAddToBag}
                className="flex-1 sh-btn-primary flex items-center justify-center gap-2"
              >
                {added ? (
                  <>
                    <Check size={16} />
                    <span>Added to Bag</span>
                  </>
                ) : (
                  <span>Add to Bag</span>
                )}
              </button>

              <button
                onClick={() => toggleWishlist(product.id, product.nameEn)}
                className={`w-12 h-12 flex items-center justify-center border transition-colors ${
                  wishlisted
                    ? 'bg-[#241E1A] text-[#F2EDE4] border-[#241E1A]'
                    : 'bg-transparent text-[#241E1A] border-[#B8B0A3]/60 hover:border-[#241E1A]'
                }`}
                aria-label="Toggle wishlist"
              >
                <Heart size={16} fill={wishlisted ? '#F2EDE4' : 'none'} strokeWidth={1.5} />
              </button>
            </div>

            {/* ── Structured Product Specifications Table ── */}
            <div className="border-t border-[#B8B0A3]/25 pt-6">
              <div className="flex gap-4 border-b border-[#B8B0A3]/30 pb-2 mb-4 text-[11px] uppercase tracking-[0.2em] font-medium">
                <button
                  onClick={() => setActiveTab('details')}
                  className={`pb-1 ${activeTab === 'details' ? 'text-[#241E1A] border-b border-[#241E1A]' : 'text-[#686B5E]'}`}
                >
                  Tailoring & Fit
                </button>
                <button
                  onClick={() => setActiveTab('specs')}
                  className={`pb-1 ${activeTab === 'specs' ? 'text-[#241E1A] border-b border-[#241E1A]' : 'text-[#686B5E]'}`}
                >
                  Composition
                </button>
                <button
                  onClick={() => setActiveTab('delivery')}
                  className={`pb-1 ${activeTab === 'delivery' ? 'text-[#241E1A] border-b border-[#241E1A]' : 'text-[#686B5E]'}`}
                >
                  Delivery & Care
                </button>
              </div>

              {activeTab === 'details' && (
                <div className="space-y-2 text-xs text-[#686B5E] leading-relaxed">
                  <p><strong>Fit:</strong> {product.fit}</p>
                  <ul className="list-disc list-inside space-y-1 mt-2">
                    {product.details?.map((d, i) => (
                      <li key={i}>{d}</li>
                    ))}
                  </ul>
                </div>
              )}

              {activeTab === 'specs' && (
                <div className="grid grid-cols-2 gap-3 text-xs text-[#686B5E]">
                  <div className="p-2.5 bg-[#EBE5DB]">
                    <span className="text-[10px] uppercase tracking-wider text-[#B8B0A3] block">Fabric</span>
                    <span className="text-[#241E1A] font-medium">{product.specs?.fabric || product.material}</span>
                  </div>
                  <div className="p-2.5 bg-[#EBE5DB]">
                    <span className="text-[10px] uppercase tracking-wider text-[#B8B0A3] block">Origin</span>
                    <span className="text-[#241E1A] font-medium">{product.specs?.origin || 'England / Italy'}</span>
                  </div>
                  <div className="p-2.5 bg-[#EBE5DB]">
                    <span className="text-[10px] uppercase tracking-wider text-[#B8B0A3] block">Construction</span>
                    <span className="text-[#241E1A] font-medium">{product.specs?.construction || 'Bespoke Hand Finished'}</span>
                  </div>
                  <div className="p-2.5 bg-[#EBE5DB]">
                    <span className="text-[10px] uppercase tracking-wider text-[#B8B0A3] block">Weight</span>
                    <span className="text-[#241E1A] font-medium">{product.specs?.weight || '380gsm Heavyweave'}</span>
                  </div>
                </div>
              )}

              {activeTab === 'delivery' && (
                <div className="space-y-3 text-xs text-[#686B5E]">
                  <div className="flex items-start gap-2.5">
                    <Truck size={14} className="text-[#A8946C] mt-0.5 flex-shrink-0" />
                    <span>Complimentary express delivery in Dhaka (24-48h). Shipped in rigid garment box.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <RotateCcw size={14} className="text-[#A8946C] mt-0.5 flex-shrink-0" />
                    <span>14-day return window in unworn condition with tags and original packaging intact.</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Related Atelier Pieces ── */}
      {relatedProducts.length > 0 && (
        <div className="max-w-[1600px] mx-auto px-4 sm:px-8 mt-32 border-t border-[#B8B0A3]/30 pt-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#686B5E] block mb-1">
                Complementary Proportions
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif text-[#241E1A]">
                You May Also Consider
              </h2>
            </div>
            <Link
              href="/collections/clothing"
              className="text-xs uppercase tracking-[0.18em] font-medium text-[#241E1A] hover:underline"
            >
              All Pieces
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} editorial={true} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
