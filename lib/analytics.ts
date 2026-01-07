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

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const IS_PROD = process.env.NODE_ENV === 'production';
const GA_ENABLED = Boolean(GA_ID) && IS_PROD && process.env.NEXT_PUBLIC_GA_ENABLED !== 'false';

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

export type TrackEventInput = {
  action: string;
  category?: string;
  label?: string;
  value?: number;
  params?: Record<string, unknown>;
};

/**
 * Send event to GA4 (no-op if GA disabled or not loaded)
 */
export function trackEvent({
  action,
  category,
  label,
  value,
  params,
}: TrackEventInput): void {
  if (!GA_ENABLED || typeof window === 'undefined' || !window.gtag) return;

  const payload: Record<string, unknown> = { ...(params || {}) };

  if (category) payload.event_category = category;
  if (label) payload.event_label = label;
  if (typeof value === 'number') payload.value = value;

  window.gtag('event', action, payload);
}

// ===========================================
// STANDARDIZED EVENT TRACKERS
// ===========================================

/**
 * Track phone call click
 * Event name: phone_click
 * 
 * @example
 * trackCall({ locale: 'tr', pagePath: '/tr', ctaLocation: 'header' });
 */
export function trackCall(context?: EventContext): void {
  const params = buildEventParams(context);

  trackEvent({
    action: GA4_EVENTS.PHONE_CLICK,
    category: 'contact',
    params,
  });

  // Also track main hero CTA as a dedicated event
  if (context?.ctaLocation === 'hero') {
    trackEvent({
      action: GA4_EVENTS.CTA_CLICK,
      category: 'contact',
      params: { ...params, cta_primary: true },
    });
  }
}

/**
 * Track WhatsApp click
 * Event name: whatsapp_click
 * 
 * @example
 * trackWhatsApp({ locale: 'tr', pagePath: '/tr/vip-transfer', ctaLocation: 'hero' });
 */
export function trackWhatsApp(context?: EventContext): void {
  trackEvent({
    action: GA4_EVENTS.WHATSAPP_CLICK,
    category: 'contact',
    params: buildEventParams(context),
  });
}

/**
 * Track form submission
 * Event name: form_submit
 * 
 * @example
 * trackBookingSubmit({ locale: 'tr', pagePath: '/tr/rezervasyon', ctaLocation: 'booking_page' });
 */
export function trackBookingSubmit(context?: EventContext): void {
  trackEvent({
    action: GA4_EVENTS.FORM_SUBMIT,
    category: 'form',
    params: buildEventParams(context),
  });
}

// ===========================================
// EXTENDED TRACKING (for future use)
// ===========================================

/**
 * Track outbound link click
 * Useful for tracking clicks to external sites
 */
export function trackOutboundClick(url: string, context?: EventContext): void {
  trackEvent({
    action: 'outbound_click',
    category: 'navigation',
    params: {
      ...buildEventParams(context),
      outbound_url: url,
    },
  });
}

/**
 * Track language change
 */
export function trackLanguageChange(fromLocale: string, toLocale: string): void {
  trackEvent({
    action: 'language_change',
    category: 'navigation',
    params: {
      from_locale: fromLocale,
      to_locale: toLocale,
      page_path: getDefaultPagePath(),
    },
  });
}
