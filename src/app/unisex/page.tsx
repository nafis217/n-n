import { Suspense } from 'react';
import { ShopContent } from '@/components/product/ShopContent';

export const metadata = {
  title: 'Unisex Archive | FUKU Archive',
  description: 'Tactical kimonos, 280 GSM heavyweight tees, 450 GSM French terry hoodies, and utility vests.',
};

export default function UnisexCategoryPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#0E0F10] flex items-center justify-center text-xs font-mono uppercase tracking-widest text-[#8C9094]">
          Loading Unisex Archive...
        </div>
      }
    >
      <ShopContent
        initialCategory="unisex"
        pageTitle="Genderless Utility Archive"
        pageSubtitle="Designed without gender constraints. Voluminous silhouettes, heavy GSM knits, and magnetic modular hardware."
      />
    </Suspense>
  );
}
