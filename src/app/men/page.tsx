import { Suspense } from 'react';
import { ShopContent } from '@/components/product/ShopContent';

export const metadata = {
  title: 'Men Collection | FUKU Archive',
  description: 'Unstructured blazers, deep-pleat trousers, selvedge denim, and minimal ceremonial garments for men.',
};

export default function MenCategoryPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center text-xs font-mono uppercase tracking-widest text-neutral-500">
          Loading Men Collection...
        </div>
      }
    >
      <ShopContent
        initialCategory="men"
        pageTitle="Men Sartorial Archive"
        pageSubtitle="Sharp angular tailoring, Belgian raw linen jackets, Japanese selvedge denim, and minimalist pleats."
      />
    </Suspense>
  );
}
