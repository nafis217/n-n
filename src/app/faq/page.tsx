'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronUp, HelpCircle, ArrowRight } from 'lucide-react';

interface FAQCategory {
  title: string;
  items: { q: string; a: string }[];
}

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    '0-0': true,
    '1-0': true,
  });

  const toggleItem = (catIdx: number, itemIdx: number) => {
    const key = `${catIdx}-${itemIdx}`;
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const FAQ_DATA: FAQCategory[] = [
    {
      title: 'Orders & Deliveries in Bangladesh',
      items: [
        {
          q: 'What are the delivery transit times inside and outside Dhaka?',
          a: 'Orders within Dhaka Metropolitan are fulfilled within 24–48 hours via express courier. Deliveries outside Dhaka (Chittagong, Sylhet, Rajshahi, etc.) arrive within 3–5 business days with live SMS tracking.',
        },
        {
          q: 'Do you offer Cash on Delivery (COD)?',
          a: 'Yes. Cash on Delivery is supported nationwide across all 64 districts of Bangladesh. You may inspect the package exterior upon arrival.',
        },
        {
          q: 'Can I track my consignment in real time?',
          a: 'Immediately upon dispatch, you will receive an SMS and email containing your courier waybill tracking number (RedX / SteadFast) which can be monitored directly in your FUKU Client Portal.',
        },
      ],
    },
    {
      title: 'Sartorial Fits & Sizing Architecture',
      items: [
        {
          q: 'How do FUKU oversized and architectural cuts fit compared to standard sizes?',
          a: 'Our silhouettes are intentionally designed with generous drop shoulders, boxy chest measurements, and structured drapery. For a classic relaxed runway fit, select your true standard size. For a slimmer tailored profile, take one size down.',
        },
        {
          q: 'Where can I find exact garment measurements?',
          a: 'Every product page features an interactive "Size Spec Sheet" button displaying chest, sleeve length, shoulder width, and total garment length in both inches and centimeters.',
        },
      ],
    },
    {
      title: 'Heritage Textiles & Jamdani Care',
      items: [
        {
          q: 'How should I wash and care for handloom Jamdani & Khadi garments?',
          a: 'Fine count handspun Jamdani muslin and raw Khadi silk should only be dry cleaned by heritage textile specialists or gently hand-washed in cold water using neutral pH silk detergent. Never wring or tumble dry.',
        },
        {
          q: 'Are your Jamdani motifs authentic handloom?',
          a: 'Every FUKU Jamdani piece is hand-woven on traditional pit looms by our cooperative of master artisans in Narayanganj, taking between 20 and 45 days per individual piece.',
        },
      ],
    },
    {
      title: 'Exchanges & Return Policy',
      items: [
        {
          q: 'What is your garment exchange policy?',
          a: 'We offer a complimentary 7-day exchange window for all unworn garments with original tags attached. You may exchange sizes at our Gulshan Flagship or request home courier pickup.',
        },
        {
          q: 'Can I get a refund if the garment is not suitable?',
          a: 'If a replacement size is unavailable or in the rare event of a fabric defect, we issue instant store credit vouchers or complete MFS/bank refunds within 3 business days.',
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#0E0F10] text-[#F3EFE7] py-12 md:py-20 px-4 sm:px-8 md:px-12">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-3 pb-8 border-b border-[#222426]">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#FF3B30] font-bold block">
            Client Knowledge Base
          </span>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-white">
            Frequently Asked Questions
          </h1>
          <p className="text-xs sm:text-sm text-[#8C9094] font-sans max-w-xl mx-auto">
            Everything you need to know about our architectural cuts, artisanal Jamdani textiles, payment methods, and delivery logistics.
          </p>
        </div>

        {/* Accordions */}
        <div className="space-y-10">
          {FAQ_DATA.map((cat, catIdx) => (
            <div key={cat.title} className="p-6 sm:p-8 bg-[#121315] border border-[#242628] space-y-4">
              <h2 className="font-display text-sm uppercase tracking-widest font-bold text-[#FF3B30] pb-3 border-b border-[#202224]">
                {cat.title}
              </h2>

              <div className="divide-y divide-[#202224]">
                {cat.items.map((item, itemIdx) => {
                  const isOpen = !!openItems[`${catIdx}-${itemIdx}`];
                  return (
                    <div key={item.q} className="py-4 first:pt-2 last:pb-0">
                      <button
                        onClick={() => toggleItem(catIdx, itemIdx)}
                        className="w-full flex justify-between items-center text-left font-display text-xs sm:text-sm uppercase tracking-wider font-bold text-white hover:text-[#FF3B30] transition-colors"
                      >
                        <span className="pr-4">{item.q}</span>
                        {isOpen ? (
                          <ChevronUp className="w-4 h-4 shrink-0 text-[#FF3B30]" />
                        ) : (
                          <ChevronDown className="w-4 h-4 shrink-0 text-[#7D8185]" />
                        )}
                      </button>

                      {isOpen && (
                        <p className="mt-3 text-xs text-[#9CA0A4] font-sans leading-relaxed animate-in fade-in duration-200">
                          {item.a}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="p-8 bg-[#121315] border border-[#242628] text-center space-y-4">
          <h3 className="font-display text-lg uppercase font-bold text-white">
            Have a Bespoke Sizing Question?
          </h3>
          <p className="text-xs text-[#8C9094]">
            Our client care directors in Dhaka are available 7 days a week.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-display font-bold text-xs uppercase tracking-widest hover:bg-[#E5E0D8] transition-colors"
          >
            <span>Contact Atelier Concierge</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
