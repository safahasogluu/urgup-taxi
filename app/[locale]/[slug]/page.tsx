import { getTranslations, setRequestLocale } from 'next-intl/server';
import { generateMetadata as genMeta } from '@/lib/seo';
import { generateFAQPageSchema, generateBreadcrumbSchema } from '@/lib/schema';
import { locations } from '@/data/locations';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Locale } from '@/i18n';
import { locales } from '@/i18n';
import FAQAccordion from '@/components/FAQAccordion';
import { buildLocaleUrl } from '@/lib/url';

export async function generateStaticParams() {
  const params: Array<{ locale: string; slug: string }> = [];
  for (const locale of locales) {
    for (const location of locations) {
      params.push({ locale, slug: location.slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
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

export default async function LocationPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const location = locations.find((l) => l.slug === slug);
  const tCommon = await getTranslations({ locale, namespace: 'common' });
  const tFaq = await getTranslations({ locale, namespace: 'faq' });
  
  if (!location) {
    notFound();
  }

  const faqSchema = generateFAQPageSchema(
    location.faqs.map((faq) => ({
      question: faq.question[locale as Locale],
      answer: faq.answer[locale as Locale],
    }))
  );
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: tCommon('home'), url: buildLocaleUrl(locale, '/') },
    { name: location.name[locale as Locale], url: buildLocaleUrl(locale, `/${slug}`) },
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
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">{location.name[locale as Locale]}</h1>
          <p className="text-xl text-gray-600 mb-12">{location.description[locale as Locale]}</p>

          {location.faqs.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6 text-gray-900">{tFaq('faqTitle')}</h2>
              <FAQAccordion
                faqs={location.faqs.map((faq) => ({
                  question: faq.question[locale as Locale],
                  answer: faq.answer[locale as Locale],
                }))}
              />
            </div>
          )}

          <div className="text-center">
          <Link
            href={`/${locale}/rezervasyon`}
            className="bg-primary-700 text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-800 transition-colors inline-block mr-4"
          >
            {tCommon('bookNow')}
          </Link>
          <a
            href={`tel:${tCommon('phone')}`}
            className="bg-green-700 text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-800 transition-colors inline-block"
          >
            {tCommon('callNow')}
          </a>
          </div>
        </div>
      </div>
    </>
  );
}
