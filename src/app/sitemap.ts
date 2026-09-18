import { MetadataRoute } from 'next';
import { CATALOG_PRODUCTS } from '@/lib/queries/products';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://fuku-official.vercel.app';
  const currentDate = new Date().toISOString();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}`, lastModified: currentDate, changeFrequency: 'daily', priority: 1.0 },
    { url: `${baseUrl}/shop`, lastModified: currentDate, changeFrequency: 'daily', priority: 0.95 },
    { url: `${baseUrl}/men`, lastModified: currentDate, changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/women`, lastModified: currentDate, changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/unisex`, lastModified: currentDate, changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/panjabi`, lastModified: currentDate, changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/accessories`, lastModified: currentDate, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${baseUrl}/new-drop`, lastModified: currentDate, changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/best-sellers`, lastModified: currentDate, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${baseUrl}/sale`, lastModified: currentDate, changeFrequency: 'daily', priority: 0.85 },
    { url: `${baseUrl}/collections`, lastModified: currentDate, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${baseUrl}/about`, lastModified: currentDate, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/contact`, lastModified: currentDate, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${baseUrl}/faq`, lastModified: currentDate, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/store-locator`, lastModified: currentDate, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/shipping`, lastModified: currentDate, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/returns`, lastModified: currentDate, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/return-policy`, lastModified: currentDate, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/terms`, lastModified: currentDate, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/privacy-policy`, lastModified: currentDate, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/delivery-info`, lastModified: currentDate, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/track-order`, lastModified: currentDate, changeFrequency: 'monthly', priority: 0.7 },
  ];

  const productRoutes: MetadataRoute.Sitemap = CATALOG_PRODUCTS.map((product) => ({
    url: `${baseUrl}/product/${product.id}`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  return [...staticRoutes, ...productRoutes];
}
