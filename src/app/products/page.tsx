'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { SlidersHorizontal } from 'lucide-react';
import { ProductCard } from '@/components/product/ProductCard';
import { FilterSidebar } from '@/components/product/FilterSidebar';
import { CATALOG_PRODUCTS } from '@/lib/queries/products';

function ProductsCatalogueContent() {
  const searchParams = useSearchParams();
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState('newest');

  const selectedCategory = searchParams.get('category');
  const selectedSize = searchParams.get('size');
  const selectedColor = searchParams.get('color');

  let filteredProducts = CATALOG_PRODUCTS;

  if (selectedCategory) {
    filteredProducts = filteredProducts.filter((p) => p.category === selectedCategory);
  }
  if (selectedSize) {
    filteredProducts = filteredProducts.filter((p) => p.sizes.includes(selectedSize));
  }
  if (selectedColor) {
    filteredProducts = filteredProducts.filter((p) =>
      p.colors.some((c) => c.name.toLowerCase().includes(selectedColor.toLowerCase()))
    );
  }

  if (sortBy === 'price-low') {
    filteredProducts = [...filteredProducts].sort((a, b) => a.priceBDT - b.priceBDT);
  } else if (sortBy === 'price-high') {
    filteredProducts = [...filteredProducts].sort((a, b) => b.priceBDT - a.priceBDT);
  }

  return (
    <div className="w-full px-margin-mobile md:px-margin-desktop py-10">
      {/* Editorial Header Banner */}
      <div className="border-b border-outline-variant pb-8 mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <span className="font-label-caps text-label-caps text-outline uppercase block mb-2 font-semibold">
            BUNON Catalogue
          </span>
          <h1 className="font-headline-lg text-3xl md:text-5xl uppercase font-semibold text-primary">
            {selectedCategory ? `${selectedCategory.toUpperCase()} COLLECTION` : 'ALL PRODUCTS'}
          </h1>
        </div>

        <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="md:hidden flex items-center gap-2 border border-outline-variant px-4 py-2 font-label-caps text-xs text-primary uppercase font-bold"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Filters</span>
          </button>

          <div className="flex items-center gap-2 border-b border-primary pb-1">
            <span className="font-label-caps text-[11px] text-secondary">SORT BY:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              aria-label="Sort products"
              className="bg-transparent font-label-caps text-xs text-primary uppercase focus:outline-none cursor-pointer border-none font-bold"
            >
              <option value="newest">NEWEST ARRIVALS</option>
              <option value="price-low">PRICE: LOW TO HIGH</option>
              <option value="price-high">PRICE: HIGH TO LOW</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Grid & Filter Layout */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Desktop Filter Sidebar */}
        <div className="hidden md:block col-span-1">
          <FilterSidebar />
        </div>

        {/* Mobile Filter Drawer */}
        {mobileFilterOpen && (
          <div className="fixed inset-0 z-[150] flex md:hidden">
            <div
              className="fixed inset-0 bg-black/40"
              onClick={() => setMobileFilterOpen(false)}
            />
            <div className="relative w-[320px] max-w-[85vw] bg-background h-full shadow-2xl z-10 p-6 overflow-y-auto">
              <FilterSidebar onCloseMobile={() => setMobileFilterOpen(false)} />
            </div>
          </div>
        )}

        {/* Product Grid */}
        <div className="col-span-1 md:col-span-3">
          <p className="font-label-caps text-xs text-secondary mb-6">
            SHOWING {filteredProducts.length} PRODUCTS
          </p>

          {filteredProducts.length === 0 ? (
            <div className="py-20 text-center border border-dashed border-outline-variant">
              <p className="font-label-caps text-sm text-secondary uppercase mb-2">
                No items match your active filters
              </p>
              <p className="font-body-md text-xs text-outline">
                Try clearing active filters or select a different category.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ProductsCataloguePage() {
  return (
    <Suspense
      fallback={
        <div className="py-20 text-center font-label-caps text-xs text-secondary uppercase">
          Loading Catalogue...
        </div>
      }
    >
      <ProductsCatalogueContent />
    </Suspense>
  );
}
