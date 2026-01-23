import { MetadataRoute } from 'next';
import { getBaseUrl } from '@/lib/url';

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getBaseUrl();
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/_next/static/', '/_next/image'],
        disallow: ['/api/'],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}

