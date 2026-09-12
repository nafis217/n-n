import type { Metadata } from 'next';
import './globals.css';
import { AppLayoutClient } from '@/components/layout/AppLayoutClient';

export const metadata: Metadata = {
  title: 'FUKU | Modern Clothing Archive 2026',
  description:
    'Luxury clothing archive & e-commerce for FUKU — Architectural silhouettes and modern Bengali textiles.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-white text-[#111111] min-h-screen flex flex-col justify-between overflow-x-hidden antialiased selection:bg-black selection:text-white">
        <AppLayoutClient>{children}</AppLayoutClient>
      </body>
    </html>
  );
}
