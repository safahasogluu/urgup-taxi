import { getTranslations, setRequestLocale } from 'next-intl/server';
import { generateMetadata as genMeta } from '@/lib/seo';
import { generateServiceSchema, generateBreadcrumbSchema } from '@/lib/schema';
import Link from 'next/link';
import { transferRoutes } from '@/data/transfers';
import { Locale } from '@/i18n';
import { buildLocaleUrl } from '@/lib/url';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'airportTransfer' });
  
  return genMeta({
    locale: locale as Locale,
    title: t('title'),
    description: t('description'),
    path: '/havalimani-transferi',
  });
}

export default async function AirportTransferPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'airportTransfer' });
  const tCommon = await getTranslations({ locale, namespace: 'common' });
  
  const serviceSchema = generateServiceSchema(t('title'), t('description'), locale as Locale);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildLocaleUrl(locale, '/') },
    { name: t('title'), url: buildLocaleUrl(locale, '/havalimani-transferi') },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-6">{t('title')}</h1>
        <p className="text-xl text-gray-600 mb-8">{t('description')}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {transferRoutes.map((route) => (
            <Link
              key={route.id}
              href={`/${locale}/transfer/${route.slug}`}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <h2 className="text-2xl font-semibold mb-2">
                {route.from[locale as Locale]} → {route.to[locale as Locale]}
              </h2>
              <p className="text-gray-600 mb-4">{route.description[locale as Locale]}</p>
              <div className="flex gap-4 text-sm text-gray-500">
                <span>⏱ {route.duration}</span>
                <span>📍 {route.distance}</span>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link
            href={`/${locale}/rezervasyon`}
            className="bg-primary-700 text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-800 transition-colors inline-block mr-4"
          >
            {tCommon('bookNow')}
          </Link>
          <a
            href={`tel:${tCommon('phone')}`}
            className="bg-green-700 text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-800 transition-colors inline-block"
          >
            {tCommon('callNow')}
          </a>
        </div>
      </div>
    </>
  );
}

