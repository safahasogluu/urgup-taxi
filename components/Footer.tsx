'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { trackCall, trackWhatsApp } from '@/lib/analytics';

export default function Footer() {
  const t = useTranslations('common');
  const tNav = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname() || '/';

  const handleCall = () => {
    trackCall({
      locale,
      pagePath: pathname,
      ctaLocation: 'footer',
    });
  };

  const handleWhatsApp = () => {
    trackWhatsApp({
      locale,
      pagePath: pathname,
      ctaLocation: 'footer',
    });
  };

  return (
    <footer className="bg-gray-900 text-white mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <h3 className="text-xl font-bold mb-4">{t('businessName')}</h3>
            <p className="text-gray-400 mb-4">{t('address')}</p>
            <p className="text-gray-400">{t('open247')}</p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">{t('navigation')}</h4>
            <ul className="space-y-2">
              <li>
                <Link href={`/${locale}`} className="text-gray-400 hover:text-white">
                  {tNav('home')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/vip-transfer`} className="text-gray-400 hover:text-white">
                  {tNav('vipTransfer')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/havalimani-transferi`} className="text-gray-400 hover:text-white">
                  {tNav('airportTransfer')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/fiyatlar`} className="text-gray-400 hover:text-white">
                  {tNav('pricing')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/rezervasyon`} className="text-gray-400 hover:text-white">
                  {tNav('booking')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/iletisim`} className="text-gray-400 hover:text-white">
                  {tNav('contact')}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">
              {locale === 'tr' ? 'Hızlı Linkler' : locale === 'en' ? 'Quick Links' : locale === 'ko' ? '빠른 링크' : locale === 'ja' ? 'クイックリンク' : '快速链接'}
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href={`/${locale}/urgup-taksi`} className="text-gray-400 hover:text-white">
                  {locale === 'tr' ? 'Ürgüp Taksi' : locale === 'en' ? 'Ürgüp Taxi' : locale === 'ko' ? '우르귀프 택시' : locale === 'ja' ? 'ウルギュップタクシー' : '于尔居普出租车'}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/uchisar-taksi`} className="text-gray-400 hover:text-white">
                  {locale === 'tr' ? 'Uçhisar Taksi' : locale === 'en' ? 'Uçhisar Taxi' : locale === 'ko' ? '우치히사르 택시' : locale === 'ja' ? 'ウチヒサルタクシー' : '乌奇希萨尔出租车'}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/transfer/urgup-nav-transfer`} className="text-gray-400 hover:text-white">
                  {locale === 'tr' ? 'Ürgüp NAV Transfer' : locale === 'en' ? 'Ürgüp NAV Transfer' : locale === 'ko' ? '우르귀프 NAV 픽업' : locale === 'ja' ? 'ウルギュップNAV送迎' : '于尔居普NAV接送'}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">{tNav('contact')}</h4>
            <p className="text-gray-400 mb-2">
              <a
                href={`tel:${t('phone')}`}
                className="hover:text-white"
                onClick={handleCall}
              >
                {t('phone')}
              </a>
            </p>
            <p className="text-gray-400 mb-4">
              <a
                href={`https://wa.me/${t('whatsapp').replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
                onClick={handleWhatsApp}
              >
                {t('whatsappButton')}
              </a>
            </p>
            
            {/* Google Review Button */}
            <Link
              href={`/${locale}/google-yorum`}
              className="inline-flex items-center gap-2 bg-white text-gray-900 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors text-sm"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" aria-hidden="true">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              {t('googleReviewButton')}
            </Link>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} {t('businessName')}. {t('allRightsReserved')}</p>
        </div>
      </div>
    </footer>
  );
}
