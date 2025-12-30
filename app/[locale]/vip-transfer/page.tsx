import { getTranslations, setRequestLocale } from 'next-intl/server';
import { generateMetadata as genMeta } from '@/lib/seo';
import { generateServiceSchema, generateBreadcrumbSchema } from '@/lib/schema';
import Link from 'next/link';
import { Locale } from '@/i18n';
import { buildLocaleUrl } from '@/lib/url';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'vipTransfer' });
  
  return genMeta({
    locale: locale as Locale,
    title: t('title'),
    description: t('description'),
    path: '/vip-transfer',
  });
}

export default async function VIPTransferPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'vipTransfer' });
  const tCommon = await getTranslations({ locale, namespace: 'common' });
  
  const serviceSchema = generateServiceSchema(t('title'), t('description'), locale as Locale);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildLocaleUrl(locale, '/') },
    { name: t('title'), url: buildLocaleUrl(locale, '/vip-transfer') },
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Luxury Vehicles</h2>
            <p className="text-gray-600">Premium comfort and style for your journey.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Professional Drivers</h2>
            <p className="text-gray-600">Experienced and courteous drivers.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">24/7 Service</h2>
            <p className="text-gray-600">Available around the clock.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Flexible Booking</h2>
            <p className="text-gray-600">Book in advance or on-demand.</p>
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

