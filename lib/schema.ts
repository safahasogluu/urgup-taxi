import { Locale } from '@/i18n';
import { getBaseUrl } from './url';

const siteUrl = getBaseUrl();
const phone = '+90 535 548 11 78';
const address = 'İmran Mah., Eski Sanayi Cad. No:14, 50400 Ürgüp/Nevşehir, Türkiye';

export function generateLocalBusinessSchema(locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${siteUrl}/#organization`,
    name: 'Kubilay Ürgüp Taksi',
    alternateName: 'Ürgüp Terminal Taksi',
    image: `${siteUrl}/og-image.jpg`,
    telephone: phone,
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'İmran Mah., Eski Sanayi Cad. No:14',
      addressLocality: 'Ürgüp',
      addressRegion: 'Nevşehir',
      postalCode: '50400',
      addressCountry: 'TR',
    },
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
    areaServed: {
      '@type': 'City',
      name: 'Ürgüp',
    },
    serviceType: 'TaxiService',
    url: siteUrl,
    sameAs: [],
  };
}

export function generateTaxiServiceSchema(locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'TaxiService',
    '@id': `${siteUrl}/#service`,
    provider: {
      '@id': `${siteUrl}/#organization`,
    },
    areaServed: [
      {
        '@type': 'City',
        name: 'Ürgüp',
      },
      {
        '@type': 'City',
        name: 'Göreme',
      },
      {
        '@type': 'City',
        name: 'Uçhisar',
      },
    ],
    availableChannel: {
      '@type': 'ServiceChannel',
      servicePhone: {
        '@type': 'ContactPoint',
        telephone: phone,
        contactType: 'customer service',
        availableLanguage: ['tr', 'en', 'ko', 'ja', 'zh'],
      },
    },
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
      '@id': `${siteUrl}/#organization`,
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

