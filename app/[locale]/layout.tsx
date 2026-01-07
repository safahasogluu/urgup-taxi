import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales, Locale } from '@/i18n';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingCTA from '@/components/FloatingCTA';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import { Manrope, Playfair_Display } from 'next/font/google';
import '../globals.css';

const manrope = Manrope({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-manrope',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
  weight: ['400', '500', '600', '700'],
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
    <html lang={locale} className={`${manrope.variable} ${playfair.variable}`}>
      <body className="font-body">
        <GoogleAnalytics />
        <NextIntlClientProvider messages={messages}>
          <Header />
          {/* pt-20 for fixed header height (80px), pb-20 md:pb-0 for mobile bottom CTA bar */}
          <main className="min-h-screen pt-20 pb-20 md:pb-0">{children}</main>
          <Footer />
          <FloatingCTA />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
