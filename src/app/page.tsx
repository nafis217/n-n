'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  getFeaturedProducts,
  getNewArrivals,
  getBestSellers,
  ProductItem,
} from '@/lib/queries/products';
import { ProductCard } from '@/components/product/ProductCard';
import { QuickViewModal } from '@/components/product/QuickViewModal';
import { SizeGuideModal } from '@/components/product/SizeGuideModal';
import { toast } from '@/lib/store/toast';
import {
  ArrowRight,
  Sparkles,
  ShoppingBag,
  ShieldCheck,
  Truck,
  RefreshCw,
  Star,
  Send,
  Compass,
  Instagram,
  Heart,
  ChevronRight,
} from 'lucide-react';

export default function HomePage() {
  const [quickViewProduct, setQuickViewProduct] = useState<ProductItem | null>(null);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const featured = getFeaturedProducts().slice(0, 4);
  const newArrivals = getNewArrivals().slice(0, 6);
  const bestSellers = getBestSellers().slice(0, 4);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) {
      toast.warning('Email Required', 'Please provide a valid email address.');
      return;
    }
    setSubscribed(true);
    toast.success('VIP Invitation Dispatched', 'Welcome to the FUKU Archive private collector list.');
  };

  const CATEGORIES = [
    {
      title: 'Women Archive',
      subtitle: 'Draped Jamdani, Pleated Dresses & Trousers',
      image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=1200',
      href: '/women',
    },
    {
      title: 'Men Sartorial',
      subtitle: 'Raw Linen Blazers, Pleats & Selvedge Denim',
      image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=1200',
      href: '/men',
    },
    {
      title: 'Panjabi Reinvention',
      subtitle: 'Handspun Khadi Silk & Modernist Collars',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=1200',
      href: '/panjabi',
    },
    {
      title: 'Genderless Utility',
      subtitle: 'Tactical Kimonos & 280 GSM Heavy Knits',
      image: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&q=80&w=1200',
      href: '/unisex',
    },
  ];

  const TESTIMONIALS = [
    {
      quote:
        'The Tactical Kimono drape is unparalleled. The Japanese twill fabric holds its shape like architectural tailoring. FUKU is redefining Bangladeshi fashion globally.',
      author: 'Abrar Z.',
      role: 'Creative Director, Dhaka',
      rating: 5,
    },
    {
      quote:
        'Finally a brand that respects Jamdani heritage while bringing it into the 21st century. The monochrome geometry is pure sartorial poetry.',
      author: 'Nadia Chowdhury',
      role: 'Textile Collector',
      rating: 5,
    },
    {
      quote:
        'The 280 GSM heavyweight tee collar stays rigid even after dozens of washes. Essential daily luxury with zero compromises.',
      author: 'Sadman S.',
      role: 'Architect & Collector',
      rating: 5,
    },
  ];

  const INSTAGRAM_POSTS = [
    'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&q=80&w=800',
  ];

  return (
    <div className="min-h-screen bg-[#0D0E10] text-[#F3EFE7]">
      {/* 
        1. CINEMATIC HERO SECTION
      */}
      <section className="relative h-screen min-h-[640px] max-h-[1080px] w-full flex items-center justify-center overflow-hidden">
        {/* Background Video / Visual Image Layer */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=85&w=2000"
            alt="FUKU 2026 Archive Hero"
            fill
            priority
            className="object-cover object-center grayscale contrast-125 opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D0E10] via-[#0D0E10]/40 to-[#0D0E10]/80" />
        </div>

        {/* Hero Copy & Action Bar */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-8 text-center space-y-6 pt-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-black/60 backdrop-blur-md border border-[#3A3D40] text-xs font-mono font-bold tracking-[0.2em] uppercase text-white">
            <Sparkles className="w-3.5 h-3.5 text-[#FF3B30]" />
            <span>Drop 01: Spring / Summer 2026 Runway Series</span>
          </div>

          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-[-0.04em] text-white leading-tight">
            Future Bengal <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#F3EFE7] to-[#A0A4A8]">
              Industrial
            </span>
          </h1>

          <p className="text-xs sm:text-sm md:text-base text-[#C0C4C8] max-w-xl mx-auto font-sans leading-relaxed">
            Architectural silhouettes engineered in Dhaka. Handspun Jamdani muslin, Japanese heavy technical knits, and deconstructed tailoring.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/shop"
              className="w-full sm:w-auto px-8 py-4 bg-white text-black hover:bg-[#E5E0D8] font-display font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 transition-all shadow-2xl group"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Shop All Garments</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/new-drop"
              className="w-full sm:w-auto px-8 py-4 bg-transparent border border-white/40 hover:border-white hover:bg-white/10 text-white font-display font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 transition-all backdrop-blur-sm"
            >
              <span>Explore New Drop</span>
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/60 font-mono text-[10px] uppercase tracking-widest animate-bounce">
          <span>Scroll to Explore</span>
          <div className="w-4 h-7 border border-white/40 rounded-full flex items-start justify-center p-1">
            <div className="w-1 h-2 bg-white rounded-full" />
          </div>
        </div>
      </section>

      {/* 
        2. VALUE PROPOSITION BAR
      */}
      <section className="border-t border-b border-[#202224] bg-[#111214] py-6 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center gap-3">
            <Truck className="w-6 h-6 text-[#FF3B30] shrink-0" />
            <div>
              <h4 className="font-display text-xs font-bold uppercase tracking-wider text-white">
                24-48h Dhaka Dispatch
              </h4>
              <p className="text-[11px] text-[#8C9094] font-mono">Nationwide courier delivery</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0" />
            <div>
              <h4 className="font-display text-xs font-bold uppercase tracking-wider text-white">
                Master Artisan Weaves
              </h4>
              <p className="text-[11px] text-[#8C9094] font-mono">Authentic Jamdani &amp; Khadi</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-3">
            <RefreshCw className="w-6 h-6 text-[#FF3B30] shrink-0" />
            <div>
              <h4 className="font-display text-xs font-bold uppercase tracking-wider text-white">
                7-Day Free Exchange
              </h4>
              <p className="text-[11px] text-[#8C9094] font-mono">Flagship or doorstep pickup</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-3">
            <Sparkles className="w-6 h-6 text-amber-400 shrink-0" />
            <div>
              <h4 className="font-display text-xs font-bold uppercase tracking-wider text-white">
                Cash on Delivery
              </h4>
              <p className="text-[11px] text-[#8C9094] font-mono">bKash, Nagad &amp; Card</p>
            </div>
          </div>
        </div>
      </section>

      {/* 
        3. FEATURED CATEGORIES SHOWCASE
      */}
      <section className="py-16 md:py-24 px-4 sm:px-8 md:px-12 max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[#202224]">
          <div>
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#FF3B30] font-bold block mb-1">
              Curated Silhouettes
            </span>
            <h2 className="font-display text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-white">
              Featured Categories
            </h2>
          </div>
          <Link
            href="/shop"
            className="text-xs font-mono uppercase tracking-wider text-[#A0A4A8] hover:text-white flex items-center gap-1.5 hover:underline"
          >
            <span>View All Categories</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((cat, idx) => (
            <Link
              key={idx}
              href={cat.href}
              className="group relative aspect-[3/4] bg-[#141517] border border-[#242628] overflow-hidden flex flex-col justify-end p-6"
            >
              <Image
                src={cat.image}
                alt={cat.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent transition-opacity duration-300 group-hover:opacity-95" />

              <div className="relative z-10 space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#FF3B30] font-bold block">
                  Category 0{idx + 1}
                </span>
                <h3 className="font-display text-lg font-bold uppercase tracking-wider text-white group-hover:text-white transition-colors">
                  {cat.title}
                </h3>
                <p className="text-[11px] text-[#A0A4A8] font-sans line-clamp-1">
                  {cat.subtitle}
                </p>
                <div className="pt-2 text-[11px] font-mono uppercase tracking-widest text-white flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Explore Line</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 
        4. NEW ARRIVALS & SPRING 2026 RUNWAY
      */}
      <section className="py-16 md:py-24 px-4 sm:px-8 md:px-12 bg-[#101113] border-t border-b border-[#202224]">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[#202224]">
            <div>
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#FF3B30] font-bold block mb-1">
                Seasonal Release
              </span>
              <h2 className="font-display text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-white">
                New Arrivals
              </h2>
            </div>
            <Link
              href="/new-drop"
              className="text-xs font-mono uppercase tracking-wider text-[#A0A4A8] hover:text-white flex items-center gap-1.5 hover:underline"
            >
              <span>View Full Drop ({newArrivals.length} pieces)</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
            {newArrivals.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={(p) => setQuickViewProduct(p)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 
        5. PROMOTIONAL HERO BANNER ("Elevate Your Everyday")
      */}
      <section className="relative py-24 md:py-32 px-4 sm:px-8 md:px-12 overflow-hidden border-b border-[#202224]">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&q=80&w=1800"
            alt="Promotional Banner"
            fill
            className="object-cover object-center grayscale contrast-125"
          />
          <div className="absolute inset-0 bg-black/75 backdrop-blur-xs" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#FF3B30] font-bold block">
            The Atelier Standard
          </span>
          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white leading-tight">
            Elevate Your Everyday
          </h2>
          <p className="text-xs sm:text-sm text-[#C0C4C8] max-w-lg mx-auto font-sans leading-relaxed">
            High-density 280 GSM long-staple cotton, French terry loopback, and Japanese Cordura outerwear designed for unrelenting daily wear in tropical and urban climates.
          </p>
          <div className="pt-2">
            <Link
              href="/unisex"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-display font-bold text-xs uppercase tracking-widest hover:bg-[#E5E0D8] transition-colors shadow-2xl"
            >
              <span>Explore Everyday Essentials</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 
        6. BEST SELLERS SECTION
      */}
      <section className="py-16 md:py-24 px-4 sm:px-8 md:px-12 max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[#202224]">
          <div>
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#FF3B30] font-bold block mb-1">
              Collector Favorites
            </span>
            <h2 className="font-display text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-white">
              The FUKU Icons
            </h2>
          </div>
          <Link
            href="/best-sellers"
            className="text-xs font-mono uppercase tracking-wider text-[#A0A4A8] hover:text-white flex items-center gap-1.5 hover:underline"
          >
            <span>View All Best Sellers</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={(p) => setQuickViewProduct(p)}
            />
          ))}
        </div>
      </section>

      {/* 
        7. EDITORIAL ATELIER STORY & HERITAGE
      */}
      <section className="py-16 md:py-24 px-4 sm:px-8 md:px-12 bg-[#111214] border-t border-b border-[#202224]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#FF3B30] font-bold block">
              The Narrative
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-white leading-tight">
              Bridging 400 Years of Handloom with Dystopian Techwear
            </h2>
            <p className="text-xs sm:text-sm text-[#9CA0A4] leading-relaxed font-sans">
              Founded in Dhaka, FUKU operates as a modern sartorial atelier. We reject the generic cookie-cutter aesthetics of fast fashion. Each garment is crafted from authentic handwoven Narayanganj Jamdani, Comilla Khadi silk, or rigid Japanese twill with custom matte hardware.
            </p>
            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 font-display text-xs uppercase tracking-widest font-bold text-white hover:text-[#FF3B30] transition-colors"
              >
                <span>Read Full Atelier Manifesto</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="relative aspect-[3/4] bg-[#161719] border border-[#26282B] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=800"
                alt="Jamdani handloom weaving"
                fill
                className="object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-700"
              />
            </div>
            <div className="relative aspect-[3/4] bg-[#161719] border border-[#26282B] overflow-hidden mt-8">
              <Image
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800"
                alt="Runway look"
                fill
                className="object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-700"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 
        8. COLLECTOR CHRONICLES & TESTIMONIALS
      */}
      <section className="py-16 md:py-24 px-4 sm:px-8 md:px-12 max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#FF3B30] font-bold block">
            Collector Chronicles
          </span>
          <h2 className="font-display text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-white">
            Client Testimonials
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={idx}
              className="p-8 bg-[#121315] border border-[#242628] flex flex-col justify-between space-y-6 shadow-xl"
            >
              <div className="space-y-4">
                <div className="flex gap-1 text-amber-400">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-[#C0C4C8] font-sans leading-relaxed italic">
                  &quot;{t.quote}&quot;
                </p>
              </div>

              <div className="pt-4 border-t border-[#202224] text-xs font-mono">
                <div className="font-bold text-white uppercase">{t.author}</div>
                <div className="text-[11px] text-[#8C9094]">{t.role}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 
        9. SOCIAL / INSTAGRAM GALLERY
      */}
      <section className="py-12 border-t border-[#202224] bg-[#0E0F10]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 mb-6 flex justify-between items-end">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#FF3B30] font-bold block">
              @FUKU.ARCHIVE
            </span>
            <h3 className="font-display text-xl uppercase font-bold text-white">
              Visual Lookbook Feed
            </h3>
          </div>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono uppercase tracking-wider text-[#A0A4A8] hover:text-white flex items-center gap-1.5"
          >
            <Instagram className="w-4 h-4" />
            <span>Follow on Instagram</span>
          </a>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 px-2 sm:px-4">
          {INSTAGRAM_POSTS.map((img, idx) => (
            <div
              key={idx}
              className="group relative aspect-square bg-[#141517] overflow-hidden border border-[#242628]"
            >
              <Image
                src={img}
                alt={`Instagram look ${idx + 1}`}
                fill
                sizes="(max-width: 640px) 50vw, 16vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                <Instagram className="w-6 h-6" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 
        10. VIP NEWSLETTER SUBSCRIPTION
      */}
      <section className="py-16 md:py-24 px-4 sm:px-8 md:px-12 bg-[#121315] border-t border-[#202224] text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#FF3B30] font-bold block">
            Private Access
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-white">
            Join the VIP Collector Registry
          </h2>
          <p className="text-xs sm:text-sm text-[#9CA0A4] font-sans leading-relaxed">
            Subscribers receive 48-hour advance allocation notice for limited Jamdani editions, private salon invitations in Gulshan, and seasonal archive vouchers.
          </p>

          {subscribed ? (
            <div className="p-4 bg-emerald-950/40 border border-emerald-800/40 text-emerald-300 font-mono text-xs uppercase tracking-wider">
              Thank you for subscribing. Your private access code has been dispatched.
            </div>
          ) : (
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto pt-2">
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 bg-[#18191B] border border-[#2D3033] px-4 py-3.5 text-xs text-white placeholder-[#686D71] focus:outline-none focus:border-white transition-colors uppercase tracking-wider"
              />
              <button
                type="submit"
                className="px-8 py-3.5 bg-white text-black hover:bg-[#E5E0D8] font-display font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 transition-all shadow-xl"
              >
                <span>Subscribe</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Modals */}
      <QuickViewModal
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onOpenSizeGuide={() => {
          setQuickViewProduct(null);
          setIsSizeGuideOpen(true);
        }}
      />

      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
      />
    </div>
  );
}
