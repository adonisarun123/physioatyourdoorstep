"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Expand, Play, X } from "lucide-react";
import type { GalleryPhoto, GalleryVideo } from "@/lib/gallery";

/**
 * Bento layout for a 6-photo event (desktop: 4 cols; mobile: 2 cols).
 * Extra photos beyond the pattern fall back to single tiles.
 */
const TILE_SPANS = [
    "col-span-2 row-span-2",
    "col-span-2 md:col-span-2",
    "col-span-1",
    "col-span-1",
    "col-span-1 md:col-span-2",
    "col-span-1 md:col-span-2",
];

export function EventVideo({ video }: { video: GalleryVideo }) {
    const ref = useRef<HTMLVideoElement>(null);
    const [started, setStarted] = useState(false);

    const play = () => {
        setStarted(true);
        requestAnimationFrame(() => ref.current?.play());
    };

    return (
        <div className="relative overflow-hidden rounded-3xl bg-[#14142B] shadow-[0_30px_60px_-20px_rgba(42,42,87,0.45)] ring-1 ring-black/5">
            <video
                ref={ref}
                className="block aspect-video w-full object-cover"
                poster={video.poster}
                preload="none"
                playsInline
                controls={started}
                onPlay={() => setStarted(true)}
                aria-label={video.title}
            >
                <source src={video.src} type="video/mp4" />
            </video>

            {!started && (
                <button
                    type="button"
                    onClick={play}
                    className="group absolute inset-0 flex items-end justify-between gap-4 bg-gradient-to-t from-[#14142B]/85 via-[#14142B]/20 to-transparent p-5 text-left md:p-8"
                    aria-label={`Play video: ${video.title}`}
                >
                    <span className="max-w-md">
                        <span className="mb-2 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur">
                            Watch the highlights · {video.durationLabel}
                        </span>
                        <span className="hidden text-lg font-bold leading-snug text-white sm:block md:text-2xl">
                            {video.title}
                        </span>
                    </span>
                    <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#E31E24] text-white shadow-xl transition-transform duration-300 group-hover:scale-110 md:h-20 md:w-20">
                        <span className="absolute inset-0 animate-ping rounded-full bg-[#E31E24]/40" aria-hidden="true" />
                        <Play className="relative ml-1 h-7 w-7 fill-current md:h-8 md:w-8" />
                    </span>
                </button>
            )}
        </div>
    );
}

export default function EventGallery({ photos }: { photos: GalleryPhoto[] }) {
    const [open, setOpen] = useState<number | null>(null);
    const touchX = useRef<number | null>(null);
    const total = photos.length;

    const close = useCallback(() => setOpen(null), []);
    const step = useCallback(
        (dir: 1 | -1) => setOpen((i) => (i === null ? i : (i + dir + total) % total)),
        [total],
    );

    useEffect(() => {
        if (open === null) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") close();
            if (e.key === "ArrowRight") step(1);
            if (e.key === "ArrowLeft") step(-1);
        };
        document.addEventListener("keydown", onKey);
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.removeEventListener("keydown", onKey);
            document.body.style.overflow = prev;
        };
    }, [open, close, step]);

    const current = open === null ? null : photos[open];

    return (
        <>
            <ul className="grid auto-rows-[140px] grid-cols-2 gap-3 sm:auto-rows-[190px] md:grid-cols-4 md:gap-4 lg:auto-rows-[220px]">
                {photos.map((p, i) => (
                    <li key={p.src} className={`${TILE_SPANS[i] ?? "col-span-1"} relative`}>
                        <button
                            type="button"
                            onClick={() => setOpen(i)}
                            className="group relative block h-full w-full overflow-hidden rounded-2xl bg-[#EEEEF7] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#3B3B6D]/40"
                            aria-label={`Open photo ${i + 1} of ${total}: ${p.caption}`}
                        >
                            <Image
                                src={p.src}
                                alt={p.alt}
                                fill
                                priority={i === 0}
                                sizes={i === 0 ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 25vw, 50vw"}
                                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                            />
                            <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#14142B]/80 via-[#14142B]/0 to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-100" />
                            <span className="pointer-events-none absolute right-3 top-3 flex h-9 w-9 scale-90 items-center justify-center rounded-full bg-white/90 text-[#2A2A57] opacity-0 shadow transition-all duration-300 group-hover:scale-100 group-hover:opacity-100">
                                <Expand className="h-4 w-4" />
                            </span>
                            <span className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end gap-3 p-3 text-left md:p-4">
                                <span className="font-mono text-xs font-semibold text-white/70">
                                    {String(i + 1).padStart(2, "0")}
                                </span>
                                <span className="hidden text-xs font-semibold leading-snug text-white sm:inline sm:text-sm">
                                    {p.caption}
                                </span>
                            </span>
                        </button>
                    </li>
                ))}
            </ul>

            {current && open !== null && (
                <div
                    role="dialog"
                    aria-modal="true"
                    aria-label="Photo viewer"
                    className="fixed inset-0 z-[100] flex flex-col bg-[#0B0B1A]/95 backdrop-blur-md"
                    onClick={close}
                    onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
                    onTouchEnd={(e) => {
                        if (touchX.current === null) return;
                        const dx = e.changedTouches[0].clientX - touchX.current;
                        if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
                        touchX.current = null;
                    }}
                >
                    <div className="flex items-center justify-between px-4 py-3 text-white md:px-6">
                        <span className="font-mono text-sm text-white/70">
                            {String(open + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                        </span>
                        <button
                            type="button"
                            onClick={close}
                            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20"
                            aria-label="Close"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    <div className="relative flex-1" onClick={(e) => e.stopPropagation()}>
                        <Image
                            key={current.src}
                            src={current.src}
                            alt={current.alt}
                            fill
                            priority
                            sizes="100vw"
                            className="animate-[fadeIn_.25s_ease-out] object-contain px-2 md:px-20"
                        />
                        <button
                            type="button"
                            onClick={() => step(-1)}
                            className="absolute left-2 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/25 md:left-6 md:flex"
                            aria-label="Previous photo"
                        >
                            <ChevronLeft className="h-6 w-6" />
                        </button>
                        <button
                            type="button"
                            onClick={() => step(1)}
                            className="absolute right-2 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/25 md:right-6 md:flex"
                            aria-label="Next photo"
                        >
                            <ChevronRight className="h-6 w-6" />
                        </button>
                    </div>

                    <div className="px-4 pb-5 pt-4 md:px-6" onClick={(e) => e.stopPropagation()}>
                        <p className="mb-4 text-center text-sm font-medium text-white md:text-base">
                            {current.caption}
                        </p>
                        <div className="mx-auto flex max-w-full justify-center gap-2 overflow-x-auto">
                            {photos.map((p, i) => (
                                <button
                                    key={p.src}
                                    type="button"
                                    onClick={() => setOpen(i)}
                                    className={`relative h-12 w-20 flex-shrink-0 overflow-hidden rounded-lg transition md:h-14 md:w-24 ${
                                        i === open
                                            ? "ring-2 ring-white opacity-100"
                                            : "opacity-40 hover:opacity-80"
                                    }`}
                                    aria-label={`Show photo ${i + 1}`}
                                    aria-current={i === open}
                                >
                                    <Image src={p.src} alt="" fill sizes="96px" className="object-cover" />
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
