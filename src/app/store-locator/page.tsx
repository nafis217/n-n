import React from 'react';
import { MapPin, Clock, Phone, ArrowUpRight } from 'lucide-react';

export const metadata = {
  title: 'Store Locator & Ateliers | FUKU Archive',
  description: 'Visit FUKU flagship showrooms, retail boutiques, and research ateliers in Dhaka.',
};

export default function StoreLocatorPage() {
  const stores = [
    {
      id: 'gulshan',
      name: 'Gulshan Flagship Showroom & Gallery',
      address: 'House 42, Road 11, Block D, Banani / Gulshan-2, Dhaka 1213',
      hours: 'Mon – Sun: 11:00 AM – 9:30 PM',
      phone: '+880 1712-345678',
      desc: 'Full ready-to-wear archive, bespoke made-to-measure tailoring, and VIP lounge appointments.',
    },
    {
      id: 'dhanmondi',
      name: 'Dhanmondi Retail Boutique',
      address: 'Road 27 (Old), House 15, Dhanmondi, Dhaka 1209',
      hours: 'Mon – Sun: 11:00 AM – 9:00 PM',
      phone: '+880 1712-345679',
      desc: 'Curated seasonal drops, menswear panjabi collections, and instant size exchanges.',
    },
    {
      id: 'tejgaon',
      name: 'Tejgaon Central Atelier & Research Hub',
      address: 'Plot 88, Tejgaon Industrial Area (Opposite Shanta Forum), Dhaka 1208',
      hours: 'Mon – Fri: 10:00 AM – 7:00 PM',
      phone: '+880 1712-345680',
      desc: 'Textile development workshop, quality control testing, and national courier dispatch depot.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAF8] text-[#111111] pt-24 pb-20">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="border-b border-[#E8E8E5] pb-8 mb-12">
          <span className="text-label text-[#9B9B9B] uppercase tracking-[0.16em] block mb-2 font-medium">
            Physical Destinations
          </span>
          <h1
            className="font-display font-light text-[#111111]"
            style={{ fontSize: 'clamp(28px, 4vw, 48px)', letterSpacing: '-0.025em' }}
          >
            FUKU Atelier &amp; Store Network
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stores.map((st) => (
            <div
              key={st.id}
              className="p-8 bg-white border border-[#E8E8E5] flex flex-col justify-between hover:border-[#111111] transition-colors"
            >
              <div>
                <h2 className="text-label uppercase tracking-[0.12em] font-medium text-[#111111] text-sm mb-3">
                  {st.name}
                </h2>
                <p className="text-body text-xs text-[#6B6B6B] leading-relaxed mb-6">
                  {st.desc}
                </p>

                <div className="space-y-3 text-xs border-t border-[#F0F0EE] pt-6 text-[#6B6B6B]">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-[#111111] shrink-0 mt-0.5 stroke-[1.25]" />
                    <span className="text-body text-xs leading-relaxed">{st.address}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-[#111111] shrink-0 stroke-[1.25]" />
                    <span className="text-body text-xs">{st.hours}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-[#111111] shrink-0 stroke-[1.25]" />
                    <span className="text-body text-xs">{st.phone}</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-[#E8E8E5] flex items-center justify-between">
                <span className="text-[10px] text-[#6B6B6B] uppercase tracking-[0.1em] font-medium">
                  Showroom Walk-ins Welcome
                </span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#111111]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
