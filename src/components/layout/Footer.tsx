'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Check } from 'lucide-react';
import { SHMonogram } from '../brand/SHMonogram';
import { StitchHouseWordmark } from '../brand/StitchHouseWordmark';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setIsSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#241E1A] text-[#F2EDE4] border-t border-[#38312B]">
      {/* ─────────────────────────────────────────────────────────────
          1. SLEEK VIDEO CUTOUT WORDMARK BANNER
      ───────────────────────────────────────────────────────────── */}
      <div className="relative w-full h-[180px] sm:h-[220px] md:h-[260px] overflow-hidden bg-[#241E1A] border-b border-[#38312B]">
        {/* Background video */}
        <video
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none opacity-85"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/images/products/architectural-black-suit-full.jpg"
        >
          <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260930_000857_e98f4291-826d-46eb-9a28-8022b5fb7e62.mp4" type="video/mp4" />
          <source src="/generate_ths_image_in_video_fo.mp4" type="video/mp4" />
        </video>

        {/* Blend wash */}
        <div className="absolute inset-0 bg-[#241E1A]/40 mix-blend-multiply pointer-events-none" />

        {/* STITCH SVG Mask Cutout */}
        <div className="absolute inset-0 pointer-events-none flex flex-col justify-between">
          <div className="w-full bg-[#241E1A] flex-1" />
          
          <div className="relative w-full aspect-[1280/190] max-h-[170px] sm:max-h-[200px]">
            <svg
              viewBox="0 120 1280 190"
              preserveAspectRatio="none"
              className="absolute inset-0 w-full h-full overflow-visible block"
              aria-hidden="true"
            >
              <defs>
                <mask id="footer-stitch-mask-simple">
                  <rect x="-4" y="116" width="1288" height="198" fill="#fff" />
                  <text
                    x="640"
                    y="276"
                    textAnchor="middle"
                    fontFamily="'Hanken Grotesk', 'Playfair Display', sans-serif"
                    fontWeight="900"
                    fontSize="192"
                    letterSpacing="0.16em"
                    fill="#000"
                  >
                    STITCH
                  </text>
                </mask>
              </defs>
              <rect x="-4" y="116" width="1288" height="198" fill="#241E1A" mask="url(#footer-stitch-mask-simple)" />
            </svg>
          </div>

          <div className="w-full bg-[#241E1A] flex-1" />
        </div>

        {/* Minimal Banner Top Bar */}
        <div className="absolute top-4 inset-x-0 px-6 sm:px-12 flex items-center justify-between z-10">
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-[#B8B0A3]">
            <SHMonogram size={14} variant="stone" />
            <span>Maison Dhaka</span>
          </div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#B8B0A3]/80 hidden sm:block">
            QUIETLY REFINED • DISTINCTLY YOURS
          </p>
          <Link
            href="/collections/new-arrivals"
            className="text-[10px] uppercase tracking-[0.2em] px-3.5 py-1.5 bg-[#F2EDE4] text-[#241E1A] font-medium hover:bg-[#A8946C] hover:text-[#F2EDE4] transition-all"
          >
            Explore
          </Link>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. MINIMALIST CLEAN FOOTER CONTENT
      ───────────────────────────────────────────────────────────── */}
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 sm:gap-14 pb-12 border-b border-[#38312B]">
          {/* Brand & Newsletter (Left side) */}
          <div className="md:col-span-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <SHMonogram size={26} variant="light" />
                <StitchHouseWordmark variant="light" size="md" />
              </div>
              <p className="text-xs text-[#B8B0A3] font-sans max-w-sm mt-3 leading-relaxed">
                Quiet luxury menswear crafted with architectural precision and natural fibers.
              </p>
            </div>

            {/* Compact Newsletter */}
            <div className="mt-8 max-w-md">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#A8946C] block mb-2 font-medium">
                Atelier Dispatch
              </span>
              {isSubscribed ? (
                <div className="flex items-center gap-2 p-2.5 bg-[#38312B]/40 text-[#F2EDE4] text-xs">
                  <Check size={14} className="text-[#A8946C]" />
                  <span>Subscribed to private dispatches.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ENTER YOUR EMAIL"
                    required
                    className="flex-1 bg-transparent border-b border-[#38312B] text-xs text-[#F2EDE4] placeholder:text-[#686B5E] py-2 px-1 focus:outline-none focus:border-[#A8946C] transition-colors"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#F2EDE4] text-[#241E1A] text-[10px] font-medium tracking-[0.2em] uppercase hover:bg-[#A8946C] hover:text-[#F2EDE4] transition-all"
                  >
                    Join
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Clean 3 Navigation Columns (Right side) */}
          <div className="md:col-span-6 grid grid-cols-3 gap-6 sm:gap-8">
            {/* Col 1: Shop */}
            <div>
              <h4 className="text-[10px] uppercase tracking-[0.25em] text-[#A8946C] font-semibold mb-4">
                Shop
              </h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <Link href="/collections/new-arrivals" className="text-[#B8B0A3] hover:text-[#F2EDE4] transition-colors">
                    New In
                  </Link>
                </li>
                <li>
                  <Link href="/collections/clothing" className="text-[#B8B0A3] hover:text-[#F2EDE4] transition-colors">
                    Clothing
                  </Link>
                </li>
                <li>
                  <Link href="/collections/shirts" className="text-[#B8B0A3] hover:text-[#F2EDE4] transition-colors">
                    Shirting
                  </Link>
                </li>
                <li>
                  <Link href="/collections/trousers" className="text-[#B8B0A3] hover:text-[#F2EDE4] transition-colors">
                    Trousers
                  </Link>
                </li>
                <li>
                  <Link href="/collections/outerwear" className="text-[#B8B0A3] hover:text-[#F2EDE4] transition-colors">
                    Outerwear
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 2: Maison */}
            <div>
              <h4 className="text-[10px] uppercase tracking-[0.25em] text-[#A8946C] font-semibold mb-4">
                Maison
              </h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <Link href="/about" className="text-[#B8B0A3] hover:text-[#F2EDE4] transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/atelier" className="text-[#B8B0A3] hover:text-[#F2EDE4] transition-colors">
                    Atelier
                  </Link>
                </li>
                <li>
                  <Link href="/journal" className="text-[#B8B0A3] hover:text-[#F2EDE4] transition-colors">
                    Journal
                  </Link>
                </li>
                <li>
                  <Link href="/store-locator" className="text-[#B8B0A3] hover:text-[#F2EDE4] transition-colors">
                    Showrooms
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 3: Care & Legal */}
            <div>
              <h4 className="text-[10px] uppercase tracking-[0.25em] text-[#A8946C] font-semibold mb-4">
                Client Care
              </h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <Link href="/contact" className="text-[#B8B0A3] hover:text-[#F2EDE4] transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/shipping" className="text-[#B8B0A3] hover:text-[#F2EDE4] transition-colors">
                    Shipping
                  </Link>
                </li>
                <li>
                  <Link href="/returns" className="text-[#B8B0A3] hover:text-[#F2EDE4] transition-colors">
                    Returns
                  </Link>
                </li>
                <li>
                  <Link href="/privacy-policy" className="text-[#B8B0A3] hover:text-[#F2EDE4] transition-colors">
                    Privacy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Minimal Bottom Baseline */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#8C8377]">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#A8946C] inline-block" />
            <span>© {new Date().getFullYear()} STITCH HOUSE</span>
          </div>
          <div className="flex items-center gap-4 text-[10px] uppercase tracking-wider text-[#8C8377]">
            <span>Dhaka</span>
            <span className="text-[#38312B]">•</span>
            <span>London</span>
            <span className="text-[#38312B]">•</span>
            <span>Milan</span>
          </div>
        </div>
      </div>
    </footer>
  );
};


