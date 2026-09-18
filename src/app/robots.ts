import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://fuku-official.vercel.app';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/', '/account/', '/pos/', '/checkout'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
