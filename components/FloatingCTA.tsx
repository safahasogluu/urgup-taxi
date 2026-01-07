'use client';

import { useLocale, useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { trackCall, trackWhatsApp } from '@/lib/analytics';

interface FloatingCTAProps {
  routeInfo?: {
    from?: string;
    to?: string;
  };
}

/**
 * FloatingCTA Component
 * - Desktop: Floating phone button bottom-right
 * - Mobile: Fixed bottom bar with Call + WhatsApp
 */
export default function FloatingCTA({ routeInfo }: FloatingCTAProps) {
  const t = useTranslations('common');
  const tHub = useTranslations('hubPages');
  const locale = useLocale();
  const pathname = usePathname() || '/';
  const phone = t('phone');
  const whatsapp = t('whatsapp');

  const handleCall = () => {
    trackCall({
      locale,
      pagePath: pathname,
      ctaLocation: 'floating_cta',
    });
    window.location.href = `tel:${phone}`;
  };

  const handleWhatsApp = () => {
    trackWhatsApp({
      locale,
      pagePath: pathname,
      ctaLocation: 'floating_cta',
    });
    // Build prefilled message
    let message = tHub('whatsappMessage');
    if (routeInfo?.from) {
      message = message.replace('Pickup:', `Pickup: ${routeInfo.from}`);
      message = message.replace('Kalkış:', `Kalkış: ${routeInfo.from}`);
      message = message.replace('픽업:', `픽업: ${routeInfo.from}`);
      message = message.replace('ピックアップ:', `ピックアップ: ${routeInfo.from}`);
      message = message.replace('接送地点:', `接送地点: ${routeInfo.from}`);
    }
    if (routeInfo?.to) {
      message = message.replace('Dropoff:', `Dropoff: ${routeInfo.to}`);
      message = message.replace('Varış:', `Varış: ${routeInfo.to}`);
      message = message.replace('도착지:', `도착지: ${routeInfo.to}`);
      message = message.replace('行き先:', `行き先: ${routeInfo.to}`);
      message = message.replace('目的地:', `目的地: ${routeInfo.to}`);
    }
    window.open(
      `https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`,
      '_blank'
    );
  };

  return (
    <>
      {/* Desktop: Floating Phone Button - Bottom Right */}
      <div className="hidden md:block fixed bottom-6 right-6 z-50">
        <button
          onClick={handleCall}
          className="
            group relative
            bg-primary-700 hover:bg-primary-800
            text-white
            w-14 h-14 rounded-full
            shadow-lg hover:shadow-xl
            transition-all duration-300
            flex items-center justify-center
            hover:scale-110
            ring-4 ring-primary-200/50
          "
          aria-label={t('callNow')}
        >
          <svg
            className="w-6 h-6"
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

          {/* Tooltip on hover */}
          <span
            className="
              absolute right-full mr-3
              bg-basalt-900 text-white text-sm
              px-3 py-2 rounded-lg
              whitespace-nowrap
              opacity-0 group-hover:opacity-100
              transition-opacity duration-200
              pointer-events-none
            "
          >
            {t('callNow')}
          </span>

          {/* Pulse animation ring */}
          <span
            className="
              absolute inset-0
              rounded-full
              bg-primary-600
              animate-ping
              opacity-30
            "
            aria-hidden="true"
          />
        </button>
      </div>

      {/* Mobile: Fixed Bottom Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50">
        {/* Glass background */}
        <div
          className="
            bg-white/90 backdrop-blur-lg
            border-t border-warm-sandstone/30
            shadow-[0_-4px_20px_rgba(0,0,0,0.1)]
          "
        >
          <div className="container mx-auto px-4 py-3">
            <div className="flex gap-2">
              {/* Call Button */}
              <button
                onClick={handleCall}
                className="
                  flex-1
                  bg-primary-700 hover:bg-primary-800
                  text-white
                  px-4 py-3 rounded-xl
                  font-semibold
                  transition-colors
                  flex items-center justify-center gap-2
                  shadow-md
                "
              >
                <svg
                  className="w-5 h-5"
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

              {/* WhatsApp Button */}
              <button
                onClick={handleWhatsApp}
                className="
                  flex-1
                  bg-green-600 hover:bg-green-700
                  text-white
                  px-4 py-3 rounded-xl
                  font-semibold
                  transition-colors
                  flex items-center justify-center gap-2
                  shadow-md
                "
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                {t('whatsappButton')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
