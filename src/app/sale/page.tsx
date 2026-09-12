import { Suspense } from 'react';
import { ShopContent } from '@/components/product/ShopContent';

export const metadata = {
  title: 'Archive Sale | FUKU Archive',
  description: 'Limited seasonal reductions on select archive garments and accessories.',
};

export default function SalePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#0E0F10] flex items-center justify-center text-xs font-mono uppercase tracking-widest text-[#8C9094]">
          Loading Archive Reductions...
        </div>
      }
    >
      <ShopContent
        initialCategory="sale"
        pageTitle="Archive Vault Reductions"
        pageSubtitle="Final units from past seasonal editions at privileged price points. Once sold out, these exact fabric runs will not be reissued."
      />
    </Suspense>
  );
}
