/**
 * Google Analytics 4 event tracking
 * Centralized event tracking with standardized event names and parameters
 */

import { GA4_EVENTS, type CtaLocation } from './constants';

declare global {
  interface Window {
    gtag?: (
      command: 'config' | 'event' | 'js' | 'set',
      targetId: string | Date,
      config?: Record<string, unknown>
    ) => void;
  }
}

// ===========================================
// EVENT CONTEXT
// ===========================================

export interface EventContext {
  /** Current page path (e.g., /tr/vip-transfer) */
  pagePath?: string;
  /** Current locale (e.g., tr, en, ko) */
  locale?: string;
  /** Location of the CTA that triggered the event */
  ctaLocation?: CtaLocation;
}

// ===========================================
// HELPERS
// ===========================================

/**
 * Get current page path from window.location
 */
function getDefaultPagePath(): string | undefined {
  return typeof window !== 'undefined' ? window.location.pathname : undefined;
}

/**
 * Build event parameters with consistent naming
 */
function buildEventParams(context?: EventContext): Record<string, string> {
  const pagePath = context?.pagePath || getDefaultPagePath();
  const params: Record<string, string> = {};

  if (pagePath) params.page_path = pagePath;
  if (context?.locale) params.locale = context.locale;
  if (context?.ctaLocation) params.cta_location = context.ctaLocation;

  return params;
}

// ===========================================
// CORE TRACKING FUNCTION
// ===========================================

/**
 * Send event to GA4
 * @param action - Event name (e.g., 'tel_click')
 * @param params - Event parameters
 */
export function trackEvent(action: string, params?: Record<string, unknown>): void {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, params || {});
    
    // Debug logging in development
    if (process.env.NODE_ENV === 'development') {
      console.log('[GA4 Event]', action, params);
    }
  }
}

// ===========================================
// STANDARDIZED EVENT TRACKERS
// ===========================================

/**
 * Track phone call click
 * Event name: tel_click
 * 
 * @example
 * trackCall({ locale: 'tr', pagePath: '/tr', ctaLocation: 'header' });
 */
export function trackCall(context?: EventContext): void {
  trackEvent(GA4_EVENTS.TEL_CLICK, buildEventParams(context));
}

/**
 * Track WhatsApp click
 * Event name: whatsapp_click
 * 
 * @example
 * trackWhatsApp({ locale: 'tr', pagePath: '/tr/vip-transfer', ctaLocation: 'hero' });
 */
export function trackWhatsApp(context?: EventContext): void {
  trackEvent(GA4_EVENTS.WHATSAPP_CLICK, buildEventParams(context));
}

/**
 * Track form submission
 * Event name: form_submit
 * 
 * @example
 * trackBookingSubmit({ locale: 'tr', pagePath: '/tr/rezervasyon', ctaLocation: 'booking_page' });
 */
export function trackBookingSubmit(context?: EventContext): void {
  trackEvent(GA4_EVENTS.FORM_SUBMIT, buildEventParams(context));
}

// ===========================================
// EXTENDED TRACKING (for future use)
// ===========================================

/**
 * Track outbound link click
 * Useful for tracking clicks to external sites
 */
export function trackOutboundClick(url: string, context?: EventContext): void {
  trackEvent('outbound_click', {
    ...buildEventParams(context),
    outbound_url: url,
  });
}

/**
 * Track language change
 */
export function trackLanguageChange(fromLocale: string, toLocale: string): void {
  trackEvent('language_change', {
    from_locale: fromLocale,
    to_locale: toLocale,
    page_path: getDefaultPagePath(),
  });
}
