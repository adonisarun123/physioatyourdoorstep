"use client";

import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi,
} from "@/components/ui/carousel";
import { GOOGLE_RATING, GOOGLE_REVIEW_ITEMS, REVIEW_PHOTOS } from "@/lib/reviews";

/** Official Google "G" mark. */
function GoogleG({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 48 48" aria-hidden="true">
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
        </svg>
    );
}

/** Deterministic initials avatar (Google-style colours). */
const AVATAR_COLORS = ["#4285F4", "#EA4335", "#FBBC05", "#34A853", "#7B1FA2", "#00796B", "#C2185B", "#455A64"];

function InitialsAvatar({ name }: { name: string }) {
    const initial = name.trim().charAt(0).toUpperCase();
    const color = AVATAR_COLORS[name.length % AVATAR_COLORS.length];
    return (
        <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-lg flex-shrink-0"
            style={{ backgroundColor: color }}
            aria-hidden="true"
        >
            {initial}
        </div>
    );
}

function FiveStars({ size = "h-4 w-4" }: { size?: string }) {
    return (
        <div className="flex" aria-label="5 star rating">
            {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`${size} fill-[#F5A623] text-[#F5A623]`} />
            ))}
        </div>
    );
}

export default function GoogleReviews() {
    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!api) return;
        setCount(api.scrollSnapList().length);
        setCurrent(api.selectedScrollSnap());
        api.on("select", () => setCurrent(api.selectedScrollSnap()));
    }, [api]);

    return (
        <div>
            {/* Rating summary */}
            <div className="card-physio max-w-3xl mx-auto mb-12 !p-6 md:!p-8">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                        <GoogleG className="h-12 w-12" />
                        <div>
                            <div className="flex items-center gap-3">
                                <span className="text-4xl font-bold text-[#1F2933]">{GOOGLE_RATING.rating}</span>
                                <FiveStars size="h-5 w-5" />
                            </div>
                            <div className="text-sm text-[#4B5563] mt-1">
                                Based on <span className="font-semibold text-[#1F2933]">{GOOGLE_RATING.count}+ Google reviews</span>
                            </div>
                        </div>
                    </div>
                    <a
                        href={GOOGLE_RATING.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary whitespace-nowrap"
                    >
                        Read All Reviews on Google
                    </a>
                </div>
            </div>

            {/* Review cards */}
            <div className="relative">
                <Carousel setApi={setApi} opts={{ align: "start", loop: true }} className="w-full">
                    <CarouselContent className="-ml-4">
                        {GOOGLE_REVIEW_ITEMS.map((review, index) => (
                            <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                                <div className="card-physio flex h-full flex-col !p-6">
                                    <div className="flex items-center gap-3 mb-4">
                                        <InitialsAvatar name={review.name} />
                                        <div className="flex-1 min-w-0">
                                            <div className="font-semibold text-[#1F2933] truncate">{review.name}</div>
                                            <FiveStars />
                                        </div>
                                        <GoogleG className="h-6 w-6 flex-shrink-0" />
                                    </div>
                                    <p className="text-[#4B5563] text-sm leading-relaxed flex-1">
                                        &ldquo;{review.text}&rdquo;
                                    </p>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="hidden md:flex -left-4 lg:-left-12" />
                    <CarouselNext className="hidden md:flex -right-4 lg:-right-12" />
                </Carousel>

                {count > 1 && (
                    <div className="mt-8 flex items-center justify-center gap-2">
                        {Array.from({ length: count }).map((_, index) => (
                            <button
                                key={index}
                                type="button"
                                aria-label={`Go to review ${index + 1}`}
                                onClick={() => api?.scrollTo(index)}
                                className={`h-2.5 rounded-full transition-all ${
                                    current === index
                                        ? "w-6 bg-[#3B3B6D]"
                                        : "w-2.5 bg-[#DCDCEC] hover:bg-[#3B3B6D]/50"
                                }`}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Patient photos from the Google listing */}
            <div className="mt-12">
                <div className="text-center mb-6">
                    <h3 className="heading-subsection">
                        Real Patients, <span className="text-[#3B3B6D]">Real Recoveries</span>
                    </h3>
                </div>
                <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory [-webkit-overflow-scrolling:touch]">
                    {REVIEW_PHOTOS.map((photo, index) => (
                        <div
                            key={index}
                            className="img-frame flex-shrink-0 w-44 h-44 md:w-52 md:h-52 snap-start !rounded-2xl"
                        >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={photo.src}
                                alt={photo.alt}
                                loading="lazy"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
