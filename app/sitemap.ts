import { MetadataRoute } from 'next';
import { locales } from '@/i18n';
import { locations } from '@/data/locations';
import { transferRoutes } from '@/data/transfers';
import { hubPages } from '@/data/hubs';
import { buildLocaleUrl } from '@/lib/url';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: MetadataRoute.Sitemap = [];
  const seenUrls = new Set<string>(); // Track unique URLs to prevent duplicates

  // TR-only pages (these pages return notFound() for non-TR locales)
  const trOnlyPages = [
    'urgup-terminal-taksi',
    'urgup-taksi-duraklari',
    'nevsehir-havalimani-transfer',
    'kayseri-havalimani-transfer',
    'kapadokya-taksi',
    'nevsehir-taksi',
  ];

  // Redirect-only URLs (these should NOT be in sitemap)
  const redirectOnlyUrls = new Set<string>();
  locales.forEach((locale) => {
    redirectOnlyUrls.add(buildLocaleUrl(locale, '/urgup-taksi-numarasi'));
  });

  // Helper function to add route if not duplicate and not a redirect
  const addRoute = (url: string, lastModified: Date, changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never', priority: number) => {
    // Normalize URL to canonical form
    const urlObj = new URL(url);
    if (urlObj.hostname !== 'www.urguptaxi.com' || urlObj.protocol !== 'https:') {
      urlObj.hostname = 'www.urguptaxi.com';
      urlObj.protocol = 'https:';
    }
    const canonicalUrl = urlObj.toString();
    
    // Skip redirect-only URLs
    if (redirectOnlyUrls.has(canonicalUrl)) {
      return;
    }
    
    // Skip if already seen (duplicate)
    if (seenUrls.has(canonicalUrl)) {
      return;
    }
    
    seenUrls.add(canonicalUrl);
    routes.push({
      url: canonicalUrl,
      lastModified,
      changeFrequency,
      priority,
    });
  };

  // Homepage for each locale
  locales.forEach((locale) => {
    addRoute(buildLocaleUrl(locale, '/'), new Date(), 'daily', 1);
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
      addRoute(buildLocaleUrl(locale, `/${page}`), new Date(), 'weekly', 0.8);
    });
  });

  // Urgup Taksi landing page (only TR and EN)
  ['tr', 'en'].forEach((locale) => {
    addRoute(buildLocaleUrl(locale, '/urgup-taksi'), new Date(), 'weekly', 0.9);
  });

  // TR-only SEO pages (only /tr variant)
  trOnlyPages.forEach((page) => {
    addRoute(buildLocaleUrl('tr', `/${page}`), new Date(), 'weekly', 0.8);
  });
  
  // Note: urgup-taksi-numarasi is redirected to urgup-taksi, so NOT in sitemap

  // Hub pages (airport hubs, taxi hubs, hotel transfer)
  hubPages.forEach((hub) => {
    locales.forEach((locale) => {
      addRoute(buildLocaleUrl(locale, `/${hub.slug}`), new Date(), 'weekly', 0.9);
    });
  });

  // Location pages (local taxi)
  // Exclude 'urgup-taksi' from locations since it's already added above (TR+EN only)
  locations.forEach((location) => {
    // Skip urgup-taksi if it exists in locations (already handled above)
    if (location.slug === 'urgup-taksi') {
      return; // Skip to avoid duplicate
    }
    
    locales.forEach((locale) => {
      addRoute(buildLocaleUrl(locale, `/${location.slug}`), new Date(), 'weekly', 0.7);
    });
  });

  // Transfer route pages
  transferRoutes.forEach((route) => {
    locales.forEach((locale) => {
      addRoute(buildLocaleUrl(locale, `/transfer/${route.slug}`), new Date(), 'weekly', 0.7);
    });
  });

  // Final filter: exclude google-yorum pages (they have noindex: true)
  const filteredRoutes = routes.filter((route) => {
    const path = new URL(route.url).pathname;
    return !path.includes('/google-yorum');
  });

  return filteredRoutes;
}
