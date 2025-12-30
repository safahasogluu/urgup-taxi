import { getTranslations, setRequestLocale } from 'next-intl/server';
import { generateMetadata as genMeta } from '@/lib/seo';
import { generateLocalBusinessSchema, generateTaxiServiceSchema, generateBreadcrumbSchema } from '@/lib/schema';
import Link from 'next/link';
import { locales, Locale } from '@/i18n';
import { locations } from '@/data/locations';
import { transferRoutes } from '@/data/transfers';
import { buildLocaleUrl } from '@/lib/url';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'home' });
  
  return genMeta({
    locale: locale as Locale,
    title: t('title'),
    description: t('description'),
    path: '/',
  });
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'home' });
  const tCommon = await getTranslations({ locale, namespace: 'common' });
  const tNav = await getTranslations({ locale, namespace: 'nav' });
  
  const phone = tCommon('phone');
  const whatsapp = tCommon('whatsapp');

  const localBusinessSchema = generateLocalBusinessSchema(locale as Locale);
  const taxiServiceSchema = generateTaxiServiceSchema(locale as Locale);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: t('title'), url: buildLocaleUrl(locale, '/') },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(taxiServiceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Hero Section */}
      <section className="bg-warm-gradient py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-sky-gradient opacity-30"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 leading-tight">
              {t('heroTitle')}
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-10 max-w-2xl mx-auto">
              {t('heroSubtitle')}
            </p>
            
            {/* Primary CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <a
                href={`tel:${phone}`}
                className="bg-primary-700 text-white px-8 py-4 rounded-xl font-semibold hover:bg-primary-800 transition-all shadow-lg hover:shadow-xl text-lg inline-flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {tCommon('callNow')}
              </a>
              <a
                href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-700 text-white px-8 py-4 rounded-xl font-semibold hover:bg-green-800 transition-all shadow-lg hover:shadow-xl text-lg inline-flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                {tCommon('whatsappButton')}
              </a>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span className="font-medium">{tCommon('open247')}</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-medium">Fast Response</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="font-medium">Best Prices</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">{t('servicesTitle')}</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">{t('servicesSubtitle')}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link
              href={`/${locale}/vip-transfer`}
              className="bg-warm-cream p-8 rounded-2xl shadow-md hover:shadow-xl transition-all border border-warm-sandstone/30 hover:border-primary-300"
            >
              <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-7 h-7 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">{tNav('vipTransfer')}</h3>
              <p className="text-gray-600">Luxury vehicles, professional drivers</p>
            </Link>
            
            <Link
              href={`/${locale}/havalimani-transferi`}
              className="bg-warm-cream p-8 rounded-2xl shadow-md hover:shadow-xl transition-all border border-warm-sandstone/30 hover:border-primary-300"
            >
              <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-7 h-7 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">{tNav('airportTransfer')}</h3>
              <p className="text-gray-600">Nevşehir & Kayseri airports</p>
            </Link>

            {transferRoutes.slice(0, 4).map((route) => (
              <Link
                key={route.id}
                href={`/${locale}/transfer/${route.slug}`}
                className="bg-warm-cream p-8 rounded-2xl shadow-md hover:shadow-xl transition-all border border-warm-sandstone/30 hover:border-primary-300"
              >
                <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-7 h-7 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">
                  {route.from[locale as Locale]} → {route.to[locale as Locale]}
                </h3>
                <p className="text-gray-600">{route.description[locale as Locale]}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Airport Transfers Premium Section */}
      <section className="py-16 md:py-20 bg-warm-gradient">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Premium Airport Transfers</h2>
            <p className="text-lg text-gray-600">Direct transfers from Cappadocia airports</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {transferRoutes.map((route) => (
              <Link
                key={route.id}
                href={`/${locale}/transfer/${route.slug}`}
                className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all border-2 border-warm-sandstone/50 hover:border-primary-400"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      {route.from[locale as Locale]} → {route.to[locale as Locale]}
                    </h3>
                    <p className="text-gray-600 text-sm">{route.description[locale as Locale]}</p>
                  </div>
                  <div className="bg-primary-100 rounded-lg p-2">
                    <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7l4-4m0 0l4 4m-4-4v18" />
                    </svg>
                  </div>
                </div>
                <div className="flex gap-4 text-sm text-gray-500 pt-4 border-t border-gray-100">
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {route.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {route.distance}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Locations Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">{tNav('locations')}</h2>
            <p className="text-lg text-gray-600">Serving all major Cappadocia locations</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {locations.map((location) => (
              <Link
                key={location.id}
                href={`/${locale}/${location.slug}`}
                className="bg-warm-cream p-6 rounded-xl shadow-md hover:shadow-lg transition-all border border-warm-sandstone/30 hover:border-primary-300"
              >
                <h3 className="text-xl font-bold mb-2 text-gray-900">{location.name[locale as Locale]}</h3>
                <p className="text-gray-600">{location.description[locale as Locale]}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section className="py-16 md:py-20 bg-warm-gradient">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">{t('whyUsTitle')}</h2>
            <p className="text-lg text-gray-600">{t('whyUsSubtitle')}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center bg-white p-8 rounded-2xl shadow-md">
              <div className="bg-primary-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">Güvenilir</h3>
              <p className="text-gray-600">7/24 güvenilir hizmet</p>
            </div>
            
            <div className="text-center bg-white p-8 rounded-2xl shadow-md">
              <div className="bg-primary-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">Hızlı</h3>
              <p className="text-gray-600">Hızlı ve zamanında hizmet</p>
            </div>
            
            <div className="text-center bg-white p-8 rounded-2xl shadow-md">
              <div className="bg-primary-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">Profesyonel</h3>
              <p className="text-gray-600">Deneyimli ve profesyonel şoförler</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-16 md:py-20 bg-primary-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Book Your Transfer?</h2>
            <p className="text-xl mb-8 text-primary-100">
              {tCommon('address')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`tel:${phone}`}
                className="bg-white text-primary-700 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all shadow-lg text-lg inline-flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {tCommon('callNow')}
              </a>
              <Link
                href={`/${locale}/rezervasyon`}
                className="bg-primary-800 text-white px-8 py-4 rounded-xl font-semibold hover:bg-primary-900 transition-all shadow-lg text-lg inline-flex items-center justify-center gap-2 border-2 border-white/20"
              >
                {tCommon('bookNow')}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
