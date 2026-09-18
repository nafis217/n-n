'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, PackageCheck, Clock, Truck, CheckCircle2, ArrowRight } from 'lucide-react';

export default function TrackOrderPage() {
  const [orderNumber, setOrderNumber] = useState('');
  const [phone, setPhone] = useState('');
  const [searched, setSearched] = useState(false);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);
  };

  return (
    <div className="min-h-screen bg-[#FAFAF8] text-[#111111] pt-24 pb-20">
      <div className="max-w-3xl mx-auto px-6 md:px-12">
        <div className="border-b border-[#E8E8E5] pb-6 mb-8 text-center">
          <span className="text-label text-[#9B9B9B] uppercase tracking-[0.16em] block mb-2 font-medium">
            Order Status
          </span>
          <h1
            className="font-display font-light text-[#111111]"
            style={{ fontSize: 'clamp(26px, 3.5vw, 40px)', letterSpacing: '-0.02em' }}
          >
            Track Order Fulfilment
          </h1>
          <p className="text-body text-xs text-[#6B6B6B] mt-2 max-w-md mx-auto">
            Enter your order reference code and registered contact number to retrieve live courier telemetry.
          </p>
        </div>

        <form onSubmit={handleTrack} className="bg-white p-8 border border-[#E8E8E5] mb-10 space-y-5">
          <div>
            <label className="text-label text-[#6B6B6B] block mb-2">
              Order Reference Number
            </label>
            <input
              type="text"
              placeholder="e.g. FUKU-20260912-8472"
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
              required
              className="w-full bg-white border border-[#D9D9D6] px-4 py-3 text-body text-[#111111] placeholder:text-[#9B9B9B] focus:outline-none focus:border-[#111111] transition-colors"
            />
          </div>

          <div>
            <label className="text-label text-[#6B6B6B] block mb-2">
              Contact Phone Number
            </label>
            <input
              type="tel"
              placeholder="+880 1712-345678"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="w-full bg-white border border-[#D9D9D6] px-4 py-3 text-body text-[#111111] placeholder:text-[#9B9B9B] focus:outline-none focus:border-[#111111] transition-colors"
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-[#111111] text-white text-label uppercase tracking-[0.14em] hover:bg-[#333] transition-colors cursor-pointer"
          >
            Track Waybill Status
          </button>
        </form>

        {searched && (
          <div className="border border-[#E8E8E5] p-8 bg-white space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#E8E8E5] gap-3">
              <div>
                <span className="text-label text-[10px] text-[#9B9B9B] uppercase tracking-wider">Order ID</span>
                <p className="text-body font-medium text-[#111111] uppercase tracking-wide">
                  {orderNumber || 'FUKU-20260912-8472'}
                </p>
              </div>
              <span className="px-3 py-1 bg-[#F7F7F5] border border-[#111111] text-[#111111] text-label text-[10px] uppercase font-medium w-fit">
                In Transit — Courier Dispatched
              </span>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <CheckCircle2 className="w-5 h-5 text-[#286749] shrink-0 mt-0.5" />
                <div>
                  <p className="text-label font-medium text-[#111111] uppercase tracking-wider">
                    Order Verified &amp; Garments Reserved
                  </p>
                  <p className="text-body text-xs text-[#6B6B6B] mt-0.5">
                    Physical inventory reserved at Tejgaon Central Atelier
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <CheckCircle2 className="w-5 h-5 text-[#286749] shrink-0 mt-0.5" />
                <div>
                  <p className="text-label font-medium text-[#111111] uppercase tracking-wider">
                    Quality Inspection &amp; Archival Packaging
                  </p>
                  <p className="text-body text-xs text-[#6B6B6B] mt-0.5">
                    Barcode verified picking &amp; matte black box sealing completed
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Truck className="w-5 h-5 text-[#111111] shrink-0 mt-0.5" />
                <div>
                  <p className="text-label font-medium text-[#111111] uppercase tracking-wider">
                    Out for Delivery — Express Courier
                  </p>
                  <p className="text-body text-xs text-[#6B6B6B] mt-0.5">
                    Tracking Code: PTH-84920194 | Estimated arrival in 24 hours
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-[#E8E8E5] text-center">
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 text-label text-xs text-[#6B6B6B] hover:text-[#111111] transition-colors"
              >
                Need assistance with this consignment? Contact Concierge &rarr;
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
