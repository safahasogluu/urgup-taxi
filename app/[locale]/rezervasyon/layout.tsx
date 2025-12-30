import { getTranslations, setRequestLocale } from 'next-intl/server';
import { generateMetadata as genMeta } from '@/lib/seo';
import { generateBreadcrumbSchema } from '@/lib/schema';
import { Locale } from '@/i18n';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'booking' });
  
  return genMeta({
    locale: locale as Locale,
    title: t('title'),
    description: t('description'),
    path: '/rezervasyon',
  });
}

export default async function BookingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

