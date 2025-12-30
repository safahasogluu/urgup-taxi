import { getTranslations, setRequestLocale } from 'next-intl/server';
import { generateMetadata as genMeta } from '@/lib/seo';
import { generateBreadcrumbSchema } from '@/lib/schema';
import Link from 'next/link';
import { Locale } from '@/i18n';
import { buildLocaleUrl } from '@/lib/url';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'pricing' });
  
  return genMeta({
    locale: locale as Locale,
    title: t('title'),
    description: t('description'),
    path: '/fiyatlar',
  });
}

export default async function PricingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'pricing' });
  const tCommon = await getTranslations({ locale, namespace: 'common' });
  
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildLocaleUrl(locale, '/') },
    { name: t('title'), url: buildLocaleUrl(locale, '/fiyatlar') },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-6">{t('title')}</h1>
        <p className="text-xl text-gray-600 mb-8">{t('description')}</p>

        <div className="bg-white p-8 rounded-lg shadow-md mb-8">
          <p className="text-gray-700 mb-4">
            Our pricing is transparent and competitive. Prices vary based on distance, route, and vehicle type.
          </p>
          <p className="text-gray-700 mb-4">
            For accurate pricing, please call us or use our booking form. We offer special rates for:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
            <li>Airport transfers</li>
            <li>VIP transfers</li>
            <li>Long-distance trips</li>
            <li>Group bookings</li>
          </ul>
          <div className="text-center">
            <a
              href={`tel:${tCommon('phone')}`}
              className="bg-primary-700 text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-800 transition-colors inline-block"
            >
              {tCommon('callNow')} for Pricing
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

