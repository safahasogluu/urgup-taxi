import { getTranslations, setRequestLocale } from 'next-intl/server';
import { generateMetadata as genMeta } from '@/lib/seo';
import { generateServiceSchema, generateBreadcrumbSchema } from '@/lib/schema';
import { transferRoutes } from '@/data/transfers';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Locale } from '@/i18n';
import { locales } from '@/i18n';
import { buildLocaleUrl } from '@/lib/url';
import WhatsAppCTA from '@/components/WhatsAppCTA';

export async function generateStaticParams() {
  const params: Array<{ locale: string; slug: string }> = [];
  for (const locale of locales) {
    for (const route of transferRoutes) {
      params.push({ locale, slug: route.slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const route = transferRoutes.find((r) => r.slug === slug);
  const tNav = await getTranslations({ locale, namespace: 'nav' });
  
  if (!route) {
    return genMeta({
      locale: locale as Locale,
      title: tNav('airportTransfer'),
      description: tNav('airportTransfer'),
      path: `/transfer/${slug}`,
    });
  }

  return genMeta({
    locale: locale as Locale,
    title: `${route.from[locale as Locale]} → ${route.to[locale as Locale]} Transfer`,
    description: route.description[locale as Locale],
    path: `/transfer/${slug}`,
  });
}

export default async function TransferRoutePage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const route = transferRoutes.find((r) => r.slug === slug);
  const tCommon = await getTranslations({ locale, namespace: 'common' });
  const tNav = await getTranslations({ locale, namespace: 'nav' });
  
  if (!route) {
    notFound();
  }

  const serviceSchema = generateServiceSchema(
    `${route.from[locale as Locale]} → ${route.to[locale as Locale]}`,
    route.description[locale as Locale],
    locale as Locale
  );
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: tCommon('home'), url: buildLocaleUrl(locale, '/') },
    { name: tNav('airportTransfer'), url: buildLocaleUrl(locale, '/havalimani-transferi') },
    { name: `${route.from[locale as Locale]} → ${route.to[locale as Locale]}`, url: buildLocaleUrl(locale, `/transfer/${slug}`) },
  ]);

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
                routeType="airport"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Back to all routes */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <Link
              href={`/${locale}/havalimani-transferi`}
              className="inline-flex items-center gap-2 text-primary-700 hover:text-primary-800 font-medium"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              {tNav('airportTransfer')}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
