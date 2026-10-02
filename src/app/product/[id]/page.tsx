'use client';

import React from 'react';
import ProductDetailPageImpl from '@/app/products/[slug]/page';

export default function ProductPage({ params }: { params: { id: string } }) {
  return <ProductDetailPageImpl params={{ slug: params.id }} />;
}
