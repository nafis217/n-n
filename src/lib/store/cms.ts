'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CampaignBanner {
  id: string;
  title: string;
  label: string;
  subtitle?: string;
  ctaText: string;
  targetLink: string;
  placement: 'hero' | 'split' | 'fullbleed' | 'lookbook' | 'announcement';
  imageUrl: string;
  isActive: boolean;
  objectFit?: 'object-top' | 'object-center' | 'object-bottom' | 'object-cover';
  lastUpdated: string;
}

export const INITIAL_CMS_BANNERS: CampaignBanner[] = [
  {
    id: 'hero-aw-2026',
    title: 'THE NEW FORM.',
    label: 'Autumn / Winter 2026',
    subtitle: 'High-twist Italian wool double-breasted tailoring engineered in Dhaka atelier.',
    ctaText: 'Shop New Arrivals',
    targetLink: '/new-drop',
    placement: 'hero',
    imageUrl: '/images/products/architectural-black-suit-1.jpg',
    isActive: true,
    objectFit: 'object-top',
    lastUpdated: 'Sep 19, 2026',
  },
  {
    id: 'split-the-edit',
    title: 'FORM / FUNCTION.',
    label: 'The Edit',
    subtitle: 'Garments engineered from handspun Jamdani muslin and Japanese technical knits. Designed for everyday movement, refined for every occasion.',
    ctaText: 'Explore Collections',
    targetLink: '/collections',
    placement: 'split',
    imageUrl: '/images/products/monolith-contrast-polo.jpg',
    isActive: true,
    objectFit: 'object-top',
    lastUpdated: 'Sep 19, 2026',
  },
  {
    id: 'fullbleed-men',
    title: 'ESSENTIALS, REFINED.',
    label: "Men's Collection",
    subtitle: '15.5oz raw Kuroki selvedge denim trucker jacket and bespoke shirting.',
    ctaText: 'Shop Men',
    targetLink: '/men',
    placement: 'fullbleed',
    imageUrl: '/images/products/raw-selvedge-trucker-jacket.jpg',
    isActive: true,
    objectFit: 'object-top',
    lastUpdated: 'Sep 18, 2026',
  },
  {
    id: 'lookbook-aw26',
    title: 'AW 2026 ARCHIVAL LOOKBOOK',
    label: 'Lookbook — AW 2026',
    subtitle: 'Editorial series captured across Dhaka architectural landmarks.',
    ctaText: 'View Lookbook',
    targetLink: '/collections',
    placement: 'lookbook',
    imageUrl: '/images/products/architectural-black-suit-full.jpg',
    isActive: true,
    objectFit: 'object-top',
    lastUpdated: 'Sep 18, 2026',
  },
  {
    id: 'announcement-top',
    title: 'COMPLIMENTARY NATIONWIDE EXPRESS COURIER ON ORDERS OVER BDT 15,000',
    label: 'Header Bar Promo',
    subtitle: 'Active across all 64 districts in Bangladesh via RedX & Steadfast.',
    ctaText: 'Learn More',
    targetLink: '/shipping',
    placement: 'announcement',
    imageUrl: '/images/products/product1_red_1.jpg',
    isActive: true,
    lastUpdated: 'Sep 19, 2026',
  },
];

interface CMSState {
  banners: CampaignBanner[];
  setBanners: (banners: CampaignBanner[]) => void;
  updateBanner: (banner: CampaignBanner) => void;
  addBanner: (banner: CampaignBanner) => void;
  deleteBanner: (id: string) => void;
  toggleBannerActive: (id: string) => void;
  getBannerByPlacement: (placement: CampaignBanner['placement']) => CampaignBanner | undefined;
}

export const useCMSStore = create<CMSState>()(
  persist(
    (set, get) => ({
      banners: INITIAL_CMS_BANNERS,

      setBanners: (banners) => set({ banners }),

      updateBanner: (updatedBanner) =>
        set((state) => ({
          banners: state.banners.map((b) =>
            b.id === updatedBanner.id ? { ...updatedBanner, lastUpdated: 'Just now' } : b
          ),
        })),

      addBanner: (newBanner) =>
        set((state) => ({
          banners: [newBanner, ...state.banners],
        })),

      deleteBanner: (id) =>
        set((state) => ({
          banners: state.banners.filter((b) => b.id !== id),
        })),

      toggleBannerActive: (id) =>
        set((state) => ({
          banners: state.banners.map((b) =>
            b.id === id ? { ...b, isActive: !b.isActive } : b
          ),
        })),

      getBannerByPlacement: (placement) => {
        return get().banners.find((b) => b.placement === placement && b.isActive);
      },
    }),
    {
      name: 'fuku_cms_banners_v2',
    }
  )
);
