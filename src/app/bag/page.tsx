'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCartStore } from '@/lib/store/cart';
import { useWishlistStore } from '@/lib/store/wishlist';
import { Trash2, ShoppingBag, ArrowRight, Plus, Minus, X } from 'lucide-react';

export default function ShoppingBagPage() {
  const {
    items,
    removeItem,
    updateQuantity,
    getSubtotal,
    getTotal,
    couponCode,
    discount,
    applyCoupon,
    removeCoupon,
    shippingFee,
  } = useCartStore();

  const [promoCodeInput, setPromoCodeInput] = useState('');
  const [promoError, setPromoError] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return (
    <div className="min-h-screen bg-[#FAFAF8] flex items-center justify-center">
      <p className="text-label text-[#9B9B9B] uppercase tracking-[0.12em]">Loading...</p>
    </div>
  );

  const subtotal = getSubtotal();
  const total = getTotal();
  const freeShippingThreshold = 10000;
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    if (!promoCodeInput.trim()) return;
    const success = applyCoupon(promoCodeInput);
    if (!success) {
      setPromoError('Invalid code. Try "FUKU10" or "BENGAL20".');
    } else {
      setPromoCodeInput('');
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#FAFAF8] flex flex-col items-center justify-center text-center px-6 pt-24">
        <ShoppingBag className="w-10 h-10 text-[#D9D9D6] stroke-[1] mb-6" />
        <h1
          className="font-display font-light text-[#111111] mb-3"
          style={{ fontSize: 'clamp(24px, 3vw, 36px)', letterSpacing: '-0.02em' }}
        >
          Your bag is empty.
        </h1>
        <p className="text-body text-[#9B9B9B] mb-8">Add garments to your bag to continue.</p>
        <Link
          href="/shop"
          className="px-6 py-3 bg-[#111111] text-white text-label uppercase tracking-[0.12em] hover:bg-[#333] transition-colors duration-150 inline-flex items-center gap-2"
        >
          Continue Shopping
          <ArrowRight className="w-3.5 h-3.5 stroke-[1.25]" />
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAF8] text-[#111111] pt-24">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 pb-20">

        {/* Page title */}
        <h1
          className="font-display font-light text-[#111111] mb-2"
          style={{ fontSize: 'clamp(28px, 4vw, 48px)', letterSpacing: '-0.025em' }}
        >
          Your Bag
        </h1>
        <p className="text-label text-[#9B9B9B] mb-10">
          {items.reduce((s, i) => s + i.quantity, 0)} item{items.reduce((s, i) => s + i.quantity, 0) !== 1 ? 's' : ''}
        </p>

        {/* Free shipping bar */}
        {amountToFreeShipping > 0 && (
          <div className="mb-8 py-3 border-y border-[#E8E8E5]">
            <p className="text-label text-[#6B6B6B]">
              Add ৳{amountToFreeShipping.toLocaleString()} more for free delivery
            </p>
            <div className="mt-2 h-px bg-[#E8E8E5] relative">
              <div
                className="absolute left-0 top-0 h-px bg-[#111111] transition-all duration-500"
                style={{ width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%` }}
              />
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">

          {/* Items table */}
          <div className="lg:col-span-8">
            {/* Column headers (desktop only) */}
            <div className="hidden md:grid grid-cols-12 gap-4 pb-3 border-b border-[#E8E8E5]">
              <div className="col-span-6 text-editorial-label">Product</div>
              <div className="col-span-2 text-editorial-label text-center">Qty</div>
              <div className="col-span-3 text-editorial-label text-right">Price</div>
              <div className="col-span-1" />
            </div>

            <div className="divide-y divide-[#E8E8E5]">
              {items.map((item) => (
                <div
                  key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
                  className="grid grid-cols-12 gap-4 py-6 items-center"
                >
                  {/* Image + info */}
                  <div className="col-span-10 md:col-span-6 flex gap-4">
                    <Link href={`/product/${item.id}`} className="shrink-0">
                      <div className="w-[72px] h-[90px] bg-[#F3F3F1] relative overflow-hidden">
                        <Image src={item.image} alt={item.title} fill className="object-cover" />
                      </div>
                    </Link>
                    <div className="flex flex-col justify-center min-w-0">
                      <Link
                        href={`/product/${item.id}`}
                        className="text-label uppercase tracking-[0.08em] text-[#111111] hover:opacity-60 transition-opacity line-clamp-1"
                      >
                        {item.title}
                      </Link>
                      <div className="text-label text-[#9B9B9B] mt-1 space-x-2">
                        {item.selectedColor && <span>{item.selectedColor}</span>}
                        {item.selectedSize && <span>· Size {item.selectedSize}</span>}
                      </div>
                      <p className="text-label text-[#111111] mt-1 md:hidden">
                        ৳{(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* Qty (desktop) */}
                  <div className="hidden md:flex col-span-2 items-center justify-center">
                    <div className="flex items-center border border-[#D9D9D6]">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1, item.selectedSize, item.selectedColor)}
                        className="w-7 h-7 flex items-center justify-center text-[#6B6B6B] hover:text-[#111111] transition-colors cursor-pointer"
                      >
                        <Minus className="w-3 h-3 stroke-[1.25]" />
                      </button>
                      <span className="w-7 text-center text-label text-[#111111]">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1, item.selectedSize, item.selectedColor)}
                        className="w-7 h-7 flex items-center justify-center text-[#6B6B6B] hover:text-[#111111] transition-colors cursor-pointer"
                      >
                        <Plus className="w-3 h-3 stroke-[1.25]" />
                      </button>
                    </div>
                  </div>

                  {/* Price (desktop) */}
                  <div className="hidden md:block col-span-3 text-right text-label text-[#111111]">
                    ৳{(item.price * item.quantity).toLocaleString()}
                  </div>

                  {/* Remove */}
                  <div className="col-span-2 md:col-span-1 flex justify-end">
                    <button
                      onClick={() => removeItem(item.id, item.selectedSize, item.selectedColor)}
                      className="text-[#D9D9D6] hover:text-[#111111] transition-colors cursor-pointer p-1"
                      aria-label="Remove item"
                    >
                      <X className="w-3.5 h-3.5 stroke-[1.25]" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Continue shopping */}
            <div className="pt-6 border-t border-[#E8E8E5]">
              <Link
                href="/shop"
                className="text-label uppercase tracking-[0.1em] text-[#6B6B6B] hover:text-[#111111] transition-colors flex items-center gap-1.5"
              >
                ← Continue Shopping
              </Link>
            </div>
          </div>

          {/* Order summary */}
          <div className="lg:col-span-4">
            <div className="bg-white border border-[#E8E8E5] p-6 space-y-5">
              <h2 className="text-label uppercase tracking-[0.12em] text-[#111111] border-b border-[#E8E8E5] pb-4">
                Order Summary
              </h2>

              {/* Promo code */}
              {couponCode ? (
                <div className="flex items-center justify-between text-label">
                  <span className="text-[#286749] uppercase tracking-[0.08em]">
                    {couponCode} (−৳{discount.toLocaleString()})
                  </span>
                  <button onClick={removeCoupon} className="text-[#9B9B9B] hover:text-[#111111] transition-colors underline cursor-pointer">
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Promo code"
                    value={promoCodeInput}
                    onChange={(e) => setPromoCodeInput(e.target.value.toUpperCase())}
                    className="flex-1 border border-[#D9D9D6] px-3 py-2 text-label text-[#111111] placeholder-[#9B9B9B] uppercase tracking-[0.08em] focus:outline-none focus:border-[#111111] transition-colors bg-transparent"
                  />
                  <button
                    type="submit"
                    className="px-3 py-2 border border-[#111111] text-label uppercase tracking-[0.08em] text-[#111111] hover:bg-[#111111] hover:text-white transition-all duration-150 cursor-pointer"
                  >
                    Apply
                  </button>
                </form>
              )}
              {promoError && <p className="text-label text-[#B42318]">{promoError}</p>}

              {/* Line items */}
              <div className="space-y-2 text-label border-b border-[#E8E8E5] pb-4">
                <div className="flex justify-between">
                  <span className="text-[#6B6B6B] uppercase tracking-[0.08em]">Subtotal</span>
                  <span className="text-[#111111]">৳{subtotal.toLocaleString()}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between">
                    <span className="text-[#286749] uppercase tracking-[0.08em]">Discount</span>
                    <span className="text-[#286749]">−৳{discount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-[#6B6B6B] uppercase tracking-[0.08em]">Delivery</span>
                  <span className="text-[#111111]">{subtotal >= freeShippingThreshold ? 'Free' : `৳${(shippingFee || 80).toLocaleString()}`}</span>
                </div>
              </div>

              <div className="flex justify-between text-label">
                <span className="text-[#111111] uppercase tracking-[0.08em]">Total</span>
                <span className="text-[#111111] font-medium text-[15px]">৳{total.toLocaleString()}</span>
              </div>

              <Link
                href="/checkout"
                className="w-full py-4 bg-[#111111] text-white text-label uppercase tracking-[0.12em] flex items-center justify-center gap-2 hover:bg-[#333] transition-colors duration-150 group"
              >
                Checkout
                <ArrowRight className="w-3.5 h-3.5 stroke-[1.25] group-hover:translate-x-0.5 transition-transform duration-150" />
              </Link>

              <p className="text-label text-[#9B9B9B] text-center">
                Secure checkout · Hassle-free returns
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
