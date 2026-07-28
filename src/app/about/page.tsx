import React from 'react';

export default function AboutPage() {
  return (
    <div className="w-full px-margin-mobile md:px-margin-desktop py-12 max-w-4xl mx-auto">
      <div className="border-b border-outline-variant pb-8 mb-8">
        <span className="font-label-caps text-label-caps text-outline uppercase block mb-2 font-semibold">
          Brand Narrative
        </span>
        <h1 className="font-headline-lg text-4xl uppercase font-semibold text-primary">
          About BUNON
        </h1>
      </div>

      <div className="space-y-6 font-body-md text-sm text-secondary leading-relaxed">
        <p>
          BUNON is a Bangladeshi fashion-commerce and retail platform built on the aesthetic of **Future Bengal Industrial** — a synthesis of high-fashion minimalism and Bangladeshi textile precision.
        </p>
        <p>
          We reject decorative web noise, gradients, and consumer shadows in favor of a hard-edge, grid-based layout. Our interface serves as a silent frame for our architectural garments, Jamdani weaving, and structured panjabis.
        </p>
        <p>
          Every item produced by BUNON is tracked via a digital immutable inventory ledger, guaranteeing full traceability from raw fabric lot to retail store POS and customer delivery.
        </p>
      </div>
    </div>
  );
}
