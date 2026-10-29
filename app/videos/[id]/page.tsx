import CTABar from "@/components/CTABar";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, Clock, Phone, Youtube } from "lucide-react";
import type { Metadata } from "next";
import {
    CHANNEL_VIDEOS,
    VIDEO_CATEGORIES,
    formatDuration,
    getVideo,
    isoDuration,
    thumbnailUrl,
    videoPagePath,
    watchUrl,
} from "@/lib/videos";
import { SITE, absoluteUrl, isoDateTimeIST } from "@/lib/seo";

/**
 * Watch page — one per YouTube video. Google only indexes a video when it is
 * the main content of its page, so each video gets its own URL here and
 * /videos links to these pages instead of carrying VideoObject markup itself.
 */

export const dynamicParams = false;

export function generateStaticParams() {
    return CHANNEL_VIDEOS.map((v) => ({ id: v.id }));
}

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params;
    const video = getVideo(id);
    if (!video) return {};
    const path = videoPagePath(video.id);
    return {
        title: video.title,
        description: video.description,
        alternates: { canonical: path },
        openGraph: {
            title: video.title,
            description: video.description,
            url: path,
            type: "video.other",
            images: [thumbnailUrl(video.id)],
            videos: [{ url: `https://www.youtube.com/embed/${video.id}` }],
        },
    };
}

function formatDate(iso: string) {
    return new Date(`${iso}T00:00:00`).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
}

export default async function VideoWatchPage({ params }: Props) {
    const { id } = await params;
    const video = getVideo(id);
    if (!video) notFound();

    const isShort = video.format === "short";
    const pageUrl = absoluteUrl(videoPagePath(video.id));
    const category = VIDEO_CATEGORIES.find((c) => c.key === video.category);
    const related = CHANNEL_VIDEOS.filter((v) => v.id !== video.id && v.category === video.category).slice(0, 3);

    const videoSchema = {
        "@context": "https://schema.org",
        "@type": "VideoObject",
        "@id": `${pageUrl}#video`,
        name: video.title,
        description: video.description,
        thumbnailUrl: [thumbnailUrl(video.id)],
        uploadDate: isoDateTimeIST(video.uploadDate),
        duration: isoDuration(video.seconds),
        contentUrl: watchUrl(video),
        embedUrl: `https://www.youtube.com/embed/${video.id}`,
        url: pageUrl,
        mainEntityOfPage: pageUrl,
        publisher: { "@id": `${SITE.url}/#organization` },
    };

    return (
        <div className="min-h-screen flex flex-col">
            <JsonLd data={videoSchema} />
            <Header />

            <main className="flex-1">
                <div className="container pt-6">
                    <Breadcrumbs items={[{ name: "Videos", href: "/videos" }, { name: video.title }]} />
                </div>

                <section className="pt-6 pb-10">
                    <div className="container">
                        <div className={`mx-auto ${isShort ? "max-w-sm" : "max-w-4xl"}`}>
                            <div
                                className={`relative overflow-hidden rounded-2xl bg-black shadow-2xl ${isShort ? "aspect-[9/16]" : "aspect-video"}`}
                            >
                                <iframe
                                    className="absolute inset-0 h-full w-full"
                                    src={`https://www.youtube-nocookie.com/embed/${video.id}?rel=0&playsinline=1&modestbranding=1`}
                                    title={video.title}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen
                                />
                            </div>
                        </div>

                        <div className="mx-auto mt-8 max-w-3xl">
                            {category && (
                                <span className="pill bg-[#E31E24]/10 text-[#E31E24] border border-[#E31E24]/20 text-xs">
                                    {category.label}
                                </span>
                            )}
                            <h1 className="mt-4 text-2xl md:text-4xl font-bold leading-tight text-[#1F2933]">
                                {video.title}
                            </h1>
                            <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-[#6B7280]">
                                <span className="inline-flex items-center gap-1.5">
                                    <Calendar className="h-4 w-4" />
                                    <time dateTime={video.uploadDate}>{formatDate(video.uploadDate)}</time>
                                </span>
                                <span className="inline-flex items-center gap-1.5">
                                    <Clock className="h-4 w-4" />
                                    {formatDuration(video.seconds)}
                                </span>
                                <a
                                    href={watchUrl(video)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 font-medium text-[#3B3B6D] hover:text-[#E31E24]"
                                >
                                    <Youtube className="h-4 w-4" />
                                    Watch on YouTube
                                </a>
                            </div>
                            <p className="mt-5 text-lg leading-relaxed text-[#4B5563]">{video.description}</p>

                            <div className="mt-8 flex flex-col sm:flex-row gap-3">
                                <Link href="/booking" className="btn-primary">
                                    Book a Home Visit
                                </Link>
                                <a href={`tel:${SITE.phoneRaw}`} className="btn-secondary">
                                    <Phone className="h-4 w-4" />
                                    {SITE.phone}
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                {related.length > 0 && (
                    <section className="section bg-white">
                        <div className="container">
                            <h2 className="heading-section mb-8 text-center">More {category?.label ?? "videos"}</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {related.map((v) => (
                                    <Link
                                        key={v.id}
                                        href={videoPagePath(v.id)}
                                        className="card-physio !p-0 overflow-hidden group block"
                                    >
                                        <div className="relative aspect-video overflow-hidden bg-[#23234A]">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img
                                                src={thumbnailUrl(v.id)}
                                                alt={v.title}
                                                loading="lazy"
                                                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                            <span className="absolute right-3 bottom-3 rounded-md bg-black/75 px-1.5 py-0.5 text-xs font-semibold tabular-nums text-white">
                                                {formatDuration(v.seconds)}
                                            </span>
                                        </div>
                                        <p className="p-5 text-base font-semibold leading-snug text-[#1F2933] group-hover:text-[#3B3B6D]">
                                            {v.title}
                                        </p>
                                    </Link>
                                ))}
                            </div>
                            <div className="mt-8 text-center">
                                <Link href="/videos" className="btn-secondary">
                                    All videos
                                </Link>
                            </div>
                        </div>
                    </section>
                )}
            </main>

            <Footer />
            <CTABar />
        </div>
    );
}
