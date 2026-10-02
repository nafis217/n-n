import React from 'react';
import Link from 'next/link';
import { SHMonogram } from '@/components/brand/SHMonogram';
import { ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Piece Not Found | STITCH HOUSE',
  description: 'The requested garment or document cannot be found in the STITCH HOUSE archive.',
};

export default function NotFound() {
  return (
    <div className="min-h-[75vh] bg-[#F2EDE4] text-[#241E1A] flex items-center justify-center py-24 px-4 sm:px-8 text-center">
      <div className="max-w-lg mx-auto space-y-6">
        <SHMonogram size={40} variant="stone" className="mx-auto opacity-70" />

        <span className="text-[10px] uppercase tracking-[0.3em] text-[#A8946C] font-semibold block">
          404 • ARCHIVE NOTICE
        </span>

        <h1 className="text-3xl sm:text-4xl font-serif text-[#241E1A] font-normal leading-snug">
          THE PIECE YOU ARE LOOKING FOR IS NOT HERE.
        </h1>

        <p className="text-xs sm:text-sm text-[#686B5E] max-w-sm mx-auto leading-relaxed">
          The requested garment edition may have concluded its private allocation or the URL coordinates have shifted.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="sh-btn-primary"
          >
            Return to STITCH HOUSE
          </Link>
          <Link
            href="/collections/clothing"
            className="sh-btn-secondary"
          >
            Explore Full Archive
          </Link>
        </div>
      </div>
    </div>
  );
}
