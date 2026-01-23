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
  
  // Generate FAQ schema with canonical URL for TR locale
  const canonicalUrl = locale === 'tr' 
    ? buildLocaleUrl('tr', '/urgup-taksi')
    : undefined;
  const faqSchema = generateFAQPageSchema(faqs, canonicalUrl);
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
            
            {/* Topical Cluster - TR Only */}
            {locale === 'tr' && (
              <div className="mt-12 pt-8 border-t border-zinc-200">
                <h2 className="font-display text-2xl mb-6 text-basalt-900">Ürgüp Otogar Taksi</h2>
                <p className="text-basalt-700 mb-4 leading-relaxed">
                  Ürgüp otogarından ve terminal noktasından 7/24 taksi hizmeti sunuyoruz. Otobüs terminalinden indikten sonra otelinize, havalimanına veya istediğiniz noktaya hızlı ve güvenli transfer sağlıyoruz. Terminal çıkışında buluşma noktası belirleyebilir, bagajlarınızla birlikte konforlu bir şekilde yolculuğunuza devam edebilirsiniz.
                </p>
                <Link
                  href="/tr/urgup-terminal-taksi"
                  className="inline-block px-4 py-2 bg-amber-50 text-amber-800 rounded-lg hover:bg-amber-100 transition-colors font-medium mb-8"
                >
                  Ürgüp Terminal Taksi Detayları →
                </Link>

                <h2 className="font-display text-2xl mb-6 text-basalt-900 mt-8">Ürgüp Terminal Taksi</h2>
                <p className="text-basalt-700 mb-4 leading-relaxed">
                  Ürgüp Terminal ve otogardan profesyonel taksi hizmeti. Terminal çıkışında buluşma noktası, otel alımı, havalimanı transferleri ve bölge içi tüm noktalara 7/24 hizmet. Gece geç saatlerde veya sabah erken saatlerde terminal&apos;den alım için önceden rezervasyon yapabilirsiniz.
                </p>
                <Link
                  href="/tr/urgup-terminal-taksi"
                  className="inline-block px-4 py-2 bg-amber-50 text-amber-800 rounded-lg hover:bg-amber-100 transition-colors font-medium mb-8"
                >
                  Terminal Taksi Hizmeti →
                </Link>

                <h2 className="font-display text-2xl mb-6 text-basalt-900 mt-8">Ürgüp Taksi Durakları</h2>
                <p className="text-basalt-700 mb-4 leading-relaxed">
                  Ürgüp&apos;te taksi duraklarından veya doğrudan WhatsApp veya telefon ile taksi çağırabilirsiniz. En hızlı ve güvenilir yöntem doğrudan çağırmaktır. Otellerinizden, terminal&apos;den veya istediğiniz noktadan alım yapıyoruz. 7/24 hizmet, sabit fiyat garantisi.
                </p>
                <Link
                  href="/tr/urgup-taksi-duraklari"
                  className="inline-block px-4 py-2 bg-amber-50 text-amber-800 rounded-lg hover:bg-amber-100 transition-colors font-medium mb-8"
                >
                  Taksi Durakları ve Çağırma Hizmeti →
                </Link>

                <h2 className="font-display text-2xl mb-6 text-basalt-900 mt-8">Kapadokya & Nevşehir Taksi</h2>
                <p className="text-basalt-700 mb-4 leading-relaxed">
                  Kapadokya bölgesinin tüm noktalarında ve Nevşehir&apos;den 7/24 taksi hizmeti sunuyoruz. Ürgüp, Göreme, Uçhisar, Avanos, Mustafapaşa ve Ortahisar&apos;a transfer hizmeti veriyoruz. Bölge içi taksi hizmetleri ve havalimanı transferleri için sabit fiyat garantisi.
                </p>
                <div className="flex flex-wrap gap-3 mt-4">
                  <Link
                    href="/tr/kapadokya-taksi"
                    className="px-4 py-2 bg-amber-50 text-amber-800 rounded-lg hover:bg-amber-100 transition-colors font-medium"
                  >
                    Kapadokya Taksi →
                  </Link>
                  <Link
                    href="/tr/nevsehir-taksi"
                    className="px-4 py-2 bg-amber-50 text-amber-800 rounded-lg hover:bg-amber-100 transition-colors font-medium"
                  >
                    Nevşehir Taksi →
                  </Link>
                </div>
              </div>
            )}

            {/* Sık Arananlar - TR Only */}
            {locale === 'tr' && (
              <div className="mt-8 pt-8 border-t border-zinc-200">
                <h3 className="font-display text-xl mb-4 text-basalt-900">Sık Arananlar</h3>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/tr/kapadokya-taksi"
                    className="px-4 py-2 bg-amber-50 text-amber-800 rounded-lg hover:bg-amber-100 transition-colors font-medium"
                  >
                    Kapadokya Taksi
                  </Link>
                  <Link
                    href="/tr/nevsehir-taksi"
                    className="px-4 py-2 bg-amber-50 text-amber-800 rounded-lg hover:bg-amber-100 transition-colors font-medium"
                  >
                    Nevşehir Taksi
                  </Link>
                  <Link
                    href="/tr/urgup-terminal-taksi"
                    className="px-4 py-2 bg-amber-50 text-amber-800 rounded-lg hover:bg-amber-100 transition-colors font-medium"
                  >
                    Ürgüp Terminal Taksi
                  </Link>
                  <Link
                    href="/tr/urgup-taksi-duraklari"
                    className="px-4 py-2 bg-amber-50 text-amber-800 rounded-lg hover:bg-amber-100 transition-colors font-medium"
                  >
                    Ürgüp Taksi Durakları
                  </Link>
                  <Link
                    href="/tr/goreme-taksi"
                    className="px-4 py-2 bg-amber-50 text-amber-800 rounded-lg hover:bg-amber-100 transition-colors font-medium"
                  >
                    Göreme Taksi
                  </Link>
                  <Link
                    href="/tr/avanos-taksi"
                    className="px-4 py-2 bg-amber-50 text-amber-800 rounded-lg hover:bg-amber-100 transition-colors font-medium"
                  >
                    Avanos Taksi
                  </Link>
                  <Link
                    href="/tr/mustafapasa-taksi"
                    className="px-4 py-2 bg-amber-50 text-amber-800 rounded-lg hover:bg-amber-100 transition-colors font-medium"
                  >
                    Mustafapaşa Taksi
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* E-E-A-T Trust Module - TR Only */}
      {locale === 'tr' && (
        <section className="section-padding bg-amber-50 border-y border-amber-200">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-display text-2xl mb-8 text-center text-basalt-900">{t('trustModuleTitle')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="font-display text-lg mb-2 text-basalt-900">{t('trustModule247')}</h3>
                  <p className="text-basalt-600 text-sm">{t('trustModule247Desc')}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="font-display text-lg mb-2 text-basalt-900">{t('trustModuleWhatsApp')}</h3>
                  <p className="text-basalt-600 text-sm">{t('trustModuleWhatsAppDesc')}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="font-display text-lg mb-2 text-basalt-900">{t('trustModulePickup')}</h3>
                  <p className="text-basalt-600 text-sm">{t('trustModulePickupDesc')}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="font-display text-lg mb-2 text-basalt-900">{t('trustModulePayment')}</h3>
                  <p className="text-basalt-600 text-sm">{t('trustModulePaymentDesc')}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

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
