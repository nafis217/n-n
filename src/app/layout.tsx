import type { Metadata } from 'next';
import './globals.css';
import { AppLayoutClient } from '@/components/layout/AppLayoutClient';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://stitchhouse.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'STITCH HOUSE | Architectural Tailoring & Quiet Luxury Menswear',
    template: '%s | STITCH HOUSE',
  },
  description:
    'Quietly Refined. Distinctly Yours. STITCH HOUSE operates at the intersection of heritage craftsmanship, architectural tailoring, and old-money restraint.',
  keywords: [
    'STITCH HOUSE',
    'Quiet Luxury Menswear',
    'Architectural Tailoring',
    'Bespoke Suits Dhaka',
    'Old Money Aesthetic',
    'Pleated Trousers',
    'Raw Selvedge Denim',
    'High Twist Wool Blazer',
    'Luxury Menswear Brand',
  ],
  authors: [{ name: 'STITCH HOUSE Atelier' }],
  creator: 'STITCH HOUSE Atelier',
  publisher: 'STITCH HOUSE Maison',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    title: 'STITCH HOUSE | Architectural Tailoring & Quiet Luxury Menswear',
    description:
      'Quietly Refined. Distinctly Yours. Independent menswear house designed with architectural restraint, natural fibers, and bespoke tailoring craftsmanship.',
    siteName: 'STITCH HOUSE',
    images: [
      {
        url: '/images/products/architectural-black-suit-full.jpg',
        width: 1200,
        height: 630,
        alt: 'STITCH HOUSE Autumn Winter Tailoring Campaign',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'STITCH HOUSE | Quietly Refined. Distinctly Yours.',
    description:
      'Independent modern menswear house — architectural silhouettes, considered materials, and refined tailoring.',
    images: ['/images/products/architectural-black-suit-full.jpg'],
  },
  alternates: {
    canonical: siteUrl,
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${siteUrl}/#organization`,
      name: 'STITCH HOUSE',
      url: siteUrl,
      logo: `${siteUrl}/logo.png`,
      sameAs: [
        'https://instagram.com/stitchhouse.official',
      ],
      description:
        'Independent modern tailoring house and menswear atelier.',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Dhaka',
        addressCountry: 'BD',
      },
    },
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
      name: 'STITCH HOUSE',
      publisher: { '@id': `${siteUrl}/#organization` },
      potentialAction: {
        '@type': 'SearchAction',
        target: `${siteUrl}/search?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-[#F2EDE4] text-[#241E1A] min-h-screen flex flex-col justify-between overflow-x-hidden antialiased selection:bg-[#241E1A] selection:text-[#F2EDE4]">
        <AppLayoutClient>{children}</AppLayoutClient>
      </body>
    </html>
  );
}

