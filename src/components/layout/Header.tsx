'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { Search, User, Heart, ShoppingBag, X, ArrowRight, Sparkles } from 'lucide-react';
import { useCartStore } from '@/lib/store/cart';
import { useWishlistStore } from '@/lib/store/wishlist';
import { useAuthStore } from '@/lib/store/auth';
import { searchProducts } from '@/lib/queries/products';

type MenuTab = 'women' | 'men' | 'panjabi' | 'unisex' | 'collections';

export const Header: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<MenuTab>('women');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  const isHome = pathname === '/';

  const { getItemCount, openDrawer } = useCartStore();
  const { wishlistIds } = useWishlistStore();
  const { isAuthenticated, user } = useAuthStore();

  const cartCount = mounted ? getItemCount() : 0;
  const wishlistCount = mounted ? wishlistIds.length : 0;

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu & search on ESC key or route changes
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        setSearchOpen(false);
      }
    };

    if (menuOpen || searchOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

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

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchOpen(false);
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const instantResults = searchQuery.trim().length >= 2 ? searchProducts(searchQuery).slice(0, 4) : [];

  const POPULAR_SEARCHES = ['Tactical Kimono', 'Jamdani Saree', 'Heavyweight Tee', 'Khadi Panjabi', 'Linen Blazer', 'Leather Tote'];

  const NAVIGATION_DATA: Record<MenuTab, { categoryTitle: string; items: { name: string; href: string; highlight?: boolean }[] }[]> = {
    women: [
      {
        categoryTitle: 'HIGHLIGHTS',
        items: [
          { name: 'ALL WOMEN', href: '/women', highlight: true },
          { name: 'NEW ARRIVALS', href: '/new-drop', highlight: true },
          { name: 'BEST SELLERS', href: '/best-sellers' },
          { name: 'ARCHIVE SALE', href: '/sale' },
        ],
      },
      {
        categoryTitle: 'GARMENTS',
        items: [
          { name: 'JAMDANI REFRAMED SAREE', href: '/women' },
          { name: 'DRAPED ATELIER DRESSES', href: '/women' },
          { name: 'PALAZZO CARGO TROUSERS', href: '/women' },
          { name: 'RAW LINEN TUNICS', href: '/women' },
        ],
      },
      {
        categoryTitle: 'ACCESSORIES',
        items: [
          { name: 'GEO-JAMDANI STOLES', href: '/accessories' },
          { name: 'ATELIER LEATHER TOTE', href: '/accessories' },
          { name: '925 STERLING SILVER CUFF', href: '/accessories' },
        ],
      },
    ],
    men: [
      {
        categoryTitle: 'HIGHLIGHTS',
        items: [
          { name: 'ALL MEN', href: '/men', highlight: true },
          { name: 'SPRING DROP 2026', href: '/new-drop', highlight: true },
          { name: 'TAILORED RUNWAY', href: '/collections' },
          { name: 'BEST SELLERS', href: '/best-sellers' },
        ],
      },
      {
        categoryTitle: 'TAILORING & SEPARATES',
        items: [
          { name: 'DECONSTRUCTED BLAZERS', href: '/men' },
          { name: 'PLEATED ARCHITECTURAL TROUSERS', href: '/men' },
          { name: 'RAW SELVEDGE DENIM JACKET', href: '/men' },
          { name: 'HEAVYWEIGHT OVERSIZED TEES', href: '/shop' },
        ],
      },
      {
        categoryTitle: 'HERITAGE CEREMONIAL',
        items: [
          { name: 'CHARCOAL KHADI SILK PANJABI', href: '/panjabi' },
          { name: 'MANDARIN FORMAL SHIRTS', href: '/men' },
        ],
      },
    ],
    panjabi: [
      {
        categoryTitle: 'THE PANJABI REINVENTION',
        items: [
          { name: 'VIEW ALL PANJABIS', href: '/panjabi', highlight: true },
          { name: 'CHARCOAL KHADI SILK', href: '/panjabi' },
          { name: 'ORGANIC COTTON WAFFLE', href: '/panjabi' },
          { name: 'MONOCHROME MINIMALIST', href: '/panjabi' },
        ],
      },
      {
        categoryTitle: 'HERITAGE ACCESSORIES',
        items: [
          { name: 'JAMDANI STOLES', href: '/accessories' },
          { name: 'STERLING SILVER BUTTONS', href: '/accessories' },
        ],
      },
    ],
    unisex: [
      {
        categoryTitle: 'GENDERLESS ARCHIVE',
        items: [
          { name: 'ALL UNISEX', href: '/unisex', highlight: true },
          { name: 'TACTICAL CYBER KIMONO', href: '/unisex' },
          { name: 'MONOLITH 280 GSM TEES', href: '/unisex' },
          { name: '450 GSM FRENCH TERRY HOODIE', href: '/unisex' },
          { name: 'MODULAR UTILITY VEST', href: '/unisex' },
          { name: 'WEATHERPROOF PARKAS', href: '/unisex' },
        ],
      },
      {
        categoryTitle: 'LEATHER & HARDWARE',
        items: [
          { name: 'ALL ACCESSORIES', href: '/accessories' },
          { name: 'MINIMALIST LEATHER TOTES', href: '/accessories' },
          { name: 'FORGED SILVER CUFF', href: '/accessories' },
        ],
      },
    ],
    collections: [
      {
        categoryTitle: 'EDITORIAL CAMPAIGNS',
        items: [
          { name: 'DHAKA AFTER DARK', href: '/collections', highlight: true },
          { name: 'JAMDANI REFRAMED', href: '/collections' },
          { name: 'FUTURE BENGAL INDUSTRIAL', href: '/collections' },
          { name: '2026 ARCHIVE SHOWCASE', href: '/collections' },
        ],
      },
      {
        categoryTitle: 'BRAND DOSSIER',
        items: [
          { name: 'ABOUT FUKU ATELIER', href: '/about' },
          { name: 'SUSTAINABILITY & ARTISANS', href: '/about' },
          { name: 'VISIT GULSHAN FLAGSHIP', href: '/contact' },
        ],
      },
    ],
  };

  const headerBgClass = isHome
    ? isScrolled
      ? 'bg-white/95 backdrop-blur-md border-b border-black/10 text-black shadow-sm'
      : 'bg-transparent text-white'
    : 'bg-white/95 backdrop-blur-md border-b border-black/10 text-black shadow-sm';

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-[100] h-[72px] transition-all duration-300 flex items-center justify-between px-4 sm:px-8 md:px-12 ${headerBgClass}`}
      >
        {/* LEFT: Menu Trigger + Main Nav Links */}
        <div className="flex items-center gap-6 lg:gap-8">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center gap-2.5 hover:opacity-70 transition-opacity py-2 focus:outline-none cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            <div className="flex flex-col gap-1.5 w-6">
              <span
                className={`h-[2px] w-6 bg-current transition-all duration-300 ${
                  menuOpen ? 'rotate-45 translate-y-2' : ''
                }`}
              />
              <span
                className={`h-[2px] w-6 bg-current transition-all duration-300 ${
                  menuOpen ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`h-[2px] w-6 bg-current transition-all duration-300 ${
                  menuOpen ? '-rotate-45 -translate-y-2' : ''
                }`}
              />
            </div>
            <span className="hidden sm:inline font-display text-[11px] tracking-[0.2em] font-bold uppercase">
              {menuOpen ? 'Close' : 'Menu'}
            </span>
          </button>

          <nav className="hidden lg:flex items-center gap-6 font-display text-xs tracking-widest uppercase font-semibold">
            <Link href="/shop" className="hover:opacity-60 transition-opacity">
              Shop All
            </Link>
            <Link href="/women" className="hover:opacity-60 transition-opacity">
              Women
            </Link>
            <Link href="/men" className="hover:opacity-60 transition-opacity">
              Men
            </Link>
            <Link href="/panjabi" className="hover:opacity-60 transition-opacity">
              Panjabi
            </Link>
            <Link href="/new-drop" className="hover:opacity-60 transition-opacity flex items-center gap-1 font-bold">
              <Sparkles className="w-3 h-3" />
              <span>New Drop</span>
            </Link>
          </nav>
        </div>

        {/* CENTER: Brand Logo */}
        <div className="absolute left-1/2 -translate-x-1/2">
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className="font-display text-2xl md:text-3xl font-black tracking-[-0.05em] uppercase hover:opacity-70 transition-opacity"
            title="FUKU Official"
          >
            fuku
          </Link>
        </div>

        {/* RIGHT: Actions (Search, Wishlist, Account, Bag) */}
        <div className="flex items-center gap-3 sm:gap-5">
          <button
            onClick={() => setSearchOpen(true)}
            className="p-2 hover:opacity-60 transition-opacity cursor-pointer"
            aria-label="Search collection"
          >
            <Search className="w-5 h-5 stroke-[1.5]" />
          </button>

          <Link
            href="/wishlist"
            className="p-2 hover:opacity-60 transition-opacity relative hidden sm:flex items-center"
            aria-label="Wishlist"
          >
            <Heart className="w-5 h-5 stroke-[1.5]" />
            {wishlistCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-black text-white font-mono text-[9px] font-bold rounded-full flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </Link>

          <Link
            href={isAuthenticated ? '/account' : '/login'}
            className="p-2 hover:opacity-60 transition-opacity hidden sm:block"
            aria-label="User Account"
          >
            <User className="w-5 h-5 stroke-[1.5]" />
          </Link>

          <button
            onClick={openDrawer}
            className="p-2 hover:opacity-60 transition-opacity relative flex items-center gap-1.5 font-mono text-xs font-bold cursor-pointer"
            aria-label="Open Cart Bag"
          >
            <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
            <span className="text-[11px] bg-black text-white px-1.5 py-0.2 rounded-none font-mono">
              {cartCount}
            </span>
          </button>
        </div>
      </header>

      {/* Full-Screen Tabbed Navigation Overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-[250] bg-white text-black flex flex-col justify-between p-6 sm:p-10 md:p-14 overflow-y-auto animate-in fade-in duration-300">
          {/* Top Bar inside Overlay */}
          <div className="flex justify-between items-center border-b border-black/10 pb-6 mb-6">
            <button
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 text-neutral-600 hover:text-black transition-colors group cursor-pointer"
            >
              <X className="w-6 h-6 stroke-[1.5] group-hover:rotate-90 transition-transform duration-300" />
              <span className="font-display text-xs uppercase tracking-widest font-bold">Close</span>
            </button>

            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className="font-display text-2xl md:text-3xl font-black uppercase tracking-tighter"
            >
              fuku
            </Link>

            <div className="flex items-center gap-3">
              <Link
                href="/wishlist"
                onClick={() => setMenuOpen(false)}
                className="text-neutral-600 hover:text-black p-2"
                aria-label="Wishlist"
              >
                <Heart className="w-5 h-5" />
              </Link>
              <Link
                href={isAuthenticated ? '/account' : '/login'}
                onClick={() => setMenuOpen(false)}
                className="text-neutral-600 hover:text-black p-2"
                aria-label="Account"
              >
                <User className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Navigation Category Tabs */}
          <div className="flex justify-center items-center gap-4 sm:gap-8 md:gap-12 border-b border-black/10 pb-4 mb-8 overflow-x-auto">
            {(['women', 'men', 'panjabi', 'unisex', 'collections'] as MenuTab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`font-display text-xs sm:text-sm font-bold uppercase tracking-widest transition-all pb-2 border-b-2 whitespace-nowrap cursor-pointer ${
                  activeTab === tab
                    ? 'text-black border-black'
                    : 'text-neutral-400 border-transparent hover:text-neutral-800'
                }`}
              >
                {tab === 'panjabi' ? 'Panjabi & Ethnic' : tab}
              </button>
            ))}
          </div>

          {/* Active Tab Subcategories Content Grid */}
          <div className="flex-1 max-w-6xl w-full mx-auto my-auto py-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
              {NAVIGATION_DATA[activeTab].map((col) => (
                <div key={col.categoryTitle} className="flex flex-col gap-4">
                  <h3 className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-black border-b border-black/10 pb-2">
                    {col.categoryTitle}
                  </h3>
                  <ul className="flex flex-col gap-3">
                    {col.items.map((item) => (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          onClick={() => setMenuOpen(false)}
                          className={`font-display text-xs sm:text-sm uppercase tracking-wider block transition-all hover:translate-x-1.5 ${
                            item.highlight
                              ? 'text-black font-bold underline decoration-black underline-offset-4'
                              : 'text-neutral-600 hover:text-black'
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

          {/* Bottom Footer Info inside Mega Menu */}
          <div className="border-t border-black/10 pt-6 mt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-neutral-600 text-xs font-mono uppercase tracking-wider">
            <div className="flex flex-wrap items-center justify-center gap-6">
              <Link href="/shop" onClick={() => setMenuOpen(false)} className="hover:text-black transition-colors font-bold text-black">
                Shop Archive
              </Link>
              <Link href="/about" onClick={() => setMenuOpen(false)} className="hover:text-black transition-colors">
                Atelier Story
              </Link>
              <Link href="/faq" onClick={() => setMenuOpen(false)} className="hover:text-black transition-colors">
                FAQ &amp; Sizing
              </Link>
              <Link href="/contact" onClick={() => setMenuOpen(false)} className="hover:text-black transition-colors">
                Flagship Stores
              </Link>
            </div>
            <p className="text-neutral-500">DHAKA ATELIER © 2026 FUKU</p>
          </div>
        </div>
      )}

      {/* Interactive Live Search Modal Drawer */}
      {searchOpen && (
        <div className="fixed inset-0 z-[350] bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-white border-b border-black/10 shadow-2xl py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 text-black">
              {/* Search Input Bar */}
              <form onSubmit={handleSearchSubmit} className="relative border-b-2 border-black pb-3 flex items-center gap-4">
                <Search className="w-6 h-6 text-black/80 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search kimonos, tees, jamdani, trousers, accessories..."
                  className="w-full font-display text-lg sm:text-2xl text-black placeholder-neutral-400 bg-transparent border-none focus:outline-none uppercase font-bold tracking-wider"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  className="text-neutral-500 hover:text-black p-1 cursor-pointer"
                >
                  <X className="w-6 h-6" />
                </button>
              </form>

              {/* Instant Search Suggestions / Results */}
              <div className="mt-8 space-y-6">
                {instantResults.length > 0 ? (
                  <div>
                    <div className="text-xs font-mono text-neutral-500 uppercase tracking-widest mb-4">
                      Matching Archive Garments ({instantResults.length})
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {instantResults.map((product) => (
                        <Link
                          key={product.id}
                          href={`/product/${product.id}`}
                          onClick={() => setSearchOpen(false)}
                          className="flex items-center gap-4 p-3 bg-neutral-50 border border-neutral-200 hover:border-black transition-colors group"
                        >
                          <div className="w-14 h-16 bg-neutral-200 relative overflow-hidden shrink-0">
                            <img src={product.images[0]} alt="" className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-display text-xs uppercase tracking-wider text-black font-bold group-hover:underline transition-colors truncate">
                              {product.nameEn}
                            </h4>
                            <div className="text-[10px] text-neutral-500 font-mono mt-0.5">
                              {product.category} • ৳{product.priceBDT.toLocaleString()}
                            </div>
                          </div>
                          <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-black group-hover:translate-x-1 transition-all shrink-0" />
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : searchQuery.trim().length >= 2 ? (
                  <div className="text-center py-6 text-neutral-500 font-mono text-xs">
                    No exact matches for &quot;{searchQuery}&quot;. Press enter to view all search results.
                  </div>
                ) : null}

                {/* Popular Search Keywords */}
                <div>
                  <div className="text-xs font-mono text-neutral-500 uppercase tracking-widest mb-3">
                    Popular Search Inquiries
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {POPULAR_SEARCHES.map((term) => (
                      <button
                        key={term}
                        onClick={() => {
                          setSearchQuery(term);
                          router.push(`/search?q=${encodeURIComponent(term)}`);
                          setSearchOpen(false);
                        }}
                        className="px-3.5 py-1.5 bg-neutral-100 border border-neutral-200 hover:border-black text-xs font-mono text-neutral-800 hover:text-black uppercase transition-colors cursor-pointer"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
