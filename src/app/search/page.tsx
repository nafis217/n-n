'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Search, X, ShoppingBag, ArrowRight } from 'lucide-react';
import { ProductCard } from '@/components/product/ProductCard';
import { QuickViewModal } from '@/components/product/QuickViewModal';
import { searchProducts, ProductItem } from '@/lib/queries/products';

function SearchPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialQuery = searchParams.get('q') || '';

  const [query, setQuery] = useState(initialQuery);
  const [quickViewProduct, setQuickViewProduct] = useState<ProductItem | null>(null);

  useEffect(() => {
    const q = searchParams.get('q');
    if (q !== null) {
      setQuery(q);
    }
  }, [searchParams]);

  const searchResults = query.trim() ? searchProducts(query) : [];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const POPULAR_SEARCHES = [
    'Tactical Kimono',
    'Heavyweight Tee',
    'Jamdani Saree',
    'Khadi Panjabi',
    'Linen Blazer',
    'Pleated Trouser',
    'Leather Tote',
    'Sterling Silver',
  ];

  return (
    <div className="min-h-screen bg-[#0E0F10] text-[#F3EFE7] py-10 md:py-16 px-4 sm:px-8 md:px-12">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Search Bar Header */}
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#FF3B30] font-bold block">
            Archive Discovery
          </span>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-white">
            Search Garments &amp; Collections
          </h1>

          <form onSubmit={handleSearchSubmit} className="relative border-b-2 border-white pb-3 flex items-center gap-4">
            <Search className="w-6 h-6 text-white/80 shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search kimonos, tees, jamdani, trousers, accessories..."
              className="w-full font-display text-lg sm:text-2xl text-white placeholder-[#686D71] bg-transparent border-none focus:outline-none uppercase font-bold tracking-wider"
              autoFocus
            />
            {query && (
              <button
                type="button"
                onClick={() => {
                  setQuery('');
                  router.push('/search');
                }}
                className="text-[#8C9094] hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </form>

          {/* Popular Search Suggestions */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            <span className="font-mono text-xs text-[#8C9094] uppercase tracking-wider mr-2">
              Popular Inquiries:
            </span>
            {POPULAR_SEARCHES.map((term) => (
              <button
                key={term}
                onClick={() => {
                  setQuery(term);
                  router.push(`/search?q=${encodeURIComponent(term)}`);
                }}
                className="px-3 py-1 bg-[#18191B] border border-[#2B2E31] text-xs font-mono text-[#A0A4A8] hover:text-white hover:border-white uppercase transition-colors"
              >
                {term}
              </button>
            ))}
          </div>
        </div>

        {/* Results Area */}
        {query.trim() !== '' && (
          <div className="space-y-6 pt-6 border-t border-[#202224]">
            <div className="flex justify-between items-center text-xs font-mono uppercase tracking-wider text-[#8C9094]">
              <span>
                Found <strong className="text-white">{searchResults.length}</strong> Archive Garments for &quot;{query}&quot;
              </span>
            </div>

            {searchResults.length === 0 ? (
              /* No results state */
              <div className="py-20 text-center border border-[#242628] bg-[#121315] p-8 max-w-xl mx-auto">
                <ShoppingBag className="w-12 h-12 text-[#6A6E72] mx-auto mb-4 stroke-[1.2]" />
                <h3 className="font-display text-base font-bold uppercase tracking-widest text-white mb-2">
                  No Matching Garments Found
                </h3>
                <p className="text-xs text-[#8C9094] max-w-sm mx-auto mb-6 font-sans">
                  We could not locate any pieces matching &quot;{query}&quot;. Try broader terms like &quot;tee&quot;, &quot;kimono&quot;, &quot;panjabi&quot;, or &quot;trouser&quot;.
                </p>
                <Link
                  href="/shop"
                  className="inline-block px-8 py-3.5 bg-white text-black font-display font-bold text-xs uppercase tracking-widest hover:bg-[#E5E0D8]"
                >
                  Browse Full Shop
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {searchResults.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onQuickView={(p) => setQuickViewProduct(p)}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <QuickViewModal
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#0E0F10] flex items-center justify-center text-xs font-mono uppercase tracking-widest text-[#8C9094]">
          Searching Archive Database...
        </div>
      }
    >
      <SearchPageContent />
    </Suspense>
  );
}
