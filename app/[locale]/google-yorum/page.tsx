import { getTranslations, setRequestLocale } from 'next-intl/server';
import { redirect } from 'next/navigation';
import { generateMetadata as genMeta } from '@/lib/seo';
import { Locale } from '@/i18n';
import Link from 'next/link';
import CallCTAButton from '@/components/CallCTAButton';
import WhatsAppLinkButton from '@/components/WhatsAppLinkButton';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'googleReview' });
  
  return genMeta({
    locale: locale as Locale,
    title: t('title'),
    description: t('description'),
    path: '/google-yorum',
    noindex: true, // Don't index this redirect page
  });
}

export default async function GoogleReviewPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  
  // Check if GBP review URL is configured
  const gbpReviewUrl = process.env.NEXT_PUBLIC_GBP_REVIEW_URL;
  
  // If URL exists, redirect immediately
  if (gbpReviewUrl) {
    redirect(gbpReviewUrl);
  }
  
  // Fallback page when URL is not configured
  const t = await getTranslations({ locale, namespace: 'googleReview' });
  const tCommon = await getTranslations({ locale, namespace: 'common' });
  
  const phone = tCommon('phone');
  const whatsapp = tCommon('whatsapp').replace(/[^0-9]/g, '');

  return (
    <section className="min-h-[60vh] flex items-center justify-center py-16 bg-sand-100">
      <div className="container mx-auto px-4">
        <div className="max-w-lg mx-auto text-center">
          {/* Google Icon */}
          <div className="w-20 h-20 bg-white rounded-full shadow-lg flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10" viewBox="0 0 24 24" aria-hidden="true">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
          </div>

          <h1 className="font-display text-3xl md:text-4xl mb-4 text-basalt-900">
            {t('fallbackTitle')}
          </h1>
          
          <p className="text-lg text-basalt-600 mb-8">
            {t('fallbackDescription')}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CallCTAButton
              phone={phone}
              className="btn-primary px-8 py-4 text-lg inline-flex items-center justify-center gap-2"
              ctaLocation="hero"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              {tCommon('callNow')}
            </CallCTAButton>
            <WhatsAppLinkButton
              href={`https://wa.me/${whatsapp}?text=${encodeURIComponent(t('whatsappMessage'))}`}
              className="btn-whatsapp px-8 py-4 text-lg inline-flex items-center justify-center gap-2"
              ctaLocation="hero"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              {t('whatsappCta')}
            </WhatsAppLinkButton>
          </div>

          {/* Back link */}
          <Link 
            href={`/${locale}`}
            className="inline-block mt-8 text-primary-600 hover:text-primary-700 font-medium"
          >
            {t('backToHome')}
          </Link>
        </div>
      </div>
    </section>
  );
}
