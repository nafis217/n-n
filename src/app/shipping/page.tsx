import React from 'react';
import Link from 'next/link';
import { Truck, ShieldCheck, Clock, MapPin, Sparkles, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Shipping & Delivery Logistics | FUKU Archive',
  description: 'Nationwide Bangladesh delivery timelines, express same-day courier dispatch, and international freight guidelines.',
};

export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-[#0E0F10] text-[#F3EFE7] py-12 md:py-20 px-4 sm:px-8 md:px-12">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-3 pb-8 border-b border-[#222426]">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#FF3B30] font-bold block">
            Logistics Protocol
          </span>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-white">
            Shipping &amp; Delivery Logistics
          </h1>
          <p className="text-xs sm:text-sm text-[#8C9094] font-sans max-w-xl mx-auto">
            Comprehensive courier handling for our handcrafted garments, luxury outerwear, and artisanal accessories.
          </p>
        </div>

        {/* Shipping Rates & Service Levels */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-6 bg-[#121315] border border-[#242628] space-y-3">
            <div className="text-xs font-mono text-[#FF3B30] uppercase font-bold">Standard Delivery</div>
            <h3 className="font-display text-lg uppercase font-bold text-white">Dhaka Metro</h3>
            <p className="font-mono text-xl font-bold text-white">৳80 / Free over ৳10k</p>
            <p className="text-xs text-[#8C9094] font-sans">
              24–48 hours transit window. Delivered directly to your residence or office.
            </p>
          </div>

          <div className="p-6 bg-[#121315] border border-[#242628] space-y-3">
            <div className="text-xs font-mono text-[#FF3B30] uppercase font-bold">Nationwide Courier</div>
            <h3 className="font-display text-lg uppercase font-bold text-white">Outside Dhaka</h3>
            <p className="font-mono text-xl font-bold text-white">৳150 / Free over ৳10k</p>
            <p className="text-xs text-[#8C9094] font-sans">
              3–5 business days across all 64 districts in Bangladesh via tracked courier partner.
            </p>
          </div>

          <div className="p-6 bg-[#121315] border border-[#242628] space-y-3">
            <div className="text-xs font-mono text-amber-400 uppercase font-bold flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> Priority Dispatch
            </div>
            <h3 className="font-display text-lg uppercase font-bold text-white">Express Same-Day</h3>
            <p className="font-mono text-xl font-bold text-white">৳150 Flat</p>
            <p className="text-xs text-[#8C9094] font-sans">
              Orders placed before 1:00 PM inside Dhaka dispatched same-evening with signature packaging.
            </p>
          </div>
        </div>

        {/* Packaging & Safety */}
        <div className="p-8 bg-[#121315] border border-[#242628] space-y-6 text-xs sm:text-sm text-[#9CA0A4] leading-relaxed font-sans">
          <h2 className="font-display text-xl uppercase font-bold text-white">
            Signature Garment Packaging
          </h2>
          <p>
            Every piece from the FUKU Archive arrives in our custom matte black archival garment boxes, wrapped in acid-free tissue paper with our embossed seal of authenticity. Outerwear pieces include heavy-duty breathable dust bags and custom wooden hangers.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#202224] text-xs font-mono text-white">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Full Transit Insurance Coverage</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#FF3B30]" />
              <span>Real-Time SMS Waybill Tracking</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
