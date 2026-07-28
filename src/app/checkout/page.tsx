'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ShieldCheck, Truck, CreditCard, ArrowRight, Lock } from 'lucide-react';
import { useCartStore, CartItemType } from '@/lib/store/cart';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getSubtotal, clearCart } = useCartStore();

  const [customerName, setCustomerName] = useState('Nafis Safayet');
  const [customerPhone, setCustomerPhone] = useState('+8801700000000');
  const [customerEmail, setCustomerEmail] = useState('nafis@example.com');
  const [district, setDistrict] = useState('Dhaka');
  const [thana, setThana] = useState('Dhanmondi');
  const [street, setStreet] = useState('Road 27, House 42');
  const [paymentMethod, setPaymentMethod] = useState<'COD' | 'BKASH' | 'NAGAD' | 'CARD'>('COD');
  const [notes, setNotes] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const subtotalBDT = getSubtotal();
  const isInsideDhaka = district.toLowerCase().includes('dhaka');
  const shippingBDT = items.length > 0 ? (isInsideDhaka ? 120 : 160) : 0;
  const totalBDT = subtotalBDT + shippingBDT;

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSubmitting(true);

    try {
      const response = await fetch('/api/orders/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName,
          customerPhone,
          customerEmail,
          district,
          thana,
          street,
          paymentMethod,
          items: items.map((i) => ({ variantId: i.variantId, quantity: i.quantity })),
          notes,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Order submission failed');
      }

      clearCart();
      router.push(`/order-confirmation/${data.orderId}`);
    } catch (err: any) {
      setErrorMessage(err.message || 'Payment processing error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full px-margin-mobile md:px-margin-desktop py-12">
      <div className="border-b border-outline-variant pb-6 mb-10 flex flex-col md:flex-row justify-between items-start md:items-end">
        <div>
          <span className="font-label-caps text-label-caps text-outline uppercase block mb-2 font-semibold">
            Secure Checkout
          </span>
          <h1 className="font-headline-lg text-3xl md:text-4xl uppercase font-semibold text-primary">
            Finalize Your Order
          </h1>
        </div>
        <div className="flex items-center gap-2 font-label-caps text-xs text-emerald-700 font-bold mt-2 md:mt-0">
          <Lock className="w-4 h-4" />
          <span>256-BIT ENCRYPTED CHECKOUT</span>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="py-20 text-center border border-dashed border-outline-variant">
          <p className="font-label-caps text-sm text-secondary uppercase mb-4">
            Your shopping bag is empty. Please add items before checking out.
          </p>
          <Link href="/products">
            <Button variant="primary" size="md">
              Return to Catalogue
            </Button>
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left: Shipping & Payment Details */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            {/* Step 1: Delivery Address */}
            <div className="bg-surface-container-low p-8 border border-outline-variant">
              <h2 className="font-label-caps text-sm uppercase font-bold text-primary pb-3 border-b border-outline-variant mb-6 flex items-center gap-2">
                <Truck className="w-4 h-4 text-primary" />
                <span>1. Delivery Address &amp; Customer Information</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Full Name"
                  placeholder="E.g. Nafis Safayet"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  required
                />
                <Input
                  label="Mobile Number"
                  placeholder="+8801700000000"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  required
                />
              </div>

              <Input
                label="Email Address (Optional)"
                placeholder="nafis@example.com"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="District"
                  placeholder="Dhaka / Chittagong / Sylhet"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  required
                />
                <Input
                  label="Thana / Area"
                  placeholder="Dhanmondi / Gulshan / Uttara"
                  value={thana}
                  onChange={(e) => setThana(e.target.value)}
                  required
                />
              </div>

              <Input
                label="Street Address / House &amp; Road"
                placeholder="House 42, Road 27, Flat 4B"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                required
              />

              <Input
                label="Special Delivery Notes"
                placeholder="E.g. Call before delivery"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            {/* Step 2: Payment Method */}
            <div className="bg-surface-container-low p-8 border border-outline-variant">
              <h2 className="font-label-caps text-sm uppercase font-bold text-primary pb-3 border-b border-outline-variant mb-6 flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-primary" />
                <span>2. Select Payment Method</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    id: 'COD',
                    title: 'Cash on Delivery (COD)',
                    desc: 'Pay cash upon doorstep delivery inside or outside Dhaka.',
                  },
                  {
                    id: 'BKASH',
                    title: 'bKash Direct Gateway',
                    desc: 'Instant 1-click bKash wallet authorization.',
                  },
                  {
                    id: 'NAGAD',
                    title: 'Nagad Online Payment',
                    desc: 'Fast digital payment via Nagad merchant.',
                  },
                  {
                    id: 'CARD',
                    title: 'Debit / Credit Card',
                    desc: 'Visa, MasterCard, or AMEX via SSLCommerz gateway.',
                  },
                ].map((pm) => (
                  <label
                    key={pm.id}
                    className={`p-4 border cursor-pointer flex flex-col justify-between transition-all ${
                      paymentMethod === pm.id
                        ? 'border-primary bg-white shadow-xs font-bold'
                        : 'border-outline-variant bg-transparent hover:border-primary'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <input
                          type="radio"
                          name="payment"
                          checked={paymentMethod === pm.id}
                          onChange={() => setPaymentMethod(pm.id as any)}
                          className="accent-primary"
                        />
                        <span className="font-label-caps text-xs text-primary uppercase font-bold">
                          {pm.title}
                        </span>
                      </div>
                      <p className="font-body-md text-[11px] text-secondary pl-6 leading-relaxed">
                        {pm.desc}
                      </p>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Order Summary */}
          <div className="p-8 bg-surface-container-low border border-outline-variant flex flex-col justify-between h-fit">
            <div>
              <h2 className="font-label-caps text-sm uppercase font-bold text-primary pb-4 border-b border-outline-variant mb-6">
                Bag Contents ({items.length})
              </h2>

              <div className="flex flex-col divide-y divide-outline-variant mb-6 max-h-[300px] overflow-y-auto pr-2">
                {items.map((item: CartItemType) => (
                  <div key={item.variantId} className="py-3 flex justify-between items-center text-xs font-nav-item">
                    <div>
                      <p className="font-bold text-primary uppercase">{item.title}</p>
                      <p className="text-secondary text-[11px]">{item.color} | {item.size} × {item.quantity}</p>
                    </div>
                    <span className="font-bold text-primary">৳ {(item.priceBDT * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-3 font-label-caps text-xs text-secondary mb-6 pt-4 border-t border-outline-variant">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-primary font-semibold">৳ {subtotalBDT.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping ({isInsideDhaka ? 'Inside Dhaka' : 'Outside Dhaka'})</span>
                  <span className="text-primary font-semibold">৳ {shippingBDT.toLocaleString()}</span>
                </div>
                <div className="pt-4 border-t border-outline-variant flex justify-between text-base font-bold text-primary">
                  <span>Total Payable</span>
                  <span className="text-display text-xl">৳ {totalBDT.toLocaleString()}</span>
                </div>
              </div>

              {errorMessage && (
                <div className="p-3 bg-red-50 border border-red-200 text-error font-label-caps text-xs uppercase mb-6 font-semibold">
                  {errorMessage}
                </div>
              )}
            </div>

            <Button
              variant="primary"
              size="lg"
              fullWidth
              type="submit"
              disabled={submitting}
              className="flex items-center justify-center gap-2"
            >
              <span>{submitting ? 'RESERVING STOCK...' : 'PLACE ORDER NOW'}</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
