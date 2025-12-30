import { getTranslations, setRequestLocale } from 'next-intl/server';
import { generateMetadata as genMeta } from '@/lib/seo';
import { generateServiceSchema, generateBreadcrumbSchema, generateFAQPageSchema } from '@/lib/schema';
import Link from 'next/link';
import { toNavRoutes, toAsrRoutes } from '@/data/transfers';
import { Locale } from '@/i18n';
import { buildLocaleUrl } from '@/lib/url';
import FAQAccordion from '@/components/FAQAccordion';
import WhatsAppCTA from '@/components/WhatsAppCTA';

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
  const tNav = await getTranslations({ locale, namespace: 'nav' });
  
  const serviceSchema = generateServiceSchema(t('title'), t('description'), locale as Locale);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: tCommon('home'), url: buildLocaleUrl(locale, '/') },
    { name: tNav('airportTransfer'), url: buildLocaleUrl(locale, '/havalimani-transferi') },
  ]);
  
  // FAQ Schema
  const faqs = [
    { question: t('faq1Q'), answer: t('faq1A') },
    { question: t('faq2Q'), answer: t('faq2A') },
    { question: t('faq3Q'), answer: t('faq3A') },
    { question: t('faq4Q'), answer: t('faq4A') },
    { question: t('faq5Q'), answer: t('faq5A') },
  ];
  const faqSchema = generateFAQPageSchema(faqs);

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero Section */}
      <section className="bg-hero-gradient section-padding">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-display text-4xl md:text-5xl mb-6 text-basalt-900">
              {t('heroTitle')}
            </h1>
            <p className="text-xl text-basalt-600 mb-8 max-w-3xl mx-auto">
              {t('heroSubtitle')}
            </p>
            
            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`tel:${tCommon('phone')}`}
                className="btn-primary px-8 py-4 text-lg"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {tCommon('callNow')}
              </a>
              <WhatsAppCTA 
                routeFrom="Ürgüp / Göreme" 
                routeTo="ASR / NAV" 
                routeType="airport"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-3xl text-center mb-8 text-basalt-900">{t('whyChooseTitle')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="card-premium p-6 text-center">
                <div className="bg-sage-100 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-sage-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-basalt-700 font-medium">{t(`whyChoose${i}`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NAV Routes */}
      <section className="section-padding bg-sand-200">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl mb-2 text-basalt-900">{t('toNavTitle')}</h2>
            <p className="text-basalt-600">{t('toNavSubtitle')}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {toNavRoutes.map((route) => (
              <Link
                key={route.id}
                href={`/${locale}/transfer/${route.slug}`}
                className="card-premium p-6 group"
              >
                <h3 className="font-display text-xl mb-2 text-basalt-900 group-hover:text-primary-700 transition-colors">
                  {route.from[locale as Locale]} → {route.to[locale as Locale]}
                </h3>
                <p className="text-basalt-600 text-sm mb-4">{route.description[locale as Locale]}</p>
                <div className="flex gap-4 text-sm text-basalt-500">
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

      {/* ASR Routes */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl mb-2 text-basalt-900">{t('toAsrTitle')}</h2>
            <p className="text-basalt-600">{t('toAsrSubtitle')}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {toAsrRoutes.map((route) => (
              <Link
                key={route.id}
                href={`/${locale}/transfer/${route.slug}`}
                className="card-premium p-6 group"
              >
                <h3 className="font-display text-xl mb-2 text-basalt-900 group-hover:text-primary-700 transition-colors">
                  {route.from[locale as Locale]} → {route.to[locale as Locale]}
                </h3>
                <p className="text-basalt-600 text-sm mb-4">{route.description[locale as Locale]}</p>
                <div className="flex gap-4 text-sm text-basalt-500">
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

      {/* FAQ Section */}
      <section className="section-padding bg-sand-200">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display text-3xl mb-8 text-center text-basalt-900">{t('faqTitle')}</h2>
            <FAQAccordion faqs={faqs} />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-terracotta-gradient text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl mb-4 text-white">{t('heroTitle')}</h2>
            <p className="text-xl mb-8 text-terracotta-100">{t('heroSubtitle')}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`tel:${tCommon('phone')}`}
                className="bg-white text-terracotta-700 px-8 py-4 rounded-xl font-semibold hover:bg-sand-100 transition-all shadow-lg text-lg inline-flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {tCommon('callNow')}
              </a>
              <WhatsAppCTA 
                routeFrom="Ürgüp / Göreme" 
                routeTo="ASR / NAV" 
                routeType="airport"
                className="bg-terracotta-800 hover:bg-terracotta-900 border-2 border-white/20"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
