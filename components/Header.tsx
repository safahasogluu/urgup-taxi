'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { useState, useEffect, useRef, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { trackCall, trackWhatsApp } from '@/lib/analytics';
import LanguageSwitcher from './LanguageSwitcher';

export default function Header() {
  const t = useTranslations('common');
  const tNav = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname() || '/';
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const phone = t('phone');
  const whatsapp = t('whatsapp');

  // Scroll handler with requestAnimationFrame throttle
  const rafRef = useRef<number | null>(null);
  const lastScrollY = useRef(0);

  const handleScroll = useCallback(() => {
    if (rafRef.current) return;

    rafRef.current = requestAnimationFrame(() => {
      const scrollY = window.scrollY;
      // Only update state if threshold crossed
      const shouldBeScrolled = scrollY > 50;
      if (shouldBeScrolled !== isScrolled) {
        setIsScrolled(shouldBeScrolled);
      }
      lastScrollY.current = scrollY;
      rafRef.current = null;
    });
  }, [isScrolled]);

  useEffect(() => {
    // Check initial scroll position
    if (window.scrollY > 50) {
      setIsScrolled(true);
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [handleScroll]);

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
    <header
      className={`
        fixed top-0 left-0 right-0 z-50
        transition-all duration-300 ease-out
        ${isScrolled
          ? 'bg-white/85 backdrop-blur-xl shadow-lg border-b border-black/5'
          : 'bg-white/70 backdrop-blur-xl border-b border-black/5 shadow-sm'
        }
      `}
      // Fixed height to prevent CLS
      style={{ minHeight: isScrolled ? '64px' : '80px' }}
    >
      <div className="container mx-auto px-4">
        <div
          className={`
            flex items-center justify-between
            transition-all duration-300 ease-out
            ${isScrolled ? 'h-16' : 'h-20'}
          `}
        >
          {/* Wordmark */}
          <Link href={`/${locale}`} className="flex flex-col">
            <span
              className={`
                font-bold text-zinc-900 leading-tight
                transition-all duration-300
                ${isScrolled ? 'text-xl' : 'text-2xl'}
              `}
            >
              {t('businessName')}
            </span>
            <span
              className={`
                text-zinc-600 font-normal
                transition-all duration-300
                ${isScrolled ? 'text-[10px]' : 'text-xs'}
              `}
            >
              Göreme Taksi • {t('open247')}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-5">
            {navItems.slice(0, 4).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-zinc-700 hover:text-primary-600 transition-colors font-medium text-sm"
              >
                {item.label}
              </Link>
            ))}
            <LanguageSwitcher />
            {/* Primary CTA in header - Bronze/Copper premium style */}
            <button
              onClick={handleCall}
              className={`
                bg-gradient-to-r from-amber-700 via-amber-600 to-amber-700
                text-white rounded-xl
                hover:from-amber-800 hover:via-amber-700 hover:to-amber-800
                transition-all duration-200
                font-semibold text-sm
                shadow-md hover:shadow-lg
                inline-flex items-center gap-2
                border border-amber-500/30
                ${isScrolled ? 'px-4 py-2' : 'px-5 py-2.5'}
              `}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              {t('callNow')}
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-3">
            <LanguageSwitcher />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-zinc-700 p-2"
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
          <nav className="lg:hidden py-4 space-y-2 border-t border-black/5">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-zinc-800 hover:text-primary-600 py-2 font-medium"
              >
                {item.label}
              </Link>
            ))}
            <div className="flex gap-2 pt-4">
              <button
                onClick={handleCall}
                className="flex-1 bg-gradient-to-r from-amber-700 via-amber-600 to-amber-700 text-white px-4 py-3 rounded-xl hover:from-amber-800 hover:via-amber-700 hover:to-amber-800 font-semibold shadow-md"
              >
                {t('callNow')}
              </button>
              <button
                onClick={handleWhatsApp}
                className="flex-1 bg-green-600 text-white px-4 py-3 rounded-xl hover:bg-green-700 font-semibold shadow-md border border-green-500/30"
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
