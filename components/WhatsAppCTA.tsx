'use client';

import { useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { trackWhatsApp } from '@/lib/analytics';

interface WhatsAppCTAProps {
  routeFrom?: string;
  routeTo?: string;
  routeType?: 'airport' | 'vip' | 'taxi';
  className?: string;
  buttonText?: string;
}

type SupportedLanguage = 'tr' | 'en' | 'zh' | 'ja' | 'ko';

const languageLabels: Record<SupportedLanguage, string> = {
  tr: 'Türkçe',
  en: 'English',
  zh: '中文',
  ja: '日本語',
  ko: '한국어',
};

const languageFlags: Record<SupportedLanguage, string> = {
  tr: '🇹🇷',
  en: '🇬🇧',
  zh: '🇨🇳',
  ja: '🇯🇵',
  ko: '🇰🇷',
};

// Message templates - always include Turkish line for driver
function buildMessage(
  lang: SupportedLanguage,
  routeFrom: string,
  routeTo: string,
  routeType: 'airport' | 'vip' | 'taxi'
): string {
  const templates: Record<SupportedLanguage, Record<string, string>> = {
    tr: {
      airport: `🚗 Havalimanı Transfer Talebi

📍 Kalkış: ${routeFrom}
✈️ Varış: ${routeTo}
📅 Tarih: 
⏰ Saat: 
👥 Yolcu: 
🧳 Bagaj: 
🏨 Otel/Adres: 
✈️ Uçuş No (opsiyonel): 

Lütfen fiyat ve müsaitlik bilgisi verir misiniz?`,
      vip: `🚗 VIP Transfer Talebi

📍 Kalkış: ${routeFrom || '(belirtiniz)'}
📍 Varış: ${routeTo || '(belirtiniz)'}
📅 Tarih: 
⏰ Saat: 
👥 Yolcu: 
🧳 Bagaj: 

Konforlu araç talep ediyorum. Fiyat bilgisi alabilir miyim?`,
      taxi: `🚕 Kapadokya Taksi Talebi

📍 Alınacak yer: ${routeFrom || '(belirtiniz)'}
📍 Bırakılacak yer: ${routeTo || '(belirtiniz)'}
📅 Tarih: 
⏰ Saat: 
👥 Kişi sayısı: 

Fiyat bilgisi alabilir miyim?`,
    },
    en: {
      airport: `🚗 Airport Transfer Request

📍 Pickup: ${routeFrom}
✈️ Dropoff: ${routeTo}
📅 Date: 
⏰ Time: 
👥 Passengers: 
🧳 Luggage: 
🏨 Hotel/Address: 
✈️ Flight No (optional): 

---
🇹🇷 Şoför için / For driver:
Kalkış: ${routeFrom}
Varış: ${routeTo}
Tarih: / Saat: / Yolcu: / Bagaj:`,
      vip: `🚗 VIP Transfer Request

📍 Pickup: ${routeFrom || '(please specify)'}
📍 Dropoff: ${routeTo || '(please specify)'}
📅 Date: 
⏰ Time: 
👥 Passengers: 
🧳 Luggage: 

I would like a comfortable vehicle.

---
🇹🇷 Şoför için / For driver:
VIP transfer talebi
Kalkış: ${routeFrom || '?'} / Varış: ${routeTo || '?'}`,
      taxi: `🚕 Cappadocia Taxi Request

📍 Pickup: ${routeFrom || '(please specify)'}
📍 Dropoff: ${routeTo || '(please specify)'}
📅 Date: 
⏰ Time: 
👥 Passengers: 

---
🇹🇷 Şoför için / For driver:
Taksi talebi
Alınacak: ${routeFrom || '?'} / Bırakılacak: ${routeTo || '?'}`,
    },
    zh: {
      airport: `🚗 机场接送请求

📍 接送地点: ${routeFrom}
✈️ 目的地: ${routeTo}
📅 日期: 
⏰ 时间: 
👥 乘客人数: 
🧳 行李: 
🏨 酒店/地址: 
✈️ 航班号 (可选): 

---
🇹🇷 Şoför için / For driver:
Kalkış: ${routeFrom}
Varış: ${routeTo}
Tarih: / Saat: / Yolcu: / Bagaj:`,
      vip: `🚗 VIP接送请求

📍 接送地点: ${routeFrom || '(请说明)'}
📍 目的地: ${routeTo || '(请说明)'}
📅 日期: 
⏰ 时间: 
👥 乘客人数: 
🧳 行李: 

我需要舒适的车辆。

---
🇹🇷 Şoför için / For driver:
VIP transfer
Kalkış: ${routeFrom || '?'} / Varış: ${routeTo || '?'}`,
      taxi: `🚕 卡帕多西亚出租车请求

📍 接送地点: ${routeFrom || '(请说明)'}
📍 目的地: ${routeTo || '(请说明)'}
📅 日期: 
⏰ 时间: 
👥 乘客人数: 

---
🇹🇷 Şoför için / For driver:
Taksi talebi
Alınacak: ${routeFrom || '?'} / Bırakılacak: ${routeTo || '?'}`,
    },
    ja: {
      airport: `🚗 空港送迎リクエスト

📍 ピックアップ: ${routeFrom}
✈️ 行き先: ${routeTo}
📅 日付: 
⏰ 時間: 
👥 乗客数: 
🧳 荷物: 
🏨 ホテル/住所: 
✈️ フライト番号 (任意): 

---
🇹🇷 Şoför için / For driver:
Kalkış: ${routeFrom}
Varış: ${routeTo}
Tarih: / Saat: / Yolcu: / Bagaj:`,
      vip: `🚗 VIP送迎リクエスト

📍 ピックアップ: ${routeFrom || '(指定してください)'}
📍 行き先: ${routeTo || '(指定してください)'}
📅 日付: 
⏰ 時間: 
👥 乗客数: 
🧳 荷物: 

快適な車両を希望します。

---
🇹🇷 Şoför için / For driver:
VIP transfer
Kalkış: ${routeFrom || '?'} / Varış: ${routeTo || '?'}`,
      taxi: `🚕 カッパドキアタクシーリクエスト

📍 ピックアップ: ${routeFrom || '(指定してください)'}
📍 行き先: ${routeTo || '(指定してください)'}
📅 日付: 
⏰ 時間: 
👥 乗客数: 

---
🇹🇷 Şoför için / For driver:
Taksi talebi
Alınacak: ${routeFrom || '?'} / Bırakılacak: ${routeTo || '?'}`,
    },
    ko: {
      airport: `🚗 공항 픽업 요청

📍 픽업 장소: ${routeFrom}
✈️ 도착지: ${routeTo}
📅 날짜: 
⏰ 시간: 
👥 승객 수: 
🧳 수하물: 
🏨 호텔/주소: 
✈️ 항공편 번호 (선택): 

---
🇹🇷 Şoför için / For driver:
Kalkış: ${routeFrom}
Varış: ${routeTo}
Tarih: / Saat: / Yolcu: / Bagaj:`,
      vip: `🚗 VIP 픽업 요청

📍 픽업 장소: ${routeFrom || '(지정해 주세요)'}
📍 도착지: ${routeTo || '(지정해 주세요)'}
📅 날짜: 
⏰ 시간: 
👥 승객 수: 
🧳 수하물: 

편안한 차량을 원합니다.

---
🇹🇷 Şoför için / For driver:
VIP transfer
Kalkış: ${routeFrom || '?'} / Varış: ${routeTo || '?'}`,
      taxi: `🚕 카파도키아 택시 요청

📍 픽업 장소: ${routeFrom || '(지정해 주세요)'}
📍 도착지: ${routeTo || '(지정해 주세요)'}
📅 날짜: 
⏰ 시간: 
👥 승객 수: 

---
🇹🇷 Şoför için / For driver:
Taksi talebi
Alınacak: ${routeFrom || '?'} / Bırakılacak: ${routeTo || '?'}`,
    },
  };

  return templates[lang][routeType];
}

export default function WhatsAppCTA({ 
  routeFrom = '', 
  routeTo = '', 
  routeType = 'airport',
  className = '',
  buttonText,
}: WhatsAppCTAProps) {
  const [showModal, setShowModal] = useState(false);
  const t = useTranslations('common');
  const tWa = useTranslations('whatsapp');
  
  const whatsappNumber = t('whatsapp').replace(/[^0-9]/g, '');

  const handleOpenModal = useCallback(() => {
    setShowModal(true);
  }, []);

  const handleSelectLanguage = useCallback((lang: SupportedLanguage) => {
    trackWhatsApp();
    const message = buildMessage(lang, routeFrom, routeTo, routeType);
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
    setShowModal(false);
  }, [routeFrom, routeTo, routeType, whatsappNumber]);

  const handleCloseModal = useCallback(() => {
    setShowModal(false);
  }, []);

  return (
    <>
      <button
        onClick={handleOpenModal}
        className={`btn-whatsapp px-6 py-3 text-lg inline-flex items-center justify-center gap-2 ${className}`}
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
        {buttonText || tWa('getQuote')}
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
            <h3 className="text-xl font-semibold mb-4 text-center text-basalt-900">
              {tWa('selectLanguage')}
            </h3>
            <div className="grid grid-cols-1 gap-2">
              {(Object.keys(languageLabels) as SupportedLanguage[]).map((lang) => (
                <button
                  key={lang}
                  onClick={() => handleSelectLanguage(lang)}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-sand-100 transition-colors text-left border border-sand-200"
                >
                  <span className="text-2xl">{languageFlags[lang]}</span>
                  <span className="font-medium text-basalt-800">{languageLabels[lang]}</span>
                </button>
              ))}
            </div>
            <button
              onClick={handleCloseModal}
              className="mt-4 w-full py-2 text-basalt-600 hover:text-basalt-800 transition-colors"
            >
              {tWa('cancel')}
            </button>
          </div>
        </div>
      )}
    </>
  );
}

