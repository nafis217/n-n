import { Suspense } from 'react';
import { ShopContent } from '@/components/product/ShopContent';

export const metadata = {
  title: 'The Panjabi Reinvention | FUKU Archive',
  description: 'Handspun Khadi silk, blind plackets, and minimalist mandarin collars. Modern heritage Panjabis for the discerning gentleman.',
};

export default function PanjabiCategoryPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#0E0F10] flex items-center justify-center text-xs font-mono uppercase tracking-widest text-[#8C9094]">
          Loading Panjabi Collection...
        </div>
      }
    >
      <ShopContent
        initialCategory="panjabi"
        pageTitle="The Panjabi Reinvention"
        pageSubtitle="Eliminating excessive ornamentation in favor of superior handspun Khadi silk texture, clean architectural collar geometry, and concealed horn buttons."
      />
    </Suspense>
  );
}
