import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Terms & Conditions | FUKU Archive',
  description: 'Terms of service, sales terms, intellectual property, and transactional protocols for FUKU garments.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] text-black py-12 md:py-20 px-4 sm:px-8 md:px-12">
      <div className="max-w-4xl mx-auto space-y-10">
        <div className="text-center space-y-3 pb-8 border-b border-neutral-200">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-neutral-500 font-bold block">
            Legal Protocol
          </span>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-black">
            Terms &amp; Conditions of Sale
          </h1>
          <p className="text-xs font-mono text-neutral-500">
            Effective Date: January 1, 2026 • FUKU Atelier Dhaka
          </p>
        </div>

        <div className="p-8 sm:p-10 bg-white border border-neutral-200 shadow-sm space-y-8 text-xs sm:text-sm text-neutral-600 leading-relaxed font-sans">
          <section className="space-y-2">
            <h2 className="font-display text-base uppercase font-bold text-black">
              1. Commercial Agreement
            </h2>
            <p>
              By accessing the FUKU Archive digital platform, placing a consignment order, or visiting our physical showrooms, you consent to these legal conditions. All prices are denominated in Bangladeshi Taka (BDT ৳) and include applicable local value-added taxes unless stated otherwise.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-display text-base uppercase font-bold text-black">
              2. Limited Editions &amp; Fabric Variation
            </h2>
            <p>
              Because our Jamdani, Khadi silk, and vegetable-tanned leather pieces are individually crafted by master artisans using traditional pit looms and hand tooling, subtle organic variations in weave texture and dye absorption are natural characteristics of authentic heritage production and do not constitute manufacturing flaws.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-display text-base uppercase font-bold text-black">
              3. Intellectual Property Rights
            </h2>
            <p>
              All garment silhouettes, proprietary pattern engineering, photographic lookbooks, videography, software code, and brand trademarks are the exclusive intellectual property of FUKU Atelier Dhaka. Unauthorized duplication or commercial imitation is strictly prohibited under international copyright laws.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-display text-base uppercase font-bold text-black">
              4. Payment &amp; Gateway Security
            </h2>
            <p>
              Digital payments made via bKash, Nagad, Rocket, or SSLCommerz card gateways are processed through 256-bit encrypted merchant conduits. FUKU does not store customer CVV or credit card account secrets on client-facing servers.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
