import { getTranslations, setRequestLocale } from 'next-intl/server';
import { generateMetadata as genMeta } from '@/lib/seo';
import { generateLocalBusinessSchema, generateBreadcrumbSchema } from '@/lib/schema';
import { Locale } from '@/i18n';
import { buildLocaleUrl } from '@/lib/url';
import CallCTAButton from '@/components/CallCTAButton';
import WhatsAppLinkButton from '@/components/WhatsAppLinkButton';
import Link from 'next/link';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'contact' });
  
  return genMeta({
    locale: locale as Locale,
    title: t('title'),
    description: t('description'),
    path: '/iletisim',
  });
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'contact' });
  const tCommon = await getTranslations({ locale, namespace: 'common' });
  const tNav = await getTranslations({ locale, namespace: 'nav' });
  
  const localBusinessSchema = generateLocalBusinessSchema(locale as Locale);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: tCommon('home'), url: buildLocaleUrl(locale, '/') },
    { name: tNav('contact'), url: buildLocaleUrl(locale, '/iletisim') },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-6">{t('title')}</h1>
        <p className="text-xl text-gray-600 mb-8">{t('description')}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-6">{t('getInTouch')}</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">{t('addressTitle')}</h3>
                <p className="text-gray-600">{tCommon('address')}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">{t('phoneLabel')}</h3>
                <CallCTAButton
                  phone={tCommon('phone')}
                  className="text-primary-600 hover:text-primary-700"
                  ctaLocation="hero"
                >
                  {tCommon('phone')}
                </CallCTAButton>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">{t('whatsappLabel')}</h3>
                <WhatsAppLinkButton
                  href={`https://wa.me/${tCommon('whatsapp').replace(/[^0-9]/g, '')}`}
                  className="text-green-600 hover:text-green-700"
                  ctaLocation="hero"
                >
                  {tCommon('whatsapp')}
                </WhatsAppLinkButton>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">{t('hoursTitle')}</h3>
                <p className="text-gray-600">{t('hours')}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-6">{t('mapTitle')}</h2>
            <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">{t('mapPlaceholder')}</p>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              {tCommon('addressLabel')}: {tCommon('address')}
            </p>
          </div>
        </div>
        
        {/* E-E-A-T Trust Module - TR Only */}
        {locale === 'tr' && (
          <div className="bg-amber-50 p-8 rounded-lg shadow-md mt-8 border border-amber-200">
            <h2 className="text-2xl font-semibold mb-6 text-center">{t('trustModuleTitle')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold mb-2 text-lg">{t('trustModule247')}</h3>
                <p className="text-gray-600 text-sm">{t('trustModule247Desc')}</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold mb-2 text-lg">{t('trustModuleWhatsApp')}</h3>
                <p className="text-gray-600 text-sm">{t('trustModuleWhatsAppDesc')}</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold mb-2 text-lg">{t('trustModulePickup')}</h3>
                <p className="text-gray-600 text-sm">{t('trustModulePickupDesc')}</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold mb-2 text-lg">{t('trustModulePayment')}</h3>
                <p className="text-gray-600 text-sm">{t('trustModulePaymentDesc')}</p>
              </div>
            </div>
          </div>
        )}

        {/* Internal Links - TR Only */}
        {locale === 'tr' && (
          <div className="bg-white p-8 rounded-lg shadow-md mt-8">
            <h2 className="text-2xl font-semibold mb-4">İlgili Hizmetler</h2>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/tr/urgup-taksi"
                className="px-4 py-2 bg-amber-50 text-amber-800 rounded-lg hover:bg-amber-100 transition-colors font-medium"
              >
                Ürgüp Taksi
              </Link>
              <Link
                href="/tr/urgup-taksi"
                className="px-4 py-2 bg-amber-50 text-amber-800 rounded-lg hover:bg-amber-100 transition-colors font-medium"
              >
                Ürgüp Taksi
              </Link>
              <Link
                href="/tr/fiyatlar"
                className="px-4 py-2 bg-amber-50 text-amber-800 rounded-lg hover:bg-amber-100 transition-colors font-medium"
              >
                Fiyatlar
              </Link>
              <Link
                href="/tr/nevsehir-havalimani-transfer"
                className="px-4 py-2 bg-amber-50 text-amber-800 rounded-lg hover:bg-amber-100 transition-colors font-medium"
              >
                Nevşehir Havalimanı Transfer
              </Link>
              <Link
                href="/tr/kayseri-havalimani-transfer"
                className="px-4 py-2 bg-amber-50 text-amber-800 rounded-lg hover:bg-amber-100 transition-colors font-medium"
              >
                Kayseri Havalimanı Transfer
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
