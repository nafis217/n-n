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
        <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center text-xs font-mono uppercase tracking-widest text-neutral-500">
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
