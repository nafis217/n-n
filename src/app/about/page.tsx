import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles, ShieldCheck, HeartHandshake, Compass } from 'lucide-react';

export const metadata = {
  title: 'About FUKU Atelier | The Philosophy of Modern Bengali Fashion',
  description: 'FUKU bridges 400-year Bengali textile mastery with avant-garde minimalism, Japanese technical knits, and architectural silhouettes.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] text-black py-12 md:py-20 px-4 sm:px-8 md:px-12">
      <div className="max-w-5xl mx-auto space-y-16 md:space-y-24">
        {/* Hero Manifesto */}
        <section className="space-y-6 text-center max-w-3xl mx-auto">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-neutral-500 font-bold block">
            Atelier Manifesto
          </span>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-tight text-black leading-tight">
            Future Bengal Industrial
          </h1>
          <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-sans">
            FUKU is an independent fashion house and textile laboratory founded in Dhaka. We operate at the intersection of 400-year heritage handlooms, heavy Japanese technical knits, and deconstructed architectural tailoring.
          </p>
        </section>

        {/* Large Visual Frame */}
        <div className="relative aspect-[16/9] w-full bg-neutral-100 border border-neutral-200 overflow-hidden shadow-sm">
          <Image
            src="/images/products/architectural-black-suit-full.jpg"
            alt="FUKU Atelier Runway and Workshop"
            fill
            className="object-cover object-top grayscale contrast-125 hover:grayscale-0 transition-all duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6 sm:p-10">
            <p className="font-mono text-xs uppercase tracking-widest text-neutral-200">
              Photographed at FUKU Tejgaon Industrial Atelier • Dhaka 2026
            </p>
          </div>
        </div>

        {/* Pillars of Design */}
        <section className="space-y-10">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-neutral-500 font-bold">
              Core Principles
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight text-black">
              The Three Tenets of FUKU
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-white border border-neutral-200 shadow-sm space-y-4">
              <Compass className="w-8 h-8 text-black stroke-[1.2]" />
              <h3 className="font-display text-base font-bold uppercase tracking-wider text-black">
                Architectural Form
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed font-sans">
                We eliminate decorative noise in favor of hard-edge geometric draping, dropped shoulders, and rigid high-GSM double-layered collars that frame the wearer with intentional presence.
              </p>
            </div>

            <div className="p-8 bg-white border border-neutral-200 shadow-sm space-y-4">
              <Sparkles className="w-8 h-8 text-black stroke-[1.2]" />
              <h3 className="font-display text-base font-bold uppercase tracking-wider text-black">
                Heritage Re-framed
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed font-sans">
                Jamdani and Khadi are not relics of antiquity. We collaborate with master artisans in Narayanganj and Comilla to weave modernist monochrome geometry into ultra-fine 200-count muslin.
              </p>
            </div>

            <div className="p-8 bg-white border border-neutral-200 shadow-sm space-y-4">
              <ShieldCheck className="w-8 h-8 text-black stroke-[1.2]" />
              <h3 className="font-display text-base font-bold uppercase tracking-wider text-black">
                Ethical Permanence
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed font-sans">
                Every piece is constructed to outlive fast-fashion obsolescence. We use vegetable-tanned full-grain leather, forged 925 sterling silver hardware, and Japanese Kurabo selvedge denim.
              </p>
            </div>
          </div>
        </section>

        {/* Story Paragraphs */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pt-8 border-t border-neutral-200">
          <div className="space-y-6 text-xs sm:text-sm text-neutral-600 leading-relaxed font-sans">
            <h2 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight text-black">
              Born in Dhaka. Worn Worldwide.
            </h2>
            <p>
              Bangladesh produces world-class textiles, yet its cultural heritage has often been relegated to nostalgic tropes or hidden behind anonymous manufacturing labels. FUKU was founded to establish an uncompromised global luxury identity anchored in Dhaka.
            </p>
            <p>
              From our flagship studio in Gulshan to our industrial atelier in Tejgaon, our team of patternmakers, tailors, and textile conservators construct garments that honor the past while defining the dystopian elegance of tomorrow.
            </p>
          </div>

          <div className="relative aspect-[4/3] bg-neutral-100 border border-neutral-200 overflow-hidden shadow-sm">
            <Image
              src="/images/products/raw-selvedge-trucker-jacket.jpg"
              alt="Artisan pattern tailoring"
              fill
              className="object-cover object-top"
            />
          </div>
        </section>

        {/* CTA Footer Section */}
        <div className="p-10 md:p-16 bg-white border border-neutral-200 shadow-sm text-center space-y-6">
          <h3 className="font-display text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-black">
            Experience the 2026 Archive
          </h3>
          <p className="text-xs sm:text-sm text-neutral-600 max-w-md mx-auto">
            Discover our limited drops, tactical kimonos, and handwoven Jamdani editions.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white font-display font-bold text-xs uppercase tracking-widest hover:bg-neutral-800 transition-colors shadow-sm"
          >
            <span>Explore Collection</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
