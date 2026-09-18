'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useCartStore } from '@/lib/store/cart';
import { useAuthStore } from '@/lib/store/auth';
import { useOrdersStore } from '@/lib/store/orders';
import { toast } from '@/lib/store/toast';
import {
  ShieldCheck,
  Truck,
  CreditCard,
  ArrowRight,
  Lock,
  ShoppingBag,
  Check,
  MapPin,
  Sparkles,
  ArrowLeft,
  ChevronRight,
  RefreshCw,
  Plus,
} from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const {
    items,
    addItem,
    getSubtotal,
    getTotal,
    discount,
    couponCode,
    clearCart,
    shippingFee,
    deliveryZone,
    setDeliveryZone,
  } = useCartStore();
  const { user, addresses, isAuthenticated } = useAuthStore();
  const { createOrder } = useOrdersStore();

  const [mounted, setMounted] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState<string>('');

  // Address Form State
  const [name, setName] = useState('Nafis Al Safayet');
  const [phone, setPhone] = useState('+880 1712-345678');
  const [email, setEmail] = useState('nafis@fukustudio.com');
  const [address, setAddress] = useState('House 42, Road 11, Block D');
  const [city, setCity] = useState('Dhaka');
  const [area, setArea] = useState('Banani / Gulshan');
  const [postalCode, setPostalCode] = useState('1213');
  const [notes, setNotes] = useState('');

  // Delivery & Payment
  const [deliveryMethod, setDeliveryMethod] = useState<'STANDARD' | 'EXPRESS'>('STANDARD');
  const [paymentMethod, setPaymentMethod] = useState<'COD' | 'BKASH' | 'NAGAD' | 'ROCKET' | 'SSLCOMMERZ'>('COD');
  const [submitting, setSubmitting] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(true);

  useEffect(() => {
    setMounted(true);
    if (addresses && addresses.length > 0) {
      const defaultAddr = addresses.find((a) => a.isDefault) || addresses[0];
      setSelectedAddressId(defaultAddr.id);
      setName(defaultAddr.name || 'Nafis Al Safayet');
      setPhone(defaultAddr.phone || '+880 1712-345678');
      setAddress(defaultAddr.address || 'House 42, Road 11, Block D');
      setCity(defaultAddr.city || 'Dhaka');
      setArea(defaultAddr.area || 'Banani / Gulshan');
      setPostalCode(defaultAddr.postalCode || '1213');
    } else if (user) {
      if (user.name) setName(user.name);
      if (user.phone) setPhone(user.phone);
      if (user.email) setEmail(user.email);
    }
  }, [addresses, user]);

  const handleAddressSelect = (addrId: string) => {
    setSelectedAddressId(addrId);
    const target = addresses.find((a) => a.id === addrId);
    if (target) {
      setName(target.name);
      setPhone(target.phone);
      setAddress(target.address);
      setCity(target.city);
      setArea(target.area);
      setPostalCode(target.postalCode);
    }
  };

  const handleQuickAddSample = () => {
    addItem({
      id: 'prod-suit-01',
      productId: 'prod-suit-01',
      title: 'Architectural Obsidian Tailored Suit',
      sku: 'FUKU-SUIT-01-M',
      color: 'Obsidian Jet Black',
      selectedColor: 'Obsidian Jet Black',
      size: '40R',
      selectedSize: '40R',
      price: 28500,
      priceBDT: 28500,
      currency: 'BDT',
      image: '/images/products/architectural-black-suit-1.jpg',
      quantity: 1,
      stockAvailable: 18,
    });
    toast.success('Garment Added', 'Architectural Obsidian Tailored Suit added to your checkout bag.');
  };

  const subtotal = typeof getSubtotal === 'function' ? getSubtotal() : items.reduce((s, i) => s + (i.price || 0) * (i.quantity || 1), 0);
  const calculatedShipping = deliveryMethod === 'EXPRESS' ? 150 : (shippingFee ?? 80);
  const grandTotal = Math.max(0, subtotal - (discount || 0) + calculatedShipping);
  const totalItemCount = items.reduce((s, i) => s + (i.quantity || 1), 0);

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !phone.trim() || !address.trim() || !city.trim()) {
      toast.warning('Incomplete Information', 'Please complete recipient name, contact phone, and delivery address.');
      return;
    }

    if (!termsAccepted) {
      toast.warning('Terms Required', 'Please accept the terms of sale to proceed.');
      return;
    }

    if (items.length === 0) {
      toast.warning('Empty Bag', 'Please add garments to your bag before checking out.');
      return;
    }

    setSubmitting(true);
    try {
      const newOrder = createOrder({
        items: items.map((i) => ({
          id: i.id,
          title: i.title,
          price: i.price,
          quantity: i.quantity || 1,
          selectedSize: i.selectedSize || i.size || 'Standard',
          selectedColor: i.selectedColor || i.color || 'Standard',
          image: i.image,
        })),
        shippingAddress: {
          name,
          phone,
          email: email || '',
          address,
          city,
          area,
          postalCode,
          notes: notes || undefined,
        },
        paymentMethod,
        paymentStatus: paymentMethod === 'COD' ? 'UNPAID' : 'PAID',
        deliveryMethod: deliveryMethod === 'EXPRESS' ? 'EXPRESS' : 'STANDARD',
        status: 'PENDING',
        currency: 'BDT',
        subtotal,
        discount: discount || 0,
        shipping: calculatedShipping,
        total: grandTotal,
        estimatedDelivery: deliveryMethod === 'EXPRESS' ? 'Same-Day Evening' : '24–48 Hours',
      });

      // Clear shopping bag
      clearCart();
      toast.success('Order Placed', `Order #${newOrder.orderNumber} has been logged.`);

      // Navigate to order confirmation
      router.push(`/order-confirmation/${newOrder.id}`);
    } catch (err) {
      toast.error('Processing Error', 'An unexpected error occurred while placing your order.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-black pt-24 pb-24">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        {/* Top Minimal Navigation / Breadcrumbs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-8 mb-8 border-b border-[#E8E8E5] gap-4">
          <div className="flex items-center gap-3 text-label">
            <Link
              href="/bag"
              className="text-[#6B6B6B] hover:text-black transition-colors flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5 stroke-[1.25]" />
              Bag
            </Link>
            <span className="text-[#D9D9D6]">/</span>
            <span className="text-black font-medium">Checkout</span>
            <span className="text-[#D9D9D6]">/</span>
            <span className="text-[#9B9B9B]">Confirmation</span>
          </div>

          <div className="flex items-center gap-2 text-label text-[#6B6B6B]">
            <Lock className="w-3.5 h-3.5 stroke-[1.25] text-black" />
            <span>256-Bit SSL Encrypted Checkout</span>
          </div>
        </div>

        {items.length === 0 ? (
          /* Empty Checkout Fallback with 1-Click Quick Add */
          <div className="py-20 text-center max-w-lg mx-auto bg-[#FAFAFA] border border-[#E8E8E5] p-8 md:p-12">
            <ShoppingBag className="w-12 h-12 text-[#9B9B9B] stroke-[1] mx-auto mb-5" />
            <h1
              className="font-display font-light text-black mb-3"
              style={{ fontSize: 'clamp(24px, 3vw, 36px)', letterSpacing: '-0.02em' }}
            >
              Your bag is empty.
            </h1>
            <p className="text-body text-xs text-[#6B6B6B] mb-8 leading-relaxed">
              Add garments from the new AW 2026 archive or click below to quickly load a sample tailored piece to test checkout.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={handleQuickAddSample}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-black text-white text-label uppercase tracking-[0.14em] hover:bg-[#333] transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                Quick-Add Obsidian Suit (৳28,500)
              </button>

              <Link
                href="/shop"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white border border-[#D9D9D6] text-black text-label uppercase tracking-[0.14em] hover:bg-[#F3F3F1] transition-colors"
              >
                Explore Collection
                <ArrowRight className="w-3.5 h-3.5 stroke-[1.25]" />
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-16">
            {/* Left Column: Form Details (Col 7 / 8) */}
            <div className="lg:col-span-7 xl:col-span-8 space-y-12">
              {/* Section 01: Customer & Delivery Address */}
              <section className="space-y-6">
                <div className="flex items-baseline justify-between pb-3 border-b border-black">
                  <h2 className="text-label uppercase tracking-[0.14em] font-medium text-black">
                    01 / Delivery Destination
                  </h2>
                  {isAuthenticated && user && (
                    <span className="text-label text-[#6B6B6B]">
                      Signed in as <strong className="text-black font-medium">{user.name}</strong>
                    </span>
                  )}
                </div>

                {/* Saved Addresses (if available) */}
                {addresses && addresses.length > 0 && (
                  <div className="space-y-3">
                    <span className="text-label text-[#6B6B6B] block">Saved Addresses</span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {addresses.map((addr) => {
                        const isSelected = selectedAddressId === addr.id;
                        return (
                          <div
                            key={addr.id}
                            onClick={() => handleAddressSelect(addr.id)}
                            className={`p-4 border transition-colors cursor-pointer ${
                              isSelected
                                ? 'border-black bg-[#F7F7F5]'
                                : 'border-[#E8E8E5] bg-white hover:border-black'
                            }`}
                          >
                            <div className="flex justify-between items-start mb-1">
                              <span className="text-label font-medium text-black uppercase tracking-[0.08em]">
                                {addr.name}
                              </span>
                              {addr.isDefault && (
                                <span className="text-[9px] uppercase tracking-[0.1em] text-[#6B6B6B] bg-[#E8E8E5] px-1.5 py-0.5">
                                  Default
                                </span>
                              )}
                            </div>
                            <p className="text-body text-xs text-[#6B6B6B] leading-relaxed line-clamp-2">
                              {addr.address}, {addr.area}, {addr.city}
                            </p>
                            <p className="text-label text-[#9B9B9B] mt-2">{addr.phone}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Form Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-label text-[#6B6B6B] block mb-2">
                      Recipient Full Name <span className="text-[#B42318]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Nafis Al Safayet"
                      className="w-full bg-white border border-[#D9D9D6] px-4 py-3 text-body text-black placeholder:text-[#9B9B9B] focus:outline-none focus:border-black transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-label text-[#6B6B6B] block mb-2">
                      Phone Number <span className="text-[#B42318]">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+880 1712-345678"
                      className="w-full bg-white border border-[#D9D9D6] px-4 py-3 text-body text-black placeholder:text-[#9B9B9B] focus:outline-none focus:border-black transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-label text-[#6B6B6B] block mb-2">
                    Email Address (For Invoicing &amp; Tracking)
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nafis@example.com"
                    className="w-full bg-white border border-[#D9D9D6] px-4 py-3 text-body text-black placeholder:text-[#9B9B9B] focus:outline-none focus:border-black transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-label text-[#6B6B6B] block mb-2">
                      District / City <span className="text-[#B42318]">*</span>
                    </label>
                    <div className="relative">
                      <select
                        value={city}
                        onChange={(e) => {
                          setCity(e.target.value);
                          setDeliveryZone(e.target.value.toLowerCase().includes('dhaka') ? 'DHAKA' : 'OUTSIDE_DHAKA');
                        }}
                        className="w-full bg-white border border-[#D9D9D6] px-4 py-3 text-body text-black focus:outline-none focus:border-black transition-colors appearance-none cursor-pointer"
                      >
                        <option value="Dhaka">Dhaka</option>
                        <option value="Chittagong">Chittagong</option>
                        <option value="Sylhet">Sylhet</option>
                        <option value="Rajshahi">Rajshahi</option>
                        <option value="Khulna">Khulna</option>
                        <option value="Barisal">Barisal</option>
                        <option value="Rangpur">Rangpur</option>
                        <option value="Mymensingh">Mymensingh</option>
                        <option value="Comilla">Comilla</option>
                        <option value="Gazipur">Gazipur</option>
                        <option value="Narayanganj">Narayanganj</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#6B6B6B]">
                        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                          <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-label text-[#6B6B6B] block mb-2">
                      Area / Thana <span className="text-[#B42318]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={area}
                      onChange={(e) => setArea(e.target.value)}
                      placeholder="e.g. Banani / Dhanmondi"
                      className="w-full bg-white border border-[#D9D9D6] px-4 py-3 text-body text-black placeholder:text-[#9B9B9B] focus:outline-none focus:border-black transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-label text-[#6B6B6B] block mb-2">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      placeholder="1213"
                      className="w-full bg-white border border-[#D9D9D6] px-4 py-3 text-body text-black placeholder:text-[#9B9B9B] focus:outline-none focus:border-black transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-label text-[#6B6B6B] block mb-2">
                    Detailed Street Address / House / Flat <span className="text-[#B42318]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="House 42, Road 11, Block D, Apt 4B"
                    className="w-full bg-white border border-[#D9D9D6] px-4 py-3 text-body text-black placeholder:text-[#9B9B9B] focus:outline-none focus:border-black transition-colors"
                  />
                </div>

                <div>
                  <label className="text-label text-[#6B6B6B] block mb-2">
                    Delivery Instructions / Landmark (Optional)
                  </label>
                  <input
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g. Leave with concierge or call upon arrival"
                    className="w-full bg-white border border-[#D9D9D6] px-4 py-3 text-body text-black placeholder:text-[#9B9B9B] focus:outline-none focus:border-black transition-colors"
                  />
                </div>
              </section>

              {/* Section 02: Delivery Speed */}
              <section className="space-y-6">
                <div className="pb-3 border-b border-black">
                  <h2 className="text-label uppercase tracking-[0.14em] font-medium text-black">
                    02 / Delivery Method
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div
                    onClick={() => setDeliveryMethod('STANDARD')}
                    className={`p-5 border cursor-pointer transition-colors flex flex-col justify-between ${
                      deliveryMethod === 'STANDARD'
                        ? 'border-black bg-[#F7F7F5]'
                        : 'border-[#E8E8E5] bg-white hover:border-black'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="text-label font-medium uppercase tracking-[0.1em] text-black">
                          Standard Courier
                        </p>
                        <p className="text-body text-xs text-[#6B6B6B] mt-1">
                          24–48 hours inside Dhaka • 3–5 days nationwide
                        </p>
                      </div>
                      <span className="text-body text-xs font-medium text-black">
                        {calculatedShipping === 0 ? 'FREE' : `৳${calculatedShipping}`}
                      </span>
                    </div>
                  </div>

                  <div
                    onClick={() => setDeliveryMethod('EXPRESS')}
                    className={`p-5 border cursor-pointer transition-colors flex flex-col justify-between ${
                      deliveryMethod === 'EXPRESS'
                        ? 'border-black bg-[#F7F7F5]'
                        : 'border-[#E8E8E5] bg-white hover:border-black'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <p className="text-label font-medium uppercase tracking-[0.1em] text-black">
                            Express Delivery
                          </p>
                          <span className="text-[9px] uppercase tracking-[0.08em] bg-black text-white px-1.5 py-0.2">
                            Fast
                          </span>
                        </div>
                        <p className="text-body text-xs text-[#6B6B6B] mt-1">
                          Same-day or next-morning dispatch (Dhaka only)
                        </p>
                      </div>
                      <span className="text-body text-xs font-medium text-black">৳150</span>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 03: Payment Method */}
              <section className="space-y-6">
                <div className="pb-3 border-b border-black">
                  <h2 className="text-label uppercase tracking-[0.14em] font-medium text-black">
                    03 / Payment Method
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    {
                      id: 'COD',
                      name: 'Cash on Delivery',
                      desc: 'Pay cash to the courier upon delivery inspection.',
                      tag: 'Standard',
                    },
                    {
                      id: 'BKASH',
                      name: 'bKash Digital Pay',
                      desc: 'Direct payment via bKash mobile gateway.',
                      tag: 'Instant',
                    },
                    {
                      id: 'NAGAD',
                      name: 'Nagad Digital Wallet',
                      desc: 'Instant checkout with zero transaction surcharge.',
                      tag: '0% Surcharge',
                    },
                    {
                      id: 'SSLCOMMERZ',
                      name: 'Card / Net Banking',
                      desc: 'Visa, Mastercard, Amex & local internet banking.',
                      tag: 'Secured',
                    },
                  ].map((pm) => {
                    const isSelected = paymentMethod === pm.id;
                    return (
                      <div
                        key={pm.id}
                        onClick={() => setPaymentMethod(pm.id as any)}
                        className={`p-5 border cursor-pointer transition-colors flex flex-col justify-between ${
                          isSelected
                            ? 'border-black bg-[#F7F7F5]'
                            : 'border-[#E8E8E5] bg-white hover:border-black'
                        }`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <span className="text-label font-medium uppercase tracking-[0.1em] text-black">
                            {pm.name}
                          </span>
                          <span className="text-[9px] uppercase tracking-[0.1em] text-[#6B6B6B] bg-[#E8E8E5] px-1.5 py-0.5">
                            {pm.tag}
                          </span>
                        </div>
                        <p className="text-body text-xs text-[#6B6B6B] leading-relaxed">{pm.desc}</p>
                      </div>
                    );
                  })}
                </div>
              </section>
            </div>

            {/* Right Column: Order Summary (Col 5 / 4) */}
            <div className="lg:col-span-5 xl:col-span-4">
              <div className="bg-white border border-[#E8E8E5] p-6 lg:p-8 space-y-6 sticky top-28">
                <div className="pb-4 border-b border-[#E8E8E5] flex items-center justify-between">
                  <h2 className="text-label uppercase tracking-[0.14em] font-medium text-black">
                    Summary
                  </h2>
                  <span className="text-label text-[#6B6B6B]">
                    {totalItemCount} item{totalItemCount !== 1 ? 's' : ''}
                  </span>
                </div>

                {/* Items preview */}
                <div className="divide-y divide-[#F0F0EE] max-h-[300px] overflow-y-auto pr-1">
                  {items.map((item) => (
                    <div key={`${item.id}-${item.selectedSize}`} className="py-3.5 flex gap-3.5 items-center">
                      <div className="w-12 h-16 bg-[#F0F0EE] relative overflow-hidden shrink-0">
                        <Image src={item.image} alt={item.title} fill className="object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-body text-xs font-medium text-black uppercase tracking-[0.04em] truncate">
                          {item.title}
                        </h4>
                        <p className="text-label text-[10px] text-[#6B6B6B] mt-0.5">
                          {item.selectedSize || 'Standard'} • {item.selectedColor || 'Standard'} • Qty {item.quantity}
                        </p>
                      </div>
                      <span className="text-body text-xs font-medium text-black shrink-0">
                        ৳{(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Financial Totals */}
                <div className="space-y-3 pt-4 border-t border-[#E8E8E5] text-body text-xs">
                  <div className="flex justify-between text-[#6B6B6B]">
                    <span>Subtotal</span>
                    <span className="text-black font-medium">৳{subtotal.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between text-[#6B6B6B]">
                    <span>Delivery ({deliveryMethod === 'EXPRESS' ? 'Express' : 'Standard'})</span>
                    <span className="text-black font-medium">
                      {calculatedShipping === 0 ? 'FREE' : `৳${calculatedShipping.toLocaleString()}`}
                    </span>
                  </div>

                  {discount > 0 && (
                    <div className="flex justify-between text-[#286749]">
                      <span>Voucher Discount ({couponCode})</span>
                      <span className="font-medium">-৳{discount.toLocaleString()}</span>
                    </div>
                  )}

                  <div className="pt-4 border-t border-black flex justify-between items-baseline">
                    <span className="text-label uppercase tracking-[0.14em] font-medium text-black">
                      Total
                    </span>
                    <span className="text-xl font-medium text-black tracking-tight">
                      ৳{grandTotal.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Terms Agreement Checkbox */}
                <div className="pt-2">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={termsAccepted}
                      onChange={(e) => setTermsAccepted(e.target.checked)}
                      className="mt-0.5 w-4 h-4 accent-[#111111] cursor-pointer"
                    />
                    <span className="text-body text-[11px] text-[#6B6B6B] leading-relaxed select-none">
                      I agree to the FUKU terms of sale, 7-day garment exchange policy, and privacy statement.
                    </span>
                  </label>
                </div>

                {/* Submit Order Button */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 bg-black text-white text-label uppercase tracking-[0.14em] hover:bg-[#333] transition-colors disabled:opacity-50 flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <span>{submitting ? 'Placing Order...' : 'Confirm & Place Order'}</span>
                  <ArrowRight className="w-3.5 h-3.5 stroke-[1.25] group-hover:translate-x-0.5 transition-transform" />
                </button>

                {/* Trust Elements */}
                <div className="pt-4 border-t border-[#E8E8E5] space-y-2">
                  <div className="flex items-center gap-2 text-label text-[10px] text-[#6B6B6B]">
                    <ShieldCheck className="w-3.5 h-3.5 stroke-[1.25] text-black" />
                    <span>Guaranteed Authentic Atelier Garments</span>
                  </div>
                  <div className="flex items-center gap-2 text-label text-[10px] text-[#6B6B6B]">
                    <RefreshCw className="w-3.5 h-3.5 stroke-[1.25] text-black" />
                    <span>7-Day Complimentary Exchange Policy</span>
                  </div>
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
