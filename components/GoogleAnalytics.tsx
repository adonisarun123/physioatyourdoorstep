import { useEffect } from 'react';
import { useLocation } from 'wouter';

/**
 * Google Analytics 4 Integration Component
 * 
 * This component integrates Google Analytics 4 (GA4) for tracking:
 * - Page views
 * - User interactions
 * - Conversion events
 * - Custom events
 * 
 * Usage:
 * 1. Get your GA4 Measurement ID from Google Analytics (format: G-XXXXXXXXXX)
 * 2. Set it as an environment variable: VITE_GA_MEASUREMENT_ID
 * 3. Add this component to your App.tsx
 */

// Extend Window interface to include gtag
declare global {
  interface Window {
    gtag?: (
      command: 'config' | 'event' | 'js' | 'set',
      targetId: string | Date,
      config?: Record<string, unknown>
    ) => void;
    dataLayer?: unknown[];
  }
}

interface GoogleAnalyticsProps {
  measurementId?: string;
}

export default function GoogleAnalytics({ measurementId }: GoogleAnalyticsProps) {
  const [location] = useLocation();
  const GA_MEASUREMENT_ID = measurementId || import.meta.env.VITE_GA_MEASUREMENT_ID;

  useEffect(() => {
    // Only load GA if measurement ID is provided
    if (!GA_MEASUREMENT_ID) {
      console.warn('[Google Analytics] No measurement ID provided. Set VITE_GA_MEASUREMENT_ID environment variable.');
      return;
    }

    // Load Google Analytics script
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script1);

    // Initialize dataLayer and gtag
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag(...args: unknown[]) {
      window.dataLayer?.push(args);
    };
    window.gtag('js', new Date());
    window.gtag('config', GA_MEASUREMENT_ID, {
      send_page_view: false, // We'll manually track page views
    });

    return () => {
      // Cleanup: remove script on unmount
      document.head.removeChild(script1);
    };
  }, [GA_MEASUREMENT_ID]);

  // Track page views on route change
  useEffect(() => {
    if (!GA_MEASUREMENT_ID || !window.gtag) return;

    window.gtag('event', 'page_view', {
      page_path: location,
      page_title: document.title,
    });
  }, [location, GA_MEASUREMENT_ID]);

  return null; // This component doesn't render anything
}

/**
 * Track custom events
 * 
 * @param eventName - Name of the event (e.g., 'booking_submitted', 'contact_form_submitted')
 * @param eventParams - Additional parameters for the event
 */
export function trackEvent(eventName: string, eventParams?: Record<string, unknown>) {
  if (window.gtag) {
    window.gtag('event', eventName, eventParams);
  }
}

/**
 * Track conversion events
 * 
 * @param conversionName - Name of the conversion (e.g., 'booking', 'contact')
 * @param value - Optional monetary value
 * @param currency - Currency code (default: 'INR')
 */
export function trackConversion(
  conversionName: string,
  value?: number,
  currency: string = 'INR'
) {
  if (window.gtag) {
    window.gtag('event', 'conversion', {
      send_to: conversionName,
      value: value,
      currency: currency,
    });
  }
}

/**
 * Track phone number clicks
 */
export function trackPhoneClick(phoneNumber: string) {
  trackEvent('phone_click', {
    phone_number: phoneNumber,
    event_category: 'engagement',
    event_label: 'Phone Call',
  });
}

/**
 * Track WhatsApp clicks
 */
export function trackWhatsAppClick(phoneNumber: string) {
  trackEvent('whatsapp_click', {
    phone_number: phoneNumber,
    event_category: 'engagement',
    event_label: 'WhatsApp Message',
  });
}

/**
 * Track booking form submission
 */
export function trackBookingSubmission(serviceId: string, locationArea: string) {
  trackEvent('booking_submitted', {
    event_category: 'conversion',
    event_label: 'Booking Form',
    service_id: serviceId,
    location: locationArea,
  });
}

/**
 * Track contact form submission
 */
export function trackContactSubmission(subject: string) {
  trackEvent('contact_submitted', {
    event_category: 'conversion',
    event_label: 'Contact Form',
    subject: subject,
  });
}
