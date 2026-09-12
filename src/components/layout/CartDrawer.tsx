'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCartStore } from '@/lib/store/cart';
import { X, Plus, Minus, Trash2, ArrowRight, ShoppingBag } from 'lucide-react';

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

  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return null;

  const subtotal = getSubtotal();
  const total = getTotal();
  const freeShippingThreshold = 10000;
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    if (!couponInput.trim()) return;
    const success = applyCoupon(couponInput);
    if (!success) {
      setCouponError('Invalid code. Try "FUKU10" or "BENGAL20"');
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
        className="absolute inset-0 bg-black/40 transition-opacity animate-reveal-in"
      />

      {/* Drawer Panel */}
      <div className="absolute inset-y-0 right-0 w-full max-w-[400px] bg-white flex flex-col animate-slide-in-right border-l border-[#E8E8E5]">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#E8E8E5]">
          <div>
            <h2 className="text-label uppercase tracking-[0.12em] text-[#111111]">Your Bag</h2>
            {items.length > 0 && (
              <p className="text-label text-[#9B9B9B] mt-0.5">
                {items.reduce((s, i) => s + i.quantity, 0)} item{items.reduce((s, i) => s + i.quantity, 0) !== 1 ? 's' : ''}
              </p>
            )}
          </div>
          <button
            onClick={closeDrawer}
            className="p-2 text-[#9B9B9B] hover:text-[#111111] transition-colors duration-150 cursor-pointer -mr-2"
            aria-label="Close"
          >
            <X className="w-[18px] h-[18px] stroke-[1.25]" />
          </button>
        </div>

        {/* Free shipping indicator */}
        {items.length > 0 && amountToFreeShipping > 0 && (
          <div className="px-6 py-3 bg-[#F3F3F1] border-b border-[#E8E8E5]">
            <p className="text-label text-[#6B6B6B]">
              Add ৳{amountToFreeShipping.toLocaleString()} for free delivery
            </p>
            <div className="mt-2 h-px bg-[#D9D9D6] relative">
              <div
                className="absolute left-0 top-0 h-px bg-[#111111] transition-all duration-500"
                style={{ width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%` }}
              />
            </div>
          </div>
        )}
        {items.length > 0 && amountToFreeShipping === 0 && (
          <div className="px-6 py-3 bg-[#F3F3F1] border-b border-[#E8E8E5]">
            <p className="text-label text-[#286749]">Free delivery unlocked</p>
          </div>
        )}

        {/* Items list */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center px-8 py-16">
              <ShoppingBag className="w-8 h-8 text-[#D9D9D6] stroke-[1] mb-5" />
              <p className="text-body text-[#111111] mb-1 uppercase tracking-wider">Your bag is empty</p>
              <p className="text-body-sm text-[#9B9B9B] mb-8">Add garments to your bag to continue</p>
              <button
                onClick={closeDrawer}
                className="px-6 py-3 bg-[#111111] text-white text-label uppercase tracking-[0.12em] hover:bg-[#333] transition-colors duration-150 cursor-pointer"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="divide-y divide-[#E8E8E5]">
              {items.map((item) => (
                <div
                  key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
                  className="flex gap-4 px-6 py-5"
                >
                  {/* Product image */}
                  <Link href={`/product/${item.id}`} onClick={closeDrawer} className="shrink-0">
                    <div className="w-[64px] h-[80px] bg-[#F3F3F1] relative overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </Link>

                  {/* Details */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <Link
                          href={`/product/${item.id}`}
                          onClick={closeDrawer}
                          className="text-label uppercase tracking-[0.08em] text-[#111111] hover:opacity-60 transition-opacity line-clamp-1 block"
                        >
                          {item.title}
                        </Link>
                        <div className="text-label text-[#9B9B9B] mt-1 space-x-2">
                          {item.selectedColor && <span>{item.selectedColor}</span>}
                          {item.selectedSize && <span>· {item.selectedSize}</span>}
                        </div>
                      </div>
                      <button
                        onClick={() => removeItem(item.id, item.selectedSize, item.selectedColor)}
                        className="text-[#D9D9D6] hover:text-[#111111] transition-colors duration-150 cursor-pointer shrink-0 pt-0.5"
                        aria-label="Remove"
                      >
                        <X className="w-3.5 h-3.5 stroke-[1.25]" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Qty */}
                      <div className="flex items-center border border-[#D9D9D6]">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1, item.selectedSize, item.selectedColor)}
                          className="w-7 h-7 flex items-center justify-center text-[#6B6B6B] hover:text-[#111111] transition-colors duration-150 cursor-pointer"
                        >
                          <Minus className="w-3 h-3 stroke-[1.25]" />
                        </button>
                        <span className="w-7 text-center text-label text-[#111111]">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1, item.selectedSize, item.selectedColor)}
                          className="w-7 h-7 flex items-center justify-center text-[#6B6B6B] hover:text-[#111111] transition-colors duration-150 cursor-pointer"
                        >
                          <Plus className="w-3 h-3 stroke-[1.25]" />
                        </button>
                      </div>
                      <span className="text-label text-[#111111]">৳{(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-[#E8E8E5] bg-white px-6 py-5 space-y-4">
            {/* Promo code */}
            {couponCode ? (
              <div className="flex items-center justify-between text-label">
                <span className="text-[#286749] uppercase tracking-[0.08em]">
                  {couponCode} applied (−৳{discount.toLocaleString()})
                </span>
                <button
                  onClick={removeCoupon}
                  className="text-[#9B9B9B] hover:text-[#111111] transition-colors cursor-pointer underline"
                >
                  Remove
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyCoupon} className="flex items-stretch gap-2">
                <input
                  type="text"
                  placeholder="Promo code"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                  className="flex-1 border border-[#D9D9D6] px-3 py-2 text-label text-[#111111] placeholder-[#9B9B9B] uppercase tracking-[0.08em] focus:outline-none focus:border-[#111111] transition-colors bg-transparent"
                />
                <button
                  type="submit"
                  className="px-4 py-2 border border-[#111111] text-label uppercase tracking-[0.08em] text-[#111111] hover:bg-[#111111] hover:text-white transition-all duration-150 cursor-pointer"
                >
                  Apply
                </button>
              </form>
            )}
            {couponError && <p className="text-label text-[#B42318]">{couponError}</p>}

            {/* Order summary */}
            <div className="space-y-1.5 text-label">
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
              <div className="flex justify-between pt-2 border-t border-[#E8E8E5] mt-2">
                <span className="text-[#111111] uppercase tracking-[0.08em]">Total</span>
                <span className="text-[#111111] font-medium">৳{total.toLocaleString()}</span>
              </div>
              <p className="text-label text-[#9B9B9B]">Shipping calculated at checkout</p>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-2.5 pt-1">
              <Link
                href="/checkout"
                onClick={closeDrawer}
                className="w-full py-3.5 bg-[#111111] text-white text-label uppercase tracking-[0.12em] flex items-center justify-center gap-2 hover:bg-[#333] transition-colors duration-150 group"
              >
                <span>Checkout</span>
                <ArrowRight className="w-3.5 h-3.5 stroke-[1.25] group-hover:translate-x-0.5 transition-transform duration-150" />
              </Link>
              <Link
                href="/bag"
                onClick={closeDrawer}
                className="w-full py-3 border border-[#D9D9D6] text-label uppercase tracking-[0.12em] text-[#111111] flex items-center justify-center hover:border-[#111111] transition-colors duration-150"
              >
                View Bag
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
