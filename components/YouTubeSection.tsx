"use client";

import { useState } from "react";
import { Play, Youtube } from "lucide-react";
import { SITE } from "@/lib/seo";

export interface YouTubeVideo {
    id: string;
    title: string;
    description: string;
}

/** Videos from the Physio At Your Doorstep YouTube channel. */
const VIDEOS: YouTubeVideo[] = [
    {
        id: "-WmHuuOEkcY",
        title: "CEO of WorkIndia Shares His Recovery Story",
        description: "With Dr. Atharva Mishra — how structured home physiotherapy got him back on his feet.",
    },
    {
        id: "OaEMS4wKABI",
        title: "TA Repair Patient: First Sessions vs Final Session",
        description: "Side-by-side progress of a tendo-Achilles repair patient through their rehab journey.",
    },
    {
        id: "5-Lr_rtMZcA",
        title: "Mohit Singh's ACL Reconstruction Journey",
        description: "From post-surgery to confident movement — an ACL rehabilitation success story.",
    },
];

/**
 * Lightweight, click-to-play YouTube embed — no iframe (and no YouTube
 * JavaScript) is loaded until the visitor actually presses play.
 */
function VideoCard({ video }: { video: YouTubeVideo }) {
    const [playing, setPlaying] = useState(false);

    return (
        <div className="card-physio !p-0 overflow-hidden flex flex-col">
            <div className="relative aspect-video bg-[#23234A]">
                {playing ? (
                    <iframe
                        className="absolute inset-0 h-full w-full"
                        src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0`}
                        title={video.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                    />
                ) : (
                    <button
                        type="button"
                        onClick={() => setPlaying(true)}
                        aria-label={`Play video: ${video.title}`}
                        className="group absolute inset-0 h-full w-full"
                    >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`}
                            alt={video.title}
                            loading="lazy"
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <span className="absolute inset-0 bg-black/25 transition-colors group-hover:bg-black/10" />
                        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex h-14 w-14 items-center justify-center rounded-full bg-[#E31E24] shadow-float transition-transform group-hover:scale-110">
                            <Play className="h-6 w-6 text-white fill-white translate-x-0.5" />
                        </span>
                    </button>
                )}
            </div>
            <div className="p-6 flex flex-col flex-1">
                <h3 className="text-lg font-semibold text-[#1F2933] mb-2">{video.title}</h3>
                <p className="text-sm text-[#4B5563] leading-relaxed flex-1">{video.description}</p>
            </div>
        </div>
    );
}

export default function YouTubeSection() {
    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {VIDEOS.map((video) => (
                    <VideoCard key={video.id} video={video} />
                ))}
            </div>
            <div className="text-center mt-10">
                <a
                    href={SITE.socials.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary"
                >
                    <Youtube className="h-5 w-5 text-[#E31E24]" />
                    Watch More on Our YouTube Channel
                </a>
            </div>
        </div>
    );
}
