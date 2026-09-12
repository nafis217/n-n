'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { ProductItem, CATALOG_PRODUCTS } from '@/lib/queries/products';
import { ProductCard } from '@/components/product/ProductCard';
import { QuickViewModal } from '@/components/product/QuickViewModal';
import { SizeGuideModal } from '@/components/product/SizeGuideModal';
import { X, ChevronDown, SlidersHorizontal } from 'lucide-react';

interface ShopContentProps {
  initialCategory?: string;
  pageTitle?: string;
  pageSubtitle?: string;
  categoryBannerImage?: string;
}

const CATEGORIES = [
  { id: 'all',          label: 'All' },
  { id: 'new-drop',     label: 'New In' },
  { id: 'best-sellers', label: 'Best Sellers' },
  { id: 'sale',         label: 'Sale' },
  { id: 'women',        label: 'Women' },
  { id: 'men',          label: 'Men' },
  { id: 'panjabi',      label: 'Panjabi' },
  { id: 'unisex',       label: 'Unisex' },
  { id: 'accessories',  label: 'Accessories' },
];

const SORT_OPTIONS = [
  { value: 'featured',    label: 'Featured' },
  { value: 'newest',      label: 'Newest' },
  { value: 'bestselling', label: 'Best Selling' },
  { value: 'price-asc',   label: 'Price: Low to High' },
  { value: 'price-desc',  label: 'Price: High to Low' },
];

export function ShopContent({
  initialCategory = 'all',
  pageTitle = 'All Garments',
  pageSubtitle = '',
}: ShopContentProps) {
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedSort, setSelectedSort] = useState('featured');
  const [maxPrice, setMaxPrice] = useState(30000);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);

  const [quickViewProduct, setQuickViewProduct] = useState<ProductItem | null>(null);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    let list = [...CATALOG_PRODUCTS];

    if (selectedCategory !== 'all') {
      if (selectedCategory === 'new-drop') {
        list = list.filter((p) => p.isNewArrival || p.tag === 'NEW');
      } else if (selectedCategory === 'best-sellers') {
        list = list.filter((p) => p.isBestSeller || p.tag === 'BESTSELLER');
      } else if (selectedCategory === 'sale') {
        list = list.filter((p) => p.tag === 'SALE' || (p.originalPriceBDT && p.originalPriceBDT > p.priceBDT));
      } else {
        list = list.filter(
          (p) =>
            p.category.toLowerCase() === selectedCategory.toLowerCase() ||
            p.gender.toLowerCase() === selectedCategory.toLowerCase()
        );
      }
    }

    list = list.filter((p) => p.priceBDT <= maxPrice);
    if (inStockOnly) list = list.filter((p) => p.inStock);

    switch (selectedSort) {
      case 'newest':      list.sort((a, b) => (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0)); break;
      case 'price-asc':   list.sort((a, b) => a.priceBDT - b.priceBDT); break;
      case 'price-desc':  list.sort((a, b) => b.priceBDT - a.priceBDT); break;
      case 'bestselling': list.sort((a, b) => b.reviewCount - a.reviewCount); break;
      default:            list.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    }

    return list;
  }, [selectedCategory, selectedSort, maxPrice, inStockOnly]);

  const hasFilters = maxPrice < 30000 || inStockOnly || selectedCategory !== initialCategory;

  const resetFilters = () => {
    setSelectedCategory(initialCategory);
    setMaxPrice(30000);
    setInStockOnly(false);
    setSelectedSort('featured');
  };

  const currentSortLabel = SORT_OPTIONS.find(o => o.value === selectedSort)?.label || 'Featured';

  return (
    <div className="min-h-screen bg-[#FAFAF8] text-[#111111]">

      {/* ── Page Header ── */}
      <div className="pt-24 md:pt-28 pb-10 px-6 md:px-12 max-w-[1440px] mx-auto border-b border-[#E8E8E5]">
        <nav className="flex items-center gap-2 text-label text-[#9B9B9B] mb-5">
          <Link href="/" className="hover:text-[#111111] transition-colors">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-[#111111] transition-colors">Shop</Link>
          {selectedCategory !== 'all' && (
            <>
              <span>/</span>
              <span className="text-[#111111]">{CATEGORIES.find(c => c.id === selectedCategory)?.label}</span>
            </>
          )}
        </nav>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
          <div>
            <h1
              className="font-display font-light text-[#111111]"
              style={{ fontSize: 'clamp(28px, 4vw, 48px)', letterSpacing: '-0.025em' }}
            >
              {pageTitle}
            </h1>
            {pageSubtitle && (
              <p className="text-body text-[#6B6B6B] mt-2 max-w-lg">{pageSubtitle}</p>
            )}
          </div>
          <p className="text-label text-[#9B9B9B]">{filteredProducts.length} garments</p>
        </div>
      </div>

      {/* ── Filter & Sort Bar ── */}
      <div className="sticky top-16 z-50 bg-[#FAFAF8]/95 backdrop-blur-sm border-b border-[#E8E8E5]">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between h-12">
            {/* Category pills (desktop) */}
            <div className="hidden md:flex items-center gap-6 h-full">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`text-label uppercase tracking-[0.08em] h-full border-b-[1.5px] transition-all duration-150 cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'border-[#111111] text-[#111111]'
                      : 'border-transparent text-[#9B9B9B] hover:text-[#6B6B6B]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Mobile: filter button */}
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="md:hidden flex items-center gap-2 text-label uppercase tracking-[0.08em] text-[#111111] cursor-pointer"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 stroke-[1.25]" />
              Filter{hasFilters ? ' (active)' : ''}
            </button>

            {/* Right: Sort + Price filter */}
            <div className="flex items-center gap-5">
              {/* Price quick filter */}
              <div className="hidden md:flex items-center gap-2 text-label">
                <span className="text-[#9B9B9B] uppercase tracking-[0.08em]">Max ৳</span>
                <input
                  type="range"
                  min="4000"
                  max="30000"
                  step="1000"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-24 accent-[#111111]"
                />
                <span className="text-[#111111] w-14">৳{(maxPrice / 1000).toFixed(0)}K</span>
              </div>

              {/* In stock */}
              <label className="hidden md:flex items-center gap-2 text-label text-[#6B6B6B] cursor-pointer">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="accent-[#111111] w-3.5 h-3.5"
                />
                In stock
              </label>

              {/* Sort dropdown */}
              <div className="relative">
                <button
                  onClick={() => setSortDropdownOpen(!sortDropdownOpen)}
                  className="flex items-center gap-1.5 text-label uppercase tracking-[0.08em] text-[#111111] cursor-pointer"
                >
                  {currentSortLabel}
                  <ChevronDown className={`w-3 h-3 stroke-[1.5] transition-transform duration-150 ${sortDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                {sortDropdownOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setSortDropdownOpen(false)} />
                    <div className="absolute right-0 top-full mt-1 bg-white border border-[#D9D9D6] shadow-sm z-50 min-w-[160px]">
                      {SORT_OPTIONS.map((opt) => (
                        <button
                          key={opt.value}
                          onClick={() => { setSelectedSort(opt.value); setSortDropdownOpen(false); }}
                          className={`w-full text-left px-4 py-2.5 text-label uppercase tracking-[0.06em] transition-colors duration-150 cursor-pointer ${
                            selectedSort === opt.value
                              ? 'text-[#111111] bg-[#F3F3F1]'
                              : 'text-[#6B6B6B] hover:text-[#111111] hover:bg-[#F3F3F1]'
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Reset */}
              {hasFilters && (
                <button
                  onClick={resetFilters}
                  className="text-label text-[#9B9B9B] hover:text-[#111111] transition-colors duration-150 cursor-pointer flex items-center gap-1"
                >
                  <X className="w-3 h-3 stroke-[1.5]" />
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Product Grid ── */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-10">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-body text-[#6B6B6B] mb-6">No garments match the selected filters.</p>
            <button
              onClick={resetFilters}
              className="px-6 py-3 bg-[#111111] text-white text-label uppercase tracking-[0.12em] hover:bg-[#333] transition-colors duration-150 cursor-pointer"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-6 md:gap-y-14">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={(p) => setQuickViewProduct(p)}
              />
            ))}
          </div>
        )}
      </div>

      {/* ── Mobile Filter Drawer ── */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-[9990] md:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileFilterOpen(false)}
          />
          <div className="absolute inset-y-0 right-0 w-full max-w-[320px] bg-white flex flex-col">
            {/* Drawer header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#E8E8E5]">
              <h3 className="text-label uppercase tracking-[0.12em] text-[#111111]">Filter & Sort</h3>
              <button onClick={() => setMobileFilterOpen(false)} className="text-[#9B9B9B] hover:text-[#111111] transition-colors cursor-pointer">
                <X className="w-4 h-4 stroke-[1.25]" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-8">
              {/* Category */}
              <div>
                <p className="text-editorial-label mb-4">Category</p>
                <div className="flex flex-col gap-2">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`text-left text-body py-1 transition-colors duration-150 cursor-pointer ${
                        selectedCategory === cat.id
                          ? 'text-[#111111] font-medium'
                          : 'text-[#9B9B9B] hover:text-[#6B6B6B]'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort */}
              <div>
                <p className="text-editorial-label mb-4">Sort</p>
                <div className="flex flex-col gap-2">
                  {SORT_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setSelectedSort(opt.value)}
                      className={`text-left text-body py-1 transition-colors duration-150 cursor-pointer ${
                        selectedSort === opt.value
                          ? 'text-[#111111] font-medium'
                          : 'text-[#9B9B9B] hover:text-[#6B6B6B]'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div>
                <p className="text-editorial-label mb-4">Max Price — ৳{maxPrice.toLocaleString()}</p>
                <input
                  type="range"
                  min="4000"
                  max="30000"
                  step="1000"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-[#111111]"
                />
                <div className="flex justify-between text-label text-[#9B9B9B] mt-1">
                  <span>৳4,000</span>
                  <span>৳30,000</span>
                </div>
              </div>

              {/* In stock */}
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="accent-[#111111] w-4 h-4"
                />
                <span className="text-body text-[#6B6B6B]">In stock only</span>
              </label>
            </div>

            {/* Drawer actions */}
            <div className="px-6 py-5 border-t border-[#E8E8E5] flex gap-3">
              <button
                onClick={() => { resetFilters(); setMobileFilterOpen(false); }}
                className="flex-1 py-3 border border-[#D9D9D6] text-label uppercase tracking-[0.08em] text-[#111111] hover:border-[#111111] transition-colors duration-150 cursor-pointer"
              >
                Reset
              </button>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="flex-1 py-3 bg-[#111111] text-white text-label uppercase tracking-[0.08em] hover:bg-[#333] transition-colors duration-150 cursor-pointer"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}

      <QuickViewModal
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onOpenSizeGuide={() => { setQuickViewProduct(null); setIsSizeGuideOpen(true); }}
      />
      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
        category={selectedCategory}
      />
    </div>
  );
}
