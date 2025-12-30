import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales, Locale } from '@/i18n';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StickyCTA from '@/components/StickyCTA';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import { Manrope } from 'next/font/google';
import '../globals.css';

const manrope = Manrope({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-manrope',
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale} className={manrope.variable}>
      <body>
        <GoogleAnalytics />
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <StickyCTA />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

