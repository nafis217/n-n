import { Suspense } from 'react';
import { ShopContent } from '@/components/product/ShopContent';

export const metadata = {
  title: 'Best Sellers | FUKU Archive',
  description: 'Our most iconic garments: 280 GSM heavyweight tees, minimal leather totes, and tactical outerwear.',
};

export default function BestSellersPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#0E0F10] flex items-center justify-center text-xs font-mono uppercase tracking-widest text-[#8C9094]">
          Loading Best Sellers...
        </div>
      }
    >
      <ShopContent
        initialCategory="best-sellers"
        pageTitle="The FUKU Icons"
        pageSubtitle="The most celebrated pieces in our repertoire, tested and beloved by collectors across Bangladesh and abroad."
      />
    </Suspense>
  );
}
