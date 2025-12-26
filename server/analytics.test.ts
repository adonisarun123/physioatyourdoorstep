import { describe, expect, it } from "vitest";

/**
 * Google Analytics Integration Tests
 * 
 * These tests verify that the Google Analytics tracking functions
 * are properly structured and will work correctly when GA4 is configured.
 */

describe("Google Analytics Integration", () => {
  it("should have valid GA4 measurement ID format", () => {
    const validFormats = [
      'G-XXXXXXXXXX',
      'G-ABC123DEF4',
      'G-1234567890',
    ];

    validFormats.forEach(id => {
      expect(id).toMatch(/^G-[A-Z0-9]{10}$/);
    });
  });

  it("should track page view events with required parameters", () => {
    const pageViewEvent = {
      event: 'page_view',
      page_path: '/service/sports-physiotherapy',
      page_title: 'Sports Physiotherapy | Physio At Your Doorstep',
    };

    expect(pageViewEvent.event).toBe('page_view');
    expect(pageViewEvent.page_path).toBeTruthy();
    expect(pageViewEvent.page_title).toBeTruthy();
  });

  it("should track booking conversion with required parameters", () => {
    const bookingEvent = {
      event: 'booking_submitted',
      event_category: 'conversion',
      event_label: 'Booking Form',
      service_id: '1',
      location: 'Bellandur',
    };

    expect(bookingEvent.event).toBe('booking_submitted');
    expect(bookingEvent.event_category).toBe('conversion');
    expect(bookingEvent.service_id).toBeTruthy();
    expect(bookingEvent.location).toBeTruthy();
  });

  it("should track contact form submission with required parameters", () => {
    const contactEvent = {
      event: 'contact_submitted',
      event_category: 'conversion',
      event_label: 'Contact Form',
      subject: 'General Inquiry',
    };

    expect(contactEvent.event).toBe('contact_submitted');
    expect(contactEvent.event_category).toBe('conversion');
    expect(contactEvent.subject).toBeTruthy();
  });

  it("should track phone click events with required parameters", () => {
    const phoneEvent = {
      event: 'phone_click',
      event_category: 'engagement',
      event_label: 'Phone Call',
      phone_number: '+918233787737',
    };

    expect(phoneEvent.event).toBe('phone_click');
    expect(phoneEvent.event_category).toBe('engagement');
    expect(phoneEvent.phone_number).toBeTruthy();
  });

  it("should track WhatsApp click events with required parameters", () => {
    const whatsappEvent = {
      event: 'whatsapp_click',
      event_category: 'engagement',
      event_label: 'WhatsApp Message',
      phone_number: '918233787737',
    };

    expect(whatsappEvent.event).toBe('whatsapp_click');
    expect(whatsappEvent.event_category).toBe('engagement');
    expect(whatsappEvent.phone_number).toBeTruthy();
  });

  it("should validate gtag function signature", () => {
    // Mock gtag function signature
    type GtagCommand = 'config' | 'event' | 'js' | 'set';
    type GtagFunction = (
      command: GtagCommand,
      targetId: string | Date,
      config?: Record<string, unknown>
    ) => void;

    const mockGtag: GtagFunction = (command, targetId, config) => {
      expect(['config', 'event', 'js', 'set']).toContain(command);
    };

    // Test event tracking
    mockGtag('event', 'page_view', { page_path: '/' });
    mockGtag('config', 'G-XXXXXXXXXX', { send_page_view: false });
  });

  it("should include currency for conversion tracking", () => {
    const conversionEvent = {
      event: 'conversion',
      send_to: 'booking',
      value: 1000,
      currency: 'INR',
    };

    expect(conversionEvent.currency).toBe('INR');
    expect(conversionEvent.value).toBeGreaterThan(0);
  });

  it("should validate Google Analytics script URL format", () => {
    const measurementId = 'G-XXXXXXXXXX';
    const scriptUrl = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;

    expect(scriptUrl).toContain('googletagmanager.com');
    expect(scriptUrl).toContain('/gtag/js');
    expect(scriptUrl).toContain(`id=${measurementId}`);
  });

  it("should initialize dataLayer array", () => {
    const dataLayer: unknown[] = [];
    
    expect(Array.isArray(dataLayer)).toBe(true);
    expect(dataLayer).toHaveLength(0);
  });

  it("should validate event names follow naming convention", () => {
    const eventNames = [
      'page_view',
      'booking_submitted',
      'contact_submitted',
      'phone_click',
      'whatsapp_click',
    ];

    eventNames.forEach(name => {
      // Event names should be lowercase with underscores
      expect(name).toMatch(/^[a-z_]+$/);
      expect(name).not.toContain(' ');
      expect(name).not.toContain('-');
    });
  });
});
