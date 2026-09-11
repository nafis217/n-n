'use client';

import React from 'react';

export const DhakaAfterDark: React.FC = () => {
  return (
    <section className="w-full bg-black py-12 px-2 md:px-6 border-t border-b border-neutral-900">
      {/* Section Header */}
      <div className="mb-6 px-2 text-white">
        <span className="font-label-caps text-xs tracking-widest text-neutral-400 uppercase block mb-1">
          EDITORIAL SERIES NO. 01
        </span>
        <h2 className="font-display-lg text-2xl md:text-4xl uppercase font-black tracking-tight text-white">
          DHAKA AFTER DARK
        </h2>
      </div>

      {/* 3-Part Asymmetric Black & White Image Grid (Zara Style - Clean Responsive Grid) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 lg:h-[85vh]">
        {/* PART 1 (Left Column - Hero Image) */}
        <div className="lg:col-span-7 relative overflow-hidden bg-neutral-950 group aspect-[3/4] lg:aspect-auto lg:h-full border border-neutral-900">
          <img
            src="/images/220801-05_0925_03_QC.webp"
            alt="Editorial Campaign 01"
            style={{ filter: 'grayscale(100%) contrast(130%) brightness(85%)' }}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />
        </div>

        {/* RIGHT COLUMN (Parts 2 & 3 - Stacked Images) */}
        <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 lg:grid-rows-2 gap-3 lg:h-full">
          {/* PART 2 (Top Right Image) */}
          <div className="relative overflow-hidden bg-neutral-950 group aspect-[3/4] lg:aspect-auto lg:h-full border border-neutral-900">
            <img
              src="/images/zaramodel1.jpeg"
              alt="Editorial Campaign 02"
              style={{ filter: 'grayscale(100%) contrast(130%) brightness(85%)' }}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none" />
          </div>

          {/* PART 3 (Bottom Right Image) */}
          <div className="relative overflow-hidden bg-neutral-950 group aspect-[3/4] lg:aspect-auto lg:h-full border border-neutral-900">
            <img
              src="/images/ZW_collection_14c93a0454-shwgiwqxbfpvvxk-3x4.webp"
              alt="Editorial Campaign 03"
              style={{ filter: 'grayscale(100%) contrast(130%) brightness(85%)' }}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
};
