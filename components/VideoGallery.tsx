"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Calendar, Clapperboard, Play, Smartphone, X, Youtube } from "lucide-react";
import {
    type ChannelVideo,
    type VideoCategory,
    VIDEO_CATEGORIES,
    formatDuration,
    thumbnailUrl,
    watchUrl,
} from "@/lib/videos";

const CATEGORY_LABEL: Record<VideoCategory, string> = Object.fromEntries(
    VIDEO_CATEGORIES.map((c) => [c.key, c.label]),
) as Record<VideoCategory, string>;

function formatDate(iso: string) {
    return new Date(`${iso}T00:00:00`).toLocaleDateString("en-IN", {
        month: "short",
        year: "numeric",
    });
}

/**
 * Thumbnail that works for both 16:9 videos and 9:16 Shorts. Shorts are shown
 * as a vertical frame over a blurred copy of themselves, so every card in the
 * grid keeps the same 16:9 footprint without cropping the subject.
 */
function Thumb({ video, size = "md" }: { video: ChannelVideo; size?: "md" | "lg" }) {
    const src = thumbnailUrl(video.id);
    const isShort = video.format === "short";
    const btn = size === "lg" ? "h-16 w-16 md:h-20 md:w-20" : "h-12 w-12";
    const icon = size === "lg" ? "h-7 w-7 md:h-8 md:w-8" : "h-5 w-5";

    return (
        <div className="relative aspect-video overflow-hidden bg-[#23234A]">
            {isShort ? (
                <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={src}
                        alt=""
                        aria-hidden="true"
                        loading="lazy"
                        className="absolute inset-0 h-full w-full scale-125 object-cover blur-xl opacity-60"
                    />
                    <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 aspect-[9/16] overflow-hidden shadow-2xl">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={src}
                            alt={video.title}
                            loading="lazy"
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                    </div>
                </>
            ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                    src={src}
                    alt={video.title}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
            )}

            <span className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent transition-opacity group-hover:opacity-70" />

            <span
                className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex ${btn} items-center justify-center rounded-full bg-[#E31E24] shadow-float ring-4 ring-white/25 transition-transform duration-300 group-hover:scale-110`}
            >
                <Play className={`${icon} text-white fill-white translate-x-0.5`} />
            </span>

            <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-black/60 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-white backdrop-blur-sm">
                {isShort ? <Smartphone className="h-3 w-3" /> : <Clapperboard className="h-3 w-3" />}
                {isShort ? "Short" : "Video"}
            </span>
            <span className="absolute right-3 bottom-3 rounded-md bg-black/75 px-1.5 py-0.5 text-xs font-semibold tabular-nums text-white">
                {formatDuration(video.seconds)}
            </span>
        </div>
    );
}

function PlayerModal({ video, onClose }: { video: ChannelVideo; onClose: () => void }) {
    const closeRef = useRef<HTMLButtonElement>(null);
    const isShort = video.format === "short";

    useEffect(() => {
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        closeRef.current?.focus();
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
        window.addEventListener("keydown", onKey);
        return () => {
            document.body.style.overflow = prev;
            window.removeEventListener("keydown", onKey);
        };
    }, [onClose]);

    return (
        <div
            role="dialog"
            aria-modal="true"
            aria-label={video.title}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#12122B]/90 p-4 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className={`relative w-full ${isShort ? "max-w-[min(420px,calc((100vh-10rem)*9/16))]" : "max-w-5xl"}`}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="mb-3 flex items-start justify-between gap-4">
                    <h2 className="text-base md:text-lg font-semibold leading-snug text-white">{video.title}</h2>
                    <button
                        ref={closeRef}
                        type="button"
                        onClick={onClose}
                        aria-label="Close video"
                        className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>
                <div
                    className={`relative overflow-hidden rounded-2xl bg-black shadow-2xl ${isShort ? "aspect-[9/16]" : "aspect-video"}`}
                >
                    <iframe
                        className="absolute inset-0 h-full w-full"
                        src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0&playsinline=1&modestbranding=1`}
                        title={video.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                    />
                </div>
                <a
                    href={watchUrl(video)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-white/80 hover:text-white"
                >
                    <Youtube className="h-4 w-4" />
                    Watch on YouTube
                </a>
            </div>
        </div>
    );
}

export function FeaturedVideo({ video }: { video: ChannelVideo }) {
    const [open, setOpen] = useState(false);
    const close = useCallback(() => setOpen(false), []);

    return (
        <>
            <div className="card-physio !p-0 overflow-hidden grid lg:grid-cols-5">
                <button
                    type="button"
                    onClick={() => setOpen(true)}
                    aria-label={`Play video: ${video.title}`}
                    className="group relative block lg:col-span-3 text-left focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#3B3B6D]/40"
                >
                    <Thumb video={video} size="lg" />
                </button>
                <div className="lg:col-span-2 flex flex-col justify-center p-6 md:p-8">
                    <span className="pill w-fit bg-[#E31E24]/10 text-[#E31E24] border border-[#E31E24]/20 text-xs">
                        Featured · {CATEGORY_LABEL[video.category]}
                    </span>
                    <h2 className="mt-4 text-2xl md:text-3xl font-bold leading-tight text-[#1F2933]">
                        {video.title}
                    </h2>
                    <p className="mt-3 text-[#4B5563] leading-relaxed">{video.description}</p>
                    <div className="mt-6 flex flex-wrap items-center gap-4">
                        <button type="button" onClick={() => setOpen(true)} className="btn-primary">
                            <Play className="h-4 w-4 fill-current" />
                            Watch now
                        </button>
                        <span className="inline-flex items-center gap-1.5 text-sm text-[#6B7280]">
                            <Calendar className="h-4 w-4" />
                            {formatDate(video.uploadDate)} · {formatDuration(video.seconds)}
                        </span>
                    </div>
                </div>
            </div>
            {open && <PlayerModal video={video} onClose={close} />}
        </>
    );
}

type Filter = "all" | VideoCategory;

export default function VideoGallery({ videos }: { videos: ChannelVideo[] }) {
    const [filter, setFilter] = useState<Filter>("all");
    const [active, setActive] = useState<ChannelVideo | null>(null);
    const close = useCallback(() => setActive(null), []);

    const counts = useMemo(() => {
        const c: Record<Filter, number> = { all: videos.length, recovery: 0, exercises: 0, sports: 0 };
        videos.forEach((v) => c[v.category]++);
        return c;
    }, [videos]);

    const shown = filter === "all" ? videos : videos.filter((v) => v.category === filter);
    const blurb = VIDEO_CATEGORIES.find((c) => c.key === filter)?.blurb;

    const tabs: { key: Filter; label: string }[] = [
        { key: "all", label: "All videos" },
        ...VIDEO_CATEGORIES.map((c) => ({ key: c.key as Filter, label: c.label })),
    ];

    return (
        <div>
            {/* Filter chips */}
            <div
                role="tablist"
                aria-label="Filter videos by topic"
                className="-mx-4 px-4 flex gap-2 overflow-x-auto pb-2 sm:mx-0 sm:px-0 sm:flex-wrap sm:justify-center [scrollbar-width:none]"
            >
                {tabs.map((t) => {
                    const on = filter === t.key;
                    return (
                        <button
                            key={t.key}
                            type="button"
                            role="tab"
                            aria-selected={on}
                            onClick={() => setFilter(t.key)}
                            className={`inline-flex flex-shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-all ${
                                on
                                    ? "border-[#3B3B6D] bg-[#3B3B6D] text-white shadow-md"
                                    : "border-[#DCDCEC] bg-white text-[#2A2A57] hover:border-[#3B3B6D]/50 hover:bg-[#EEEEF7]"
                            }`}
                        >
                            {t.label}
                            <span
                                className={`rounded-full px-2 py-0.5 text-xs tabular-nums ${
                                    on ? "bg-white/20 text-white" : "bg-[#EEEEF7] text-[#3B3B6D]"
                                }`}
                            >
                                {counts[t.key]}
                            </span>
                        </button>
                    );
                })}
            </div>
            <p className="mt-3 min-h-[1.5rem] text-center text-sm text-[#6B7280]" aria-live="polite">
                {blurb ?? "Every video from our YouTube channel, newest first."}
            </p>

            {/* Grid */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {shown.map((v) => (
                    <article key={v.id} className="card-physio !p-0 overflow-hidden flex flex-col group">
                        <button
                            type="button"
                            onClick={() => setActive(v)}
                            aria-label={`Play video: ${v.title}`}
                            className="block text-left focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#3B3B6D]/40"
                        >
                            <Thumb video={v} />
                        </button>
                        <div className="flex flex-1 flex-col p-5">
                            <div className="mb-2 flex items-center justify-between gap-3 text-xs">
                                <span className="font-semibold uppercase tracking-wide text-[#3B3B6D]">
                                    {CATEGORY_LABEL[v.category]}
                                </span>
                                <time dateTime={v.uploadDate} className="text-[#6B7280]">
                                    {formatDate(v.uploadDate)}
                                </time>
                            </div>
                            <h3 className="text-base font-semibold leading-snug text-[#1F2933] transition-colors group-hover:text-[#3B3B6D]">
                                <button
                                    type="button"
                                    onClick={() => setActive(v)}
                                    className="text-left focus:outline-none focus-visible:underline"
                                >
                                    {v.title}
                                </button>
                            </h3>
                            <p className="mt-2 text-sm leading-relaxed text-[#4B5563] line-clamp-2">
                                {v.description}
                            </p>
                        </div>
                    </article>
                ))}
            </div>

            {active && <PlayerModal video={active} onClose={close} />}
        </div>
    );
}
