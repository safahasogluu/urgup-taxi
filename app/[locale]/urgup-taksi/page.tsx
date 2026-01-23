import { getTranslations, setRequestLocale } from 'next-intl/server';
import { generateMetadata as genMeta } from '@/lib/seo';
import { generateFAQPageSchema, generateBreadcrumbSchema } from '@/lib/schema';
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
  const t = await getTranslations({ locale, namespace: 'urgupTaksi' });
  
  return genMeta({
    locale: locale as Locale,
    title: t('title'),
    description: t('description'),
    path: '/urgup-taksi',
  });
}

export default async function UrgupTaksiPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  
  // Only show for TR and EN - use notFound() to avoid soft-404
  if (locale !== 'tr' && locale !== 'en') {
    notFound();
  }
  
  const t = await getTranslations({ locale, namespace: 'urgupTaksi' });
  const tCommon = await getTranslations({ locale, namespace: 'common' });
  const tFaq = await getTranslations({ locale, namespace: 'faq' });
  
  const phone = tCommon('phone');
  
  // Generate FAQ schema with 8 FAQs
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
  
  const faqSchema = generateFAQPageSchema(faqs);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: tCommon('home'), url: buildLocaleUrl(locale, '/') },
    { name: t('h1'), url: buildLocaleUrl(locale, '/urgup-taksi') },
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

      {/* Hero Section */}
      <section className="bg-hero-gradient section-padding">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-display text-4xl md:text-5xl mb-6 text-basalt-900">
              {t('h1')}
            </h1>
            <p className="text-xl text-basalt-600 mb-10 max-w-3xl mx-auto">
              {t('intro')}
            </p>
            
            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
              <WhatsAppQuickCTA type="general" className="btn-whatsapp px-8 py-4 text-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none">
              <div className="text-basalt-700 leading-relaxed whitespace-pre-line">
                {t('content')}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-sand-200">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display text-3xl mb-8 text-center text-basalt-900">{tFaq('faqTitle')}</h2>
            <FAQAccordion faqs={faqs} />
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="section-padding bg-terracotta-gradient text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl mb-4 text-white">{tCommon('bookNow')}</h2>
            <p className="text-xl mb-8 text-terracotta-100">
              {tCommon('open247')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <CallCTAButton
                phone={phone}
                className="bg-white text-terracotta-700 px-8 py-4 rounded-xl font-semibold hover:bg-sand-100 transition-all shadow-lg text-lg inline-flex items-center justify-center gap-2"
                ctaLocation="hero"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {tCommon('callNow')}
              </CallCTAButton>
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
