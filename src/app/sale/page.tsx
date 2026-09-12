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
        <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center text-xs font-mono uppercase tracking-widest text-neutral-500">
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
