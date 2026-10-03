'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const ZaraEditorialStatement: React.FC = () => {
  return (
    <section className="relative w-full bg-[#FAFAFA] text-black overflow-hidden border-y border-neutral-200 py-16 sm:py-24 lg:py-32 select-none">
      <div className="max-w-[1680px] mx-auto px-4 sm:px-8 lg:px-12 relative">
        
        {/* ── CENTER EDITORIAL STAGE (CENTER PHOTO + MASSIVE OVERLAPPING TYPOGRAPHY) ── */}
        <div className="relative min-h-[420px] sm:min-h-[620px] lg:min-h-[760px] flex items-center justify-center my-4 sm:my-8">
          
          {/* Centerpiece Image (High-fashion tailoring model) */}
          <div className="relative w-[86%] sm:w-[58%] md:w-[46%] lg:w-[38%] max-w-[500px] aspect-[3/4] mx-auto overflow-hidden shadow-2xl bg-neutral-100 z-10 group">
            <img
              src="/images/zaramodel1.jpeg"
              alt="STITCH HOUSE Editorial — Contrasts & Architectural Tailoring"
              className="w-full h-full object-cover object-center group-hover:scale-104 transition-transform duration-1000 ease-out"
            />
            {/* Subtle light film overlay */}
            <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500" />
          </div>

          {/* Massive Overlapping STITCH HOUSE Editorial Typography Overlay */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20 px-2 sm:px-6">
            <h2 className="w-full max-w-[1440px] text-center font-sans font-extrabold text-[#000000] tracking-[-0.03em] sm:tracking-[-0.04em] leading-[0.94] sm:leading-[0.92] text-[28px] min-[380px]:text-[34px] sm:text-[62px] md:text-[76px] lg:text-[94px] xl:text-[112px] uppercase select-none">
              <span className="block drop-shadow-sm">
                Our style is all about
              </span>
              <span className="block drop-shadow-sm">
                contrasts — raw denim,
              </span>
              <span className="block drop-shadow-sm">
                tailored silhouettes,
              </span>
              <span className="block drop-shadow-sm">
                and architectural black.
              </span>
            </h2>
          </div>

          {/* Right Floating Arrow CTA Button */}
          <div className="absolute bottom-3 right-2 sm:bottom-4 sm:right-6 lg:right-10 z-30 pointer-events-auto">
            <Link
              href="/collections/clothing"
              className="group flex items-center justify-center w-11 h-11 sm:w-16 sm:h-16 rounded-full bg-white border border-neutral-300 text-black hover:bg-black hover:text-white hover:border-black shadow-lg transition-all duration-300 transform hover:scale-105"
              aria-label="Explore STITCH HOUSE Collection"
            >
              <ArrowRight className="w-4 h-4 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* ── BOTTOM EDITORIAL FOOTER CAPTION ── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 sm:pt-8 border-t border-neutral-200 text-neutral-600 font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.16em] sm:tracking-[0.2em] relative z-20">
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-black inline-block shrink-0" />
            <span>STITCH HOUSE ARCHIVE — VOL. 04 SARTORIAL CONTRASTS</span>
          </div>

          <div className="flex flex-wrap items-center gap-3 sm:gap-6">
            <Link href="/men" className="hover:text-black transition-colors underline underline-offset-4 font-semibold">
              Explore Tailoring Suite
            </Link>
            <span className="text-neutral-300 hidden min-[400px]:inline">•</span>
            <Link href="/atelier" className="hover:text-black transition-colors">
              Bespoke Atelier
            </Link>
            <span className="text-neutral-300 hidden min-[400px]:inline">•</span>
            <Link href="/collections" className="hover:text-black transition-colors">
              All Garments →
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
};
