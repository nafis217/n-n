'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCartStore, CartItemType } from '@/lib/store/cart';
import { Button } from '@/components/ui/Button';

export default function ShoppingBagPage() {
  const { items, removeItem, updateQuantity, getSubtotal } = useCartStore();

  const [promoCode, setPromoCode] = useState('');
  const [discountBDT, setDiscountBDT] = useState(0);
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');

  const subtotalBDT = getSubtotal();
  const deliveryBDT = items.length > 0 ? 120 : 0;
  const totalBDT = Math.max(0, subtotalBDT + deliveryBDT - discountBDT);

  const handleApplyPromo = () => {
    setPromoError('');
    setPromoSuccess('');
    if (promoCode.trim().toUpperCase() === 'BUNON10') {
      const discount = Math.round(subtotalBDT * 0.1);
      setDiscountBDT(discount);
      setPromoSuccess('10% VIP Promotional Discount Applied!');
    } else {
      setPromoError('Invalid promotion code. Try "BUNON10"');
    }
  };

  return (
    <div className="w-full px-margin-mobile md:px-margin-desktop pt-24 md:pt-28 pb-16">
      <div className="border-b border-outline-variant pb-8 mb-10">
        <span className="font-label-caps text-label-caps text-outline uppercase block mb-2 font-semibold">
          Order Summary
        </span>
        <h1 className="font-headline-lg text-4xl uppercase font-semibold text-primary">
          Shopping Bag ({items.length})
        </h1>
      </div>

      {items.length === 0 ? (
        <div className="py-20 text-center border border-dashed border-outline-variant">
          <ShoppingBag className="w-12 h-12 text-outline mx-auto mb-4 stroke-[1.5]" />
          <p className="font-label-caps text-sm text-secondary uppercase mb-4 font-semibold">
            Your shopping bag is empty
          </p>
          <Link href="/products">
            <Button variant="primary" size="md">
              Discover New Collection
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Item List */}
          <div className="lg:col-span-2 flex flex-col divide-y divide-outline-variant">
            {items.map((item: CartItemType) => (
              <div key={item.variantId} className="py-6 flex gap-6 items-start">
                <div className="w-24 aspect-[2/3] bg-surface-container-low overflow-hidden flex-shrink-0">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                </div>

                <div className="flex-grow flex flex-col justify-between h-full">
                  <div>
                    <div className="flex justify-between items-start">
                      <Link href={`/product/${item.productId}`}>
                        <h3 className="font-body-md text-base uppercase font-medium text-primary hover:underline">
                          {item.title}
                        </h3>
                      </Link>
                      <button
                        onClick={() => removeItem(item.variantId)}
                        className="text-outline hover:text-error transition-colors p-1"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <p className="font-label-caps text-[11px] text-secondary uppercase mt-1">
                      SKU: {item.sku}
                    </p>
                    <p className="font-label-caps text-xs text-secondary uppercase mt-1">
                      Color: {item.color} | Size: {item.size}
                    </p>
                  </div>

                  <div className="flex justify-between items-center mt-6">
                    <div className="flex items-center border border-outline-variant">
                      <button
                        onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                        className="px-3 py-1 font-label-caps text-xs text-primary hover:bg-surface-container"
                      >
                        -
                      </button>
                      <span className="px-3 font-label-caps text-xs font-bold text-primary">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                        className="px-3 py-1 font-label-caps text-xs text-primary hover:bg-surface-container"
                      >
                        +
                      </button>
                    </div>

                    <span className="font-price text-base font-bold text-primary">
                      ৳ {(item.priceBDT * item.quantity).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Checkout Summary Card */}
          <div className="p-8 bg-surface-container-low border border-outline-variant flex flex-col justify-between h-fit">
            <div>
              <h2 className="font-label-caps text-sm uppercase font-bold text-primary pb-4 border-b border-outline-variant mb-6">
                Price Details
              </h2>

              <div className="flex flex-col gap-4 font-label-caps text-xs text-secondary mb-6">
                <div className="flex justify-between">
                  <span>Bag Subtotal</span>
                  <span className="text-primary font-semibold">৳ {subtotalBDT.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Delivery (Inside Dhaka)</span>
                  <span className="text-primary font-semibold">৳ {deliveryBDT.toLocaleString()}</span>
                </div>

                {discountBDT > 0 && (
                  <div className="flex justify-between text-emerald-700 font-bold">
                    <span>Promotional Discount</span>
                    <span>- ৳ {discountBDT.toLocaleString()}</span>
                  </div>
                )}

                <div className="pt-4 border-t border-outline-variant flex justify-between text-sm font-bold text-primary">
                  <span>Total Payable</span>
                  <span className="text-display">৳ {totalBDT.toLocaleString()}</span>
                </div>
              </div>

              {/* Promo Code Drawer Input */}
              <div className="mb-6">
                <label className="block font-label-caps text-[11px] uppercase text-secondary mb-2">
                  Promotional Code
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="E.G. BUNON10"
                    className="w-full bg-white border border-outline-variant px-3 py-2 font-label-caps text-xs text-primary uppercase focus:outline-none focus:border-primary"
                  />
                  <Button variant="secondary" size="sm" onClick={handleApplyPromo}>
                    APPLY
                  </Button>
                </div>
                {promoError && (
                  <p className="mt-1 font-label-caps text-[11px] text-error uppercase">{promoError}</p>
                )}
                {promoSuccess && (
                  <p className="mt-1 font-label-caps text-[11px] text-emerald-700 uppercase font-semibold">{promoSuccess}</p>
                )}
              </div>
            </div>

            <Link href="/checkout">
              <Button variant="primary" size="lg" fullWidth className="flex items-center justify-center gap-2">
                <span>PROCEED TO CHECKOUT</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
