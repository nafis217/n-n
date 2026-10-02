'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type HeroBannerStyle = 'sphere' | 'editorial' | 'cinematic';

export interface BannerConfig {
  activeStyle: HeroBannerStyle;
  headline: string;
  subheadline: string;
  tagline: string;
  ctaText: string;
  ctaLink: string;
  showShowroomTag: boolean;
}

interface BannerStoreState extends BannerConfig {
  setActiveStyle: (style: HeroBannerStyle) => void;
  updateConfig: (updates: Partial<BannerConfig>) => void;
  resetDefaults: () => void;
}

const DEFAULT_CONFIG: BannerConfig = {
  activeStyle: 'sphere',
  headline: 'QUIETLY REFINED.',
  subheadline: 'Modern menswear shaped by timeless proportions, natural fibers, and architectural tailoring.',
  tagline: 'COLLECTION VOL. 04 / BESPOKE ATELIER',
  ctaText: 'Explore Collection',
  ctaLink: '/collections/new-arrivals',
  showShowroomTag: true,
};

export const useBannerStore = create<BannerStoreState>()(
  persist(
    (set) => ({
      ...DEFAULT_CONFIG,
      setActiveStyle: (style) => set({ activeStyle: style }),
      updateConfig: (updates) => set((state) => ({ ...state, ...updates })),
      resetDefaults: () => set(DEFAULT_CONFIG),
    }),
    {
      name: 'stitch-house-banner-settings',
    }
  )
);
