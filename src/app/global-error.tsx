'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('STITCH HOUSE Global Root Error:', error);
  }, [error]);

  return (
    <html lang="en">
      <body className="min-h-screen bg-[#F2EDE4] text-[#241E1A] font-sans flex items-center justify-center p-6 m-0">
        <div className="max-w-md mx-auto text-center space-y-6">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#A8946C] font-semibold block">
            STITCH HOUSE • SYSTEM NOTICE
          </span>

          <h1 className="text-2xl sm:text-3xl font-serif text-[#241E1A] font-normal">
            SOMETHING WENT WRONG
          </h1>

          <p className="text-xs sm:text-sm text-[#686B5E] leading-relaxed">
            A critical application issue was caught. Please reload the page to restore your session.
          </p>

          <div className="pt-2 flex gap-4 justify-center">
            <button
              onClick={() => reset()}
              className="px-6 py-2.5 bg-[#241E1A] text-[#F2EDE4] text-[10px] uppercase tracking-[0.2em] font-medium hover:bg-[#A8946C] hover:text-[#241E1A] transition-colors cursor-pointer border border-[#241E1A]"
            >
              Reload Atelier
            </button>
            <a
              href="/"
              className="px-6 py-2.5 bg-transparent text-[#241E1A] text-[10px] uppercase tracking-[0.2em] font-medium border border-[#241E1A] hover:bg-[#241E1A] hover:text-[#F2EDE4] transition-colors"
            >
              Home
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
