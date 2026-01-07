'use client';

import { useState, useCallback, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';
import { trackWhatsApp } from '@/lib/analytics';
import type { CtaLocation } from '@/lib/constants';
import {
  WHATSAPP_NUMBER,
  MessageLanguage,
  LANGUAGE_LABELS,
  buildWhatsAppUrl,
  buildGeneralMessage,
  buildQuickVipMessage,
  getStoredLanguage,
  storeLanguage,
} from '@/lib/whatsapp';

interface WhatsAppQuickCTAProps {
  type: 'general' | 'vip';
  className?: string;
  buttonText?: string;
  ctaLocation?: CtaLocation;
}

export default function WhatsAppQuickCTA({ 
  type = 'general',
  className = '',
  buttonText,
  ctaLocation = 'hero',
}: WhatsAppQuickCTAProps) {
  const [showModal, setShowModal] = useState(false);
  const [messageLang, setMessageLang] = useState<MessageLanguage>('tr');
  const locale = useLocale();
  const pathname = usePathname() || '/';
  const tWa = useTranslations('whatsapp');
  const tCommon = useTranslations('common');
  
  // Initialize language from localStorage on mount
  useEffect(() => {
    setMessageLang(getStoredLanguage(locale));
  }, [locale]);

  const handleOpenModal = useCallback(() => {
    setShowModal(true);
  }, []);

  const handleSelectLanguage = useCallback((lang: MessageLanguage) => {
    storeLanguage(lang);
    trackWhatsApp({
      locale,
      pagePath: pathname,
      ctaLocation,
    });
    
    const message = type === 'vip' 
      ? buildQuickVipMessage(lang)
      : buildGeneralMessage(lang);
    
    const url = buildWhatsAppUrl(WHATSAPP_NUMBER, message);
    window.open(url, '_blank');
    setShowModal(false);
  }, [type, locale, pathname, ctaLocation]);

  const handleCloseModal = useCallback(() => {
    setShowModal(false);
  }, []);

  return (
    <>
      <button
        onClick={handleOpenModal}
        className={`btn-whatsapp px-8 py-4 text-lg inline-flex items-center justify-center gap-2 ${className}`}
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
        {buttonText || tCommon('whatsappButton')}
      </button>

      {/* Language Selection Modal */}
      {showModal && (
        <div 
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={handleCloseModal}
        >
          <div 
            className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-semibold mb-2 text-center text-basalt-900">
              {tWa('selectLanguageTitle')}
            </h3>
            <p className="text-sm text-basalt-600 text-center mb-6">
              {tWa('selectLanguageSubtitle')}
            </p>
            
            <div className="space-y-2">
              {(Object.keys(LANGUAGE_LABELS) as MessageLanguage[]).map((lang) => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => handleSelectLanguage(lang)}
                  className={`w-full px-4 py-3 rounded-xl text-left font-medium transition-colors flex items-center justify-between ${
                    messageLang === lang
                      ? 'bg-primary-100 text-primary-800 border-2 border-primary-500'
                      : 'bg-sand-50 text-basalt-700 hover:bg-sand-100 border-2 border-transparent'
                  }`}
                >
                  <span>{LANGUAGE_LABELS[lang]}</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={handleCloseModal}
              className="w-full py-2 mt-4 text-basalt-600 hover:text-basalt-800 transition-colors"
            >
              {tWa('cancel')}
            </button>
          </div>
        </div>
      )}
    </>
  );
}

