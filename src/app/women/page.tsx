import { Suspense } from 'react';
import { ShopContent } from '@/components/product/ShopContent';

export const metadata = {
  title: 'Women Collection | FUKU Archive',
  description: 'Sculptural dresses, draped Jamdani sarees, fluid trousers, and modern tunics for women.',
};

export default function WomenCategoryPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#0E0F10] flex items-center justify-center text-xs font-mono uppercase tracking-widest text-[#8C9094]">
          Loading Women Collection...
        </div>
      }
    >
      <ShopContent
        initialCategory="women"
        pageTitle="Women Architectural Series"
        pageSubtitle="Draped handwoven muslin, high-twist crepe wide-leg trousers, and contemporary deconstructed silhouettes."
      />
    </Suspense>
  );
}
