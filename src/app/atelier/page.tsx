import React from 'react';
import Link from 'next/link';
import { SHMonogram } from '@/components/brand/SHMonogram';
import { ArrowRight, Scissors, Sparkles, Shield, Layers } from 'lucide-react';

export const metadata = {
  title: 'The Atelier & Craftsmanship | STITCH HOUSE',
  description: 'Inside the STITCH HOUSE atelier — a study in material selection, floating canvas construction, proportion, and finishing.',
};

export default function AtelierPage() {
  const steps = [
    {
      step: '01',
      title: 'MATERIAL SELECTION',
      subtitle: 'Natural, Unadulterated Fibers',
      description:
        'Every roll of textile is sourced directly from heritage mills in Biella, Huddersfield, and select artisanal spinners in Bengal. We reject synthetics in favor of high-twist virgin wools, 15.5oz shuttle-loom selvedge denim, and unbleached Belgian linen.',
      image: '/images/products/architectural-black-suit-2.jpg',
    },
    {
      step: '02',
      title: 'CONSTRUCTION & FLOATING CANVAS',
      subtitle: 'The Internal Architecture',
      description:
        'Unlike fused jackets that bubble over time, STITCH HOUSE tailored coats feature floating horsehair and wool-canvas chest pieces. This allows the garment to mold uniquely to the wearer’s chest with every wear.',
      image: '/images/products/architectural-black-suit-1.jpg',
    },
    {
      step: '03',
      title: 'PROPORTION & CUT',
      subtitle: 'The Architectural Silhouette',
      description:
        'We design with generous lapels, structured natural shoulders, and tapered waists that convey authority without stiffness. Our double-pleated trousers feature a high rise and fluid drop.',
      image: '/images/products/raw-selvedge-trucker-jacket.jpg',
    },
    {
      step: '04',
      title: 'DETAIL & FINISH',
      subtitle: 'Hand-Finished Signatures',
      description:
        'Finished with matte buffalo-horn buttoning, pick-stitched edges, hand-sewn bar-tack accents in Oxblood silk thread, and our woven creed label reading "MADE WITH INTENTION".',
      image: '/images/products/architectural-black-suit-full.jpg',
    },
  ];

  return (
    <div className="min-h-screen bg-[#F2EDE4] text-[#241E1A] pt-8 sm:pt-12 pb-32">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8">
        {/* Atelier Hero */}
        <div className="border-b border-[#B8B0A3]/30 pb-12 mb-20">
          <div className="flex items-center gap-3 mb-3">
            <SHMonogram size={24} variant="dark" />
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#A8946C] font-semibold">
              The Atelier Dhaka
            </span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-serif text-[#241E1A] font-normal leading-[1.05] max-w-3xl">
            A Study in Craft, Construction & Finish
          </h1>
          <p className="mt-6 text-base sm:text-lg text-[#686B5E] max-w-2xl font-sans leading-relaxed">
            Take a closer look at the sartorial standards, internal construction, and painstaking
            detailing that shape every piece bearing the STITCH HOUSE monogram.
          </p>
        </div>

        {/* Steps Stack */}
        <div className="space-y-24">
          {steps.map((item, idx) => (
            <div
              key={item.step}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center ${
                idx % 2 === 1 ? 'lg:grid-flow-dense' : ''
              }`}
            >
              <div
                className={`lg:col-span-6 ${
                  idx % 2 === 1 ? 'lg:col-start-7' : ''
                }`}
              >
                <span className="text-xs font-serif text-[#A8946C] tracking-widest block mb-2">
                  CHAPTER {item.step}
                </span>
                <h2 className="text-3xl sm:text-4xl font-serif text-[#241E1A] mb-2">
                  {item.title}
                </h2>
                <h3 className="text-sm font-sans uppercase tracking-[0.2em] text-[#686B5E] mb-6">
                  {item.subtitle}
                </h3>
                <p className="text-sm sm:text-base text-[#686B5E] leading-relaxed mb-8 max-w-xl">
                  {item.description}
                </p>
                <div className="pt-4 border-t border-[#B8B0A3]/30 flex items-center gap-4 text-xs tracking-wider uppercase text-[#241E1A]">
                  <span className="w-2 h-2 bg-[#542B2E]" />
                  <span>Master Tailor Inspected</span>
                </div>
              </div>

              <div
                className={`lg:col-span-6 ${
                  idx % 2 === 1 ? 'lg:col-start-1' : ''
                }`}
              >
                <div className="aspect-[4/3] bg-[#EBE5DB] overflow-hidden border border-[#B8B0A3]/30 shadow-sm">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover hover:scale-103 transition-transform duration-700"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tailoring Consultation CTA */}
        <div className="mt-32 bg-[#241E1A] text-[#F2EDE4] p-8 sm:p-16 border border-[#38312B] flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#A8946C] font-semibold block mb-2">
              Made to Measure
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif text-[#F2EDE4] mb-2">
              Commission a Bespoke Garment
            </h2>
            <p className="text-xs sm:text-sm text-[#B8B0A3] max-w-lg leading-relaxed">
              Book a private fitting session with our head cutter at our Gulshan or Banani Ateliers.
            </p>
          </div>
          <Link href="/contact" className="sh-btn-light whitespace-nowrap">
            Schedule Fitting
          </Link>
        </div>
      </div>
    </div>
  );
}
