'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Search, User, ShoppingBag, X, ArrowRight, Menu } from 'lucide-react';
import { useCartStore } from '@/lib/store/cart';
import { useAuthStore } from '@/lib/store/auth';
import { StitchHouseLogo } from '../brand/StitchHouseLogo';
import { SHMonogram } from '../brand/SHMonogram';
import { searchProducts, ProductItem } from '@/lib/queries/products';

interface NavItem {
  label: string;
  href: string;
  badge?: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'NEW ARRIVALS', href: '/collections/new-arrivals' },
  { label: 'CLOTHING', href: '/collections/clothing' },
  { label: 'SHIRTS', href: '/collections/shirts' },
  { label: 'TROUSERS', href: '/collections/trousers' },
  { label: 'OUTERWEAR', href: '/collections/outerwear' },
  { label: 'ACCESSORIES', href: '/collections/accessories' },
  { label: 'ATELIER', href: '/atelier' },
  { label: 'JOURNAL', href: '/journal' },
];

export const Header: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<ProductItem[]>([]);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const { items, openCart } = useCartStore();
  const { user } = useAuthStore();
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close overlays on navigation
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
  }, [pathname]);

  // Focus search input when open
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 50);
    }
  }, [isSearchOpen]);

  // Handle live search
  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      const res = searchProducts(searchQuery.trim());
      setSearchResults(res.slice(0, 6));
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchOpen(false);
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#F2EDE4]/95 backdrop-blur-md h-[58px] border-b border-[#B8B0A3]/30 shadow-[0_1px_3px_rgba(36,30,26,0.03)]'
            : 'bg-[#F2EDE4] h-[64px] border-b border-[#B8B0A3]/25'
        }`}
      >
        <div className="max-w-[1600px] mx-auto h-full px-4 sm:px-8 flex items-center justify-between">
          {/* LEFT: Logo & Wordmark */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-1.5 -ml-1.5 text-[#241E1A] hover:opacity-75 transition-opacity"
              aria-label="Open Navigation Menu"
            >
              <Menu size={20} strokeWidth={1.5} />
            </button>
            <StitchHouseLogo variant="dark" size="sm" showMotto={false} />
          </div>

          {/* CENTER: Editorial Navigation (Desktop) */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Main Navigation">
            {NAV_ITEMS.slice(0, 6).map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`text-[11px] uppercase tracking-[0.18em] font-medium transition-colors duration-200 relative py-2 ${
                    isActive ? 'text-[#241E1A]' : 'text-[#686B5E] hover:text-[#241E1A]'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#241E1A]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* RIGHT: Utilities (Search, Account, Bag) */}
          <div className="flex items-center gap-4 sm:gap-6">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-1.5 text-[#241E1A] hover:text-[#686B5E] transition-colors p-1"
              aria-label="Search Collection"
            >
              <Search size={16} strokeWidth={1.5} />
              <span className="hidden md:inline text-[11px] uppercase tracking-[0.16em] font-medium">
                Search
              </span>
            </button>

            <Link
              href={user ? '/account' : '/login'}
              className="flex items-center gap-1.5 text-[#241E1A] hover:text-[#686B5E] transition-colors p-1"
              aria-label="User Account"
            >
              <User size={16} strokeWidth={1.5} />
              <span className="hidden md:inline text-[11px] uppercase tracking-[0.16em] font-medium">
                {user ? 'Account' : 'Sign In'}
              </span>
            </Link>

            <button
              onClick={openCart}
              className="flex items-center gap-2 bg-[#241E1A] text-[#F2EDE4] px-3.5 py-1.5 hover:bg-[#686B5E] transition-colors duration-200"
              aria-label={`Shopping Bag, ${itemCount} items`}
            >
              <ShoppingBag size={14} strokeWidth={1.5} />
              <span className="text-[11px] uppercase tracking-[0.18em] font-medium">
                Bag ({itemCount})
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* ─────────────────────────────────────────────
          EDITORIAL SEARCH OVERLAY
      ───────────────────────────────────────────── */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-[#241E1A]/60 backdrop-blur-sm flex flex-col justify-start items-center p-4 sm:p-8 animate-fadeIn">
          <div className="w-full max-w-3xl bg-[#F2EDE4] border border-[#B8B0A3]/50 p-6 sm:p-10 shadow-2xl mt-12 relative">
            <button
              onClick={() => setIsSearchOpen(false)}
              className="absolute top-6 right-6 text-[#241E1A] hover:text-[#686B5E] transition-colors p-2"
              aria-label="Close search"
            >
              <X size={20} strokeWidth={1.5} />
            </button>

            <div className="mb-6">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#686B5E] font-medium block mb-2">
                Search Stitch House
              </span>
              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search double-breasted suits, linen shirts, trousers..."
                  className="w-full bg-transparent border-b border-[#241E1A] pb-3 pt-1 text-lg sm:text-2xl font-serif text-[#241E1A] placeholder:text-[#B8B0A3] focus:outline-none"
                />
                <button
                  type="submit"
                  className="absolute right-0 bottom-3 text-[#241E1A] hover:text-[#686B5E]"
                >
                  <ArrowRight size={20} strokeWidth={1.5} />
                </button>
              </form>
            </div>

            {/* Quick Category Shortcuts */}
            {searchQuery.trim().length === 0 && (
              <div className="pt-4 border-t border-[#B8B0A3]/25">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#686B5E] block mb-3 font-medium">
                  Curated Categories
                </span>
                <div className="flex flex-wrap gap-2">
                  {['Tailored Suits', 'Pleated Trousers', 'Linen Overshirts', 'Selvedge Jackets', 'Cashmere Knitwear', 'Leather Goods'].map(
                    (tag) => (
                      <button
                        key={tag}
                        onClick={() => {
                          setSearchQuery(tag);
                        }}
                        className="text-xs uppercase tracking-[0.14em] text-[#241E1A] border border-[#B8B0A3]/50 px-3 py-1.5 hover:bg-[#241E1A] hover:text-[#F2EDE4] transition-colors"
                      >
                        {tag}
                      </button>
                    )
                  )}
                </div>
              </div>
            )}

            {/* Live Search Results */}
            {searchResults.length > 0 && (
              <div className="mt-6 pt-4 border-t border-[#B8B0A3]/25">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#686B5E] block mb-3 font-medium">
                  Suggested Pieces ({searchResults.length})
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[300px] overflow-y-auto pr-2">
                  {searchResults.map((prod) => (
                    <Link
                      key={prod.id}
                      href={`/products/${prod.slug}`}
                      onClick={() => setIsSearchOpen(false)}
                      className="flex items-center gap-3 p-2 hover:bg-[#EBE5DB] transition-colors group"
                    >
                      <img
                        src={prod.images[0] || '/images/products/architectural-black-suit-1.jpg'}
                        alt={prod.nameEn}
                        className="w-12 h-16 object-cover bg-[#EBE5DB]"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-serif text-[#241E1A] truncate group-hover:text-[#686B5E] transition-colors">
                          {prod.nameEn}
                        </p>
                        <p className="text-[11px] font-sans text-[#686B5E] uppercase tracking-wider mt-0.5">
                          {prod.category}
                        </p>
                        <p className="text-xs font-sans text-[#241E1A] font-medium mt-0.5">
                          BDT {prod.priceBDT.toLocaleString()}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────
          EDITORIAL MOBILE NAVIGATION DRAWER
      ───────────────────────────────────────────── */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#F2EDE4] flex flex-col justify-between p-6 sm:p-10 animate-fadeIn overflow-y-auto">
          {/* Top Bar */}
          <div className="flex items-center justify-between border-b border-[#B8B0A3]/30 pb-4">
            <StitchHouseLogo variant="dark" size="sm" showMotto={false} />
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 text-[#241E1A] hover:text-[#686B5E] transition-colors"
              aria-label="Close menu"
            >
              <X size={24} strokeWidth={1.5} />
            </button>
          </div>

          {/* Navigation Links (Large Editorial Serif) */}
          <div className="py-8 flex flex-col gap-5">
            {NAV_ITEMS.map((item, idx) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="group flex items-center justify-between text-2xl sm:text-3xl font-serif text-[#241E1A] hover:text-[#686B5E] transition-colors"
              >
                <span>{item.label}</span>
                <span className="text-xs font-sans text-[#B8B0A3] tracking-[0.2em] group-hover:translate-x-1 transition-transform">
                  0{idx + 1}
                </span>
              </Link>
            ))}
          </div>

          {/* Bottom Brand Creed & Showroom Info */}
          <div className="pt-6 border-t border-[#B8B0A3]/30 flex flex-col gap-4">
            <div className="flex items-center justify-between text-xs text-[#686B5E] tracking-wider uppercase">
              <span>Showroom: Gulshan & Banani</span>
              <span>2700K Atelier</span>
            </div>
            <p className="text-xs font-serif italic text-[#241E1A]">
              “Quietly Refined. Distinctly Yours.”
            </p>
            <div className="flex gap-4 text-xs tracking-widest uppercase font-medium pt-2">
              <Link href="/account" className="text-[#241E1A] hover:underline">
                Account
              </Link>
              <span className="text-[#B8B0A3]">•</span>
              <Link href="/contact" className="text-[#241E1A] hover:underline">
                Concierge
              </Link>
              <span className="text-[#B8B0A3]">•</span>
              <Link href="/about" className="text-[#241E1A] hover:underline">
                Philosophy
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
