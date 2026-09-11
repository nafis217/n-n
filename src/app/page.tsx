import React from 'react';
import Link from 'next/link';
import { HeroCarousel } from '@/components/home/HeroCarousel';
import { DhakaAfterDark } from '@/components/home/DhakaAfterDark';
import { ProductCard } from '@/components/product/ProductCard';
import { CATALOG_PRODUCTS } from '@/lib/queries/products';

export default function HomePage() {
  const featuredProducts = CATALOG_PRODUCTS.slice(0, 4);

  return (
    <div className="w-full bg-white">
      {/* Module 1: Animated Hero Video Banner */}
      <HeroCarousel />

      {/* Module 2: Dhaka After Dark - Full Screen 3-Part Video Layout */}
      <DhakaAfterDark />

      {/* Module 3: Modern New Arrivals Grid */}
      <section className="py-16 md:py-24 px-margin-mobile md:px-margin-desktop max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 pb-4 border-b border-neutral-200">
          <div>
            <span className="font-label-caps text-xs tracking-widest text-neutral-500 uppercase block mb-1 font-semibold">
              LIMITED DROP 2026
            </span>
            <h3 className="font-display-lg text-2xl md:text-4xl uppercase font-black tracking-tight text-neutral-900">
              NEW ARRIVALS
            </h3>
          </div>
          <Link
            href="/women"
            className="mt-4 md:mt-0 font-label-caps text-xs uppercase font-extrabold text-neutral-900 border-b-2 border-neutral-900 pb-0.5 hover:text-vermilion hover:border-vermilion transition-colors"
          >
            VIEW ALL PRODUCTS →
          </Link>
        </div>

        {/* 4-Column Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Module 4: Campaign Banner Grid (Modern Panjabi & Jamdani) */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-2 bg-neutral-900">
        <div className="relative aspect-[4/5] md:aspect-square flex items-center justify-center group overflow-hidden bg-neutral-950">
          <img
            src="/images/220801-05_0925_03_QC.webp"
            alt="Panjabi Collection"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-8 md:p-12 text-white">
            <span className="font-label-caps text-xs tracking-widest text-neutral-400 uppercase mb-1">
              ETHNIC REINVENTION
            </span>
            <h3 className="font-display text-2xl md:text-4xl font-black uppercase mb-4 tracking-tight">
              MODERN PANJABI
            </h3>
            <Link
              href="/panjabi"
              className="font-label-caps text-xs uppercase font-bold tracking-widest border-b border-white pb-1 w-fit hover:text-vermilion hover:border-vermilion transition-colors"
            >
              EXPLORE COLLECTION →
            </Link>
          </div>
        </div>

        <div className="relative aspect-[4/5] md:aspect-square flex items-center justify-center group overflow-hidden bg-neutral-950">
          <img
            src="/images/ZW_collection_14c93a0454-shwgiwqxbfpvvxk-3x4.webp"
            alt="Jamdani Stoles"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-8 md:p-12 text-white">
            <span className="font-label-caps text-xs tracking-widest text-neutral-400 uppercase mb-1">
              HERITAGE TEXTILES
            </span>
            <h3 className="font-display text-2xl md:text-4xl font-black uppercase mb-4 tracking-tight">
              JAMDANI REFRAMED
            </h3>
            <Link
              href="/collections"
              className="font-label-caps text-xs uppercase font-bold tracking-widest border-b border-white pb-1 w-fit hover:text-vermilion hover:border-vermilion transition-colors"
            >
              EXPLORE ARCHIVE →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
