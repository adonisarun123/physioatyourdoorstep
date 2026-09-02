import CTABar from "@/components/CTABar";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import CareerForm from "@/components/CareerForm";
import Link from "next/link";
import {
    ArrowRight,
    BriefcaseMedical,
    CalendarClock,
    CheckCircle2,
    GraduationCap,
    HeartHandshake,
    MapPin,
    Phone,
    Route,
    Users,
} from "lucide-react";
import {
    EMPLOYMENT_TYPES,
    REQUIREMENTS,
    RESPONSIBILITIES,
    WHAT_WE_OFFER,
    ZONES,
    areasByZone,
    careerPath,
    getAllCareerAreas,
} from "@/lib/careers";
import { SITE, absoluteUrl, faqSchema } from "@/lib/seo";
import type { Metadata } from "next";

const areas = getAllCareerAreas();

export const metadata: Metadata = {
    title: "Careers | Physiotherapist Jobs in Bangalore — Full-time, Part-time & Freelance",
    description:
        "Physiotherapist jobs across Bangalore with Physio At Your Doorstep. Full-time, part-time and freelance home-visit roles in Koramangala, HSR Layout, Whitefield, Indiranagar, Electronic City and 19 more areas. BPT minimum, MPT preferred. Apply with your CV.",
    alternates: { canonical: "/careers" },
    openGraph: {
        title: "Careers — Physiotherapist Jobs in Bangalore",
        url: "/careers",
        type: "website",
        images: ["/images/logo-square.webp"],
    },
};

const FAQS = [
    {
        q: "What qualification do I need to apply?",
        a: "A BPT (Bachelor of Physiotherapy) is the minimum. An MPT is preferred, particularly for neurological, sports and paediatric cases. We also look for 1–2 years of hands-on clinical experience.",
    },
    {
        q: "Do I need my own vehicle?",
        a: "Yes. All our work is home visits within an assigned area, so you need your own two-wheeler and a smartphone. We assign patients close to where you are based so travel time stays low.",
    },
    {
        q: "Can I work part-time or freelance alongside my clinic job?",
        a: "Yes. Many of our physiotherapists work part-time in fixed morning or evening slots, or take cases per visit on a freelance basis. There is no exclusivity clause — you can keep your own practice or clinic role running.",
    },
    {
        q: "What does the pay look like?",
        a: "Compensation depends on your qualification, experience and the engagement type — full-time, part-time or per visit. We discuss it openly at the interview stage, and the figures are agreed before you take your first patient.",
    },
    {
        q: "My area isn't listed. Can I still apply?",
        a: "Yes. Choose 'Other area in Bangalore' in the application form and tell us where you are based. We are expanding across the city and open new areas as soon as we have both patient demand and a physiotherapist to cover it.",
    },
    {
        q: "How soon will I hear back?",
        a: "Our clinical team reviews every CV. If your profile fits an area we are currently hiring for, we usually call within a few working days for a short conversation, followed by a clinical discussion.",
    },
];

const highlights = [
    { icon: Route, title: "Work in your own area", text: "Patients are assigned close to where you live, so you spend your day treating rather than commuting." },
    { icon: Users, title: "300+ physiotherapists", text: "Join a clinical network across Bangalore and Pune, with senior physiotherapists to consult on hard cases." },
    { icon: CalendarClock, title: "Schedules that flex", text: "Full-time, part-time or per-visit freelance — pick the shape that fits your life, not the other way around." },
    { icon: BriefcaseMedical, title: "A real case mix", text: "Sports, post-operative, orthopaedic, neurological, geriatric and paediatric rehab — not the same complaint every day." },
];

export default function CareersPage() {
    const collection = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "@id": `${absoluteUrl("/careers")}#webpage`,
        url: absoluteUrl("/careers"),
        name: `Physiotherapist Jobs in Bangalore — ${SITE.name}`,
        description:
            "Open physiotherapist positions across Bangalore: full-time, part-time and freelance home-visit roles.",
        about: { "@id": `${SITE.url}/#organization` },
        isPartOf: { "@id": `${SITE.url}/#website` },
        mainEntity: {
            "@type": "ItemList",
            numberOfItems: areas.length,
            itemListElement: areas.map((a, i) => ({
                "@type": "ListItem",
                position: i + 1,
                name: `Physiotherapist Jobs in ${a.area}`,
                url: absoluteUrl(careerPath(a.slug)),
            })),
        },
    };

    return (
        <div className="min-h-screen flex flex-col">
            <JsonLd data={[collection, faqSchema(FAQS)]} />
            <Header />

            <main className="flex-1">
                {/* Hero */}
                <section className="relative bg-gradient-to-br from-[#EEEEF7] via-white to-[#EEEEF7] section">
                    <div className="container">
                        <div className="max-w-3xl mx-auto text-center">
                            <span className="pill bg-[#3B3B6D]/10 text-[#2A2A57] border border-[#DCDCEC]">
                                <BriefcaseMedical className="h-4 w-4" />
                                We&apos;re hiring across Bangalore
                            </span>
                            <h1 className="heading-hero mt-4 mb-4">
                                Physiotherapist Jobs in <span className="text-[#E31E24]">Bangalore</span>
                            </h1>
                            <p className="text-lg text-[#4B5563] leading-relaxed mb-6">
                                Full-time, part-time and freelance home-visit roles across {areas.length} areas of the
                                city. BPT minimum, MPT preferred — and if your area isn&apos;t on the list, tell us
                                where you are.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                                <a href="#apply" className="btn-primary">
                                    Apply Now <ArrowRight className="h-4 w-4" />
                                </a>
                                <a href="#areas" className="btn-secondary">
                                    <MapPin className="h-4 w-4" /> See open areas
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="container pt-6">
                    <Breadcrumbs items={[{ name: "Careers" }]} />
                </div>

                {/* Why join */}
                <section className="section bg-white">
                    <div className="container">
                        <div className="max-w-2xl mb-10">
                            <h2 className="text-2xl md:text-3xl font-bold text-[#1F2933] mb-3">
                                Why physiotherapists join us
                            </h2>
                            <p className="text-[#4B5563] leading-relaxed">
                                We started in 2021 with a simple idea — when travelling to a clinic is hard, the
                                physiotherapy should come to the patient. That only works with physiotherapists who can
                                run a session properly in someone&apos;s living room.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {highlights.map((h) => (
                                <div key={h.title} className="card-physio h-full">
                                    <h.icon className="h-7 w-7 text-[#3B3B6D] mb-4" aria-hidden="true" />
                                    <h3 className="font-semibold text-[#1F2933] mb-2">{h.title}</h3>
                                    <p className="text-sm text-[#4B5563] leading-relaxed">{h.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Engagement types */}
                <section className="section bg-[#EEEEF7]">
                    <div className="container">
                        <h2 className="text-2xl md:text-3xl font-bold text-[#1F2933] mb-3">Three ways to work with us</h2>
                        <p className="text-[#4B5563] mb-10 max-w-2xl">
                            Every area below is open for all three. Tell us which suits you in the application form.
                        </p>
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

                {/* Role detail */}
                <section className="section bg-white">
                    <div className="container">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="card-physio">
                                <HeartHandshake className="h-7 w-7 text-[#3B3B6D] mb-4" aria-hidden="true" />
                                <h2 className="text-xl font-bold text-[#1F2933] mb-4">What you&apos;ll do</h2>
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
                                <h2 className="text-xl font-bold text-[#1F2933] mb-4">What we need from you</h2>
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
                        <p className="mt-6 text-sm text-[#6B7280]">
                            Compensation is discussed openly at the interview stage and depends on your qualification,
                            experience and whether you join full-time, part-time or per visit.
                        </p>
                    </div>
                </section>

                {/* Open areas */}
                <section id="areas" className="section bg-[#EEEEF7] scroll-mt-24">
                    <div className="container">
                        <h2 className="text-2xl md:text-3xl font-bold text-[#1F2933] mb-3">
                            Open positions by area
                        </h2>
                        <p className="text-[#4B5563] mb-10 max-w-2xl">
                            Each area has its own page with the local case mix and the localities you&apos;d cover.
                            Don&apos;t see yours? Apply anyway and pick &ldquo;Other area in Bangalore&rdquo;.
                        </p>

                        <div className="space-y-10">
                            {ZONES.map((zone) => (
                                <div key={zone}>
                                    <h3 className="text-sm font-semibold uppercase tracking-wide text-[#3B3B6D] mb-4">
                                        {zone}
                                    </h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {areasByZone(zone).map((a) => (
                                            <Link
                                                key={a.slug}
                                                href={careerPath(a.slug)}
                                                className="group flex items-center justify-between gap-3 rounded-xl bg-white border border-[#DCDCEC] px-5 py-4 transition-all hover:border-[#3B3B6D] hover:shadow-[0_10px_30px_rgba(35,35,74,0.10)]"
                                            >
                                                <span className="min-w-0">
                                                    <span className="block font-semibold text-[#1F2933] group-hover:text-[#3B3B6D]">
                                                        {a.area}
                                                    </span>
                                                    <span className="block text-xs text-[#6B7280] mt-0.5">
                                                        Full-time · Part-time · Freelance
                                                    </span>
                                                </span>
                                                <ArrowRight className="h-4 w-4 text-[#3B3B6D] flex-shrink-0 transition-transform group-hover:translate-x-0.5" />
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="card-soft mt-10 bg-white border border-[#DCDCEC]">
                            <h3 className="font-semibold text-[#1F2933] mb-2">Your area isn&apos;t listed?</h3>
                            <p className="text-sm text-[#4B5563] leading-relaxed">
                                We&apos;re expanding across Bangalore — Yelahanka, Hebbal, Rajajinagar, Malleshwaram,
                                Kengeri, Banaswadi, Hennur, KR Puram and beyond. Apply with &ldquo;Other area in
                                Bangalore&rdquo; selected and tell us where you&apos;re based; we open new areas as soon
                                as we have a physiotherapist to cover them.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Apply */}
                <section id="apply" className="section bg-white scroll-mt-24">
                    <div className="container">
                        <div className="max-w-3xl mx-auto">
                            <div className="text-center mb-8">
                                <h2 className="text-2xl md:text-3xl font-bold text-[#1F2933] mb-3">
                                    Apply for a physiotherapist role
                                </h2>
                                <p className="text-[#4B5563]">
                                    One form, all areas and all three engagement types. Attach your CV and our clinical
                                    team will take it from there.
                                </p>
                            </div>
                            <div className="card-physio">
                                <CareerForm />
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQ */}
                <section className="section bg-[#EEEEF7]">
                    <div className="container">
                        <div className="max-w-3xl mx-auto">
                            <h2 className="text-2xl md:text-3xl font-bold text-[#1F2933] mb-8 text-center">
                                Questions candidates ask
                            </h2>
                            <div className="space-y-4">
                                {FAQS.map((f) => (
                                    <details key={f.q} className="group rounded-xl bg-white border border-[#DCDCEC] p-5">
                                        <summary className="cursor-pointer font-semibold text-[#1F2933] marker:content-[''] flex items-center justify-between gap-4">
                                            {f.q}
                                            <span className="text-[#3B3B6D] transition-transform group-open:rotate-45 text-xl leading-none">
                                                +
                                            </span>
                                        </summary>
                                        <p className="mt-3 text-sm text-[#4B5563] leading-relaxed">{f.a}</p>
                                    </details>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Contact fallback */}
                <section className="section-sm bg-white">
                    <div className="container">
                        <div className="max-w-2xl mx-auto text-center">
                            <h2 className="text-xl font-bold text-[#1F2933] mb-3">Prefer to talk first?</h2>
                            <p className="text-[#4B5563] mb-6">
                                Call or WhatsApp us and ask for the clinical team — we&apos;re happy to answer questions
                                before you apply.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                                <a href={`tel:${SITE.phoneRaw}`} className="btn-primary">
                                    <Phone className="h-4 w-4" /> {SITE.phone}
                                </a>
                                <a
                                    href="https://wa.me/918233787737?text=Hi, I'm a physiotherapist interested in working with Physio At Your Doorstep."
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-secondary"
                                >
                                    WhatsApp the team
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
            <CTABar />
        </div>
    );
}
