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
  CheckCircle2,
  MapPin,
  Smartphone,
  Building,
  User,
  Plus,
  Sparkles,
} from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getSubtotal, getTotal, discount, couponCode, clearCart, shippingFee, deliveryZone, setDeliveryZone } = useCartStore();
  const { user, addresses, isAuthenticated } = useAuthStore();
  const { createOrder } = useOrdersStore();

  const [mounted, setMounted] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState<string>('');
  
  // Address Form State
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
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
    if (addresses.length > 0) {
      const defaultAddr = addresses.find((a) => a.isDefault) || addresses[0];
      setSelectedAddressId(defaultAddr.id);
      setName(defaultAddr.name);
      setPhone(defaultAddr.phone);
      setAddress(defaultAddr.address);
      setCity(defaultAddr.city);
      setArea(defaultAddr.area);
      setPostalCode(defaultAddr.postalCode);
    } else if (user) {
      setName(user.name);
      setPhone(user.phone);
      setEmail(user.email);
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

  if (!mounted) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center text-xs font-mono text-neutral-500 uppercase tracking-widest">
        Securing Checkout Portal...
      </div>
    );
  }

  const subtotal = getSubtotal();
  const calculatedShipping = deliveryMethod === 'EXPRESS' ? 150 : shippingFee;
  const grandTotal = subtotal - discount + calculatedShipping;

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !phone.trim() || !address.trim() || !city.trim()) {
      toast.warning('Incomplete Address', 'Please provide full name, contact number, and address.');
      return;
    }

    setSubmitting(true);

    try {
      const orderId = createOrder({
        customer: {
          name,
          phone,
          email: email || undefined,
          address,
          city,
          area,
          postalCode,
        },
        items: items.map((i) => ({
          id: i.id,
          title: i.title,
          price: i.price,
          quantity: i.quantity,
          selectedSize: i.selectedSize,
          selectedColor: i.selectedColor,
          image: i.image,
        })),
        paymentMethod,
        paymentStatus: paymentMethod === 'COD' ? 'PENDING' : 'PAID',
        deliveryMethod,
        deliveryZone,
        shippingFee: calculatedShipping,
        subtotal,
        discount,
        total: grandTotal,
        notes: notes || undefined,
      });

      // Clear shopping bag
      clearCart();
      toast.success('Order Confirmed', `Order #${orderId} has been successfully logged.`);

      // Navigate to order confirmation
      router.push(`/order-confirmation/${orderId}`);
    } catch (err) {
      toast.error('Order Processing Error', 'An unexpected error occurred while reserving garments.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-neutral-900 py-10 md:py-16 px-4 sm:px-8 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="border-b border-neutral-200 pb-6 mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-500 font-bold block mb-2">
              Encrypted Checkout
            </span>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl uppercase font-extrabold tracking-tight text-black">
              Finalize Garment Order
            </h1>
          </div>
          <div className="flex items-center gap-2 font-mono text-xs text-neutral-800 bg-white border border-neutral-300 px-3.5 py-1.5 shadow-xs">
            <Lock className="w-3.5 h-3.5 text-black" />
            <span>256-Bit SSL Secured Atelier Gateway</span>
          </div>
        </div>

        {items.length === 0 ? (
          /* Empty Checkout Fallback */
          <div className="py-20 text-center border border-neutral-200 bg-white p-8 max-w-xl mx-auto shadow-sm">
            <ShoppingBag className="w-12 h-12 text-neutral-400 mx-auto mb-4 stroke-[1.2]" />
            <h3 className="font-display text-base font-bold uppercase tracking-widest text-black mb-2">
              Your Bag is Empty
            </h3>
            <p className="text-xs text-neutral-600 mb-6 font-sans">
              Add garments to your archive before accessing the checkout terminal.
            </p>
            <Link
              href="/shop"
              className="inline-block px-8 py-3.5 bg-black text-white font-display font-bold text-xs uppercase tracking-widest hover:bg-neutral-800 transition-colors"
            >
              Return to Archive
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
            {/* Left: Shipping, Delivery & Payment Methods (Col 7) */}
            <div className="lg:col-span-7 xl:col-span-8 space-y-10">
              {/* Step 1: Customer & Delivery Address */}
              <div className="p-6 sm:p-8 bg-white border border-neutral-200 shadow-sm space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-neutral-200">
                  <h2 className="font-display text-sm uppercase tracking-widest font-bold text-black flex items-center gap-2.5">
                    <Truck className="w-4 h-4 text-black" />
                    <span>1. Delivery Destination</span>
                  </h2>
                  {isAuthenticated && (
                    <span className="text-[11px] font-mono text-neutral-600 bg-neutral-100 px-2 py-0.5 border border-neutral-200">
                      Logged In: {user?.name}
                    </span>
                  )}
                </div>

                {/* Saved Address Cards (if available) */}
                {addresses.length > 0 && (
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-600 mb-3">
                      Saved Address Book:
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                      {addresses.map((addr) => (
                        <div
                          key={addr.id}
                          onClick={() => handleAddressSelect(addr.id)}
                          className={`p-4 border cursor-pointer transition-all ${
                            selectedAddressId === addr.id
                              ? 'border-black bg-neutral-50 shadow-md ring-1 ring-black'
                              : 'border-neutral-200 bg-white hover:border-neutral-400'
                          }`}
                        >
                          <div className="flex justify-between items-start mb-1">
                            <span className="font-display text-xs uppercase font-bold text-black">
                              {addr.name}
                            </span>
                            {addr.isDefault && (
                              <span className="text-[9px] font-mono text-black uppercase bg-neutral-200 px-1.5 py-0.5 font-bold">
                                Default
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-neutral-600 font-mono leading-relaxed line-clamp-2">
                            {addr.address}, {addr.area}, {addr.city}
                          </p>
                          <div className="text-[11px] font-mono text-neutral-500 mt-2">
                            {addr.phone}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Address Input Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-700 mb-1.5">
                      Recipient Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Nafis Al Safayet"
                      className="w-full bg-neutral-50 border border-neutral-300 px-3.5 py-2.5 text-xs text-black placeholder-neutral-400 focus:outline-none focus:border-black focus:bg-white transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-700 mb-1.5">
                      Contact Phone (WhatsApp/SMS) *
                    </label>
                    <input
                      type="text"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+880 1712-345678"
                      className="w-full bg-neutral-50 border border-neutral-300 px-3.5 py-2.5 text-xs text-black placeholder-neutral-400 focus:outline-none focus:border-black focus:bg-white transition-colors font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-700 mb-1.5">
                    Email Address (For Invoices &amp; Tracking)
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nafis@example.com"
                    className="w-full bg-neutral-50 border border-neutral-300 px-3.5 py-2.5 text-xs text-black placeholder-neutral-400 focus:outline-none focus:border-black focus:bg-white transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-700 mb-1.5">
                      District / City *
                    </label>
                    <select
                      value={city}
                      onChange={(e) => {
                        setCity(e.target.value);
                        setDeliveryZone(e.target.value.toLowerCase().includes('dhaka') ? 'DHAKA' : 'OUTSIDE_DHAKA');
                      }}
                      className="w-full bg-neutral-50 border border-neutral-300 px-3.5 py-2.5 text-xs text-black uppercase focus:outline-none focus:border-black focus:bg-white transition-colors"
                    >
                      <option value="Dhaka">Dhaka Metropolitan</option>
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
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-700 mb-1.5">
                      Area / Thana *
                    </label>
                    <input
                      type="text"
                      required
                      value={area}
                      onChange={(e) => setArea(e.target.value)}
                      placeholder="e.g. Banani / Dhanmondi"
                      className="w-full bg-neutral-50 border border-neutral-300 px-3.5 py-2.5 text-xs text-black placeholder-neutral-400 focus:outline-none focus:border-black focus:bg-white transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-700 mb-1.5">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      placeholder="1213"
                      className="w-full bg-neutral-50 border border-neutral-300 px-3.5 py-2.5 text-xs text-black placeholder-neutral-400 focus:outline-none focus:border-black focus:bg-white transition-colors font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-700 mb-1.5">
                    Street Address / House / Flat Number *
                  </label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="House 42, Road 11, Block D, Apt 4B"
                    className="w-full bg-neutral-50 border border-neutral-300 px-3.5 py-2.5 text-xs text-black placeholder-neutral-400 focus:outline-none focus:border-black focus:bg-white transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-700 mb-1.5">
                    Special Delivery Notes / Landmark (Optional)
                  </label>
                  <input
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g. Please leave with building concierge"
                    className="w-full bg-neutral-50 border border-neutral-300 px-3.5 py-2.5 text-xs text-black placeholder-neutral-400 focus:outline-none focus:border-black focus:bg-white transition-colors"
                  />
                </div>
              </div>

              {/* Step 2: Delivery Speed */}
              <div className="p-6 sm:p-8 bg-white border border-neutral-200 shadow-sm space-y-4">
                <h2 className="font-display text-sm uppercase tracking-widest font-bold text-black pb-3 border-b border-neutral-200 flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-black" />
                  <span>2. Delivery Speed &amp; Courier Service</span>
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <label
                    onClick={() => setDeliveryMethod('STANDARD')}
                    className={`p-4 border cursor-pointer flex flex-col justify-between transition-all ${
                      deliveryMethod === 'STANDARD'
                        ? 'border-black bg-neutral-50 shadow-md ring-1 ring-black'
                        : 'border-neutral-200 bg-white hover:border-neutral-400'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-display text-xs uppercase font-bold text-black">
                          Standard Courier
                        </span>
                        <span className="font-mono text-xs text-black font-bold">
                          {shippingFee === 0 ? 'FREE' : `৳${shippingFee}`}
                        </span>
                      </div>
                      <p className="text-[11px] text-neutral-600 font-sans leading-relaxed">
                        Inside Dhaka (24-48h) or Nationwide (3-5 days) with tracked delivery.
                      </p>
                    </div>
                  </label>

                  <label
                    onClick={() => setDeliveryMethod('EXPRESS')}
                    className={`p-4 border cursor-pointer flex flex-col justify-between transition-all ${
                      deliveryMethod === 'EXPRESS'
                        ? 'border-black bg-neutral-50 shadow-md ring-1 ring-black'
                        : 'border-neutral-200 bg-white hover:border-neutral-400'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-display text-xs uppercase font-bold text-black flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-black" />
                          <span>Atelier Priority Express</span>
                        </span>
                        <span className="font-mono text-xs text-black font-bold">৳150</span>
                      </div>
                      <p className="text-[11px] text-neutral-600 font-sans leading-relaxed">
                        Same-day / next-morning direct dispatch inside Dhaka with signature packaging.
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Step 3: Payment Method Selection */}
              <div className="p-6 sm:p-8 bg-white border border-neutral-200 shadow-sm space-y-6">
                <h2 className="font-display text-sm uppercase tracking-widest font-bold text-black pb-3 border-b border-neutral-200 flex items-center gap-2.5">
                  <CreditCard className="w-4 h-4 text-black" />
                  <span>3. Payment Method</span>
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    {
                      id: 'COD',
                      name: 'Cash on Delivery (COD)',
                      desc: 'Pay cash upon arrival. Check garment sizing with courier.',
                      badge: 'Convenient',
                    },
                    {
                      id: 'BKASH',
                      name: 'bKash Merchant Pay',
                      desc: 'Instant direct checkout via bKash payment gateway.',
                      badge: 'Instant',
                    },
                    {
                      id: 'NAGAD',
                      name: 'Nagad Digital Payment',
                      desc: 'Secure digital transfer with zero merchant transaction surcharge.',
                      badge: 'Zero Fee',
                    },
                    {
                      id: 'SSLCOMMERZ',
                      name: 'Debit / Credit Card (SSLCommerz)',
                      desc: 'Visa, Mastercard, Amex, UnionPay & internet banking.',
                      badge: 'Cards',
                    },
                  ].map((pm) => (
                    <div
                      key={pm.id}
                      onClick={() => setPaymentMethod(pm.id as any)}
                      className={`p-4 border cursor-pointer flex flex-col justify-between transition-all ${
                        paymentMethod === pm.id
                          ? 'border-black bg-neutral-50 shadow-md ring-1 ring-black'
                          : 'border-neutral-200 bg-white hover:border-neutral-400'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="font-display text-xs uppercase font-bold text-black">
                            {pm.name}
                          </span>
                          <span className="text-[9px] font-mono text-black bg-neutral-100 border border-neutral-200 px-1.5 py-0.5 uppercase font-medium">
                            {pm.badge}
                          </span>
                        </div>
                        <p className="text-[11px] text-neutral-600 font-sans leading-relaxed">
                          {pm.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Order Summary Sidebar (Col 5) */}
            <div className="lg:col-span-5 xl:col-span-4">
              <div className="p-6 sm:p-8 bg-white border border-neutral-200 shadow-lg space-y-6 sticky top-28">
                <h2 className="font-display text-sm uppercase tracking-widest font-bold text-black pb-4 border-b border-neutral-200">
                  Order Summary ({items.reduce((s, i) => s + i.quantity, 0)})
                </h2>

                {/* Items preview */}
                <div className="divide-y divide-neutral-100 max-h-[260px] overflow-y-auto pr-1">
                  {items.map((item) => (
                    <div key={`${item.id}-${item.selectedSize}`} className="py-3 flex gap-3 items-center">
                      <div className="w-12 h-14 bg-neutral-100 relative overflow-hidden border border-neutral-200 shrink-0">
                        <Image src={item.image} alt="" fill className="object-cover" />
                      </div>
                      <div className="flex-1 min-w-0 text-xs">
                        <h4 className="font-display uppercase text-black font-bold truncate">
                          {item.title}
                        </h4>
                        <div className="text-[10px] text-neutral-500 font-mono">
                          {item.selectedSize} • {item.selectedColor} • Qty: {item.quantity}
                        </div>
                      </div>
                      <span className="font-mono text-xs font-bold text-black">
                        ৳{(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Financial Totals */}
                <div className="space-y-2.5 font-mono text-xs text-neutral-600 pt-4 border-t border-neutral-200">
                  <div className="flex justify-between">
                    <span>Archive Subtotal</span>
                    <span className="text-black font-medium">৳{subtotal.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Shipping Fee ({deliveryMethod})</span>
                    <span className="text-black font-medium">
                      {calculatedShipping === 0 ? (
                        <strong className="text-black font-bold">FREE</strong>
                      ) : (
                        `৳${calculatedShipping.toLocaleString()}`
                      )}
                    </span>
                  </div>

                  {discount > 0 && (
                    <div className="flex justify-between text-black font-bold">
                      <span>Voucher ({couponCode})</span>
                      <span>-৳{discount.toLocaleString()}</span>
                    </div>
                  )}

                  <div className="pt-4 border-t border-neutral-200 flex justify-between items-baseline text-black">
                    <span className="font-display text-sm uppercase tracking-widest font-bold">
                      Final Total
                    </span>
                    <span className="font-mono text-2xl font-bold">
                      ৳{grandTotal.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Terms Agreement */}
                <div className="pt-2">
                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={termsAccepted}
                      onChange={(e) => setTermsAccepted(e.target.checked)}
                      className="mt-0.5 accent-black w-4 h-4 cursor-pointer"
                    />
                    <span className="text-[11px] text-neutral-600 font-sans leading-relaxed">
                      I agree to the FUKU Archive terms of sale, 7-day garment exchange guidelines, and privacy policy.
                    </span>
                  </label>
                </div>

                {/* Place Order Button */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 bg-black text-white hover:bg-neutral-800 disabled:opacity-50 font-display font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 transition-all shadow-md group"
                >
                  <span>{submitting ? 'Authenticating & Placing Order...' : 'Confirm & Place Order'}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
