import { getTranslations, setRequestLocale } from 'next-intl/server';
import { generateMetadata as genMeta } from '@/lib/seo';
import { generateLocalBusinessSchema, generateBreadcrumbSchema } from '@/lib/schema';
import { Locale } from '@/i18n';
import { buildLocaleUrl } from '@/lib/url';

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
  
  const localBusinessSchema = generateLocalBusinessSchema(locale as Locale);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildLocaleUrl(locale, '/') },
    { name: t('title'), url: buildLocaleUrl(locale, '/iletisim') },
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
                <h3 className="text-lg font-semibold mb-2">Phone</h3>
                <a
                  href={`tel:${tCommon('phone')}`}
                  className="text-primary-600 hover:text-primary-700"
                >
                  {tCommon('phone')}
                </a>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">WhatsApp</h3>
                <a
                  href={`https://wa.me/${tCommon('whatsapp').replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-600 hover:text-green-700"
                >
                  {tCommon('whatsapp')}
                </a>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">{t('hoursTitle')}</h3>
                <p className="text-gray-600">{t('hours')}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-6">Map</h2>
            <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">Map placeholder - Embed Google Maps here</p>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              Address: {tCommon('address')}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

