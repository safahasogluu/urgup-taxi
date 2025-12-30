'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { locales } from '@/i18n';
import { useState, useRef, useEffect } from 'react';

const localeNames: Record<string, string> = {
  tr: 'TR',
  en: 'EN',
  ko: 'KO',
  ja: 'JA',
  'zh-hans': '中文',
};

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const switchLocale = (newLocale: string) => {
    setIsOpen(false);
    // Set cookie for persistence
    document.cookie = `NEXT_LOCALE=${newLocale};path=/;max-age=31536000;SameSite=Lax`;
    
    // Replace locale in pathname
    const segments = pathname.split('/');
    if (segments[1] && locales.includes(segments[1] as any)) {
      segments[1] = newLocale;
    } else {
      segments.splice(1, 0, newLocale);
    }
    const newPath = segments.join('/');
    router.push(newPath);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 px-3 py-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 transition-colors text-sm font-medium"
        aria-label="Change language"
      >
        <span>{localeNames[locale] || locale.toUpperCase()}</span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
          {locales.map((loc) => (
            <button
              key={loc}
              onClick={() => switchLocale(loc)}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors ${
                locale === loc ? 'bg-primary-50 text-primary-700 font-semibold' : 'text-gray-700'
              }`}
            >
              {localeNames[loc]} {locale === loc && '✓'}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

