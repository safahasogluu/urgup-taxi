import { getTranslations, setRequestLocale } from 'next-intl/server';
import { generateMetadata as genMeta } from '@/lib/seo';
import { generateFAQPageSchema, generateBreadcrumbSchema, generateLocalBusinessSchema } from '@/lib/schema';
import { locations } from '@/data/locations';
import { hubPages, getHubBySlug } from '@/data/hubs';
import { transferRoutes, getRoutesByAirport } from '@/data/transfers';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Locale } from '@/i18n';
import { locales } from '@/i18n';
import FAQAccordion from '@/components/FAQAccordion';
import { buildLocaleUrl } from '@/lib/url';
import PopularRoutes from '@/components/PopularRoutes';
import WhatsAppQuickCTA from '@/components/WhatsAppQuickCTA';

export async function generateStaticParams() {
  const params: Array<{ locale: string; slug: string }> = [];
  for (const locale of locales) {
    // Add location pages
    for (const location of locations) {
      params.push({ locale, slug: location.slug });
    }
    // Add hub pages
    for (const hub of hubPages) {
      params.push({ locale, slug: hub.slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  
  // Check if it's a hub page
  const hub = getHubBySlug(slug);
  if (hub) {
    return genMeta({
      locale: locale as Locale,
      title: hub.metaTitle[locale as Locale],
      description: hub.metaDescription[locale as Locale],
      path: `/${slug}`,
    });
  }
  
  // Check if it's a location page
  const location = locations.find((l) => l.slug === slug);
  const tNav = await getTranslations({ locale, namespace: 'nav' });
  
  if (!location) {
    return genMeta({
      locale: locale as Locale,
      title: tNav('locations'),
      description: tNav('locations'),
      path: `/${slug}`,
    });
  }

  return genMeta({
    locale: locale as Locale,
    title: location.name[locale as Locale],
    description: location.description[locale as Locale],
    path: `/${slug}`,
  });
}

export default async function DynamicPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  
  // Check if it's a hub page
  const hub = getHubBySlug(slug);
  if (hub) {
    return <HubPageContent locale={locale} hub={hub} />;
  }
  
  // Check if it's a location page
  const location = locations.find((l) => l.slug === slug);
  if (location) {
    return <LocationPageContent locale={locale} slug={slug} />;
  }
  
  notFound();
}

// Hub Page Component
async function HubPageContent({ locale, hub }: { locale: string; hub: ReturnType<typeof getHubBySlug> }) {
  if (!hub) return null;
  
  const tCommon = await getTranslations({ locale, namespace: 'common' });
  const tHub = await getTranslations({ locale, namespace: 'hubPages' });
  
  const phone = tCommon('phone');
  
  // Generate schemas
  const faqSchema = generateFAQPageSchema(
    hub.faqs.map((faq) => ({
      question: faq.question[locale as Locale],
      answer: faq.answer[locale as Locale],
    }))
  );
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: tCommon('home'), url: buildLocaleUrl(locale, '/') },
    { name: hub.title[locale as Locale], url: buildLocaleUrl(locale, `/${hub.slug}`) },
  ]);
  const localBusinessSchema = generateLocalBusinessSchema(locale as Locale);
  
  // Get related routes for airport hubs
  const relatedRoutes = hub.type === 'airport' 
    ? (hub.id.includes('kayseri') ? getRoutesByAirport('ASR') : getRoutesByAirport('NAV'))
    : transferRoutes.slice(0, 4);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />

      {/* Hero Section */}
      <section className="bg-hero-gradient section-padding">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-display text-4xl md:text-5xl mb-6 text-basalt-900">
              {hub.h1[locale as Locale]}
            </h1>
            <p className="text-xl text-basalt-600 mb-10 max-w-3xl mx-auto">
              {hub.intro[locale as Locale]}
            </p>
            
            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`tel:${phone}`}
                className="btn-primary px-8 py-4 text-lg"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {tCommon('callNow')}
              </a>
              <WhatsAppQuickCTA type="general" />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl mb-4 text-basalt-900">{tHub('howItWorksTitle')}</h2>
            <p className="text-lg text-basalt-600">{tHub('howItWorksSubtitle')}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center card-premium p-8">
              <div className="bg-primary-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-700">1</span>
              </div>
              <h3 className="font-display text-xl mb-2 text-basalt-900">{tHub('step1Title')}</h3>
              <p className="text-basalt-600">{tHub('step1Desc')}</p>
            </div>
            
            <div className="text-center card-premium p-8">
              <div className="bg-sage-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-sage-700">2</span>
              </div>
              <h3 className="font-display text-xl mb-2 text-basalt-900">{tHub('step2Title')}</h3>
              <p className="text-basalt-600">{tHub('step2Desc')}</p>
            </div>
            
            <div className="text-center card-premium p-8">
              <div className="bg-terracotta-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-terracotta-700">3</span>
              </div>
              <h3 className="font-display text-xl mb-2 text-basalt-900">{tHub('step3Title')}</h3>
              <p className="text-basalt-600">{tHub('step3Desc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="section-padding bg-sand-200">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl mb-4 text-basalt-900">{tHub('whyChooseTitle')}</h2>
            <p className="text-lg text-basalt-600">{tHub('whyChooseSubtitle')}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <div className="card-premium p-6 text-center">
              <div className="bg-sage-100 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-sage-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-1 text-basalt-900">{tHub('benefit1Title')}</h3>
              <p className="text-sm text-basalt-600">{tHub('benefit1Desc')}</p>
            </div>
            
            <div className="card-premium p-6 text-center">
              <div className="bg-terracotta-100 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-terracotta-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-1 text-basalt-900">{tHub('benefit2Title')}</h3>
              <p className="text-sm text-basalt-600">{tHub('benefit2Desc')}</p>
            </div>
            
            <div className="card-premium p-6 text-center">
              <div className="bg-primary-100 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-1 text-basalt-900">{tHub('benefit3Title')}</h3>
              <p className="text-sm text-basalt-600">{tHub('benefit3Desc')}</p>
            </div>
            
            <div className="card-premium p-6 text-center">
              <div className="bg-sage-100 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-sage-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-1 text-basalt-900">{tHub('benefit4Title')}</h3>
              <p className="text-sm text-basalt-600">{tHub('benefit4Desc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Related Routes Section */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl mb-4 text-basalt-900">{tHub('popularRoutesTitle')}</h2>
            <p className="text-lg text-basalt-600">{tHub('popularRoutesSubtitle')}</p>
          </div>
          
          <PopularRoutes locale={locale} routes={relatedRoutes} />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-sand-200">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display text-3xl mb-8 text-center text-basalt-900">{tHub('faqTitle')}</h2>
            <FAQAccordion
              faqs={hub.faqs.map((faq) => ({
                question: faq.question[locale as Locale],
                answer: faq.answer[locale as Locale],
              }))}
            />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section-padding bg-terracotta-gradient text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl mb-4 text-white">{tHub('ctaTitle')}</h2>
            <p className="text-xl mb-8 text-terracotta-100">{tHub('ctaSubtitle')}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`tel:${phone}`}
                className="bg-white text-terracotta-700 px-8 py-4 rounded-xl font-semibold hover:bg-sand-100 transition-all shadow-lg text-lg inline-flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {tCommon('callNow')}
              </a>
              <Link
                href={`/${locale}/rezervasyon`}
                className="bg-terracotta-800 text-white px-8 py-4 rounded-xl font-semibold hover:bg-terracotta-900 transition-all shadow-lg text-lg inline-flex items-center justify-center gap-2 border-2 border-white/20"
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

// Location Page Component (original logic)
async function LocationPageContent({ locale, slug }: { locale: string; slug: string }) {
  const tCommon = await getTranslations({ locale, namespace: 'common' });
  const tFaq = await getTranslations({ locale, namespace: 'faq' });
  
  const loc = locations.find((l) => l.slug === slug);
  if (!loc) return null;
  
  const faqSchema = generateFAQPageSchema(
    loc.faqs.map((faq) => ({
      question: faq.question[locale as Locale],
      answer: faq.answer[locale as Locale],
    }))
  );
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: tCommon('home'), url: buildLocaleUrl(locale, '/') },
    { name: loc.name[locale as Locale], url: buildLocaleUrl(locale, `/${slug}`) },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="container mx-auto px-4 py-16 md:py-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-display text-4xl md:text-5xl mb-6 text-basalt-900">{loc.name[locale as Locale]}</h1>
          <p className="text-xl text-basalt-600 mb-12">{loc.description[locale as Locale]}</p>

          {loc.faqs.length > 0 && (
            <div className="mb-12">
              <h2 className="font-display text-2xl mb-6 text-basalt-900">{tFaq('faqTitle')}</h2>
              <FAQAccordion
                faqs={loc.faqs.map((faq) => ({
                  question: faq.question[locale as Locale],
                  answer: faq.answer[locale as Locale],
                }))}
              />
            </div>
          )}

          <div className="text-center">
            <Link
              href={`/${locale}/rezervasyon`}
              className="btn-primary px-8 py-4 mr-4"
            >
              {tCommon('bookNow')}
            </Link>
            <a
              href={`tel:${tCommon('phone')}`}
              className="btn-whatsapp px-8 py-4"
            >
              {tCommon('callNow')}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
