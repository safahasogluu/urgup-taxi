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

export function trackEvent(
  action: string,
  category?: string,
  label?: string,
  value?: number
) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
}

export function trackCall() {
  trackEvent('click_call', 'engagement', 'phone_button');
}

export function trackWhatsApp() {
  trackEvent('click_whatsapp', 'engagement', 'whatsapp_button');
}

export function trackBookingSubmit() {
  trackEvent('submit_booking', 'conversion', 'booking_form');
}

