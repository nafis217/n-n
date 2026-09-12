import { Suspense } from 'react';
import { ShopContent } from '@/components/product/ShopContent';

export const metadata = {
  title: 'Shop All Garments | FUKU Archive',
  description: 'Explore the complete FUKU clothing archive: architectural outerwear, luxury oversized tees, modern tailored trousers, and limited heritage Jamdani editions.',
};

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#0E0F10] flex items-center justify-center text-xs font-mono uppercase tracking-widest text-[#8C9094]">
          Curating Garment Archive...
        </div>
      }
    >
      <ShopContent
        initialCategory="all"
        pageTitle="The Complete Archive"
        pageSubtitle="Every silhouette engineered by FUKU Atelier — Japanese technical knits, Belgian linen, and handwoven Jamdani."
      />
    </Suspense>
  );
}
