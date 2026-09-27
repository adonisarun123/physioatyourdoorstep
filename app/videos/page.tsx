import CTABar from "@/components/CTABar";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import VideoGallery, { FeaturedVideo } from "@/components/VideoGallery";
import Link from "next/link";
import { HeartPulse, Dumbbell, Phone, PlayCircle, Trophy, Youtube } from "lucide-react";
import {
    CHANNEL_VIDEOS,
    FEATURED_VIDEO_ID,
    VIDEO_CATEGORIES,
    isoDuration,
    thumbnailUrl,
    watchUrl,
} from "@/lib/videos";
import { SITE, absoluteUrl } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Physiotherapy Videos — Recovery Stories & Home Exercises",
    description:
        "Watch patient recovery stories, at-home exercises and sports physiotherapy videos from Physio At Your Doorstep — ACL rehab, frozen shoulder, posture, back pain and more.",
    alternates: { canonical: "/videos" },
    openGraph: {
        title: "Physiotherapy Videos — Recovery Stories & Home Exercises",
        url: "/videos",
        type: "website",
        images: [thumbnailUrl(FEATURED_VIDEO_ID)],
    },
};

const featured = CHANNEL_VIDEOS.find((v) => v.id === FEATURED_VIDEO_ID) ?? CHANNEL_VIDEOS[0];

const categoryIcon = { recovery: HeartPulse, exercises: Dumbbell, sports: Trophy } as const;

const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${absoluteUrl("/videos")}#webpage`,
    url: absoluteUrl("/videos"),
    name: "Physiotherapy Videos — Physio At Your Doorstep",
    description:
        "Patient recovery stories, home exercise routines and sports physiotherapy videos from Physio At Your Doorstep's YouTube channel.",
    about: { "@id": `${SITE.url}/#organization` },
    isPartOf: { "@id": `${SITE.url}/#website` },
    mainEntity: {
        "@type": "ItemList",
        itemListOrder: "https://schema.org/ItemListOrderDescending",
        numberOfItems: CHANNEL_VIDEOS.length,
        itemListElement: CHANNEL_VIDEOS.map((v, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: {
                "@type": "VideoObject",
                name: v.title,
                description: v.description,
                thumbnailUrl: [thumbnailUrl(v.id)],
                uploadDate: v.uploadDate,
                duration: isoDuration(v.seconds),
                contentUrl: watchUrl(v),
                embedUrl: `https://www.youtube.com/embed/${v.id}`,
                publisher: { "@id": `${SITE.url}/#organization` },
            },
        })),
    },
};

export default function VideosPage() {
    const counts = Object.fromEntries(
        VIDEO_CATEGORIES.map((c) => [c.key, CHANNEL_VIDEOS.filter((v) => v.category === c.key).length]),
    );

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
                                <PlayCircle className="h-4 w-4" />
                                Watch &amp; Learn
                            </span>
                            <h1 className="heading-hero mt-4 mb-4">
                                Physiotherapy <span className="text-[#E31E24]">Videos</span>
                            </h1>
                            <p className="text-lg text-[#4B5563] leading-relaxed">
                                Real patient recoveries, exercises you can do at home, and our physiotherapists
                                at work — straight from the {SITE.name} YouTube channel.
                            </p>
                        </div>

                        {/* Category stats */}
                        <div className="mt-10 grid grid-cols-3 gap-3 max-w-2xl mx-auto">
                            {VIDEO_CATEGORIES.map((c) => {
                                const Icon = categoryIcon[c.key];
                                return (
                                    <div
                                        key={c.key}
                                        className="rounded-2xl border border-[#DCDCEC] bg-white/80 px-3 py-4 text-center backdrop-blur-sm"
                                    >
                                        <Icon className="mx-auto h-5 w-5 text-[#E31E24]" />
                                        <p className="mt-2 text-2xl font-bold tabular-nums text-[#2A2A57]">
                                            {counts[c.key]}
                                        </p>
                                        <p className="text-xs sm:text-sm text-[#4B5563]">{c.label}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* Breadcrumbs */}
                <div className="container pt-6">
                    <Breadcrumbs items={[{ name: "Videos" }]} />
                </div>

                {/* Featured */}
                <section className="pt-6 pb-4">
                    <div className="container">
                        <FeaturedVideo video={featured} />
                    </div>
                </section>

                {/* Gallery */}
                <section className="section bg-white">
                    <div className="container">
                        <div className="text-center mb-8">
                            <h2 className="heading-section mb-2">Browse all videos</h2>
                        </div>
                        <VideoGallery videos={CHANNEL_VIDEOS} />
                    </div>
                </section>

                {/* Subscribe strip */}
                <section className="section-sm">
                    <div className="container">
                        <div className="rounded-3xl bg-gradient-to-r from-[#2A2A57] to-[#3B3B6D] px-6 py-10 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
                            <div className="flex flex-col md:flex-row items-center gap-5">
                                <span className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-white">
                                    <Youtube className="h-8 w-8 text-[#E31E24]" />
                                </span>
                                <div>
                                    <h2 className="text-xl md:text-2xl font-bold text-white">
                                        New videos every month
                                    </h2>
                                    <p className="mt-1 text-white/80">
                                        Subscribe on YouTube for recovery tips and patient stories.
                                    </p>
                                </div>
                            </div>
                            <a
                                href={`${SITE.socials.youtube}?sub_confirmation=1`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex flex-shrink-0 items-center gap-2 rounded-full bg-[#E31E24] px-6 py-3 font-semibold text-white shadow-lg transition-transform hover:scale-105"
                            >
                                <Youtube className="h-5 w-5" />
                                Subscribe
                            </a>
                        </div>
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
