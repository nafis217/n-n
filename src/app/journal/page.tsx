import React from 'react';
import Link from 'next/link';
import { SHMonogram } from '@/components/brand/SHMonogram';
import { ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'The Journal | STITCH HOUSE',
  description: 'Essays, editorial studies, and conversations on menswear proportion, textiles, and modern tailoring.',
};

export const ARTICLES = [
  {
    slug: 'autumn-edit',
    title: 'THE AUTUMN EDIT',
    subtitle: 'A Study in Craft, Proportion and Heavy Raw Fibers',
    excerpt: 'An investigation into how high-twist wools and Japanese shuttle-loom denim respond to cooler atmospheric shifts.',
    date: 'OCTOBER 2026',
    author: 'Atelier Dhaka',
    readTime: '4 MIN READ',
    image: '/images/products/architectural-black-suit-full.jpg',
  },
  {
    slug: 'study-in-proportion',
    title: 'A STUDY IN PROPORTION',
    subtitle: 'The Architectural Geometry of Shoulder to Trouser Break',
    excerpt: 'Why millimeters in lapel roll and rise height define presence and calm authority without stiffness.',
    date: 'SEPTEMBER 2026',
    author: 'Head Tailor',
    readTime: '6 MIN READ',
    image: '/images/products/architectural-black-suit-1.jpg',
  },
  {
    slug: 'art-of-the-trouser',
    title: 'THE ART OF THE TROUSER',
    subtitle: 'Double Pleats, Side Tabs & Fluid Drape',
    excerpt: 'Exploring the historical lineage of Savile Row officer trousers adapted for contemporary architectural movement.',
    date: 'AUGUST 2026',
    author: 'Design Studio',
    readTime: '5 MIN READ',
    image: '/images/products/architectural-black-suit-2.jpg',
  },
  {
    slug: 'fabric-and-form',
    title: 'FABRIC & FORM',
    subtitle: 'The Tactile Dialogue of Natural Textiles',
    excerpt: 'How unbleached khadi canvas, Biella merino wool, and Belgian washed linen age with noble dignity.',
    date: 'JULY 2026',
    author: 'Textile Archivist',
    readTime: '7 MIN READ',
    image: '/images/products/raw-selvedge-trucker-jacket.jpg',
  },
];

export default function JournalPage() {
  return (
    <div className="min-h-screen bg-[#F2EDE4] text-[#241E1A] pt-8 sm:pt-12 pb-32">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8">
        {/* Header */}
        <div className="border-b border-[#B8B0A3]/30 pb-12 mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#A8946C] block mb-2 font-semibold">
              The STITCH HOUSE Publication
            </span>
            <h1 className="text-4xl sm:text-6xl font-serif text-[#241E1A] font-normal leading-tight">
              The Journal
            </h1>
            <p className="mt-3 text-sm sm:text-base text-[#686B5E] max-w-lg leading-relaxed">
              Essays on proportion, sartorial history, craftsmanship, and the quiet beauty of natural textiles.
            </p>
          </div>
          <SHMonogram size={28} variant="dark" />
        </div>

        {/* Featured First Article */}
        <Link
          href={`/journal/${ARTICLES[0].slug}`}
          className="group block mb-20 bg-[#EBE5DB] border border-[#B8B0A3]/40 overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-8 aspect-[16/10] overflow-hidden">
              <img
                src={ARTICLES[0].image}
                alt={ARTICLES[0].title}
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-1000"
              />
            </div>
            <div className="lg:col-span-4 p-8 sm:p-12 flex flex-col justify-between bg-[#F2EDE4]">
              <div>
                <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-[#A8946C] mb-3">
                  <span>{ARTICLES[0].date}</span>
                  <span>•</span>
                  <span>{ARTICLES[0].readTime}</span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-serif text-[#241E1A] mb-3 leading-snug">
                  {ARTICLES[0].title}
                </h2>
                <p className="text-xs uppercase tracking-wider text-[#686B5E] font-medium mb-4">
                  {ARTICLES[0].subtitle}
                </p>
                <p className="text-sm text-[#686B5E] leading-relaxed">
                  {ARTICLES[0].excerpt}
                </p>
              </div>

              <div className="pt-6 border-t border-[#B8B0A3]/30 flex items-center justify-between text-xs uppercase tracking-[0.2em] font-medium text-[#241E1A] group-hover:text-[#686B5E]">
                <span>Read Essay</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </Link>

        {/* Remaining 3 Magazine Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ARTICLES.slice(1).map((art) => (
            <Link
              key={art.slug}
              href={`/journal/${art.slug}`}
              className="group flex flex-col justify-between bg-[#F2EDE4] border border-[#B8B0A3]/35 p-6 hover:border-[#241E1A] transition-colors"
            >
              <div>
                <div className="aspect-[4/3] bg-[#EBE5DB] overflow-hidden mb-6">
                  <img
                    src={art.image}
                    alt={art.title}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700"
                  />
                </div>
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-[#A8946C] mb-2">
                  <span>{art.date}</span>
                  <span>•</span>
                  <span>{art.readTime}</span>
                </div>
                <h3 className="text-xl font-serif text-[#241E1A] mb-2 leading-snug">
                  {art.title}
                </h3>
                <p className="text-xs text-[#686B5E] leading-relaxed mb-6">
                  {art.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-[#B8B0A3]/25 flex items-center justify-between text-[11px] uppercase tracking-[0.18em] font-medium text-[#241E1A]">
                <span>Explore Essay</span>
                <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
