import React from 'react';

export default function TermsPage() {
  return (
    <div className="w-full px-margin-mobile md:px-margin-desktop py-12 max-w-4xl mx-auto">
      <div className="border-b border-outline-variant pb-8 mb-8">
        <span className="font-label-caps text-label-caps text-outline uppercase block mb-2 font-semibold">
          Legal
        </span>
        <h1 className="font-headline-lg text-4xl uppercase font-semibold text-primary">
          Terms &amp; Conditions
        </h1>
      </div>

      <div className="space-y-6 font-body-md text-sm text-secondary leading-relaxed">
        <p>By accessing the BUNON platform, you agree to comply with our commerce and order terms. All prices are listed in Bangladeshi Taka (BDT ৳) inclusive of applicable taxes.</p>
        <p>All garment designs, photography, and editorial branding are protected properties of BUNON Platform Bangladesh.</p>
      </div>
    </div>
  );
}
