/**
 * Centralised SEO configuration and JSON-LD structured-data builders.
 * Keep all schema.org output flowing through here so it stays consistent.
 */

export const SITE = {
    url: "https://www.physioatyourdoorstep.com",
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
    googleReviews: "https://share.google/XntoRQjyiP56KBl0I",
} as const;

/**
 * Full ISO-8601 datetime with an IST offset. Google requires a timezone on
 * VideoObject.uploadDate — a bare "YYYY-MM-DD" is flagged in Search Console as
 * "uploadDate is missing a timezone" / "Invalid datetime value".
 */
export function isoDateTimeIST(date: string): string {
    return /T\d/.test(date) ? date : `${date}T00:00:00+05:30`;
}

/** Absolute URL from a site-relative path. */
export function absoluteUrl(path = "/"): string {
    if (path.startsWith("http")) return path;
    return `${SITE.url}${path.startsWith("/") ? path : `/${path}`}`;
}

/**
 * The single site-wide business node (MedicalBusiness is an Organization subtype).
 * Only ONE node may use the `/#organization` @id — Google merges nodes that share
 * an @id, and duplicates caused "Review has multiple aggregate ratings" in GSC.
 *
 * No aggregateRating / review markup on purpose: Google does not show stars for
 * self-serving reviews on Organization/LocalBusiness, and our reviews come from
 * the Google Business Profile (third-party), which the review-snippet guidelines
 * disallow. Reviews stay visible on the page via components/GoogleReviews.tsx.
 */
export function organizationSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "MedicalBusiness",
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
        image: absoluteUrl(SITE.logo),
        telephone: SITE.phoneRaw,
        email: SITE.email,
        priceRange: SITE.priceRange,
        medicalSpecialty: "Physiotherapy",
        address: {
            "@type": "PostalAddress",
            addressLocality: "Bangalore",
            addressRegion: "Karnataka",
            addressCountry: "IN",
        },
        areaServed: SITE.areasServed.map((name) => ({ "@type": "City", name })),
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

/**
 * Area-level MedicalBusiness schema for location / service×area pages.
 * Without a url it returns the site-wide node so the `/#organization` @id is never
 * emitted twice with different contents.
 */
export function localBusinessSchema(opts?: { area?: string; city?: string; url?: string }) {
    if (!opts?.url) return organizationSchema();
    const area = opts?.area;
    const city = opts?.city ?? "Bangalore";
    return {
        "@context": "https://schema.org",
        "@type": "MedicalBusiness",
        "@id": `${absoluteUrl(opts.url)}#business`,
        name: area ? `${SITE.name} — ${area}` : SITE.name,
        url: absoluteUrl(opts.url),
        parentOrganization: { "@id": `${SITE.url}/#organization` },
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
