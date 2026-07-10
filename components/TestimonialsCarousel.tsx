"use client";

import { useEffect, useState } from "react";
import { Quote, Star } from "lucide-react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi,
} from "@/components/ui/carousel";

export interface Testimonial {
    quote: string;
    name: string;
    role: string;
}

interface TestimonialsCarouselProps {
    testimonials: Testimonial[];
}

export default function TestimonialsCarousel({ testimonials }: TestimonialsCarouselProps) {
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
        <div className="relative">
            <Carousel
                setApi={setApi}
                opts={{ align: "start", loop: true }}
                className="w-full"
            >
                <CarouselContent className="-ml-4">
                    {testimonials.map((t, index) => (
                        <CarouselItem
                            key={index}
                            className="pl-4 md:basis-1/2 lg:basis-1/3"
                        >
                            <div className="card-physio flex h-full flex-col">
                                <div className="flex items-center justify-between mb-4">
                                    <Quote className="h-8 w-8 text-[#E31E24]" />
                                    <div className="flex" aria-label="5 star rating">
                                        {Array.from({ length: 5 }).map((_, i) => (
                                            <Star key={i} className="h-4 w-4 fill-[#F5A623] text-[#F5A623]" />
                                        ))}
                                    </div>
                                </div>
                                <p className="text-[#4B5563] leading-relaxed flex-1">{t.quote}</p>
                                <div className="mt-6 pt-4 border-t border-[#DCDCEC]">
                                    <div className="font-semibold text-[#1F2933]">{t.name}</div>
                                    <div className="text-sm text-[#4B5563]">{t.role}</div>
                                </div>
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
                            aria-label={`Go to testimonial ${index + 1}`}
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
    );
}
