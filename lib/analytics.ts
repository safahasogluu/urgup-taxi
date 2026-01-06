// Google Analytics 4 event tracking

declare global {
  interface Window {
    gtag?: (
      command: 'config' | 'event' | 'js' | 'set',
      targetId: string | Date,
      config?: {
        [key: string]: any;
      }
    ) => void;
  }
}

type CtaLocation = 'header' | 'footer' | 'hero';

type EventContext = {
  pagePath?: string;
  locale?: string;
  ctaLocation?: CtaLocation;
};

const getDefaultPagePath = () =>
  typeof window !== 'undefined' ? window.location.pathname : undefined;

function buildEventParams(context?: EventContext) {
  const pagePath = context?.pagePath || getDefaultPagePath();
  const params: Record<string, string> = {};

  if (pagePath) params.page_path = pagePath;
  if (context?.locale) params.locale = context.locale;
  if (context?.ctaLocation) params.cta_location = context.ctaLocation;

  return params;
}

export function trackEvent(action: string, params?: Record<string, unknown>) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, params || {});
  }
}

export function trackCall(context?: EventContext) {
  trackEvent('tel_click', buildEventParams(context));
}

export function trackWhatsApp(context?: EventContext) {
  trackEvent('whatsapp_click', buildEventParams(context));
}

export function trackBookingSubmit(context?: EventContext) {
  trackEvent('form_submit', buildEventParams(context));
}

