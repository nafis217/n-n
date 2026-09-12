export interface ReviewItem {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
}

export interface ProductItem {
  id: string;
  slug: string;
  nameEn: string;
  nameBn: string;
  category: 'women' | 'men' | 'unisex' | 'panjabi' | 'accessories' | 't-shirts' | 'hoodies' | 'jackets' | 'pants' | 'shirts';
  collection?: string;
  gender: 'WOMEN' | 'MEN' | 'UNISEX';
  priceBDT: number;
  originalPriceBDT?: number;
  tag?: 'NEW' | 'SALE' | 'LIMITED' | 'BESTSELLER';
  material: string;
  fit: string;
  colors: { id: string; name: string; hex: string; imageIndex?: number }[];
  sizes: string[];
  images: string[];
  secondaryImage?: string;
  inStock: boolean;
  stockCount: number;
  rating: number;
  reviewCount: number;
  reviews: ReviewItem[];
  shortDescription: string;
  description: string;
  details: string[];
  care: string[];
  storeAvailability: { gulshan: number; tejgaon: number; banani?: number };
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  isFeatured?: boolean;
}

export const CATALOG_PRODUCTS: ProductItem[] = [
  {
    id: 'prod-1',
    slug: 'tactical-cyber-kimono',
    nameEn: 'Tactical Cyber Kimono (Raw Black)',
    nameBn: 'ট্যাকটিক্যাল সাইবার কিমোনো',
    category: 'unisex',
    collection: 'new-drop-2026',
    gender: 'UNISEX',
    priceBDT: 18500,
    originalPriceBDT: 21000,
    tag: 'NEW',
    material: 'Japanese Technical Cotton Twill (340 GSM)',
    fit: 'Oversized Draped Silhouette with Magnetic Buckle',
    colors: [
      { id: 'c1', name: 'Onyx Black', hex: '#1B1C1C', imageIndex: 0 },
      { id: 'c2', name: 'Bone White', hex: '#F3EFE7', imageIndex: 1 },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=1200',
    ],
    secondaryImage: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=1200',
    inStock: true,
    stockCount: 14,
    rating: 4.9,
    reviewCount: 38,
    isBestSeller: true,
    isNewArrival: true,
    isFeatured: true,
    shortDescription: 'Engineered hybrid kimono outer layer constructed with heavy water-resistant Japanese twill and fidlock magnetic closure.',
    description: 'The Tactical Cyber Kimono represents the pinnacle of FUKU architectural tailoring. Merging traditional Eastern draping with utilitarian technical details, it features deep concealed side pockets, custom matte zinc hardware, and an elongated vented hem.',
    details: [
      '340 GSM high-density cotton-nylon twill',
      'Fidlock quick-release magnetic waist harness',
      'Twin concealed waterproof seam pockets',
      'Reinforced bar-tack stitching at stress points',
      'Custom engraved FUKU zinc metal hardware',
      'Made in Dhaka Atelier',
    ],
    care: ['Dry clean only', 'Do not tumble dry', 'Cool iron with cloth barrier'],
    storeAvailability: { gulshan: 8, tejgaon: 6, banani: 4 },
    reviews: [
      {
        id: 'rev-1',
        author: 'Farhan K.',
        rating: 5,
        date: '2026-08-14',
        title: 'Insane silhouette and fabric weight',
        comment: 'The drape on this kimono is unreal. Heavier than expected in the best way possible. Perfect for Dhaka winter evenings and gallery events.',
        verified: true,
      },
      {
        id: 'rev-2',
        author: 'Tasnim R.',
        rating: 5,
        date: '2026-07-29',
        title: 'Masterpiece outerwear piece',
        comment: 'Hardware quality is top tier. Fits oversized without drowning my frame. Highly recommend size M if you are 5ft 10in.',
        verified: true,
      },
    ],
  },
  {
    id: 'prod-2',
    slug: 'monolithic-heavyweight-tee',
    nameEn: 'Monolithic Heavyweight Oversized Tee',
    nameBn: 'মনোলিথিক ওভারসাইজড টি-শার্ট',
    category: 'unisex',
    collection: 'core-archive',
    gender: 'UNISEX',
    priceBDT: 4800,
    tag: 'BESTSELLER',
    material: '100% Combed Compact Cotton (280 GSM)',
    fit: 'Drop-Shoulder Boxy Cut with Thick Bound Collar',
    colors: [
      { id: 'c1', name: 'Bone White', hex: '#F3EFE7', imageIndex: 0 },
      { id: 'c2', name: 'Pitch Black', hex: '#0B0B0B', imageIndex: 1 },
      { id: 'c3', name: 'Raw Slate', hex: '#5A5E60', imageIndex: 2 },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&q=80&w=1200',
    ],
    secondaryImage: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&w=1200',
    inStock: true,
    stockCount: 52,
    rating: 4.8,
    reviewCount: 94,
    isBestSeller: true,
    isFeatured: true,
    shortDescription: 'The definitive daily luxury t-shirt. 280 GSM ultra-dense knit with zero sagging collar.',
    description: 'Engineered over 14 months to construct the uncompromising oversized tee. Custom-spun long-staple cotton yarn ensures structural drape that stays rigid and crisp throughout the day.',
    details: [
      '280 GSM custom combed cotton',
      '1.25 inch reinforced double-ribbed collar',
      'Split side seam with subtle grosgrain reinforcement',
      'Blind stitched sleeves and hem',
      'Pre-shrunk organic wash',
    ],
    care: ['Machine wash cold gentle', 'Hang dry in shade', 'Warm iron if needed'],
    storeAvailability: { gulshan: 25, tejgaon: 27, banani: 18 },
    reviews: [
      {
        id: 'rev-3',
        author: 'Sadman S.',
        rating: 5,
        date: '2026-09-01',
        title: 'Best heavy tee in Bangladesh bar none',
        comment: 'The collar does not bacon after 10 washes. Fits square on the shoulders like Balenciaga / Yeezy mainline.',
        verified: true,
      },
    ],
  },
  {
    id: 'prod-3',
    slug: 'architectural-linen-blazer',
    nameEn: 'Architectural Deconstructed Blazer',
    nameBn: 'আর্কিটেকচারাল ডিকনস্ট্রাক্টেড ব্লেজার',
    category: 'men',
    collection: 'dhaka-after-dark',
    gender: 'MEN',
    priceBDT: 14200,
    originalPriceBDT: 16500,
    tag: 'NEW',
    material: 'Raw Belgian Linen & Mulberry Silk Weft',
    fit: 'Structured Single-Button Peak Lapel',
    colors: [
      { id: 'c1', name: 'Jet Black', hex: '#000000', imageIndex: 0 },
      { id: 'c2', name: 'Mineral Grey', hex: '#707476', imageIndex: 1 },
    ],
    sizes: ['38R', '40R', '42R', '44R'],
    images: [
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&q=80&w=1200',
    ],
    secondaryImage: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&q=80&w=1200',
    inStock: true,
    stockCount: 11,
    rating: 4.9,
    reviewCount: 22,
    isBestSeller: false,
    isNewArrival: true,
    isFeatured: true,
    shortDescription: 'Tailored unstructured jacket with padded sculptural shoulders and horn button closure.',
    description: 'A sharp, modern silhouette designed for tropical formalwear. Breathable raw linen is blended with silk weft to produce subtle sheen under spotlights.',
    details: [
      'Hand-basted canvas chest piece',
      'Natural water buffalo horn button',
      'Half-lined with breathable cupro rayon',
      'Functional kissing cuff buttons',
    ],
    care: ['Specialist dry clean only'],
    storeAvailability: { gulshan: 5, tejgaon: 6, banani: 2 },
    reviews: [
      {
        id: 'rev-4',
        author: 'Abrar Z.',
        rating: 5,
        date: '2026-08-20',
        title: 'Sartorial perfection',
        comment: 'The drape and breathability are unmatched. Got countless compliments at the opening gala.',
        verified: true,
      },
    ],
  },
  {
    id: 'prod-4',
    slug: 'architectural-pleated-trouser',
    nameEn: 'Architectural Pleated Trouser',
    nameBn: 'আর্কিটেকচারাল প্লিটেড ট্রাউজার',
    category: 'men',
    collection: 'dhaka-after-dark',
    gender: 'MEN',
    priceBDT: 9500,
    tag: 'NEW',
    material: 'Tropical Wool Worsted (260 GSM)',
    fit: 'Double Reverse Pleat with Wide Tapered Ankle',
    colors: [
      { id: 'c1', name: 'Obsidian', hex: '#111213', imageIndex: 0 },
      { id: 'c2', name: 'Charcoal', hex: '#2A2C2D', imageIndex: 1 },
    ],
    sizes: ['30', '32', '34', '36'],
    images: [
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&q=80&w=1200',
    ],
    secondaryImage: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&q=80&w=1200',
    inStock: true,
    stockCount: 19,
    rating: 4.7,
    reviewCount: 16,
    isBestSeller: true,
    isNewArrival: true,
    isFeatured: false,
    shortDescription: 'Architectural deep-pleat trouser designed to float above high-top leather boots.',
    description: 'Cut with generous volume through the thigh and sharp taper toward the cropped cuff. Features side tab adjusters eliminating the need for a belt.',
    details: [
      'Pure tropical worsted wool',
      'Brass side waist adjusters',
      'Deep dual forward knife pleats',
      'Interior taped hems',
    ],
    care: ['Dry clean only'],
    storeAvailability: { gulshan: 7, tejgaon: 12 },
    reviews: [],
  },
  {
    id: 'prod-5',
    slug: 'jamdani-reframed-drape-saree',
    nameEn: 'Jamdani Reframed Drape Saree',
    nameBn: 'জামদানী রিফ্রেমড ড্রেপ শাড়ি',
    category: 'women',
    collection: 'jamdani-reframed',
    gender: 'WOMEN',
    priceBDT: 24500,
    originalPriceBDT: 28000,
    tag: 'LIMITED',
    material: 'Fine Count Handwoven Jamdani Muslin',
    fit: 'Contemporary Pre-Pleated Architectural Wrap',
    colors: [
      { id: 'c1', name: 'Jet Black Iridescent', hex: '#0D0E10', imageIndex: 0 },
      { id: 'c2', name: 'Chalk Gold', hex: '#E6DEC9', imageIndex: 1 },
    ],
    sizes: ['FREE SIZE (FITS S-XXL)'],
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=1200',
    ],
    secondaryImage: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=1200',
    inStock: true,
    stockCount: 6,
    rating: 5.0,
    reviewCount: 14,
    isBestSeller: true,
    isFeatured: true,
    shortDescription: 'Heritage Narayanganj handloom Jamdani re-engineered with modernist monochrome geometric motifs.',
    description: 'Taking over 45 days of master artisan weaving, this limited piece bridges 400-year Bengali textile mastery with avant-garde minimalism.',
    details: [
      'Hand-spun 200 count fine muslin thread',
      'Metallic zari supplementary weft geometric inlay',
      'Pre-tailored waist tuck anchors',
      'Includes matching high-neck blouse unstitched fabric',
    ],
    care: ['Gentle dry clean only by heritage textile conservator'],
    storeAvailability: { gulshan: 3, tejgaon: 3 },
    reviews: [
      {
        id: 'rev-5',
        author: 'Nadia Chowdhury',
        rating: 5,
        date: '2026-08-03',
        title: 'A true collector artwork',
        comment: 'The lightness of this muslin combined with the black-on-black geometric motifs is breathtaking. An absolute heirloom.',
        verified: true,
      },
    ],
  },
  {
    id: 'prod-6',
    slug: 'minimal-khadi-silk-panjabi',
    nameEn: 'Minimal Charcoal Khadi Panjabi',
    nameBn: 'মিনিমাল চারকোল খাদি পাঞ্জাবি',
    category: 'panjabi',
    collection: 'new-drop-2026',
    gender: 'MEN',
    priceBDT: 11500,
    tag: 'NEW',
    material: 'Handspun Khadi Silk & Organic Cotton',
    fit: 'Minimalist Mandarin Collar Straight Cut',
    colors: [
      { id: 'c1', name: 'Charcoal Black', hex: '#1B1C1C', imageIndex: 0 },
      { id: 'c2', name: 'Bone White', hex: '#F3EFE7', imageIndex: 1 },
      { id: 'c3', name: 'Desert Dune', hex: '#BEB29E', imageIndex: 2 },
    ],
    sizes: ['38', '40', '42', '44', '46'],
    images: [
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=1200',
    ],
    secondaryImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=1200',
    inStock: true,
    stockCount: 28,
    rating: 4.9,
    reviewCount: 41,
    isBestSeller: true,
    isNewArrival: true,
    isFeatured: true,
    shortDescription: 'Modernist ceremonial Panjabi featuring blind placket and concealed bone buttons.',
    description: 'Weaving together rustic handspun Khadi texture with the sheen of raw mulberry silk. Designed for the contemporary man who seeks elegance without excessive ornamentation.',
    details: [
      'Handspun Comilla Khadi silk blend',
      'Concealed placket with horn buttons',
      'Dual deep lined side pockets with key loop',
      'Structured 1.5 inch mandarin stand collar',
    ],
    care: ['Hand wash cold with mild detergent', 'Hang dry in shade'],
    storeAvailability: { gulshan: 12, tejgaon: 16 },
    reviews: [
      {
        id: 'rev-6',
        author: 'Shafiq M.',
        rating: 5,
        date: '2026-08-28',
        title: 'Understated luxury at its finest',
        comment: 'The texture of the khadi silk is phenomenal. Fits true to size with an effortlessly clean profile.',
        verified: true,
      },
    ],
  },
  {
    id: 'prod-7',
    slug: 'wide-leg-architectural-trouser-women',
    nameEn: 'Draped Palazzo Cargo Trouser',
    nameBn: 'ড্র্যাপড পালাজ্জো কার্গো ট্রাউজার',
    category: 'women',
    collection: 'new-drop-2026',
    gender: 'WOMEN',
    priceBDT: 9200,
    tag: 'NEW',
    material: 'High-Twist Japanese Crepe',
    fit: 'High-Rise Fluid Wide Leg',
    colors: [
      { id: 'c1', name: 'Pitch Obsidian', hex: '#0B0B0B', imageIndex: 0 },
      { id: 'c2', name: 'Sand Taupe', hex: '#C2B69D', imageIndex: 1 },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1200',
    ],
    secondaryImage: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1200',
    inStock: true,
    stockCount: 16,
    rating: 4.8,
    reviewCount: 19,
    isBestSeller: false,
    isNewArrival: true,
    isFeatured: true,
    shortDescription: 'High-waisted statement trouser crafted in fluid Japanese crepe with clean tailored waist.',
    description: 'Dramatic motion with every stride. The heavy drape of high-twist crepe prevents wrinkles and creates an elongated silhouette.',
    details: [
      'Non-wrinkle high twist Japanese crepe',
      'Concealed YKK side zip closure',
      'Extended puddle hem designed for platforms or heels',
      'Two back welt pockets',
    ],
    care: ['Gentle machine wash cold in laundry bag'],
    storeAvailability: { gulshan: 6, tejgaon: 10 },
    reviews: [],
  },
  {
    id: 'prod-8',
    slug: 'geo-jamdani-stole',
    nameEn: 'Monochrome Geo-Jamdani Stole',
    nameBn: 'মনোক্রোম জিও-জামদানী স্টোল',
    category: 'accessories',
    collection: 'jamdani-reframed',
    gender: 'UNISEX',
    priceBDT: 4800,
    originalPriceBDT: 5500,
    tag: 'SALE',
    material: '100% Fine Muslin Cotton',
    fit: 'Generous 2.2m Length Drape',
    colors: [
      { id: 'c1', name: 'Silver Slate', hex: '#8F9396', imageIndex: 0 },
      { id: 'c2', name: 'Charcoal Black', hex: '#1B1C1C', imageIndex: 1 },
    ],
    sizes: ['ONE SIZE (220cm x 75cm)'],
    images: [
      'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?auto=format&fit=crop&q=80&w=1200',
    ],
    secondaryImage: 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?auto=format&fit=crop&q=80&w=1200',
    inStock: true,
    stockCount: 35,
    rating: 4.9,
    reviewCount: 52,
    isBestSeller: true,
    isFeatured: false,
    shortDescription: 'Featherlight woven muslin stole with contemporary silver grid jacquard weave.',
    description: 'Can be styled around shoulders, as an architectural neck wrap, or draped over outerwear. Handcrafted by heritage weavers.',
    details: [
      'Featherweight 100-count muslin',
      'Eyelash fringe hand-finished hems',
      'Double-sided reversible geometry',
    ],
    care: ['Hand wash cold or gentle dry clean'],
    storeAvailability: { gulshan: 15, tejgaon: 20 },
    reviews: [],
  },
  {
    id: 'prod-9',
    slug: 'modular-tactical-vest',
    nameEn: 'Modular Utility Cargo Vest',
    nameBn: 'মডুলার ইউটিলিটি কার্গো ভেস্ট',
    category: 'unisex',
    collection: 'dhaka-after-dark',
    gender: 'UNISEX',
    priceBDT: 12500,
    originalPriceBDT: 15000,
    tag: 'SALE',
    material: 'Ripstop Cordura & Technical Mesh',
    fit: 'Adjustable Side Straps Boxy Cut',
    colors: [
      { id: 'c1', name: 'Matte Stealth', hex: '#161718', imageIndex: 0 },
      { id: 'c2', name: 'Industrial Olive', hex: '#3B3F36', imageIndex: 1 },
    ],
    sizes: ['S/M', 'L/XL'],
    images: [
      'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&q=80&w=1200',
    ],
    secondaryImage: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&q=80&w=1200',
    inStock: true,
    stockCount: 8,
    rating: 4.6,
    reviewCount: 11,
    isBestSeller: false,
    isFeatured: false,
    shortDescription: 'Layering centerpiece with 6 waterproof zip compartments and Molle webbing attachments.',
    description: 'Built for the urban nomad. Layer effortlessly over t-shirts, hoodies, or tunics for instant dystopian techwear visual energy.',
    details: [
      '500D waterproof Cordura shell',
      'Heavy duty matte black 2-way zipper',
      'Quick release tactical chest buckle',
    ],
    care: ['Spot clean with damp cloth'],
    storeAvailability: { gulshan: 4, tejgaon: 4 },
    reviews: [],
  },
  {
    id: 'prod-10',
    slug: 'sculptural-hooded-parka',
    nameEn: 'Sculptural Weatherproof Cocoon Parka',
    nameBn: 'স্কাল্পচারাল কোকুন পার্কা',
    category: 'unisex',
    collection: 'new-drop-2026',
    gender: 'UNISEX',
    priceBDT: 21500,
    tag: 'LIMITED',
    material: '3-Layer Membrane Bonded Tech Nylon',
    fit: 'Cocoon Silhouette with Funnel Neckline',
    colors: [
      { id: 'c1', name: 'Obsidian', hex: '#0B0B0B', imageIndex: 0 },
      { id: 'c2', name: 'Concrete Grey', hex: '#7D8082', imageIndex: 1 },
    ],
    sizes: ['S', 'M', 'L'],
    images: [
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=1200',
    ],
    secondaryImage: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=1200',
    inStock: true,
    stockCount: 5,
    rating: 5.0,
    reviewCount: 9,
    isBestSeller: false,
    isNewArrival: true,
    isFeatured: true,
    shortDescription: 'Architectural outerwear barrier engineered with 20,000mm waterproofing and taped seams.',
    description: 'The definitive storm shield. Features a structured hood that maintains its geometry even in heavy downpours, with an internal storm harness.',
    details: [
      '20k/20k breathable waterproof membrane',
      'Fully taped thermal seams',
      'Internal carry harness system for hands-free mobility',
      'Magnetic pocket flaps',
    ],
    care: ['Cold tech-wash only', 'Hang dry'],
    storeAvailability: { gulshan: 2, tejgaon: 3 },
    reviews: [],
  },
  {
    id: 'prod-11',
    slug: 'minimalist-leather-atelier-tote',
    nameEn: 'Architectural Minimalist Leather Tote',
    nameBn: 'আর্কিটেকচারাল লেদার টোট',
    category: 'accessories',
    collection: 'core-archive',
    gender: 'UNISEX',
    priceBDT: 15800,
    tag: 'BESTSELLER',
    material: 'Full-Grain Vegetable Tanned Cowhide Leather',
    fit: 'Structured Box Profile (Fits 16" Laptop)',
    colors: [
      { id: 'c1', name: 'Raw Ebony', hex: '#111111', imageIndex: 0 },
      { id: 'c2', name: 'Natural Saddle', hex: '#8B5A2B', imageIndex: 1 },
    ],
    sizes: ['ONE SIZE (42cm x 34cm x 12cm)'],
    images: [
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=1200',
    ],
    secondaryImage: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=1200',
    inStock: true,
    stockCount: 12,
    rating: 4.9,
    reviewCount: 27,
    isBestSeller: true,
    isFeatured: true,
    shortDescription: 'Unibody full-grain leather tote built with zero visible exterior stitching.',
    description: 'Constructed using master leathercraft techniques in Dhaka. Aged naturally over time to develop a lustrous patina unique to each carrier.',
    details: [
      'Vegetable-tanned full-grain leather',
      'Suede-lined interior laptop compartment',
      'Magnetic top closure with key tether',
      'Solid forged brass hardware with gunmetal PVD finish',
    ],
    care: ['Condition with natural beeswax balm bi-annually'],
    storeAvailability: { gulshan: 6, tejgaon: 6 },
    reviews: [],
  },
  {
    id: 'prod-12',
    slug: 'asymmetric-cotton-draped-dress',
    nameEn: 'Asymmetrical Draped Atelier Dress',
    nameBn: 'অ্যাসিমেট্রিক্যাল ড্র্যাপড ড্রেস',
    category: 'women',
    collection: 'new-drop-2026',
    gender: 'WOMEN',
    priceBDT: 13800,
    tag: 'NEW',
    material: 'Double-Gauze Organic Khadi Muslin',
    fit: 'Sculptural Cascading Hemline',
    colors: [
      { id: 'c1', name: 'Mineral Bone', hex: '#EBE5D8', imageIndex: 0 },
      { id: 'c2', name: 'Onyx Ink', hex: '#141416', imageIndex: 1 },
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    images: [
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1200',
    ],
    secondaryImage: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1200',
    inStock: true,
    stockCount: 14,
    rating: 4.9,
    reviewCount: 18,
    isBestSeller: false,
    isNewArrival: true,
    isFeatured: true,
    shortDescription: 'High-fashion modern silhouette featuring asymmetric gathering and side tie cords.',
    description: 'An ode to contemporary minimalism. Flowing lines balance structural elegance for effortless transition from day gallery walks to dinner parties.',
    details: [
      'Double-ply organic khadi muslin weave',
      'Adjustable internal cinch cord',
      'Invisible side seam zipper',
    ],
    care: ['Dry clean or delicate hand wash cold'],
    storeAvailability: { gulshan: 6, tejgaon: 8 },
    reviews: [],
  },
  {
    id: 'prod-13',
    slug: 'heavy-raw-denim-jacket',
    nameEn: 'Raw Selvedge Denim Architectural Jacket',
    nameBn: 'র সেলভেজ ডেনিম জ্যাকেট',
    category: 'men',
    collection: 'core-archive',
    gender: 'MEN',
    priceBDT: 16500,
    tag: 'BESTSELLER',
    material: '16oz Rigid Kurabo Selvedge Denim',
    fit: 'Boxy Trucker with Drop Shoulder',
    colors: [
      { id: 'c1', name: 'Raw Deep Indigo', hex: '#1C273B', imageIndex: 0 },
      { id: 'c2', name: 'Overdyed Black', hex: '#0F1012', imageIndex: 1 },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=1200',
    ],
    secondaryImage: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=1200',
    inStock: true,
    stockCount: 15,
    rating: 4.8,
    reviewCount: 33,
    isBestSeller: true,
    isFeatured: false,
    shortDescription: 'Heavyweight unwashed raw denim jacket designed to mold to your anatomy with wear.',
    description: 'Crafted from vintage shuttle-loom selvedge denim. Solid cast-iron doughnut buttons and red selvedge ID visible along interior placket.',
    details: [
      '16oz Japanese Kurabo red-line selvedge',
      'Custom cast iron shanks',
      'Concealed internal chest pocket',
    ],
    care: ['Soak in cold water inside out; air dry'],
    storeAvailability: { gulshan: 7, tejgaon: 8 },
    reviews: [],
  },
  {
    id: 'prod-14',
    slug: 'fluid-silk-mandarin-shirt',
    nameEn: 'Fluid Mulberry Silk Mandarin Shirt',
    nameBn: 'মালবেরি সিল্ক ম্যান্ডারিন শার্ট',
    category: 'unisex',
    collection: 'dhaka-after-dark',
    gender: 'UNISEX',
    priceBDT: 11800,
    originalPriceBDT: 13500,
    tag: 'SALE',
    material: '100% Heavy Mulberry Habotai Silk (22 Momme)',
    fit: 'Relaxed Fluid Drape',
    colors: [
      { id: 'c1', name: 'Pearl Bone', hex: '#EDE8DD', imageIndex: 0 },
      { id: 'c2', name: 'Midnight Charcoal', hex: '#1D1E20', imageIndex: 1 },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&q=80&w=1200',
    ],
    secondaryImage: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&q=80&w=1200',
    inStock: true,
    stockCount: 10,
    rating: 4.9,
    reviewCount: 25,
    isBestSeller: false,
    isFeatured: false,
    shortDescription: 'Pure 22 momme silk shirt with hidden mother-of-pearl buttons and curved hem.',
    description: 'Sensual fluidity meets sharp geometric tailoring. The cooling touch of pure Mulberry silk makes it supreme for warm climates and high-profile evenings.',
    details: [
      '22 Momme Grade-6A Mulberry silk',
      'Natural Australian mother-of-pearl buttons',
      'French seam construction throughout',
    ],
    care: ['Delicate silk wash with pH-neutral detergent or dry clean'],
    storeAvailability: { gulshan: 4, tejgaon: 6 },
    reviews: [],
  },
  {
    id: 'prod-15',
    slug: 'sculpted-silver-cuff',
    nameEn: 'Forged 925 Sterling Silver Minimalist Cuff',
    nameBn: 'ফরজড স্টার্লিং সিলভার কাফ',
    category: 'accessories',
    collection: 'core-archive',
    gender: 'UNISEX',
    priceBDT: 8900,
    tag: 'NEW',
    material: 'Solid 925 Sterling Silver (Oxidized Finish)',
    fit: 'Adjustable Open Cuff',
    colors: [
      { id: 'c1', name: 'Oxidized Silver', hex: '#A8ADB0', imageIndex: 0 },
    ],
    sizes: ['ONE SIZE (ADJUSTABLE)'],
    images: [
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1611591475155-4284fa2c2e7f?auto=format&fit=crop&q=80&w=1200',
    ],
    secondaryImage: 'https://images.unsplash.com/photo-1611591475155-4284fa2c2e7f?auto=format&fit=crop&q=80&w=1200',
    inStock: true,
    stockCount: 18,
    rating: 5.0,
    reviewCount: 31,
    isBestSeller: true,
    isNewArrival: true,
    isFeatured: true,
    shortDescription: 'Solid sterling silver hand-hammered cuff with subtle chamfered bevel edge.',
    description: 'Individually forged by silversmiths in Old Dhaka using traditional casting methods, then hand-buffed to a matte oxidized finish.',
    details: [
      '38 grams solid 925 sterling silver',
      'Hand-stamped FUKU ARCHIVE hallmark',
      'Comes in velvet-lined archival keepsake box',
    ],
    care: ['Polish gently with provided microfiber silver cloth'],
    storeAvailability: { gulshan: 8, tejgaon: 10 },
    reviews: [],
  },
  {
    id: 'prod-16',
    slug: 'heavyweight-oversized-hoodie',
    nameEn: 'Monolith 450 GSM Heavy French Terry Hoodie',
    nameBn: 'মনোলিথ ওভারসাইজড হুডি',
    category: 'unisex',
    collection: 'core-archive',
    gender: 'UNISEX',
    priceBDT: 7800,
    tag: 'BESTSELLER',
    material: '100% Organic French Terry Cotton (450 GSM)',
    fit: 'Ultra-Heavy Boxy Fit with Double Layer Hood',
    colors: [
      { id: 'c1', name: 'Raw Black', hex: '#111213', imageIndex: 0 },
      { id: 'c2', name: 'Ash Heather', hex: '#9FA2A6', imageIndex: 1 },
      { id: 'c3', name: 'Bone White', hex: '#F3EFE7', imageIndex: 2 },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=1200',
    ],
    secondaryImage: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=1200',
    inStock: true,
    stockCount: 40,
    rating: 4.9,
    reviewCount: 68,
    isBestSeller: true,
    isFeatured: true,
    shortDescription: '450 GSM heavyweight French terry hoodie engineered with no drawstrings and seamless kangaroo pocket.',
    description: 'The heavyweight standard. A rigid double-layered hood stands tall without sagging, framing the face in clean geometric lines.',
    details: [
      '450 GSM looped organic French terry',
      'Double-ply structured hood',
      'Wide ribbed cuffs and waist band',
      'Kangaroo pocket with bar-tack reinforcement',
    ],
    care: ['Machine wash cold inside out', 'Hang to dry'],
    storeAvailability: { gulshan: 18, tejgaon: 22 },
    reviews: [],
  },
];

// Query & Filter helper functions
export function getAllProducts(): ProductItem[] {
  return CATALOG_PRODUCTS;
}

export function getProductBySlug(slug: string): ProductItem | undefined {
  const clean = slug.toLowerCase().trim();
  return CATALOG_PRODUCTS.find(
    (p) => p.slug.toLowerCase() === clean || p.id.toLowerCase() === clean
  );
}

export function getProductById(id: string): ProductItem | undefined {
  const clean = id.toLowerCase().trim();
  return CATALOG_PRODUCTS.find(
    (p) => p.id.toLowerCase() === clean || p.slug.toLowerCase() === clean
  );
}

export function getProductsByCategory(category: string): ProductItem[] {
  const clean = category.toLowerCase().trim();
  if (clean === 'all' || clean === 'shop') return CATALOG_PRODUCTS;
  if (clean === 'new-drop' || clean === 'new-arrivals') {
    return CATALOG_PRODUCTS.filter((p) => p.isNewArrival || p.tag === 'NEW');
  }
  if (clean === 'best-sellers' || clean === 'bestsellers') {
    return CATALOG_PRODUCTS.filter((p) => p.isBestSeller || p.tag === 'BESTSELLER');
  }
  if (clean === 'sale') {
    return CATALOG_PRODUCTS.filter((p) => p.tag === 'SALE' || (p.originalPriceBDT && p.originalPriceBDT > p.priceBDT));
  }
  return CATALOG_PRODUCTS.filter(
    (p) =>
      p.category.toLowerCase() === clean ||
      p.gender.toLowerCase() === clean ||
      p.collection?.toLowerCase().includes(clean)
  );
}

export function getFeaturedProducts(): ProductItem[] {
  return CATALOG_PRODUCTS.filter((p) => p.isFeatured);
}

export function getNewArrivals(): ProductItem[] {
  return CATALOG_PRODUCTS.filter((p) => p.isNewArrival || p.tag === 'NEW');
}

export function getBestSellers(): ProductItem[] {
  return CATALOG_PRODUCTS.filter((p) => p.isBestSeller || p.tag === 'BESTSELLER');
}

export function getSaleProducts(): ProductItem[] {
  return CATALOG_PRODUCTS.filter((p) => p.tag === 'SALE' || (p.originalPriceBDT && p.originalPriceBDT > p.priceBDT));
}

export function getRelatedProducts(productId: string, limit: number = 4): ProductItem[] {
  const current = getProductById(productId);
  if (!current) return CATALOG_PRODUCTS.slice(0, limit);
  return CATALOG_PRODUCTS.filter(
    (p) => p.id !== current.id && (p.category === current.category || p.gender === current.gender)
  ).slice(0, limit);
}

export function searchProducts(query: string): ProductItem[] {
  const q = query.toLowerCase().trim();
  if (!q) return CATALOG_PRODUCTS;
  return CATALOG_PRODUCTS.filter(
    (p) =>
      p.nameEn.toLowerCase().includes(q) ||
      p.nameBn.includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.collection?.toLowerCase().includes(q) ||
      p.shortDescription.toLowerCase().includes(q) ||
      p.material.toLowerCase().includes(q) ||
      p.fit.toLowerCase().includes(q)
  );
}
