import { getTranslations, setRequestLocale } from 'next-intl/server';
import { generateMetadata as genMeta } from '@/lib/seo';
import { generateBreadcrumbSchema } from '@/lib/schema';
import { Locale } from '@/i18n';
import { buildLocaleUrl } from '@/lib/url';
import CallCTAButton from '@/components/CallCTAButton';

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
  const tNav = await getTranslations({ locale, namespace: 'nav' });
  
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: tCommon('home'), url: buildLocaleUrl(locale, '/') },
    { name: tNav('pricing'), url: buildLocaleUrl(locale, '/fiyatlar') },
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
            {t('intro')}
          </p>
          <p className="text-gray-700 mb-4">
            {t('callForPricing')}
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
            <li>{t('airportTransfers')}</li>
            <li>{t('vipTransfers')}</li>
            <li>{t('longDistance')}</li>
            <li>{t('groupBookings')}</li>
          </ul>
          <div className="text-center">
            <CallCTAButton
              phone={tCommon('phone')}
              className="bg-primary-700 text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-800 transition-colors inline-block"
              ctaLocation="hero"
            >
              {t('callForPricingButton')}
            </CallCTAButton>
          </div>
        </div>
      </div>
    </>
  );
}
