import { MetadataRoute } from 'next';
import { locales } from '@/i18n';
import { locations } from '@/data/locations';
import { transferRoutes } from '@/data/transfers';
import { hubPages } from '@/data/hubs';
import { buildLocaleUrl } from '@/lib/url';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: MetadataRoute.Sitemap = [];

  // Homepage for each locale
  locales.forEach((locale) => {
    routes.push({
      url: buildLocaleUrl(locale, '/'),
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    });
  });

  // Static pages for each locale
  const staticPages = [
    'vip-transfer',
    'havalimani-transferi',
    'fiyatlar',
    'rezervasyon',
    'iletisim',
    'sss',
  ];

  staticPages.forEach((page) => {
    locales.forEach((locale) => {
      routes.push({
        url: buildLocaleUrl(locale, `/${page}`),
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      });
    });
  });

  // Hub pages (airport hubs, taxi hubs, hotel transfer)
  hubPages.forEach((hub) => {
    locales.forEach((locale) => {
      routes.push({
        url: buildLocaleUrl(locale, `/${hub.slug}`),
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.9, // High priority for hub pages
      });
    });
  });

  // Location pages (local taxi)
  locations.forEach((location) => {
    locales.forEach((locale) => {
      routes.push({
        url: buildLocaleUrl(locale, `/${location.slug}`),
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
      });
    });
  });

  // Transfer route pages
  transferRoutes.forEach((route) => {
    locales.forEach((locale) => {
      routes.push({
        url: buildLocaleUrl(locale, `/transfer/${route.slug}`),
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
      });
    });
  });

  return routes;
}
