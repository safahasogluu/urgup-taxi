'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { trackCall, trackWhatsApp } from '@/lib/analytics';
import LanguageSwitcher from './LanguageSwitcher';

export default function Header() {
  const t = useTranslations('common');
  const tNav = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname() || '/';
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const phone = t('phone');
  const whatsapp = t('whatsapp');

  const handleCall = () => {
    trackCall({
      locale,
      pagePath: pathname,
      ctaLocation: 'header',
    });
    window.location.href = `tel:${phone}`;
  };

  const handleWhatsApp = () => {
    trackWhatsApp({
      locale,
      pagePath: pathname,
      ctaLocation: 'header',
    });
    window.open(`https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}`, '_blank');
  };

  const navItems = [
    { href: `/${locale}`, label: tNav('home') },
    { href: `/${locale}/vip-transfer`, label: tNav('vipTransfer') },
    { href: `/${locale}/havalimani-transferi`, label: tNav('airportTransfer') },
    { href: `/${locale}/fiyatlar`, label: tNav('pricing') },
    { href: `/${locale}/rezervasyon`, label: tNav('booking') },
    { href: `/${locale}/iletisim`, label: tNav('contact') },
    { href: `/${locale}/sss`, label: tNav('faq') },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-warm-sandstone/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Wordmark */}
          <Link href={`/${locale}`} className="flex flex-col">
            <span className="text-2xl font-bold text-primary-700 leading-tight">
              {t('businessName')}
            </span>
            <span className="text-xs text-gray-600 font-normal">
              Ürgüp Terminal Taksi • {t('open247')}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {navItems.slice(0, 4).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-700 hover:text-primary-600 transition-colors font-medium text-sm"
              >
                {item.label}
              </Link>
            ))}
            <LanguageSwitcher />
            <button
              onClick={handleCall}
              className="bg-primary-700 text-white px-6 py-2.5 rounded-lg hover:bg-primary-800 transition-colors font-semibold text-sm shadow-md"
            >
              {t('callNow')}
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-3">
            <LanguageSwitcher />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-700 p-2"
              aria-label="Menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="lg:hidden py-4 space-y-2 border-t border-warm-sandstone/20">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-gray-700 hover:text-primary-600 py-2 font-medium"
              >
                {item.label}
              </Link>
            ))}
            <div className="flex gap-2 pt-4">
              <button
                onClick={handleCall}
                className="flex-1 bg-primary-700 text-white px-4 py-3 rounded-lg hover:bg-primary-800 font-semibold"
              >
                {t('callNow')}
              </button>
              <button
                onClick={handleWhatsApp}
                className="flex-1 bg-green-700 text-white px-4 py-3 rounded-lg hover:bg-green-800 font-semibold"
              >
                {t('whatsappButton')}
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
