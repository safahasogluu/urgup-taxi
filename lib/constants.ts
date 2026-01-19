/**
 * Centralized constants for the application
 * UTM parameters, contact info, and other configuration
 */

// ===========================================
// CONTACT INFORMATION
// ===========================================

export const CONTACT = {
  phone: '+90 535 548 11 78',
  phoneRaw: '905355481178',
  email: 'info@urguptaxi.com',
  address: 'FATİH MAH. 328. SK. NO: 2 İÇ KAPI NO: 3, ÜRGÜP / NEVŞEHİR, TÜRKİYE',
} as const;

// ===========================================
// UTM PARAMETERS
// ===========================================

/**
 * UTM parameters for Google Business Profile (GBP) traffic
 * Use these when creating links that will be placed on GBP
 */
export const UTM_GBP = {
  utm_source: 'google',
  utm_medium: 'organic',
  utm_campaign: 'gbp',
  utm_content: 'profile',
} as const;

/**
 * Build UTM query string from parameters
 */
export function buildUtmQueryString(params: Record<string, string>): string {
  return new URLSearchParams(params).toString();
}

/**
 * Get GBP UTM query string ready to append to URLs
 * Returns: ?utm_source=google&utm_medium=organic&utm_campaign=gbp&utm_content=profile
 */
export function getGbpUtmQueryString(): string {
  return '?' + buildUtmQueryString(UTM_GBP);
}

/**
 * Build a URL with GBP UTM parameters
 * @param baseUrl - The base URL (e.g., https://www.urguptaxi.com)
 * @param path - Optional path (e.g., /tr/vip-transfer)
 */
export function buildGbpUrl(baseUrl: string, path: string = ''): string {
  const url = new URL(path, baseUrl);
  Object.entries(UTM_GBP).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });
  return url.toString();
}

// ===========================================
// GA4 EVENT NAMES (standardized)
// ===========================================

export const GA4_EVENTS = {
  PHONE_CLICK: 'phone_click',
  WHATSAPP_CLICK: 'whatsapp_click',
  FORM_SUBMIT: 'form_submit',
  CTA_CLICK: 'cta_click',
} as const;

// ===========================================
// CTA LOCATIONS (for event tracking)
// ===========================================

export type CtaLocation =
  | 'header'
  | 'footer'
  | 'hero'
  | 'sticky_cta'
  | 'floating_cta'
  | 'whatsapp_modal'
  | 'contact_page'
  | 'booking_page'
  | 'transfer_page'
  | 'location_page';

// ===========================================
// SITE CONFIGURATION
// ===========================================

export const SITE_CONFIG = {
  name: 'Göreme Taksi',
  url: 'https://www.urguptaxi.com',
  defaultLocale: 'tr',
  locales: ['tr', 'en', 'ko', 'ja', 'zh-hans'] as const,
} as const;
