'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  Plus,
  Edit3,
  Trash2,
  Eye,
  CheckCircle2,
  XCircle,
  Upload,
  Image as ImageIcon,
  Layers,
  ArrowRight,
  ExternalLink,
  Sparkles,
  RefreshCw,
  Save,
  X,
} from 'lucide-react';
import { toast } from '@/lib/store/toast';

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

const DEFAULT_GALLERY_IMAGES = [
  { url: '/images/products/architectural-black-suit-1.jpg', label: 'Black Suit — Front Stance' },
  { url: '/images/products/architectural-black-suit-2.jpg', label: 'Black Suit — Lapel Detail' },
  { url: '/images/products/architectural-black-suit-full.jpg', label: 'Black Suit — Full Silhouette' },
  { url: '/images/products/raw-selvedge-trucker-jacket.jpg', label: 'Raw Selvedge Trucker Jacket' },
  { url: '/images/products/monolith-contrast-polo.jpg', label: 'Monolith Technical Polo' },
  { url: '/images/products/product1_red_1.jpg', label: 'Oxford Shirt — Rose Pink' },
  { url: '/images/products/product1_green_1.jpg', label: 'Oxford Shirt — Forest Green' },
  { url: '/images/products/product1_maroon_1.jpg', label: 'Oxford Shirt — Royal Maroon' },
  { url: '/images/products/product1_white_1.jpg', label: 'Oxford Shirt — Crisp White' },
  { url: '/images/products/product1_yellow_1.jpg', label: 'Oxford Shirt — Mustard Ochre' },
  { url: '/images/products/product2_blue_1.jpg', label: 'Structured Polo — Cobalt Blue' },
  { url: '/images/products/product3_grey_1.jpg', label: 'French Terry Crewneck — Grey' },
  { url: '/images/products/product4_green_1.jpg', label: 'Heavyweight Tee — Sage Olive' },
  { url: '/images/products/product5_black_1.jpg', label: 'Tailored Blazer — Matte Black' },
  { url: '/images/products/product6_brown_1.jpg', label: 'Melton Overcoat — Espresso' },
  { url: '/images/products/product7_blue_1.jpg', label: 'Denim Overshirt — Washed Blue' },
  { url: '/images/products/espoir_La-Boheme-L-768x765.jpg', label: 'Espoir Couture — La Bohème' },
  { url: '/images/products/espoir_My-Rouge-L-768x768.jpg', label: 'Espoir Velvet — My Rouge' },
  { url: '/images/products/espoir_Blanc-sur-Blanc-L-768x760.jpg', label: 'Espoir Silk — Blanc sur Blanc' },
  { url: '/images/products/espoir_Summer-Fruits-L-768x763.jpg', label: 'Espoir Kimono — Summer Fruits' },
  { url: '/images/products/espoir_6-1-768x768.jpg', label: 'Espoir Atelier — Stone Ecru' },
  { url: '/images/products/shop_seiko-5-gmt-ssk001-18.jpg', label: 'Heritage SSK GMT Chronograph' },
  { url: '/images/products/shop_769b9d60ff941dde9bc0e54431b8d8fe3182f5e9.png', label: 'FUKU Graphic Boxy Tee' },
  { url: '/images/products/shop_d40da9a3a7234235e66d6695d9d7098fc3289872.png', label: 'FUKU Typography Heavy Tee' },
];

const INITIAL_BANNERS: CampaignBanner[] = [
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
    subtitle: 'Garments engineered from handspun Jamdani muslin and Japanese technical knits.',
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

export const CMSClientManager: React.FC = () => {
  const [banners, setBanners] = useState<CampaignBanner[]>(INITIAL_BANNERS);
  const [selectedBanner, setSelectedBanner] = useState<CampaignBanner | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [filterPlacement, setFilterPlacement] = useState<string>('all');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load from localStorage if present
  useEffect(() => {
    try {
      const saved = localStorage.getItem('fuku_cms_banners');
      if (saved) {
        setBanners(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  }, []);

  const saveBanners = (updated: CampaignBanner[]) => {
    setBanners(updated);
    try {
      localStorage.setItem('fuku_cms_banners', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const handleOpenAddModal = () => {
    const newBanner: CampaignBanner = {
      id: `camp-${Date.now()}`,
      title: 'NEW ARCHIVE CAMPAIGN',
      label: 'Seasonal Capsule 2026',
      subtitle: 'Engineered with architectural draping and pure natural fiber textiles.',
      ctaText: 'Shop Capsule',
      targetLink: '/new-drop',
      placement: 'hero',
      imageUrl: '/images/products/architectural-black-suit-1.jpg',
      isActive: true,
      objectFit: 'object-top',
      lastUpdated: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    };
    setSelectedBanner(newBanner);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (banner: CampaignBanner) => {
    setSelectedBanner({ ...banner });
    setIsModalOpen(true);
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBanner) return;

    if (!selectedBanner.title.trim()) {
      toast.warning('Title Required', 'Please enter a campaign headline.');
      return;
    }

    const exists = banners.some((b) => b.id === selectedBanner.id);
    let updated: CampaignBanner[];

    if (exists) {
      updated = banners.map((b) =>
        b.id === selectedBanner.id
          ? {
              ...selectedBanner,
              lastUpdated: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            }
          : b
      );
      toast.success('Banner Updated', `"${selectedBanner.title}" has been saved.`);
    } else {
      updated = [
        {
          ...selectedBanner,
          lastUpdated: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        },
        ...banners,
      ];
      toast.success('Campaign Created', `New banner "${selectedBanner.title}" created successfully.`);
    }

    saveBanners(updated);
    setIsModalOpen(false);
  };

  const handleDeleteBanner = (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete campaign "${title}"?`)) {
      const updated = banners.filter((b) => b.id !== id);
      saveBanners(updated);
      toast.info('Campaign Removed', `"${title}" was removed.`);
    }
  };

  const handleToggleActive = (id: string) => {
    const updated = banners.map((b) => (b.id === id ? { ...b, isActive: !b.isActive } : b));
    saveBanners(updated);
    const target = updated.find((b) => b.id === id);
    toast.info('Status Changed', `Banner is now ${target?.isActive ? 'Active' : 'Inactive'}.`);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !selectedBanner) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setSelectedBanner({ ...selectedBanner, imageUrl: reader.result });
        toast.success('Image Uploaded', 'New banner image loaded from device.');
      }
    };
    reader.readAsDataURL(file);
  };

  const filteredBanners = banners.filter((b) => {
    if (filterPlacement === 'all') return true;
    return b.placement === filterPlacement;
  });

  return (
    <div className="w-full space-y-8">
      {/* Top Header Section */}
      <div className="border-b border-neutral-200 pb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="font-mono text-xs text-neutral-500 uppercase font-medium tracking-wider">
              Storefront CMS
            </span>
            <span className="text-neutral-300">•</span>
            <span className="font-mono text-xs text-emerald-600 bg-emerald-50 px-2 py-0.5 border border-emerald-200 uppercase font-medium">
              Live Engine Active
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl uppercase font-semibold text-black tracking-tight">
            Website Banners &amp; Campaign Editor
          </h1>
          <p className="text-xs text-neutral-500 font-sans mt-1">
            Manage hero drops, editorial split banners, lookbooks, and top promotions directly across the storefront.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-neutral-300 text-black text-xs font-mono uppercase tracking-wider hover:bg-neutral-50 transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            Live Preview
          </Link>

          <button
            type="button"
            onClick={handleOpenAddModal}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-black text-white text-xs font-mono uppercase tracking-widest hover:bg-neutral-800 transition-colors shadow-sm cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            + ADD HERO CAMPAIGN
          </button>
        </div>
      </div>

      {/* Placement Filters & Metric Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-neutral-50 p-4 border border-neutral-200">
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {[
            { id: 'all', label: 'All Placements' },
            { id: 'hero', label: 'Hero Campaign' },
            { id: 'split', label: 'Editorial Split' },
            { id: 'fullbleed', label: 'Full Bleed' },
            { id: 'lookbook', label: 'Lookbook' },
            { id: 'announcement', label: 'Announcement Bar' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterPlacement(tab.id)}
              className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider whitespace-nowrap transition-colors border ${
                filterPlacement === tab.id
                  ? 'bg-black text-white border-black font-bold'
                  : 'bg-white text-neutral-600 border-neutral-200 hover:border-neutral-400'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4 text-xs font-mono text-neutral-500">
          <span>
            Total Banners: <strong className="text-black">{banners.length}</strong>
          </span>
          <span>
            Active: <strong className="text-emerald-600">{banners.filter((b) => b.isActive).length}</strong>
          </span>
        </div>
      </div>

      {/* Banners Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredBanners.map((banner) => (
          <div
            key={banner.id}
            className="bg-white border border-neutral-200 shadow-sm overflow-hidden flex flex-col justify-between hover:border-black transition-all duration-200 group"
          >
            <div>
              {/* Card Header */}
              <div className="p-4 border-b border-neutral-100 flex items-center justify-between bg-neutral-50/50">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[11px] uppercase px-2 py-0.5 bg-neutral-200 text-neutral-800 font-medium">
                    {banner.placement}
                  </span>
                  <span className="font-mono text-xs text-neutral-500 font-medium">{banner.label}</span>
                </div>
                <button
                  onClick={() => handleToggleActive(banner.id)}
                  className={`inline-flex items-center gap-1.5 text-[11px] font-mono uppercase px-2 py-0.5 border transition-colors ${
                    banner.isActive
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : 'bg-neutral-100 text-neutral-500 border-neutral-200'
                  }`}
                >
                  {banner.isActive ? (
                    <>
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      Active
                    </>
                  ) : (
                    <>
                      <XCircle className="w-3 h-3 text-neutral-400" />
                      Draft / Paused
                    </>
                  )}
                </button>
              </div>

              {/* Banner Visual Preview */}
              <div className="relative aspect-[21/9] w-full bg-neutral-100 overflow-hidden border-b border-neutral-100 group">
                <img
                  src={banner.imageUrl}
                  alt={banner.title}
                  className={`w-full h-full ${banner.objectFit || 'object-cover'} transition-transform duration-500 group-hover:scale-105`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-4 text-white">
                  <p className="text-[10px] font-mono uppercase tracking-widest text-white/70">{banner.label}</p>
                  <h3 className="text-base sm:text-lg font-bold font-display uppercase tracking-tight">{banner.title}</h3>
                </div>
              </div>

              {/* Content Details */}
              <div className="p-5 space-y-3">
                {banner.subtitle && (
                  <p className="text-xs text-neutral-600 font-sans line-clamp-2 leading-relaxed">
                    {banner.subtitle}
                  </p>
                )}

                <div className="grid grid-cols-2 gap-3 pt-2 text-xs font-mono text-neutral-500 border-t border-neutral-100">
                  <div>
                    <span className="text-[10px] uppercase text-neutral-400 block">CTA Action:</span>
                    <strong className="text-black font-medium">{banner.ctaText}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-neutral-400 block">Target Link:</span>
                    <strong className="text-black font-medium truncate block">{banner.targetLink}</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions Bar */}
            <div className="p-4 bg-neutral-50 border-t border-neutral-200 flex items-center justify-between gap-3">
              <span className="text-[11px] font-mono text-neutral-400">Updated {banner.lastUpdated}</span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleOpenEditModal(banner)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-black text-white text-xs font-mono uppercase tracking-wider hover:bg-neutral-800 transition-colors cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  Edit Banner Assets
                </button>

                <button
                  type="button"
                  onClick={() => handleDeleteBanner(banner.id, banner.title)}
                  className="p-1.5 text-neutral-400 hover:text-red-600 hover:bg-red-50 transition-colors border border-transparent hover:border-red-200"
                  title="Delete Campaign"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ─────────────────────────────────────────────────────────
          CAMPAIGN CREATOR & BANNER EDITOR MODAL
      ───────────────────────────────────────────────────────── */}
      {isModalOpen && selectedBanner && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white border border-neutral-200 shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto flex flex-col">
            {/* Modal Header */}
            <div className="p-6 border-b border-neutral-200 flex items-center justify-between sticky top-0 bg-white z-10">
              <div>
                <span className="font-mono text-xs text-neutral-500 uppercase font-medium">Storefront Banner CMS</span>
                <h2 className="text-xl font-bold uppercase tracking-tight text-black mt-0.5">
                  {banners.some((b) => b.id === selectedBanner.id) ? 'Edit Banner Assets' : 'Add New Hero Campaign'}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-neutral-400 hover:text-black transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form Content */}
            <form onSubmit={handleSaveModal} className="p-6 space-y-6 flex-1">
              {/* Image Preview & Upload Controls */}
              <div className="space-y-3">
                <label className="block text-xs font-mono uppercase text-black font-bold tracking-wider">
                  Banner Visual Asset
                </label>

                <div className="relative aspect-[21/9] w-full bg-neutral-100 border border-neutral-300 overflow-hidden group">
                  <img
                    src={selectedBanner.imageUrl}
                    alt="Preview"
                    className={`w-full h-full ${selectedBanner.objectFit || 'object-cover'}`}
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-3 py-2 bg-white text-black text-xs font-mono uppercase tracking-wider flex items-center gap-1.5 hover:bg-neutral-100 shadow"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      Upload From Device
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsGalleryOpen(true)}
                      className="px-3 py-2 bg-black text-white text-xs font-mono uppercase tracking-wider flex items-center gap-1.5 hover:bg-neutral-800 shadow"
                    >
                      <ImageIcon className="w-3.5 h-3.5" />
                      Pick From Photoshoot
                    </button>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono pt-1">
                  <div className="flex items-center gap-2">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileUpload}
                      accept="image/*"
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="inline-flex items-center gap-1 px-3 py-1.5 bg-neutral-100 text-black border border-neutral-300 hover:bg-neutral-200 transition-colors"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      Upload Local Image
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsGalleryOpen(true)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 bg-neutral-100 text-black border border-neutral-300 hover:bg-neutral-200 transition-colors"
                    >
                      <ImageIcon className="w-3.5 h-3.5" />
                      Photoshoot Gallery
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-neutral-500">Alignment:</span>
                    <select
                      value={selectedBanner.objectFit || 'object-top'}
                      onChange={(e) =>
                        setSelectedBanner({
                          ...selectedBanner,
                          objectFit: e.target.value as any,
                        })
                      }
                      className="px-2 py-1 bg-white border border-neutral-300 text-xs font-mono text-black focus:outline-none focus:border-black"
                    >
                      <option value="object-top">Top Focused</option>
                      <option value="object-center">Center</option>
                      <option value="object-bottom">Bottom Focused</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Form Input Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2 space-y-1">
                  <label className="text-xs font-mono uppercase text-neutral-600 block">
                    Headline Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={selectedBanner.title}
                    onChange={(e) => setSelectedBanner({ ...selectedBanner, title: e.target.value })}
                    placeholder="e.g. THE NEW FORM."
                    className="w-full px-3 py-2 border border-neutral-300 text-sm font-sans text-black focus:outline-none focus:border-black"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono uppercase text-neutral-600 block">
                    Eyebrow / Category Label
                  </label>
                  <input
                    type="text"
                    value={selectedBanner.label}
                    onChange={(e) => setSelectedBanner({ ...selectedBanner, label: e.target.value })}
                    placeholder="e.g. Autumn / Winter 2026"
                    className="w-full px-3 py-2 border border-neutral-300 text-sm font-sans text-black focus:outline-none focus:border-black"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono uppercase text-neutral-600 block">
                    Placement Location
                  </label>
                  <select
                    value={selectedBanner.placement}
                    onChange={(e) =>
                      setSelectedBanner({
                        ...selectedBanner,
                        placement: e.target.value as any,
                      })
                    }
                    className="w-full px-3 py-2 border border-neutral-300 text-sm font-mono text-black focus:outline-none focus:border-black bg-white"
                  >
                    <option value="hero">Hero Main Banner (Homepage Top)</option>
                    <option value="split">Section 02 Editorial Split</option>
                    <option value="fullbleed">Section 04 Full-Bleed Banner</option>
                    <option value="lookbook">Section 06 Archival Lookbook</option>
                    <option value="announcement">Top Header Announcement Bar</option>
                  </select>
                </div>

                <div className="sm:col-span-2 space-y-1">
                  <label className="text-xs font-mono uppercase text-neutral-600 block">
                    Subtitle / Campaign Copy
                  </label>
                  <textarea
                    rows={2}
                    value={selectedBanner.subtitle || ''}
                    onChange={(e) => setSelectedBanner({ ...selectedBanner, subtitle: e.target.value })}
                    placeholder="Brief manifesto or description text for the banner."
                    className="w-full px-3 py-2 border border-neutral-300 text-sm font-sans text-black focus:outline-none focus:border-black"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono uppercase text-neutral-600 block">
                    CTA Button Text
                  </label>
                  <input
                    type="text"
                    value={selectedBanner.ctaText}
                    onChange={(e) => setSelectedBanner({ ...selectedBanner, ctaText: e.target.value })}
                    placeholder="e.g. Shop Women"
                    className="w-full px-3 py-2 border border-neutral-300 text-sm font-sans text-black focus:outline-none focus:border-black"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono uppercase text-neutral-600 block">
                    Destination URL
                  </label>
                  <input
                    type="text"
                    value={selectedBanner.targetLink}
                    onChange={(e) => setSelectedBanner({ ...selectedBanner, targetLink: e.target.value })}
                    placeholder="e.g. /new-drop or /women"
                    className="w-full px-3 py-2 border border-neutral-300 text-sm font-mono text-black focus:outline-none focus:border-black"
                  />
                </div>

                <div className="sm:col-span-2 flex items-center gap-3 pt-2">
                  <input
                    type="checkbox"
                    id="isActiveBanner"
                    checked={selectedBanner.isActive}
                    onChange={(e) => setSelectedBanner({ ...selectedBanner, isActive: e.target.checked })}
                    className="w-4 h-4 accent-black cursor-pointer"
                  />
                  <label htmlFor="isActiveBanner" className="text-xs font-mono uppercase text-black cursor-pointer">
                    Publish &amp; Activate Immediately on Storefront
                  </label>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="p-4 bg-neutral-50 border-t border-neutral-200 -mx-6 -mb-6 flex items-center justify-end gap-3 sticky bottom-0">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-neutral-300 text-black text-xs font-mono uppercase tracking-wider hover:bg-neutral-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-black text-white text-xs font-mono uppercase tracking-widest hover:bg-neutral-800 flex items-center gap-2 shadow-sm"
                >
                  <Save className="w-3.5 h-3.5" />
                  Save &amp; Apply Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────
          PHOTOSHOOT MEDIA GALLERY PICKER MODAL
      ───────────────────────────────────────────────────────── */}
      {isGalleryOpen && selectedBanner && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-white border border-neutral-200 shadow-2xl w-full max-w-4xl max-h-[85vh] overflow-hidden flex flex-col">
            <div className="p-5 border-b border-neutral-200 flex items-center justify-between bg-neutral-50">
              <div>
                <span className="font-mono text-xs text-neutral-500 uppercase font-medium">Photoshoot Library</span>
                <h3 className="text-lg font-bold uppercase tracking-tight text-black">
                  Select Real Photoshoot Asset
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsGalleryOpen(false)}
                className="p-1.5 text-neutral-400 hover:text-black"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 flex-1">
              {DEFAULT_GALLERY_IMAGES.map((img, i) => (
                <div
                  key={i}
                  onClick={() => {
                    setSelectedBanner({ ...selectedBanner, imageUrl: img.url });
                    setIsGalleryOpen(false);
                    toast.success('Asset Selected', `Applied ${img.label}`);
                  }}
                  className={`group relative aspect-[3/4] bg-neutral-100 border-2 cursor-pointer overflow-hidden transition-all duration-150 ${
                    selectedBanner.imageUrl === img.url
                      ? 'border-black ring-2 ring-black/20'
                      : 'border-neutral-200 hover:border-black'
                  }`}
                >
                  <img
                    src={img.url}
                    alt={img.label}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-2.5">
                    <p className="text-[11px] font-mono text-white leading-tight">{img.label}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 bg-neutral-50 border-t border-neutral-200 flex justify-end">
              <button
                type="button"
                onClick={() => setIsGalleryOpen(false)}
                className="px-4 py-2 bg-neutral-200 text-black text-xs font-mono uppercase tracking-wider hover:bg-neutral-300"
              >
                Close Gallery
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
