'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { Search, User, Heart, ShoppingBag, X, ArrowRight, ChevronDown } from 'lucide-react';
import { useCartStore } from '@/lib/store/cart';
import { useWishlistStore } from '@/lib/store/wishlist';
import { useAuthStore } from '@/lib/store/auth';
import { searchProducts } from '@/lib/queries/products';

type MenuTab = 'women' | 'men' | 'panjabi' | 'unisex' | 'collections';

const MEGA_MENU_IMAGE: Record<MenuTab, string> = {
  women:       '/images/products/espoir_La-Boheme-L-768x765.jpg',
  men:         '/images/products/architectural-black-suit-1.jpg',
  panjabi:     '/images/products/item_maroon.jpg',
  unisex:      '/images/products/raw-selvedge-trucker-jacket.jpg',
  collections: '/images/products/architectural-black-suit-full.jpg',
};

const NAVIGATION_DATA: Record<MenuTab, { categoryTitle: string; items: { name: string; href: string }[] }[]> = {
  women: [
    {
      categoryTitle: 'New In',
      items: [
        { name: 'New Arrivals', href: '/new-drop' },
        { name: 'Best Sellers', href: '/best-sellers' },
        { name: 'Sale', href: '/sale' },
      ],
    },
    {
      categoryTitle: 'Clothing',
      items: [
        { name: 'All Women', href: '/women' },
        { name: 'Jamdani Sarees', href: '/women' },
        { name: 'Dresses', href: '/women' },
        { name: 'Trousers', href: '/women' },
        { name: 'Tunics', href: '/women' },
      ],
    },
    {
      categoryTitle: 'Accessories',
      items: [
        { name: 'Stoles', href: '/accessories' },
        { name: 'Bags', href: '/accessories' },
        { name: 'Jewellery', href: '/accessories' },
      ],
    },
  ],
  men: [
    {
      categoryTitle: 'New In',
      items: [
        { name: 'New Arrivals', href: '/new-drop' },
        { name: 'Best Sellers', href: '/best-sellers' },
        { name: 'Sale', href: '/sale' },
      ],
    },
    {
      categoryTitle: 'Clothing',
      items: [
        { name: 'All Men', href: '/men' },
        { name: 'Blazers', href: '/men' },
        { name: 'Trousers', href: '/men' },
        { name: 'T-Shirts', href: '/men' },
        { name: 'Denim', href: '/men' },
      ],
    },
    {
      categoryTitle: 'Heritage',
      items: [
        { name: 'Panjabi', href: '/panjabi' },
        { name: 'Formal Shirts', href: '/men' },
      ],
    },
  ],
  panjabi: [
    {
      categoryTitle: 'All Panjabi',
      items: [
        { name: 'View All', href: '/panjabi' },
        { name: 'Khadi Silk', href: '/panjabi' },
        { name: 'Organic Cotton', href: '/panjabi' },
        { name: 'Minimalist', href: '/panjabi' },
      ],
    },
    {
      categoryTitle: 'Accessories',
      items: [
        { name: 'Jamdani Stoles', href: '/accessories' },
        { name: 'Sterling Buttons', href: '/accessories' },
      ],
    },
  ],
  unisex: [
    {
      categoryTitle: 'Genderless',
      items: [
        { name: 'All Unisex', href: '/unisex' },
        { name: 'Kimonos', href: '/unisex' },
        { name: 'Heavy Tees', href: '/unisex' },
        { name: 'Hoodies', href: '/unisex' },
        { name: 'Utility Vests', href: '/unisex' },
      ],
    },
    {
      categoryTitle: 'Leather',
      items: [
        { name: 'All Accessories', href: '/accessories' },
        { name: 'Tote Bags', href: '/accessories' },
      ],
    },
  ],
  collections: [
    {
      categoryTitle: 'Editorial',
      items: [
        { name: 'Dhaka After Dark', href: '/collections' },
        { name: 'Jamdani Reframed', href: '/collections' },
        { name: 'Future Bengal', href: '/collections' },
      ],
    },
    {
      categoryTitle: 'Brand',
      items: [
        { name: 'Our Story', href: '/about' },
        { name: 'Sustainability', href: '/about' },
        { name: 'Visit Flagship', href: '/contact' },
      ],
    },
  ],
};

const POPULAR_SEARCHES = ['Tactical Kimono', 'Jamdani Saree', 'Heavyweight Tee', 'Khadi Panjabi', 'Linen Blazer'];

export const Header: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<MenuTab>('women');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const isHome = pathname === '/';

  const { getItemCount, openDrawer } = useCartStore();
  const { wishlistIds } = useWishlistStore();
  const { isAuthenticated } = useAuthStore();

  const cartCount = mounted ? getItemCount() : 0;
  const wishlistCount = mounted ? wishlistIds.length : 0;

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        setSearchOpen(false);
      }
    };
    document.body.style.overflow = (menuOpen || searchOpen) ? 'hidden' : '';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [menuOpen, searchOpen]);

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 50);
    }
  }, [searchOpen]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchOpen(false);
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const instantResults = searchQuery.trim().length >= 2
    ? searchProducts(searchQuery).slice(0, 5)
    : [];

  // Header color logic
  const isTransparent = isHome && !isScrolled && !menuOpen;

  const headerClass = isTransparent
    ? 'bg-transparent text-white'
    : 'bg-white/98 text-black border-b border-[#E8E8E5]';

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-[100] h-16 flex items-center justify-between px-6 md:px-12 transition-all duration-200 backdrop-blur-sm ${headerClass}`}
      >
        {/* LEFT: Hamburger + Desktop Nav */}
        <div className="flex items-center gap-8">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex flex-col gap-[5px] w-5 cursor-pointer group"
            aria-label="Toggle menu"
          >
            <span className={`h-px w-5 transition-all duration-200 ${isTransparent ? 'bg-white' : 'bg-black'} ${menuOpen ? 'rotate-45 translate-y-[6px]' : ''}`} />
            <span className={`h-px w-5 transition-all duration-200 ${isTransparent ? 'bg-white' : 'bg-black'} ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`h-px w-5 transition-all duration-200 ${isTransparent ? 'bg-white' : 'bg-black'} ${menuOpen ? '-rotate-45 -translate-y-[6px]' : ''}`} />
          </button>

          <nav className="hidden lg:flex items-center gap-7" aria-label="Primary navigation">
            {(['women', 'men', 'panjabi', 'unisex'] as MenuTab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => { setActiveTab(tab); setMenuOpen(true); }}
                className={`text-nav uppercase tracking-[0.08em] hover:opacity-60 transition-opacity duration-150 flex items-center gap-0.5 cursor-pointer capitalize ${isTransparent ? 'text-white' : 'text-black'}`}
              >
                {tab === 'panjabi' ? 'Panjabi' : tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
            <Link
              href="/new-drop"
              className={`text-nav uppercase tracking-[0.08em] hover:opacity-60 transition-opacity duration-150 ${isTransparent ? 'text-white' : 'text-black'}`}
            >
              New In
            </Link>
          </nav>
        </div>

        {/* CENTER: Logo */}
        <div className="absolute left-1/2 -translate-x-1/2">
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className={`font-display text-[22px] font-medium tracking-[0.1em] uppercase hover:opacity-70 transition-opacity duration-150 ${isTransparent ? 'text-white' : 'text-black'}`}
          >
            FUKU
          </Link>
        </div>

        {/* RIGHT: Actions */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => setSearchOpen(true)}
            className={`p-2.5 hover:opacity-60 transition-opacity duration-150 cursor-pointer ${isTransparent ? 'text-white' : 'text-black'}`}
            aria-label="Search"
          >
            <Search className="w-[18px] h-[18px] stroke-[1.25]" />
          </button>

          <Link
            href="/wishlist"
            className={`p-2.5 hover:opacity-60 transition-opacity duration-150 relative hidden sm:flex items-center ${isTransparent ? 'text-white' : 'text-black'}`}
            aria-label="Wishlist"
          >
            <Heart className="w-[18px] h-[18px] stroke-[1.25]" />
            {wishlistCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-[14px] h-[14px] bg-black text-white font-mono text-[8px] font-bold flex items-center justify-center leading-none">
                {wishlistCount > 9 ? '9+' : wishlistCount}
              </span>
            )}
          </Link>

          <Link
            href={isAuthenticated ? '/account' : '/login'}
            className={`p-2.5 hover:opacity-60 transition-opacity duration-150 hidden sm:block ${isTransparent ? 'text-white' : 'text-black'}`}
            aria-label="Account"
          >
            <User className="w-[18px] h-[18px] stroke-[1.25]" />
          </Link>

          <button
            onClick={openDrawer}
            className={`p-2.5 hover:opacity-60 transition-opacity duration-150 relative flex items-center cursor-pointer ${isTransparent ? 'text-white' : 'text-black'}`}
            aria-label="Shopping bag"
          >
            <ShoppingBag className="w-[18px] h-[18px] stroke-[1.25]" />
            {cartCount > 0 && (
              <span className="absolute top-1.5 right-0.5 w-[14px] h-[14px] bg-black text-white font-mono text-[8px] font-bold flex items-center justify-center leading-none">
                {cartCount > 9 ? '9+' : cartCount}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* ─── MEGA MENU OVERLAY ─── */}
      <div
        className={`fixed inset-0 z-[200] bg-white text-black flex flex-col transition-all duration-250 ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
      >
        {/* Mega menu header bar */}
        <div className="flex items-center justify-between h-16 px-6 md:px-12 border-b border-[#E8E8E5] shrink-0">
          <button
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-2.5 text-[#6B6B6B] hover:text-black transition-colors duration-150 cursor-pointer"
            aria-label="Close menu"
          >
            <X className="w-4 h-4 stroke-[1.25]" />
            <span className="text-label uppercase tracking-[0.12em]">Close</span>
          </button>

          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className="font-display text-[22px] font-medium tracking-[0.1em] uppercase text-black hover:opacity-70 transition-opacity"
          >
            FUKU
          </Link>

          <div className="flex items-center gap-1">
            <Link href="/search" onClick={() => setMenuOpen(false)} className="p-2.5 text-black hover:opacity-60 transition-opacity">
              <Search className="w-[18px] h-[18px] stroke-[1.25]" />
            </Link>
            <Link href={isAuthenticated ? '/account' : '/login'} onClick={() => setMenuOpen(false)} className="p-2.5 text-black hover:opacity-60 transition-opacity hidden sm:block">
              <User className="w-[18px] h-[18px] stroke-[1.25]" />
            </Link>
          </div>
        </div>

        {/* Mega menu tabs */}
        <div className="flex items-center gap-8 px-6 md:px-12 border-b border-[#E8E8E5] overflow-x-auto hide-scrollbar shrink-0">
          {(['women', 'men', 'panjabi', 'unisex', 'collections'] as MenuTab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative py-4 text-label uppercase tracking-[0.12em] whitespace-nowrap cursor-pointer transition-colors duration-150 ${
                activeTab === tab
                  ? 'text-black after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:bg-black'
                  : 'text-[#9B9B9B] hover:text-[#6B6B6B]'
              }`}
            >
              {tab === 'panjabi' ? 'Panjabi & Ethnic' : tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Mega menu content */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Nav columns */}
            <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-8">
              {NAVIGATION_DATA[activeTab].map((col) => (
                <div key={col.categoryTitle}>
                  <h3 className="text-editorial-label mb-4">{col.categoryTitle}</h3>
                  <ul className="flex flex-col gap-2.5">
                    {col.items.map((item) => (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          onClick={() => setMenuOpen(false)}
                          className="text-body-lg text-black hover:text-[#6B6B6B] transition-colors duration-150 block"
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Editorial image */}
            <div className="hidden lg:block lg:col-span-5">
              <div className="relative aspect-[3/4] bg-[#F3F3F1] overflow-hidden">
                <Image
                  src={MEGA_MENU_IMAGE[activeTab]}
                  alt={activeTab}
                  fill
                  className="object-cover transition-opacity duration-300"
                />
                <div className="absolute bottom-0 left-0 p-6">
                  <span className="text-editorial-label text-white/80 block mb-1">
                    {activeTab === 'collections' ? 'Editorial' : 'Collection'}
                  </span>
                  <Link
                    href={activeTab === 'collections' ? '/collections' : `/${activeTab}`}
                    onClick={() => setMenuOpen(false)}
                    className="text-white font-display text-sm uppercase tracking-wider flex items-center gap-1.5 hover:gap-3 transition-all duration-200"
                  >
                    Shop {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mega menu footer */}
        <div className="border-t border-[#E8E8E5] px-6 md:px-12 py-4 flex flex-wrap items-center gap-6 shrink-0">
          {[
            { label: 'Shop All', href: '/shop' },
            { label: 'New Arrivals', href: '/new-drop' },
            { label: 'Sale', href: '/sale' },
            { label: 'About', href: '/about' },
            { label: 'Contact', href: '/contact' },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-label uppercase tracking-[0.08em] text-[#6B6B6B] hover:text-black transition-colors duration-150"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      {/* ─── SEARCH OVERLAY ─── */}
      <div
        className={`fixed inset-0 z-[300] bg-white flex flex-col transition-all duration-200 ${
          searchOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Search header */}
        <div className="h-16 flex items-center justify-between px-6 md:px-12 border-b border-[#E8E8E5] shrink-0">
          <Link href="/" onClick={() => setSearchOpen(false)} className="font-display text-[22px] font-medium tracking-[0.1em] uppercase text-black">
            FUKU
          </Link>
          <button
            onClick={() => { setSearchOpen(false); setSearchQuery(''); }}
            className="flex items-center gap-2.5 text-[#6B6B6B] hover:text-black transition-colors duration-150 cursor-pointer"
          >
            <span className="text-label uppercase tracking-[0.12em]">Close</span>
            <X className="w-4 h-4 stroke-[1.25]" />
          </button>
        </div>

        {/* Search input */}
        <div className="px-6 md:px-12 pt-10 pb-6 border-b border-[#E8E8E5]">
          <form onSubmit={handleSearchSubmit} className="flex items-center gap-4">
            <Search className="w-5 h-5 text-[#9B9B9B] shrink-0 stroke-[1.25]" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search garments, collections..."
              className="w-full bg-transparent text-[clamp(22px,4vw,36px)] text-black placeholder-[#D9D9D6] focus:outline-none font-display font-light"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="text-[#9B9B9B] hover:text-black transition-colors"
              >
                <X className="w-4 h-4 stroke-[1.25]" />
              </button>
            )}
          </form>
        </div>

        {/* Search results */}
        <div className="flex-1 overflow-y-auto px-6 md:px-12 py-8">
          {instantResults.length > 0 ? (
            <div>
              <p className="text-editorial-label mb-6">{instantResults.length} results</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {instantResults.map((product) => (
                  <Link
                    key={product.id}
                    href={`/product/${product.id}`}
                    onClick={() => { setSearchOpen(false); setSearchQuery(''); }}
                    className="group flex items-center gap-4 hover:opacity-70 transition-opacity duration-150"
                  >
                    <div className="w-16 h-20 bg-[#F3F3F1] relative overflow-hidden shrink-0">
                      <img src={product.images[0]} alt="" className="w-full h-full object-cover" loading="lazy" />
                    </div>
                    <div>
                      <p className="text-label uppercase tracking-[0.08em] text-black mb-1 group-hover:underline">
                        {product.nameEn}
                      </p>
                      <p className="text-label text-[#6B6B6B]">৳{product.priceBDT.toLocaleString()}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ) : searchQuery.length >= 2 ? (
            <p className="text-body text-[#6B6B6B]">No results for &ldquo;{searchQuery}&rdquo;</p>
          ) : (
            <div>
              <p className="text-editorial-label mb-5">Popular searches</p>
              <div className="flex flex-wrap gap-3">
                {POPULAR_SEARCHES.map((term) => (
                  <button
                    key={term}
                    onClick={() => {
                      setSearchQuery(term);
                      router.push(`/search?q=${encodeURIComponent(term)}`);
                      setSearchOpen(false);
                      setSearchQuery('');
                    }}
                    className="px-4 py-2 border border-[#D9D9D6] text-body text-black hover:border-black transition-colors duration-150 cursor-pointer"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
