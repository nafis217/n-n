export interface JournalArticle {
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  date: string;
  author: string;
  readTime: string;
  image: string;
}

export const ARTICLES: JournalArticle[] = [
  {
    slug: 'autumn-edit',
    title: 'THE AUTUMN EDIT',
    subtitle: 'A Study in Craft, Proportion and Heavy Raw Fibers',
    excerpt: 'An investigation into how high-twist wools and Japanese shuttle-loom denim respond to cooler atmospheric shifts.',
    date: 'OCTOBER 2026',
    author: 'Atelier Dhaka',
    readTime: '4 MIN READ',
    image: '/images/products/architectural-black-suit-full.jpg',
  },
  {
    slug: 'study-in-proportion',
    title: 'A STUDY IN PROPORTION',
    subtitle: 'The Architectural Geometry of Shoulder to Trouser Break',
    excerpt: 'Why millimeters in lapel roll and rise height define presence and calm authority without stiffness.',
    date: 'SEPTEMBER 2026',
    author: 'Head Tailor',
    readTime: '6 MIN READ',
    image: '/images/products/architectural-black-suit-1.jpg',
  },
  {
    slug: 'art-of-the-trouser',
    title: 'THE ART OF THE TROUSER',
    subtitle: 'Double Pleats, Side Tabs & Fluid Drape',
    excerpt: 'Exploring the historical lineage of Savile Row officer trousers adapted for contemporary architectural movement.',
    date: 'AUGUST 2026',
    author: 'Design Studio',
    readTime: '5 MIN READ',
    image: '/images/products/architectural-black-suit-2.jpg',
  },
  {
    slug: 'fabric-and-form',
    title: 'FABRIC & FORM',
    subtitle: 'The Tactile Dialogue of Natural Textiles',
    excerpt: 'How unbleached khadi canvas, Biella merino wool, and Belgian washed linen age with noble dignity.',
    date: 'JULY 2026',
    author: 'Textile Archivist',
    readTime: '7 MIN READ',
    image: '/images/products/raw-selvedge-trucker-jacket.jpg',
  },
];
