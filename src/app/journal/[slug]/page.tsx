import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ARTICLES } from '@/lib/journal-data';
import { SHMonogram } from '@/components/brand/SHMonogram';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface JournalDetailPageProps {
  params: { slug: string };
}

export default function JournalDetailPage({ params }: JournalDetailPageProps) {
  const article = ARTICLES.find((a) => a.slug === params.slug) || ARTICLES[0];

  return (
    <div className="min-h-screen bg-[#F2EDE4] text-[#241E1A] pt-24 pb-32">
      <div className="max-w-[1000px] mx-auto px-4 sm:px-8">
        {/* Top Back Link */}
        <div className="mb-12">
          <Link
            href="/journal"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-medium text-[#686B5E] hover:text-[#241E1A] transition-colors"
          >
            <ArrowLeft size={14} />
            <span>Back to The Journal</span>
          </Link>
        </div>

        {/* Article Header */}
        <div className="border-b border-[#B8B0A3]/30 pb-8 mb-12">
          <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.25em] text-[#A8946C] font-semibold mb-3">
            <span>{article.date}</span>
            <span>•</span>
            <span>By {article.author}</span>
            <span>•</span>
            <span>{article.readTime}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif text-[#241E1A] font-normal leading-[1.1] mb-4">
            {article.title}
          </h1>
          <p className="text-sm sm:text-base font-serif italic text-[#686B5E]">
            {article.subtitle}
          </p>
        </div>

        {/* Hero Image */}
        <div className="aspect-[16/10] bg-[#EBE5DB] overflow-hidden mb-12 border border-[#B8B0A3]/40 shadow-sm">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Article Body Content */}
        <div className="prose prose-neutral max-w-none text-[#241E1A] font-sans text-base leading-relaxed space-y-6">
          <p className="text-lg font-serif italic leading-relaxed text-[#241E1A] border-l-2 border-[#A8946C] pl-6 my-8">
            “Quiet luxury is not an aesthetic choice; it is an engineering discipline. It is the
            realization that when material, cut, and construction are sound, ornamentation is merely
            a distraction.”
          </p>

          <p>
            The modern garment is too often designed to attract immediate ocular attention on a
            five-inch smartphone display. This leads to exaggerated shoulders, harsh artificial dyes,
            and synthetic blends that mimic drape but suffocate the skin. At STITCH HOUSE, our
            approach is fundamentally architectural.
          </p>

          <h2 className="text-2xl font-serif text-[#241E1A] pt-6 pb-2">
            The Sensation of Weight and Balance
          </h2>

          <p>
            When a jacket hangs from the shoulder points rather than clinging to the chest, the
            entire demeanor of the wearer shifts. We construct our suits with a floating horsehair
            canvas that moves with breathing, softened canvassing through the chest, and clean armholes
            that permit complete range of motion.
          </p>

          <p>
            The trousers follow the same rigor: a clean, double-pleated forward fold that creates
            depth across the thighs before tapering gently toward an unbreak or slight break at the
            shoe.
          </p>

          <div className="my-12 p-8 bg-[#241E1A] text-[#F2EDE4]">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#A8946C] block mb-2 font-semibold">
              The STITCH HOUSE Principle
            </span>
            <p className="font-serif text-xl italic text-[#F2EDE4]">
              “Quietly Refined. Distinctly Yours.”
            </p>
          </div>

          <p>
            Every piece is produced in limited allocations, inspected personally by our head tailor,
            and accompanied by our signature unbleached garment architecture box.
          </p>
        </div>

        {/* Footer Navigation */}
        <div className="mt-16 pt-8 border-t border-[#B8B0A3]/30 flex items-center justify-between">
          <Link
            href="/journal"
            className="sh-btn-secondary"
          >
            All Journal Entries
          </Link>
          <Link
            href="/collections/clothing"
            className="sh-btn-primary"
          >
            Explore The Collection
          </Link>
        </div>
      </div>
    </div>
  );
}
