'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCartStore } from '@/lib/store/cart';
import { X, Plus, Minus, Trash2, ArrowRight, ShoppingBag, Tag, Sparkles } from 'lucide-react';

export function CartDrawer() {
  const {
    items,
    isDrawerOpen,
    closeDrawer,
    removeItem,
    updateQuantity,
    getSubtotal,
    getTotal,
    couponCode,
    discount,
    applyCoupon,
    removeCoupon,
  } = useCartStore();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const subtotal = getSubtotal();
  const total = getTotal();
  const freeShippingThreshold = 10000;
  const progressToFreeShipping = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    if (!couponInput.trim()) return;
    const success = applyCoupon(couponInput);
    if (!success) {
      setCouponError('Invalid voucher code. Try "FUKU10" or "BENGAL20"');
    } else {
      setCouponInput('');
    }
  };

  if (!isDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-[9990] overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={closeDrawer}
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-300"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white border-l border-neutral-200 text-black flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="p-6 border-b border-neutral-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-5 h-5 text-black" />
              <h2 className="font-display text-sm tracking-[0.2em] uppercase font-bold text-black">
                Bag Archive ({items.reduce((sum, item) => sum + item.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={closeDrawer}
              className="p-1 text-neutral-500 hover:text-black transition-colors cursor-pointer"
              aria-label="Close cart drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress */}
          <div className="px-6 py-3 bg-neutral-50 border-b border-neutral-200">
            <div className="flex items-center justify-between text-[11px] uppercase tracking-wider mb-1.5 font-mono text-neutral-600">
              {amountToFreeShipping === 0 ? (
                <span className="text-black font-bold flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Complimentary Delivery Unlocked
                </span>
              ) : (
                <span>Add ৳{amountToFreeShipping.toLocaleString()} for Free Delivery</span>
              )}
              <span className="text-black font-bold">{progressToFreeShipping}%</span>
            </div>
            <div className="w-full h-1 bg-neutral-200 rounded-none overflow-hidden">
              <div
                className="h-full bg-black transition-all duration-500 ease-out"
                style={{ width: `${progressToFreeShipping}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 divide-y divide-neutral-200 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 border border-neutral-300 flex items-center justify-center mb-4 text-neutral-400">
                  <ShoppingBag className="w-8 h-8 stroke-[1.2]" />
                </div>
                <h3 className="font-display uppercase tracking-widest text-xs font-bold text-black mb-1">
                  Your Bag is Empty
                </h3>
                <p className="text-xs text-neutral-500 max-w-[220px] mb-6">
                  Explore our modern garments and limited drops to curate your collection.
                </p>
                <Link
                  href="/shop"
                  onClick={closeDrawer}
                  className="px-6 py-3 bg-black text-white font-display font-bold uppercase tracking-widest text-[11px] hover:bg-neutral-800 transition-colors"
                >
                  Explore Collection
                </Link>
              </div>
            ) : (
              items.map((item) => (
                <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="pt-4 first:pt-0 flex gap-4 group">
                  {/* Thumbnail */}
                  <div className="w-20 h-24 bg-neutral-100 relative overflow-hidden shrink-0 border border-neutral-200">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <Link
                          href={`/product/${item.id}`}
                          onClick={closeDrawer}
                          className="font-display text-xs tracking-wider uppercase font-semibold text-black hover:underline transition-colors line-clamp-1"
                        >
                          {item.title}
                        </Link>
                        <button
                          onClick={() => removeItem(item.id, item.selectedSize, item.selectedColor)}
                          className="text-neutral-400 hover:text-black transition-colors p-0.5 cursor-pointer"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex items-center gap-2 mt-1 text-[10px] uppercase font-mono text-neutral-500">
                        {item.selectedSize && <span>Size: <strong className="text-black">{item.selectedSize}</strong></span>}
                        {item.selectedColor && (
                          <>
                            <span>•</span>
                            <span>{item.selectedColor}</span>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity Controller */}
                      <div className="flex items-center border border-neutral-300 bg-white">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1, item.selectedSize, item.selectedColor)}
                          className="w-6 h-6 flex items-center justify-center text-neutral-600 hover:text-black transition-colors cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-7 text-center font-mono text-xs text-black font-bold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1, item.selectedSize, item.selectedColor)}
                          className="w-6 h-6 flex items-center justify-center text-neutral-600 hover:text-black transition-colors cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Item Total */}
                      <div className="text-xs font-mono font-bold text-black tracking-wider">
                        ৳{(item.price * item.quantity).toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Actions */}
          {items.length > 0 && (
            <div className="p-6 border-t border-neutral-200 bg-neutral-50 space-y-4">
              {/* Coupon Code Section */}
              {couponCode ? (
                <div className="flex items-center justify-between bg-neutral-100 px-3 py-2 border border-neutral-300 text-xs font-mono">
                  <span className="text-black font-bold flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5" /> Voucher {couponCode} (-৳{discount.toLocaleString()})
                  </span>
                  <button
                    onClick={removeCoupon}
                    className="text-neutral-500 hover:text-black text-[11px] underline cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      placeholder="Promo Code (e.g. FUKU10)"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                      className="w-full bg-white border border-neutral-300 px-3 py-2 text-xs text-black placeholder-neutral-400 uppercase tracking-wider focus:outline-none focus:border-black transition-colors"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-black text-white hover:bg-neutral-800 font-display text-[11px] uppercase tracking-widest font-semibold transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </form>
              )}
              {couponError && <p className="text-[10px] text-red-600">{couponError}</p>}

              {/* Subtotal & Breakdown */}
              <div className="space-y-1.5 text-xs font-mono pt-1">
                <div className="flex justify-between text-neutral-600">
                  <span>Subtotal</span>
                  <span className="text-black font-semibold">৳{subtotal.toLocaleString()}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-black font-bold">
                    <span>Discount</span>
                    <span>-৳{discount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-black font-bold pt-2 border-t border-neutral-200 text-sm">
                  <span className="font-display tracking-wider uppercase">Estimated Total</span>
                  <span>৳{total.toLocaleString()}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <Link
                  href="/bag"
                  onClick={closeDrawer}
                  className="w-full py-3.5 text-center border border-black text-black hover:bg-black hover:text-white font-display text-xs font-bold uppercase tracking-widest transition-all"
                >
                  View Bag
                </Link>
                <Link
                  href="/checkout"
                  onClick={closeDrawer}
                  className="w-full py-3.5 text-center bg-black text-white hover:bg-neutral-800 font-display text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all group"
                >
                  <span>Checkout</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
