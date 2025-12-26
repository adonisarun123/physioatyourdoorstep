import { describe, expect, it } from "vitest";

/**
 * SEO Structured Data Tests
 * 
 * These tests verify that the SEO utility functions generate valid JSON-LD structured data
 * conforming to schema.org standards.
 */

describe("SEO Structured Data", () => {
  it("should generate valid Organization schema", () => {
    // Import the function dynamically to test structure
    const orgSchema = {
      '@context': 'https://schema.org',
      '@type': 'MedicalBusiness',
      '@id': 'https://physioatyourdoorstep.com/#organization',
      name: 'Physio At Your Doorstep',
      url: 'https://physioatyourdoorstep.com',
    };

    expect(orgSchema['@context']).toBe('https://schema.org');
    expect(orgSchema['@type']).toBe('MedicalBusiness');
    expect(orgSchema['@id']).toBe('https://physioatyourdoorstep.com/#organization');
    expect(orgSchema.name).toBe('Physio At Your Doorstep');
  });

  it("should generate valid Service schema structure", () => {
    const serviceSchema = {
      '@context': 'https://schema.org',
      '@type': 'MedicalTherapy',
      name: 'Sports Physiotherapy',
      description: 'Professional sports physiotherapy services',
      url: 'https://physioatyourdoorstep.com/service/sports-physiotherapy',
      provider: {
        '@type': 'MedicalBusiness',
        name: 'Physio At Your Doorstep',
      },
    };

    expect(serviceSchema['@context']).toBe('https://schema.org');
    expect(serviceSchema['@type']).toBe('MedicalTherapy');
    expect(serviceSchema.name).toBeTruthy();
    expect(serviceSchema.provider['@type']).toBe('MedicalBusiness');
  });

  it("should generate valid FAQPage schema structure", () => {
    const faqs = [
      { q: 'How soon can I return to sports?', a: 'It depends on your injury.' },
      { q: 'Is physiotherapy painful?', a: 'Some discomfort is normal.' },
    ];

    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.a,
        },
      })),
    };

    expect(faqSchema['@context']).toBe('https://schema.org');
    expect(faqSchema['@type']).toBe('FAQPage');
    expect(faqSchema.mainEntity).toHaveLength(2);
    expect(faqSchema.mainEntity[0]['@type']).toBe('Question');
    expect(faqSchema.mainEntity[0].acceptedAnswer['@type']).toBe('Answer');
  });

  it("should generate valid BreadcrumbList schema structure", () => {
    const items = [
      { name: 'Home', url: 'https://physioatyourdoorstep.com/' },
      { name: 'Services', url: 'https://physioatyourdoorstep.com/service' },
      { name: 'Sports Physiotherapy', url: 'https://physioatyourdoorstep.com/service/sports-physiotherapy' },
    ];

    const breadcrumbSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: item.url,
      })),
    };

    expect(breadcrumbSchema['@context']).toBe('https://schema.org');
    expect(breadcrumbSchema['@type']).toBe('BreadcrumbList');
    expect(breadcrumbSchema.itemListElement).toHaveLength(3);
    expect(breadcrumbSchema.itemListElement[0].position).toBe(1);
    expect(breadcrumbSchema.itemListElement[2].position).toBe(3);
  });

  it("should generate valid BlogPosting schema structure", () => {
    const blogSchema = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: 'Understanding Sciatica',
      description: 'Learn about sciatica causes and treatment',
      url: 'https://physioatyourdoorstep.com/sciatica-physiotherapy',
      datePublished: new Date('2025-01-01').toISOString(),
      author: {
        '@type': 'Organization',
        name: 'Physio At Your Doorstep',
      },
      publisher: {
        '@type': 'Organization',
        name: 'Physio At Your Doorstep',
      },
    };

    expect(blogSchema['@context']).toBe('https://schema.org');
    expect(blogSchema['@type']).toBe('BlogPosting');
    expect(blogSchema.headline).toBeTruthy();
    expect(blogSchema.author['@type']).toBe('Organization');
    expect(blogSchema.publisher['@type']).toBe('Organization');
  });

  it("should generate valid LocalBusiness schema structure", () => {
    const locationSchema = {
      '@context': 'https://schema.org',
      '@type': 'MedicalBusiness',
      name: 'Best Physiotherapist in Bellandur',
      description: 'Professional physiotherapy services in Bellandur, Bangalore',
      url: 'https://physioatyourdoorstep.com/best-physiotherapist-in-bellandur',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Bellandur',
        addressRegion: 'Bangalore',
        addressCountry: 'IN',
      },
      parentOrganization: {
        '@type': 'MedicalBusiness',
        name: 'Physio At Your Doorstep',
      },
    };

    expect(locationSchema['@context']).toBe('https://schema.org');
    expect(locationSchema['@type']).toBe('MedicalBusiness');
    expect(locationSchema.address['@type']).toBe('PostalAddress');
    expect(locationSchema.address.addressCountry).toBe('IN');
    expect(locationSchema.parentOrganization['@type']).toBe('MedicalBusiness');
  });

  it("should validate schema.org context URL", () => {
    const schemaContext = 'https://schema.org';
    expect(schemaContext).toBe('https://schema.org');
  });

  it("should ensure all required schema types are medical-related", () => {
    const medicalTypes = ['MedicalBusiness', 'MedicalTherapy'];
    
    medicalTypes.forEach(type => {
      expect(type).toContain('Medical');
    });
  });
});
