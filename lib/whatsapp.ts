/**
 * WhatsApp Lead System - Unified message builders and helpers
 * No emojis to avoid character encoding issues
 */

export const WHATSAPP_NUMBER = '905355481178';

export type MessageLanguage = 'tr' | 'en' | 'ko' | 'ja' | 'zh-hans';

export interface TransferFormData {
  pickup: string;
  dropoff: string;
  date: string;
  time: string;
  passengers: string;
  luggage: string;
  hotel: string;
  flightNo?: string;
}

// Language labels for the selector
export const LANGUAGE_LABELS: Record<MessageLanguage, string> = {
  tr: 'Turkce',
  en: 'English',
  ko: '한국어',
  ja: '日本語',
  'zh-hans': '中文',
};

/**
 * Normalize phone number to digits only
 */
export function normalizePhone(phone: string): string {
  return phone.replace(/[^0-9]/g, '');
}

/**
 * Build WhatsApp URL with properly encoded message
 */
export function buildWhatsAppUrl(phone: string, message: string): string {
  const normalizedPhone = normalizePhone(phone);
  return `https://wa.me/${normalizedPhone}?text=${encodeURIComponent(message)}`;
}

/**
 * Get stored language preference or fallback to locale
 */
export function getStoredLanguage(currentLocale: string): MessageLanguage {
  if (typeof window === 'undefined') return currentLocale as MessageLanguage;
  
  const stored = localStorage.getItem('whatsapp_lang');
  if (stored && Object.keys(LANGUAGE_LABELS).includes(stored)) {
    return stored as MessageLanguage;
  }
  
  // Fallback to site locale
  if (Object.keys(LANGUAGE_LABELS).includes(currentLocale)) {
    return currentLocale as MessageLanguage;
  }
  
  return 'en';
}

/**
 * Store language preference
 */
export function storeLanguage(lang: MessageLanguage): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('whatsapp_lang', lang);
}

// ============================================
// MESSAGE LABELS BY LANGUAGE (no emojis)
// ============================================

interface MessageLabels {
  airportTitle: string;
  vipTitle: string;
  taxiTitle: string;
  generalTitle: string;
  pickup: string;
  dropoff: string;
  date: string;
  time: string;
  passengers: string;
  luggage: string;
  hotel: string;
  flightNo: string;
  requestInfo: string;
  vipNote: string;
  generalNote: string;
  driverSection: string;
}

const LABELS: Record<MessageLanguage, MessageLabels> = {
  tr: {
    airportTitle: 'HAVAALANI TRANSFER TALEBI',
    vipTitle: 'VIP TRANSFER TALEBI',
    taxiTitle: 'KAPADOKYA TAKSI TALEBI',
    generalTitle: 'TRANSFER BILGI TALEBI',
    pickup: 'Kalkis',
    dropoff: 'Varis',
    date: 'Tarih',
    time: 'Saat',
    passengers: 'Yolcu',
    luggage: 'Bagaj',
    hotel: 'Otel/Adres',
    flightNo: 'Ucus No',
    requestInfo: 'Lutfen fiyat ve musaitlik bilgisi verir misiniz?',
    vipNote: 'Konforlu arac talep ediyorum.',
    generalNote: 'Transfer hizmeti hakkinda bilgi almak istiyorum.',
    driverSection: 'SOFOR ICIN',
  },
  en: {
    airportTitle: 'AIRPORT TRANSFER REQUEST',
    vipTitle: 'VIP TRANSFER REQUEST',
    taxiTitle: 'CAPPADOCIA TAXI REQUEST',
    generalTitle: 'TRANSFER INQUIRY',
    pickup: 'Pickup',
    dropoff: 'Dropoff',
    date: 'Date',
    time: 'Time',
    passengers: 'Passengers',
    luggage: 'Luggage',
    hotel: 'Hotel/Address',
    flightNo: 'Flight No',
    requestInfo: 'Please provide price and availability.',
    vipNote: 'I would like a comfortable vehicle.',
    generalNote: 'I would like information about transfer services.',
    driverSection: 'FOR DRIVER',
  },
  ko: {
    airportTitle: '공항 픽업 요청',
    vipTitle: 'VIP 픽업 요청',
    taxiTitle: '카파도키아 택시 요청',
    generalTitle: '픽업 문의',
    pickup: '픽업 장소',
    dropoff: '도착지',
    date: '날짜',
    time: '시간',
    passengers: '승객',
    luggage: '수하물',
    hotel: '호텔/주소',
    flightNo: '항공편',
    requestInfo: '가격과 예약 가능 여부를 알려주세요.',
    vipNote: '편안한 차량을 원합니다.',
    generalNote: '픽업 서비스에 대한 정보를 원합니다.',
    driverSection: 'FOR DRIVER',
  },
  ja: {
    airportTitle: '空港送迎リクエスト',
    vipTitle: 'VIP送迎リクエスト',
    taxiTitle: 'カッパドキアタクシーリクエスト',
    generalTitle: '送迎お問い合わせ',
    pickup: 'ピックアップ',
    dropoff: '降車場所',
    date: '日付',
    time: '時間',
    passengers: '乗客',
    luggage: '荷物',
    hotel: 'ホテル/住所',
    flightNo: 'フライト番号',
    requestInfo: '料金と空き状況を教えてください。',
    vipNote: '快適な車両を希望します。',
    generalNote: '送迎サービスについて情報を希望します。',
    driverSection: 'FOR DRIVER',
  },
  'zh-hans': {
    airportTitle: '机场接送请求',
    vipTitle: 'VIP接送请求',
    taxiTitle: '卡帕多西亚出租车请求',
    generalTitle: '接送咨询',
    pickup: '接送地点',
    dropoff: '目的地',
    date: '日期',
    time: '时间',
    passengers: '乘客',
    luggage: '行李',
    hotel: '酒店/地址',
    flightNo: '航班号',
    requestInfo: '请提供价格和可用性信息。',
    vipNote: '我想要一辆舒适的车辆。',
    generalNote: '我想了解接送服务的信息。',
    driverSection: 'FOR DRIVER',
  },
};

// Turkish labels for driver section (always used)
const TR_DRIVER_LABELS = {
  pickup: 'Kalkis',
  dropoff: 'Varis',
  date: 'Tarih',
  time: 'Saat',
  passengers: 'Yolcu',
  luggage: 'Bagaj',
  hotel: 'Otel',
  flightNo: 'Ucus',
  generalNote: 'Genel bilgi talebi',
};

// ============================================
// MESSAGE BUILDERS
// ============================================

/**
 * Build driver summary section - ALWAYS in Turkish with populated values
 */
function buildDriverSection(data: TransferFormData): string {
  const lines: string[] = [
    '---',
    `[${TR_DRIVER_LABELS.pickup}: ${data.pickup || '-'}]`,
    `[${TR_DRIVER_LABELS.dropoff}: ${data.dropoff || '-'}]`,
    `[${TR_DRIVER_LABELS.date}: ${data.date || '-'} / ${TR_DRIVER_LABELS.time}: ${data.time || '-'}]`,
    `[${TR_DRIVER_LABELS.passengers}: ${data.passengers || '-'} / ${TR_DRIVER_LABELS.luggage}: ${data.luggage || '-'}]`,
  ];
  
  if (data.hotel) {
    lines.push(`[${TR_DRIVER_LABELS.hotel}: ${data.hotel}]`);
  }
  
  if (data.flightNo) {
    lines.push(`[${TR_DRIVER_LABELS.flightNo}: ${data.flightNo}]`);
  }
  
  return lines.join('\n');
}

/**
 * Build Airport Transfer message
 */
export function buildAirportTransferMessage(data: TransferFormData, lang: MessageLanguage): string {
  const labels = LABELS[lang];
  
  const customerSection = [
    `=== ${labels.airportTitle} ===`,
    '',
    `${labels.pickup}: ${data.pickup}`,
    `${labels.dropoff}: ${data.dropoff}`,
    `${labels.date}: ${data.date}`,
    `${labels.time}: ${data.time}`,
    `${labels.passengers}: ${data.passengers}`,
    `${labels.luggage}: ${data.luggage}`,
    `${labels.hotel}: ${data.hotel}`,
    data.flightNo ? `${labels.flightNo}: ${data.flightNo}` : '',
    '',
    labels.requestInfo,
  ].filter(Boolean).join('\n');
  
  // For Turkish, no need for duplicate driver section
  if (lang === 'tr') {
    return customerSection;
  }
  
  // For other languages, add Turkish driver section
  const driverSection = buildDriverSection(data);
  
  return `${customerSection}\n\n${driverSection}`;
}

/**
 * Build VIP Transfer message
 */
export function buildVipTransferMessage(data: TransferFormData, lang: MessageLanguage): string {
  const labels = LABELS[lang];
  
  const customerSection = [
    `=== ${labels.vipTitle} ===`,
    '',
    `${labels.pickup}: ${data.pickup}`,
    `${labels.dropoff}: ${data.dropoff}`,
    `${labels.date}: ${data.date}`,
    `${labels.time}: ${data.time}`,
    `${labels.passengers}: ${data.passengers}`,
    `${labels.luggage}: ${data.luggage}`,
    `${labels.hotel}: ${data.hotel}`,
    '',
    labels.vipNote,
    labels.requestInfo,
  ].join('\n');
  
  if (lang === 'tr') {
    return customerSection;
  }
  
  const driverSection = buildDriverSection(data);
  
  return `${customerSection}\n\n${driverSection}`;
}

/**
 * Build Taxi message
 */
export function buildTaxiMessage(data: TransferFormData, lang: MessageLanguage): string {
  const labels = LABELS[lang];
  
  const customerSection = [
    `=== ${labels.taxiTitle} ===`,
    '',
    `${labels.pickup}: ${data.pickup}`,
    `${labels.dropoff}: ${data.dropoff}`,
    `${labels.date}: ${data.date}`,
    `${labels.time}: ${data.time}`,
    `${labels.passengers}: ${data.passengers}`,
    '',
    labels.requestInfo,
  ].join('\n');
  
  if (lang === 'tr') {
    return customerSection;
  }
  
  const driverSection = [
    '---',
    `[${TR_DRIVER_LABELS.pickup}: ${data.pickup || '-'}]`,
    `[${TR_DRIVER_LABELS.dropoff}: ${data.dropoff || '-'}]`,
    `[${TR_DRIVER_LABELS.date}: ${data.date || '-'} / ${TR_DRIVER_LABELS.time}: ${data.time || '-'}]`,
    `[${TR_DRIVER_LABELS.passengers}: ${data.passengers || '-'}]`,
  ].join('\n');
  
  return `${customerSection}\n\n${driverSection}`;
}

/**
 * Build General inquiry message (for home page and generic CTAs)
 */
export function buildGeneralMessage(lang: MessageLanguage, context?: { pickup?: string; dropoff?: string }): string {
  const labels = LABELS[lang];
  
  const customerSection = [
    `=== ${labels.generalTitle} ===`,
    '',
    labels.generalNote,
    '',
    labels.requestInfo,
  ].join('\n');
  
  if (lang === 'tr') {
    // For Turkish, add a note about what info would be helpful
    return `${customerSection}\n\n---\n[${TR_DRIVER_LABELS.generalNote}]`;
  }
  
  // For other languages, add Turkish driver note
  const driverNote = context?.pickup && context?.dropoff
    ? `[${TR_DRIVER_LABELS.pickup}: ${context.pickup}] [${TR_DRIVER_LABELS.dropoff}: ${context.dropoff}]`
    : `[${TR_DRIVER_LABELS.generalNote}]`;
  
  return `${customerSection}\n\n---\n${driverNote}`;
}

/**
 * Get a simple general message for quick CTAs (no form)
 */
export function buildQuickVipMessage(lang: MessageLanguage): string {
  const labels = LABELS[lang];
  
  const customerSection = [
    `=== ${labels.vipTitle} ===`,
    '',
    labels.vipNote,
    labels.requestInfo,
  ].join('\n');
  
  if (lang === 'tr') {
    return customerSection;
  }
  
  return `${customerSection}\n\n---\n[VIP transfer talebi - detaylar mesajda]`;
}

