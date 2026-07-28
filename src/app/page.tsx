import React from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { HeroCarousel } from '@/components/home/HeroCarousel';

const SAMPLE_PRODUCTS = [
  {
    id: 'prod-1',
    name: 'Linear Tunic 01',
    price: '৳ 8,500',
    tag: 'NEW',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBoRvW40oC1LW81kpFRBpyqcf0twdC_jNYfOQli4oBqOBNoXpc8Ow-hujvYeeZhW5vEdZgJoYLURVeHi4AHoS_AjJZAWuAi6RRgzLf31fEvrdaAvCmLXZeZ3IQincQEmKh6xTZfNT1HkJHcsY25NJYr-AAJ-SgoHc9-l3279vruPel4yQLkSZg4uOHL_SgSrz10GNM56-6R1fI5zBQJm7PaKyPU5K-NVK60DmvxpUsNUZ4B2I-YhzJ-',
  },
  {
    id: 'prod-2',
    name: 'Architectural Blazer',
    price: '৳ 14,200',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDMqt4KKCItm-xiciwtHrbkRs4FVSAF0RNsuwLPwLU0TXfz0uDpxVB0qcyhXZIpE5A97_SJ5UoYOfBPjMETXGi9WgCly6WHw-YbyGGrN1oh9sIh91RnZIxmqlXXRvvhPkELnheS2xQlJIPR1o0WepDu824EL3RCTknI_B7NqmZPzAJF7Ep19QveDItifj6nWnQ1-sH8ifT7p9iHkUClzxdNMvejI8G4nUp92N9XwcdoEpiA6QDKT2_P',
  },
  {
    id: 'prod-3',
    name: 'Geo-Jamdani Stole',
    price: '৳ 4,800',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDf6et4kXFCy4K5PgMgL4j5tIiqAZ-cIL8-njfdaTCP2-d3jnSVF_-fYiAVwqqjBcG7vsvuY9HkT3j-SbAQ0nPGZt6nBEEpiwE0Qn29Y_JYlbG8y1tq4LpZMsqlAhQJay_WMMLBDFkvphz6pgHRDOwbQ6nHi3SAjgdAoiIR0pN6RTJ1IxYH0sKad4_iF_pZq-YCkvG1z7UYWG1BNufUYq1O8AMHb8r-3D-hRafn2bXsPSXz8W3pgl3X',
  },
  {
    id: 'prod-4',
    name: 'Wide-Leg Trouser',
    price: '৳ 9,200',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCzOgWf0_ARMLDOYhfMtUIcDbm1RSlMzOkXxfGUA1LYppFUO9DFVmez1Vzwwtdx4LslXJMHuJdn9PMCF2WRUHkbRAaQnF2bOWRsgBdIvdOKE8DZ4r9Elsg0iRiYulerrvhgUuZR5hMuQZOwGaWg2rd3BiXZFsrUF35VlnQeHTA5AUnfgUnCr2UxfxgPN-8P_ZipyLnpof9Mh3jAjspGlSYYh-zeNO4WFvjOdPBYd_7gsjlDc9wMVKyx',
  },
  {
    id: 'prod-5',
    name: 'Component Pendant',
    price: '৳ 3,500',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB4yS7d5tFbjweaUri9NgGQYasTuTa52J3seXmrujK1oVeSuB04hgk5yw-C9uXYRusvkDKQ24NJF2akizT3kFbYGhQMmnIHxySWmcIBMkGd2_uVhc_djb7CHu5-d-AeYWHKYjZ0AYe-xOyqFAzmNBWXqVR-qY8JOT6CWOCkOq0tMeueeHNS8TbuZw76I4ql_lAH3O4G0Z4T_6gSt7aDs46PE6AhtwlLI17ejyioVuKmwGCyMTrBPI4j',
  },
];

export default function HomePage() {
  return (
    <div className="w-full">
      {/* Module 1: Animated Hero Video Model Carousel */}
      <HeroCarousel />

      {/* Module 2: Dhaka After Dark */}
      <section className="w-full mt-2">
        <div className="w-full h-[70vh] md:h-[80vh] relative flex items-end">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDLaRVJUicBp_Pwm0AC1oCfYw6SaEoBcCISzSLJc-Vi-JBoED8gBcfQWBCapOG3M_8I3D6EKnd59PuGfenBidubJ-JDkmmoURnkQpisAiw6SQrKUSyn3mNfAeE9I6sZc3G0BVp4UdV36G5aPGgEBgiQaDUXqTbg9KAyF-n4mkLlNXLDi0-22szka_u03AmVlVtH3ScmQJcNfQBUa6G00d0n7fltmjMB_sE96MJP1iIMvw0T6ebVtf32')`,
            }}
          />
          <div className="relative z-10 p-margin-mobile md:p-margin-desktop text-white bg-gradient-to-t from-black/80 via-black/20 to-transparent w-full">
            <p className="font-label-caps text-label-caps uppercase tracking-[0.2em] mb-2 font-semibold">
              Editorial Series
            </p>
            <h2 className="font-display-lg text-3xl md:text-5xl uppercase italic mb-6">
              Dhaka After Dark
            </h2>
            <Link href="/collections">
              <Button variant="primary" size="lg" className="bg-white text-primary hover:bg-neutral-200">
                Shop the Look
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Product Carousel: New In */}
      <section className="py-16 md:py-24 px-margin-mobile md:px-margin-desktop overflow-hidden">
        <div className="flex justify-between items-end mb-12">
          <div>
            <span className="font-label-caps text-label-caps text-outline uppercase block mb-2 font-semibold">
              The Latest Arrivals
            </span>
            <h3 className="font-headline-lg text-headline-lg uppercase font-semibold">
              New In
            </h3>
          </div>
          <div className="flex gap-4">
            <button className="w-10 h-10 border border-outline-variant flex items-center justify-center hover:border-primary transition-colors">
              <ChevronLeft className="w-5 h-5 text-primary" />
            </button>
            <button className="w-10 h-10 border border-outline-variant flex items-center justify-center hover:border-primary transition-colors">
              <ChevronRight className="w-5 h-5 text-primary" />
            </button>
          </div>
        </div>

        <div className="flex gap-gutter overflow-x-auto hide-scrollbar snap-x pb-4">
          {SAMPLE_PRODUCTS.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              className="min-w-[260px] md:min-w-[320px] snap-start group cursor-pointer"
            >
              <div className="aspect-[2/3] relative overflow-hidden bg-surface-container-low mb-4">
                {product.tag && (
                  <div className="absolute top-0 left-0 z-10">
                    <Badge variant="new">{product.tag}</Badge>
                  </div>
                )}
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <p className="font-body-md text-body-md uppercase text-primary mb-1 font-medium">
                {product.name}
              </p>
              <p className="font-price text-price text-secondary">{product.price}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Campaign Modules: Modern Panjabi & Jamdani */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-2 bg-white">
        <div className="relative aspect-square flex items-center justify-center group overflow-hidden">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBkZzdNEoqzXp6VHwwmHKm93W8yH61nRWeujHjzC4L1RK0cF0A7bgCzJLoCh3FSswIld6Zs7f-Zr1tvvTCjbNOiNkVUt7aXkCFtf9lgWxThh_fY5QmAJzOpV0YaRDRNQ90ACDhSafvkg-fk4F5_CY1YfxOKGpij3ytGK9XXLa4wvWlycSerFpuGXLhLHBPji0VIpr2ESO3bL_7oBn2V5JgsRZlrMM2xNyVkSC2npWZLJbbkoidfTHDN"
            alt="Panjabi Collection"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-black/30 flex flex-col justify-end p-8 text-white">
            <h3 className="font-display text-2xl font-bold uppercase mb-2">Modern Panjabi</h3>
            <Link href="/panjabi" className="font-label-caps text-xs uppercase font-bold hover:underline">
              Explore Collection →
            </Link>
          </div>
        </div>

        <div className="relative aspect-square flex items-center justify-center group overflow-hidden">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDf6et4kXFCy4K5PgMgL4j5tIiqAZ-cIL8-njfdaTCP2-d3jnSVF_-fYiAVwqqjBcG7vsvuY9HkT3j-SbAQ0nPGZt6nBEEpiwE0Qn29Y_JYlbG8y1tq4LpZMsqlAhQJay_WMMLBDFkvphz6pgHRDOwbQ6nHi3SAjgdAoiIR0pN6RTJ1IxYH0sKad4_iF_pZq-YCkvG1z7UYWG1BNufUYq1O8AMHb8r-3D-hRafn2bXsPSXz8W3pgl3X"
            alt="Jamdani Stoles"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-black/30 flex flex-col justify-end p-8 text-white">
            <h3 className="font-display text-2xl font-bold uppercase mb-2">Jamdani Stoles</h3>
            <Link href="/collections" className="font-label-caps text-xs uppercase font-bold hover:underline">
              Explore Collection →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
