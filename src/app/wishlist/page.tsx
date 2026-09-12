'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { CATALOG_PRODUCTS, ProductItem } from '@/lib/queries/products';
import { useWishlistStore } from '@/lib/store/wishlist';
import { useCartStore } from '@/lib/store/cart';
import { toast } from '@/lib/store/toast';
import { ProductCard } from '@/components/product/ProductCard';
import { QuickViewModal } from '@/components/product/QuickViewModal';
import { Heart, ShoppingBag, Trash2, ArrowRight, Sparkles } from 'lucide-react';

export default function WishlistPage() {
  const { wishlistIds, clearWishlist } = useWishlistStore();
  const { addItem, openDrawer } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<ProductItem | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center text-xs font-mono text-neutral-500 uppercase tracking-widest">
        Loading Wishlist Archive...
      </div>
    );
  }

  const wishlistedProducts = CATALOG_PRODUCTS.filter((p) => wishlistIds.includes(p.id));
  const recommendedProducts = CATALOG_PRODUCTS.filter((p) => !wishlistIds.includes(p.id)).slice(0, 4);

  const handleMoveAllToBag = () => {
    if (wishlistedProducts.length === 0) return;
    wishlistedProducts.forEach((p) => {
      addItem({
        id: p.id,
        title: p.nameEn,
        price: p.priceBDT,
        currency: 'BDT',
        image: p.images[0],
        quantity: 1,
        selectedSize: p.sizes[0] || 'M',
        selectedColor: p.colors[0]?.name || 'Standard',
      });
    });
    clearWishlist();
    toast.success('Moved to Bag', 'All wishlisted garments transferred to your shopping bag.');
    openDrawer();
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-neutral-900 py-10 md:py-16 px-4 sm:px-8 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Header Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-neutral-200 mb-10">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-500 font-bold block mb-2">
              Saved Archives
            </span>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl uppercase font-extrabold tracking-tight text-black">
              Wishlist Archive ({wishlistedProducts.length})
            </h1>
          </div>

          {wishlistedProducts.length > 0 && (
            <div className="flex items-center gap-3">
              <button
                onClick={clearWishlist}
                className="px-4 py-2.5 border border-neutral-300 hover:border-black text-xs font-mono uppercase tracking-wider text-neutral-700 hover:text-black flex items-center gap-2 transition-colors bg-white shadow-xs"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear All</span>
              </button>
              <button
                onClick={handleMoveAllToBag}
                className="px-6 py-2.5 bg-black text-white hover:bg-neutral-800 font-display text-xs uppercase tracking-widest font-bold flex items-center gap-2 transition-colors shadow-md"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Move All to Bag</span>
              </button>
            </div>
          )}
        </div>

        {wishlistedProducts.length === 0 ? (
          /* Empty State */
          <div className="py-20 text-center border border-neutral-200 bg-white p-8 max-w-xl mx-auto mb-16 shadow-sm">
            <div className="w-16 h-16 border border-neutral-200 flex items-center justify-center mx-auto mb-4 text-neutral-400">
              <Heart className="w-8 h-8 stroke-[1.2]" />
            </div>
            <h3 className="font-display text-base font-bold uppercase tracking-widest text-black mb-2">
              Your Wishlist is Empty
            </h3>
            <p className="text-xs text-neutral-600 max-w-sm mx-auto mb-8 font-sans leading-relaxed">
              Curate your personal collection of architectural garments by tapping the heart icon on any piece.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white font-display font-bold text-xs uppercase tracking-widest hover:bg-neutral-800 transition-colors"
            >
              <span>Explore Collection</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-16">
            {wishlistedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={(p) => setQuickViewProduct(p)}
              />
            ))}
          </div>
        )}

        {/* Recommended Archive Pieces */}
        {recommendedProducts.length > 0 && (
          <div className="pt-12 border-t border-neutral-200">
            <div className="flex justify-between items-end mb-8">
              <div>
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-500 font-bold block mb-1">
                  Atelier Curation
                </span>
                <h2 className="font-display text-xl sm:text-2xl font-bold uppercase tracking-tight text-black">
                  Recommended For You
                </h2>
              </div>
              <Link
                href="/shop"
                className="text-xs font-mono uppercase tracking-wider text-neutral-500 hover:text-black hover:underline hidden sm:block"
              >
                View Full Shop →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {recommendedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onQuickView={(p) => setQuickViewProduct(p)}
                />
              ))}
            </div>
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
