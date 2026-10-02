'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Search, User, ShoppingBag, X, ArrowRight } from 'lucide-react';
import { useCartStore } from '@/lib/store/cart';
import { useAuthStore } from '@/lib/store/auth';
import { StitchHouseLogo } from '../brand/StitchHouseLogo';
import { searchProducts, ProductItem } from '@/lib/queries/products';
import { MegaMenuPanel } from './MegaMenu';

export const Header: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const leaveTimerRef = useRef<NodeJS.Timeout | null>(null);

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
    setIsSearchOpen(false);
    setIsMenuOpen(false);
  }, [pathname]);

  // Focus search input when open
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 50);
    }
  }, [isSearchOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

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

  const handleHeaderMouseEnter = () => {
    if (leaveTimerRef.current) {
      clearTimeout(leaveTimerRef.current);
      leaveTimerRef.current = null;
    }
  };

  const handleHeaderMouseLeave = () => {
    if (leaveTimerRef.current) {
      clearTimeout(leaveTimerRef.current);
    }
    leaveTimerRef.current = setTimeout(() => {
      setIsMenuOpen(false);
    }, 350);
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    if (leaveTimerRef.current) {
      clearTimeout(leaveTimerRef.current);
    }
    setIsMenuOpen(false);
  };

  return (
    <>
      <header
        onMouseEnter={handleHeaderMouseEnter}
        onMouseLeave={handleHeaderMouseLeave}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled || isMenuOpen
            ? 'bg-[#FFFFFF] h-[64px] border-b border-neutral-200 shadow-sm'
            : 'bg-[#F2EDE4] h-[68px] border-b border-[#B8B0A3]/25'
        }`}
      >
        <div className="max-w-[1680px] mx-auto h-full px-4 sm:px-8 lg:px-12 flex items-center justify-between">
          
          {/* ── LEFT: Zara Iconic Box Toggle Button + Brand Logo ── */}
          <div className="flex items-center gap-4 sm:gap-6">
            {/* Zara Framed Toggle button */}
            <button
              onClick={toggleMenu}
              onMouseEnter={() => setIsMenuOpen(true)}
              className="w-8 h-8 sm:w-9 sm:h-9 border border-[#241E1A] flex flex-col justify-center items-center gap-1 p-1.5 hover:bg-[#241E1A] group transition-colors cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {isMenuOpen ? (
                <X size={16} className="text-[#241E1A] group-hover:text-[#F2EDE4]" />
              ) : (
                <>
                  <span className="w-full h-[1.5px] bg-[#241E1A] group-hover:bg-[#F2EDE4] transition-colors" />
                  <span className="w-full h-[1.5px] bg-[#241E1A] group-hover:bg-[#F2EDE4] transition-colors" />
                </>
              )}
            </button>

            {/* Logo */}
            <StitchHouseLogo
              href="/"
              onClick={closeMenu}
              variant="dark"
              size="sm"
              showMotto={false}
            />
          </div>

          {/* ── RIGHT: Zara Style Search Bar & Utilities ── */}
          <div className="flex items-center gap-6 sm:gap-10">
            {/* Search Input Bar (Zara Style) */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 text-[#241E1A] hover:text-neutral-500 transition-colors cursor-pointer group"
              aria-label="Search Collection"
            >
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] font-medium border-b border-[#241E1A] pb-0.5 group-hover:border-neutral-400">
                SEARCH
              </span>
              <Search size={14} strokeWidth={2} />
            </button>

            {/* Account / Log In */}
            <Link
              href={user ? '/account' : '/login'}
              className="hidden sm:inline-block text-[11px] font-mono uppercase tracking-[0.16em] font-medium text-[#241E1A] hover:text-neutral-500 transition-colors"
            >
              {user ? 'ACCOUNT' : 'LOG IN'}
            </Link>

            {/* Help / Concierge */}
            <Link
              href="/faq"
              className="hidden md:inline-block text-[11px] font-mono uppercase tracking-[0.16em] text-neutral-500 hover:text-[#241E1A] transition-colors"
            >
              HELP
            </Link>

            {/* Bag Button */}
            <button
              onClick={openCart}
              className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.18em] font-bold text-[#241E1A] border border-[#241E1A] px-3 py-1.5 hover:bg-[#241E1A] hover:text-[#F2EDE4] transition-colors cursor-pointer"
              aria-label={`Shopping Bag, ${itemCount} items`}
            >
              <ShoppingBag size={13} strokeWidth={2} />
              <span>BAG [ {itemCount} ]</span>
            </button>
          </div>

        </div>

        {/* ── ACTIVE ZARA MEGA MENU PANEL ── */}
        <MegaMenuPanel
          activeTabId={isMenuOpen ? 'all' : null}
          onMouseEnter={handleHeaderMouseEnter}
          onMouseLeave={handleHeaderMouseLeave}
          onLinkClick={closeMenu}
        />
      </header>

      {/* Background Dimming Scrim when Mega Menu is open */}
      {isMenuOpen && (
        <div
          onClick={closeMenu}
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-[1.5px] transition-opacity duration-300 pointer-events-auto"
          aria-hidden="true"
        />
      )}

      {/* ─────────────────────────────────────────────
          EDITORIAL SEARCH OVERLAY
      ───────────────────────────────────────────── */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-[#241E1A]/60 backdrop-blur-sm flex flex-col justify-start items-center p-4 sm:p-8 animate-fadeIn">
          <div className="w-full max-w-3xl bg-[#FFFFFF] border border-neutral-300 p-6 sm:p-10 shadow-2xl mt-12 relative">
            <button
              onClick={() => setIsSearchOpen(false)}
              className="absolute top-6 right-6 text-black hover:text-neutral-500 transition-colors p-2 cursor-pointer"
              aria-label="Close search"
            >
              <X size={20} strokeWidth={1.5} />
            </button>

            <div className="mb-6">
              <span className="text-[10px] uppercase tracking-[0.3em] text-neutral-500 font-medium block mb-2 font-mono">
                SEARCH STITCH HOUSE CATALOGUE
              </span>
              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search suits, linen shirts, denim jackets..."
                  className="w-full bg-transparent border-b-2 border-black pb-3 pt-1 text-lg sm:text-2xl font-sans font-bold text-black placeholder:text-neutral-400 focus:outline-none"
                />
                <button
                  type="submit"
                  className="absolute right-0 bottom-3 text-black hover:text-neutral-500 cursor-pointer"
                >
                  <ArrowRight size={20} strokeWidth={2} />
                </button>
              </form>
            </div>

            {/* Quick Category Shortcuts */}
            {searchQuery.trim().length === 0 && (
              <div className="pt-4 border-t border-neutral-200">
                <span className="text-[10px] uppercase tracking-[0.25em] text-neutral-500 block mb-3 font-mono font-medium">
                  POPULAR SEARCHES
                </span>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Obsidian Black Suit',
                    'Raw Selvedge Denim',
                    'Linen Overshirts',
                    'Espoir Silk Dress',
                    'Monolith Polo',
                    'Bespoke Suiting',
                  ].map((tag) => (
                    <button
                      key={tag}
                      onClick={() => {
                        setSearchQuery(tag);
                      }}
                      className="text-xs uppercase tracking-[0.14em] text-black border border-neutral-300 px-3 py-1.5 hover:bg-black hover:text-white transition-colors cursor-pointer font-mono"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Live Search Results */}
            {searchResults.length > 0 && (
              <div className="mt-6 pt-4 border-t border-neutral-200">
                <span className="text-[10px] uppercase tracking-[0.25em] text-neutral-500 block mb-3 font-mono font-medium">
                  MATCHING ITEMS ({searchResults.length})
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[300px] overflow-y-auto pr-2">
                  {searchResults.map((prod) => (
                    <Link
                      key={prod.id}
                      href={`/products/${prod.slug}`}
                      onClick={() => setIsSearchOpen(false)}
                      className="flex items-center gap-3 p-2 hover:bg-neutral-50 transition-colors group border border-transparent hover:border-neutral-200"
                    >
                      <img
                        src={prod.images[0] || '/images/products/architectural-black-suit-1.jpg'}
                        alt={prod.nameEn}
                        className="w-12 h-16 object-cover bg-neutral-100"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-serif text-black truncate group-hover:underline">
                          {prod.nameEn}
                        </p>
                        <p className="text-[11px] font-mono text-neutral-500 uppercase tracking-wider mt-0.5">
                          {prod.category}
                        </p>
                        <p className="text-xs font-mono text-black font-semibold mt-0.5">
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
    </>
  );
};
