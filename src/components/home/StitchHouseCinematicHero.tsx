'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, Play, Pause, Volume2, VolumeX, Sparkles } from 'lucide-react';
import { SHMonogram } from '../brand/SHMonogram';
import { useBannerStore } from '@/lib/store/bannerStore';

const HIGHLIGHTS = [
  {
    id: 'h1',
    label: 'Obsidian Tuxedo',
    category: 'Formalwear',
    image: '/images/products/architectural-black-suit-1.jpg',
    href: '/products/architectural-black-wool-suit',
  },
  {
    id: 'h2',
    label: 'Founder Blazer',
    category: 'Bespoke Atelier',
    image: '/images/user_portrait.jpg',
    href: '/collections/clothing',
  },
  {
    id: 'h3',
    label: 'Cashmere Trench',
    category: 'Outerwear',
    image: '/images/MAXZARA_AFW24_0010_copy.webp',
    href: '/collections/outerwear',
  },
  {
    id: 'h4',
    label: 'Selvedge Denim',
    category: 'Raw Craft',
    image: '/images/products/raw-selvedge-trucker-jacket.jpg',
    href: '/collections/clothing',
  },
];

export const StitchHouseCinematicHero: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { headline, subheadline, ctaText, ctaLink } = useBannerStore();

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="relative w-full h-[78vh] min-h-[540px] max-h-[720px] overflow-hidden bg-[#241E1A] text-[#F2EDE4] border-b border-[#38312B] select-none">
      {/* Background Cinematic Video */}
      <video
        ref={videoRef}
        src="/generate_ths_image_in_video_fo.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover object-center opacity-65"
      />

      {/* Luxury Gradient Dark Wash */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#241E1A] via-[#241E1A]/40 to-black/60 pointer-events-none" />

      {/* Top Bar Details */}
      <div className="absolute top-6 inset-x-0 px-6 sm:px-12 flex items-center justify-between z-20">
        <div className="flex items-center gap-3">
          <SHMonogram size={18} variant="brass" />
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#B8B0A3]">
            Cinematic Lookbook · Vol. 04
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={togglePlay}
            className="p-2 bg-[#241E1A]/80 border border-[#38312B] text-[#F2EDE4] hover:text-[#A8946C] transition-colors rounded-xs"
            aria-label={isPlaying ? 'Pause video' : 'Play video'}
          >
            {isPlaying ? <Pause size={13} /> : <Play size={13} />}
          </button>
          <button
            onClick={toggleMute}
            className="p-2 bg-[#241E1A]/80 border border-[#38312B] text-[#F2EDE4] hover:text-[#A8946C] transition-colors rounded-xs"
            aria-label={isMuted ? 'Unmute video' : 'Mute video'}
          >
            {isMuted ? <VolumeX size={13} /> : <Volume2 size={13} />}
          </button>
        </div>
      </div>

      {/* Center Cinematic Content */}
      <div className="relative h-full flex flex-col justify-center items-center text-center px-4 max-w-3xl mx-auto z-10 pt-4">
        <span className="text-[11px] uppercase tracking-[0.35em] text-[#A8946C] mb-3 font-medium block animate-in fade-in duration-700">
          STITCH HOUSE • MAISON DHAKA
        </span>
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif text-[#F2EDE4] leading-[1.05] tracking-tight font-normal">
          {headline}
        </h1>
        <p className="mt-4 text-xs sm:text-sm md:text-base text-[#B8B0A3] font-sans max-w-lg leading-relaxed">
          {subheadline}
        </p>

        <div className="mt-6 flex items-center gap-4">
          <Link
            href={ctaLink || '/collections/new-arrivals'}
            className="px-6 py-3 bg-[#F2EDE4] text-[#241E1A] text-[10px] sm:text-[11px] font-medium tracking-[0.2em] uppercase hover:bg-[#A8946C] hover:text-[#F2EDE4] transition-all flex items-center gap-2 group"
          >
            <span>{ctaText}</span>
            <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/atelier"
            className="px-5 py-3 bg-[#241E1A]/80 border border-[#38312B] text-[#F2EDE4] text-[10px] sm:text-[11px] font-medium tracking-[0.2em] uppercase hover:border-[#A8946C] transition-all"
          >
            Atelier Films →
          </Link>
        </div>
      </div>

      {/* Bottom Floating Lookbook Carousel Strip */}
      <div className="absolute bottom-4 inset-x-0 px-6 sm:px-12 flex items-center justify-between z-20">
        <div className="hidden md:flex items-center gap-3">
          {HIGHLIGHTS.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="flex items-center gap-2.5 p-1.5 pr-3 bg-[#241E1A]/85 backdrop-blur-xs border border-[#38312B] hover:border-[#A8946C] transition-all"
            >
              <img src={item.image} alt={item.label} className="w-8 h-8 object-cover rounded-xs" />
              <div className="text-left">
                <span className="text-[10px] text-[#F2EDE4] font-medium block truncate max-w-[100px]">
                  {item.label}
                </span>
                <span className="text-[8px] text-[#A8946C] uppercase tracking-wider block">
                  {item.category}
                </span>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-[10px] uppercase tracking-widest text-[#B8B0A3]/80 ml-auto">
          Dhaka • London • Milan
        </div>
      </div>
    </div>
  );
};
