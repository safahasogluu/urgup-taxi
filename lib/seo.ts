import { Metadata } from 'next';
import { Locale, locales } from '@/i18n';
import { buildLocaleUrl, buildUrl } from './url';

// Base URL for OG images
const BASE_URL = 'https://www.urguptaxi.com';

export interface SEOProps {
  locale: Locale;
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
  ogImage?: string;
}

export function generateMetadata({
  locale,
  title,
  description,
  path,
  noindex = false,
  ogImage,
}: SEOProps): Metadata {
  const url = buildLocaleUrl(locale, path);
  const canonical = url;

  // Generate hreflang links
  const alternateLanguages: Record<string, string> = {};
  locales.forEach((loc) => {
    alternateLanguages[loc] = buildLocaleUrl(loc, path);
  });
  alternateLanguages['x-default'] = buildLocaleUrl('tr', path);

  // Default OG image is the hero desktop image (1200x675 - good for social)
  const ogImageUrl = ogImage 
    ? `${BASE_URL}${ogImage}` 
    : `${BASE_URL}/hero/hero-desktop-1200.webp`;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: alternateLanguages,
    },
    robots: {
      index: !noindex,
      follow: !noindex,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: 'Kubilay Ürgüp Taksi',
      locale,
      type: 'website',
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 675,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImageUrl],
    },
  };
}

export function generateHreflangTags(path: string): Array<{ rel: string; hreflang: string; href: string }> {
  const tags: Array<{ rel: string; hreflang: string; href: string }> = locales.map((locale) => ({
    rel: 'alternate',
    hreflang: locale,
    href: buildLocaleUrl(locale, path),
  }));
  
  tags.push({
    rel: 'alternate',
    hreflang: 'x-default',
    href: buildLocaleUrl('tr', path),
  });
  
  return tags;
}

