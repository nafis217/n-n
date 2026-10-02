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
  const [heroLoaded, setHeroLoaded] = useState(false);
  const newArrivals = getNewArrivals().slice(0, 6);
  const featuredPieces = getFeaturedProducts().slice(0, 3);
  const bestSellers = getBestSellers().slice(0, 4);

  useEffect(() => {
    const timer = setTimeout(() => setHeroLoaded(true), 150);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-[#F2EDE4] text-[#241E1A] overflow-hidden min-h-screen">
      {/* ─────────────────────────────────────────────────────────────
          1. HERO SECTION (Editorial Fashion Campaign)
      ───────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[calc(100vh-64px)] flex flex-col justify-between pt-8 pb-12 px-4 sm:px-8 max-w-[1600px] mx-auto">
        {/* Top Minimal Editorial Header Tag */}
        <div className="flex items-center justify-between border-b border-[#B8B0A3]/30 pb-4">
          <div className="flex items-center gap-3">
            <SHMonogram size={18} variant="dark" />
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#686B5E] font-medium">
              Collection Vol. 04 / Autumn–Winter
            </span>
          </div>
          <span className="hidden sm:inline text-[10px] uppercase tracking-[0.25em] text-[#686B5E]">
            Dhaka Atelier • Worldwide Consignment
          </span>
        </div>

        {/* Center Split: Large Campaign Imagery + Architectural Typography */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center my-auto py-8">
          {/* Left: Typography & Primary CTA */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div
              className={`transform transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                heroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <span className="text-[11px] uppercase tracking-[0.3em] text-[#A8946C] font-semibold block mb-3">
                Maison Menswear
              </span>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif text-[#241E1A] leading-[1.05] tracking-tight font-normal">
                QUIETLY REFINED.
              </h1>
              <p className="mt-6 text-base sm:text-lg text-[#686B5E] font-sans max-w-lg leading-relaxed">
                Modern menswear shaped by timeless proportions, considered natural fibers,
                and the uncompromising discipline of architectural tailoring.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link href="/collections/new-arrivals" className="sh-btn-primary group">
                  <span>Explore Collection</span>
                  <ArrowRight
                    size={14}
                    className="ml-2 group-hover:translate-x-1 transition-transform"
                  />
                </Link>
                <Link
                  href="/atelier"
                  className="text-xs uppercase tracking-[0.2em] font-medium text-[#241E1A] hover:text-[#686B5E] transition-colors py-3 px-2"
                >
                  The Atelier Study →
                </Link>
              </div>
            </div>

            {/* Micro Details */}
            <div
              className={`mt-12 pt-6 border-t border-[#B8B0A3]/25 grid grid-cols-3 gap-4 text-left transform transition-all duration-1000 delay-300 ${
                heroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <div>
                <span className="text-[9px] uppercase tracking-[0.22em] text-[#B8B0A3] block">
                  Material
                </span>
                <span className="text-xs font-serif text-[#241E1A]">Super 130s & Irish Linen</span>
              </div>
              <div>
                <span className="text-[9px] uppercase tracking-[0.22em] text-[#B8B0A3] block">
                  Construction
                </span>
                <span className="text-xs font-serif text-[#241E1A]">Full Floating Canvas</span>
              </div>
              <div>
                <span className="text-[9px] uppercase tracking-[0.22em] text-[#B8B0A3] block">
                  Edition
                </span>
                <span className="text-xs font-serif text-[#542B2E] font-medium">Bespoke 042</span>
              </div>
            </div>
          </div>

          {/* Right: Large Editorial Hero Visual */}
          <div className="lg:col-span-6 relative">
            <div
              className={`relative aspect-[3/4] sm:aspect-[4/5] overflow-hidden bg-[#EBE5DB] shadow-lg transform transition-all duration-1000 delay-150 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                heroLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-98'
              }`}
            >
              <img
                src="/images/products/architectural-black-suit-full.jpg"
                alt="STITCH HOUSE Autumn Winter Tailoring Campaign"
                className="w-full h-full object-cover object-top hover:scale-103 transition-transform duration-1000"
              />
              <div className="absolute bottom-4 left-4 bg-[#F2EDE4]/90 backdrop-blur-xs px-3 py-1.5 border border-[#B8B0A3]/40">
                <span className="text-[9px] uppercase tracking-[0.2em] text-[#241E1A] font-medium">
                  Plate I — Obsidian Tailored Wool
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Banner Scroll Anchor */}
        <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.25em] text-[#B8B0A3] pt-4 border-t border-[#B8B0A3]/20">
          <span>01 / 05 Editorial Sequences</span>
          <span>Scroll to Explore Craft</span>
        </div>
      </section>



      {/* ─────────────────────────────────────────────────────────────
          3. CURATED PIECES (3-Column Unboxed Editorial Grid)
      ───────────────────────────────────────────────────────────── */}
      <section className="py-24 sm:py-32 px-4 sm:px-8 max-w-[1600px] mx-auto">
        <RevealSection className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 border-b border-[#B8B0A3]/30 pb-6 gap-4">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#686B5E] block mb-1 font-medium">
              Curated Selection
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#241E1A]">
              Essential Tailoring & Form
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

        {/* 3-Column Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {featuredPieces.map((prod, index) => (
            <RevealSection key={prod.id} delay={index * 0.15}>
              <ProductCard product={prod} editorial={true} />
            </RevealSection>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          4. EDITORIAL INTERLUDE (Muted Olive Asymmetric Section)
      ───────────────────────────────────────────────────────────── */}
      <section className="bg-[#686B5E] text-[#F2EDE4] py-24 sm:py-32 px-4 sm:px-8">
        <div className="max-w-[1600px] mx-auto">
          <RevealSection className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Asymmetric Image */}
            <div className="lg:col-span-7 relative">
              <div className="aspect-[16/10] sm:aspect-[16/9] overflow-hidden bg-[#53564A] shadow-xl">
                <img
                  src="/images/products/raw-selvedge-trucker-jacket.jpg"
                  alt="The Autumn Edit — A Study in Craft and Silhouette"
                  className="w-full h-full object-cover object-center hover:scale-103 transition-transform duration-1000"
                />
              </div>
              <div className="mt-3 flex items-center justify-between text-[10px] tracking-[0.2em] uppercase text-[#EBE5DB]">
                <span>Plate II — Heavy Selvedge & Antique Brass Rivets</span>
                <span>Crafted in Limited Run</span>
              </div>
            </div>

            {/* Right Editorial Text */}
            <div className="lg:col-span-5 flex flex-col justify-center lg:pl-6">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#F2EDE4]/80 block mb-2 font-medium">
                Editorial Study
              </span>
              <h2 className="text-3xl sm:text-5xl font-serif text-[#F2EDE4] leading-tight mb-6">
                THE AUTUMN EDIT
              </h2>
              <p className="font-serif italic text-lg text-[#F2EDE4]/90 mb-6">
                “A Study in Craft, Proportion & Raw Fibers.”
              </p>
              <p className="text-sm text-[#EBE5DB] font-sans leading-relaxed mb-8">
                Weighty textures meet effortless fluid cuts. Exploring the dialogue between
                heritage shuttle-loom denim, structured unbleached canvas, and layered
                overshirting designed for transition.
              </p>
              <div>
                <Link
                  href="/collections/outerwear"
                  className="inline-flex items-center justify-center bg-[#F2EDE4] text-[#241E1A] px-8 py-3.5 text-[11px] font-medium tracking-[0.2em] uppercase hover:bg-[#241E1A] hover:text-[#F2EDE4] transition-all duration-300"
                >
                  Explore The Edit
                </Link>
              </div>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          5. NEW ARRIVALS GRID (Warm Ivory Canvas)
      ───────────────────────────────────────────────────────────── */}
      <section className="py-24 sm:py-32 px-4 sm:px-8 max-w-[1600px] mx-auto">
        <RevealSection className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 border-b border-[#B8B0A3]/30 pb-6 gap-4">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#686B5E] block mb-1 font-medium">
              Autumn / Winter Archive
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#241E1A]">
              New Arrivals & Tailoring Capsules
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

        {/* 4-Column Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
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
      <section className="bg-[#EBE5DB] py-24 sm:py-32 px-4 sm:px-8 border-y border-[#B8B0A3]/35">
        <div className="max-w-[1600px] mx-auto">
          <RevealSection className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#A8946C] block mb-2 font-semibold">
              The Tactile Experience
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#241E1A] mb-4">
              Physical Touchpoints & Packaging
            </h2>
            <p className="text-sm text-[#686B5E] leading-relaxed">
              Every garment is delivered in custom unbleached boxes, wrapped in acid-free ivory
              tissue, sealed with antique brass foil, and carrying our woven creed.
            </p>
          </RevealSection>

          {/* 3 Physical Touchpoints Showcase */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* 1. Small Shopping Bag */}
            <RevealSection delay={0.1} className="bg-[#F2EDE4] p-8 border border-[#B8B0A3]/40 flex flex-col justify-between">
              <div>
                <div className="aspect-[4/3] bg-[#241E1A] p-6 flex flex-col justify-between items-center text-center shadow-inner mb-6 relative">
                  <span className="text-[9px] uppercase tracking-[0.25em] text-[#B8B0A3]">
                    Small Tote — 22 × 28 × 10 cm
                  </span>
                  <div className="my-auto">
                    <SHMonogram size={36} variant="light" />
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
            <RevealSection delay={0.2} className="bg-[#F2EDE4] p-8 border border-[#B8B0A3]/40 flex flex-col justify-between">
              <div>
                <div className="aspect-[4/3] bg-[#241E1A] p-6 flex flex-col justify-between items-center text-center shadow-inner mb-6 border border-[#A8946C]/30">
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
            <RevealSection delay={0.3} className="bg-[#F2EDE4] p-8 border border-[#B8B0A3]/40 flex flex-col justify-between">
              <div>
                <div className="aspect-[4/3] bg-[#241E1A] p-6 flex flex-col justify-between items-center text-center shadow-inner mb-6 relative">
                  <span className="text-[9px] uppercase tracking-[0.25em] text-[#B8B0A3]">
                    Woven Damask Neck Label
                  </span>
                  <div className="my-auto border border-[#B8B0A3]/30 px-6 py-3 bg-[#241E1A]">
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
      <section className="py-24 sm:py-32 px-4 sm:px-8 max-w-[1600px] mx-auto">
        <RevealSection className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#A8946C] block mb-2 font-semibold">
              The Spatial Experience
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif text-[#241E1A] leading-tight mb-6">
              Showrooms in Dhaka, Designed with Restraint
            </h2>
            <p className="text-sm text-[#686B5E] leading-relaxed mb-6">
              Our flagship ateliers in Gulshan and Banani are built with hand-troweled warm ivory
              limestone plaster, dark American walnut joinery, hand-patinated antique brass rails,
              and low-glare 2700K museum lighting.
            </p>
            <p className="text-xs text-[#241E1A] font-serif italic mb-8">
              “A serene sanctuary where fitting is treated as an architectural dialogue.”
            </p>
            <div className="flex items-center gap-6">
              <Link href="/contact" className="sh-btn-primary">
                Book Private Fitting
              </Link>
              <Link href="/store-locator" className="text-xs uppercase tracking-[0.18em] font-medium text-[#241E1A] hover:underline">
                View Locations
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="aspect-[3/4] bg-[#EBE5DB] overflow-hidden">
              <img
                src="/images/products/architectural-black-suit-1.jpg"
                alt="Showroom display tailoring"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="aspect-[3/4] bg-[#EBE5DB] overflow-hidden mt-8">
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
