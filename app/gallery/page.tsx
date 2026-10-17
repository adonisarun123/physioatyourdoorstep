import CTABar from "@/components/CTABar";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import EventGallery, { EventVideo } from "@/components/EventGallery";
import Link from "next/link";
import { Briefcase, Building2, Calendar, Camera, Images, MapPin, Phone, Sparkles, Video } from "lucide-react";
import { GALLERY_EVENTS, GALLERY_TOTALS } from "@/lib/gallery";
import { SITE, absoluteUrl } from "@/lib/seo";
import type { Metadata } from "next";

const lead = GALLERY_EVENTS[0];

export const metadata: Metadata = {
    title: "Gallery — Corporate Wellness & Ergonomic Sessions",
    description:
        "Photos and video from Physio At Your Doorstep's corporate wellness work, including the Quess Corp : Ergonomic Session — posture, desk stretches and workplace ergonomics for teams in Bengaluru.",
    alternates: { canonical: "/gallery" },
    openGraph: {
        title: "Gallery — Corporate Wellness & Ergonomic Sessions",
        url: "/gallery",
        type: "website",
        images: [lead.photos[0].src],
    },
};

const gallerySchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${absoluteUrl("/gallery")}#webpage`,
    url: absoluteUrl("/gallery"),
    name: "Gallery — Physio At Your Doorstep",
    description:
        "Photos and videos from Physio At Your Doorstep's corporate wellness and ergonomic sessions.",
    about: { "@id": `${SITE.url}/#organization` },
    isPartOf: { "@id": `${SITE.url}/#website` },
    hasPart: GALLERY_EVENTS.map((e) => ({
        "@type": "ImageGallery",
        "@id": `${absoluteUrl("/gallery")}#${e.slug}`,
        name: e.title,
        description: e.summary,
        datePublished: e.dateISO,
        creator: { "@id": `${SITE.url}/#organization` },
        image: e.photos.map((p) => ({
            "@type": "ImageObject",
            contentUrl: absoluteUrl(p.src),
            name: p.caption,
            caption: p.alt,
            width: p.width,
            height: p.height,
        })),
        ...(e.video
            ? {
                  video: {
                      "@type": "VideoObject",
                      name: e.video.title,
                      description: e.video.description,
                      contentUrl: absoluteUrl(e.video.src),
                      thumbnailUrl: absoluteUrl(e.video.poster),
                      uploadDate: e.dateISO,
                      duration: e.video.duration,
                  },
              }
            : {}),
    })),
};

export default function GalleryPage() {
    return (
        <div className="min-h-screen flex flex-col">
            <JsonLd data={gallerySchema} />
            <Header />

            <main className="flex-1">
                {/* Hero */}
                <section className="relative overflow-hidden bg-[#1C1C3F] text-white">
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute -right-32 -top-32 h-[28rem] w-[28rem] rounded-full bg-[#E31E24]/25 blur-3xl"
                    />
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute -bottom-40 -left-24 h-[26rem] w-[26rem] rounded-full bg-[#5B5BA8]/40 blur-3xl"
                    />
                    <div className="container relative py-16 md:py-24">
                        <div className="max-w-3xl">
                            <span className="pill border border-white/20 bg-white/10 text-white">
                                <Camera className="h-4 w-4" />
                                Gallery
                            </span>
                            <h1 className="heading-hero mt-5 mb-5 !text-white md:!text-5xl lg:!text-6xl tracking-tight">
                                Wellness, <span className="text-[#FF5A5F]">in the field</span>
                            </h1>
                            <p className="max-w-2xl text-lg leading-relaxed text-white/75">
                                Moments from our corporate wellness programmes — physiotherapists on the office
                                floor, teaching teams how to sit, stretch and work without pain.
                            </p>
                        </div>

                        <dl className="mt-10 grid max-w-xl grid-cols-3 gap-4 border-t border-white/15 pt-6">
                            {[
                                { k: "Events", v: GALLERY_TOTALS.events, icon: Sparkles },
                                { k: "Photos", v: GALLERY_TOTALS.photos, icon: Images },
                                { k: "Videos", v: GALLERY_TOTALS.videos, icon: Video },
                            ].map(({ k, v, icon: Icon }) => (
                                <div key={k}>
                                    <dt className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-white/60">
                                        <Icon className="h-3.5 w-3.5" />
                                        {k}
                                    </dt>
                                    <dd className="mt-1 text-3xl font-bold">{String(v).padStart(2, "0")}</dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </section>

                {/* Breadcrumbs */}
                <div className="container pt-6">
                    <Breadcrumbs items={[{ name: "Gallery" }]} />
                </div>

                {/* Events */}
                {GALLERY_EVENTS.map((e) => (
                    <section key={e.slug} id={e.slug} className="section scroll-mt-24 bg-white">
                        <div className="container">
                            {/* Event header */}
                            <div className="mb-10 grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-end">
                                <div>
                                    <p className="mb-3 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-[#E31E24]">
                                        <Briefcase className="h-4 w-4" />
                                        {e.kind}
                                    </p>
                                    <h2 className="text-3xl font-bold leading-tight text-[#1F2933] md:text-4xl">
                                        {e.title}
                                    </h2>
                                    <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-[#4B5563]">
                                        <span className="inline-flex items-center gap-1.5">
                                            <Building2 className="h-4 w-4 text-[#3B3B6D]" />
                                            {e.client}
                                        </span>
                                        <time dateTime={e.dateISO} className="inline-flex items-center gap-1.5">
                                            <Calendar className="h-4 w-4 text-[#3B3B6D]" />
                                            {e.dateLabel}
                                        </time>
                                        <span className="inline-flex items-center gap-1.5">
                                            <MapPin className="h-4 w-4 text-[#3B3B6D]" />
                                            {e.location}
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <p className="leading-relaxed text-[#4B5563]">{e.summary}</p>
                                    <ul className="mt-4 flex flex-wrap gap-2">
                                        {e.highlights.map((h) => (
                                            <li
                                                key={h}
                                                className="rounded-full border border-[#DCDCEC] bg-[#EEEEF7] px-3 py-1 text-xs font-medium text-[#2A2A57]"
                                            >
                                                {h}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {e.video && (
                                <div className="mb-6 md:mb-8">
                                    <EventVideo video={e.video} />
                                </div>
                            )}

                            <EventGallery photos={e.photos} />
                        </div>
                    </section>
                ))}

                {/* Corporate CTA */}
                <section className="section-sm">
                    <div className="container">
                        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#2A2A57] to-[#3B3B6D] px-6 py-12 text-center text-white md:px-12 md:py-16">
                            <div
                                aria-hidden="true"
                                className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#E31E24]/30 blur-3xl"
                            />
                            <div className="relative mx-auto max-w-2xl">
                                <h2 className="mb-3 text-2xl font-bold md:text-3xl">
                                    Bring an ergonomic session to your office
                                </h2>
                                <p className="mb-7 text-white/80">
                                    On-site posture assessments, desk-stretch routines and Q&amp;A with a
                                    qualified physiotherapist — tailored to your team&apos;s workday.
                                </p>
                                <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                                    <Link
                                        href="/contact-us"
                                        className="inline-flex items-center justify-center rounded-full bg-[#E31E24] px-6 py-3 font-semibold text-white transition hover:bg-[#c8181d]"
                                    >
                                        Plan a Corporate Session
                                    </Link>
                                    <a
                                        href={`tel:${SITE.phoneRaw}`}
                                        className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
                                    >
                                        <Phone className="h-4 w-4" />
                                        {SITE.phone}
                                    </a>
                                </div>
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
