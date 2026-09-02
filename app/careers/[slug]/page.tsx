import CTABar from "@/components/CTABar";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import CareerForm from "@/components/CareerForm";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
    ArrowRight,
    BriefcaseMedical,
    CheckCircle2,
    ClipboardList,
    GraduationCap,
    MapPin,
    Phone,
    Stethoscope,
} from "lucide-react";
import {
    CAREER_AREAS,
    EMPLOYMENT_TYPES,
    POSTED_ON,
    REQUIREMENTS,
    RESPONSIBILITIES,
    VALID_THROUGH,
    WHAT_WE_OFFER,
    careerPath,
    getCareerArea,
    jobDescriptionHtml,
} from "@/lib/careers";
import { SITE, absoluteUrl } from "@/lib/seo";
import type { Metadata } from "next";

/**
 * One job page per area we serve. The route segment is the FULL slug
 * ("physiotherapist-jobs-in-koramangala") so the URL carries the keyword;
 * lib/careers.ts stores the bare area slug and careerPath() joins the two.
 */
const PREFIX = "physiotherapist-jobs-in-";

export function generateStaticParams() {
    return CAREER_AREAS.map((a) => ({ slug: `${PREFIX}${a.slug}` }));
}

function areaFromParam(slug: string) {
    if (!slug.startsWith(PREFIX)) return undefined;
    return getCareerArea(slug.slice(PREFIX.length));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const area = areaFromParam(slug);
    if (!area) return {};

    const title = `Physiotherapist Jobs in ${area.area}, Bangalore | Full-time, Part-time & Freelance`;
    const description = `Hiring physiotherapists for home visits in ${area.area}, Bangalore — full-time, part-time or freelance. BPT minimum, MPT preferred, own two-wheeler required. Cover ${area.nearby.slice(0, 3).join(", ")} and nearby. Apply with your CV.`;

    return {
        title,
        description,
        alternates: { canonical: careerPath(area.slug) },
        openGraph: {
            title: `Physiotherapist Jobs in ${area.area}, Bangalore`,
            description,
            url: careerPath(area.slug),
            type: "website",
            images: ["/images/logo-square.webp"],
        },
    };
}

export default async function CareerAreaPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const area = areaFromParam(slug);
    if (!area) notFound();

    const url = absoluteUrl(careerPath(area.slug));
    const related = CAREER_AREAS.filter((a) => a.zone === area.zone && a.slug !== area.slug).slice(0, 5);

    const jobPosting = {
        "@context": "https://schema.org",
        "@type": "JobPosting",
        "@id": `${url}#jobposting`,
        title: `Physiotherapist — Home Visits (${area.area}, Bangalore)`,
        description: jobDescriptionHtml(area.area),
        identifier: {
            "@type": "PropertyValue",
            name: SITE.name,
            value: `PYD-PHYSIO-${area.slug.toUpperCase()}`,
        },
        datePosted: POSTED_ON,
        validThrough: VALID_THROUGH,
        employmentType: EMPLOYMENT_TYPES.map((t) => t.schemaType),
        hiringOrganization: {
            "@type": "Organization",
            name: SITE.name,
            sameAs: SITE.url,
            logo: absoluteUrl(SITE.logo),
        },
        jobLocation: {
            "@type": "Place",
            address: {
                "@type": "PostalAddress",
                streetAddress: `${area.area} and surrounding localities`,
                addressLocality: area.area,
                addressRegion: "Karnataka",
                addressCountry: "IN",
            },
        },
        applicantLocationRequirements: { "@type": "Country", name: "India" },
        directApply: true,
        industry: "Healthcare — Physiotherapy and Rehabilitation",
        occupationalCategory: "29-1123.00 Physical Therapists",
        educationRequirements: {
            "@type": "EducationalOccupationalCredential",
            credentialCategory: "bachelor degree",
            description: "BPT (Bachelor of Physiotherapy) minimum; MPT preferred.",
        },
        experienceRequirements: {
            "@type": "OccupationalExperienceRequirements",
            monthsOfExperience: 12,
        },
        responsibilities: RESPONSIBILITIES.join(" "),
        qualifications: REQUIREMENTS.join(" "),
        jobBenefits: WHAT_WE_OFFER.join(" "),
        url,
    };

    return (
        <div className="min-h-screen flex flex-col">
            <JsonLd data={jobPosting} />
            <Header />

            <main className="flex-1">
                {/* Hero */}
                <section className="relative bg-gradient-to-br from-[#EEEEF7] via-white to-[#EEEEF7] section">
                    <div className="container">
                        <div className="max-w-3xl mx-auto text-center">
                            <span className="pill bg-[#3B3B6D]/10 text-[#2A2A57] border border-[#DCDCEC]">
                                <MapPin className="h-4 w-4" />
                                {area.zone}
                            </span>
                            <h1 className="heading-hero mt-4 mb-4">
                                Physiotherapist Jobs in <span className="text-[#E31E24]">{area.area}</span>
                            </h1>
                            <p className="text-lg text-[#4B5563] leading-relaxed mb-6">
                                Home-visit physiotherapy roles in {area.area}, Bangalore — full-time, part-time or
                                freelance. BPT minimum, MPT preferred.
                            </p>
                            <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
                                {EMPLOYMENT_TYPES.map((t) => (
                                    <span
                                        key={t.id}
                                        className="rounded-full bg-white border border-[#DCDCEC] px-3 py-1 text-xs font-medium text-[#2A2A57]"
                                    >
                                        {t.label}
                                    </span>
                                ))}
                            </div>
                            <a href="#apply" className="btn-primary">
                                Apply for {area.area} <ArrowRight className="h-4 w-4" />
                            </a>
                        </div>
                    </div>
                </section>

                <div className="container pt-6">
                    <Breadcrumbs
                        items={[
                            { name: "Careers", href: "/careers" },
                            { name: `Physiotherapist Jobs in ${area.area}` },
                        ]}
                    />
                </div>

                {/* The area */}
                <section className="section bg-white">
                    <div className="container">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2">
                                <h2 className="text-2xl font-bold text-[#1F2933] mb-4">
                                    What the work looks like in {area.area}
                                </h2>
                                <p className="text-[#4B5563] leading-relaxed mb-6">{area.hook}</p>
                                <p className="text-[#4B5563] leading-relaxed mb-8">
                                    You would be the physiotherapist patients in {area.area} see at home — assessing,
                                    treating and progressing them across a course of sessions, with our clinical team
                                    and treatment protocols behind you. Patients come to us; you focus on the
                                    rehabilitation.
                                </p>

                                <h3 className="text-lg font-bold text-[#1F2933] mb-3">
                                    Cases you can expect here
                                </h3>
                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                                    {area.caseMix.map((c) => (
                                        <li key={c} className="flex items-start gap-2 text-sm text-[#4B5563]">
                                            <Stethoscope className="h-4 w-4 text-[#3B3B6D] mt-0.5 flex-shrink-0" />
                                            <span>{c}</span>
                                        </li>
                                    ))}
                                </ul>

                                <h3 className="text-lg font-bold text-[#1F2933] mb-3">Localities you&apos;d cover</h3>
                                <div className="flex flex-wrap gap-2">
                                    {area.nearby.map((n) => (
                                        <span
                                            key={n}
                                            className="rounded-full bg-[#EEEEF7] px-3 py-1 text-sm text-[#2A2A57]"
                                        >
                                            {n}
                                        </span>
                                    ))}
                                </div>

                                {area.locationSlug && (
                                    <p className="mt-6 text-sm text-[#4B5563]">
                                        Want to see what we tell patients in this area?{" "}
                                        <Link
                                            href={`/${area.locationSlug}`}
                                            className="font-semibold text-[#3B3B6D] hover:underline"
                                        >
                                            Our {area.area} physiotherapy page
                                        </Link>
                                        .
                                    </p>
                                )}
                            </div>

                            {/* Quick facts */}
                            <aside className="card-soft h-fit">
                                <h2 className="font-bold text-[#1F2933] mb-4">Role at a glance</h2>
                                <dl className="space-y-4 text-sm">
                                    <div>
                                        <dt className="text-[#6B7280]">Role</dt>
                                        <dd className="font-semibold text-[#1F2933]">Physiotherapist — home visits</dd>
                                    </div>
                                    <div>
                                        <dt className="text-[#6B7280]">Area</dt>
                                        <dd className="font-semibold text-[#1F2933]">{area.area}, Bangalore</dd>
                                    </div>
                                    <div>
                                        <dt className="text-[#6B7280]">Engagement</dt>
                                        <dd className="font-semibold text-[#1F2933]">
                                            Full-time · Part-time · Freelance
                                        </dd>
                                    </div>
                                    <div>
                                        <dt className="text-[#6B7280]">Qualification</dt>
                                        <dd className="font-semibold text-[#1F2933]">BPT minimum, MPT preferred</dd>
                                    </div>
                                    <div>
                                        <dt className="text-[#6B7280]">Experience</dt>
                                        <dd className="font-semibold text-[#1F2933]">1–2 years clinical</dd>
                                    </div>
                                    <div>
                                        <dt className="text-[#6B7280]">Transport</dt>
                                        <dd className="font-semibold text-[#1F2933]">Own two-wheeler required</dd>
                                    </div>
                                    <div>
                                        <dt className="text-[#6B7280]">Compensation</dt>
                                        <dd className="font-semibold text-[#1F2933]">
                                            Discussed at interview, based on experience
                                        </dd>
                                    </div>
                                </dl>
                                <a href="#apply" className="btn-primary w-full mt-6">
                                    Apply Now
                                </a>
                            </aside>
                        </div>
                    </div>
                </section>

                {/* Engagement types */}
                <section className="section bg-[#EEEEF7]">
                    <div className="container">
                        <h2 className="text-2xl font-bold text-[#1F2933] mb-8">
                            Choose how you work in {area.area}
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {EMPLOYMENT_TYPES.map((t) => (
                                <div key={t.id} className="rounded-2xl bg-white border border-[#DCDCEC] p-8 h-full">
                                    <h3 className="text-lg font-bold text-[#3B3B6D] mb-2">{t.label}</h3>
                                    <p className="text-sm text-[#4B5563] leading-relaxed mb-5">{t.summary}</p>
                                    <ul className="space-y-2">
                                        {t.points.map((p) => (
                                            <li key={p} className="flex items-start gap-2 text-sm text-[#1F2933]">
                                                <CheckCircle2 className="h-4 w-4 text-[#3B3B6D] mt-0.5 flex-shrink-0" />
                                                <span>{p}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Responsibilities / requirements / offer */}
                <section className="section bg-white">
                    <div className="container">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="card-physio">
                                <ClipboardList className="h-7 w-7 text-[#3B3B6D] mb-4" aria-hidden="true" />
                                <h2 className="text-xl font-bold text-[#1F2933] mb-4">Responsibilities</h2>
                                <ul className="space-y-3">
                                    {RESPONSIBILITIES.map((r) => (
                                        <li key={r} className="flex items-start gap-2 text-sm text-[#4B5563] leading-relaxed">
                                            <CheckCircle2 className="h-4 w-4 text-[#3B3B6D] mt-0.5 flex-shrink-0" />
                                            <span>{r}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="card-physio">
                                <GraduationCap className="h-7 w-7 text-[#3B3B6D] mb-4" aria-hidden="true" />
                                <h2 className="text-xl font-bold text-[#1F2933] mb-4">Requirements</h2>
                                <ul className="space-y-3">
                                    {REQUIREMENTS.map((r) => (
                                        <li key={r} className="flex items-start gap-2 text-sm text-[#4B5563] leading-relaxed">
                                            <CheckCircle2 className="h-4 w-4 text-[#3B3B6D] mt-0.5 flex-shrink-0" />
                                            <span>{r}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="card-physio">
                                <BriefcaseMedical className="h-7 w-7 text-[#3B3B6D] mb-4" aria-hidden="true" />
                                <h2 className="text-xl font-bold text-[#1F2933] mb-4">What we offer</h2>
                                <ul className="space-y-3">
                                    {WHAT_WE_OFFER.map((r) => (
                                        <li key={r} className="flex items-start gap-2 text-sm text-[#4B5563] leading-relaxed">
                                            <CheckCircle2 className="h-4 w-4 text-[#3B3B6D] mt-0.5 flex-shrink-0" />
                                            <span>{r}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Apply */}
                <section id="apply" className="section bg-[#EEEEF7] scroll-mt-24">
                    <div className="container">
                        <div className="max-w-3xl mx-auto">
                            <div className="text-center mb-8">
                                <h2 className="text-2xl md:text-3xl font-bold text-[#1F2933] mb-3">
                                    Apply — {area.area}
                                </h2>
                                <p className="text-[#4B5563]">
                                    Your area is pre-filled. Attach your CV and our clinical team will review it.
                                </p>
                            </div>
                            <div className="rounded-2xl bg-white border border-[#DCDCEC] p-6 sm:p-8">
                                <CareerForm defaultArea={area.area} />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Related areas */}
                <section className="section-sm bg-white">
                    <div className="container">
                        <h2 className="text-xl font-bold text-[#1F2933] mb-2">
                            Also hiring nearby in {area.zone}
                        </h2>
                        <p className="text-sm text-[#4B5563] mb-6">
                            Happy to travel a little further? These areas are open too.
                        </p>
                        <div className="flex flex-wrap gap-3">
                            {related.map((r) => (
                                <Link
                                    key={r.slug}
                                    href={careerPath(r.slug)}
                                    className="rounded-full border border-[#DCDCEC] bg-white px-4 py-2 text-sm font-medium text-[#2A2A57] transition-colors hover:border-[#3B3B6D] hover:text-[#3B3B6D]"
                                >
                                    {r.area}
                                </Link>
                            ))}
                            <Link
                                href="/careers"
                                className="rounded-full bg-[#3B3B6D] px-4 py-2 text-sm font-semibold text-white hover:bg-[#2A2A57]"
                            >
                                All areas
                            </Link>
                        </div>

                        <div className="mt-10 text-center">
                            <p className="text-[#4B5563] mb-4">
                                Questions before you apply? Ask for the clinical team.
                            </p>
                            <a href={`tel:${SITE.phoneRaw}`} className="btn-secondary">
                                <Phone className="h-4 w-4" /> {SITE.phone}
                            </a>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
            <CTABar />
        </div>
    );
}
