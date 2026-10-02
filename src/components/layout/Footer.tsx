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
          1. STITCH VIDEO CUTOUT HERO / FOOTER BANNER
      ───────────────────────────────────────────────────────────── */}
      <div className="relative w-full h-[240px] sm:h-[300px] md:h-[340px] overflow-hidden bg-[#241E1A] border-b border-[#38312B]">
        {/* Background video playing through letters */}
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

        {/* Warm screen blend wash */}
        <div className="absolute inset-0 bg-[#241E1A]/40 mix-blend-multiply pointer-events-none" />

        {/* Knocked-out wordmark mask: Deep Espresso #241E1A frame with STITCH cut out */}
        <div className="absolute inset-0 pointer-events-none flex flex-col justify-between">
          <div className="w-full bg-[#241E1A] flex-1" />
          
          <div className="relative w-full aspect-[1280/190] max-h-[190px] sm:max-h-[220px]">
            <svg
              viewBox="0 120 1280 190"
              preserveAspectRatio="none"
              className="absolute inset-0 w-full h-full overflow-visible block"
              aria-hidden="true"
            >
              <defs>
                <mask id="footer-stitch-mask">
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
              <rect x="-4" y="116" width="1288" height="198" fill="#241E1A" mask="url(#footer-stitch-mask)" />
            </svg>
          </div>

          <div className="w-full bg-[#241E1A] flex-1" />
        </div>

        {/* Minimal Editorial Footer Overlay Header */}
        <div className="absolute top-4 inset-x-0 px-6 sm:px-12 flex items-center justify-between z-10">
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-[#B8B0A3]">
            <SHMonogram size={16} variant="stone" />
            <span>Maison Archive</span>
          </div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#B8B0A3] hidden sm:block">
            QUIETLY REFINED • DISTINCTLY YOURS
          </p>
          <Link
            href="/collections/new-arrivals"
            className="text-[10px] uppercase tracking-[0.2em] px-4 py-2 bg-[#F2EDE4] text-[#241E1A] font-medium hover:bg-[#A8946C] hover:text-[#F2EDE4] transition-all duration-300"
          >
            Explore Collection
          </Link>
        </div>

        {/* Bottom Headline Quote in Banner */}
        <div className="absolute bottom-4 inset-x-0 px-6 sm:px-12 flex flex-col sm:flex-row items-center justify-between text-center sm:text-left gap-2 z-10">
          <p className="text-xs sm:text-sm font-sans tracking-wider uppercase text-[#F2EDE4] font-light">
            Modern Menswear Shaped by Timeless Proportions
          </p>
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-[#B8B0A3]">
            <span>Reviews 14</span>
            <span className="text-[#38312B]">•</span>
            <span className="text-[#A8946C]">Excellent ★★★★★</span>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. PUBLICATION NAVIGATION & NEWSLETTER COLUMNS
      ───────────────────────────────────────────────────────────── */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-[#38312B]">
          {/* Brand Manifesto & Motto */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <SHMonogram size={32} variant="light" />
                <StitchHouseWordmark variant="light" size="lg" />
              </div>
              <p className="text-xs uppercase tracking-[0.3em] text-[#B8B0A3] mt-2">
                QUIETLY REFINED • DISTINCTLY YOURS
              </p>
              <p className="text-sm text-[#B8B0A3] max-w-md font-sans leading-relaxed mt-4">
                An independent tailoring house dedicated to modern architectural menswear,
                considered natural fibers, and timeless bespoke craft.
              </p>
            </div>

            <div className="mt-8 flex items-center gap-6 text-[11px] text-[#A8946C] tracking-[0.18em] uppercase">
              <span>Showrooms: Gulshan & Banani</span>
              <span className="text-[#38312B]">/</span>
              <span>Atelier Dhaka</span>
            </div>
          </div>

          {/* Newsletter Field */}
          <div className="lg:col-span-6 flex flex-col justify-end">
            <span className="text-[10px] uppercase tracking-[0.28em] text-[#B8B0A3] block mb-3 font-medium">
              The Atelier Dispatch
            </span>
            <p className="text-sm font-serif text-[#F2EDE4] mb-4">
              Receive private previews of seasonal capsules, bespoke commissions, and tailoring essays.
            </p>

            {isSubscribed ? (
              <div className="flex items-center gap-2 p-3 bg-[#38312B]/60 border border-[#A8946C]/60 text-[#F2EDE4] text-xs uppercase tracking-widest">
                <Check size={14} className="text-[#A8946C]" />
                <span>You are now subscribed to the Atelier Dispatch.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-0">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="YOUR EMAIL ADDRESS"
                  required
                  className="flex-1 bg-transparent border-b border-[#38312B] text-sm text-[#F2EDE4] placeholder:text-[#686B5E] py-3 px-1 focus:outline-none focus:border-[#A8946C] transition-colors"
                />
                <button
                  type="submit"
                  className="mt-3 sm:mt-0 sm:ml-4 px-6 py-3 bg-[#F2EDE4] text-[#241E1A] text-[11px] font-medium tracking-[0.2em] uppercase hover:bg-[#A8946C] hover:text-[#F2EDE4] transition-all duration-300"
                >
                  Join
                </button>
              </form>
            )}
          </div>
        </div>

        {/* MIDDLE ROW: Editorial Navigation Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-b border-[#38312B]">
          {/* Col 1: Shop */}
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.25em] text-[#A8946C] font-semibold mb-4">
              Shop Collection
            </h4>
            <ul className="space-y-2.5 text-xs tracking-wide">
              <li>
                <Link href="/collections/new-arrivals" className="text-[#B8B0A3] hover:text-[#F2EDE4] transition-colors">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link href="/collections/clothing" className="text-[#B8B0A3] hover:text-[#F2EDE4] transition-colors">
                  All Clothing
                </Link>
              </li>
              <li>
                <Link href="/collections/shirts" className="text-[#B8B0A3] hover:text-[#F2EDE4] transition-colors">
                  Shirting & Overshirts
                </Link>
              </li>
              <li>
                <Link href="/collections/trousers" className="text-[#B8B0A3] hover:text-[#F2EDE4] transition-colors">
                  Pleated Trousers
                </Link>
              </li>
              <li>
                <Link href="/collections/outerwear" className="text-[#B8B0A3] hover:text-[#F2EDE4] transition-colors">
                  Tailored Outerwear
                </Link>
              </li>
              <li>
                <Link href="/collections/accessories" className="text-[#B8B0A3] hover:text-[#F2EDE4] transition-colors">
                  Accessories & Leather
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 2: Concierge */}
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.25em] text-[#A8946C] font-semibold mb-4">
              Client Concierge
            </h4>
            <ul className="space-y-2.5 text-xs tracking-wide">
              <li>
                <Link href="/contact" className="text-[#B8B0A3] hover:text-[#F2EDE4] transition-colors">
                  Contact & Private Appointments
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-[#B8B0A3] hover:text-[#F2EDE4] transition-colors">
                  Delivery & Global Shipping
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-[#B8B0A3] hover:text-[#F2EDE4] transition-colors">
                  Complimentary Returns
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-[#B8B0A3] hover:text-[#F2EDE4] transition-colors">
                  Garment Care & Sizing
                </Link>
              </li>
              <li>
                <Link href="/track-order" className="text-[#B8B0A3] hover:text-[#F2EDE4] transition-colors">
                  Track Consignment
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Maison & Atelier */}
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.25em] text-[#A8946C] font-semibold mb-4">
              Maison
            </h4>
            <ul className="space-y-2.5 text-xs tracking-wide">
              <li>
                <Link href="/about" className="text-[#B8B0A3] hover:text-[#F2EDE4] transition-colors">
                  The Philosophy
                </Link>
              </li>
              <li>
                <Link href="/atelier" className="text-[#B8B0A3] hover:text-[#F2EDE4] transition-colors">
                  Atelier & Craftsmanship
                </Link>
              </li>
              <li>
                <Link href="/journal" className="text-[#B8B0A3] hover:text-[#F2EDE4] transition-colors">
                  The Journal
                </Link>
              </li>
              <li>
                <Link href="/store-locator" className="text-[#B8B0A3] hover:text-[#F2EDE4] transition-colors">
                  Showroom Locations
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Account & Legal */}
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.25em] text-[#A8946C] font-semibold mb-4">
              Account & Legal
            </h4>
            <ul className="space-y-2.5 text-xs tracking-wide">
              <li>
                <Link href="/account" className="text-[#B8B0A3] hover:text-[#F2EDE4] transition-colors">
                  Client Profile
                </Link>
              </li>
              <li>
                <Link href="/account/orders" className="text-[#B8B0A3] hover:text-[#F2EDE4] transition-colors">
                  Order Archive
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-[#B8B0A3] hover:text-[#F2EDE4] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-[#B8B0A3] hover:text-[#F2EDE4] transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* BOTTOM ROW: Copyright & Micro Antique Brass Rule */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#8C8377] tracking-wider">
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 bg-[#A8946C] inline-block" />
            <span>© {new Date().getFullYear()} STITCH HOUSE. ALL RIGHTS RESERVED.</span>
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-[#B8B0A3] transition-colors">
              DHAKA • LONDON • MILAN
            </span>
            <span className="text-[#38312B]">|</span>
            <span className="font-serif italic text-[#B8B0A3]">Made with Intention</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

