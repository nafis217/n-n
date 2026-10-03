'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  getFeaturedProducts,
  getNewArrivals,
  getBestSellers,
  ProductItem,
} from '@/lib/queries/products';
import { ProductCard } from '@/components/product/ProductCard';
import { SHMonogram } from '@/components/brand/SHMonogram';
import { StitchHouseWordmark } from '@/components/brand/StitchHouseWordmark';
import { ArrowRight, ArrowUpRight, Compass, ShieldCheck, Sparkles, Box } from 'lucide-react';

import { StitchHouseHeroHost } from '@/components/home/StitchHouseHeroHost';
import { ZaraEditorialStatement } from '@/components/home/ZaraEditorialStatement';

// Scroll reveal hook for smooth editorial entries
function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

function RevealSection({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, visible } = useScrollReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, transform 0.75s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

export default function HomePage() {
  const newArrivals = getNewArrivals().slice(0, 6);
  const featuredPieces = getFeaturedProducts().slice(0, 3);
  const bestSellers = getBestSellers().slice(0, 4);

  return (
    <div className="bg-[#F2EDE4] text-[#241E1A] overflow-hidden min-h-screen">
      {/* ─────────────────────────────────────────────────────────────
          1. DYNAMIC HERO SECTION (Choose from 3 Distinct Styles)
      ───────────────────────────────────────────────────────────── */}
      <StitchHouseHeroHost />

      {/* ─────────────────────────────────────────────────────────────
          2. CURATED PIECES (2-Column Mobile, 3-Column Desktop Grid)
      ───────────────────────────────────────────────────────────── */}
      <section className="pt-6 sm:pt-12 pb-12 sm:pb-24 px-3 sm:px-8 max-w-[1600px] mx-auto">
        <RevealSection className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 sm:mb-8 border-b border-[#B8B0A3]/30 pb-4 sm:pb-5 gap-3 sm:gap-4">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#686B5E] block mb-1 font-medium">
              Curated Selection
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif text-[#241E1A]">
              Essential Tailoring &amp; Form
            </h2>
          </div>
          <Link
            href="/collections/clothing"
            className="text-xs uppercase tracking-[0.2em] font-medium text-[#241E1A] hover:text-[#686B5E] transition-colors inline-flex items-center gap-1.5"
          >
            <span>View All Pieces</span>
            <ArrowRight size={13} />
          </Link>
        </RevealSection>

        {/* 2-Column Mobile / 3-Column Desktop Editorial Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-8 lg:gap-10">
          {featuredPieces.map((prod, index) => (
            <RevealSection key={prod.id} delay={index * 0.15}>
              <ProductCard product={prod} editorial={true} />
            </RevealSection>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          4. ZARA STYLE EDITORIAL STATEMENT SPREAD
      ───────────────────────────────────────────────────────────── */}
      <ZaraEditorialStatement />

      {/* ─────────────────────────────────────────────────────────────
          5. NEW ARRIVALS GRID (Warm Ivory Canvas)
      ───────────────────────────────────────────────────────────── */}
      <section className="py-12 sm:py-24 lg:py-32 px-3 sm:px-8 max-w-[1600px] mx-auto">
        <RevealSection className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12 border-b border-[#B8B0A3]/30 pb-4 sm:pb-6 gap-3 sm:gap-4">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#686B5E] block mb-1 font-medium">
              Autumn / Winter Archive
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif text-[#241E1A]">
              New Arrivals &amp; Tailoring Capsules
            </h2>
          </div>
          <Link
            href="/collections/new-arrivals"
            className="text-xs uppercase tracking-[0.2em] font-medium text-[#241E1A] hover:text-[#686B5E] transition-colors inline-flex items-center gap-1.5"
          >
            <span>View All New Drops</span>
            <ArrowRight size={13} />
          </Link>
        </RevealSection>

        {/* 2-Column Mobile / 4-Column Desktop Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-8">
          {newArrivals.slice(0, 4).map((prod, index) => (
            <RevealSection key={prod.id} delay={index * 0.1}>
              <ProductCard product={prod} />
            </RevealSection>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          6. PHYSICAL PACKAGING & BRAND SYSTEM TOUCHPOINTS
      ───────────────────────────────────────────────────────────── */}
      <section className="bg-[#EBE5DB] py-14 sm:py-24 lg:py-32 px-4 sm:px-8 border-y border-[#B8B0A3]/35">
        <div className="max-w-[1600px] mx-auto">
          <RevealSection className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#A8946C] block mb-2 font-semibold">
              The Tactile Experience
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif text-[#241E1A] mb-3 sm:mb-4">
              Physical Touchpoints &amp; Packaging
            </h2>
            <p className="text-xs sm:text-sm text-[#686B5E] leading-relaxed">
              Every garment is delivered in custom unbleached boxes, wrapped in acid-free ivory
              tissue, sealed with antique brass foil, and carrying our woven creed.
            </p>
          </RevealSection>

          {/* 3 Physical Touchpoints Showcase */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* 1. Small Shopping Bag */}
            <RevealSection delay={0.1} className="bg-[#F2EDE4] p-6 sm:p-8 border border-[#B8B0A3]/40 flex flex-col justify-between">
              <div>
                <div className="aspect-[4/3] bg-[#241E1A] p-4 sm:p-6 flex flex-col justify-between items-center text-center shadow-inner mb-6 relative">
                  <span className="text-[9px] uppercase tracking-[0.25em] text-[#B8B0A3]">
                    Small Tote — 22 × 28 × 10 cm
                  </span>
                  <div className="my-auto">
                    <SHMonogram size={32} variant="light" />
                    <p className="text-sm font-serif text-[#F2EDE4] tracking-[0.2em] mt-2">
                      STITCH HOUSE
                    </p>
                  </div>
                  <span className="text-[8px] uppercase tracking-widest text-[#B8B0A3]">
                    Deep Espresso Kraft • Cotton Rope Handle
                  </span>
                </div>
                <h3 className="text-base font-serif text-[#241E1A] mb-2">Bespoke Boutique Bag</h3>
                <p className="text-xs text-[#686B5E] leading-relaxed">
                  Crafted from 280gsm Deep Espresso unbleached kraft paper with natural ivory twisted cotton handles.
                </p>
              </div>
            </RevealSection>

            {/* 2. Rigid Garment Box & Unboxing */}
            <RevealSection delay={0.2} className="bg-[#F2EDE4] p-6 sm:p-8 border border-[#B8B0A3]/40 flex flex-col justify-between">
              <div>
                <div className="aspect-[4/3] bg-[#241E1A] p-4 sm:p-6 flex flex-col justify-between items-center text-center shadow-inner mb-6 border border-[#A8946C]/30">
                  <span className="text-[9px] uppercase tracking-[0.25em] text-[#A8946C]">
                    Rigid Suiting Box
                  </span>
                  <div className="my-auto flex flex-col items-center">
                    <div className="w-10 h-10 border border-[#A8946C] flex items-center justify-center">
                      <SHMonogram size={20} variant="brass" />
                    </div>
                    <p className="text-xs uppercase tracking-[0.25em] text-[#F2EDE4] mt-2">
                      Blind Embossed Seal
                    </p>
                  </div>
                  <span className="text-[8px] uppercase tracking-widest text-[#B8B0A3]">
                    Warm Ivory Tissue • Brass Seal
                  </span>
                </div>
                <h3 className="text-base font-serif text-[#241E1A] mb-2">Garment Architecture Box</h3>
                <p className="text-xs text-[#686B5E] leading-relaxed">
                  Deep Espresso bookcloth box protecting suiting canvas and outerwear in archival-grade conditions.
                </p>
              </div>
            </RevealSection>

            {/* 3. Woven Label System */}
            <RevealSection delay={0.3} className="bg-[#F2EDE4] p-6 sm:p-8 border border-[#B8B0A3]/40 flex flex-col justify-between">
              <div>
                <div className="aspect-[4/3] bg-[#241E1A] p-4 sm:p-6 flex flex-col justify-between items-center text-center shadow-inner mb-6 relative">
                  <span className="text-[9px] uppercase tracking-[0.25em] text-[#B8B0A3]">
                    Woven Damask Neck Label
                  </span>
                  <div className="my-auto border border-[#B8B0A3]/30 px-5 py-2.5 bg-[#241E1A]">
                    <p className="text-sm font-serif text-[#F2EDE4] tracking-[0.22em]">
                      STITCH HOUSE
                    </p>
                    <div className="h-px w-12 bg-[#542B2E] my-1 mx-auto" />
                    <p className="text-[8px] uppercase tracking-[0.3em] text-[#B8B0A3]">
                      MADE WITH INTENTION
                    </p>
                  </div>
                  <span className="text-[8px] uppercase tracking-widest text-[#542B2E] font-medium">
                    Oxblood Bar-Tack Stitch Accent
                  </span>
                </div>
                <h3 className="text-base font-serif text-[#241E1A] mb-2">Internal Creed Label</h3>
                <p className="text-xs text-[#686B5E] leading-relaxed">
                  High-density damask woven in Deep Espresso with rare Oxblood bar-tacking sewn inside every tailored piece.
                </p>
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          7. SHOWROOM ARCHITECTURE (Physical Space in Digital Form)
      ───────────────────────────────────────────────────────────── */}
      <section className="py-14 sm:py-24 lg:py-32 px-4 sm:px-8 max-w-[1600px] mx-auto">
        <RevealSection className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-6">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#A8946C] block mb-2 font-semibold">
              The Spatial Experience
            </span>
            <h2 className="text-2xl sm:text-5xl font-serif text-[#241E1A] leading-tight mb-4 sm:mb-6">
              Showrooms in Dhaka, Designed with Restraint
            </h2>
            <p className="text-xs sm:text-sm text-[#686B5E] leading-relaxed mb-4 sm:mb-6">
              Our flagship ateliers in Gulshan and Banani are built with hand-troweled warm ivory
              limestone plaster, dark American walnut joinery, hand-patinated antique brass rails,
              and low-glare 2700K museum lighting.
            </p>
            <p className="text-xs text-[#241E1A] font-serif italic mb-6 sm:mb-8">
              “A serene sanctuary where fitting is treated as an architectural dialogue.”
            </p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link href="/contact" className="sh-btn-primary text-center">
                Book Private Fitting
              </Link>
              <Link href="/store-locator" className="text-xs uppercase tracking-[0.18em] font-medium text-[#241E1A] hover:underline text-center py-2">
                View Locations →
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6 grid grid-cols-2 gap-3 sm:gap-4">
            <div className="aspect-[3/4] bg-[#EBE5DB] overflow-hidden">
              <img
                src="/images/products/architectural-black-suit-1.jpg"
                alt="Showroom display tailoring"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="aspect-[3/4] bg-[#EBE5DB] overflow-hidden mt-6 sm:mt-8">
              <img
                src="/images/products/architectural-black-suit-2.jpg"
                alt="Showroom fabric consultation"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </RevealSection>
      </section>
    </div>
  );
}
