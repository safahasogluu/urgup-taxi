'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';

export default function Footer() {
  const t = useTranslations('common');
  const tNav = useTranslations('nav');
  const locale = useLocale();

  return (
    <footer className="bg-gray-900 text-white mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">{t('businessName')}</h3>
            <p className="text-gray-400 mb-4">{t('address')}</p>
            <p className="text-gray-400">{t('open247')}</p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Navigation</h4>
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
            <h4 className="text-lg font-semibold mb-4">{tNav('contact')}</h4>
            <p className="text-gray-400 mb-2">
              <a href={`tel:${t('phone')}`} className="hover:text-white">
                {t('phone')}
              </a>
            </p>
            <p className="text-gray-400">
              <a
                href={`https://wa.me/${t('whatsapp').replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                {t('whatsappButton')}
              </a>
            </p>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} {t('businessName')}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

