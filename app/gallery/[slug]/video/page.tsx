import CTABar from "@/components/CTABar";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Building2, Calendar, Clock, MapPin } from "lucide-react";
import type { Metadata } from "next";
import { EventVideo } from "@/components/EventGallery";
import { GALLERY_EVENTS, galleryVideoPath, getGalleryEvent } from "@/lib/gallery";
import { SITE, absoluteUrl, isoDateTimeIST } from "@/lib/seo";

/**
 * Watch page for an event video. /gallery is mainly a photo page, so Google
 * would not index the video there ("Video isn't on a watch page"); here the
 * video is the main content and carries the VideoObject markup.
 */

export const dynamicParams = false;

export function generateStaticParams() {
    return GALLERY_EVENTS.filter((e) => e.video).map((e) => ({ slug: e.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const event = getGalleryEvent(slug);
    if (!event?.video) return {};
    const path = galleryVideoPath(event.slug);
    return {
        title: event.video.title,
        description: event.video.description,
        alternates: { canonical: path },
        openGraph: {
            title: event.video.title,
            description: event.video.description,
            url: path,
            type: "video.other",
            images: [event.video.poster],
            videos: [{ url: absoluteUrl(event.video.src), type: "video/mp4" }],
        },
    };
}

export default async function GalleryVideoPage({ params }: Props) {
    const { slug } = await params;
    const event = getGalleryEvent(slug);
    if (!event?.video) notFound();
    const video = event.video;
    const pageUrl = absoluteUrl(galleryVideoPath(event.slug));

    const videoSchema = {
        "@context": "https://schema.org",
        "@type": "VideoObject",
        "@id": `${pageUrl}#video`,
        name: video.title,
        description: video.description,
        thumbnailUrl: [absoluteUrl(video.poster)],
        uploadDate: isoDateTimeIST(event.dateISO),
        duration: video.duration,
        contentUrl: absoluteUrl(video.src),
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
                    <Breadcrumbs items={[{ name: "Gallery", href: "/gallery" }, { name: video.title }]} />
                </div>

                <section className="pt-6 pb-12">
                    <div className="container">
                        <div className="mx-auto max-w-4xl">
                            <EventVideo video={video} />
                        </div>

                        <div className="mx-auto mt-8 max-w-3xl">
                            <span className="pill bg-[#E31E24]/10 text-[#E31E24] border border-[#E31E24]/20 text-xs">
                                {event.kind}
                            </span>
                            <h1 className="mt-4 text-2xl md:text-4xl font-bold leading-tight text-[#1F2933]">
                                {video.title}
                            </h1>
                            <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-[#6B7280]">
                                <span className="inline-flex items-center gap-1.5">
                                    <Building2 className="h-4 w-4" />
                                    {event.client}
                                </span>
                                <span className="inline-flex items-center gap-1.5">
                                    <Calendar className="h-4 w-4" />
                                    <time dateTime={event.dateISO}>{event.dateLabel}</time>
                                </span>
                                <span className="inline-flex items-center gap-1.5">
                                    <MapPin className="h-4 w-4" />
                                    {event.location}
                                </span>
                                <span className="inline-flex items-center gap-1.5">
                                    <Clock className="h-4 w-4" />
                                    {video.durationLabel}
                                </span>
                            </div>
                            <p className="mt-5 text-lg leading-relaxed text-[#4B5563]">{video.description}</p>
                            <p className="mt-4 leading-relaxed text-[#4B5563]">{event.summary}</p>

                            <div className="mt-8 flex flex-col sm:flex-row gap-3">
                                <Link href={`/gallery#${event.slug}`} className="btn-secondary">
                                    See the event photos
                                </Link>
                                <Link href="/contact-us" className="btn-primary">
                                    Book a session for your team
                                </Link>
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
