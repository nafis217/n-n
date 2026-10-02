'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCartStore } from '@/lib/store/cart';
import { X, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';
import { SHMonogram } from '../brand/SHMonogram';

export function CartDrawer() {
  const {
    items,
    isDrawerOpen,
    closeDrawer,
    removeItem,
    updateQuantity,
    getSubtotal,
    getTotal,
  } = useCartStore();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  if (!isDrawerOpen) return null;

  const subtotal = getSubtotal();
  const total = getTotal();
  const totalCount = items.reduce((s, i) => s + i.quantity, 0);

  return (
    <div className="fixed inset-0 z-[9990] overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={closeDrawer}
        className="absolute inset-0 bg-[#241E1A]/50 backdrop-blur-xs transition-opacity duration-300"
      />

      {/* Drawer Panel */}
      <div className="absolute inset-y-0 right-0 w-full max-w-[420px] bg-[#F2EDE4] flex flex-col border-l border-[#B8B0A3]/40 shadow-2xl transition-transform duration-300">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#B8B0A3]/30">
          <div className="flex items-center gap-2.5">
            <SHMonogram size={20} variant="dark" />
            <span className="text-xs uppercase font-medium tracking-[0.2em] text-[#241E1A]">
              Shopping Bag ({totalCount})
            </span>
          </div>
          <button
            onClick={closeDrawer}
            className="p-1.5 text-[#686B5E] hover:text-[#241E1A] transition-colors"
            aria-label="Close Bag"
          >
            <X size={18} strokeWidth={1.5} />
          </button>
        </div>

        {/* Item List */}
        <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-[#B8B0A3]/25">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-16">
              <SHMonogram size={36} variant="stone" className="mb-4 opacity-60" />
              <p className="font-serif text-lg text-[#241E1A] mb-1">YOUR BAG IS EMPTY</p>
              <p className="text-xs text-[#686B5E] max-w-[240px] mb-6">
                Discover pieces shaped by timeless proportions and refined craftsmanship.
              </p>
              <Link
                href="/collections/new-arrivals"
                onClick={closeDrawer}
                className="sh-btn-primary text-[10px] tracking-[0.2em]"
              >
                Explore Collection
              </Link>
            </div>
          ) : (
            items.map((item) => {
              const itemId = item.id || item.productId || '';
              const itemPrice = item.price || item.priceBDT || 0;
              const itemSize = item.selectedSize || item.size || 'M';
              const itemColor = item.selectedColor || item.color || '';

              return (
                <div key={`${itemId}-${itemSize}-${itemColor}`} className="py-4 flex gap-4 group">
                  {/* Product Image */}
                  <div className="w-20 h-26 bg-[#EBE5DB] flex-shrink-0 overflow-hidden">
                    <img
                      src={item.image || '/images/products/architectural-black-suit-1.jpg'}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <Link
                          href={`/products/${itemId}`}
                          onClick={closeDrawer}
                          className="text-xs font-serif text-[#241E1A] hover:text-[#686B5E] transition-colors leading-snug line-clamp-2"
                        >
                          {item.title}
                        </Link>
                        <button
                          onClick={() => removeItem(itemId, itemSize, itemColor)}
                          className="text-[#B8B0A3] hover:text-[#542B2E] transition-colors p-1"
                          aria-label="Remove item"
                        >
                          <Trash2 size={13} strokeWidth={1.5} />
                        </button>
                      </div>

                      <div className="flex items-center gap-3 text-[11px] text-[#686B5E] tracking-wider mt-1">
                        {itemSize && <span>Size: {itemSize}</span>}
                        {itemColor && <span>• Color: {itemColor}</span>}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3 pt-2">
                      {/* Quantity controls */}
                      <div className="flex items-center border border-[#B8B0A3]/50 bg-transparent">
                        <button
                          onClick={() => updateQuantity(itemId, item.quantity - 1, itemSize, itemColor)}
                          className="px-2 py-1 text-[#241E1A] hover:bg-[#EBE5DB] transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={11} strokeWidth={1.5} />
                        </button>
                        <span className="px-2.5 text-xs text-[#241E1A] font-medium select-none">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(itemId, item.quantity + 1, itemSize, itemColor)}
                          className="px-2 py-1 text-[#241E1A] hover:bg-[#EBE5DB] transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus size={11} strokeWidth={1.5} />
                        </button>
                      </div>

                      {/* Price */}
                      <span className="text-xs font-sans font-medium text-[#241E1A] tracking-wider">
                        BDT {(itemPrice * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer & Checkout CTA */}
        {items.length > 0 && (
          <div className="p-6 border-t border-[#B8B0A3]/30 bg-[#EBE5DB]/60">
            <div className="flex items-center justify-between text-xs tracking-wider uppercase mb-2">
              <span className="text-[#686B5E]">Subtotal</span>
              <span className="text-[#241E1A] font-medium">BDT {subtotal.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between text-xs tracking-wider uppercase text-[#686B5E] mb-4">
              <span>Shipping & Taxes</span>
              <span>Calculated at checkout</span>
            </div>

            <Link
              href="/checkout"
              onClick={closeDrawer}
              className="w-full sh-btn-primary flex items-center justify-between gap-2"
            >
              <span>Proceed to Checkout</span>
              <span>BDT {total.toLocaleString()}</span>
            </Link>

            <p className="text-[10px] text-center text-[#686B5E] tracking-widest uppercase mt-3">
              Complimentary signature packaging with every order
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
