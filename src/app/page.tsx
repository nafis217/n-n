'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  getFeaturedProducts,
  getNewArrivals,
  getBestSellers,
  ProductItem,
} from '@/lib/queries/products';
import { ProductCard } from '@/components/product/ProductCard';
import { QuickViewModal } from '@/components/product/QuickViewModal';
import { SizeGuideModal } from '@/components/product/SizeGuideModal';
import { toast } from '@/lib/store/toast';
import { ArrowRight } from 'lucide-react';

// Scroll reveal hook
function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

function RevealSection({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, visible } = useScrollReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity 0.55s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, transform 0.55s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

export default function HomePage() {
  const [quickViewProduct, setQuickViewProduct] = useState<ProductItem | null>(null);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const newArrivals = getNewArrivals().slice(0, 4);
  const bestSellers = getBestSellers().slice(0, 4);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) {
      toast.warning('Email required', 'Please enter your email address.');
      return;
    }
    setSubscribed(true);
    toast.success('Subscribed', 'Welcome. You\'ll receive early access to new drops.');
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-black">

      {/* ═══════════════════════════════════════════
          SECTION 01 — FULL-SCREEN CAMPAIGN HERO
      ══════════════════════════════════════════ */}
      <section className="relative w-full h-screen min-h-[640px] overflow-hidden">
        {/* Campaign image */}
        <Image
          src="/images/products/architectural-black-suit-1.jpg"
          alt="FUKU Autumn / Winter 2026 Campaign"
          fill
          priority
          className="object-cover object-top"
        />
        {/* Minimal dark overlay — bottom only so top of image stays clean */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

        {/* Hero copy — bottom-left, editorial */}
        <div className="absolute bottom-16 left-0 right-0 px-6 md:px-12 max-w-7xl mx-auto">
          <div className="max-w-xl">
            <p className="text-label uppercase tracking-[0.2em] text-white/70 mb-4">
              Autumn / Winter 2026
            </p>
            <h1
              className="text-white font-display font-light leading-[0.95] mb-6"
              style={{ fontSize: 'clamp(48px, 7vw, 88px)', letterSpacing: '-0.03em' }}
            >
              THE NEW<br />FORM.
            </h1>
            <div className="flex items-center gap-4">
              <Link
                href="/women"
                className="text-label uppercase tracking-[0.12em] text-white border-b border-white/50 hover:border-white transition-colors duration-200 pb-0.5"
              >
                Shop Women
              </Link>
              <span className="text-white/30 text-xs">—</span>
              <Link
                href="/men"
                className="text-label uppercase tracking-[0.12em] text-white border-b border-white/50 hover:border-white transition-colors duration-200 pb-0.5"
              >
                Shop Men
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 right-10 hidden md:flex flex-col items-center gap-2 text-white/50">
          <span className="text-label uppercase tracking-[0.15em]" style={{ writingMode: 'vertical-rl', fontSize: '9px' }}>Scroll</span>
          <div className="w-px h-10 bg-white/30 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-white/60 animate-[reveal-up_1.8s_ease_infinite]" />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 02 — EDITORIAL SPLIT
      ══════════════════════════════════════════ */}
      <section className="grid grid-cols-1 lg:grid-cols-2 min-h-[80vh]">
        {/* Image */}
        <div className="relative min-h-[400px] lg:min-h-0 bg-[#F3F3F1]">
          <Image
            src="/images/products/monolith-contrast-polo.jpg"
            alt="FUKU — Form / Function"
            fill
            className="object-cover object-top"
          />
        </div>

        {/* Editorial text */}
        <div className="flex flex-col justify-center px-8 md:px-16 py-20 bg-[#FFFFFF]">
          <RevealSection>
            <p className="text-editorial-label mb-6">The Edit</p>
            <h2
              className="font-display font-light text-black leading-[1.0] mb-6"
              style={{ fontSize: 'clamp(36px, 4vw, 56px)', letterSpacing: '-0.03em' }}
            >
              FORM /<br />FUNCTION.
            </h2>
            <p className="text-body text-[#6B6B6B] max-w-sm mb-8 leading-relaxed">
              Garments engineered from handspun Jamdani muslin and Japanese technical knits. Designed for everyday movement, refined for every occasion.
            </p>
            <Link
              href="/collections"
              className="inline-flex items-center gap-2 text-label uppercase tracking-[0.12em] text-black border-b border-black pb-0.5 hover:text-[#6B6B6B] hover:border-[#6B6B6B] transition-colors duration-150 self-start"
            >
              Explore Collections
              <ArrowRight className="w-3.5 h-3.5 stroke-[1.25]" />
            </Link>
          </RevealSection>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 03 — NEW ARRIVALS
      ══════════════════════════════════════════ */}
      <section className="py-20 md:py-28 px-6 md:px-12 max-w-[1440px] mx-auto">
        <RevealSection className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-editorial-label mb-2">Seasonal Release</p>
            <h2
              className="font-display font-light text-black"
              style={{ fontSize: 'clamp(28px, 3vw, 40px)', letterSpacing: '-0.025em' }}
            >
              New In
            </h2>
          </div>
          <Link
            href="/new-drop"
            className="text-label uppercase tracking-[0.12em] text-[#6B6B6B] hover:text-black transition-colors duration-150 flex items-center gap-1.5"
          >
            View All
            <ArrowRight className="w-3.5 h-3.5 stroke-[1.25]" />
          </Link>
        </RevealSection>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {newArrivals.map((product, i) => (
            <RevealSection key={product.id} delay={i * 0.07}>
              <ProductCard
                product={product}
                onQuickView={(p) => setQuickViewProduct(p)}
              />
            </RevealSection>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 04 — FULL-BLEED COLLECTION BANNER
      ══════════════════════════════════════════ */}
      <section className="relative w-full min-h-[60vh] md:min-h-[70vh] overflow-hidden bg-black">
        <Image
          src="/images/products/raw-selvedge-trucker-jacket.jpg"
          alt="FUKU Men's Collection"
          fill
          className="object-cover object-top opacity-70"
        />
        <div className="relative z-10 h-full min-h-[60vh] md:min-h-[70vh] flex flex-col justify-end px-6 md:px-12 pb-16 max-w-7xl mx-auto">
          <RevealSection>
            <p className="text-editorial-label text-white/60 mb-3">Men's Collection</p>
            <h2
              className="font-display font-light text-white mb-6"
              style={{ fontSize: 'clamp(36px, 5vw, 64px)', letterSpacing: '-0.03em', lineHeight: '1.0' }}
            >
              ESSENTIALS,<br />REFINED.
            </h2>
            <Link
              href="/men"
              className="inline-flex items-center gap-2 text-label uppercase tracking-[0.12em] text-white border-b border-white/50 hover:border-white transition-colors duration-150 pb-0.5"
            >
              Shop Men
              <ArrowRight className="w-3.5 h-3.5 stroke-[1.25]" />
            </Link>
          </RevealSection>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 05 — BEST SELLERS
      ══════════════════════════════════════════ */}
      <section className="py-20 md:py-28 px-6 md:px-12 max-w-[1440px] mx-auto">
        <RevealSection className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-editorial-label mb-2">Always in demand</p>
            <h2
              className="font-display font-light text-black"
              style={{ fontSize: 'clamp(28px, 3vw, 40px)', letterSpacing: '-0.025em' }}
            >
              Best Sellers
            </h2>
          </div>
          <Link
            href="/best-sellers"
            className="text-label uppercase tracking-[0.12em] text-[#6B6B6B] hover:text-black transition-colors duration-150 flex items-center gap-1.5"
          >
            View All
            <ArrowRight className="w-3.5 h-3.5 stroke-[1.25]" />
          </Link>
        </RevealSection>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {bestSellers.map((product, i) => (
            <RevealSection key={product.id} delay={i * 0.07}>
              <ProductCard
                product={product}
                onQuickView={(p) => setQuickViewProduct(p)}
              />
            </RevealSection>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 06 — EDITORIAL LOOKBOOK GRID
      ══════════════════════════════════════════ */}
      <section className="py-20 px-6 md:px-12 bg-[#F3F3F1]">
        <RevealSection className="max-w-[1440px] mx-auto">
          <p className="text-editorial-label mb-8">Lookbook — AW 2026</p>
          <div className="grid grid-cols-12 gap-3 md:gap-4">
            {/* Large left image */}
            <div className="col-span-12 md:col-span-7 relative aspect-[4/5] md:aspect-auto md:row-span-2 bg-[#E8E8E5] overflow-hidden">
              <Image
                src="/images/products/architectural-black-suit-full.jpg"
                alt="Lookbook 01"
                fill
                className="object-cover object-top"
              />
              <div className="absolute bottom-4 left-5">
                <p className="text-label text-white/80 uppercase tracking-[0.15em]">Look 01</p>
              </div>
            </div>

            {/* Top right */}
            <div className="col-span-6 md:col-span-5 relative aspect-square bg-[#E8E8E5] overflow-hidden">
              <Image
                src="/images/products/espoir_La-Boheme-L-768x765.jpg"
                alt="Lookbook 02"
                fill
                className="object-cover"
              />
              <div className="absolute bottom-3 left-4">
                <p className="text-label text-white/80 uppercase tracking-[0.15em]">Look 02</p>
              </div>
            </div>

            {/* Bottom right */}
            <div className="col-span-6 md:col-span-5 relative aspect-square bg-[#E8E8E5] overflow-hidden">
              <Image
                src="/images/products/product1_red_1.jpg"
                alt="Lookbook 03"
                fill
                className="object-cover"
              />
              <div className="absolute bottom-3 left-4">
                <p className="text-label text-white/80 uppercase tracking-[0.15em]">Look 03</p>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <Link
              href="/collections"
              className="text-label uppercase tracking-[0.12em] text-[#6B6B6B] hover:text-black transition-colors duration-150 flex items-center gap-1.5"
            >
              View Lookbook
              <ArrowRight className="w-3.5 h-3.5 stroke-[1.25]" />
            </Link>
          </div>
        </RevealSection>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 07 — BRAND STATEMENT
      ══════════════════════════════════════════ */}
      <section className="py-24 md:py-36 px-6 md:px-12 bg-[#FFFFFF]">
        <RevealSection className="max-w-5xl mx-auto text-center">
          <p className="text-editorial-label text-[#9B9B9B] mb-8">FUKU — Dhaka, Bangladesh</p>
          <blockquote
            className="font-display font-light text-black"
            style={{ fontSize: 'clamp(32px, 5vw, 72px)', letterSpacing: '-0.04em', lineHeight: '1.0' }}
          >
            &ldquo;BUILT FOR THE<br />EVERYDAY.&rdquo;
          </blockquote>
          <div className="mt-10 w-12 h-px bg-[#D9D9D6] mx-auto" />
          <p className="text-body text-[#6B6B6B] mt-8 max-w-md mx-auto leading-relaxed">
            Founded in Dhaka. Crafted from authentic Jamdani handloom and Japanese technical fabrics. Every garment, a considered object.
          </p>
          <div className="mt-8">
            <Link
              href="/about"
              className="text-label uppercase tracking-[0.12em] text-black border-b border-black pb-0.5 hover:text-[#6B6B6B] hover:border-[#6B6B6B] transition-colors duration-150"
            >
              Our Story
            </Link>
          </div>
        </RevealSection>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 08 — NEWSLETTER (Minimal)
      ══════════════════════════════════════════ */}
      <section className="py-20 md:py-28 px-6 md:px-12 border-t border-[#E8E8E5] bg-white">
        <RevealSection className="max-w-xl mx-auto text-center">
          <p className="text-editorial-label text-[#9B9B9B] mb-5">Early Access</p>
          <h2
            className="font-display font-light text-black mb-8"
            style={{ fontSize: 'clamp(28px, 3vw, 40px)', letterSpacing: '-0.025em' }}
          >
            Join the Edit
          </h2>

          {subscribed ? (
            <p className="text-body text-[#6B6B6B]">Thank you. We&apos;ll be in touch.</p>
          ) : (
            <form onSubmit={handleNewsletterSubmit} className="flex gap-0 max-w-sm mx-auto">
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Your email address"
                className="flex-1 border border-[#D9D9D6] border-r-0 px-4 py-3 text-label text-black placeholder-[#9B9B9B] focus:outline-none focus:border-black transition-colors bg-transparent"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-black text-white text-label uppercase tracking-[0.12em] hover:bg-[#333] transition-colors duration-150 cursor-pointer whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          )}
          <p className="text-label text-[#9B9B9B] mt-4">No spam. Unsubscribe anytime.</p>
        </RevealSection>
      </section>

      {/* Modals */}
      <QuickViewModal
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onOpenSizeGuide={() => { setQuickViewProduct(null); setIsSizeGuideOpen(true); }}
      />
      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
      />
    </div>
  );
}
