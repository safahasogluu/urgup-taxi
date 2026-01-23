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

  // Urgup Taksi landing page (only TR and EN)
  ['tr', 'en'].forEach((locale) => {
    routes.push({
      url: buildLocaleUrl(locale, '/urgup-taksi'),
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9, // High priority for SEO landing page
    });
  });

  // New TR-only SEO pages for high-intent queries
  const trOnlyPages = [
    'urgup-terminal-taksi',
    'urgup-taksi-duraklari',
    'nevsehir-havalimani-transfer',
    'kayseri-havalimani-transfer',
    'kapadokya-taksi',
    'nevsehir-taksi',
  ];
  
  trOnlyPages.forEach((page) => {
    routes.push({
      url: buildLocaleUrl('tr', `/${page}`),
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8, // High priority for SEO pages
    });
  });
  
  // Note: urgup-taksi-numarasi is redirected to urgup-taksi, so NOT in sitemap

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

  // Filter out noindex pages and ensure canonical URLs only
  // Exclude google-yorum (has noindex: true)
  const filteredRoutes = routes
    .map((route) => {
      const urlObj = new URL(route.url);
      // Ensure URL is canonical (https://www.urguptaxi.com)
      if (urlObj.hostname !== 'www.urguptaxi.com' || urlObj.protocol !== 'https:') {
        urlObj.hostname = 'www.urguptaxi.com';
        urlObj.protocol = 'https:';
        return { ...route, url: urlObj.toString() };
      }
      return route;
    })
    .filter((route) => {
      const path = new URL(route.url).pathname;
      // Exclude google-yorum pages (they have noindex: true)
      return !path.includes('/google-yorum');
    });

  return filteredRoutes;
}
