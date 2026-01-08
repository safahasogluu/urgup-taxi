import { Locale } from '@/i18n';
import { getBaseUrl } from './url';

const siteUrl = getBaseUrl();
const telephone = '+90 535 548 11 78';

const postalAddress = {
  '@type': 'PostalAddress',
  streetAddress: 'İmran Mah., Eski Sanayi Cad. No:14',
  addressLocality: 'Ürgüp',
  addressRegion: 'Nevşehir',
  postalCode: '50400',
  addressCountry: 'TR',
};

const primaryAreaServed = {
  '@type': 'City',
  name: 'Ürgüp',
};

const serviceAreas = [
  primaryAreaServed,
  {
    '@type': 'City',
    name: 'Göreme',
  },
  {
    '@type': 'City',
    name: 'Uçhisar',
  },
];

const localBusinessId = `${siteUrl}/#organization`;
const taxiServiceId = `${siteUrl}/#service`;
const gbpProfileUrl = process.env.NEXT_PUBLIC_GBP_PROFILE_URL?.trim();
const googleMapsUrl = process.env.NEXT_PUBLIC_GMAPS_URL?.trim();

export function generateLocalBusinessSchema(locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': localBusinessId,
    name: 'Göreme Taksi',
    alternateName: 'Ürgüp Taksi & Kapadokya Transfer',
    image: `${siteUrl}/og-image.jpg`,
    url: siteUrl,
    telephone,
    priceRange: '$$',
    address: postalAddress,
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '38.6292',
      longitude: '34.8317',
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
      opens: '00:00',
      closes: '23:59',
    },
    areaServed: primaryAreaServed,
    serviceType: 'TaxiService',
    ...(gbpProfileUrl ? { sameAs: [gbpProfileUrl] } : {}),
    ...(googleMapsUrl ? { hasMap: googleMapsUrl } : {}),
  };
}

export function generateTaxiServiceSchema(locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'TaxiService',
    '@id': taxiServiceId,
    url: siteUrl,
    telephone,
    address: postalAddress,
    areaServed: serviceAreas,
    provider: {
      '@id': localBusinessId,
    },
    availableChannel: {
      '@type': 'ServiceChannel',
      servicePhone: {
        '@type': 'ContactPoint',
        telephone,
        contactType: 'customer service',
        availableLanguage: ['tr', 'en', 'ko', 'ja', 'zh'],
      },
    },
    ...(gbpProfileUrl ? { sameAs: [gbpProfileUrl] } : {}),
    ...(googleMapsUrl ? { hasMap: googleMapsUrl } : {}),
  };
}

export function generateServiceSchema(
  name: string,
  description: string,
  locale: Locale
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    provider: {
      '@id': localBusinessId,
    },
    areaServed: {
      '@type': 'City',
      name: 'Cappadocia',
    },
  };
}

export function generateFAQPageSchema(
  faqs: Array<{ question: string; answer: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function generateBreadcrumbSchema(
  items: Array<{ name: string; url: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

