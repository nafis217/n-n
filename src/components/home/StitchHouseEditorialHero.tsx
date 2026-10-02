'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, ChevronRight, Layers } from 'lucide-react';
import { SHMonogram } from '../brand/SHMonogram';
import { useBannerStore } from '@/lib/store/bannerStore';

const CAPSULES = [
  {
    id: 'c1',
    tag: 'Capsule 01 · Formalwear',
    title: 'Obsidian Floating Canvas',
    subtitle: 'Super 130s British Worsted Wool',
    image: '/images/products/architectural-black-suit-full.jpg',
    material: 'Super 130s England',
    construction: 'Full Floating Canvas',
    edition: 'Bespoke 042',
    link: '/products/architectural-black-wool-suit',
  },
  {
    id: 'c2',
    tag: 'Capsule 02 · Atelier Founder',
    title: 'The Founder Double Blazer',
    subtitle: 'Super 140s Wool & Silk Peak Lapel',
    image: '/images/user_portrait.jpg',
    material: 'Italian Wool Silk',
    construction: 'Hand Pick-Stitched',
    edition: 'Limited 018',
    link: '/collections/clothing',
  },
  {
    id: 'c3',
    tag: 'Capsule 03 · Outerwear',
    title: 'Cashmere Double Overcoat',
    subtitle: '100% Mongolian Cashmere & Cupro',
    image: '/images/MAXZARA_AFW24_0010_copy.webp',
    material: 'Mongolian Cashmere',
    construction: 'Horn Button Double-Breast',
    edition: 'Archive 009',
    link: '/collections/outerwear',
  },
];

export const StitchHouseEditorialHero: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const { headline, subheadline, tagline, ctaText, ctaLink } = useBannerStore();
  const current = CAPSULES[activeTab];

  return (
    <section className="relative w-full bg-[#F2EDE4] text-[#241E1A] border-b border-[#B8B0A3]/40 pt-6 pb-10 sm:pb-12 px-4 sm:px-8 max-w-[1600px] mx-auto overflow-hidden">
      {/* Top Tagline Bar */}
      <div className="flex items-center justify-between border-b border-[#B8B0A3]/30 pb-3 mb-6 sm:mb-8">
        <div className="flex items-center gap-3">
          <SHMonogram size={16} variant="dark" />
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#686B5E] font-medium">
            {tagline}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {CAPSULES.map((cap, idx) => (
            <button
              key={cap.id}
              onClick={() => setActiveTab(idx)}
              className={`px-3 py-1 text-[10px] uppercase tracking-[0.18em] transition-all ${
                activeTab === idx
                  ? 'bg-[#241E1A] text-[#F2EDE4] font-medium'
                  : 'text-[#686B5E] hover:text-[#241E1A] bg-[#EBE5DB]'
              }`}
            >
              0{idx + 1} {cap.tag.split('·')[1]?.trim() || ''}
            </button>
          ))}
        </div>
      </div>

      {/* Main Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Typography & Spec Details */}
        <div className="lg:col-span-6 flex flex-col justify-center">
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#A8946C] font-semibold block mb-3">
            {current.tag}
          </span>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif text-[#241E1A] leading-[1.05] tracking-tight font-normal">
            {headline}
          </h1>
          <p className="mt-5 text-sm sm:text-base text-[#686B5E] font-sans max-w-lg leading-relaxed">
            {subheadline}
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-4">
            <Link
              href={ctaLink || current.link}
              className="px-6 py-3.5 bg-[#241E1A] text-[#F2EDE4] text-[11px] font-medium tracking-[0.2em] uppercase hover:bg-[#A8946C] transition-all flex items-center gap-2 group"
            >
              <span>{ctaText}</span>
              <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/atelier"
              className="text-xs uppercase tracking-[0.2em] font-medium text-[#241E1A] hover:text-[#686B5E] transition-colors py-3 px-2"
            >
              The Atelier Study →
            </Link>
          </div>

          {/* Micro Specs Card */}
          <div className="mt-8 pt-5 border-t border-[#B8B0A3]/30 grid grid-cols-3 gap-4 text-left">
            <div>
              <span className="text-[9px] uppercase tracking-[0.22em] text-[#B8B0A3] block">
                Material
              </span>
              <span className="text-xs font-serif text-[#241E1A] block truncate">
                {current.material}
              </span>
            </div>
            <div>
              <span className="text-[9px] uppercase tracking-[0.22em] text-[#B8B0A3] block">
                Construction
              </span>
              <span className="text-xs font-serif text-[#241E1A] block truncate">
                {current.construction}
              </span>
            </div>
            <div>
              <span className="text-[9px] uppercase tracking-[0.22em] text-[#B8B0A3] block">
                Edition
              </span>
              <span className="text-xs font-serif text-[#542B2E] font-medium block truncate">
                {current.edition}
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: High-Res Editorial Lookbook Visual */}
        <div className="lg:col-span-6 relative">
          <div className="relative aspect-[3/4] sm:aspect-[4/5] max-h-[580px] overflow-hidden bg-[#EBE5DB] shadow-xl border border-[#B8B0A3]/40">
            <img
              key={current.image}
              src={current.image}
              alt={current.title}
              className="w-full h-full object-cover object-top hover:scale-103 transition-transform duration-700 animate-in fade-in duration-500"
            />
            {/* Overlay Tag */}
            <div className="absolute bottom-4 left-4 right-4 bg-[#F2EDE4]/95 backdrop-blur-xs p-3.5 border border-[#B8B0A3]/40 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#A8946C] block font-medium">
                  {current.title}
                </span>
                <span className="text-xs font-serif text-[#241E1A]">
                  {current.subtitle}
                </span>
              </div>
              <Link
                href={current.link}
                className="text-[10px] uppercase tracking-widest px-3 py-1.5 bg-[#241E1A] text-[#F2EDE4] hover:bg-[#A8946C] transition-colors"
              >
                Inspect
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
