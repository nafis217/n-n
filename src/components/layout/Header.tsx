'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, User, Heart, ShoppingBag, Menu, X } from 'lucide-react';
import { useCartStore } from '@/lib/store/cart';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { getItemCount } = useCartStore();
  const cartCount = getItemCount();

  return (
    <>
      {/* Top Header Navigation */}
      <nav className="fixed top-0 left-0 w-full z-[100] h-[64px] bg-background border-b border-outline-variant flex justify-between items-center px-margin-mobile md:px-margin-desktop">
        <div className="flex items-center gap-6 md:gap-10">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden text-primary focus:outline-none"
            aria-label="Open Navigation Menu"
          >
            <Menu className="w-6 h-6 stroke-[1.5]" />
          </button>
          <Link
            href="/"
            className="font-display-lg text-[22px] md:text-[28px] tracking-tighter text-primary uppercase font-bold"
          >
            N &amp; N
          </Link>
          
          <div className="hidden md:flex gap-8 items-center">
            <Link href="/women" className="font-nav-item text-nav-item text-secondary hover:text-primary transition-colors">
              Women
            </Link>
            <Link href="/men" className="font-nav-item text-nav-item text-secondary hover:text-primary transition-colors">
              Men
            </Link>
            <Link href="/unisex" className="font-nav-item text-nav-item text-secondary hover:text-primary transition-colors">
              Unisex
            </Link>
            <Link href="/new-drop" className="font-nav-item text-nav-item text-primary font-bold border-b border-primary pb-1">
              New Drop
            </Link>
            <Link href="/panjabi" className="font-nav-item text-nav-item text-secondary hover:text-primary transition-colors">
              Panjabi
            </Link>
            <Link href="/collections" className="font-nav-item text-nav-item text-secondary hover:text-primary transition-colors">
              Collections
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-4 md:gap-6">
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="text-primary cursor-pointer hover:opacity-70 transition-opacity"
            aria-label="Search"
          >
            <Search className="w-5 h-5 stroke-[1.5]" />
          </button>
          <Link
            href="/account"
            className="text-primary hover:opacity-70 transition-opacity"
            aria-label="Account"
          >
            <User className="w-5 h-5 stroke-[1.5]" />
          </Link>
          <Link
            href="/wishlist"
            className="text-primary hover:opacity-70 transition-opacity"
            aria-label="Wishlist"
          >
            <Heart className="w-5 h-5 stroke-[1.5]" />
          </Link>
          <Link
            href="/bag"
            className="text-primary hover:opacity-70 transition-opacity relative flex items-center"
            aria-label="Shopping Bag"
          >
            <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-on-primary text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </nav>

      {/* Quick Search Drawer Bar */}
      {searchOpen && (
        <div className="fixed top-[64px] left-0 w-full bg-white z-[90] border-b border-outline-variant p-4 px-margin-desktop flex items-center gap-4">
          <Search className="w-5 h-5 text-outline" />
          <input
            type="text"
            placeholder="SEARCH PANJABI, JAMDANI, LINEN TUNIC, ACCESSORIES..."
            className="w-full font-label-caps text-body-md text-primary placeholder:text-outline bg-transparent border-none focus:outline-none uppercase"
            autoFocus
          />
          <button
            onClick={() => setSearchOpen(false)}
            className="text-secondary font-label-caps text-[11px] uppercase hover:text-primary"
          >
            Close
          </button>
        </div>
      )}

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[150] flex">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative w-[300px] max-w-[80vw] bg-background h-full shadow-2xl z-10 p-6 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center pb-6 border-b border-outline-variant mb-6">
                <span className="font-display-lg text-lg uppercase font-bold text-primary">N &amp; N</span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-primary p-1"
                >
                  <X className="w-6 h-6 stroke-[1.5]" />
                </button>
              </div>

              <div className="flex flex-col gap-4">
                <Link
                  href="/women"
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-nav-item text-base text-primary uppercase"
                >
                  Women
                </Link>
                <Link
                  href="/men"
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-nav-item text-base text-primary uppercase"
                >
                  Men
                </Link>
                <Link
                  href="/unisex"
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-nav-item text-base text-primary uppercase"
                >
                  Unisex
                </Link>
                <Link
                  href="/new-drop"
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-nav-item text-base text-vermilion font-bold uppercase"
                >
                  New Drop
                </Link>
                <Link
                  href="/panjabi"
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-nav-item text-base text-primary uppercase"
                >
                  Panjabi
                </Link>
                <Link
                  href="/collections"
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-nav-item text-base text-primary uppercase"
                >
                  Collections
                </Link>
              </div>
            </div>

            <div className="pt-6 border-t border-outline-variant text-[12px] text-secondary font-label-caps uppercase">
              <p>Dhaka, Bangladesh</p>
              <p className="mt-1">© 2026 BUNON</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
