import { getTranslations, setRequestLocale } from 'next-intl/server';
import { generateMetadata as genMeta } from '@/lib/seo';
import { generateLocalBusinessSchema, generateTaxiServiceSchema, generateBreadcrumbSchema } from '@/lib/schema';
import Link from 'next/link';
import { Locale } from '@/i18n';
import { locations } from '@/data/locations';
import { transferRoutes } from '@/data/transfers';
import { buildLocaleUrl } from '@/lib/url';
import HeroSection from '@/components/HeroSection';
import WhatsAppQuickCTA from '@/components/WhatsAppQuickCTA';
import CallCTAButton from '@/components/CallCTAButton';

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

      {/* Hero Section with Cappadocia Image */}
      <HeroSection
        title={t('heroTitle')}
        subtitle={t('heroSubtitle')}
        imageAlt={t('heroImageAlt')}
      >
        {/* Primary CTAs - Premium styling */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mb-8 md:mb-10">
          {/* Bronze/Copper "Hemen Ara" button */}
          <CallCTAButton
            phone={phone}
            className="btn-primary px-8 py-4 text-lg"
            ctaLocation="hero"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            {tCommon('callNow')}
          </CallCTAButton>
          {/* Premium WhatsApp button */}
          <WhatsAppQuickCTA type="general" className="btn-whatsapp px-8 py-4 text-lg" />
        </div>

        {/* Trust Badges - premium glass pills */}
        <div className="flex flex-wrap justify-center md:justify-start gap-3 md:gap-4 text-sm">
          <div className="trust-chip">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span>{tCommon('open247')}</span>
          </div>
          <div className="trust-chip">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{t('trustFastResponse')}</span>
          </div>
          <div className="trust-chip">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span>{t('trustBestPrices')}</span>
          </div>
        </div>
      </HeroSection>

      {/* Ürgüp Taksi Section - TR Only */}
      {locale === 'tr' && (
        <section className="py-8 md:py-10 border-b border-zinc-200/50 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-display text-2xl md:text-3xl mb-4 text-zinc-900 text-center">
                Ürgüp Taksi – 7/24 Hızlı Ulaşım
              </h2>
              <ul className="space-y-2 mb-6 text-zinc-700 text-center max-w-2xl mx-auto">
                <li className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5 text-amber-700 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Ürgüp, Göreme, Uçhisar bölgesinde 7/24 profesyonel taksi hizmeti</span>
                </li>
                <li className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5 text-amber-700 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Nevşehir NAV ve Kayseri ASR havalimanı transferleri – sabit fiyat garantisi</span>
                </li>
                <li className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5 text-amber-700 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>WhatsApp ile anında rezervasyon – hızlı yanıt garantisi</span>
                </li>
              </ul>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <CallCTAButton
                  phone={phone}
                  className="btn-primary px-6 py-3 text-base"
                  ctaLocation="hero"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {tCommon('callNow')}
                </CallCTAButton>
                <WhatsAppQuickCTA type="general" className="btn-whatsapp px-6 py-3 text-base" />
                <Link
                  href={`/${locale}/fiyatlar`}
                  className="px-6 py-3 bg-white border-2 border-amber-700 text-amber-700 rounded-xl font-semibold hover:bg-amber-50 transition-all text-base inline-flex items-center justify-center gap-2"
                >
                  Fiyat Al
                </Link>
              </div>
              <div className="text-center mt-4">
                <div className="flex flex-wrap justify-center gap-3">
                  <Link
                    href={`/${locale}/urgup-taksi`}
                    className="text-amber-700 hover:text-amber-800 font-semibold inline-flex items-center gap-1 transition-colors"
                  >
                    <span>Ürgüp Taksi</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                  <span className="text-zinc-400">•</span>
                  <Link
                    href={`/${locale}/urgup-terminal-taksi`}
                    className="text-amber-700 hover:text-amber-800 font-medium inline-flex items-center gap-1 transition-colors"
                  >
                    Terminal Taksi
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
      
      {/* Kapadokya & Nevşehir Taksi Section - TR Only */}
      {locale === 'tr' && (
        <section className="py-8 md:py-10 border-b border-zinc-200/50 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-display text-2xl md:text-3xl mb-6 text-zinc-900 text-center">
                Kapadokya & Nevşehir Taksi Hizmetleri
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Link
                  href="/tr/kapadokya-taksi"
                  className="p-6 bg-amber-50 rounded-xl border-2 border-amber-200 hover:border-amber-300 transition-all"
                >
                  <h3 className="font-display text-xl mb-2 text-zinc-900">Kapadokya Taksi</h3>
                  <p className="text-zinc-600 text-sm mb-4">Ürgüp, Göreme, Uçhisar, Avanos ve tüm Kapadokya bölgesinde 7/24 taksi hizmeti.</p>
                  <span className="text-amber-700 font-semibold inline-flex items-center gap-1">
                    Detaylar
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </Link>
                <Link
                  href="/tr/nevsehir-taksi"
                  className="p-6 bg-amber-50 rounded-xl border-2 border-amber-200 hover:border-amber-300 transition-all"
                >
                  <h3 className="font-display text-xl mb-2 text-zinc-900">Nevşehir Taksi</h3>
                  <p className="text-zinc-600 text-sm mb-4">Nevşehir ve Kapadokya bölgesinde 7/24 taksi hizmeti. Ürgüp, Göreme, Uçhisar transferleri.</p>
                  <span className="text-amber-700 font-semibold inline-flex items-center gap-1">
                    Detaylar
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}
      
      {/* Ürgüp Taksi Quick Link - EN Only */}
      {locale === 'en' && (
        <section className="py-4 border-b border-zinc-200/50 bg-white/50">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <Link
                href={`/${locale}/urgup-taksi`}
                className="text-sm font-semibold text-amber-700 hover:text-amber-800 transition-colors inline-flex items-center gap-1"
              >
                <span>Ürgüp Taksi</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Service Regions Quick Links */}
      <section className="py-8 md:py-10 border-b border-zinc-200/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-2 md:gap-3">
            {locations.slice(0, 6).map((location) => (
              <Link
                key={location.id}
                href={`/${locale}/${location.slug}`}
                className="px-4 py-2 text-sm font-medium text-zinc-700 bg-white/80 hover:bg-white border border-zinc-200/60 rounded-full transition-all hover:border-zinc-300 hover:shadow-sm"
              >
                {location.name[locale as Locale]}
              </Link>
            ))}
            <Link
              href={`/${locale}/havalimani-transferi`}
              className="px-4 py-2 text-sm font-medium text-amber-800 bg-amber-50/80 hover:bg-amber-50 border border-amber-200/60 rounded-full transition-all hover:border-amber-300 hover:shadow-sm"
            >
              ✈️ {tNav('airportTransfer')}
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section - Premium light background */}
      <section className="section-padding section-premium-light relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h2 className="font-display mb-4 text-zinc-900">{t('servicesTitle')}</h2>
            <p className="text-lg text-zinc-600 max-w-2xl mx-auto">{t('servicesSubtitle')}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link
              href={`/${locale}/vip-transfer`}
              className="card-premium p-8"
            >
              <div className="w-14 h-14 bg-amber-100 rounded-2xl flex items-center justify-center mb-4">
                <svg className="w-7 h-7 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="font-display text-xl mb-2 text-zinc-900">{tNav('vipTransfer')}</h3>
              <p className="text-zinc-600">{t('vipCardDescription')}</p>
            </Link>
            
            <Link
              href={`/${locale}/havalimani-transferi`}
              className="card-premium p-8"
            >
              <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center mb-4">
                <svg className="w-7 h-7 text-emerald-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </div>
              <h3 className="font-display text-xl mb-2 text-zinc-900">{tNav('airportTransfer')}</h3>
              <p className="text-zinc-600">{t('airportCardDescription')}</p>
            </Link>

            {transferRoutes.slice(0, 4).map((route) => (
              <Link
                key={route.id}
                href={`/${locale}/transfer/${route.slug}`}
                className="card-premium p-8"
              >
                <div className="w-14 h-14 bg-sky-100 rounded-2xl flex items-center justify-center mb-4">
                  <svg className="w-7 h-7 text-sky-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="font-display text-xl mb-2 text-zinc-900">
                  {route.from[locale as Locale]} → {route.to[locale as Locale]}
                </h3>
                <p className="text-zinc-600">{route.description[locale as Locale]}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Airport Transfers Premium Section */}
      <section className="section-padding section-premium-warm relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h2 className="font-display mb-4 text-zinc-900">{t('premiumTitle')}</h2>
            <p className="text-lg text-zinc-600">{t('premiumSubtitle')}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {transferRoutes.map((route) => (
              <Link
                key={route.id}
                href={`/${locale}/transfer/${route.slug}`}
                className="card-premium p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-display text-xl text-zinc-900 mb-1">
                      {route.from[locale as Locale]} → {route.to[locale as Locale]}
                    </h3>
                    <p className="text-zinc-600 text-sm">{route.description[locale as Locale]}</p>
                  </div>
                  <div className="bg-amber-100 rounded-xl p-2 flex-shrink-0">
                    <svg className="w-6 h-6 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7l4-4m0 0l4 4m-4-4v18" />
                    </svg>
                  </div>
                </div>
                <div className="flex gap-4 text-sm text-zinc-500 pt-4 border-t border-zinc-200/60">
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {route.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
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
      <section className="section-padding section-premium-light relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h2 className="font-display mb-4 text-zinc-900">{tNav('locations')}</h2>
            <p className="text-lg text-zinc-600">{t('locationsSubtitle')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {locations.map((location) => (
              <Link
                key={location.id}
                href={`/${locale}/${location.slug}`}
                className="card-premium p-6"
              >
                <h3 className="font-display text-xl mb-2 text-zinc-900">{location.name[locale as Locale]}</h3>
                <p className="text-zinc-600">{location.description[locale as Locale]}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section className="section-padding section-premium-warm relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h2 className="font-display mb-4 text-zinc-900">{t('whyUsTitle')}</h2>
            <p className="text-lg text-zinc-600">{t('whyUsSubtitle')}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center card-premium p-8">
              <div className="bg-emerald-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-emerald-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="font-display text-xl mb-2 text-zinc-900">{t('whyReliable')}</h3>
              <p className="text-zinc-600">{t('whyReliableDesc')}</p>
            </div>
            
            <div className="text-center card-premium p-8">
              <div className="bg-amber-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-display text-xl mb-2 text-zinc-900">{t('whyFast')}</h3>
              <p className="text-zinc-600">{t('whyFastDesc')}</p>
            </div>
            
            <div className="text-center card-premium p-8">
              <div className="bg-sky-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-sky-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-display text-xl mb-2 text-zinc-900">{t('whyProfessional')}</h3>
              <p className="text-zinc-600">{t('whyProfessionalDesc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA Section - Premium gradient */}
      <section 
        className="section-padding text-white relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #92400e 0%, #b45309 30%, #d97706 70%, #b45309 100%)',
        }}
      >
        {/* Subtle pattern overlay */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
          aria-hidden="true"
        />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display mb-4 text-white">{t('contactCtaTitle')}</h2>
            <p className="text-xl mb-8 text-amber-100">
              {tCommon('address')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <CallCTAButton
                phone={phone}
                className="bg-white text-amber-800 px-8 py-4 rounded-xl font-semibold hover:bg-amber-50 transition-all shadow-lg text-lg inline-flex items-center justify-center gap-2"
                ctaLocation="hero"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {tCommon('callNow')}
              </CallCTAButton>
              <Link
                href={`/${locale}/rezervasyon`}
                className="bg-amber-900/50 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-semibold hover:bg-amber-900/70 transition-all shadow-lg text-lg inline-flex items-center justify-center gap-2 border border-white/20"
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
