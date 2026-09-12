import { Suspense } from 'react';
import { ShopContent } from '@/components/product/ShopContent';

export const metadata = {
  title: 'Catalogue & Products | FUKU Archive',
  description: 'Explore the full FUKU modern clothing collection.',
};

export default function ProductsCataloguePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center text-xs font-mono uppercase tracking-widest text-neutral-500">
          Loading Catalogue...
        </div>
      }
    >
      <ShopContent initialCategory="all" pageTitle="Garment Catalogue" />
    </Suspense>
  );
}
