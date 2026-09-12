import React from 'react';
import Link from 'next/link';
import { RefreshCw, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Return & Exchange Policy | FUKU Archive',
  description: '7-day complimentary garment exchanges, store credit, and return procedures for FUKU pieces in Bangladesh.',
};

export default function ReturnPolicyPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] text-black py-12 md:py-20 px-4 sm:px-8 md:px-12">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-3 pb-8 border-b border-neutral-200">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-neutral-500 font-bold block">
            Client Guarantees
          </span>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-black">
            Return &amp; 7-Day Exchange Policy
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600 font-sans max-w-xl mx-auto">
            Ensuring every silhouette matches your exact sartorial expectations.
          </p>
        </div>

        <div className="space-y-8 text-xs sm:text-sm text-neutral-600 leading-relaxed font-sans">
          <div className="p-8 bg-white border border-neutral-200 shadow-sm space-y-4">
            <h2 className="font-display text-lg uppercase font-bold text-black flex items-center gap-2">
              <RefreshCw className="w-5 h-5 text-black" />
              <span>1. 7-Day Complimentary Exchange Window</span>
            </h2>
            <p>
              We honor size and silhouette exchanges within 7 calendar days of receipt. Garments must be in pristine unworn condition with all garment tags, security zip cords, and custom dust bags intact.
            </p>
          </div>

          <div className="p-8 bg-white border border-neutral-200 shadow-sm space-y-4">
            <h2 className="font-display text-lg uppercase font-bold text-black flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-black" />
              <span>2. Flagship Walk-In or Courier Pickup</span>
            </h2>
            <p>
              Exchanges can be performed instantly at our Gulshan-2 Flagship Showroom, or you may initiate a home courier pickup through your online client portal. For pickups outside Dhaka, our courier will collect the package from your doorstep.
            </p>
          </div>

          <div className="p-8 bg-white border border-neutral-200 shadow-sm space-y-4">
            <h2 className="font-display text-lg uppercase font-bold text-black">
              3. Refund &amp; Store Credit Procedures
            </h2>
            <p>
              In the event that an alternate size is sold out or if you prefer store credit, we provide lifetime non-expiring FUKU Archive vouchers or full refund settlement to your original payment method (bKash/Nagad/Cards) within 3 business days.
            </p>
          </div>
        </div>

        <div className="p-8 bg-white border border-neutral-200 shadow-sm text-center space-y-4">
          <h3 className="font-display text-base uppercase font-bold text-black">
            Need to Initiate an Exchange?
          </h3>
          <p className="text-xs text-neutral-600">
            Access your order history to initiate a one-click return or contact our atelier desk.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/account/orders"
              className="px-6 py-3 bg-black text-white font-display font-bold text-xs uppercase tracking-widest hover:bg-neutral-800 transition-colors shadow-sm"
            >
              View My Orders
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
