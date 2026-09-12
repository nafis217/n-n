import React from 'react';
import Link from 'next/link';
import { Compass, ArrowRight, ShoppingBag } from 'lucide-react';

export const metadata = {
  title: '404 - Garment Coordinates Not Found | FUKU Archive',
  description: 'The requested archive piece or URL coordinates could not be located.',
};

export default function NotFound() {
  return (
    <div className="min-h-[70vh] bg-[#FAFAFA] text-black flex items-center justify-center py-20 px-4 sm:px-8 text-center">
      <div className="max-w-md mx-auto space-y-6">
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-neutral-500 font-bold block">
          Error 404
        </span>

        <h1 className="font-display text-4xl sm:text-5xl font-black uppercase tracking-tight text-black">
          Coordinates Not Found
        </h1>

        <p className="text-xs sm:text-sm text-neutral-600 font-sans leading-relaxed">
          The archive silhouette or document you requested has either expired, been relocated, or is restricted to private atelier viewing.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
          <Link
            href="/"
            className="px-6 py-3.5 border border-neutral-300 hover:border-black text-xs font-mono uppercase tracking-wider text-black transition-colors bg-white shadow-sm"
          >
            Return to Homepage
          </Link>
          <Link
            href="/shop"
            className="px-6 py-3.5 bg-black text-white hover:bg-neutral-800 font-display text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-colors shadow-sm"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Browse Full Archive</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
