import { getTranslations, setRequestLocale } from 'next-intl/server';
import { generateMetadata as genMeta } from '@/lib/seo';
import { generateFAQPageSchema, generateBreadcrumbSchema, generateTaxiServiceSchemaForPage } from '@/lib/schema';
import { Locale } from '@/i18n';
import { buildLocaleUrl } from '@/lib/url';
import { notFound } from 'next/navigation';
import FAQAccordion from '@/components/FAQAccordion';
import CallCTAButton from '@/components/CallCTAButton';
import WhatsAppQuickCTA from '@/components/WhatsAppQuickCTA';
import Link from 'next/link';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  
  if (locale !== 'tr') {
    return genMeta({
      locale: locale as Locale,
      title: 'Not Found',
      description: 'Page not found',
      path: '/nevsehir-taksi',
      noindex: true,
    });
  }
  
  const t = await getTranslations({ locale, namespace: 'nevsehirTaksi' });
  
  return genMeta({
    locale: locale as Locale,
    title: t('title'),
    description: t('description'),
    path: '/nevsehir-taksi',
  });
}

export default async function NevsehirTaksiPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  
  if (locale !== 'tr') {
    notFound();
  }
  
  const t = await getTranslations({ locale, namespace: 'nevsehirTaksi' });
  const tCommon = await getTranslations({ locale, namespace: 'common' });
  const tFaq = await getTranslations({ locale, namespace: 'faq' });
  
  const phone = tCommon('phone');
  const canonicalUrl = buildLocaleUrl('tr', '/nevsehir-taksi');
  
  const faqs = [
    { question: t('faq1Q'), answer: t('faq1A') },
    { question: t('faq2Q'), answer: t('faq2A') },
    { question: t('faq3Q'), answer: t('faq3A') },
    { question: t('faq4Q'), answer: t('faq4A') },
    { question: t('faq5Q'), answer: t('faq5A') },
    { question: t('faq6Q'), answer: t('faq6A') },
    { question: t('faq7Q'), answer: t('faq7A') },
    { question: t('faq8Q'), answer: t('faq8A') },
  ];
  
  const faqSchema = generateFAQPageSchema(faqs, canonicalUrl);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: tCommon('home'), url: buildLocaleUrl(locale, '/') },
    { name: t('h1'), url: canonicalUrl },
  ]);
  const taxiServiceSchema = generateTaxiServiceSchemaForPage(canonicalUrl);

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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(taxiServiceSchema) }}
      />

      <section className="bg-hero-gradient section-padding">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-display text-4xl md:text-5xl mb-6 text-basalt-900">
              {t('h1')}
            </h1>
            <p className="text-xl text-basalt-600 mb-10 max-w-3xl mx-auto">
              {t('intro')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <WhatsAppQuickCTA type="general" className="btn-whatsapp px-8 py-4 text-lg" />
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
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-amber-50 border-y border-amber-200">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-2xl mb-4 text-basalt-900">{t('quickReservationTitle')}</h2>
            <p className="text-lg text-basalt-600 mb-6">{t('quickReservationText')}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <WhatsAppQuickCTA type="general" className="btn-whatsapp px-6 py-3 text-base" />
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
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none">
              <div className="text-basalt-700 leading-relaxed whitespace-pre-line">
                {t('content')}
              </div>
            </div>
            
            <div className="mt-8 pt-8 border-t border-zinc-200">
              <h3 className="font-display text-xl mb-4 text-basalt-900">İlgili Hizmetler</h3>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/tr/urgup-taksi"
                  className="px-4 py-2 bg-amber-50 text-amber-800 rounded-lg hover:bg-amber-100 transition-colors font-medium"
                >
                  Ürgüp Taksi
                </Link>
                <Link
                  href="/tr/kapadokya-taksi"
                  className="px-4 py-2 bg-amber-50 text-amber-800 rounded-lg hover:bg-amber-100 transition-colors font-medium"
                >
                  Kapadokya Taksi
                </Link>
                <Link
                  href="/tr/nevsehir-havalimani-transfer"
                  className="px-4 py-2 bg-amber-50 text-amber-800 rounded-lg hover:bg-amber-100 transition-colors font-medium"
                >
                  Nevşehir Havalimanı Transfer
                </Link>
                <Link
                  href="/tr/havalimani-transferi"
                  className="px-4 py-2 bg-amber-50 text-amber-800 rounded-lg hover:bg-amber-100 transition-colors font-medium"
                >
                  Havalimanı Transferi
                </Link>
                <Link
                  href="/tr/fiyatlar"
                  className="px-4 py-2 bg-amber-50 text-amber-800 rounded-lg hover:bg-amber-100 transition-colors font-medium"
                >
                  Fiyatlar
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-sand-200">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display text-3xl mb-8 text-center text-basalt-900">{tFaq('faqTitle')}</h2>
            <FAQAccordion faqs={faqs} />
          </div>
        </div>
      </section>

      <section className="section-padding bg-terracotta-gradient text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl mb-4 text-white">{tCommon('bookNow')}</h2>
            <p className="text-xl mb-8 text-terracotta-100">
              {tCommon('open247')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <WhatsAppQuickCTA type="general" className="bg-white text-terracotta-700 px-8 py-4 rounded-xl font-semibold hover:bg-sand-100 transition-all shadow-lg text-lg inline-flex items-center justify-center gap-2" />
              <CallCTAButton
                phone={phone}
                className="bg-terracotta-800 text-white px-8 py-4 rounded-xl font-semibold hover:bg-terracotta-900 transition-all shadow-lg text-lg inline-flex items-center justify-center gap-2 border-2 border-white/20"
                ctaLocation="hero"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {tCommon('callNow')}
              </CallCTAButton>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
