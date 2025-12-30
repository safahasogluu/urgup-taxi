import { MetadataRoute } from 'next';
import { getBaseUrl } from '@/lib/url';

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getBaseUrl();
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/_next/'],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}

