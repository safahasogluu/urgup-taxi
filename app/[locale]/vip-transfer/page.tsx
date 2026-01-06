import { getTranslations, setRequestLocale } from 'next-intl/server';
import { generateMetadata as genMeta } from '@/lib/seo';
import { generateServiceSchema, generateBreadcrumbSchema, generateFAQPageSchema } from '@/lib/schema';
import Link from 'next/link';
import { Locale } from '@/i18n';
import { buildLocaleUrl } from '@/lib/url';
import FAQAccordion from '@/components/FAQAccordion';
import WhatsAppQuickCTA from '@/components/WhatsAppQuickCTA';
import CallCTAButton from '@/components/CallCTAButton';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'vipTransfer' });
  
  return genMeta({
    locale: locale as Locale,
    title: t('title'),
    description: t('description'),
    path: '/vip-transfer',
  });
}

export default async function VIPTransferPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'vipTransfer' });
  const tCommon = await getTranslations({ locale, namespace: 'common' });
  const tNav = await getTranslations({ locale, namespace: 'nav' });
  const tFaq = await getTranslations({ locale, namespace: 'vipFaq' });
  
  const phone = tCommon('phone');

  // VIP Transfer specific FAQs
  const faqs = [
    { question: tFaq('q1'), answer: tFaq('a1') },
    { question: tFaq('q2'), answer: tFaq('a2') },
    { question: tFaq('q3'), answer: tFaq('a3') },
    { question: tFaq('q4'), answer: tFaq('a4') },
    { question: tFaq('q5'), answer: tFaq('a5') },
    { question: tFaq('q6'), answer: tFaq('a6') },
    { question: tFaq('q7'), answer: tFaq('a7') },
    { question: tFaq('q8'), answer: tFaq('a8') },
  ];
  
  const serviceSchema = generateServiceSchema(t('title'), t('description'), locale as Locale);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: tCommon('home'), url: buildLocaleUrl(locale, '/') },
    { name: tNav('vipTransfer'), url: buildLocaleUrl(locale, '/vip-transfer') },
  ]);
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
      <section className="bg-warm-gradient py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900">
              {t('heroTitle')}
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-10">
              {t('heroSubtitle')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <CallCTAButton
                phone={phone}
                className="bg-primary-700 text-white px-8 py-4 rounded-xl font-semibold hover:bg-primary-800 transition-all shadow-lg hover:shadow-xl text-lg inline-flex items-center justify-center gap-2"
                ctaLocation="hero"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {tCommon('callNow')}
              </CallCTAButton>
              <WhatsAppQuickCTA 
                type="vip" 
                className="bg-green-700 hover:bg-green-800 shadow-lg hover:shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-warm-cream p-8 rounded-2xl shadow-md border border-warm-sandstone/30">
              <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-7 h-7 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold mb-2 text-gray-900">{t('luxuryVehicles')}</h2>
              <p className="text-gray-600">{t('luxuryVehiclesDesc')}</p>
            </div>

            <div className="bg-warm-cream p-8 rounded-2xl shadow-md border border-warm-sandstone/30">
              <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-7 h-7 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold mb-2 text-gray-900">{t('professionalDrivers')}</h2>
              <p className="text-gray-600">{t('professionalDriversDesc')}</p>
            </div>

            <div className="bg-warm-cream p-8 rounded-2xl shadow-md border border-warm-sandstone/30">
              <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-7 h-7 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold mb-2 text-gray-900">{t('service247')}</h2>
              <p className="text-gray-600">{t('service247Desc')}</p>
            </div>

            <div className="bg-warm-cream p-8 rounded-2xl shadow-md border border-warm-sandstone/30">
              <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-7 h-7 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </div>
              <h2 className="text-xl font-bold mb-2 text-gray-900">{t('flexibleBooking')}</h2>
              <p className="text-gray-600">{t('flexibleBookingDesc')}</p>
            </div>

            <div className="bg-warm-cream p-8 rounded-2xl shadow-md border border-warm-sandstone/30">
              <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-7 h-7 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold mb-2 text-gray-900">{t('doorToDoor')}</h2>
              <p className="text-gray-600">{t('doorToDoorDesc')}</p>
            </div>

            <div className="bg-warm-cream p-8 rounded-2xl shadow-md border border-warm-sandstone/30">
              <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-7 h-7 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
              </div>
              <h2 className="text-xl font-bold mb-2 text-gray-900">{t('whatsappBooking')}</h2>
              <p className="text-gray-600">{t('whatsappBookingDesc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 md:py-20 bg-warm-gradient">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-gray-900">
            {t('howItWorksTitle')}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center bg-white p-8 rounded-2xl shadow-md">
              <div className="bg-primary-700 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">{t('step1Title')}</h3>
              <p className="text-gray-600">{t('step1Desc')}</p>
            </div>
            
            <div className="text-center bg-white p-8 rounded-2xl shadow-md">
              <div className="bg-primary-700 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">{t('step2Title')}</h3>
              <p className="text-gray-600">{t('step2Desc')}</p>
            </div>
            
            <div className="text-center bg-white p-8 rounded-2xl shadow-md">
              <div className="bg-primary-700 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">{t('step3Title')}</h3>
              <p className="text-gray-600">{t('step3Desc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-gray-900">
              {tNav('faq')}
            </h2>
            <FAQAccordion faqs={faqs} />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-primary-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">{t('heroTitle')}</h2>
            <p className="text-xl mb-8 text-primary-100">{t('description')}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <CallCTAButton
                phone={phone}
                className="bg-white text-primary-700 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all shadow-lg text-lg inline-flex items-center justify-center gap-2"
                ctaLocation="hero"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {tCommon('callNow')}
              </CallCTAButton>
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
