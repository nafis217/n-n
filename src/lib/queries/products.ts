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
  nameBn?: string;
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
  // ─────────────────────────────────────────────────────────
  // 1. BLACK SUIT (Tailored Obsidian Peak Lapel Wool Suit)
  // ─────────────────────────────────────────────────────────
  {
    id: 'prod-suit-01',
    slug: 'architectural-obsidian-tailored-suit',
    nameEn: 'Architectural Obsidian Tailored Suit',
    category: 'jackets',
    collection: 'new-drop-2026',
    gender: 'MEN',
    priceBDT: 28500,
    originalPriceBDT: 32000,
    tag: 'NEW',
    material: 'Italian Super 130s Wool & Poplin Stripe Oxford',
    fit: 'Modern Architectural Structured Cut with Peak Lapels',
    colors: [
      { id: 'c1', name: 'Obsidian Jet Black', hex: '#0A0A0A', imageIndex: 0 },
    ],
    sizes: ['38R', '40R', '42R', '44R'],
    images: [
      '/images/products/architectural-black-suit-1.jpg',
      '/images/products/architectural-black-suit-2.jpg',
      '/images/products/architectural-black-suit-full.jpg',
    ],
    secondaryImage: '/images/products/architectural-black-suit-2.jpg',
    inStock: true,
    stockCount: 18,
    rating: 5.0,
    reviewCount: 42,
    reviews: [
      {
        id: 'rev-suit-1',
        author: 'Rafid A.',
        rating: 5,
        date: '2026-09-02',
        title: 'Impeccable tailoring and drape',
        comment: 'The shoulder construction and waist tapering are world class. Looks striking both in natural sunlight and evening lighting.',
        verified: true,
      },
    ],
    shortDescription: 'Double-vented tailored wool blazer paired with custom striped shirting and precision trousers.',
    description: 'The Architectural Obsidian Tailored Suit represents pure sartorial discipline. Engineered with structured shoulders, deep internal chest canvas, and breathable Italian wool for uncompromising comfort across high-profile gatherings.',
    details: [
      'Italian Super 130s high-twist merino wool',
      'Hand-finished lapel roll and pick-stitch borders',
      'Dual interior welt pockets with ticket slot',
      'Made in Dhaka Atelier'
    ],
    care: ['Dry clean only', 'Store on contoured cedar hanger', 'Steam gently'],
    storeAvailability: { gulshan: 10, tejgaon: 8, banani: 4 },
    isBestSeller: true,
    isNewArrival: true,
    isFeatured: true,
  },

  // ─────────────────────────────────────────────────────────
  // 2. RAW SELVEDGE DENIM TRUCKER JACKET
  // ─────────────────────────────────────────────────────────
  {
    id: 'prod-denim-01',
    slug: 'raw-selvedge-trucker-jacket',
    nameEn: 'Raw Selvedge Denim Trucker Jacket',
    category: 'jackets',
    collection: 'new-drop-2026',
    gender: 'MEN',
    priceBDT: 16500,
    originalPriceBDT: 19000,
    tag: 'LIMITED',
    material: '15.5oz Japanese Kuroki Raw Selvedge Denim',
    fit: 'Structured Boxy Trucker Cut with Solid Brass Hardware',
    colors: [
      { id: 'c1', name: 'Raw Deep Indigo', hex: '#1C2833', imageIndex: 0 },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      '/images/products/raw-selvedge-trucker-jacket.jpg',
    ],
    secondaryImage: '/images/products/raw-selvedge-trucker-jacket.jpg',
    inStock: true,
    stockCount: 24,
    rating: 4.9,
    reviewCount: 29,
    reviews: [
      {
        id: 'rev-denim-1',
        author: 'Siam M.',
        rating: 5,
        date: '2026-08-28',
        title: 'Rigid raw denim that breaks in beautifully',
        comment: 'Heavyweight construction, great button hardware, and perfect sleeve length. Essential layer.',
        verified: true,
      },
    ],
    shortDescription: 'Heavyweight 15.5oz raw indigo selvedge denim jacket with custom antique brass rivets.',
    description: 'Woven on vintage shuttle looms, this unwashed raw denim jacket develops unique fading and character with each wear. Features twin chest flap pockets and reinforced bar-tacked side seam pockets.',
    details: [
      '15.5oz Japanese Kuroki red-line selvedge denim',
      'Custom embossed matte hardware',
      'Reinforced copper rivet points',
      'Sanforized shrink-resistant weave'
    ],
    care: ['Spot clean when possible', 'Cold soak inside out', 'Hang dry only'],
    storeAvailability: { gulshan: 12, tejgaon: 8, banani: 4 },
    isBestSeller: true,
    isNewArrival: true,
    isFeatured: true,
  },

  // ─────────────────────────────────────────────────────────
  // 3. MONOLITH CONTRAST-COLLAR TECHNICAL POLO
  // ─────────────────────────────────────────────────────────
  {
    id: 'prod-polo-01',
    slug: 'monolith-contrast-collar-technical-polo',
    nameEn: 'Monolith Contrast-Collar Technical Polo',
    category: 'shirts',
    collection: 'new-drop-2026',
    gender: 'MEN',
    priceBDT: 7800,
    tag: 'NEW',
    material: '260 GSM Compact Piqué Cotton with Gold Trim',
    fit: 'Tailored Athletic Fit with Concealed Snap Placket',
    colors: [
      { id: 'c1', name: 'Jet Black / Gold Trim', hex: '#0A0A0A', imageIndex: 0 },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      '/images/products/monolith-contrast-polo.jpg',
    ],
    secondaryImage: '/images/products/monolith-contrast-polo.jpg',
    inStock: true,
    stockCount: 35,
    rating: 4.8,
    reviewCount: 19,
    reviews: [
      {
        id: 'rev-polo-1',
        author: 'Tariq H.',
        rating: 5,
        date: '2026-09-05',
        title: 'Sharply detailed polo',
        comment: 'The collar holds its structure perfectly under blazers or worn solo.',
        verified: true,
      },
    ],
    shortDescription: 'Structured piqué polo featuring contrast micro-stripe collar ribbing and gunmetal hardware.',
    description: 'A modern technical reinterpretation of the classic polo. Constructed from high-density compact combed cotton with active moisture regulation.',
    details: [
      '260 GSM high-twist combed cotton piqué',
      'Anti-curl rib collar with woven contrast inlay',
      'Laser-etched metal hardware buttons',
      'Reinforced side split hems'
    ],
    care: ['Machine wash cold on delicate', 'Dry flat in shade'],
    storeAvailability: { gulshan: 20, tejgaon: 15 },
    isBestSeller: true,
    isNewArrival: true,
    isFeatured: true,
  },

  // ─────────────────────────────────────────────────────────
  // 4. PINK / RED OXFORD BUTTON-DOWN SHIRT
  // ─────────────────────────────────────────────────────────
  {
    id: 'prod-shirt-pink',
    slug: 'signature-oxford-button-down-pink',
    nameEn: 'Signature Oxford Button-Down Shirt (Rose Pink)',
    category: 'shirts',
    collection: 'signature-shirts',
    gender: 'MEN',
    priceBDT: 5900,
    originalPriceBDT: 6500,
    tag: 'BESTSELLER',
    material: '100% Long-Staple Compact Oxford Cotton',
    fit: 'Modern Tailored Classic Fit with Button-Down Collar',
    colors: [
      { id: 'c-pink', name: 'Rose Coral Pink', hex: '#E06B74', imageIndex: 0 },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: [
      '/images/products/product1_red_1.jpg',
      '/images/products/product1_red_2.jpg',
      '/images/products/product1_red_3.jpg',
      '/images/products/product1_red_4.jpg',
    ],
    secondaryImage: '/images/products/product1_red_2.jpg',
    inStock: true,
    stockCount: 40,
    rating: 4.9,
    reviewCount: 54,
    reviews: [
      {
        id: 'rev-sp-1',
        author: 'Farhan K.',
        rating: 5,
        date: '2026-08-15',
        title: 'Subtle and rich color tone',
        comment: 'The 4-angle photos accurately reflect the rich rose hue. Collar roll is crisp.',
        verified: true,
      },
    ],
    shortDescription: 'All-angle tailored rose pink Oxford shirt woven from premium double-twisted yarn.',
    description: 'An essential staple in the FUKU shirting suite. Featuring a natural button-down roll collar, genuine mother-of-pearl buttons, and a clean curved hem.',
    details: [
      '100% two-ply long-staple combed cotton',
      'Mother-of-pearl buttons with cross-stitching',
      'Box pleat with locker loop at rear yoke',
      'Single rounded chest pocket'
    ],
    care: ['Machine wash 30°C', 'Warm iron while slightly damp', 'Do not tumble dry'],
    storeAvailability: { gulshan: 25, tejgaon: 15, banani: 10 },
    isBestSeller: true,
    isNewArrival: false,
    isFeatured: true,
  },

  // ─────────────────────────────────────────────────────────
  // 5. GREEN OXFORD BUTTON-DOWN SHIRT
  // ─────────────────────────────────────────────────────────
  {
    id: 'prod-shirt-green',
    slug: 'signature-oxford-button-down-forest-green',
    nameEn: 'Signature Oxford Button-Down Shirt (Forest Green)',
    category: 'shirts',
    collection: 'signature-shirts',
    gender: 'MEN',
    priceBDT: 5900,
    originalPriceBDT: 6500,
    tag: 'NEW',
    material: '100% Long-Staple Compact Oxford Cotton',
    fit: 'Modern Tailored Classic Fit with Button-Down Collar',
    colors: [
      { id: 'c-green', name: 'Forest Emerald Green', hex: '#2E6F40', imageIndex: 0 },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      '/images/products/product1_green_1.jpg',
      '/images/products/product1_green_2.jpg',
      '/images/products/product1_green_3.jpg',
      '/images/products/product1_green_4.jpg',
    ],
    secondaryImage: '/images/products/product1_green_2.jpg',
    inStock: true,
    stockCount: 32,
    rating: 4.8,
    reviewCount: 38,
    reviews: [
      {
        id: 'rev-sg-1',
        author: 'Nabil R.',
        rating: 5,
        date: '2026-08-20',
        title: 'Deep forest shade is amazing',
        comment: 'Pairs nicely under charcoal blazers or worn unbuttoned over a white tee.',
        verified: true,
      },
    ],
    shortDescription: 'Multi-perspective forest green Oxford shirt tailored with reinforced gussets.',
    description: 'Precision cut from high-density basket-weave cotton. Delivers natural drape, breathability, and wrinkle resistance for day-to-evening versatility.',
    details: [
      'Two-ply 80s count compact yarn',
      'Reinforced side seam pentagon gussets',
      'Curved tail hem for tucked or untucked styling',
      'Pre-washed for soft hand feel'
    ],
    care: ['Machine wash 30°C', 'Hang dry', 'Steam iron'],
    storeAvailability: { gulshan: 18, tejgaon: 14 },
    isBestSeller: false,
    isNewArrival: true,
    isFeatured: true,
  },

  // ─────────────────────────────────────────────────────────
  // 6. ROYAL MAROON OXFORD BUTTON-DOWN SHIRT
  // ─────────────────────────────────────────────────────────
  {
    id: 'prod-shirt-maroon',
    slug: 'signature-oxford-button-down-royal-maroon',
    nameEn: 'Signature Oxford Button-Down Shirt (Royal Maroon)',
    category: 'shirts',
    collection: 'signature-shirts',
    gender: 'MEN',
    priceBDT: 5900,
    tag: 'BESTSELLER',
    material: '100% Long-Staple Compact Oxford Cotton',
    fit: 'Modern Tailored Classic Fit with Button-Down Collar',
    colors: [
      { id: 'c-maroon', name: 'Royal Burgundy Maroon', hex: '#681B2A', imageIndex: 0 },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: [
      '/images/products/product1_maroon_1.jpg',
      '/images/products/product1_maroon_2.jpg',
      '/images/products/product1_maroon_3.jpg',
      '/images/products/product1_maroon_4.jpg',
    ],
    secondaryImage: '/images/products/product1_maroon_2.jpg',
    inStock: true,
    stockCount: 45,
    rating: 4.9,
    reviewCount: 62,
    reviews: [
      {
        id: 'rev-sm-1',
        author: 'Arif C.',
        rating: 5,
        date: '2026-08-10',
        title: 'Deep wine color with immaculate construction',
        comment: 'Flawless stitching around the cuffs and collar.',
        verified: true,
      },
    ],
    shortDescription: 'Four-angle view royal maroon Oxford shirt featuring contrast interior collar band.',
    description: 'Crafted with meticulous attention to detail. This rich burgundy tone offers striking presence during evening socials and executive meetings.',
    details: [
      '100% combed cotton basket weave',
      'Dual-button adjustable mitered cuffs',
      'Fused collar interlining for perpetual roll',
      'Ethically tailored in Bangladesh'
    ],
    care: ['Machine wash cold', 'Iron warm'],
    storeAvailability: { gulshan: 22, tejgaon: 23 },
    isBestSeller: true,
    isNewArrival: false,
    isFeatured: true,
  },

  // ─────────────────────────────────────────────────────────
  // 7. CRISP WHITE OXFORD BUTTON-DOWN SHIRT
  // ─────────────────────────────────────────────────────────
  {
    id: 'prod-shirt-white',
    slug: 'signature-oxford-button-down-crisp-white',
    nameEn: 'Signature Oxford Button-Down Shirt (Crisp White)',
    category: 'shirts',
    collection: 'signature-shirts',
    gender: 'MEN',
    priceBDT: 5900,
    tag: 'BESTSELLER',
    material: '100% Long-Staple Compact Oxford Cotton',
    fit: 'Modern Tailored Classic Fit with Button-Down Collar',
    colors: [
      { id: 'c-white', name: 'Optic Crisp White', hex: '#F8F9FA', imageIndex: 0 },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: [
      '/images/products/product1_white_1.jpg',
      '/images/products/product1_white_2.jpg',
      '/images/products/product1_white_3.jpg',
      '/images/products/product1_white_4.jpg',
    ],
    secondaryImage: '/images/products/product1_white_2.jpg',
    inStock: true,
    stockCount: 60,
    rating: 5.0,
    reviewCount: 88,
    reviews: [
      {
        id: 'rev-sw-1',
        author: 'Shahidul I.',
        rating: 5,
        date: '2026-07-29',
        title: 'The definitive white shirt',
        comment: 'Opaque weave, crisp collar, and fits like a glove.',
        verified: true,
      },
    ],
    shortDescription: 'The quintessential crisp white Oxford shirt with four-view showcase angles.',
    description: 'The foundation of every curated wardrobe. Double-twisted 100% cotton yarn provides structure, opacity, and soft comfort throughout full-day wear.',
    details: [
      'Dense 140 GSM Oxford weave (non-see-through)',
      'Single needle tailored construction',
      'Mother-of-pearl buttons with shank wrapping',
      'Signature embroidered tonal monogram'
    ],
    care: ['Machine wash 40°C', 'Hang dry', 'Steam iron'],
    storeAvailability: { gulshan: 30, tejgaon: 30 },
    isBestSeller: true,
    isNewArrival: false,
    isFeatured: true,
  },

  // ─────────────────────────────────────────────────────────
  // 8. MUSTARD OCHRE OXFORD BUTTON-DOWN SHIRT
  // ─────────────────────────────────────────────────────────
  {
    id: 'prod-shirt-yellow',
    slug: 'signature-oxford-button-down-mustard-yellow',
    nameEn: 'Signature Oxford Button-Down Shirt (Mustard Ochre)',
    category: 'shirts',
    collection: 'signature-shirts',
    gender: 'MEN',
    priceBDT: 5900,
    tag: 'NEW',
    material: '100% Long-Staple Compact Oxford Cotton',
    fit: 'Modern Tailored Classic Fit with Button-Down Collar',
    colors: [
      { id: 'c-yellow', name: 'Mustard Ochre Yellow', hex: '#DDA133', imageIndex: 0 },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      '/images/products/product1_yellow_1.jpg',
      '/images/products/product1_yellow_2.jpg',
      '/images/products/product1_yellow_3.jpg',
      '/images/products/product1_yellow_4.jpg',
    ],
    secondaryImage: '/images/products/product1_yellow_2.jpg',
    inStock: true,
    stockCount: 28,
    rating: 4.7,
    reviewCount: 23,
    reviews: [
      {
        id: 'rev-sy-1',
        author: 'Zubair T.',
        rating: 5,
        date: '2026-08-04',
        title: 'Vibrant and refined',
        comment: 'Warm earthen shade that works surprisingly well with navy chinos.',
        verified: true,
      },
    ],
    shortDescription: 'Four-angle mustard yellow Oxford shirt with signature chest pocket styling.',
    description: 'Warm, earthen ochre tone garment-dyed for rich depth of color. Ideal for smart-casual weekends and creative workplaces.',
    details: [
      'Garment-dyed compact cotton',
      'Soft enzyme washed finish',
      'Reinforced placket and collar roll',
      'Dual spare buttons included'
    ],
    care: ['Machine wash cold inside out', 'Dry in shade'],
    storeAvailability: { gulshan: 14, tejgaon: 14 },
    isBestSeller: false,
    isNewArrival: true,
    isFeatured: true,
  },

  // ─────────────────────────────────────────────────────────
  // 9. COBALT BLUE STRUCTURED POLO
  // ─────────────────────────────────────────────────────────
  {
    id: 'prod-polo-blue',
    slug: 'heavyweight-structured-cotton-polo-cobalt-blue',
    nameEn: 'Heavyweight Structured Cotton Polo (Cobalt Blue)',
    category: 'shirts',
    collection: 'signature-knits',
    gender: 'MEN',
    priceBDT: 6200,
    originalPriceBDT: 6900,
    tag: 'BESTSELLER',
    material: '100% Compact Combed Piqué Cotton',
    fit: 'Modern Athletic Fit with Ribbed Sleeves',
    colors: [
      { id: 'c-blue', name: 'Cobalt Royal Blue', hex: '#244C78', imageIndex: 0 },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      '/images/products/product2_blue_1.jpg',
      '/images/products/product2_blue_2.jpg',
      '/images/products/product2_blue_3.jpg',
      '/images/products/product2_blue_4.jpg',
    ],
    secondaryImage: '/images/products/product2_blue_2.jpg',
    inStock: true,
    stockCount: 36,
    rating: 4.9,
    reviewCount: 47,
    reviews: [
      {
        id: 'rev-pb-1',
        author: 'Ahsan Q.',
        rating: 5,
        date: '2026-08-11',
        title: 'Great fabric weight and color saturation',
        comment: 'All 4 photo angles show the true fit and sleeve ribbed detailing accurately.',
        verified: true,
      },
    ],
    shortDescription: 'Four-angle view heavyweight cobalt blue polo with precision rib collar.',
    description: 'Structured from 240 GSM piqué knit cotton. Retains crisp lines around the neckline and biceps while remaining comfortably breathable.',
    details: [
      '240 GSM double-combed piqué knit',
      'Three-button reinforced box placket',
      'Anti-bacterial silicone softener wash',
      'Side vent drop-tail hem'
    ],
    care: ['Machine wash cold', 'Do not bleach', 'Flat dry'],
    storeAvailability: { gulshan: 20, tejgaon: 16 },
    isBestSeller: true,
    isNewArrival: false,
    isFeatured: true,
  },

  // ─────────────────────────────────────────────────────────
  // 10. ESPOIR LA BOHÈME SILK EVENING GOWN (Women Haute Couture)
  // ─────────────────────────────────────────────────────────
  {
    id: 'prod-espoir-01',
    slug: 'espoir-la-boheme-silk-evening-gown',
    nameEn: 'Espoir Haute Couture Silk Gown (La Bohème)',
    category: 'women',
    collection: 'couture-editorial',
    gender: 'WOMEN',
    priceBDT: 34500,
    originalPriceBDT: 38000,
    tag: 'LIMITED',
    material: '100% Mulberry Silk Crepe & Georgette Drape',
    fit: 'Fluid Asymmetric Silhouette with Hand-Pleated Bodice',
    colors: [
      { id: 'c-blush', name: 'Blush Champagne Silk', hex: '#E8D4C8', imageIndex: 0 },
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    images: [
      '/images/products/espoir_La-Boheme-L-768x765.jpg',
      '/images/products/espoir_La-Boheme-L-768x765_1.jpg',
      '/images/products/espoir_La-Boheme-L-768x765_2.jpg',
      '/images/products/espoir_La-Boheme-L-768x765_3.jpg',
    ],
    secondaryImage: '/images/products/espoir_La-Boheme-L-768x765_1.jpg',
    inStock: true,
    stockCount: 12,
    rating: 5.0,
    reviewCount: 31,
    reviews: [
      {
        id: 'rev-esp-1',
        author: 'Nuzhat S.',
        rating: 5,
        date: '2026-08-25',
        title: 'Breathtaking silk movement',
        comment: 'Wore this for an editorial gala. The drape, champagne luster, and stitchwork are unmatched.',
        verified: true,
      },
    ],
    shortDescription: 'Multi-angle photoshoot view of the handcrafted silk evening gown from the Espoir couture collection.',
    description: 'Sculpted from luminous Mulberry silk crepe. Features fluid cascading panels, concealed silk-covered zipper, and a graceful trailing silhouette.',
    details: [
      '100% pure Mulberry silk 22 momme',
      'Hand-pleated crossover bodice',
      'Full interior silk habotai lining',
      'Couture atelier construction'
    ],
    care: ['Specialist dry clean only', 'Keep in breathable garment bag'],
    storeAvailability: { gulshan: 8, tejgaon: 4 },
    isBestSeller: true,
    isNewArrival: true,
    isFeatured: true,
  },

  // ─────────────────────────────────────────────────────────
  // 11. ESPOIR MY ROUGE CRIMSON VELVET ROBE
  // ─────────────────────────────────────────────────────────
  {
    id: 'prod-espoir-02',
    slug: 'espoir-my-rouge-crimson-velvet-robe',
    nameEn: 'Espoir Crimson Velvet Evening Robe (My Rouge)',
    category: 'women',
    collection: 'couture-editorial',
    gender: 'WOMEN',
    priceBDT: 31000,
    tag: 'NEW',
    material: 'Deep Crimson Silk Velvet with Satin Lapel Trim',
    fit: 'Relaxed Floor-Length Robe with Wrap Sash Belt',
    colors: [
      { id: 'c-rouge', name: 'Deep Scarlet Crimson', hex: '#851C2C', imageIndex: 0 },
    ],
    sizes: ['S', 'M', 'L'],
    images: [
      '/images/products/espoir_My-Rouge-L-768x768.jpg',
      '/images/products/espoir_My-Rouge-M-768x763.jpg',
    ],
    secondaryImage: '/images/products/espoir_My-Rouge-M-768x763.jpg',
    inStock: true,
    stockCount: 15,
    rating: 4.9,
    reviewCount: 22,
    reviews: [
      {
        id: 'rev-mr-1',
        author: 'Samira H.',
        rating: 5,
        date: '2026-08-30',
        title: 'Luxurious velvet luster',
        comment: 'The scarlet velvet catches ambient light with a deep multidimensional glow.',
        verified: true,
      },
    ],
    shortDescription: 'Photoshoot showcase of the crimson silk velvet evening robe with satin sash.',
    description: 'An ode to evening sophistication. Cut from heavyweight silk velvet that drapes with rich, fluid weight and framed by sculpted shawl lapels.',
    details: [
      'Heavyweight silk velvet with deep pile',
      'Satin-faced shawl lapels and pocket piping',
      'Removable wide velvet tie belt',
      'Deep concealed side welt pockets'
    ],
    care: ['Dry clean only', 'Do not steam directly on velvet pile'],
    storeAvailability: { gulshan: 10, tejgaon: 5 },
    isBestSeller: false,
    isNewArrival: true,
    isFeatured: true,
  },

  // ─────────────────────────────────────────────────────────
  // 12. ESPOIR BLANC SUR BLANC SILK BLAZER
  // ─────────────────────────────────────────────────────────
  {
    id: 'prod-espoir-03',
    slug: 'espoir-blanc-sur-blanc-silk-blazer',
    nameEn: 'Espoir Structured Silk Blazer (Blanc sur Blanc)',
    category: 'women',
    collection: 'couture-editorial',
    gender: 'WOMEN',
    priceBDT: 26500,
    tag: 'BESTSELLER',
    material: 'Raw Textured Dupioni Silk & Wool Blend',
    fit: 'Double-Breasted Sculpted Silhouette with Horn Buttons',
    colors: [
      { id: 'c-blanc', name: 'Ivory Silk White', hex: '#FAF8F5', imageIndex: 0 },
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    images: [
      '/images/products/espoir_Blanc-sur-Blanc-L-768x760.jpg',
      '/images/products/espoir_Blanc-sur-Blanc-L-768x760_1.jpg',
    ],
    secondaryImage: '/images/products/espoir_Blanc-sur-Blanc-L-768x760_1.jpg',
    inStock: true,
    stockCount: 16,
    rating: 5.0,
    reviewCount: 27,
    reviews: [
      {
        id: 'rev-bsb-1',
        author: 'Tasmia N.',
        rating: 5,
        date: '2026-09-01',
        title: 'Architectural precision in raw silk',
        comment: 'Incredible shoulder pads and waist silhouette. Looks majestic paired with wide-leg trousers.',
        verified: true,
      },
    ],
    shortDescription: 'Editorial images of the double-breasted ivory silk blazer tailored in Dhaka.',
    description: 'Hand-woven raw silk blend with subtle natural slub texture. Features pronounced peak lapels, horn buttons, and clean jetted flap pockets.',
    details: [
      'Raw textured Dupioni silk and fine wool',
      'Full floating canvas interior construction',
      'Natural horn buttons with engraved underside',
      'Dual rear vents for effortless movement'
    ],
    care: ['Specialist dry clean only', 'Store on padded hanger'],
    storeAvailability: { gulshan: 10, tejgaon: 6 },
    isBestSeller: true,
    isNewArrival: false,
    isFeatured: true,
  },

  // ─────────────────────────────────────────────────────────
  // 13. ESPOIR SUMMER FRUITS BOTANICAL SILK KIMONO
  // ─────────────────────────────────────────────────────────
  {
    id: 'prod-espoir-04',
    slug: 'espoir-summer-fruits-botanical-silk-kimono',
    nameEn: 'Espoir Botanical Silk Kimono (Summer Fruits)',
    category: 'women',
    collection: 'couture-editorial',
    gender: 'WOMEN',
    priceBDT: 24000,
    tag: 'LIMITED',
    material: '100% Silk Twill with Archival Hand-Painted Botanical Motif',
    fit: 'Fluid Wide-Sleeve Drape with Silk Belt',
    colors: [
      { id: 'c-fruits', name: 'Pastel Botanical Floral', hex: '#D8BCAB', imageIndex: 0 },
    ],
    sizes: ['Free Size (XS-XL)'],
    images: [
      '/images/products/espoir_Summer-Fruits-L-768x763.jpg',
      '/images/products/espoir_Summer-Fruits-L-768x763_1.jpg',
    ],
    secondaryImage: '/images/products/espoir_Summer-Fruits-L-768x763_1.jpg',
    inStock: true,
    stockCount: 14,
    rating: 4.8,
    reviewCount: 18,
    reviews: [
      {
        id: 'rev-sf-1',
        author: 'Mahzabin A.',
        rating: 5,
        date: '2026-08-18',
        title: 'Wearable art piece',
        comment: 'The soft pastel botanical painting on the silk twill is breathtaking.',
        verified: true,
      },
    ],
    shortDescription: 'Hand-painted botanical print silk twill kimono with flowing kimono sleeves.',
    description: 'An expressive statement piece featuring an exclusive botanical artwork created in collaboration with heritage Dhaka illustrators.',
    details: [
      '100% silk twill with rolled hand-sewn edges',
      'Archival high-definition eco-pigment printing',
      'Wide traditional kimono sleeve openings',
      'Includes reversible matching silk sash'
    ],
    care: ['Gentle hand wash in cold water with silk detergent or dry clean'],
    storeAvailability: { gulshan: 8, tejgaon: 6 },
    isBestSeller: false,
    isNewArrival: true,
    isFeatured: true,
  },

  // ─────────────────────────────────────────────────────────
  // 14. ESPOIR ATELIER TAILORED SET (Stone Ecru)
  // ─────────────────────────────────────────────────────────
  {
    id: 'prod-espoir-05',
    slug: 'espoir-atelier-tailored-linen-set',
    nameEn: 'Espoir Atelier Tailored Set (Stone Ecru)',
    category: 'women',
    collection: 'couture-editorial',
    gender: 'WOMEN',
    priceBDT: 29000,
    originalPriceBDT: 33000,
    tag: 'BESTSELLER',
    material: 'Belgian Linen & Silk Twill Blend',
    fit: 'Relaxed Tailored Two-Piece Set with Cinch Waist',
    colors: [
      { id: 'c-ecru', name: 'Raw Stone Ecru', hex: '#D1CCC2', imageIndex: 0 },
    ],
    sizes: ['S', 'M', 'L'],
    images: [
      '/images/products/espoir_6-1-768x768.jpg',
      '/images/products/espoir_2-1-768x768.jpg',
    ],
    secondaryImage: '/images/products/espoir_2-1-768x768.jpg',
    inStock: true,
    stockCount: 20,
    rating: 4.9,
    reviewCount: 35,
    reviews: [
      {
        id: 'rev-at-1',
        author: 'Farzana K.',
        rating: 5,
        date: '2026-08-22',
        title: 'The cleanest neutral tailored set',
        comment: 'Perfect weight and effortless elegance for warm Dhaka climate.',
        verified: true,
      },
    ],
    shortDescription: 'Editorial images of the two-piece relaxed linen-silk tailored ensemble.',
    description: 'Crafted from raw Belgian linen blended with Mulberry silk. Delivers effortless poise with clean lines and breathable comfort.',
    details: [
      'High-grade Belgian long-fiber linen blend',
      'Horn button closure and notched lapels',
      'High-waisted trousers with double pleats',
      'Adjustable internal waist drawcord'
    ],
    care: ['Dry clean or delicate cold hand wash', 'Iron inside out on linen setting'],
    storeAvailability: { gulshan: 12, tejgaon: 8 },
    isBestSeller: true,
    isNewArrival: false,
    isFeatured: true,
  },

  // ─────────────────────────────────────────────────────────
  // 15. MINIMALIST RAW EDGE CREWNECK SWEATER (Charcoal Grey)
  // ─────────────────────────────────────────────────────────
  {
    id: 'prod-knit-grey',
    slug: 'minimalist-raw-edge-crewneck-grey',
    nameEn: 'Minimalist Raw Edge Crewneck (Charcoal Grey)',
    category: 'hoodies',
    collection: 'core-knits',
    gender: 'UNISEX',
    priceBDT: 6800,
    tag: 'NEW',
    material: '380 GSM Heavy French Terry Cotton',
    fit: 'Relaxed Drop-Shoulder Boxy Cut',
    colors: [
      { id: 'c-grey', name: 'Charcoal Heather Grey', hex: '#4A4D52', imageIndex: 0 },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      '/images/products/product3_grey_1.jpg',
    ],
    secondaryImage: '/images/products/product3_grey_1.jpg',
    inStock: true,
    stockCount: 30,
    rating: 4.8,
    reviewCount: 26,
    reviews: [
      {
        id: 'rev-kg-1',
        author: 'Saad M.',
        rating: 5,
        date: '2026-08-14',
        title: 'Superb terry weight',
        comment: 'Thick, comfortable, and the boxy drop-shoulder cut is on point.',
        verified: true,
      },
    ],
    shortDescription: 'Heavyweight charcoal French terry crewneck with clean minimal lines.',
    description: 'An everyday essential engineered for year-round layering. Built with 380 GSM organic cotton looped French terry.',
    details: [
      '380 GSM combed organic French terry',
      'Double-stitched rib collar, cuffs, and hem',
      'Pre-shrunk for zero dimensional shift',
      'Made in Dhaka'
    ],
    care: ['Machine wash cold', 'Tumble dry low or hang dry'],
    storeAvailability: { gulshan: 18, tejgaon: 12 },
    isBestSeller: false,
    isNewArrival: true,
    isFeatured: true,
  },

  // ─────────────────────────────────────────────────────────
  // 16. HEAVYWEIGHT RELAXED TEE (Sage Green)
  // ─────────────────────────────────────────────────────────
  {
    id: 'prod-tee-green',
    slug: 'heavyweight-drop-shoulder-relaxed-tee-sage',
    nameEn: 'Heavyweight Drop-Shoulder Relaxed Tee (Sage Olive)',
    category: 't-shirts',
    collection: 'core-knits',
    gender: 'UNISEX',
    priceBDT: 3400,
    tag: 'BESTSELLER',
    material: '280 GSM Compact Organic Jersey Cotton',
    fit: 'Oversized Boxy Silhouette with Thick Collar Rib',
    colors: [
      { id: 'c-sage', name: 'Sage Olive Green', hex: '#4B634E', imageIndex: 0 },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      '/images/products/product4_green_1.jpg',
      '/images/products/product8_green_1.jpg',
    ],
    secondaryImage: '/images/products/product8_green_1.jpg',
    inStock: true,
    stockCount: 50,
    rating: 4.9,
    reviewCount: 65,
    reviews: [
      {
        id: 'rev-tg-1',
        author: 'Mehedi H.',
        rating: 5,
        date: '2026-08-08',
        title: 'Best heavyweight tee in Bangladesh',
        comment: 'Collar stays completely flat after multiple washes and fabric feels substantial.',
        verified: true,
      },
    ],
    shortDescription: 'Dual photoshoot view 280 GSM heavyweight sage green drop-shoulder tee.',
    description: 'Engineered with dense, opaque 280 GSM organic cotton jersey. Delivers an architectural drape that holds its boxy structure throughout the day.',
    details: [
      '280 GSM compact jersey cotton',
      '1.25 inch thick non-sag rib collar',
      'Reinforced shoulder-to-shoulder taped seams',
      'Double-needle hem stitching'
    ],
    care: ['Machine wash cold inside out', 'Hang dry'],
    storeAvailability: { gulshan: 25, tejgaon: 25 },
    isBestSeller: true,
    isNewArrival: false,
    isFeatured: true,
  },

  // ─────────────────────────────────────────────────────────
  // 17. TAILORED SINGLE-BREASTED BLAZER (Matte Obsidian)
  // ─────────────────────────────────────────────────────────
  {
    id: 'prod-blazer-black',
    slug: 'tailored-single-breasted-blazer-matte-black',
    nameEn: 'Tailored Single-Breasted Blazer (Matte Obsidian)',
    category: 'jackets',
    collection: 'tailoring',
    gender: 'MEN',
    priceBDT: 19500,
    originalPriceBDT: 22000,
    tag: 'LIMITED',
    material: 'Super 120s High-Twist Wool & Cupro Lining',
    fit: 'Modern Tailored Fit with Horn Buttons',
    colors: [
      { id: 'c-blk', name: 'Matte Obsidian Black', hex: '#111111', imageIndex: 0 },
    ],
    sizes: ['38R', '40R', '42R', '44R'],
    images: [
      '/images/products/product5_black_1.jpg',
      '/images/products/architectural-black-suit-2.jpg',
    ],
    secondaryImage: '/images/products/architectural-black-suit-2.jpg',
    inStock: true,
    stockCount: 16,
    rating: 4.9,
    reviewCount: 33,
    reviews: [
      {
        id: 'rev-sb-1',
        author: 'Rashed V.',
        rating: 5,
        date: '2026-08-19',
        title: 'Versatile and perfectly cut',
        comment: 'Can be dressed down with denim or paired formally with trousers.',
        verified: true,
      },
    ],
    shortDescription: 'Photoshoot tailored black single-breasted wool blazer with clean lapels.',
    description: 'Precision-tailored single-breasted jacket with light chest canvassing for a natural drape without stiffness.',
    details: [
      'Super 120s high-twist lightweight wool',
      'Breathable Bemberg cupro interior lining',
      'Two-button front with dark horn buttons',
      'Twin rear side vents'
    ],
    care: ['Dry clean only', 'Store on contoured wood hanger'],
    storeAvailability: { gulshan: 10, tejgaon: 6 },
    isBestSeller: true,
    isNewArrival: false,
    isFeatured: true,
  },

  // ─────────────────────────────────────────────────────────
  // 18. HEAVY MELTON WOOL OVERCOAT (Espresso Umber)
  // ─────────────────────────────────────────────────────────
  {
    id: 'prod-coat-brown',
    slug: 'heavy-melton-wool-overcoat-espresso',
    nameEn: 'Heavy Melton Wool Overcoat (Espresso Umber)',
    category: 'jackets',
    collection: 'outerwear',
    gender: 'MEN',
    priceBDT: 23500,
    tag: 'NEW',
    material: '650 GSM Heavy Double-Faced Melton Wool',
    fit: 'Structured Longline Silhouette with Peak Lapels',
    colors: [
      { id: 'c-brown', name: 'Espresso Umber Brown', hex: '#543828', imageIndex: 0 },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      '/images/products/product6_brown_1.jpg',
    ],
    secondaryImage: '/images/products/product6_brown_1.jpg',
    inStock: true,
    stockCount: 15,
    rating: 5.0,
    reviewCount: 19,
    reviews: [
      {
        id: 'rev-cb-1',
        author: 'Anisul M.',
        rating: 5,
        date: '2026-09-03',
        title: 'Substantial, warm, and handsome coat',
        comment: 'The 650 GSM melton wool has phenomenal density and the espresso shade is stunning.',
        verified: true,
      },
    ],
    shortDescription: 'Heavyweight 650 GSM double-faced espresso wool overcoat with clean silhouette.',
    description: 'Designed for cold travels and evening outings. Cut with a generous knee-length profile and sharp peak lapels that retain their structure.',
    details: [
      '650 GSM heavy double-faced melton wool',
      'Fully lined with insulated satin twill',
      'Deep fleece-lined handwarmer welt pockets',
      'Center back vent for stride ease'
    ],
    care: ['Dry clean only'],
    storeAvailability: { gulshan: 9, tejgaon: 6 },
    isBestSeller: false,
    isNewArrival: true,
    isFeatured: true,
  },

  // ─────────────────────────────────────────────────────────
  // 19. VINTAGE WASHED INDIGO DENIM OVERSHIRT
  // ─────────────────────────────────────────────────────────
  {
    id: 'prod-denim-blue',
    slug: 'vintage-washed-indigo-denim-overshirt',
    nameEn: 'Vintage Washed Indigo Denim Overshirt',
    category: 'jackets',
    collection: 'denim-archive',
    gender: 'UNISEX',
    priceBDT: 11500,
    originalPriceBDT: 13000,
    tag: 'BESTSELLER',
    material: '12oz Stonewashed Ringspun Cotton Denim',
    fit: 'Relaxed Workwear Overshirt with Dual Chest Pockets',
    colors: [
      { id: 'c-vblue', name: 'Vintage Stone Indigo', hex: '#3A6080', imageIndex: 0 },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      '/images/products/product7_blue_1.jpg',
    ],
    secondaryImage: '/images/products/product7_blue_1.jpg',
    inStock: true,
    stockCount: 25,
    rating: 4.8,
    reviewCount: 39,
    reviews: [
      {
        id: 'rev-vd-1',
        author: 'Tanvir A.',
        rating: 5,
        date: '2026-08-16',
        title: 'Perfect layering denim shirt',
        comment: 'Great washed vintage blue tone and sturdy snap closures.',
        verified: true,
      },
    ],
    shortDescription: '12oz stonewashed indigo denim workwear overshirt with antique hardware.',
    description: 'Enzyme and pumice stone washed for an authentic broken-in look and ultra-soft drape from the very first wear.',
    details: [
      '12oz 100% ringspun cotton denim',
      'Dual chest flap pockets with snap buttons',
      'Curved hemline with reinforced side gussets',
      'Triple-needle chainstitching along stress points'
    ],
    care: ['Machine wash cold inside out', 'Hang to dry'],
    storeAvailability: { gulshan: 15, tejgaon: 10 },
    isBestSeller: true,
    isNewArrival: false,
    isFeatured: true,
  },

  // ─────────────────────────────────────────────────────────
  // 20. FUKU GRAPHIC BOXY TEE (Archive Drop)
  // ─────────────────────────────────────────────────────────
  {
    id: 'prod-tee-graphic',
    slug: 'fuku-graphic-boxy-tee-black',
    nameEn: 'FUKU Graphic Boxy Tee (Archive Edition)',
    category: 't-shirts',
    collection: 'streetwear-archive',
    gender: 'UNISEX',
    priceBDT: 3200,
    tag: 'NEW',
    material: '260 GSM Heavy Carded Jersey Cotton',
    fit: 'Boxy Relaxed Streetwear Cut',
    colors: [
      { id: 'c-wblk', name: 'Washed Vintage Black', hex: '#1C1C1E', imageIndex: 0 },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      '/images/products/shop_769b9d60ff941dde9bc0e54431b8d8fe3182f5e9.png',
      '/images/products/shop_345742c27cc557f42cf1d489f7cc811856b90e9f.png',
    ],
    secondaryImage: '/images/products/shop_345742c27cc557f42cf1d489f7cc811856b90e9f.png',
    inStock: true,
    stockCount: 42,
    rating: 4.9,
    reviewCount: 51,
    reviews: [
      {
        id: 'rev-gt-1',
        author: 'Shakil R.',
        rating: 5,
        date: '2026-08-27',
        title: 'Clean screenprint and heavy cotton',
        comment: 'High density screenprint that has survived 10+ wash cycles without cracking.',
        verified: true,
      },
    ],
    shortDescription: 'Dual-image showcase of the archive graphic heavyweight streetwear tee.',
    description: 'Featuring the signature FUKU geometric screenprint on heavyweight carded combed cotton jersey.',
    details: [
      '260 GSM premium carded cotton jersey',
      'High-density water-based archival print',
      'Thick 1.25 inch crewneck collar',
      'Pre-shrunk fabric treatment'
    ],
    care: ['Machine wash cold inside out', 'Do not iron directly over print'],
    storeAvailability: { gulshan: 22, tejgaon: 20 },
    isBestSeller: true,
    isNewArrival: true,
    isFeatured: true,
  },

  // ─────────────────────────────────────────────────────────
  // 21. FUKU TYPOGRAPHY HEAVYWEIGHT COTTON TEE
  // ─────────────────────────────────────────────────────────
  {
    id: 'prod-tee-typo',
    slug: 'fuku-typography-heavyweight-tee-ecru',
    nameEn: 'FUKU Typography Heavyweight Cotton Tee (Ecru)',
    category: 't-shirts',
    collection: 'streetwear-archive',
    gender: 'UNISEX',
    priceBDT: 3200,
    tag: 'BESTSELLER',
    material: '260 GSM Heavy Carded Jersey Cotton',
    fit: 'Boxy Relaxed Streetwear Cut',
    colors: [
      { id: 'c-offw', name: 'Vintage Off-White Ecru', hex: '#F0EFEA', imageIndex: 0 },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      '/images/products/shop_d40da9a3a7234235e66d6695d9d7098fc3289872.png',
      '/images/products/shop_bbf411c25fc84f87eeac1062fbe47f49c192d4f2.png',
    ],
    secondaryImage: '/images/products/shop_bbf411c25fc84f87eeac1062fbe47f49c192d4f2.png',
    inStock: true,
    stockCount: 38,
    rating: 4.8,
    reviewCount: 42,
    reviews: [
      {
        id: 'rev-ty-1',
        author: 'Faisal J.',
        rating: 5,
        date: '2026-08-21',
        title: 'Understated elegance',
        comment: 'The ecru tone looks far richer than plain white.',
        verified: true,
      },
    ],
    shortDescription: 'Dual-image typography tee in vintage ecru heavy combed jersey.',
    description: 'Understated minimal typography honoring Dhaka atelier roots. Built for effortless daily wear.',
    details: [
      '260 GSM combed organic cotton',
      'Micro-puff typography print',
      'Double-ply ribbed collar',
      'Reinforced shoulder tape'
    ],
    care: ['Machine wash cold', 'Hang dry'],
    storeAvailability: { gulshan: 20, tejgaon: 18 },
    isBestSeller: true,
    isNewArrival: false,
    isFeatured: true,
  },

  // ─────────────────────────────────────────────────────────
  // 22. HERITAGE CHRONOGRAPH AUTOMATIC WATCH (Accessories)
  // ─────────────────────────────────────────────────────────
  {
    id: 'prod-watch-ssk',
    slug: 'heritage-chronograph-automatic-watch-gmt',
    nameEn: 'Heritage SSK GMT Automatic Chronograph Watch',
    category: 'accessories',
    collection: 'timepieces',
    gender: 'MEN',
    priceBDT: 48500,
    originalPriceBDT: 54000,
    tag: 'LIMITED',
    material: '316L Solid Stainless Steel & Hardlex Crystal',
    fit: '42.5mm Case Diameter with 5-Link Jubilee Solid Bracelet',
    colors: [
      { id: 'c-steel', name: 'Brushed Steel / Obsidian Dial', hex: '#2B2B2B', imageIndex: 0 },
    ],
    sizes: ['One Size (Adjustable Links)'],
    images: [
      '/images/products/shop_seiko-5-gmt-ssk001-18.jpg',
      '/images/products/shop_SSK001_a.jpg',
      '/images/products/shop_71lpOy5nEaL._AC_SL1500_.jpg',
    ],
    secondaryImage: '/images/products/shop_SSK001_a.jpg',
    inStock: true,
    stockCount: 8,
    rating: 5.0,
    reviewCount: 36,
    reviews: [
      {
        id: 'rev-wt-1',
        author: 'Dr. Ehsanur R.',
        rating: 5,
        date: '2026-09-06',
        title: 'Flawless timepiece and dual timezone accuracy',
        comment: 'The Jubilee bracelet is supremely comfortable and the GMT bezel action is super smooth.',
        verified: true,
      },
    ],
    shortDescription: 'Multi-angle photoshoot of the 42.5mm automatic GMT timepiece with solid link bracelet.',
    description: 'Precision Japanese 4R34 automatic caliber movement featuring GMT dual-time zone function, date cyclops, and luminous hands encased in 316L brushed stainless steel.',
    details: [
      'Japanese 4R34 automatic movement with 41-hour power reserve',
      'Dual-time GMT 24-hour rotating bezel',
      '100M water resistance (10 bar)',
      'Solid link 5-row stainless steel bracelet with three-fold clasp'
    ],
    care: ['Wipe with microfiber cloth', 'Rinse with freshwater after saltwater exposure'],
    storeAvailability: { gulshan: 5, tejgaon: 3 },
    isBestSeller: true,
    isNewArrival: true,
    isFeatured: true,
  },

  // ─────────────────────────────────────────────────────────
  // 23. STRUCTURED PLEATED FORMAL TROUSER (Pants)
  // ─────────────────────────────────────────────────────────
  {
    id: 'prod-pant-black',
    slug: 'architectural-pleated-formal-trouser',
    nameEn: 'Architectural Pleated Formal Trouser (Obsidian Black)',
    category: 'pants',
    collection: 'tailoring',
    gender: 'MEN',
    priceBDT: 8900,
    tag: 'NEW',
    material: 'Super 130s High-Twist Wool Crepe',
    fit: 'High-Rise Double Pleated Relaxed Tapered Fit',
    colors: [
      { id: 'c-pblk', name: 'Obsidian Jet Black', hex: '#0A0A0A', imageIndex: 0 },
    ],
    sizes: ['30', '32', '34', '36', '38'],
    images: [
      '/images/products/architectural-black-suit-full.jpg',
      '/images/products/architectural-black-suit-1.jpg',
    ],
    secondaryImage: '/images/products/architectural-black-suit-1.jpg',
    inStock: true,
    stockCount: 22,
    rating: 4.9,
    reviewCount: 28,
    reviews: [
      {
        id: 'rev-pt-1',
        author: 'Kazi M.',
        rating: 5,
        date: '2026-08-29',
        title: 'Drape is immaculate',
        comment: 'The double forward pleats give incredible comfort when sitting and standing.',
        verified: true,
      },
    ],
    shortDescription: 'Photoshoot tailored high-rise double pleated wool trouser with clean break.',
    description: 'Cut with generous thigh room tapering smoothly down to a clean cuff. Engineered with side adjusters to eliminate the need for belts.',
    details: [
      'Italian Super 130s high-twist wool',
      'Side waist tab adjusters with brass buckles',
      'Interior curtain waistband to keep shirts securely tucked',
      'Unfinished hem with complimentary bespoke tailoring'
    ],
    care: ['Dry clean only'],
    storeAvailability: { gulshan: 12, tejgaon: 10 },
    isBestSeller: true,
    isNewArrival: true,
    isFeatured: true,
  },

  // ─────────────────────────────────────────────────────────
  // 24. FINE SILK FESTIVE PANJABI (Royal Edition)
  // ─────────────────────────────────────────────────────────
  {
    id: 'prod-panjabi-01',
    slug: 'fine-silk-jacquard-panjabi-royal-festive',
    nameEn: 'Fine Silk Jacquard Panjabi (Royal Festive)',
    category: 'panjabi',
    collection: 'festive-heritage',
    gender: 'MEN',
    priceBDT: 14500,
    originalPriceBDT: 16500,
    tag: 'BESTSELLER',
    material: '100% Hand-Woven Silk Jacquard & Jamdani Accents',
    fit: 'Classic Tailored Panjabi Silhouette with Mandarin Collar',
    colors: [
      { id: 'c-pmaroon', name: 'Royal Crimson Maroon', hex: '#681B2A', imageIndex: 0 },
    ],
    sizes: ['38', '40', '42', '44', '46'],
    images: [
      '/images/products/item_maroon.jpg',
      '/images/products/item_hijab.jpg',
      '/images/products/item_yellow.jpg',
    ],
    secondaryImage: '/images/products/item_hijab.jpg',
    inStock: true,
    stockCount: 30,
    rating: 5.0,
    reviewCount: 45,
    reviews: [
      {
        id: 'rev-pj-1',
        author: 'Shoriful I.',
        rating: 5,
        date: '2026-08-12',
        title: 'Stately and traditional elegance',
        comment: 'Rich woven jacquard texture with clean hand-embroidered button loops.',
        verified: true,
      },
    ],
    shortDescription: 'Multi-image photoshoot festive silk jacquard panjabi with intricate weave.',
    description: 'Woven on heritage wooden handlooms in Bangladesh. Blends traditional motifs with modern sartorial tailoring.',
    details: [
      '100% pure silk jacquard weave',
      'Hand-crafted potli button fastenings',
      'Side inseam pockets with interior key loops',
      'Tailored side slits for natural posture'
    ],
    care: ['Dry clean recommended or gentle cold hand wash'],
    storeAvailability: { gulshan: 16, tejgaon: 14 },
    isBestSeller: true,
    isNewArrival: false,
    isFeatured: true,
  },
];

// ─────────────────────────────────────────────────────────
// Query & Filter helper functions
// ─────────────────────────────────────────────────────────
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
      p.category.toLowerCase().includes(q) ||
      p.collection?.toLowerCase().includes(q) ||
      p.shortDescription.toLowerCase().includes(q) ||
      p.material.toLowerCase().includes(q) ||
      p.fit.toLowerCase().includes(q)
  );
}
