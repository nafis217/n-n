'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const HeroCarousel: React.FC = () => {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  return (
    <section className="relative w-full h-[80vh] md:h-[90vh] bg-neutral-950 overflow-hidden border-b border-outline-variant group">
      {/* Background Hero Video Container */}
      <div className="relative w-full h-full overflow-hidden">
        <video
          ref={videoRef}
          src="/generate_ths_image_in_video_fo.mp4"
          autoPlay
          loop
          muted={isMuted}
          playsInline
          poster="https://lh3.googleusercontent.com/aida-public/AB6AXuBhN9KXDhW5X0_uSX8proRPzhXUzAdbN5F1LT221FDpVHz1Eh2NqiWwwJvZyO1-OD7cvm8pln68IcbESiyRUr-3P3AGMVzpSMCldYMl1spVvnQRFVPyQEXWn5BMELL-TXHMMHQpj-HUoEmy0aNpsUX74PZzxMbcj1ey0VmQAWOFn7mqk2JaZfdPhT9AWz0ciKtLuNKXdOh4FVWCrxU4JxbucGMACl2m4RPF3RGb_3xb5ieA69jK3VrD"
          style={{ filter: 'contrast(1.12) saturate(1.22) brightness(0.94)' }}
          className="w-full h-full object-cover scale-105 transition-transform duration-1000 ease-out"
        />

        {/* Minimal High-Fashion Gradient Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/30" />
      </div>

      {/* Neat & Clean Hero Content (Single Title & Single Primary CTA Button) */}
      <div className="absolute inset-0 flex flex-col justify-end p-margin-mobile md:p-margin-desktop text-white pb-12 md:pb-16">
        <div className="max-w-xl">
          <span className="inline-block px-3 py-1 bg-vermilion/90 backdrop-blur-md text-white font-label-caps text-[11px] font-bold uppercase tracking-widest mb-4">
            NEW COLLECTION 2026
          </span>

          <h1 className="font-display-lg text-4xl md:text-6xl lg:text-7xl uppercase tracking-tight font-extrabold mb-6 leading-none text-white drop-shadow-md">
            LINEAR SILHOUETTES
          </h1>

          <div>
            <Link href="/collections">
              <Button
                variant="primary"
                size="lg"
                className="bg-white text-primary hover:bg-neutral-200 border-none font-bold uppercase tracking-widest px-8 py-4 text-sm shadow-2xl transition-all duration-300 hover:scale-105"
              >
                EXPLORE COLLECTION <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Minimal Floating Sound Toggle (Bottom Right) */}
      <button
        onClick={() => setIsMuted(!isMuted)}
        title={isMuted ? 'Unmute Video Audio' : 'Mute Video Audio'}
        aria-label="Toggle Video Sound"
        className="absolute right-6 bottom-8 z-30 flex items-center gap-2 bg-black/50 backdrop-blur-md border border-white/20 px-3 py-2 text-white/80 hover:text-white text-xs font-label-caps uppercase tracking-wider transition-all duration-300 hover:bg-black/80"
      >
        {isMuted ? <VolumeX className="w-4 h-4 text-vermilion" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
        <span className="text-[11px] font-medium">{isMuted ? 'Muted' : 'Audio On'}</span>
      </button>
    </section>
  );
};


