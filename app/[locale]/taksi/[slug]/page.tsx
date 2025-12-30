import { getTranslations, setRequestLocale } from 'next-intl/server';
import { generateMetadata as genMeta } from '@/lib/seo';
import { generateServiceSchema, generateBreadcrumbSchema, generateFAQPageSchema } from '@/lib/schema';
import { taxiRoutes, getAllTaxiRoutes } from '@/data/transfers';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Locale } from '@/i18n';
import { locales } from '@/i18n';
import { buildLocaleUrl } from '@/lib/url';
import WhatsAppCTA from '@/components/WhatsAppCTA';
import FAQAccordion from '@/components/FAQAccordion';

export async function generateStaticParams() {
  const params: Array<{ locale: string; slug: string }> = [];
  for (const locale of locales) {
    for (const route of taxiRoutes) {
      params.push({ locale, slug: route.slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const route = taxiRoutes.find((r) => r.slug === slug);
  const tPage = await getTranslations({ locale, namespace: 'taxiPage' });
  
  if (!route) {
    return genMeta({
      locale: locale as Locale,
      title: tPage('pageTitle'),
      description: tPage('pageDesc'),
      path: `/taksi/${slug}`,
    });
  }

  const title = locale === 'tr' 
    ? `${route.from[locale as Locale]} - ${route.to[locale as Locale]} Taksi | ${route.duration}`
    : `${route.from[locale as Locale]} to ${route.to[locale as Locale]} Taxi | ${route.duration}`;

  return genMeta({
    locale: locale as Locale,
    title,
    description: route.description[locale as Locale],
    path: `/taksi/${slug}`,
  });
}

export default async function TaxiRoutePage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const route = taxiRoutes.find((r) => r.slug === slug);
  const tCommon = await getTranslations({ locale, namespace: 'common' });
  const tNav = await getTranslations({ locale, namespace: 'nav' });
  const tPage = await getTranslations({ locale, namespace: 'taxiPage' });
  const tTransfer = await getTranslations({ locale, namespace: 'transferPage' });
  
  if (!route) {
    notFound();
  }

  // Generate FAQs
  const faqs = route.faqs?.map((faq) => ({
    question: faq.question[locale as Locale],
    answer: faq.answer[locale as Locale],
  })) || [];

  const serviceSchema = generateServiceSchema(
    `${route.from[locale as Locale]} \u2192 ${route.to[locale as Locale]}`,
    route.description[locale as Locale],
    locale as Locale
  );
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: tCommon('home'), url: buildLocaleUrl(locale, '/') },
    { name: tPage('pageTitle'), url: buildLocaleUrl(locale, '/kapadokya-taksi') },
    { name: `${route.from[locale as Locale]} \u2192 ${route.to[locale as Locale]}`, url: buildLocaleUrl(locale, `/taksi/${slug}`) },
  ]);
  const faqSchema = faqs.length > 0 ? generateFAQPageSchema(faqs) : null;

  // Get related taxi routes
  const relatedRoutes = getAllTaxiRoutes().filter(r => r.id !== route.id).slice(0, 3);

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
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      {/* Hero Section */}
      <section className="bg-hero-gradient section-padding">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-display text-4xl md:text-5xl mb-6 text-basalt-900">
              {route.from[locale as Locale]} → {route.to[locale as Locale]}
            </h1>
            <p className="text-xl text-basalt-600 mb-8">{route.description[locale as Locale]}</p>
            
            {/* Route Info */}
            <div className="flex flex-wrap justify-center gap-6 mb-10">
              <div className="bg-white/80 backdrop-blur-sm px-6 py-3 rounded-xl border border-sand-300/50">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-semibold text-basalt-800">{route.duration}</span>
                </div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm px-6 py-3 rounded-xl border border-sand-300/50">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="font-semibold text-basalt-800">{route.distance}</span>
                </div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm px-6 py-3 rounded-xl border border-sand-300/50">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-semibold text-basalt-800">{tCommon('open247')}</span>
                </div>
              </div>
            </div>

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
                routeFrom={route.from[locale as Locale]} 
                routeTo={route.to[locale as Locale]} 
                routeType="taxi"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl mb-4 text-basalt-900">{tPage('howItWorksTitle')}</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center card-premium p-8">
              <div className="bg-primary-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-700">1</span>
              </div>
              <h3 className="font-display text-xl mb-2 text-basalt-900">{tPage('step1Title')}</h3>
              <p className="text-basalt-600">{tPage('step1Desc')}</p>
            </div>
            
            <div className="text-center card-premium p-8">
              <div className="bg-sage-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-sage-700">2</span>
              </div>
              <h3 className="font-display text-xl mb-2 text-basalt-900">{tPage('step2Title')}</h3>
              <p className="text-basalt-600">{tPage('step2Desc')}</p>
            </div>
            
            <div className="text-center card-premium p-8">
              <div className="bg-terracotta-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-terracotta-700">3</span>
              </div>
              <h3 className="font-display text-xl mb-2 text-basalt-900">{tPage('step3Title')}</h3>
              <p className="text-basalt-600">{tPage('step3Desc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Info Sections */}
      <section className="section-padding bg-sand-200">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Pickup Points */}
            <div className="card-premium p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-primary-100 w-10 h-10 rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="font-display text-lg text-basalt-900">{tPage('pickupTitle')}</h3>
              </div>
              <p className="text-basalt-600">{tPage('pickupDesc')}</p>
            </div>

            {/* Pricing */}
            <div className="card-premium p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-sage-100 w-10 h-10 rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-sage-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="font-display text-lg text-basalt-900">{tPage('pricingTitle')}</h3>
              </div>
              <p className="text-basalt-600">{tPage('pricingDesc')}</p>
            </div>

            {/* Safety */}
            <div className="card-premium p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-terracotta-100 w-10 h-10 rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-terracotta-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="font-display text-lg text-basalt-900">{tPage('safetyTitle')}</h3>
              </div>
              <p className="text-basalt-600">{tPage('safetyDesc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      {faqs.length > 0 && (
        <section className="section-padding bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-display text-3xl mb-8 text-center text-basalt-900">{tNav('faq')}</h2>
              <FAQAccordion faqs={faqs} />
            </div>
          </div>
        </section>
      )}

      {/* Related Routes */}
      {relatedRoutes.length > 0 && (
        <section className="section-padding bg-sand-200">
          <div className="container mx-auto px-4">
            <h2 className="font-display text-2xl mb-8 text-center text-basalt-900">{tTransfer('relatedRoutesTitle')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {relatedRoutes.map((relRoute) => (
                <Link
                  key={relRoute.id}
                  href={`/${locale}/taksi/${relRoute.slug}`}
                  className="card-premium p-6 group"
                >
                  <h3 className="font-display text-lg mb-2 text-basalt-900 group-hover:text-primary-700 transition-colors">
                    {relRoute.from[locale as Locale]} → {relRoute.to[locale as Locale]}
                  </h3>
                  <div className="flex gap-4 text-sm text-basalt-500">
                    <span>{relRoute.duration}</span>
                    <span>{relRoute.distance}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Internal Links */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center flex flex-wrap justify-center gap-4">
            <Link
              href={`/${locale}/kapadokya-taksi`}
              className="inline-flex items-center gap-2 text-primary-700 hover:text-primary-800 font-medium"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              {tTransfer('backToTaxi')}
            </Link>
            <Link
              href={`/${locale}/havalimani-transferi`}
              className="inline-flex items-center gap-2 text-primary-700 hover:text-primary-800 font-medium"
            >
              {tNav('airportTransfer')}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
            <Link
              href={`/${locale}/vip-transfer`}
              className="inline-flex items-center gap-2 text-primary-700 hover:text-primary-800 font-medium"
            >
              {tNav('vipTransfer')}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-terracotta-gradient text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl mb-4 text-white">
              {route.from[locale as Locale]} → {route.to[locale as Locale]}
            </h2>
            <p className="text-xl mb-8 text-terracotta-100">{route.description[locale as Locale]}</p>
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
                routeFrom={route.from[locale as Locale]} 
                routeTo={route.to[locale as Locale]} 
                routeType="taxi"
                className="bg-terracotta-800 hover:bg-terracotta-900 border-2 border-white/20"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}



