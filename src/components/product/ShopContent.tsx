'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { ProductItem, CATALOG_PRODUCTS } from '@/lib/queries/products';
import { ProductCard } from '@/components/product/ProductCard';
import { QuickViewModal } from '@/components/product/QuickViewModal';
import { SizeGuideModal } from '@/components/product/SizeGuideModal';
import {
  SlidersHorizontal,
  ChevronDown,
  X,
  RotateCcw,
  Grid2X2,
  Grid3X3,
  LayoutGrid,
  Star,
  Sparkles,
  ShoppingBag,
} from 'lucide-react';

interface ShopContentProps {
  initialCategory?: string;
  pageTitle?: string;
  pageSubtitle?: string;
  categoryBannerImage?: string;
}

export function ShopContent({
  initialCategory = 'all',
  pageTitle = 'The Complete Garment Archive',
  pageSubtitle = 'Architectural silhouettes engineered in Dhaka with heritage handlooms & Japanese technical fabrics.',
  categoryBannerImage,
}: ShopContentProps) {
  // State
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedGender, setSelectedGender] = useState<string>('all');
  const [selectedSort, setSelectedSort] = useState<string>('featured');
  const [maxPrice, setMaxPrice] = useState<number>(30000);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [minRating, setMinRating] = useState<number>(0);
  const [mobileFilterOpen, setMobileFilterOpen] = useState<boolean>(false);
  const [gridColumns, setGridColumns] = useState<2 | 3 | 4>(3);

  // Modals state
  const [quickViewProduct, setQuickViewProduct] = useState<ProductItem | null>(null);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState<boolean>(false);

  const CATEGORIES = [
    { id: 'all', label: 'All Garments' },
    { id: 'new-drop', label: 'New Arrivals' },
    { id: 'best-sellers', label: 'Best Sellers' },
    { id: 'sale', label: 'Archive Sale' },
    { id: 'women', label: 'Women' },
    { id: 'men', label: 'Men' },
    { id: 'panjabi', label: 'Panjabi & Ethnic' },
    { id: 'unisex', label: 'Unisex' },
    { id: 'accessories', label: 'Accessories & Leather' },
  ];

  // Filtering & Sorting Logic
  const filteredProducts = useMemo(() => {
    let list = [...CATALOG_PRODUCTS];

    // Category Filter
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

    // Gender Filter
    if (selectedGender !== 'all') {
      list = list.filter((p) => p.gender.toLowerCase() === selectedGender.toLowerCase() || p.gender === 'UNISEX');
    }

    // Price Filter
    list = list.filter((p) => p.priceBDT <= maxPrice);

    // In Stock Only
    if (inStockOnly) {
      list = list.filter((p) => p.inStock);
    }

    // Min Rating
    if (minRating > 0) {
      list = list.filter((p) => p.rating >= minRating);
    }

    // Sorting
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
      case 'rating':
        list.sort((a, b) => b.rating - a.rating);
        break;
      case 'bestselling':
        list.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      case 'featured':
      default:
        list.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
        break;
    }

    return list;
  }, [selectedCategory, selectedGender, selectedSort, maxPrice, inStockOnly, minRating]);

  const hasActiveFilters =
    selectedCategory !== initialCategory ||
    selectedGender !== 'all' ||
    maxPrice < 30000 ||
    inStockOnly ||
    minRating > 0;

  const resetFilters = () => {
    setSelectedCategory(initialCategory);
    setSelectedGender('all');
    setMaxPrice(30000);
    setInStockOnly(false);
    setMinRating(0);
    setSelectedSort('featured');
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      {/* Category Hero / Header Banner */}
      <section className="relative pt-12 pb-16 px-4 sm:px-8 md:px-12 border-b border-neutral-200 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-neutral-500 mb-4">
            <Link href="/" className="hover:text-black transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/shop" className="hover:text-black transition-colors">
              Shop
            </Link>
            {selectedCategory !== 'all' && (
              <>
                <span>/</span>
                <span className="text-black font-semibold">{selectedCategory}</span>
              </>
            )}
          </nav>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-black mb-3">
                {pageTitle}
              </h1>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-sans">
                {pageSubtitle}
              </p>
            </div>

            {/* Quick Category Chips */}
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.slice(0, 5).map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider border transition-colors ${
                    selectedCategory === cat.id
                      ? 'bg-black text-white border-black font-bold'
                      : 'border-neutral-300 bg-white text-neutral-700 hover:border-black hover:text-black'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Shop Viewport */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12 py-8">
        {/* Top Control Bar (Sort, Filter Drawer trigger, Grid toggles) */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-neutral-200 mb-8">
          {/* Mobile Filter Trigger & Product Count */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white border border-neutral-300 text-xs font-mono uppercase tracking-widest text-black hover:border-black shadow-xs"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Filters ({hasActiveFilters ? 'Active' : 'All'})</span>
            </button>

            <span className="font-mono text-xs text-neutral-500 uppercase tracking-wider">
              Showing <strong className="text-black">{filteredProducts.length}</strong> Garments
            </span>
          </div>

          {/* Right Controls: Sort Dropdown & Desktop Column Switches */}
          <div className="flex items-center gap-4">
            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="text-neutral-500 hidden sm:inline uppercase">Sort:</span>
              <select
                value={selectedSort}
                onChange={(e) => setSelectedSort(e.target.value)}
                className="bg-white border border-neutral-300 text-black px-3 py-2 text-xs font-mono uppercase tracking-wider focus:outline-none focus:border-black shadow-xs"
              >
                <option value="featured">Featured / Curated</option>
                <option value="newest">Newest Drops</option>
                <option value="bestselling">Best Selling</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>

            {/* Desktop Grid Switcher */}
            <div className="hidden md:flex items-center border border-neutral-300 bg-white p-0.5 shadow-xs">
              <button
                onClick={() => setGridColumns(2)}
                className={`p-1.5 transition-colors ${gridColumns === 2 ? 'bg-black text-white' : 'text-neutral-500 hover:text-black'}`}
                title="2 Columns"
              >
                <Grid2X2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setGridColumns(3)}
                className={`p-1.5 transition-colors ${gridColumns === 3 ? 'bg-black text-white' : 'text-neutral-500 hover:text-black'}`}
                title="3 Columns"
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setGridColumns(4)}
                className={`p-1.5 transition-colors ${gridColumns === 4 ? 'bg-black text-white' : 'text-neutral-500 hover:text-black'}`}
                title="4 Columns"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Active Filter Pills Bar */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-2 mb-8 bg-[#FAFAFA] p-3 border border-neutral-200">
            <span className="text-[11px] font-mono text-neutral-500 uppercase tracking-wider mr-2">
              Active Filters:
            </span>
            {selectedCategory !== 'all' && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border border-neutral-300 text-xs font-mono text-black shadow-xs">
                Category: {selectedCategory}
                <button onClick={() => setSelectedCategory('all')} className="hover:text-neutral-500">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {selectedGender !== 'all' && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border border-neutral-300 text-xs font-mono text-black shadow-xs">
                Gender: {selectedGender}
                <button onClick={() => setSelectedGender('all')} className="hover:text-neutral-500">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {maxPrice < 30000 && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border border-neutral-300 text-xs font-mono text-black shadow-xs">
                Max Price: ৳{maxPrice.toLocaleString()}
                <button onClick={() => setMaxPrice(30000)} className="hover:text-neutral-500">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {inStockOnly && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border border-neutral-300 text-xs font-mono text-black shadow-xs">
                In Stock Only
                <button onClick={() => setInStockOnly(false)} className="hover:text-neutral-500">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {minRating > 0 && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border border-neutral-300 text-xs font-mono text-black shadow-xs">
                {minRating}+ Stars
                <button onClick={() => setMinRating(0)} className="hover:text-neutral-500">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            <button
              onClick={resetFilters}
              className="ml-auto text-xs font-mono text-black hover:underline flex items-center gap-1 font-bold"
            >
              <RotateCcw className="w-3 h-3" /> Reset All
            </button>
          </div>
        )}

        {/* Layout Grid: Desktop Sidebar + Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block space-y-8 pr-6 border-r border-neutral-200">
            {/* Category Filter */}
            <div>
              <h3 className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-black mb-4">
                Categories
              </h3>
              <ul className="space-y-2.5 font-display text-xs uppercase tracking-wider">
                {CATEGORIES.map((cat) => (
                  <li key={cat.id}>
                    <button
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`text-left w-full transition-colors flex items-center justify-between ${
                        selectedCategory === cat.id
                          ? 'text-black font-bold underline decoration-black underline-offset-4'
                          : 'text-neutral-500 hover:text-black'
                      }`}
                    >
                      <span>{cat.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Price Filter Slider */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-black">
                  Max Price
                </h3>
                <span className="font-mono text-xs text-black font-bold">
                  ৳{maxPrice.toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min="4000"
                max="30000"
                step="1000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-black bg-neutral-200 h-1.5 rounded cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-neutral-400 mt-1">
                <span>৳4,000</span>
                <span>৳30,000</span>
              </div>
            </div>

            {/* In-Stock Toggle */}
            <div className="pt-2 border-t border-neutral-200">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="accent-black w-4 h-4 cursor-pointer"
                />
                <span className="text-xs font-mono uppercase tracking-wider text-neutral-600 group-hover:text-black">
                  In-Stock Items Only
                </span>
              </label>
            </div>

            {/* Rating Filter */}
            <div className="pt-2 border-t border-neutral-200">
              <h3 className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-black mb-3">
                Minimum Rating
              </h3>
              <div className="space-y-1.5">
                {[4.8, 4.5, 4.0].map((starVal) => (
                  <button
                    key={starVal}
                    onClick={() => setMinRating(minRating === starVal ? 0 : starVal)}
                    className={`w-full flex items-center gap-2 text-xs font-mono py-1 px-2 border transition-colors ${
                      minRating === starVal
                        ? 'bg-black text-white border-black font-bold'
                        : 'border-transparent text-neutral-600 hover:text-black'
                    }`}
                  >
                    <Star className="w-3.5 h-3.5 fill-current text-black" />
                    <span>{starVal}+ Stars</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Size Guide Banner Trigger */}
            <div className="p-4 bg-[#FAFAFA] border border-neutral-200 space-y-2">
              <div className="font-display text-xs uppercase tracking-wider font-bold text-black">
                Unsure of your size?
              </div>
              <p className="text-[11px] text-neutral-600 font-sans leading-relaxed">
                Our silhouettes are architectural. Consult our exact centimeter measurements.
              </p>
              <button
                onClick={() => setIsSizeGuideOpen(true)}
                className="text-xs font-mono text-black hover:underline uppercase tracking-wider font-bold"
              >
                View Size Guide →
              </button>
            </div>
          </aside>

          {/* Product Grid Area (3 Columns on desktop by default) */}
          <div className="lg:col-span-3">
            {filteredProducts.length === 0 ? (
              /* Empty State */
              <div className="text-center py-20 border border-neutral-200 bg-[#FAFAFA] p-8">
                <div className="w-16 h-16 border border-neutral-200 flex items-center justify-center mx-auto mb-4 text-neutral-400">
                  <ShoppingBag className="w-8 h-8 stroke-[1.2]" />
                </div>
                <h3 className="font-display text-sm font-bold uppercase tracking-widest text-black mb-2">
                  No Garments Match Selected Filters
                </h3>
                <p className="text-xs text-neutral-600 max-w-sm mx-auto mb-6">
                  Try adjusting your price threshold, category selection, or rating filter to view archive pieces.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-6 py-3 bg-black text-white font-display font-bold text-xs uppercase tracking-widest hover:bg-neutral-800 transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div
                className={`grid gap-x-6 gap-y-10 ${
                  gridColumns === 2
                    ? 'grid-cols-1 sm:grid-cols-2'
                    : gridColumns === 4
                    ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4'
                    : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3'
                }`}
              >
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
        </div>
      </div>

      {/* Mobile Filters Slide-over Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-[9990] lg:hidden">
          <div
            onClick={() => setMobileFilterOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
          />
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-sm bg-white border-l border-neutral-200 text-neutral-900 flex flex-col p-6 shadow-2xl">
              <div className="flex justify-between items-center pb-4 border-b border-neutral-200 mb-6">
                <h3 className="font-display text-sm uppercase tracking-widest font-bold text-black">
                  Filter Garments
                </h3>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="text-neutral-500 hover:text-black"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto space-y-6">
                {/* Category */}
                <div>
                  <h4 className="font-mono text-xs uppercase tracking-widest text-black font-bold mb-3">
                    Category
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`p-2 text-[11px] font-mono uppercase tracking-wider border text-left ${
                          selectedCategory === cat.id
                            ? 'bg-black text-white border-black font-bold'
                            : 'border-neutral-300 bg-white text-neutral-700'
                        }`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Slider */}
                <div>
                  <div className="flex justify-between text-xs font-mono mb-2">
                    <span>Max Price</span>
                    <span className="text-black font-bold">৳{maxPrice.toLocaleString()}</span>
                  </div>
                  <input
                    type="range"
                    min="4000"
                    max="30000"
                    step="1000"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="w-full accent-black bg-neutral-200"
                  />
                </div>

                {/* In Stock */}
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="accent-black w-4 h-4"
                  />
                  <span className="text-xs font-mono uppercase text-neutral-700">
                    In-Stock Items Only
                  </span>
                </label>
              </div>

              {/* Drawer Actions */}
              <div className="pt-4 border-t border-neutral-200 grid grid-cols-2 gap-3">
                <button
                  onClick={resetFilters}
                  className="py-3 border border-neutral-300 text-xs font-display uppercase tracking-widest font-bold text-neutral-700 hover:text-black"
                >
                  Reset
                </button>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="py-3 bg-black text-white text-xs font-display uppercase tracking-widest font-bold hover:bg-neutral-800"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onOpenSizeGuide={() => {
          setQuickViewProduct(null);
          setIsSizeGuideOpen(true);
        }}
      />

      {/* Size Guide Modal */}
      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
        category={selectedCategory}
      />
    </div>
  );
}
