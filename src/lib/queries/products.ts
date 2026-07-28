export interface ProductItem {
  id: string;
  slug: string;
  nameEn: string;
  nameBn: string;
  category: 'women' | 'men' | 'unisex' | 'panjabi' | 'accessories';
  collection?: string;
  gender: 'WOMEN' | 'MEN' | 'UNISEX';
  priceBDT: number;
  originalPriceBDT?: number;
  tag?: 'NEW' | 'SALE' | 'LIMITED';
  material: string;
  fit: string;
  colors: { id: string; name: string; hex: string }[];
  sizes: string[];
  images: string[];
  inStock: boolean;
  storeAvailability: { gulshan: number; tejgaon: number };
}

export const CATALOG_PRODUCTS: ProductItem[] = [
  {
    id: 'prod-1',
    slug: 'linear-tunic-01',
    nameEn: 'Linear Tunic 01',
    nameBn: 'লিনিয়ার টিউনিকে ০১',
    category: 'unisex',
    collection: 'new-drop-2026',
    gender: 'UNISEX',
    priceBDT: 8500,
    tag: 'NEW',
    material: 'Hand-loomed Cotton',
    fit: 'Relaxed Architectural',
    colors: [
      { id: 'c1', name: 'Charcoal Black', hex: '#1B1C1C' },
      { id: 'c2', name: 'Bone White', hex: '#F3EFE7' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBoRvW40oC1LW81kpFRBpyqcf0twdC_jNYfOQli4oBqOBNoXpc8Ow-hujvYeeZhW5vEdZgJoYLURVeHi4AHoS_AjJZAWuAi6RRgzLf31fEvrdaAvCmLXZeZ3IQincQEmKh6xTZfNT1HkJHcsY25NJYr-AAJ-SgoHc9-l3279vruPel4yQLkSZg4uOHL_SgSrz10GNM56-6R1fI5zBQJm7PaKyPU5K-NVK60DmvxpUsNUZ4B2I-YhzJ-',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCTq8bjKlgDgYycpbAywRojpKyM2SN7TvQUSc1FcBHpuag7ZUaAjgVRUSY9fnoe6t-TMdNU6RQUUI9JCmcluGmN153IOhlIMRQ68vxmOiYxOb-cDJXRmnWIruAztVpOu-nh-rOF7y2lkMs9SQ4giORGEUxAQ9Vt6q4oRYuYz_N9DQwE0EWI23FTAy9I2NuFsXjQPIEjIIaR5S5LJbDUfoJDOzijUbOYwrqHqXarxcp85N_DLkeq4ygj',
    ],
    inStock: true,
    storeAvailability: { gulshan: 12, tejgaon: 45 },
  },
  {
    id: 'prod-2',
    slug: 'architectural-blazer',
    nameEn: 'Architectural Blazer',
    nameBn: 'আর্কিটেকচারাল ব্লেজার',
    category: 'men',
    collection: 'dhaka-after-dark',
    gender: 'MEN',
    priceBDT: 14200,
    material: 'Industrial Linen Blend',
    fit: 'Structured Tailored',
    colors: [
      { id: 'c1', name: 'Jet Black', hex: '#000000' },
      { id: 'c3', name: 'Raw Slate', hex: '#444748' },
    ],
    sizes: ['M', 'L', 'XL', '40', '42'],
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDMqt4KKCItm-xiciwtHrbkRs4FVSAF0RNsuwLPwLU0TXfz0uDpxVB0qcyhXZIpE5A97_SJ5UoYOfBPjMETXGi9WgCly6WHw-YbyGGrN1oh9sIh91RnZIxmqlXXRvvhPkELnheS2xQlJIPR1o0WepDu824EL3RCTknI_B7NqmZPzAJF7Ep19QveDItifj6nWnQ1-sH8ifT7p9iHkUClzxdNMvejI8G4nUp92N9XwcdoEpiA6QDKT2_P',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC514JDjWBRimuFViIIhmGxK17DddSKzJAMhElQIAeH01RQE5E5LtCJm7wKj_px582vtfZ48aCmdHQhqL65I2xhiKRxLcY38pzhva-cpSBjNDn034SEttQs7Lv2hG6NGJIwcCtEpVkW71mrCcCUK5AuMhDuIr0FcP54ZK3ehtLEMyGs-hOIF2A9ShkyynFflJiF1lowV1D3uPoQ02NtrbFx_2x7LZwo07qXuyRCwtVjTu90RTpbXMOG',
    ],
    inStock: true,
    storeAvailability: { gulshan: 5, tejgaon: 18 },
  },
  {
    id: 'prod-3',
    slug: 'geo-jamdani-stole',
    nameEn: 'Geo-Jamdani Stole',
    nameBn: 'জিও-জামদানী স্টোল',
    category: 'accessories',
    collection: 'jamdani-reframed',
    gender: 'UNISEX',
    priceBDT: 4800,
    originalPriceBDT: 5500,
    tag: 'SALE',
    material: 'Fine Muslin Cotton',
    fit: 'One Size',
    colors: [
      { id: 'c1', name: 'Monochrome Silver', hex: '#C4C7C7' },
      { id: 'c2', name: 'Charcoal Black', hex: '#1B1C1C' },
    ],
    sizes: ['ONE SIZE'],
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDf6et4kXFCy4K5PgMgL4j5tIiqAZ-cIL8-njfdaTCP2-d3jnSVF_-fYiAVwqqjBcG7vsvuY9HkT3j-SbAQ0nPGZt6nBEEpiwE0Qn29Y_JYlbG8y1tq4LpZMsqlAhQJay_WMMLBDFkvphz6pgHRDOwbQ6nHi3SAjgdAoiIR0pN6RTJ1IxYH0sKad4_iF_pZq-YCkvG1z7UYWG1BNufUYq1O8AMHb8r-3D-hRafn2bXsPSXz8W3pgl3X',
    ],
    inStock: true,
    storeAvailability: { gulshan: 8, tejgaon: 25 },
  },
  {
    id: 'prod-4',
    slug: 'wide-leg-trouser',
    nameEn: 'Wide-Leg Trouser',
    nameBn: 'ওয়াইড-লেগ ট্রাউজার',
    category: 'women',
    collection: 'new-drop-2026',
    gender: 'WOMEN',
    priceBDT: 9200,
    material: 'Industrial Wool Blend',
    fit: 'Wide Leg Draped',
    colors: [{ id: 'c1', name: 'Deep Charcoal', hex: '#1B1C1C' }],
    sizes: ['S', 'M', 'L'],
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCzOgWf0_ARMLDOYhfMtUIcDbm1RSlMzOkXxfGUA1LYppFUO9DFVmez1Vzwwtdx4LslXJMHuJdn9PMCF2WRUHkbRAaQnF2bOWRsgBdIvdOKE8DZ4r9Elsg0iRiYulerrvhgUuZR5hMuQZOwGaWg2rd3BiXZFsrUF35VlnQeHTA5AUnfgUnCr2UxfxgPN-8P_ZipyLnpof9Mh3jAjspGlSYYh-zeNO4WFvjOdPBYd_7gsjlDc9wMVKyx',
    ],
    inStock: true,
    storeAvailability: { gulshan: 3, tejgaon: 14 },
  },
  {
    id: 'prod-5',
    slug: 'minimal-charcoal-panjabi',
    nameEn: 'Minimal Charcoal Panjabi',
    nameBn: 'মিনিমাল চারকোল পাঞ্জাবি',
    category: 'panjabi',
    collection: 'new-drop-2026',
    gender: 'MEN',
    priceBDT: 11500,
    tag: 'NEW',
    material: 'Structured Khadi Silk',
    fit: 'Minimal High Collar',
    colors: [{ id: 'c1', name: 'Charcoal Black', hex: '#1B1C1C' }],
    sizes: ['38', '40', '42', '44'],
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBkZzdNEoqzXp6VHwwmHKm93W8yH61nRWeujHjzC4L1RK0cF0A7bgCzJLoCh3FSswIld6Zs7f-Zr1tvvTCjbNOiNkVUt7aXkCFtf9lgWxThh_fY5QmAJzOpV0YaRDRNQ90ACDhSafvkg-fk4F5_CY1YfxOKGpij3ytGK9XXLa4wvWlycSerFpuGXLhLHBPji0VIpr2ESO3bL_7oBn2V5JgsRZlrMM2xNyVkSC2npWZLJbbkoidfTHDN',
    ],
    inStock: true,
    storeAvailability: { gulshan: 10, tejgaon: 30 },
  },
  {
    id: 'prod-6',
    slug: 'jamdani-reframed-drape',
    nameEn: 'Jamdani Reframed Drape Saree',
    nameBn: 'জামদানী রিফ্রেমড ড্রেপ শাড়ি',
    category: 'women',
    collection: 'jamdani-reframed',
    gender: 'WOMEN',
    priceBDT: 24500,
    tag: 'LIMITED',
    material: 'Jet Black Iridescent Jamdani',
    fit: 'Pre-draped Modern',
    colors: [{ id: 'c1', name: 'Jet Black Silver', hex: '#000000' }],
    sizes: ['FREE SIZE'],
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA1MSkj6MdzxRABHuA_I8NhFgWW5X1WR47sfF_bmMruPZuchPKRmRZR-JLSO9v4xZjNi2XLEgTKFBfhFMsYFn-8XYkeIzxgK3oEReBRvMGVFYEqOC-1f68bywOmbvDex5nOqRF8bEiN8lrSW6ZOmGR4HyCuyRXA8ja_DjF7mwMK0_A_lut41RyPgeWpP4Rf1Kc7WAKJoQVlL-dKC3kngYXp7p5Vh8HLZndUAKXkgam2sPqJQDVOm6R2',
    ],
    inStock: true,
    storeAvailability: { gulshan: 2, tejgaon: 5 },
  },
];
