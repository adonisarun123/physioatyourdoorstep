/**
 * Centralised SEO configuration and JSON-LD structured-data builders.
 * Keep all schema.org output flowing through here so it stays consistent.
 */

export const SITE = {
    url: "https://physioatyourdoorstep.com",
    name: "Physio At Your Doorstep",
    legalName: "Physio At Your Doorstep",
    description:
        "Professional home physiotherapy across Bangalore and Pune. Expert care for pain relief, post-surgery recovery, neurological, geriatric, pediatric and sports rehabilitation — delivered at your doorstep.",
    phone: "+91 82337 87737",
    phoneRaw: "+918233787737",
    email: "physioatyourdoorstep24x7@gmail.com",
    logo: "/images/logo.webp",
    founder: "Dr. Atharva Mishra",
    areasServed: ["Bangalore", "Pune"],
    priceRange: "₹₹",
    tagline: "Let Your Pain Not Be Showstopper Of Your Life",
    socials: {
        linkedin: "https://www.linkedin.com/in/dr-atharva-mishra-pt-73717b215/",
        instagram: "https://www.instagram.com/physioatyourdoorstep/",
        youtube: "https://www.youtube.com/@physioatyourdoorstep",
    },
} as const;

/** Absolute URL from a site-relative path. */
export function absoluteUrl(path = "/"): string {
    if (path.startsWith("http")) return path;
    return `${SITE.url}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Organization / brand schema — used site-wide. */
export function organizationSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": `${SITE.url}/#organization`,
        name: SITE.name,
        legalName: SITE.legalName,
        url: SITE.url,
        logo: absoluteUrl(SITE.logo),
        description: SITE.description,
        slogan: SITE.tagline,
        founder: { "@type": "Person", name: SITE.founder },
        sameAs: Object.values(SITE.socials),
        contactPoint: {
            "@type": "ContactPoint",
            telephone: SITE.phoneRaw,
            contactType: "customer service",
            email: SITE.email,
            areaServed: SITE.areasServed,
            availableLanguage: ["en", "hi"],
        },
    };
}

/** WebSite schema — used site-wide. */
export function websiteSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": `${SITE.url}/#website`,
        url: SITE.url,
        name: SITE.name,
        description: SITE.description,
        publisher: { "@id": `${SITE.url}/#organization` },
    };
}

/** MedicalBusiness / LocalBusiness schema — used site-wide and on location pages. */
export function localBusinessSchema(opts?: { area?: string; city?: string; url?: string }) {
    const area = opts?.area;
    const city = opts?.city ?? "Bangalore";
    return {
        "@context": "https://schema.org",
        "@type": "MedicalBusiness",
        "@id": opts?.url ? `${absoluteUrl(opts.url)}#business` : `${SITE.url}/#organization`,
        name: area ? `${SITE.name} — ${area}` : SITE.name,
        url: opts?.url ? absoluteUrl(opts.url) : SITE.url,
        image: absoluteUrl(SITE.logo),
        logo: absoluteUrl(SITE.logo),
        description: SITE.description,
        telephone: SITE.phoneRaw,
        email: SITE.email,
        priceRange: SITE.priceRange,
        medicalSpecialty: "Physiotherapy",
        address: {
            "@type": "PostalAddress",
            addressLocality: area ?? city,
            addressRegion: city === "Pune" ? "Maharashtra" : "Karnataka",
            addressCountry: "IN",
        },
        areaServed: (area ? [area, city] : SITE.areasServed).map((name) => ({
            "@type": "City",
            name,
        })),
    };
}

/** MedicalProcedure/Service schema for a service page. */
export function serviceSchema(opts: { name: string; description: string; url: string }) {
    return {
        "@context": "https://schema.org",
        "@type": "MedicalTherapy",
        name: opts.name,
        description: opts.description,
        url: absoluteUrl(opts.url),
        provider: { "@id": `${SITE.url}/#organization` },
        areaServed: SITE.areasServed.map((name) => ({ "@type": "City", name })),
    };
}

/** BlogPosting/Article schema for a blog post. */
export function articleSchema(opts: {
    title: string;
    description: string;
    url: string;
    image?: string | null;
    datePublished?: string;
    dateModified?: string;
}) {
    return {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: opts.title,
        description: opts.description,
        url: absoluteUrl(opts.url),
        mainEntityOfPage: absoluteUrl(opts.url),
        ...(opts.image ? { image: absoluteUrl(opts.image) } : {}),
        ...(opts.datePublished ? { datePublished: opts.datePublished } : {}),
        dateModified: opts.dateModified ?? opts.datePublished,
        author: { "@type": "Organization", name: SITE.name, url: SITE.url },
        publisher: {
            "@type": "Organization",
            name: SITE.name,
            logo: { "@type": "ImageObject", url: absoluteUrl(SITE.logo) },
        },
    };
}

/** FAQPage schema from a list of Q/A pairs. */
export function faqSchema(faqs: { q: string; a: string }[]) {
    return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
    };
}
