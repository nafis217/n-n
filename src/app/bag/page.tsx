'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCartStore } from '@/lib/store/cart';
import { useWishlistStore } from '@/lib/store/wishlist';
import {
  Trash2,
  ShoppingBag,
  ArrowRight,
  Heart,
  Plus,
  Minus,
  Sparkles,
  Tag,
  ShieldCheck,
  Truck,
  RotateCcw,
} from 'lucide-react';

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
    deliveryZone,
    setDeliveryZone,
    shippingFee,
  } = useCartStore();

  const { addToWishlist } = useWishlistStore();

  const [promoCodeInput, setPromoCodeInput] = useState('');
  const [promoError, setPromoError] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center text-xs font-mono text-neutral-500 uppercase tracking-widest">
        Loading Bag Archive...
      </div>
    );
  }

  const subtotal = getSubtotal();
  const total = getTotal();
  const freeThreshold = 10000;
  const progressToFree = Math.min(100, Math.round((subtotal / freeThreshold) * 100));
  const amountToFree = Math.max(0, freeThreshold - subtotal);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    if (!promoCodeInput.trim()) return;
    const success = applyCoupon(promoCodeInput);
    if (!success) {
      setPromoError('Invalid coupon code. Try "FUKU10" or "BENGAL20"');
    } else {
      setPromoCodeInput('');
    }
  };

  const handleMoveToWishlist = (item: any) => {
    addToWishlist(item.id, item.title);
    removeItem(item.id, item.selectedSize, item.selectedColor);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-neutral-900 py-10 md:py-16 px-4 sm:px-8 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="border-b border-neutral-200 pb-8 mb-10">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-500 font-bold block mb-2">
            Archive Curation
          </span>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl uppercase font-extrabold tracking-tight text-black">
            Shopping Bag ({items.reduce((s, i) => s + i.quantity, 0)})
          </h1>
        </div>

        {items.length === 0 ? (
          /* Empty Bag State */
          <div className="py-24 text-center border border-neutral-200 bg-white p-8 max-w-2xl mx-auto shadow-sm">
            <div className="w-16 h-16 border border-neutral-200 flex items-center justify-center mx-auto mb-4 text-neutral-400">
              <ShoppingBag className="w-8 h-8 stroke-[1.2]" />
            </div>
            <h3 className="font-display text-base font-bold uppercase tracking-widest text-black mb-2">
              Your Bag Archive is Empty
            </h3>
            <p className="text-xs text-neutral-600 max-w-sm mx-auto mb-8 font-sans leading-relaxed">
              Explore our architectural garments, limited Jamdani editions, and high-GSM streetwear essentials.
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
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            {/* Left: Cart Items List (Col 8) */}
            <div className="lg:col-span-7 xl:col-span-8 space-y-6">
              {/* Complimentary Shipping Progress Banner */}
              <div className="p-4 bg-white border border-neutral-200 shadow-sm">
                <div className="flex justify-between items-center text-xs font-mono mb-2">
                  {amountToFree === 0 ? (
                    <span className="text-black flex items-center gap-1.5 font-bold uppercase">
                      <Sparkles className="w-3.5 h-3.5 text-black" /> Complimentary Express Shipping Unlocked
                    </span>
                  ) : (
                    <span className="text-neutral-600">
                      Add <strong>৳{amountToFree.toLocaleString()}</strong> more to unlock complimentary nationwide delivery
                    </span>
                  )}
                  <span className="text-black font-bold">{progressToFree}%</span>
                </div>
                <div className="w-full h-1.5 bg-neutral-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-black transition-all duration-500 ease-out"
                    style={{ width: `${progressToFree}%` }}
                  />
                </div>
              </div>

              {/* Items List */}
              <div className="divide-y divide-neutral-200 border-t border-b border-neutral-200 bg-white p-4 shadow-sm">
                {items.map((item) => (
                  <div
                    key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
                    className="py-6 flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between"
                  >
                    {/* Thumbnail & Info */}
                    <div className="flex gap-4 items-center flex-1">
                      <div className="w-20 sm:w-24 aspect-[3/4] bg-neutral-100 relative overflow-hidden border border-neutral-200 shrink-0">
                        <Image src={item.image} alt={item.title} fill className="object-cover" />
                      </div>

                      <div className="min-w-0">
                        <Link
                          href={`/product/${item.id}`}
                          className="font-display text-sm uppercase tracking-wider font-bold text-black hover:text-neutral-600 transition-colors line-clamp-1"
                        >
                          {item.title}
                        </Link>

                        <div className="flex items-center gap-3 mt-1.5 text-xs font-mono text-neutral-500">
                          {item.selectedSize && (
                            <span>
                              Size: <strong className="text-black">{item.selectedSize}</strong>
                            </span>
                          )}
                          {item.selectedColor && (
                            <>
                              <span>•</span>
                              <span>{item.selectedColor}</span>
                            </>
                          )}
                        </div>

                        <div className="font-mono text-sm font-bold text-black mt-2">
                          ৳{item.price.toLocaleString()}
                        </div>
                      </div>
                    </div>

                    {/* Quantity Stepper, Item Total & Action Icons */}
                    <div className="flex items-center justify-between w-full sm:w-auto sm:gap-8">
                      {/* Stepper */}
                      <div className="flex items-center border border-neutral-300 bg-neutral-50">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1, item.selectedSize, item.selectedColor)}
                          className="w-8 h-8 flex items-center justify-center text-neutral-600 hover:text-black transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-8 text-center font-mono text-xs font-bold text-black">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1, item.selectedSize, item.selectedColor)}
                          className="w-8 h-8 flex items-center justify-center text-neutral-600 hover:text-black transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Total */}
                      <div className="font-mono text-sm font-bold text-black min-w-[90px] text-right">
                        ৳{(item.price * item.quantity).toLocaleString()}
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleMoveToWishlist(item)}
                          className="p-2 text-neutral-400 hover:text-black transition-colors"
                          title="Save for Later in Wishlist"
                        >
                          <Heart className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => removeItem(item.id, item.selectedSize, item.selectedColor)}
                          className="p-2 text-neutral-400 hover:text-black transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center pt-2">
                <Link
                  href="/shop"
                  className="text-xs font-mono uppercase tracking-wider text-neutral-600 hover:text-black flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3 h-3" /> Continue Browsing Archive
                </Link>
              </div>
            </div>

            {/* Right: Order Summary & Checkout Card (Col 4) */}
            <div className="lg:col-span-5 xl:col-span-4">
              <div className="p-6 sm:p-8 bg-white border border-neutral-200 shadow-lg space-y-6 sticky top-28">
                <h2 className="font-display text-sm uppercase tracking-widest font-bold text-black pb-4 border-b border-neutral-200">
                  Order Financial Breakdown
                </h2>

                {/* Delivery Zone Selector */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-600 mb-2">
                    Delivery Region:
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setDeliveryZone('DHAKA')}
                      className={`p-2.5 text-xs font-mono uppercase tracking-wider border text-left transition-colors ${
                        deliveryZone === 'DHAKA'
                          ? 'border-black bg-neutral-50 text-black font-bold ring-1 ring-black'
                          : 'border-neutral-200 bg-white text-neutral-600 hover:border-neutral-400'
                      }`}
                    >
                      <div>Inside Dhaka</div>
                      <div className="text-[10px] text-neutral-500 mt-0.5">৳80 (24-48h)</div>
                    </button>
                    <button
                      onClick={() => setDeliveryZone('OUTSIDE_DHAKA')}
                      className={`p-2.5 text-xs font-mono uppercase tracking-wider border text-left transition-colors ${
                        deliveryZone === 'OUTSIDE_DHAKA'
                          ? 'border-black bg-neutral-50 text-black font-bold ring-1 ring-black'
                          : 'border-neutral-200 bg-white text-neutral-600 hover:border-neutral-400'
                      }`}
                    >
                      <div>Outside Dhaka</div>
                      <div className="text-[10px] text-neutral-500 mt-0.5">৳150 (3-5 days)</div>
                    </button>
                  </div>
                </div>

                {/* Cost Breakdown */}
                <div className="space-y-3 font-mono text-xs text-neutral-600 pt-2 border-t border-neutral-200">
                  <div className="flex justify-between">
                    <span>Archive Subtotal</span>
                    <span className="text-black font-medium">৳{subtotal.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Delivery Charge</span>
                    <span className="text-black font-medium">
                      {shippingFee === 0 ? (
                        <strong className="text-black font-bold">FREE</strong>
                      ) : (
                        `৳${shippingFee.toLocaleString()}`
                      )}
                    </span>
                  </div>

                  {discount > 0 && (
                    <div className="flex justify-between text-black font-bold">
                      <span>Voucher Discount ({couponCode})</span>
                      <span>-৳{discount.toLocaleString()}</span>
                    </div>
                  )}

                  <div className="pt-4 border-t border-neutral-200 flex justify-between items-baseline text-black">
                    <span className="font-display text-sm uppercase tracking-widest font-bold">
                      Estimated Total
                    </span>
                    <span className="font-mono text-2xl font-bold">
                      ৳{total.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Promo Code Input */}
                <div className="pt-2 border-t border-neutral-200">
                  {couponCode ? (
                    <div className="flex items-center justify-between bg-neutral-50 px-3 py-2 border border-neutral-300 text-xs font-mono">
                      <span className="text-black flex items-center gap-1.5 font-bold">
                        <Tag className="w-3.5 h-3.5" /> Voucher {couponCode} (-৳{discount.toLocaleString()})
                      </span>
                      <button
                        onClick={removeCoupon}
                        className="text-neutral-500 hover:text-black underline text-[11px]"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleApplyPromo} className="space-y-1.5">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={promoCodeInput}
                          onChange={(e) => setPromoCodeInput(e.target.value.toUpperCase())}
                          placeholder="Coupon (e.g. FUKU10)"
                          className="flex-1 bg-neutral-50 border border-neutral-300 px-3 py-2.5 text-xs text-black placeholder-neutral-400 uppercase tracking-wider focus:outline-none focus:border-black focus:bg-white"
                        />
                        <button
                          type="submit"
                          className="px-4 py-2.5 bg-black text-white hover:bg-neutral-800 font-display text-xs uppercase tracking-widest font-bold transition-colors"
                        >
                          Apply
                        </button>
                      </div>
                      {promoError && <p className="text-[10px] text-neutral-800 font-mono">{promoError}</p>}
                    </form>
                  )}
                </div>

                {/* Proceed to Checkout Button */}
                <Link
                  href="/checkout"
                  className="w-full py-4 bg-black text-white hover:bg-neutral-800 font-display font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 transition-all shadow-md group"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                {/* Guarantee trust marks */}
                <div className="pt-4 border-t border-neutral-200 grid grid-cols-2 gap-4 text-[10px] font-mono text-neutral-500">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-black shrink-0" />
                    <span>SSL Encrypted Checkout</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-black shrink-0" />
                    <span>Express Dispatch</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
