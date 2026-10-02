import React from 'react';
import Link from 'next/link';
import { SHMonogram } from '@/components/brand/SHMonogram';
import { ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Seasonal Collections & Capsules | STITCH HOUSE',
  description: 'Curated seasonal releases, bespoke menswear, and tailoring studies from STITCH HOUSE.',
};

export default function CollectionsPage() {
  const collections = [
    {
      id: 'autumn-winter',
      slug: 'autumn-winter',
      title: 'The Autumn Edit',
      subtitle: 'A Study in Craft, Proportion & Heavy Natural Fibers',
      description: 'Sculpted double-breasted suiting, unwashed raw selvedge jackets, and brushed Mongolian cashmere.',
      image: '/images/products/architectural-black-suit-full.jpg',
      count: '14 Pieces',
    },
    {
      id: 'shirting-archive',
      slug: 'shirts',
      title: 'The Shirting Dialogue',
      subtitle: 'High-Count Poplin, Unbleached Linen & Tailored Overshirts',
      description: 'Precision collars, mother-of-pearl buttons, and breathable natural drape.',
      image: '/images/products/raw-selvedge-trucker-jacket.jpg',
      count: '8 Pieces',
    },
    {
      id: 'trousers',
      slug: 'trousers',
      title: 'The Art of the Trouser',
      subtitle: 'Double-Pleated Proportions & Extended Tab Waistbands',
      description: 'Tailored with English wool flannel, side adjusters, and generous fluid drape.',
      image: '/images/products/architectural-black-suit-2.jpg',
      count: '9 Pieces',
    },
  ];

  return (
    <div className="min-h-screen bg-[#F2EDE4] text-[#241E1A] pt-8 sm:pt-12 pb-24">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8">
        <div className="border-b border-[#B8B0A3]/30 pb-8 mb-16 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#A8946C] block mb-2 font-semibold">
              Maison Capsules
            </span>
            <h1 className="text-3xl sm:text-5xl font-serif text-[#241E1A] font-normal">
              Editorial Collections
            </h1>
            <p className="text-sm text-[#686B5E] max-w-lg mt-2 leading-relaxed">
              Curated seasonal chapters shaped by timeless proportions, considered materials,
              and master tailor craftsmanship.
            </p>
          </div>
          <SHMonogram size={28} variant="dark" />
        </div>

        {/* Collections Stack */}
        <div className="space-y-16">
          {collections.map((col, idx) => (
            <Link
              key={col.id}
              href={`/collections/${col.slug}`}
              className="group block relative overflow-hidden bg-[#EBE5DB] border border-[#B8B0A3]/40"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[420px]">
                {/* Image */}
                <div className="lg:col-span-7 relative aspect-[16/10] lg:aspect-auto overflow-hidden">
                  <img
                    src={col.image}
                    alt={col.title}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-1000"
                  />
                  <div className="absolute top-4 left-4 bg-[#F2EDE4]/90 px-3 py-1 text-[9px] uppercase tracking-[0.2em] font-medium text-[#241E1A]">
                    Chapter 0{idx + 1} • {col.count}
                  </div>
                </div>

                {/* Info */}
                <div className="lg:col-span-5 p-8 lg:p-14 flex flex-col justify-between bg-[#F2EDE4]">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.25em] text-[#A8946C] font-semibold block mb-2">
                      {col.subtitle}
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-serif text-[#241E1A] mb-4">
                      {col.title}
                    </h2>
                    <p className="text-sm text-[#686B5E] leading-relaxed mb-6">
                      {col.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-medium text-[#241E1A] group-hover:text-[#686B5E] transition-colors border-t border-[#B8B0A3]/25 pt-4">
                    <span>Explore Capsule</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
