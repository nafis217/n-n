import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: 'Editorial Collections | FUKU Archive',
  description: 'Curated seasonal releases, technical outerwear, and artisanal Jamdani capsule collections.',
};

export default function CollectionsPage() {
  const collections = [
    {
      id: 'dhaka-after-dark',
      title: 'Dhaka After Dark',
      subtitle: 'Editorial Series No. 01 • Heavy Japanese Technical Knits & Tailored Suiting',
      image: '/images/products/architectural-black-suit-full.jpg',
      href: '/shop',
    },
    {
      id: 'jamdani-reframed',
      title: 'Espoir Haute Couture & Silk Muslin',
      subtitle: 'Artisanal Heritage x Architectural Minimalism • Pure Silk Twill & Georgette',
      image: '/images/products/espoir_La-Boheme-L-768x765.jpg',
      href: '/women',
    },
    {
      id: 'ethnic-contemporary',
      title: 'Ethnic Contemporary Panjabi & Shirting',
      subtitle: 'Minimal Seam Architecture • Handcrafted Silk Jacquard',
      image: '/images/products/item_maroon.jpg',
      href: '/panjabi',
    },
  ];

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-black pt-24 pb-20">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="border-b border-[#E8E8E5] pb-8 mb-12">
          <span className="text-label text-[#9B9B9B] uppercase tracking-[0.16em] block mb-2 font-medium">
            Curated Archives
          </span>
          <h1
            className="font-display font-light text-black"
            style={{ fontSize: 'clamp(28px, 4vw, 48px)', letterSpacing: '-0.025em' }}
          >
            FUKU Editorial Collections
          </h1>
        </div>

        <div className="flex flex-col gap-10">
          {collections.map((col) => (
            <Link
              key={col.id}
              href={col.href}
              className="group relative w-full h-[50vh] md:h-[65vh] overflow-hidden block bg-[#F0F0EE]"
            >
              <Image
                src={col.image}
                alt={col.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-1000 grayscale contrast-110 group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex flex-col justify-end p-8 md:p-14 text-white">
                <span className="text-label text-xs uppercase tracking-[0.16em] text-neutral-300 mb-2">
                  {col.subtitle}
                </span>
                <h2
                  className="font-display font-light uppercase tracking-tight text-white mb-4"
                  style={{ fontSize: 'clamp(24px, 3.5vw, 44px)' }}
                >
                  {col.title}
                </h2>
                <span className="text-label text-xs uppercase tracking-[0.14em] border-b border-white pb-1 inline-block w-fit font-medium group-hover:text-neutral-200">
                  Explore Capsule &rarr;
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
