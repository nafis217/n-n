'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, User, Heart, ShoppingBag, X } from 'lucide-react';
import { useCartStore } from '@/lib/store/cart';

type MenuTab = 'women' | 'men' | 'panjabi' | 'collections';

export const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<MenuTab>('women');
  const [isScrolledDark, setIsScrolledDark] = useState(false);
  const { getItemCount } = useCartStore();
  const cartCount = getItemCount();

  // Close menu on ESC key press & handle body scroll lock
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        setSearchOpen(false);
      }
    };

    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [menuOpen]);

  const ZARA_MENU_DATA: Record<MenuTab, { categoryTitle: string; items: { name: string; href: string; highlight?: boolean }[] }[]> = {
    women: [
      {
        categoryTitle: 'COLLECTION 2026',
        items: [
          { name: 'NEW DROP', href: '/new-drop', highlight: true },
          { name: 'EDITORIAL SERIES', href: '/' },
          { name: 'LINEAR SILHOUETTES', href: '/collections' },
        ],
      },
      {
        categoryTitle: 'CLOTHING',
        items: [
          { name: 'ALL WOMEN', href: '/women' },
          { name: 'LINEN TUNICS', href: '/women' },
          { name: 'ARCHITECTURAL BLAZERS', href: '/women' },
          { name: 'WIDE-LEG TROUSERS', href: '/women' },
          { name: 'COORDINATES', href: '/women' },
        ],
      },
      {
        categoryTitle: 'ACCESSORIES',
        items: [
          { name: 'COMPONENT PENDANTS', href: '/accessories' },
          { name: 'HANDBAGS & TOTES', href: '/accessories' },
          { name: 'LEATHER BELTS', href: '/accessories' },
        ],
      },
    ],
    men: [
      {
        categoryTitle: 'NEW ARRIVALS',
        items: [
          { name: 'SPRING DROP 2026', href: '/new-drop', highlight: true },
          { name: 'TAILORED RUNWAY', href: '/collections' },
        ],
      },
      {
        categoryTitle: 'SUITING & SHIRTS',
        items: [
          { name: 'ALL MEN', href: '/men' },
          { name: 'MINIMALIST SHIRTS', href: '/men' },
          { name: 'TAILORED JACKETS', href: '/men' },
          { name: 'CASUAL TROUSERS', href: '/men' },
        ],
      },
      {
        categoryTitle: 'HERITAGE',
        items: [
          { name: 'MODERN PANJABI', href: '/panjabi' },
          { name: 'WOVEN KURTA', href: '/panjabi' },
        ],
      },
    ],
    panjabi: [
      {
        categoryTitle: 'PANJABI COLLECTION',
        items: [
          { name: 'THE PANJABI REINVENTION', href: '/panjabi', highlight: true },
          { name: 'COTTON WAFFLE PANJABI', href: '/panjabi' },
          { name: 'EMBROIDERED HERITAGE', href: '/panjabi' },
          { name: 'SILK PANJABI', href: '/panjabi' },
        ],
      },
      {
        categoryTitle: 'JAMDANI & STOLES',
        items: [
          { name: 'JAMDANI REFRAMED', href: '/collections' },
          { name: 'GEO-JAMDANI STOLES', href: '/collections' },
          { name: 'ARTISANAL DUPATTA', href: '/collections' },
        ],
      },
    ],
    collections: [
      {
        categoryTitle: 'EDITORIAL DROPS',
        items: [
          { name: 'DHAKA AFTER DARK', href: '/', highlight: true },
          { name: 'LINEAR SILHOUETTES', href: '/collections' },
          { name: 'FUTURE BENGAL INDUSTRIAL', href: '/collections' },
        ],
      },
      {
        categoryTitle: 'LOOKBOOK',
        items: [
          { name: 'VIEW ALL LOOKBOOKS', href: '/collections' },
          { name: 'CAMPAIGN ARCHIVE', href: '/collections' },
        ],
      },
    ],
  };

  return (
    <>
      {/* 
        Zara-Style Floating Transparent Header Bar
        - 100% Background Transparent (no white box, no border)
        - Left: MENU (3 Lines) + N & N Logo (Home link to navigate back anytime!)
        - Right: SEARCH + BAG
        - mix-blend-difference for crisp white/black high-contrast visibility on all pages!
      */}
      <nav className="fixed top-0 left-0 w-full z-[100] h-[72px] bg-transparent border-none shadow-none flex justify-between items-center px-margin-mobile md:px-margin-desktop pointer-events-none transition-all duration-300">
        {/* LEFT: Zara 3 Lines Menu Trigger + N & N Brand Home Link */}
        <div className="flex items-center gap-6 md:gap-10 pointer-events-auto mix-blend-difference">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center gap-3 text-white focus:outline-none group/menu cursor-pointer py-2"
            aria-label="Toggle Navigation Menu"
          >
            {/* 3 Horizontal Line Icon */}
            <div className="flex flex-col gap-1.5 w-7 transition-all duration-300">
              <span className={`h-[2.5px] w-7 bg-white transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`h-[2.5px] w-7 bg-white transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`h-[2.5px] w-7 bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
            <span className="hidden sm:inline font-label-caps text-xs tracking-widest font-extrabold text-white uppercase group-hover/menu:underline">
              {menuOpen ? 'CLOSE' : 'MENU'}
            </span>
          </button>

          {/* Clickable Brand Logo (Navigates back to Home / at any time) */}
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className="font-display-lg text-[22px] md:text-[28px] tracking-tighter text-white uppercase font-black hover:opacity-80 transition-opacity"
            title="Go to Homepage"
          >
            N &amp; N
          </Link>
        </div>

        {/* RIGHT: Essential Utilities (Search, Account, Bag) */}
        <div className="flex items-center gap-4 md:gap-6 pointer-events-auto mix-blend-difference">
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="text-white cursor-pointer hover:opacity-70 transition-opacity p-1"
            aria-label="Search"
          >
            <Search className="w-5 h-5 stroke-[1.5]" />
          </button>

          <Link
            href="/account"
            className="text-white hover:opacity-70 transition-opacity hidden sm:block p-1"
            aria-label="Account"
          >
            <User className="w-5 h-5 stroke-[1.5]" />
          </Link>

          <Link
            href="/bag"
            className="text-white hover:opacity-70 transition-opacity relative flex items-center p-1 font-label-caps text-xs font-bold tracking-wider"
            aria-label="Shopping Bag"
          >
            <ShoppingBag className="w-5 h-5 stroke-[1.5] mr-1" />
            <span>({cartCount})</span>
          </Link>
        </div>
      </nav>

      {/* Zara-Style Full-Screen Tabbed Mega Menu Overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-[250] bg-neutral-950/98 backdrop-blur-3xl text-white flex flex-col justify-between p-6 md:p-12 overflow-y-auto animate-in fade-in duration-300">
          {/* Top Bar inside Overlay */}
          <div className="flex justify-between items-center border-b border-neutral-800 pb-6 mb-6">
            {/* Close / Go Back Button */}
            <button
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors group cursor-pointer"
            >
              <X className="w-6 h-6 stroke-[1.5] group-hover:rotate-90 transition-transform duration-300" />
              <span className="font-label-caps text-xs uppercase tracking-widest font-bold">CLOSE</span>
            </button>

            {/* Brand Logo Home Link */}
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className="font-display-lg text-2xl font-black uppercase text-white tracking-widest hover:opacity-80 transition-opacity"
            >
              N &amp; N
            </Link>

            {/* Header Utility Links */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => {
                  setMenuOpen(false);
                  setSearchOpen(true);
                }}
                className="text-neutral-400 hover:text-white transition-colors p-1"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>

              <Link
                href="/account"
                onClick={() => setMenuOpen(false)}
                className="text-neutral-400 hover:text-white transition-colors p-1 hidden sm:block"
                aria-label="Account"
              >
                <User className="w-5 h-5" />
              </Link>

              <Link
                href="/bag"
                onClick={() => setMenuOpen(false)}
                className="font-label-caps text-xs uppercase tracking-widest text-neutral-400 hover:text-white font-bold flex items-center gap-1.5"
              >
                <ShoppingBag className="w-4 h-4" /> ({cartCount})
              </Link>
            </div>
          </div>

          {/* Zara Main Navigation Category Tabs (WOMEN | MEN | PANJABI | COLLECTIONS) */}
          <div className="flex justify-center items-center gap-6 md:gap-12 border-b border-neutral-800 pb-4 mb-8">
            {(['women', 'men', 'panjabi', 'collections'] as MenuTab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`font-label-caps text-sm md:text-base font-extrabold uppercase tracking-widest transition-all pb-2 border-b-2 ${
                  activeTab === tab
                    ? 'text-white border-vermilion'
                    : 'text-neutral-500 border-transparent hover:text-neutral-300'
                }`}
              >
                {tab === 'panjabi' ? 'PANJABI & ETHNIC' : tab}
              </button>
            ))}
          </div>

          {/* Active Tab Subcategories Content Grid */}
          <div className="flex-1 max-w-6xl w-full mx-auto my-auto py-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
              {ZARA_MENU_DATA[activeTab].map((col) => (
                <div key={col.categoryTitle} className="flex flex-col gap-4">
                  <h3 className="font-label-caps text-xs font-black uppercase tracking-widest text-vermilion border-b border-neutral-800 pb-2">
                    {col.categoryTitle}
                  </h3>
                  <ul className="flex flex-col gap-3">
                    {col.items.map((item) => (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          onClick={() => setMenuOpen(false)}
                          className={`font-label-caps text-xs md:text-sm uppercase tracking-wider block transition-all hover:translate-x-1 ${
                            item.highlight
                              ? 'text-white font-extrabold underline decoration-vermilion underline-offset-4'
                              : 'text-neutral-300 hover:text-white font-medium'
                          }`}
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Footer Info inside Overlay */}
          <div className="border-t border-neutral-800 pt-6 mt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-neutral-400 text-xs font-label-caps uppercase tracking-wider">
            <div className="flex items-center gap-6">
              <Link href="/" onClick={() => setMenuOpen(false)} className="hover:text-white transition-colors font-bold text-white">
                HOME
              </Link>
              <Link href="/account" onClick={() => setMenuOpen(false)} className="hover:text-white transition-colors">
                MY ACCOUNT
              </Link>
              <Link href="/track-order" onClick={() => setMenuOpen(false)} className="hover:text-white transition-colors">
                TRACK ORDER
              </Link>
              <Link href="/contact" onClick={() => setMenuOpen(false)} className="hover:text-white transition-colors">
                HELP &amp; CONTACT
              </Link>
            </div>
            <p className="text-neutral-500 font-medium">DHAKA, BANGLADESH © 2026 N &amp; N</p>
          </div>
        </div>
      )}

      {/* Quick Search Drawer Bar */}
      {searchOpen && (
        <div className="fixed top-0 left-0 w-full bg-neutral-900/98 backdrop-blur-xl text-white z-[350] border-b border-neutral-800 p-6 px-margin-desktop flex items-center gap-4 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-300">
          <Search className="w-5 h-5 text-neutral-400" />
          <input
            type="text"
            placeholder="SEARCH PANJABI, JAMDANI, LINEN TUNIC, ACCESSORIES..."
            className="w-full font-label-caps text-body-md text-white placeholder:text-neutral-500 bg-transparent border-none focus:outline-none uppercase font-semibold"
            autoFocus
          />
          <button
            onClick={() => setSearchOpen(false)}
            className="text-neutral-400 font-label-caps text-xs uppercase hover:text-white font-bold cursor-pointer"
          >
            Close
          </button>
        </div>
      )}
    </>
  );
};
