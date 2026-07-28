'use client';

import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { ProductCard } from '@/components/product/ProductCard';
import { CATALOG_PRODUCTS } from '@/lib/queries/products';

export default function SearchPage() {
  const [query, setQuery] = useState('');

  const searchResults = CATALOG_PRODUCTS.filter((p) => {
    if (!query.trim()) return false;
    const q = query.toLowerCase();
    return (
      p.nameEn.toLowerCase().includes(q) ||
      p.nameBn.includes(q) ||
      p.category.includes(q) ||
      p.material.toLowerCase().includes(q)
    );
  });

  return (
    <div className="w-full px-margin-mobile md:px-margin-desktop py-12">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="font-headline-lg text-3xl uppercase font-semibold text-primary mb-6">
          Search Catalogue
        </h1>
        <div className="relative flex items-center border-b-2 border-primary pb-2">
          <Search className="w-6 h-6 text-primary mr-3" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="TYPE TO SEARCH PANJABI, JAMDANI, LINEN, STOLE..."
            className="w-full bg-transparent font-label-caps text-lg text-primary placeholder:text-outline focus:outline-none uppercase"
            autoFocus
          />
        </div>

        {/* Search Suggestions */}
        <div className="mt-4 flex flex-wrap justify-center gap-2 font-label-caps text-xs text-secondary uppercase">
          <span>POPULAR SEARCHES:</span>
          {['PANJABI', 'JAMDANI', 'TUNIC', 'BLAZER', 'STOLE'].map((item) => (
            <button
              key={item}
              onClick={() => setQuery(item)}
              className="text-primary font-bold hover:underline"
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {query.trim() !== '' && (
        <div>
          <p className="font-label-caps text-xs text-secondary uppercase mb-6">
            FOUND {searchResults.length} RESULTS FOR "{query.toUpperCase()}"
          </p>

          {searchResults.length === 0 ? (
            <div className="py-16 text-center border border-dashed border-outline-variant">
              <p className="font-label-caps text-sm text-secondary uppercase">
                No matching garments found
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {searchResults.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
