import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy | FUKU Archive',
  description: 'Client data protection, cookie policy, and encrypted information handling at FUKU.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#0E0F10] text-[#F3EFE7] py-12 md:py-20 px-4 sm:px-8 md:px-12">
      <div className="max-w-4xl mx-auto space-y-10">
        <div className="text-center space-y-3 pb-8 border-b border-[#222426]">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#FF3B30] font-bold block">
            Data Governance
          </span>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-white">
            Client Privacy Policy
          </h1>
          <p className="text-xs font-mono text-[#8C9094]">
            FUKU Atelier Bangladesh • Data Integrity Protocol
          </p>
        </div>

        <div className="p-8 sm:p-10 bg-[#121315] border border-[#242628] space-y-8 text-xs sm:text-sm text-[#9CA0A4] leading-relaxed font-sans">
          <section className="space-y-2">
            <h2 className="font-display text-base uppercase font-bold text-white">
              1. Information Collection
            </h2>
            <p>
              We collect client information necessary to fulfill garment consignments, process digital payment confirmations, and deliver order status updates via SMS and email. This includes recipient name, phone number, delivery address, and garment size preferences.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-display text-base uppercase font-bold text-white">
              2. Data Safeguards &amp; Zero Third-Party Selling
            </h2>
            <p>
              FUKU will never sell, rent, or trade your personal client dossier to third-party advertisers or data brokers. Information is shared strictly with our bonded delivery courier partners (RedX / SteadFast) solely for shipment routing purposes.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-display text-base uppercase font-bold text-white">
              3. Client Rights &amp; Data Deletion
            </h2>
            <p>
              Clients may request the complete deletion of their account records, delivery addresses, and purchase histories at any time by contacting our data protection officer at privacy@fukustudio.com.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
