'use client';

import React, { useState, useEffect } from 'react';
import { useBannerStore, HeroBannerStyle } from '@/lib/store/bannerStore';
import { StitchHouse3DSphereHero } from './StitchHouse3DSphereHero';
import { StitchHouseEditorialHero } from './StitchHouseEditorialHero';
import { StitchHouseCinematicHero } from './StitchHouseCinematicHero';
import { SlidersHorizontal, Check } from 'lucide-react';

export const StitchHouseHeroHost: React.FC = () => {
  const { activeStyle, setActiveStyle } = useBannerStore();
  const [mounted, setMounted] = useState(false);
  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <StitchHouse3DSphereHero />;
  }

  const renderActiveHero = () => {
    switch (activeStyle) {
      case 'editorial':
        return <StitchHouseEditorialHero />;
      case 'cinematic':
        return <StitchHouseCinematicHero />;
      case 'sphere':
      default:
        return <StitchHouse3DSphereHero />;
    }
  };

  const banners: Array<{ id: HeroBannerStyle; label: string; desc: string }> = [
    { id: 'sphere', label: '3D Sphere Archive', desc: 'Interactive 3D rotating Fibonacci sphere' },
    { id: 'editorial', label: 'Editorial Split', desc: 'Classic luxury tailoring lookbook with capsule tabs' },
    { id: 'cinematic', label: 'Cinematic Video', desc: 'Full-bleed luxury film with live product slider' },
  ];

  return (
    <div className="relative w-full">
      {/* Active Hero Banner */}
      {renderActiveHero()}

      {/* Floating Quick Hero Style Switcher */}
      <div className="fixed bottom-6 right-6 z-40">
        {showPicker && (
          <div className="mb-2 p-3 bg-[#1F1916] text-[#F2EDE4] border border-[#38312B] shadow-2xl rounded-xs w-64 animate-in fade-in slide-in-from-bottom-2 duration-200">
            <div className="text-[10px] uppercase font-mono tracking-widest text-[#A8946C] mb-2 font-semibold flex items-center justify-between">
              <span>Choose Hero Style</span>
              <span className="text-[9px] text-[#B8B0A3]">3 Styles</span>
            </div>
            <div className="flex flex-col gap-1.5">
              {banners.map((b) => (
                <button
                  key={b.id}
                  onClick={() => {
                    setActiveStyle(b.id);
                    setShowPicker(false);
                  }}
                  className={`flex items-center justify-between p-2 text-left text-xs transition-all ${
                    activeStyle === b.id
                      ? 'bg-[#A8946C] text-[#241E1A] font-medium'
                      : 'hover:bg-[#38312B] text-[#B8B0A3]'
                  }`}
                >
                  <div>
                    <div className="font-serif font-medium">{b.label}</div>
                    <div className="text-[9px] opacity-80 font-sans">{b.desc}</div>
                  </div>
                  {activeStyle === b.id && <Check size={14} />}
                </button>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={() => setShowPicker(!showPicker)}
          className="flex items-center gap-2 px-3 py-2 bg-[#241E1A]/90 text-[#F2EDE4] border border-[#38312B] hover:border-[#A8946C] shadow-lg text-[10px] uppercase tracking-widest transition-all rounded-xs backdrop-blur-xs"
          aria-label="Switch hero banner style"
        >
          <SlidersHorizontal size={13} className="text-[#A8946C]" />
          <span>Switch Hero Banner</span>
        </button>
      </div>
    </div>
  );
};
