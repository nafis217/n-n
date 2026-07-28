import React from 'react';
import Link from 'next/link';

export default function CollectionsPage() {
  const collections = [
    {
      id: 'dhaka-after-dark',
      title: 'Dhaka After Dark',
      subtitle: 'Editorial Series No. 01',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDLaRVJUicBp_Pwm0AC1oCfYw6SaEoBcCISzSLJc-Vi-JBoED8gBcfQWBCapOG3M_8I3D6EKnd59PuGfenBidubJ-JDkmmoURnkQpisAiw6SQrKUSyn3mNfAeE9I6sZc3G0BVp4UdV36G5aPGgEBgiQaDUXqTbg9KAyF-n4mkLlNXLDi0-22szka_u03AmVlVtH3ScmQJcNfQBUa6G00d0n7fltmjMB_sE96MJP1iIMvw0T6ebVtf32',
      href: '/products?collection=dhaka-after-dark',
    },
    {
      id: 'jamdani-reframed',
      title: 'Jamdani Reframed',
      subtitle: 'Bengali Heritage x Industrial Minimalism',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuA1MSkj6MdzxRABHuA_I8NhFgWW5X1WR47sfF_bmMruPZuchPKRmRZR-JLSO9v4xZjNi2XLEgTKFBfhFMsYFn-8XYkeIzxgK3oEReBRvMGVFYEqOC-1f68bywOmbvDex5nOqRF8bEiN8lrSW6ZOmGR4HyCuyRXA8ja_DjF7mwMK0_A_lut41RyPgeWpP4Rf1Kc7WAKJoQVlL-dKC3kngYXp7p5Vh8HLZndUAKXkgam2sPqJQDVOm6R2',
      href: '/products?collection=jamdani-reframed',
    },
    {
      id: 'ethnic-contemporary',
      title: 'Ethnic Contemporary Panjabi',
      subtitle: 'Minimal Seam Architecture',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBkZzdNEoqzXp6VHwwmHKm93W8yH61nRWeujHjzC4L1RK0cF0A7bgCzJLoCh3FSswIld6Zs7f-Zr1tvvTCjbNOiNkVUt7aXkCFtf9lgWxThh_fY5QmAJzOpV0YaRDRNQ90ACDhSafvkg-fk4F5_CY1YfxOKGpij3ytGK9XXLa4wvWlycSerFpuGXLhLHBPji0VIpr2ESO3bL_7oBn2V5JgsRZlrMM2xNyVkSC2npWZLJbbkoidfTHDN',
      href: '/panjabi',
    },
  ];

  return (
    <div className="w-full px-margin-mobile md:px-margin-desktop py-10">
      <div className="border-b border-outline-variant pb-8 mb-12">
        <span className="font-label-caps text-label-caps text-outline uppercase block mb-2 font-semibold">
          Curated Archives
        </span>
        <h1 className="font-headline-lg text-4xl uppercase font-semibold text-primary">
          BUNON Editorial Collections
        </h1>
      </div>

      <div className="flex flex-col gap-12">
        {collections.map((col) => (
          <Link
            key={col.id}
            href={col.href}
            className="group relative w-full h-[50vh] md:h-[65vh] overflow-hidden block"
          >
            <img
              src={col.image}
              alt={col.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-8 md:p-12 text-white">
              <span className="font-label-caps text-xs uppercase tracking-widest text-neutral-300 mb-2">
                {col.subtitle}
              </span>
              <h2 className="font-display-lg text-3xl md:text-5xl uppercase font-bold mb-4">
                {col.title}
              </h2>
              <span className="font-label-caps text-xs uppercase border-b border-white pb-1 inline-block w-fit font-bold group-hover:underline">
                Explore Collection
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
