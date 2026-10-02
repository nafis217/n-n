'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCartStore } from '@/lib/store/cart';
import { Trash2, ShoppingBag, ArrowRight, Plus, Minus, X, Tag, ShieldCheck, Truck, Sparkles } from 'lucide-react';
import { toast } from '@/lib/store/toast';

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

  if (!mounted) {
    return (
      <div className="min-h-[70vh] bg-white flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const subtotal = getSubtotal();
  const total = getTotal();
  const freeShippingThreshold = 10000;
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const totalItemCount = items.reduce((s, i) => s + i.quantity, 0);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    if (!promoCodeInput.trim()) return;
    const success = applyCoupon(promoCodeInput.trim());
    if (!success) {
      setPromoError('Invalid coupon code. Try "FUKU10" or "BENGAL20".');
    } else {
      toast.success('Coupon Applied', `Code ${promoCodeInput.toUpperCase()} successfully applied.`);
      setPromoCodeInput('');
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-[75vh] bg-[#FFFFFF] flex flex-col items-center justify-center text-center px-6 py-20">
        <div className="w-20 h-20 rounded-full bg-neutral-100 flex items-center justify-center mb-6">
          <ShoppingBag className="w-8 h-8 text-neutral-400 stroke-[1.5]" />
        </div>
        <h1 className="font-display text-2xl sm:text-3xl font-light uppercase tracking-tight text-neutral-900 mb-3">
          Your shopping bag is empty
        </h1>
        <p className="text-sm text-neutral-500 max-w-sm mb-8 leading-relaxed">
          Looks like you haven&apos;t added any items to your bag yet. Explore our latest arrivals or featured collections.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/shop"
            className="px-8 py-3.5 bg-black text-white text-xs uppercase tracking-[0.14em] font-medium hover:bg-neutral-800 transition-colors inline-flex items-center justify-center gap-2 rounded-xs"
          >
            Explore All Garments
            <ArrowRight className="w-4 h-4 stroke-[1.5]" />
          </Link>
          <Link
            href="/new-drop"
            className="px-8 py-3.5 border border-neutral-300 text-black text-xs uppercase tracking-[0.14em] font-medium hover:border-black transition-colors inline-flex items-center justify-center rounded-xs"
          >
            New Arrivals
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black pt-12 pb-24">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12">
        
        {/* Header Breadcrumb & Title */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs text-neutral-400 uppercase tracking-wider mb-2">
            <Link href="/" className="hover:text-black transition-colors">Home</Link>
            <span>/</span>
            <span className="text-neutral-900 font-medium">Shopping Bag</span>
          </div>
          <div className="flex items-baseline justify-between">
            <h1 className="font-display text-3xl sm:text-4xl font-light uppercase tracking-tight text-black">
              Shopping Bag
            </h1>
            <span className="text-xs uppercase tracking-widest text-neutral-500 font-mono">
              {totalItemCount} {totalItemCount === 1 ? 'ITEM' : 'ITEMS'}
            </span>
          </div>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="mb-8 p-4 bg-neutral-50 border border-neutral-200 rounded-sm">
          {amountToFreeShipping > 0 ? (
            <div>
              <div className="flex items-center justify-between text-xs font-medium mb-2">
                <span className="text-neutral-700 flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-neutral-600" />
                  Add <strong className="text-black">৳{amountToFreeShipping.toLocaleString()}</strong> more to get Free Nationwide Delivery
                </span>
                <span className="text-neutral-400 font-mono">
                  {Math.round((subtotal / freeShippingThreshold) * 100)}%
                </span>
              </div>
              <div className="w-full h-1.5 bg-neutral-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-black transition-all duration-500 rounded-full"
                  style={{ width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%` }}
                />
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-xs font-medium text-emerald-800">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>Congratulations! You qualify for <strong>FREE Nationwide Express Delivery</strong>.</span>
            </div>
          )}
        </div>

        {/* Main 2-Column Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* LEFT: Items List (8 cols) */}
          <div className="lg:col-span-8">
            <div className="border border-neutral-200 rounded-sm divide-y divide-neutral-200 bg-white">
              {items.map((item) => (
                <div
                  key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
                  className="p-4 sm:p-6 flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center justify-between"
                >
                  {/* Image & Title Info */}
                  <div className="flex gap-4 items-start sm:items-center flex-1 min-w-0">
                    <Link href={`/product/${item.id}`} className="shrink-0 group">
                      <div className="w-20 h-24 sm:w-24 sm:h-28 bg-neutral-100 rounded-xs relative overflow-hidden border border-neutral-200">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover object-top group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    </Link>

                    <div className="flex-1 min-w-0 space-y-1">
                      <Link
                        href={`/product/${item.id}`}
                        className="text-xs sm:text-sm uppercase tracking-wide font-medium text-neutral-900 hover:text-neutral-500 transition-colors line-clamp-1"
                      >
                        {item.title}
                      </Link>
                      <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-500">
                        {item.selectedColor && (
                          <span className="inline-flex items-center gap-1">
                            Color: <strong className="text-neutral-700 font-normal">{item.selectedColor}</strong>
                          </span>
                        )}
                        {item.selectedSize && (
                          <span className="inline-flex items-center gap-1">
                            · Size: <strong className="text-neutral-700 font-normal">{item.selectedSize}</strong>
                          </span>
                        )}
                      </div>
                      <div className="text-xs font-semibold text-black pt-1">
                        ৳{item.price.toLocaleString()} <span className="text-neutral-400 font-normal">/ unit</span>
                      </div>
                    </div>
                  </div>

                  {/* Quantity & Actions (Responsive for Mobile & Desktop) */}
                  <div className="flex items-center justify-between sm:justify-end gap-4 sm:gap-8 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-neutral-100">
                    {/* Quantity Selector */}
                    <div className="flex items-center border border-neutral-300 rounded-xs bg-white">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1, item.selectedSize, item.selectedColor)}
                        className="w-8 h-8 flex items-center justify-center text-neutral-600 hover:text-black hover:bg-neutral-100 transition-colors cursor-pointer"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5 stroke-[1.5]" />
                      </button>
                      <span className="w-9 text-center text-xs font-medium text-black font-mono">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1, item.selectedSize, item.selectedColor)}
                        className="w-8 h-8 flex items-center justify-center text-neutral-600 hover:text-black hover:bg-neutral-100 transition-colors cursor-pointer"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5 stroke-[1.5]" />
                      </button>
                    </div>

                    {/* Subtotal & Delete */}
                    <div className="text-right">
                      <span className="text-xs sm:text-sm font-semibold text-black block">
                        ৳{(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>

                    <button
                      onClick={() => {
                        removeItem(item.id, item.selectedSize, item.selectedColor);
                        toast.info('Item Removed', `${item.title} removed from bag.`);
                      }}
                      className="p-1.5 text-neutral-400 hover:text-red-600 transition-colors cursor-pointer rounded-xs"
                      aria-label="Remove item"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4 stroke-[1.5]" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Actions */}
            <div className="mt-6 flex items-center justify-between">
              <Link
                href="/shop"
                className="text-xs uppercase tracking-wider font-medium text-neutral-600 hover:text-black transition-colors flex items-center gap-1.5"
              >
                ← Continue Shopping
              </Link>
            </div>
          </div>

          {/* RIGHT: Order Summary (4 cols sticky) */}
          <div className="lg:col-span-4 lg:sticky lg:top-24">
            <div className="bg-neutral-50 border border-neutral-200 rounded-sm p-6 space-y-6">
              <h2 className="text-xs uppercase tracking-[0.14em] font-semibold text-neutral-900 border-b border-neutral-200 pb-3">
                Order Summary
              </h2>

              {/* Promo code Form */}
              <div>
                <label className="text-[11px] uppercase tracking-wider text-neutral-500 font-medium block mb-2">
                  Have a Promo Code?
                </label>
                {couponCode ? (
                  <div className="flex items-center justify-between p-2.5 bg-emerald-50 border border-emerald-200 rounded-xs text-xs">
                    <span className="text-emerald-800 font-medium flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5 text-emerald-600" />
                      {couponCode} (−৳{discount.toLocaleString()})
                    </span>
                    <button
                      onClick={removeCoupon}
                      className="text-neutral-500 hover:text-neutral-900 text-xs underline cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g. FUKU10"
                      value={promoCodeInput}
                      onChange={(e) => setPromoCodeInput(e.target.value.toUpperCase())}
                      className="flex-1 border border-neutral-300 rounded-xs px-3 py-2 text-xs uppercase tracking-wider placeholder-neutral-400 bg-white focus:outline-none focus:border-black transition-colors"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-neutral-900 text-white text-xs uppercase tracking-wider font-medium hover:bg-black transition-colors rounded-xs cursor-pointer"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {promoError && <p className="text-[11px] text-red-600 mt-1.5">{promoError}</p>}
              </div>

              {/* Breakdown */}
              <div className="space-y-3 text-xs border-y border-neutral-200 py-4">
                <div className="flex justify-between text-neutral-600">
                  <span>Bag Subtotal</span>
                  <span className="text-neutral-900 font-medium">৳{subtotal.toLocaleString()}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Promo Discount</span>
                    <span className="font-medium">−৳{discount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-neutral-600">
                  <span>Estimated Delivery</span>
                  <span className="text-neutral-900 font-medium">
                    {subtotal >= freeShippingThreshold ? 'FREE' : `৳${(shippingFee || 80).toLocaleString()}`}
                  </span>
                </div>
              </div>

              {/* Total */}
              <div className="flex items-baseline justify-between text-sm">
                <span className="font-semibold uppercase tracking-wider text-black">Estimated Total</span>
                <span className="text-lg font-bold text-black font-mono">
                  ৳{total.toLocaleString()}
                </span>
              </div>

              {/* Checkout CTA */}
              <Link
                href="/checkout"
                className="w-full py-4 bg-black text-white text-xs uppercase tracking-[0.16em] font-medium flex items-center justify-center gap-2 hover:bg-neutral-800 transition-colors rounded-xs group shadow-xs"
              >
                Proceed to Checkout
                <ArrowRight className="w-4 h-4 stroke-[1.5] group-hover:translate-x-1 transition-transform" />
              </Link>

              {/* Trust Badges */}
              <div className="pt-2 space-y-2 border-t border-neutral-200 text-[11px] text-neutral-500">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-neutral-700 shrink-0" />
                  <span>Encrypted 256-bit secure checkout</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-3.5 h-3.5 text-neutral-700 shrink-0" />
                  <span>24–48hr delivery in Dhaka, 3–5 days nationwide</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
