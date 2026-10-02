'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { SHMonogram } from '@/components/brand/SHMonogram';
import { RefreshCw, ArrowRight } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to console for atelier diagnostics
    console.error('STITCH HOUSE Application Error:', error);
  }, [error]);

  return (
    <div className="min-h-[75vh] bg-[#F2EDE4] text-[#241E1A] flex items-center justify-center py-24 px-4 sm:px-8 text-center">
      <div className="max-w-lg mx-auto space-y-6">
        <SHMonogram size={40} variant="stone" className="mx-auto opacity-70" />

        <span className="text-[10px] uppercase tracking-[0.3em] text-[#A8946C] font-semibold block">
          TEMPORARY INTERRUPT • ATELIER NOTICE
        </span>

        <h1 className="text-3xl sm:text-4xl font-serif text-[#241E1A] font-normal leading-snug">
          AN UNEXPECTED INTERRUPT OCCURRED.
        </h1>

        <p className="text-xs sm:text-sm text-[#686B5E] max-w-sm mx-auto leading-relaxed">
          The atelier experience encountered a temporary render sync delay. You can refresh this view or return to the main storefront.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={() => reset()}
            className="sh-btn-primary flex items-center justify-center gap-2 cursor-pointer"
          >
            <RefreshCw size={14} />
            <span>Try Again</span>
          </button>
          <Link
            href="/"
            className="sh-btn-secondary"
          >
            Return to Storefront
          </Link>
        </div>
      </div>
    </div>
  );
}
