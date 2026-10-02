import React from 'react';
import Link from 'next/link';
import { SHMonogram } from '@/components/brand/SHMonogram';
import { StitchHouseWordmark } from '@/components/brand/StitchHouseWordmark';

export const metadata = {
  title: 'The Philosophy & Heritage | STITCH HOUSE',
  description: 'The story and core principles behind STITCH HOUSE — modern architectural tailoring, quiet luxury, and old-money restraint.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F2EDE4] text-[#241E1A] pt-8 sm:pt-12 pb-32">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
        {/* Header Intro */}
        <div className="border-b border-[#B8B0A3]/30 pb-12 mb-16">
          <div className="flex items-center gap-3 mb-4">
            <SHMonogram size={24} variant="dark" />
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#A8946C] font-semibold">
              Maison Manifesto
            </span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-serif text-[#241E1A] font-normal leading-[1.05] max-w-4xl">
            “QUIETLY REFINED. DISTINCTLY YOURS.”
          </h1>
          <p className="mt-6 text-base sm:text-lg text-[#686B5E] max-w-2xl font-sans leading-relaxed">
            STITCH HOUSE was founded on a singular conviction: that true luxury needs no loud
            embellishments or frantic trend cycles. It asserts itself through architectural cut,
            uncompromising natural fibers, and the patient hands of master tailors.
          </p>
        </div>

        {/* Section 1: The Philosophy & Asymmetric Imagery */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          <div className="lg:col-span-6">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#686B5E] block mb-2 font-medium">
              01 / The Core Discipline
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#241E1A] mb-6">
              Restraint as the Highest Form of Craft
            </h2>
            <p className="text-sm text-[#686B5E] leading-relaxed mb-4">
              We reject the generic retail formulas and synthetic shortcuts of mass commercial fashion.
              Instead, every STITCH HOUSE garment is drafted from scratch with architectural precision,
              creating relaxed structure that flows naturally with human movement.
            </p>
            <p className="text-sm text-[#686B5E] leading-relaxed">
              Our tailoring philosophy bridges heritage European tailoring standards with the deep,
              tactile textile traditions of South Asia — employing unbleached khadi canvas, high-twist
              merino wools, and horn buttons.
            </p>
          </div>

          <div className="lg:col-span-6 aspect-[4/3] bg-[#EBE5DB] overflow-hidden shadow-sm">
            <img
              src="/images/products/architectural-black-suit-full.jpg"
              alt="STITCH HOUSE Tailoring Philosophy"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Section 2: 4 Pillars of STITCH HOUSE */}
        <div className="bg-[#241E1A] text-[#F2EDE4] p-8 sm:p-16 mb-24">
          <div className="max-w-2xl mb-12">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#A8946C] block mb-2 font-semibold">
              The Four Tenets
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#F2EDE4]">
              How Every Garment is Conceived
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <span className="text-xs font-serif text-[#A8946C] block mb-2">I. PROPORTION</span>
              <h3 className="text-lg font-serif text-[#F2EDE4] mb-2">Architectural Balance</h3>
              <p className="text-xs text-[#B8B0A3] leading-relaxed">
                Lapel widths, jacket drops, and trouser breaks calculated down to the millimeter
                to impart confidence without rigidity.
              </p>
            </div>

            <div>
              <span className="text-xs font-serif text-[#A8946C] block mb-2">II. NATURAL FIBERS</span>
              <h3 className="text-lg font-serif text-[#F2EDE4] mb-2">Honest Materials</h3>
              <p className="text-xs text-[#B8B0A3] leading-relaxed">
                Pure wools, raw selvedge cotton, unbleached linens, and cashmere that breathe and
                develop personal patina over years of wear.
              </p>
            </div>

            <div>
              <span className="text-xs font-serif text-[#A8946C] block mb-2">III. ATELIER DISCIPLINE</span>
              <h3 className="text-lg font-serif text-[#F2EDE4] mb-2">Master Craftsmanship</h3>
              <p className="text-xs text-[#B8B0A3] leading-relaxed">
                Internal floating horsehair canvas, pick-stitched edges, and hand-finished bar-tack
                reinforcements in rare oxblood thread.
              </p>
            </div>

            <div>
              <span className="text-xs font-serif text-[#A8946C] block mb-2">IV. OLD-MONEY RESTRAINT</span>
              <h3 className="text-lg font-serif text-[#F2EDE4] mb-2">Timeless Invisibility</h3>
              <p className="text-xs text-[#B8B0A3] leading-relaxed">
                No loud branding, no flashing hardware, no disposable seasonal gimmicks.
              </p>
            </div>
          </div>
        </div>

        {/* Section 3: Showroom & Concierge */}
        <div className="border-t border-[#B8B0A3]/30 pt-16 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-serif text-[#241E1A] mb-2">
              Experience the Dhaka Ateliers
            </h2>
            <p className="text-sm text-[#686B5E] max-w-md leading-relaxed">
              Visit our calm, warm-limestone showrooms in Gulshan and Banani for private bespoke fittings
              and made-to-measure consultations.
            </p>
          </div>
          <div className="flex gap-4">
            <Link href="/contact" className="sh-btn-primary">
              Book Appointment
            </Link>
            <Link href="/collections/clothing" className="sh-btn-secondary">
              Explore Collection
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
