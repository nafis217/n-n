'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useCartStore } from '@/lib/store/cart';
import { useAuthStore } from '@/lib/store/auth';
import { useOrdersStore } from '@/lib/store/orders';
import { toast } from '@/lib/store/toast';
import { SHMonogram } from '@/components/brand/SHMonogram';
import {
  ShieldCheck,
  Truck,
  CheckCircle2,
  Lock,
  ArrowLeft,
  Check,
  Sparkles,
  Banknote,
  MessageCircle,
  Instagram,
  Facebook,
  Phone,
  Zap,
  PackageCheck,
  ChevronDown
} from 'lucide-react';

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
  const [socialSource, setSocialSource] = useState<string | null>(null);

  // Form State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('Dhaka');
  const [area, setArea] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [notes, setNotes] = useState('');

  // Detect Social Media Source & Auto-fill Customer Profile
  useEffect(() => {
    setMounted(true);

    if (typeof window !== 'undefined') {
      const searchParams = new URLSearchParams(window.location.search);
      const utmSource = searchParams.get('utm_source') || searchParams.get('source') || searchParams.get('ref');
      const referrer = document.referrer.toLowerCase();

      // 1. Detect Referral Platform
      let detectedSource: string | null = null;
      if (utmSource) {
        detectedSource = utmSource.toUpperCase();
      } else if (referrer.includes('facebook.com') || referrer.includes('fb.me') || referrer.includes('m.me')) {
        detectedSource = 'FACEBOOK';
      } else if (referrer.includes('instagram.com')) {
        detectedSource = 'INSTAGRAM';
      } else if (referrer.includes('whatsapp.com')) {
        detectedSource = 'WHATSAPP';
      } else if (referrer.includes('tiktok.com')) {
        detectedSource = 'TIKTOK';
      }

      if (detectedSource) {
        setSocialSource(detectedSource);
      }

      // 2. Auto-fill from URL Query Params (e.g. if arriving from Facebook Lead/Ad/Chatbot)
      const paramName = searchParams.get('name') || searchParams.get('fullName');
      const paramPhone = searchParams.get('phone') || searchParams.get('mobile') || searchParams.get('tel');
      const paramEmail = searchParams.get('email');
      const paramAddress = searchParams.get('address') || searchParams.get('street');
      const paramCity = searchParams.get('city');
      const paramArea = searchParams.get('area') || searchParams.get('thana');

      // 3. Fallback: Saved Previous Customer Info in LocalStorage
      let savedProfile: any = null;
      try {
        const saved = localStorage.getItem('stitchhouse_customer_profile');
        if (saved) savedProfile = JSON.parse(saved);
      } catch (e) {}

      // Apply best matching information
      setFullName(paramName || user?.name || savedProfile?.fullName || 'Ahsanul Islam');
      setPhone(paramPhone || user?.phone || savedProfile?.phone || '+880 1712-345678');
      setEmail(paramEmail || user?.email || savedProfile?.email || 'client@stitchhouse.atelier');
      setAddress(paramAddress || savedProfile?.address || 'House 14, Road 7, Block F');
      setCity(paramCity || savedProfile?.city || 'Dhaka');
      setArea(paramArea || savedProfile?.area || 'Gulshan-2');
      setPostalCode(savedProfile?.postalCode || '1212');
    }
  }, [user]);

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
      // Save customer profile for future frictionless checkout
      try {
        localStorage.setItem(
          'stitchhouse_customer_profile',
          JSON.stringify({
            fullName,
            phone,
            email,
            address,
            city,
            area,
            postalCode,
          })
        );
      } catch (e) {}

      const orderNumber = `SH-${Date.now().toString().slice(-6)}`;
      const orderSourceTag = socialSource
        ? (socialSource.includes('FB') || socialSource.includes('FACEBOOK') ? 'FACEBOOK' :
           socialSource.includes('INSTA') || socialSource.includes('IG') ? 'INSTAGRAM' :
           socialSource.includes('WHATSAPP') ? 'WHATSAPP' : 'WEBSITE')
        : 'WEBSITE';

      const newOrder = createOrder({
        items,
        subtotal,
        discount: 0,
        shipping: shippingFee || 0,
        total,
        currency: 'BDT',
        status: 'CONFIRMED',
        paymentMethod: 'COD',
        paymentStatus: 'PENDING',
        orderSource: orderSourceTag as any,
        courierName: city.toLowerCase().includes('dhaka') ? 'Steadfast Courier' : 'Pathao Courier',
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
        estimatedDelivery: city.toLowerCase().includes('dhaka') ? '1-2 Business Days' : '2-3 Business Days',
      });

      clearCart();
      toast.success('Order Confirmed', `Consignment #${orderNumber} registered with Cash on Delivery.`);
      router.push(`/order-confirmation?orderId=${newOrder?.id || orderNumber}`);
    } catch (err) {
      toast.error('Checkout Error', 'There was an issue processing your consignment.');
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F2EDE4] text-[#241E1A] pt-8 sm:pt-12 pb-32 font-sans">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
        {/* Header */}
        <div className="border-b border-[#B8B0A3]/30 pb-6 mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <SHMonogram size={24} variant="dark" />
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#A8946C] font-semibold block">
                Atelier Consignment
              </span>
              <h1 className="text-2xl sm:text-3xl font-serif text-[#241E1A]">
                Fast 1-Click Checkout
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

        {/* Social Referral VIP Fast-Pass Banner */}
        {socialSource && (
          <div className="mb-8 p-4 rounded-xl bg-gradient-to-r from-[#241E1A] to-[#3D332D] text-white border border-[#A8946C]/40 shadow-lg flex items-center justify-between gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#A8946C]/30 rounded-lg text-amber-300">
                {socialSource.includes('FACEBOOK') || socialSource.includes('FB') ? (
                  <Facebook className="w-5 h-5 text-blue-400" />
                ) : socialSource.includes('INSTA') ? (
                  <Instagram className="w-5 h-5 text-pink-400" />
                ) : socialSource.includes('WHATSAPP') ? (
                  <MessageCircle className="w-5 h-5 text-emerald-400" />
                ) : (
                  <Sparkles className="w-5 h-5 text-amber-400" />
                )}
              </div>
              <div>
                <p className="text-xs sm:text-sm font-serif font-bold text-white flex items-center gap-1.5">
                  <span>Welcome from {socialSource}!</span>
                  <span className="text-[10px] bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded-full font-mono uppercase font-bold">
                    Fast Express Pass Active
                  </span>
                </p>
                <p className="text-[11px] text-[#EBE5DB]/80 font-sans">
                  Your delivery details have been pre-filled. Confirm your Cash on Delivery order in 1 click!
                </p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-1 text-[11px] font-mono text-amber-300 bg-black/40 px-3 py-1.5 rounded-lg border border-white/10">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>No Prepayment Required</span>
            </div>
          </div>
        )}

        {items.length === 0 ? (
          <div className="py-20 text-center">
            <h2 className="text-2xl font-serif text-[#241E1A] mb-4">No items in bag to checkout</h2>
            <Link href="/collections/clothing" className="sh-btn-primary">
              Explore Collection
            </Link>
          </div>
        ) : (
          <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* ── LEFT: Form Steps (7 Cols) ── */}
            <div className="lg:col-span-7 space-y-8">
              {/* Step 1: Contact Information */}
              <div className="bg-[#EBE5DB]/60 p-5 sm:p-8 border border-[#B8B0A3]/40 rounded-xl">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.25em] text-[#A8946C] font-semibold block mb-0.5">
                      01 / Client Details
                    </span>
                    <h2 className="text-xl font-serif text-[#241E1A]">
                      Recipient Information
                    </h2>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-100 border border-emerald-300 px-2.5 py-1 rounded-md uppercase">
                    ✓ Auto-Detected
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-[#686B5E] font-bold block mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      autoComplete="name"
                      placeholder="e.g. Ahsanul Islam"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-[#F2EDE4] border border-[#B8B0A3]/70 px-3.5 py-3 text-base sm:text-sm text-[#241E1A] font-medium rounded-md focus:outline-none focus:border-[#241E1A]"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-[#686B5E] font-bold block mb-1">
                      Contact Mobile Number *
                    </label>
                    <input
                      type="tel"
                      inputMode="tel"
                      required
                      autoComplete="tel"
                      placeholder="e.g. 01712345678"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-[#F2EDE4] border border-[#B8B0A3]/70 px-3.5 py-3 text-base sm:text-sm text-[#241E1A] font-mono font-medium rounded-md focus:outline-none focus:border-[#241E1A]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-[10px] uppercase tracking-wider text-[#686B5E] font-bold block mb-1">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      autoComplete="email"
                      placeholder="client@stitchhouse.atelier"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#F2EDE4] border border-[#B8B0A3]/70 px-3.5 py-3 text-base sm:text-sm text-[#241E1A] rounded-md focus:outline-none focus:border-[#241E1A]"
                    />
                  </div>
                </div>
              </div>

              {/* Step 2: Shipping Destination */}
              <div className="bg-[#EBE5DB]/60 p-5 sm:p-8 border border-[#B8B0A3]/40 rounded-xl">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#A8946C] font-semibold block mb-0.5">
                  02 / Logistics
                </span>
                <h2 className="text-xl font-serif text-[#241E1A] mb-4">
                  Delivery Destination
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="text-[10px] uppercase tracking-wider text-[#686B5E] font-bold block mb-1">
                      Street Address &amp; House / Apt Details *
                    </label>
                    <input
                      type="text"
                      required
                      autoComplete="street-address"
                      placeholder="House #, Road #, Apartment #, Sector/Block..."
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full bg-[#F2EDE4] border border-[#B8B0A3]/70 px-3.5 py-3 text-base sm:text-sm text-[#241E1A] rounded-md focus:outline-none focus:border-[#241E1A]"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-[#686B5E] font-bold block mb-1">
                      Area / Neighborhood
                    </label>
                    <input
                      type="text"
                      autoComplete="address-level3"
                      placeholder="e.g. Gulshan, Banani, Dhanmondi"
                      value={area}
                      onChange={(e) => setArea(e.target.value)}
                      className="w-full h-[48px] bg-[#F2EDE4] border border-[#B8B0A3]/70 px-3.5 py-3 text-base sm:text-sm text-[#241E1A] rounded-md focus:outline-none focus:border-[#241E1A]"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-[#686B5E] font-bold block mb-1">
                      City / District *
                    </label>
                    <div className="relative">
                      <select
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full h-[48px] bg-[#F2EDE4] border border-[#B8B0A3]/70 px-3.5 pr-10 text-base sm:text-sm text-[#241E1A] font-medium rounded-md focus:outline-none focus:border-[#241E1A] appearance-none cursor-pointer"
                      >
                        <option value="Dhaka">Dhaka (Inside Dhaka 1-2 Days)</option>
                        <option value="Chittagong">Chittagong (Nationwide 2-3 Days)</option>
                        <option value="Sylhet">Sylhet (Nationwide 2-3 Days)</option>
                        <option value="Rajshahi">Rajshahi (Nationwide 2-3 Days)</option>
                        <option value="Khulna">Khulna (Nationwide 2-3 Days)</option>
                        <option value="Barisal">Barisal (Nationwide 2-3 Days)</option>
                        <option value="Rangpur">Rangpur (Nationwide 2-3 Days)</option>
                        <option value="Mymensingh">Mymensingh (Nationwide 2-3 Days)</option>
                        <option value="Comilla">Comilla (Nationwide 2-3 Days)</option>
                        <option value="Gazipur">Gazipur (Sub-urban)</option>
                        <option value="Narayanganj">Narayanganj (Sub-urban)</option>
                      </select>
                      <ChevronDown className="w-4 h-4 text-[#686B5E] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-[10px] uppercase tracking-wider text-[#686B5E] font-bold block mb-1">
                      Special Delivery Instructions (Optional)
                    </label>
                    <input
                      type="text"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="e.g. Call before delivery, deliver after 4 PM"
                      className="w-full bg-[#F2EDE4] border border-[#B8B0A3]/70 px-3.5 py-3 text-base sm:text-sm text-[#241E1A] rounded-md focus:outline-none focus:border-[#241E1A] italic"
                    />
                  </div>
                </div>
              </div>

              {/* Step 3: Streamlined Cash On Delivery (No other payment method needed) */}
              <div className="bg-[#EBE5DB]/60 p-5 sm:p-8 border-2 border-emerald-600/40 rounded-xl shadow-xs">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.25em] text-emerald-700 font-bold block mb-0.5">
                      03 / Simplified Settlement
                    </span>
                    <h2 className="text-xl font-serif text-[#241E1A] flex items-center gap-2">
                      <Banknote className="w-5 h-5 text-emerald-700" />
                      <span>Payment Method</span>
                    </h2>
                  </div>
                  <span className="bg-emerald-600 text-white text-[10px] font-mono font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                    Zero Prepayment
                  </span>
                </div>

                {/* Exclusive Highlighted Cash on Delivery Card */}
                <div className="p-4 bg-white/80 border-2 border-[#241E1A] rounded-xl flex items-start gap-3.5 shadow-sm">
                  <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-serif font-bold text-[#241E1A] uppercase tracking-wide">
                      Cash On Delivery (COD) — Dhaka &amp; Nationwide
                    </p>
                    <p className="text-xs text-[#686B5E] mt-1 font-sans">
                      Pay cash upon doorstep delivery after inspecting your luxury garment package.
                    </p>
                    <div className="flex items-center gap-3 mt-3 text-[11px] font-mono text-emerald-800 font-semibold flex-wrap">
                      <span className="flex items-center gap-1">
                        <PackageCheck className="w-3.5 h-3.5" />
                        <span>Inspect Before Payment</span>
                      </span>
                      <span>•</span>
                      <span>Complimentary Return Guarantee</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ── RIGHT: Order Summary (5 Cols) ── */}
            <div className="lg:col-span-5 bg-[#EBE5DB] p-6 sm:p-8 border border-[#B8B0A3]/50 rounded-2xl lg:sticky lg:top-28 shadow-xl">
              <h3 className="font-serif text-xl text-[#241E1A] mb-4">
                Consignment Summary
              </h3>

              {/* Items Snapshot */}
              <div className="space-y-3 max-h-[260px] overflow-y-auto pr-2 divide-y divide-[#B8B0A3]/30 mb-6">
                {items.map((item) => (
                  <div key={`${item.productId || item.id}-${item.selectedSize}`} className="pt-3 first:pt-0 flex gap-3">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-14 h-18 object-cover bg-[#F2EDE4] rounded-lg border border-[#B8B0A3]/40 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-serif text-[#241E1A] truncate font-bold">{item.title}</p>
                      <p className="text-[10px] text-[#686B5E] tracking-wider uppercase font-mono">
                        Size: <span className="font-bold text-[#241E1A]">{item.selectedSize}</span> • Qty: {item.quantity}
                      </p>
                      <p className="text-xs font-mono text-[#241E1A] font-bold mt-1">
                        BDT {(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-2.5 text-xs tracking-wider uppercase border-t border-[#B8B0A3]/40 pt-4 mb-6 font-mono">
                <div className="flex justify-between text-[#686B5E]">
                  <span>Items Subtotal</span>
                  <span className="text-[#241E1A] font-bold">BDT {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[#686B5E]">
                  <span>Signature Dustbox</span>
                  <span className="text-[#A8946C] font-bold">Complimentary</span>
                </div>
                <div className="flex justify-between text-[#686B5E]">
                  <span>Doorstep Courier</span>
                  <span className="text-emerald-700 font-bold">Complimentary</span>
                </div>
              </div>

              {/* Total Summary */}
              <div className="flex justify-between items-baseline mb-6 border-t-2 border-[#241E1A]/20 pt-4">
                <span className="font-serif text-lg text-[#241E1A] font-bold">Total Payable</span>
                <span className="font-mono font-bold text-2xl text-[#241E1A]">
                  BDT {total.toLocaleString()}
                </span>
              </div>

              {/* One-Click COD Confirm Button */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-[#241E1A] hover:bg-black text-[#F2EDE4] flex items-center justify-center gap-2 py-4 rounded-xl text-xs font-bold uppercase tracking-widest cursor-pointer shadow-xl hover:scale-[1.02] transition-all"
              >
                {submitting ? (
                  <span>Securing Consignment...</span>
                ) : (
                  <span>Confirm Cash On Delivery Order — BDT {total.toLocaleString()}</span>
                )}
              </button>

              <div className="mt-4 text-[10px] text-center text-[#686B5E] tracking-widest uppercase font-mono">
                <p>Protected by STITCH HOUSE Atelier Guarantee</p>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
