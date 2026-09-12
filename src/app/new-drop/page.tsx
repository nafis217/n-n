import { Suspense } from 'react';
import { ShopContent } from '@/components/product/ShopContent';

export const metadata = {
  title: 'New Drop 2026 | FUKU Archive',
  description: 'Fresh release from FUKU atelier: Spring/Summer 2026 runway pieces.',
};

export default function NewDropPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center text-xs font-mono uppercase tracking-widest text-neutral-500">
          Loading New Drop...
        </div>
      }
    >
      <ShopContent
        initialCategory="new-drop"
        pageTitle="Drop 01: 2026 Runway Series"
        pageSubtitle="Limited seasonal batch featuring new technical kimonos, asymmetric draped dresses, and Khadi silk mandarin cuts."
      />
    </Suspense>
  );
}
