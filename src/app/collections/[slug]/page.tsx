'use client';

import React from 'react';
import { notFound } from 'next/navigation';
import { ShopContent } from '@/components/product/ShopContent';

interface CollectionPageProps {
  params: { slug: string };
}

const COLLECTION_METADATA: Record<string, { title: string; subtitle: string }> = {
  'new-arrivals': {
    title: 'New Arrivals & Autumn Drops',
    subtitle: 'Freshly tailored silhouettes, structured outerwear, and seasonal shirting.',
  },
  'clothing': {
    title: 'Complete Menswear Archive',
    subtitle: 'Double-breasted suiting, pleated trousers, overshirts, and outerwear.',
  },
  'shirts': {
    title: 'Shirting & Overshirts',
    subtitle: 'High-twist oxford cotton, unbleached linen, and structured layered pieces.',
  },
  'trousers': {
    title: 'Pleated Trousers & Tailored Bottoms',
    subtitle: 'High-waisted cuts, side adjusters, and fluid drape across wool and raw twill.',
  },
  'outerwear': {
    title: 'Tailored Outerwear & Blazers',
    subtitle: 'Full floating canvas construction, heavy selvedge trucker jackets, and wool overcoats.',
  },
  'accessories': {
    title: 'Accessories & Leather Craft',
    subtitle: 'Hand-stitched leather belts, silk neckwear, and architectural hardware.',
  },
  'autumn-winter': {
    title: 'The Autumn Edit',
    subtitle: 'A Study in Craft, Proportion & Heavy Natural Fibers.',
  },
};

export default function CollectionDetailPage({ params }: CollectionPageProps) {
  const { slug } = params;
  const meta = COLLECTION_METADATA[slug.toLowerCase()] || {
    title: `${slug.replace(/-/g, ' ').toUpperCase()} Collection`,
    subtitle: 'A study in architectural cut, natural fibers and quiet luxury menswear.',
  };

  return (
    <ShopContent
      initialCategory={slug}
      pageTitle={meta.title}
      pageSubtitle={meta.subtitle}
    />
  );
}
