'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { ProductItem, CATALOG_PRODUCTS, getProductsByCategory } from '@/lib/queries/products';
import { ProductCard } from '@/components/product/ProductCard';
import { SHMonogram } from '@/components/brand/SHMonogram';
import { X, ChevronDown, SlidersHorizontal, ArrowLeft } from 'lucide-react';

interface ShopContentProps {
  initialCategory?: string;
  pageTitle?: string;
  pageSubtitle?: string;
  categoryBannerImage?: string;
}

const CATEGORIES = [
  { id: 'all',          label: 'All Pieces' },
  { id: 'new-arrivals', label: 'New Arrivals' },
  { id: 'clothing',     label: 'All Clothing' },
  { id: 'shirts',       label: 'Shirting' },
  { id: 'trousers',     label: 'Trousers' },
  { id: 'outerwear',    label: 'Outerwear' },
  { id: 'accessories',  label: 'Accessories' },
];

const SORT_OPTIONS = [
  { value: 'featured',    label: 'Featured' },
  { value: 'newest',      label: 'New Arrivals' },
  { value: 'bestselling', label: 'Atelier Selection' },
  { value: 'price-asc',   label: 'Price: Low to High' },
  { value: 'price-desc',  label: 'Price: High to Low' },
];

export function ShopContent({
  initialCategory = 'all',
  pageTitle = 'The Tailoring Catalogue',
  pageSubtitle = 'A study in architectural cut, natural fibers and quiet luxury menswear.',
}: ShopContentProps) {
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedSort, setSelectedSort] = useState('featured');
  const [maxPrice, setMaxPrice] = useState(50000);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    let list = getProductsByCategory(selectedCategory);

    list = list.filter((p) => p.priceBDT <= maxPrice);
    if (inStockOnly) list = list.filter((p) => p.inStock);

    switch (selectedSort) {
      case 'newest':
        list.sort((a, b) => (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0));
        break;
      case 'price-asc':
        list.sort((a, b) => a.priceBDT - b.priceBDT);
        break;
      case 'price-desc':
        list.sort((a, b) => b.priceBDT - a.priceBDT);
        break;
      case 'bestselling':
        list.sort((a, b) => (b.atelierSelection ? 1 : 0) - (a.atelierSelection ? 1 : 0));
        break;
      default:
        list.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    }

    return list;
  }, [selectedCategory, selectedSort, maxPrice, inStockOnly]);

  const hasFilters = maxPrice < 50000 || inStockOnly || selectedCategory !== initialCategory;

  const resetFilters = () => {
    setSelectedCategory(initialCategory);
    setMaxPrice(50000);
    setInStockOnly(false);
    setSelectedSort('featured');
  };

  const currentSortLabel = SORT_OPTIONS.find((o) => o.value === selectedSort)?.label || 'Featured';

  return (
    <div className="min-h-screen bg-[#F2EDE4] text-[#241E1A] pt-8 sm:pt-12 pb-24">
      {/* ── Page Header ── */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 mb-12">
        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#686B5E] mb-3">
          <Link href="/" className="hover:text-[#241E1A] transition-colors">
            Home
          </Link>
          <span className="text-[#B8B0A3]">•</span>
          <span>Archive</span>
          {selectedCategory !== 'all' && (
            <>
              <span className="text-[#B8B0A3]">•</span>
              <span className="text-[#241E1A] font-medium">{selectedCategory}</span>
            </>
          )}
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#B8B0A3]/30 pb-6 gap-4">
          <div>
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#A8946C] block mb-1 font-semibold">
              STITCH HOUSE ARCHIVE
            </span>
            <h1 className="text-3xl sm:text-5xl font-serif text-[#241E1A] font-normal">
              {pageTitle}
            </h1>
            <p className="text-sm text-[#686B5E] mt-2 max-w-xl leading-relaxed">
              {pageSubtitle}
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[#686B5E]">
            <SHMonogram size={16} variant="stone" />
            <span>{filteredProducts.length} Pieces Available</span>
          </div>
        </div>

        {/* ── Category Tabs (Desktop & Mobile Pills) ── */}
        {/* Mobile Horizontal Category Scroller */}
        <div className="flex lg:hidden overflow-x-auto pb-2 pt-4 mb-2 gap-2 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const active = selectedCategory.toLowerCase() === cat.id.toLowerCase();
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`text-xs uppercase tracking-[0.16em] font-medium px-3.5 py-2 whitespace-nowrap transition-all border ${
                  active
                    ? 'bg-[#241E1A] text-[#F2EDE4] border-[#241E1A]'
                    : 'bg-[#EBE5DB]/50 text-[#686B5E] border-[#B8B0A3]/40'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        <div className="flex items-center justify-between pt-2 lg:pt-6 border-b border-[#B8B0A3]/20 pb-4">
          <div className="hidden lg:flex items-center gap-2 overflow-x-auto">
            {CATEGORIES.map((cat) => {
              const active = selectedCategory.toLowerCase() === cat.id.toLowerCase();
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`text-xs uppercase tracking-[0.18em] font-medium px-4 py-2 transition-all ${
                    active
                      ? 'bg-[#241E1A] text-[#F2EDE4]'
                      : 'bg-transparent text-[#686B5E] hover:text-[#241E1A] hover:bg-[#EBE5DB]'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Sort & Mobile Filter Toggle */}
          <div className="flex items-center justify-between lg:justify-end w-full lg:w-auto gap-3">
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden flex-1 sm:flex-initial flex items-center justify-center gap-2 text-xs uppercase tracking-[0.16em] font-medium border border-[#B8B0A3]/60 px-4 py-2.5 text-[#241E1A] bg-[#F2EDE4] min-h-[44px]"
            >
              <SlidersHorizontal size={14} />
              <span>Filters</span>
            </button>

            {/* Sort Dropdown */}
            <div className="relative flex-1 sm:flex-initial">
              <button
                onClick={() => setSortDropdownOpen(!sortDropdownOpen)}
                className="w-full flex items-center justify-between sm:justify-center gap-2 text-xs uppercase tracking-[0.16em] sm:tracking-[0.18em] font-medium border border-[#B8B0A3]/60 px-3.5 sm:px-4 py-2.5 bg-[#F2EDE4] text-[#241E1A] min-h-[44px]"
              >
                <span className="truncate">Sort: {currentSortLabel}</span>
                <ChevronDown size={13} className="shrink-0" />
              </button>

              {sortDropdownOpen && (
                <div className="absolute right-0 top-full mt-1 w-48 bg-[#F2EDE4] border border-[#B8B0A3] shadow-lg z-30 py-1">
                  {SORT_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => {
                        setSelectedSort(opt.value);
                        setSortDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-xs uppercase tracking-wider transition-colors ${
                        selectedSort === opt.value
                          ? 'bg-[#241E1A] text-[#F2EDE4]'
                          : 'text-[#241E1A] hover:bg-[#EBE5DB]'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Product Grid (2-Column Mobile, 3/4 Desktop) ── */}
      <div className="max-w-[1600px] mx-auto px-3 sm:px-8">
        {filteredProducts.length === 0 ? (
          <div className="py-24 text-center px-4">
            <SHMonogram size={40} variant="stone" className="mb-4 opacity-50" />
            <h3 className="text-xl font-serif text-[#241E1A] mb-2">NO PIECES MATCH YOUR CRITERIA</h3>
            <p className="text-xs text-[#686B5E] mb-6 max-w-sm mx-auto">
              Try adjusting your filters or explore the full seasonal collection.
            </p>
            <button onClick={resetFilters} className="sh-btn-primary">
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6 lg:gap-8">
            {filteredProducts.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        )}
      </div>

      {/* ── Mobile Filter Drawer ── */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 bg-[#241E1A]/60 backdrop-blur-xs flex justify-end">
          <div
            onClick={() => setMobileFilterOpen(false)}
            className="flex-1"
          />
          <div className="w-full max-w-sm bg-[#F2EDE4] h-full p-6 flex flex-col justify-between overflow-y-auto pb-safe shadow-2xl">
            <div>
              <div className="flex items-center justify-between border-b border-[#B8B0A3]/30 pb-4 mb-6">
                <span className="text-xs uppercase tracking-[0.2em] font-medium text-[#241E1A]">
                  Filter Collection
                </span>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-1.5 text-[#241E1A]"
                  aria-label="Close filters"
                >
                  <X size={20} strokeWidth={1.5} />
                </button>
              </div>

              {/* Categories */}
              <div className="mb-8">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#686B5E] block mb-3 font-medium">
                  Categories
                </span>
                <div className="flex flex-col gap-2">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setSelectedCategory(cat.id);
                        setMobileFilterOpen(false);
                      }}
                      className={`text-left text-xs uppercase tracking-wider py-3 px-3.5 border transition-colors ${
                        selectedCategory === cat.id
                          ? 'bg-[#241E1A] text-[#F2EDE4] border-[#241E1A]'
                          : 'border-[#B8B0A3]/40 text-[#241E1A] bg-white/40'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* In Stock toggle */}
              <div className="mb-6 pt-4 border-t border-[#B8B0A3]/30 flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider text-[#241E1A]">
                  In Stock Only
                </span>
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="w-5 h-5 accent-[#241E1A]"
                />
              </div>
            </div>

            <div className="pt-6 border-t border-[#B8B0A3]/30 flex gap-3">
              <button
                onClick={resetFilters}
                className="flex-1 sh-btn-secondary text-center py-3.5 text-xs"
              >
                Reset
              </button>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="flex-1 sh-btn-primary text-center py-3.5 text-xs"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
