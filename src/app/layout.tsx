import type { Metadata } from 'next';
import './globals.css';
import { AppLayoutClient } from '@/components/layout/AppLayoutClient';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://fukustudio.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'FUKU | Modern Clothing Archive & Atelier 2026',
    template: '%s | FUKU Archive',
  },
  description:
    'Luxury clothing archive & e-commerce for FUKU — Architectural silhouettes, avant-garde minimalism, Japanese technical knits, and handcrafted Bengali heritage textiles.',
  keywords: [
    'FUKU',
    'FUKU Clothing',
    'FUKU Archive',
    'Modern Bengali Fashion',
    'Architectural Clothing',
    'Bangladeshi Streetwear',
    'Luxury Menswear Dhaka',
    'Luxury Womenswear Dhaka',
    'Heritage Jamdani Panjabi',
    'Japanese Technical Knits',
    'Dhaka Designer Brand',
    'Minimalist Fashion Bangladesh',
  ],
  authors: [{ name: 'FUKU Atelier' }],
  creator: 'FUKU Atelier',
  publisher: 'FUKU Studio',
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
    title: 'FUKU | Modern Clothing Archive & Atelier 2026',
    description:
      'Luxury clothing archive & e-commerce for FUKU — Architectural silhouettes and handcrafted Bengali heritage textiles.',
    siteName: 'FUKU Archive',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'FUKU Modern Clothing Archive Campaign',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FUKU | Modern Clothing Archive 2026',
    description:
      'Luxury clothing archive & e-commerce for FUKU — Architectural silhouettes and handcrafted Bengali heritage textiles.',
    images: ['https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=80'],
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
      name: 'FUKU Atelier',
      url: siteUrl,
      logo: `${siteUrl}/logo.png`,
      sameAs: [
        'https://instagram.com/fuku.studio',
        'https://facebook.com/fukustudio',
      ],
      description:
        'Independent fashion house and textile laboratory founded in Dhaka, Bangladesh.',
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
      name: 'FUKU Archive',
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
      <body className="bg-white text-[#111111] min-h-screen flex flex-col justify-between overflow-x-hidden antialiased selection:bg-black selection:text-white">
        <AppLayoutClient>{children}</AppLayoutClient>
      </body>
    </html>
  );
}

