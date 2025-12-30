import { getTranslations, setRequestLocale } from 'next-intl/server';
import { generateMetadata as genMeta } from '@/lib/seo';
import { generateServiceSchema, generateBreadcrumbSchema } from '@/lib/schema';
import { transferRoutes } from '@/data/transfers';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Locale } from '@/i18n';
import { locales } from '@/i18n';
import { buildLocaleUrl } from '@/lib/url';

export async function generateStaticParams() {
  const params: Array<{ locale: string; slug: string }> = [];
  for (const locale of locales) {
    for (const route of transferRoutes) {
      params.push({ locale, slug: route.slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const route = transferRoutes.find((r) => r.slug === slug);
  
  if (!route) {
    return genMeta({
      locale: locale as Locale,
      title: 'Transfer',
      description: 'Transfer service',
      path: `/transfer/${slug}`,
    });
  }

  return genMeta({
    locale: locale as Locale,
    title: `${route.from[locale as Locale]} → ${route.to[locale as Locale]} Transfer`,
    description: route.description[locale as Locale],
    path: `/transfer/${slug}`,
  });
}

export default async function TransferRoutePage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const route = transferRoutes.find((r) => r.slug === slug);
  const tCommon = await getTranslations({ locale, namespace: 'common' });
  
  if (!route) {
    notFound();
  }

  const serviceSchema = generateServiceSchema(
    `${route.from[locale as Locale]} → ${route.to[locale as Locale]}`,
    route.description[locale as Locale],
    locale as Locale
  );
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildLocaleUrl(locale, '/') },
    { name: 'Airport Transfer', url: buildLocaleUrl(locale, '/havalimani-transferi') },
    { name: `${route.from[locale as Locale]} → ${route.to[locale as Locale]}`, url: buildLocaleUrl(locale, `/transfer/${slug}`) },
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
        <h1 className="text-4xl font-bold mb-6">
          {route.from[locale as Locale]} → {route.to[locale as Locale]}
        </h1>
        <p className="text-xl text-gray-600 mb-8">{route.description[locale as Locale]}</p>

        <div className="bg-white p-8 rounded-lg shadow-md mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Duration</h3>
              <p className="text-gray-600">{route.duration}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Distance</h3>
              <p className="text-gray-600">{route.distance}</p>
            </div>
          </div>
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

