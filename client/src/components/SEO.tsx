import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  structuredData?: object | object[];
}

export default function SEO({ title, description, canonical, ogImage, structuredData }: SEOProps) {
  useEffect(() => {
    // Update title
    if (title) {
      document.title = title;
    }

    // Update meta description
    if (description) {
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.setAttribute('name', 'description');
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute('content', description);
    }

    // Update canonical URL
    if (canonical) {
      let linkCanonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (!linkCanonical) {
        linkCanonical = document.createElement('link');
        linkCanonical.setAttribute('rel', 'canonical');
        document.head.appendChild(linkCanonical);
      }
      linkCanonical.href = canonical;
    }

    // Update OG tags
    if (title) {
      let ogTitle = document.querySelector('meta[property="og:title"]');
      if (!ogTitle) {
        ogTitle = document.createElement('meta');
        ogTitle.setAttribute('property', 'og:title');
        document.head.appendChild(ogTitle);
      }
      ogTitle.setAttribute('content', title);
    }

    if (description) {
      let ogDesc = document.querySelector('meta[property="og:description"]');
      if (!ogDesc) {
        ogDesc = document.createElement('meta');
        ogDesc.setAttribute('property', 'og:description');
        document.head.appendChild(ogDesc);
      }
      ogDesc.setAttribute('content', description);
    }

    if (ogImage) {
      let ogImg = document.querySelector('meta[property="og:image"]');
      if (!ogImg) {
        ogImg = document.createElement('meta');
        ogImg.setAttribute('property', 'og:image');
        document.head.appendChild(ogImg);
      }
      ogImg.setAttribute('content', ogImage);
    }

    if (canonical) {
      let ogUrl = document.querySelector('meta[property="og:url"]');
      if (!ogUrl) {
        ogUrl = document.createElement('meta');
        ogUrl.setAttribute('property', 'og:url');
        document.head.appendChild(ogUrl);
      }
      ogUrl.setAttribute('content', canonical);
    }
  }, [title, description, canonical, ogImage]);

  return (
    <>
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              Array.isArray(structuredData) ? structuredData : [structuredData]
            ),
          }}
        />
      )}
    </>
  );
}

// Helper functions to generate structured data

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalBusiness',
    '@id': 'https://physioatyourdoorstep.com/#organization',
    name: 'Physio At Your Doorstep',
    alternateName: 'Physio@YourDoorstep',
    url: 'https://physioatyourdoorstep.com',
    logo: 'https://physioatyourdoorstep.com/logo.png',
    description: 'Professional physiotherapy services delivered to your home across India. Expert care for sports injuries, post-surgical rehabilitation, neurological conditions, and more.',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'IN',
      addressRegion: 'Karnataka',
      addressLocality: 'Bangalore',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+91-8233787737',
      contactType: 'Customer Service',
      availableLanguage: ['English', 'Hindi'],
      areaServed: ['IN'],
    },
    sameAs: [
      'https://www.facebook.com/physioatyourdoorstep',
      'https://www.instagram.com/physioatyourdoorstep',
      'https://www.linkedin.com/company/physioatyourdoorstep',
    ],
    priceRange: '$$',
    medicalSpecialty: [
      'Physiotherapy',
      'Sports Medicine',
      'Orthopedics',
      'Neurology',
      'Geriatrics',
      'Pediatrics',
    ],
  };
}

export function generateServiceSchema(service: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalTherapy',
    name: service.name,
    description: service.description,
    url: service.url,
    provider: {
      '@type': 'MedicalBusiness',
      name: 'Physio At Your Doorstep',
      url: 'https://physioatyourdoorstep.com',
    },
    areaServed: {
      '@type': 'Country',
      name: 'India',
    },
  };
}

export function generateFAQSchema(faqs: Array<{ q: string; a: string }>) {
  return {
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
}

export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function generateBlogPostingSchema(blog: {
  title: string;
  description: string;
  url: string;
  publishedAt: Date;
  modifiedAt?: Date;
  author?: string;
  image?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: blog.title,
    description: blog.description,
    url: blog.url,
    datePublished: blog.publishedAt.toISOString(),
    dateModified: blog.modifiedAt?.toISOString() || blog.publishedAt.toISOString(),
    author: {
      '@type': 'Organization',
      name: blog.author || 'Physio At Your Doorstep',
      url: 'https://physioatyourdoorstep.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Physio At Your Doorstep',
      url: 'https://physioatyourdoorstep.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://physioatyourdoorstep.com/logo.png',
      },
    },
    image: blog.image || 'https://physioatyourdoorstep.com/og-image.png',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': blog.url,
    },
  };
}

export function generateLocalBusinessSchema(location: {
  name: string;
  area: string;
  city: string;
  url: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalBusiness',
    name: location.name,
    description: `Professional physiotherapy services in ${location.area}, ${location.city}`,
    url: location.url,
    address: {
      '@type': 'PostalAddress',
      addressLocality: location.area,
      addressRegion: location.city,
      addressCountry: 'IN',
    },
    parentOrganization: {
      '@type': 'MedicalBusiness',
      name: 'Physio At Your Doorstep',
      url: 'https://physioatyourdoorstep.com',
    },
    telephone: '+91-8233787737',
    priceRange: '$$',
  };
}
