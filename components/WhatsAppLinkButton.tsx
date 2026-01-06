'use client';

import { ReactNode } from 'react';
import { useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';
import { trackWhatsApp } from '@/lib/analytics';

type CtaLocation = 'header' | 'footer' | 'hero';

type WhatsAppLinkButtonProps = {
  href: string;
  children: ReactNode;
  className?: string;
  ctaLocation?: CtaLocation;
  newTab?: boolean;
};

export default function WhatsAppLinkButton({
  href,
  children,
  className = '',
  ctaLocation = 'hero',
  newTab = true,
}: WhatsAppLinkButtonProps) {
  const locale = useLocale();
  const pathname = usePathname() || '/';

  const handleClick = () => {
    trackWhatsApp({
      locale,
      pagePath: pathname,
      ctaLocation,
    });

    if (newTab) {
      window.open(href, '_blank', 'noopener,noreferrer');
      return;
    }

    window.location.href = href;
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={className}
    >
      {children}
    </button>
  );
}
