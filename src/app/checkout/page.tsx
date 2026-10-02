'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCartStore } from '@/lib/store/cart';
import { useAuthStore } from '@/lib/store/auth';
import { useOrdersStore } from '@/lib/store/orders';
import { toast } from '@/lib/store/toast';
import { SHMonogram } from '@/components/brand/SHMonogram';
import { ShieldCheck, Truck, CreditCard, Lock, ArrowLeft, Check } from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const {
    items,
    getSubtotal,
    getTotal,
    clearCart,
    shippingFee,
  } = useCartStore();
  const { user } = useAuthStore();
  const { createOrder } = useOrdersStore();

  const [mounted, setMounted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Form State
  const [fullName, setFullName] = useState(user?.name || 'Rafid Ahmed');
  const [email, setEmail] = useState(user?.email || 'rafid@stitchhouse.com');
  const [phone, setPhone] = useState(user?.phone || '+880 1712-345678');
  const [address, setAddress] = useState('House 14, Road 7, Block F');
  const [city, setCity] = useState('Dhaka');
  const [area, setArea] = useState('Gulshan-2');
  const [postalCode, setPostalCode] = useState('1212');
  const [notes, setNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'COD' | 'CARD' | 'BKASH'>('COD');

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const subtotal = getSubtotal();
  const total = getTotal();

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !address) {
      toast.warning('Required Information', 'Please complete the address and contact fields.');
      return;
    }

    setSubmitting(true);

    try {
      const orderNumber = `SH-${Date.now().toString().slice(-6)}`;
      const newOrder = createOrder({
        items,
        subtotal,
        discount: 0,
        shipping: shippingFee || 0,
        total,
        currency: 'BDT',
        status: 'CONFIRMED',
        paymentMethod: paymentMethod === 'CARD' ? 'SSLCOMMERZ' : paymentMethod,
        paymentStatus: 'PAID',
        shippingAddress: {
          name: fullName,
          phone,
          email,
          address,
          city,
          area,
          postalCode,
          notes,
        },
        deliveryMethod: 'STANDARD',
        estimatedDelivery: '2-3 Business Days',
      });

      clearCart();
      toast.success('Order Confirmed', `Consignment #${orderNumber} registered with STITCH HOUSE.`);
      router.push(`/order-confirmation?orderId=${newOrder?.id || orderNumber}`);
    } catch (err) {
      toast.error('Checkout Error', 'There was an issue processing your consignment.');
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F2EDE4] text-[#241E1A] pt-8 sm:pt-12 pb-32">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
        {/* Header */}
        <div className="border-b border-[#B8B0A3]/30 pb-6 mb-12 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <SHMonogram size={24} variant="dark" />
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#A8946C] font-semibold block">
                Atelier Consignment
              </span>
              <h1 className="text-2xl sm:text-3xl font-serif text-[#241E1A]">
                Secure Checkout
              </h1>
            </div>
          </div>
          <Link
            href="/cart"
            className="text-xs uppercase tracking-[0.18em] text-[#686B5E] hover:text-[#241E1A] flex items-center gap-1.5"
          >
            <ArrowLeft size={13} />
            <span>Return to Bag</span>
          </Link>
        </div>

        {items.length === 0 ? (
          <div className="py-20 text-center">
            <h2 className="text-2xl font-serif text-[#241E1A] mb-4">No items in bag to checkout</h2>
            <Link href="/collections/clothing" className="sh-btn-primary">
              Explore Collection
            </Link>
          </div>
        ) : (
          <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* ── LEFT: Form Steps (7 Cols) ── */}
            <div className="lg:col-span-7 space-y-10">
              {/* Step 1: Contact Information */}
              <div className="bg-[#EBE5DB]/50 p-6 sm:p-8 border border-[#B8B0A3]/30">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#A8946C] font-semibold block mb-1">
                  01 / Client Details
                </span>
                <h2 className="text-xl font-serif text-[#241E1A] mb-4">
                  Contact Information
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-[#686B5E] block mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-[#F2EDE4] border border-[#B8B0A3]/60 px-3 py-2.5 text-sm text-[#241E1A] focus:outline-none focus:border-[#241E1A]"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-[#686B5E] block mb-1">
                      Contact Mobile *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-[#F2EDE4] border border-[#B8B0A3]/60 px-3 py-2.5 text-sm text-[#241E1A] focus:outline-none focus:border-[#241E1A]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-[10px] uppercase tracking-wider text-[#686B5E] block mb-1">
                      Email Address (For Atelier Dispatch & Tracking)
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#F2EDE4] border border-[#B8B0A3]/60 px-3 py-2.5 text-sm text-[#241E1A] focus:outline-none focus:border-[#241E1A]"
                    />
                  </div>
                </div>
              </div>

              {/* Step 2: Shipping Address */}
              <div className="bg-[#EBE5DB]/50 p-6 sm:p-8 border border-[#B8B0A3]/30">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#A8946C] font-semibold block mb-1">
                  02 / Delivery Destination
                </span>
                <h2 className="text-xl font-serif text-[#241E1A] mb-4">
                  Shipping Address
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="text-[10px] uppercase tracking-wider text-[#686B5E] block mb-1">
                      Street Address / House / Flat *
                    </label>
                    <input
                      type="text"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full bg-[#F2EDE4] border border-[#B8B0A3]/60 px-3 py-2.5 text-sm text-[#241E1A] focus:outline-none focus:border-[#241E1A]"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-[#686B5E] block mb-1">
                      Area / Neighborhood
                    </label>
                    <input
                      type="text"
                      value={area}
                      onChange={(e) => setArea(e.target.value)}
                      className="w-full bg-[#F2EDE4] border border-[#B8B0A3]/60 px-3 py-2.5 text-sm text-[#241E1A] focus:outline-none focus:border-[#241E1A]"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-[#686B5E] block mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full bg-[#F2EDE4] border border-[#B8B0A3]/60 px-3 py-2.5 text-sm text-[#241E1A] focus:outline-none focus:border-[#241E1A]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-[10px] uppercase tracking-wider text-[#686B5E] block mb-1">
                      Special Atelier Delivery Instructions (Optional)
                    </label>
                    <input
                      type="text"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="e.g. Leave with concierge or specify preferred delivery window"
                      className="w-full bg-[#F2EDE4] border border-[#B8B0A3]/60 px-3 py-2.5 text-sm text-[#241E1A] focus:outline-none focus:border-[#241E1A]"
                    />
                  </div>
                </div>
              </div>

              {/* Step 3: Payment Settlement */}
              <div className="bg-[#EBE5DB]/50 p-6 sm:p-8 border border-[#B8B0A3]/30">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#A8946C] font-semibold block mb-1">
                  03 / Settlement
                </span>
                <h2 className="text-xl font-serif text-[#241E1A] mb-4">
                  Payment Method
                </h2>

                <div className="space-y-3">
                  <label
                    onClick={() => setPaymentMethod('COD')}
                    className={`flex items-center justify-between p-4 border cursor-pointer transition-colors ${
                      paymentMethod === 'COD'
                        ? 'border-[#241E1A] bg-[#F2EDE4]'
                        : 'border-[#B8B0A3]/40 bg-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-3.5 h-3.5 border flex items-center justify-center ${paymentMethod === 'COD' ? 'border-[#241E1A] bg-[#241E1A]' : 'border-[#B8B0A3]'}`}>
                        {paymentMethod === 'COD' && <div className="w-1.5 h-1.5 bg-[#F2EDE4]" />}
                      </div>
                      <div>
                        <span className="text-xs uppercase tracking-wider text-[#241E1A] font-medium block">
                          Cash / Card on Delivery (Dhaka & Nationwide)
                        </span>
                        <span className="text-[11px] text-[#686B5E]">
                          Inspect your signature garment box upon receipt.
                        </span>
                      </div>
                    </div>
                  </label>

                  <label
                    onClick={() => setPaymentMethod('BKASH')}
                    className={`flex items-center justify-between p-4 border cursor-pointer transition-colors ${
                      paymentMethod === 'BKASH'
                        ? 'border-[#241E1A] bg-[#F2EDE4]'
                        : 'border-[#B8B0A3]/40 bg-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-3.5 h-3.5 border flex items-center justify-center ${paymentMethod === 'BKASH' ? 'border-[#241E1A] bg-[#241E1A]' : 'border-[#B8B0A3]'}`}>
                        {paymentMethod === 'BKASH' && <div className="w-1.5 h-1.5 bg-[#F2EDE4]" />}
                      </div>
                      <div>
                        <span className="text-xs uppercase tracking-wider text-[#241E1A] font-medium block">
                          bKash / Mobile Settlement
                        </span>
                        <span className="text-[11px] text-[#686B5E]">
                          Instant verification via secure wallet transfer.
                        </span>
                      </div>
                    </div>
                  </label>

                  <label
                    onClick={() => setPaymentMethod('CARD')}
                    className={`flex items-center justify-between p-4 border cursor-pointer transition-colors ${
                      paymentMethod === 'CARD'
                        ? 'border-[#241E1A] bg-[#F2EDE4]'
                        : 'border-[#B8B0A3]/40 bg-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-3.5 h-3.5 border flex items-center justify-center ${paymentMethod === 'CARD' ? 'border-[#241E1A] bg-[#241E1A]' : 'border-[#B8B0A3]'}`}>
                        {paymentMethod === 'CARD' && <div className="w-1.5 h-1.5 bg-[#F2EDE4]" />}
                      </div>
                      <div>
                        <span className="text-xs uppercase tracking-wider text-[#241E1A] font-medium block">
                          Visa / Mastercard / Amex
                        </span>
                        <span className="text-[11px] text-[#686B5E]">
                          Encrypted 256-bit payment gateway.
                        </span>
                      </div>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* ── RIGHT: Order Summary (5 Cols) ── */}
            <div className="lg:col-span-5 bg-[#EBE5DB] p-8 border border-[#B8B0A3]/40 lg:sticky lg:top-28">
              <h3 className="font-serif text-xl text-[#241E1A] mb-6">
                Consignment Summary
              </h3>

              {/* Items Snapshot */}
              <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 divide-y divide-[#B8B0A3]/30 mb-6">
                {items.map((item) => (
                  <div key={`${item.productId || item.id}-${item.selectedSize}`} className="pt-3 first:pt-0 flex gap-3">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-14 h-18 object-cover bg-[#F2EDE4]"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-serif text-[#241E1A] truncate">{item.title}</p>
                      <p className="text-[10px] text-[#686B5E] tracking-wider uppercase">
                        Size: {item.selectedSize} • Qty: {item.quantity}
                      </p>
                      <p className="text-xs font-sans text-[#241E1A] font-medium mt-1">
                        BDT {(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-2.5 text-xs tracking-wider uppercase border-t border-[#B8B0A3]/30 pt-4 mb-6">
                <div className="flex justify-between text-[#686B5E]">
                  <span>Subtotal</span>
                  <span className="text-[#241E1A] font-medium">BDT {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[#686B5E]">
                  <span>Packaging Box</span>
                  <span className="text-[#A8946C]">Complimentary</span>
                </div>
                <div className="flex justify-between text-[#686B5E]">
                  <span>Delivery</span>
                  <span className="text-[#241E1A]">Complimentary</span>
                </div>
              </div>

              <div className="flex justify-between items-baseline mb-6 border-t border-[#B8B0A3]/30 pt-4">
                <span className="font-serif text-lg text-[#241E1A]">Total</span>
                <span className="font-sans font-medium text-xl text-[#241E1A]">
                  BDT {total.toLocaleString()}
                </span>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full sh-btn-primary flex items-center justify-center gap-2 py-4"
              >
                {submitting ? (
                  <span>Securing Consignment...</span>
                ) : (
                  <span>Confirm Consignment</span>
                )}
              </button>

              <div className="mt-6 text-[10px] text-center text-[#686B5E] tracking-widest uppercase">
                <p>Protected by 256-bit encryption • STITCH HOUSE Atelier</p>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
