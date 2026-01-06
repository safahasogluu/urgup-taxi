'use client';

import { ReactNode } from 'react';
import { useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';
import { trackCall } from '@/lib/analytics';

type CtaLocation = 'header' | 'footer' | 'hero';

type CallCTAButtonProps = {
  phone: string;
  children: ReactNode;
  className?: string;
  ctaLocation?: CtaLocation;
};

export default function CallCTAButton({
  phone,
  children,
  className = '',
  ctaLocation = 'hero',
}: CallCTAButtonProps) {
  const locale = useLocale();
  const pathname = usePathname() || '/';

  const handleClick = () => {
    trackCall({
      locale,
      pagePath: pathname,
      ctaLocation,
    });
    window.location.href = `tel:${phone}`;
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
