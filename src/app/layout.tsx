import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'BUNON | Modern Bengal Fashion Commerce',
  description:
    'Future Bengal Industrial — A synthesis of high-fashion minimalism and Bangladeshi textile precision.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-background text-on-background min-h-screen flex flex-col justify-between">
        <Header />
        <main className="pt-[64px] flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
