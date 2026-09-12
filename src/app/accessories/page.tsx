import { Suspense } from 'react';
import { ShopContent } from '@/components/product/ShopContent';

export const metadata = {
  title: 'Accessories & Leather | FUKU Archive',
  description: 'Vegetable-tanned full-grain leather totes, forged 925 silver cuffs, and handwoven Jamdani stoles.',
};

export default function AccessoriesCategoryPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center text-xs font-mono uppercase tracking-widest text-neutral-500">
          Loading Accessories...
        </div>
      }
    >
      <ShopContent
        initialCategory="accessories"
        pageTitle="Hardware, Leather & Stoles"
        pageSubtitle="Artisanal objects forged in Old Dhaka ateliers — solid 925 sterling silver cuffs, full-grain cowhide leather, and featherweight muslin stoles."
      />
    </Suspense>
  );
}
