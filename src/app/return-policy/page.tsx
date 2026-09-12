import React from 'react';
import Link from 'next/link';
import { RefreshCw, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Return & Exchange Policy | FUKU Archive',
  description: '7-day complimentary garment exchanges, store credit, and return procedures for FUKU pieces in Bangladesh.',
};

export default function ReturnPolicyPage() {
  return (
    <div className="min-h-screen bg-[#0E0F10] text-[#F3EFE7] py-12 md:py-20 px-4 sm:px-8 md:px-12">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-3 pb-8 border-b border-[#222426]">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#FF3B30] font-bold block">
            Client Guarantees
          </span>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-white">
            Return &amp; 7-Day Exchange Policy
          </h1>
          <p className="text-xs sm:text-sm text-[#8C9094] font-sans max-w-xl mx-auto">
            Ensuring every silhouette matches your exact sartorial expectations.
          </p>
        </div>

        <div className="space-y-8 text-xs sm:text-sm text-[#9CA0A4] leading-relaxed font-sans">
          <div className="p-8 bg-[#121315] border border-[#242628] space-y-4">
            <h2 className="font-display text-lg uppercase font-bold text-white flex items-center gap-2">
              <RefreshCw className="w-5 h-5 text-[#FF3B30]" />
              <span>1. 7-Day Complimentary Exchange Window</span>
            </h2>
            <p>
              We honor size and silhouette exchanges within 7 calendar days of receipt. Garments must be in pristine unworn condition with all garment tags, security zip cords, and custom dust bags intact.
            </p>
          </div>

          <div className="p-8 bg-[#121315] border border-[#242628] space-y-4">
            <h2 className="font-display text-lg uppercase font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <span>2. Flagship Walk-In or Courier Pickup</span>
            </h2>
            <p>
              Exchanges can be performed instantly at our Gulshan-2 Flagship Showroom, or you may initiate a home courier pickup through your online client portal. For pickups outside Dhaka, our courier will collect the package from your doorstep.
            </p>
          </div>

          <div className="p-8 bg-[#121315] border border-[#242628] space-y-4">
            <h2 className="font-display text-lg uppercase font-bold text-white">
              3. Refund &amp; Store Credit Procedures
            </h2>
            <p>
              In the event that an alternate size is sold out or if you prefer store credit, we provide lifetime non-expiring FUKU Archive vouchers or full refund settlement to your original payment method (bKash/Nagad/Cards) within 3 business days.
            </p>
          </div>
        </div>

        <div className="p-8 bg-[#121315] border border-[#242628] text-center space-y-4">
          <h3 className="font-display text-base uppercase font-bold text-white">
            Need to Initiate an Exchange?
          </h3>
          <p className="text-xs text-[#8C9094]">
            Access your order history to initiate a one-click return or contact our atelier desk.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/account/orders"
              className="px-6 py-3 bg-white text-black font-display font-bold text-xs uppercase tracking-widest hover:bg-[#E5E0D8]"
            >
              View My Orders
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
