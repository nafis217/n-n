'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface Slide {
  id: string;
  tag: string;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  image: string;
}

const HERO_SLIDES: Slide[] = [
  {
    id: 'slide-1',
    tag: 'NEW DROP 2026',
    title: 'LINEAR SILHOUETTES',
    subtitle: 'Architectural minimalism crafted with Bangladeshi organic waffle cotton.',
    ctaText: 'EXPLORE NEW DROP',
    ctaLink: '/new-drop',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBhN9KXDhW5X0_uSX8proRPzhXUzAdbN5F1LT221FDpVHz1Eh2NqiWwwJvZyO1-OD7cvm8pln68IcbESiyRUr-3P3AGMVzpSMCldYMl1spVvnQRFVPyQEXWn5BMELL-TXHMMHQpj-HUoEmy0aNpsUX74PZzxMbcj1ey0VmQAWOFn7mqk2JaZfdPhT9AWz0ciKtLuNKXdOh4FVWCrxU4JxbucGMACl2m4RPF3RGb_3xb5ieA69jK3VrD',
  },
  {
    id: 'slide-2',
    tag: 'EDITORIAL SERIES',
    title: 'DHAKA AFTER DARK',
    subtitle: 'Sharp monochrome tailoring & high-contrast night aesthetics.',
    ctaText: 'SHOP EDITORIAL LOOK',
    ctaLink: '/collections',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDLaRVJUicBp_Pwm0AC1oCfYw6SaEoBcCISzSLJc-Vi-JBoED8gBcfQWBCapOG3M_8I3D6EKnd59PuGfenBidubJ-JDkmmoURnkQpisAiw6SQrKUSyn3mNfAeE9I6sZc3G0BVp4UdV36G5aPGgEBgiQaDUXqTbg9KAyF-n4mkLlNXLDi0-22szka_u03AmVlVtH3ScmQJcNfQBUa6G00d0n7fltmjMB_sE96MJP1iIMvw0T6ebVtf32',
  },
  {
    id: 'slide-3',
    tag: 'ETHNIC CONTEMPORARY',
    title: 'THE PANJABI REINVENTION',
    subtitle: 'Hard-edge modern cuts honoring ancient heritage weaving.',
    ctaText: 'VIEW PANJABI RANGE',
    ctaLink: '/panjabi',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBkZzdNEoqzXp6VHwwmHKm93W8yH61nRWeujHjzC4L1RK0cF0A7bgCzJLoCh3FSswIld6Zs7f-Zr1tvvTCjbNOiNkVUt7aXkCFtf9lgWxThh_fY5QmAJzOpV0YaRDRNQ90ACDhSafvkg-fk4F5_CY1YfxOKGpij3ytGK9XXLa4wvWlycSerFpuGXLhLHBPji0VIpr2ESO3bL_7oBn2V5JgsRZlrMM2xNyVkSC2npWZLJbbkoidfTHDN',
  },
  {
    id: 'slide-4',
    tag: 'TEXTILE INNOVATION',
    title: 'JAMDANI REFRAMED',
    subtitle: 'Handwoven traditional motifs seamlessly integrated with industrial silhouettes.',
    ctaText: 'DISCOVER JAMDANI',
    ctaLink: '/collections',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDf6et4kXFCy4K5PgMgL4j5tIiqAZ-cIL8-njfdaTCP2-d3jnSVF_-fYiAVwqqjBcG7vsvuY9HkT3j-SbAQ0nPGZt6nBEEpiwE0Qn29Y_JYlbG8y1tq4LpZMsqlAhQJay_WMMLBDFkvphz6pgHRDOwbQ6nHi3SAjgdAoiIR0pN6RTJ1IxYH0sKad4_iF_pZq-YCkvG1z7UYWG1BNufUYq1O8AMHb8r-3D-hRafn2bXsPSXz8W3pgl3X',
  },
];

export const HeroCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
      }, 4500);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying]);

  return (
    <section className="relative w-full h-[75vh] md:h-[85vh] bg-surface-container overflow-hidden border-b border-outline-variant group">
      {/* Background Animated Video Model Slide Container */}
      {HERO_SLIDES.map((slide, idx) => {
        const isActive = idx === currentIndex;

        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            {/* Animated Model Image with Motion Effect */}
            <div className="relative w-full h-full overflow-hidden">
              <img
                src={slide.image}
                alt={slide.title}
                className={`w-full h-full object-cover transition-transform duration-[7000ms] ease-out ${
                  isActive ? 'scale-105' : 'scale-100'
                }`}
              />
              {/* Gradient Dark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            </div>

            {/* Slide Content Overlay */}
            <div className="absolute inset-0 flex flex-col justify-end p-margin-mobile md:p-margin-desktop text-white">
              <div className="max-w-2xl transform transition-all duration-700 delay-300">
                <span className="inline-block px-3 py-1 bg-vermilion text-white font-label-caps text-[11px] font-bold uppercase tracking-widest mb-3">
                  {slide.tag}
                </span>

                <h1 className="font-display-lg text-3xl md:text-6xl uppercase tracking-tight font-extrabold mb-3 leading-none text-white drop-shadow-md">
                  {slide.title}
                </h1>

                <p className="font-body-md text-sm md:text-lg text-neutral-200 mb-8 max-w-xl font-normal leading-relaxed">
                  {slide.subtitle}
                </p>

                <Link href={slide.ctaLink}>
                  <Button variant="primary" size="lg" className="bg-white text-primary hover:bg-neutral-200 border-none font-bold">
                    {slide.ctaText} <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        );
      })}

      {/* Right Side Vertical Slide Controller */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-4 items-end">
        {HERO_SLIDES.map((slide, idx) => {
          const isActive = idx === currentIndex;

          return (
            <button
              key={slide.id}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Jump to slide ${idx + 1}`}
              className={`flex items-center gap-3 group/item transition-all duration-300 ${
                isActive ? 'scale-105' : 'opacity-70 hover:opacity-100'
              }`}
            >
              <span
                className={`font-label-caps text-[11px] uppercase tracking-widest transition-all ${
                  isActive ? 'text-white font-bold' : 'text-white/60 font-semibold'
                }`}
              >
                0{idx + 1}
              </span>

              <div
                className={`transition-all duration-500 ${
                  isActive
                    ? 'w-10 h-[3px] bg-vermilion'
                    : 'w-4 h-[2px] bg-white/40 group-hover/item:w-6 group-hover/item:bg-white'
                }`}
              />
            </button>
          );
        })}

        {/* Auto-Play Toggle Indicator */}
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          aria-label="Toggle Auto-Play"
          className="mt-2 w-8 h-8 bg-black/60 text-white border border-white/20 flex items-center justify-center hover:bg-black transition-colors rounded-none"
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
        </button>
      </div>
    </section>
  );
};
