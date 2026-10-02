'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCartStore } from '@/lib/store/cart';
import { SHMonogram } from '@/components/brand/SHMonogram';
import { Trash2, Plus, Minus, ArrowRight, ShieldCheck, Truck, RotateCcw } from 'lucide-react';

export default function CartPage() {
  const {
    items,
    removeItem,
    updateQuantity,
    getSubtotal,
    getTotal,
    shippingFee,
  } = useCartStore();

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const subtotal = getSubtotal();
  const total = getTotal();
  const totalCount = items.reduce((s, i) => s + i.quantity, 0);

  if (items.length === 0) {
    return (
      <div className="min-h-[75vh] bg-[#F2EDE4] text-[#241E1A] flex flex-col items-center justify-center text-center px-4 py-24">
        <SHMonogram size={48} variant="stone" className="mb-6 opacity-60" />
        <h1 className="text-3xl sm:text-4xl font-serif text-[#241E1A] mb-3">
          YOUR BAG IS EMPTY
        </h1>
        <p className="text-sm text-[#686B5E] max-w-sm mb-8 leading-relaxed">
          Discover pieces shaped by timeless proportions, considered materials and refined craftsmanship.
        </p>
        <Link href="/collections/new-arrivals" className="sh-btn-primary">
          Explore Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F2EDE4] text-[#241E1A] pt-8 sm:pt-12 pb-32">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
        {/* Header */}
        <div className="border-b border-[#B8B0A3]/30 pb-6 mb-12 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#A8946C] block mb-1 font-semibold">
              Client Order
            </span>
            <h1 className="text-3xl sm:text-4xl font-serif text-[#241E1A]">
              Shopping Bag ({totalCount})
            </h1>
          </div>
          <Link href="/collections/clothing" className="text-xs uppercase tracking-[0.18em] text-[#686B5E] hover:text-[#241E1A]">
            Continue Browsing
          </Link>
        </div>

        {/* Split: Items & Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Items List */}
          <div className="lg:col-span-8 divide-y divide-[#B8B0A3]/30 border-y border-[#B8B0A3]/30">
            {items.map((item) => (
              <div key={`${item.productId || item.id}-${item.selectedSize}-${item.selectedColor}`} className="py-6 flex gap-6">
                <div className="w-24 sm:w-32 aspect-[3/4] bg-[#EBE5DB] flex-shrink-0 overflow-hidden">
                  <img
                    src={item.image || '/images/products/architectural-black-suit-1.jpg'}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h2 className="font-serif text-base sm:text-lg text-[#241E1A] leading-snug">
                          {item.title}
                        </h2>
                        <div className="flex items-center gap-3 text-xs text-[#686B5E] tracking-wider uppercase mt-1">
                          {item.selectedSize && <span>Size: {item.selectedSize}</span>}
                          {item.selectedColor && <span>• Shade: {item.selectedColor}</span>}
                        </div>
                      </div>
                      <span className="font-sans font-medium text-sm sm:text-base text-[#241E1A] whitespace-nowrap">
                        BDT {(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-6">
                    {/* Quantity controls */}
                    <div className="flex items-center border border-[#B8B0A3]/60 bg-transparent">
                      <button
                        onClick={() => updateQuantity(item.productId || item.id, item.quantity - 1, item.selectedSize, item.selectedColor)}
                        className="px-3 py-1 text-[#241E1A] hover:bg-[#EBE5DB] transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={12} strokeWidth={1.5} />
                      </button>
                      <span className="px-3 text-xs text-[#241E1A] font-medium select-none">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.productId || item.id, item.quantity + 1, item.selectedSize, item.selectedColor)}
                        className="px-3 py-1 text-[#241E1A] hover:bg-[#EBE5DB] transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus size={12} strokeWidth={1.5} />
                      </button>
                    </div>

                    <button
                      onClick={() => removeItem(item.productId || item.id, item.selectedSize, item.selectedColor)}
                      className="text-xs uppercase tracking-wider text-[#686B5E] hover:text-[#542B2E] transition-colors flex items-center gap-1.5"
                    >
                      <Trash2 size={13} strokeWidth={1.5} />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary Sticky Panel */}
          <div className="lg:col-span-4 bg-[#EBE5DB] p-8 border border-[#B8B0A3]/40 flex flex-col justify-between">
            <div>
              <h3 className="font-serif text-xl text-[#241E1A] mb-6">
                Order Summary
              </h3>

              <div className="space-y-3 text-xs tracking-wider uppercase border-b border-[#B8B0A3]/30 pb-6 mb-6">
                <div className="flex justify-between text-[#686B5E]">
                  <span>Subtotal</span>
                  <span className="text-[#241E1A] font-medium">BDT {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[#686B5E]">
                  <span>Packaging</span>
                  <span className="text-[#A8946C]">Complimentary</span>
                </div>
                <div className="flex justify-between text-[#686B5E]">
                  <span>Estimated Delivery</span>
                  <span className="text-[#241E1A]">Calculated at Checkout</span>
                </div>
              </div>

              <div className="flex justify-between items-baseline mb-6 text-sm tracking-wider uppercase">
                <span className="font-serif text-base text-[#241E1A]">Total</span>
                <span className="font-sans font-medium text-lg text-[#241E1A]">
                  BDT {total.toLocaleString()}
                </span>
              </div>

              <Link
                href="/checkout"
                className="w-full sh-btn-primary flex items-center justify-between"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            <div className="mt-8 pt-6 border-t border-[#B8B0A3]/30 space-y-2 text-[11px] text-[#686B5E]">
              <p>• Signature rigid garment box included</p>
              <p>• 14-day return privilege across all garments</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
