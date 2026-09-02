import CTABar from "@/components/CTABar";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import Link from "next/link";
import { ArrowUpRight, Calendar, Newspaper, Phone, Quote, User } from "lucide-react";
import { MEDIA_MENTIONS } from "@/lib/media";
import { SITE, absoluteUrl } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Media Coverage | Physio At Your Doorstep in the News",
    description:
        "Press coverage of Physio At Your Doorstep — read what The Hindustan Wires, The Entrepreneur Stories, The Business Stories and DailyHunt have written about our home physiotherapy service in Bangalore and Pune.",
    alternates: { canonical: "/media-coverage" },
    openGraph: {
        title: "Media Coverage",
        url: "/media-coverage",
        type: "website",
        images: ["/images/logo-square.webp"],
    },
};

const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${absoluteUrl("/media-coverage")}#webpage`,
    url: absoluteUrl("/media-coverage"),
    name: "Media Coverage — Physio At Your Doorstep",
    description:
        "Press and media coverage of Physio At Your Doorstep, a home physiotherapy service operating across Bangalore and Pune.",
    about: { "@id": `${SITE.url}/#organization` },
    isPartOf: { "@id": `${SITE.url}/#website` },
    mainEntity: {
        "@type": "ItemList",
        itemListOrder: "https://schema.org/ItemListOrderDescending",
        numberOfItems: MEDIA_MENTIONS.length,
        itemListElement: MEDIA_MENTIONS.map((m, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: {
                "@type": "NewsArticle",
                headline: m.headline,
                url: m.url,
                datePublished: m.datePublished,
                description: m.excerpt,
                ...(m.author ? { author: { "@type": "Person", name: m.author } } : {}),
                publisher: { "@type": "Organization", name: m.outlet },
                about: { "@id": `${SITE.url}/#organization` },
            },
        })),
    },
};

export default function MediaCoveragePage() {
    return (
        <div className="min-h-screen flex flex-col">
            <JsonLd data={collectionSchema} />
            <Header />

            <main className="flex-1">
                {/* Hero */}
                <section className="relative bg-gradient-to-br from-[#EEEEF7] via-white to-[#EEEEF7] section">
                    <div className="container">
                        <div className="max-w-3xl mx-auto text-center">
                            <span className="pill bg-[#3B3B6D]/10 text-[#2A2A57] border border-[#DCDCEC]">
                                <Newspaper className="h-4 w-4" />
                                In the News
                            </span>
                            <h1 className="heading-hero mt-4 mb-4">
                                Media <span className="text-[#E31E24]">Coverage</span>
                            </h1>
                            <p className="text-lg text-[#4B5563] leading-relaxed">
                                What the press has written about {SITE.name} — our founder, our
                                physiotherapist network, and the patients who make home rehabilitation work.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Breadcrumbs */}
                <div className="container pt-6">
                    <Breadcrumbs items={[{ name: "Media Coverage" }]} />
                </div>

                {/* Coverage summary strip */}
                <section className="pt-6">
                    <div className="container">
                        <div className="card-soft flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div className="flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-[#2A2A57]">
                                <span className="inline-flex items-center gap-2">
                                    <Newspaper className="h-4 w-4 text-[#3B3B6D]" />
                                    <strong className="font-semibold">{MEDIA_MENTIONS.length} publications</strong>
                                </span>
                                <span className="inline-flex items-center gap-2">
                                    <Calendar className="h-4 w-4 text-[#3B3B6D]" />
                                    Most recent: August 2026
                                </span>
                                <span className="inline-flex items-center gap-2">
                                    <User className="h-4 w-4 text-[#3B3B6D]" />
                                    Founder: {SITE.founder}
                                </span>
                            </div>
                            <p className="text-sm text-[#4B5563] sm:text-right">
                                Press enquiry?{" "}
                                <a
                                    href={`mailto:${SITE.email}`}
                                    className="font-semibold text-[#3B3B6D] hover:underline"
                                >
                                    Write to us
                                </a>
                            </p>
                        </div>
                    </div>
                </section>

                {/* Mention cards */}
                <section className="section bg-white">
                    <div className="container">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {MEDIA_MENTIONS.map((m) => (
                                <article
                                    key={m.url}
                                    className="card-physio group relative flex flex-col h-full"
                                >
                                    {/* Outlet */}
                                    <div className="flex items-center gap-3 mb-5">
                                        <span
                                            aria-hidden="true"
                                            className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-[#EEEEF7] text-sm font-bold tracking-wide text-[#3B3B6D] border border-[#DCDCEC]"
                                        >
                                            {m.initials}
                                        </span>
                                        <div className="min-w-0">
                                            <p className="font-semibold text-[#1F2933] leading-tight">
                                                {m.outlet}
                                            </p>
                                            <p className="text-xs text-[#6B7280] break-all">{m.domain}</p>
                                        </div>
                                    </div>

                                    {/* Meta */}
                                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#6B7280] mb-3">
                                        <time dateTime={m.datePublished} className="inline-flex items-center gap-1.5">
                                            <Calendar className="h-3.5 w-3.5" />
                                            {m.dateLabel}
                                        </time>
                                        {m.author && (
                                            <span className="inline-flex items-center gap-1.5">
                                                <User className="h-3.5 w-3.5" />
                                                {m.author}
                                            </span>
                                        )}
                                    </div>

                                    {/* Headline */}
                                    <h2 className="text-lg font-bold text-[#1F2933] leading-snug mb-3 transition-colors group-hover:text-[#3B3B6D]">
                                        <a
                                            href={m.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="after:absolute after:inset-0 after:content-[''] focus:outline-none focus-visible:underline"
                                        >
                                            {m.headline}
                                        </a>
                                    </h2>

                                    {/* Excerpt */}
                                    <div className="flex-1">
                                        <p className="text-sm text-[#4B5563] leading-relaxed">{m.excerpt}</p>

                                        {m.note && (
                                            <p className="mt-3 inline-flex w-fit rounded-full bg-[#EEEEF7] px-3 py-1 text-xs font-medium text-[#2A2A57]">
                                                {m.note}
                                            </p>
                                        )}
                                    </div>

                                    {/* Link */}
                                    <span className="mt-6 pt-5 border-t border-[#DCDCEC] inline-flex items-center gap-1.5 text-sm font-semibold text-[#3B3B6D]">
                                        Read on {m.outlet}
                                        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                    </span>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Pull quote */}
                <section className="section-sm bg-[#EEEEF7]">
                    <div className="container">
                        <figure className="max-w-3xl mx-auto text-center">
                            <Quote className="h-8 w-8 mx-auto text-[#3B3B6D] mb-4" aria-hidden="true" />
                            <blockquote className="text-xl md:text-2xl font-semibold leading-relaxed text-[#2A2A57]">
                                &ldquo;The most powerful measure of physiotherapy is not how long a patient
                                needs their therapist — but how confidently they can return to life without
                                one.&rdquo;
                            </blockquote>
                            <figcaption className="mt-4 text-sm text-[#4B5563]">
                                From{" "}
                                <cite className="not-italic font-medium">
                                    &ldquo;From Pain to Progress&rdquo;
                                </cite>
                                , August 2026
                            </figcaption>
                        </figure>
                    </div>
                </section>

                {/* CTA */}
                <section className="section bg-white">
                    <div className="container">
                        <div className="max-w-2xl mx-auto text-center">
                            <h2 className="text-2xl font-bold text-[#1F2933] mb-3">
                                Start your own recovery story
                            </h2>
                            <p className="text-[#4B5563] mb-6">
                                Expert physiotherapists at your home across Bangalore and Pune — available
                                24×7, with same-day appointments.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                                <Link href="/booking" className="btn-primary">
                                    Book an Appointment
                                </Link>
                                <a href={`tel:${SITE.phoneRaw}`} className="btn-secondary">
                                    <Phone className="h-4 w-4" />
                                    {SITE.phone}
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
