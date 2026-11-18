import Link from "next/link";
import { PlayCircle } from "lucide-react";
import { CHANNEL_VIDEOS, thumbnailUrl, videoPagePath, type VideoCategory } from "@/lib/videos";

/** Video category that fits each blog category / service (default: exercises & tips). */
const TOPIC_TO_VIDEO: Record<string, VideoCategory> = {
    "sports-physiotherapy": "sports",
    "post-surgical-physiotherapy": "recovery",
    "orthopaedic-physiotherapy": "exercises",
};

/**
 * A small strip of on-site video watch pages related to a topic. Rotates by
 * `seed` so different pages link to different videos and every watch page gets
 * contextual internal links, not just the /videos hub.
 */
export default function RelatedVideos({
    topic,
    seed = 0,
    count = 3,
    title = "Watch: From Our Physiotherapists",
}: {
    topic: string;
    seed?: number;
    count?: number;
    title?: string;
}) {
    const cat = TOPIC_TO_VIDEO[topic] ?? "exercises";
    const pool = CHANNEL_VIDEOS.filter((v) => v.category === cat);
    if (pool.length === 0) return null;
    const picks = Array.from({ length: Math.min(count, pool.length) }, (_, k) => pool[(seed + k) % pool.length]);

    return (
        <section className="section bg-white">
            <div className="container max-w-5xl">
                <h2 className="heading-subsection mb-6 text-center">{title}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    {picks.map((v) => (
                        <Link
                            key={v.id}
                            href={videoPagePath(v.id)}
                            className="group block overflow-hidden rounded-2xl border border-[#DCDCEC] bg-white hover:shadow-md transition-shadow"
                        >
                            <div className="relative aspect-video bg-[#23234A]">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={thumbnailUrl(v.id)}
                                    alt={v.title}
                                    loading="lazy"
                                    width={480}
                                    height={360}
                                    className="absolute inset-0 h-full w-full object-cover"
                                />
                                <PlayCircle className="absolute inset-0 m-auto h-12 w-12 text-white/90 drop-shadow" />
                            </div>
                            <p className="p-4 text-sm font-semibold text-[#1F2933] group-hover:text-[#3B3B6D]">{v.title}</p>
                        </Link>
                    ))}
                </div>
                <div className="text-center mt-8">
                    <Link href="/videos" className="btn-secondary">All Videos</Link>
                </div>
            </div>
        </section>
    );
}
