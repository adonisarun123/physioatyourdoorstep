"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface FAQ {
    question: string;
    answer: string;
}

interface ServiceFAQProps {
    faqs: FAQ[];
}

export function ServiceFAQ({ faqs }: ServiceFAQProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="space-y-4">
            {faqs.map((faq, index) => (
                <Card
                    key={index}
                    className="overflow-hidden transition-all hover:shadow-md"
                >
                    <button
                        onClick={() => toggleFAQ(index)}
                        className="w-full text-left"
                    >
                        <CardContent className="pt-6 pb-6">
                            <div className="flex items-start justify-between gap-4">
                                <h3 className="text-lg font-semibold text-foreground pr-8">
                                    {faq.question}
                                </h3>
                                <ChevronDown
                                    className={cn(
                                        "h-5 w-5 text-muted-foreground transition-transform flex-shrink-0",
                                        openIndex === index && "transform rotate-180"
                                    )}
                                />
                            </div>
                            <div
                                className={cn(
                                    "grid transition-all duration-300 ease-in-out",
                                    openIndex === index
                                        ? "grid-rows-[1fr] opacity-100 mt-4"
                                        : "grid-rows-[0fr] opacity-0"
                                )}
                            >
                                <div className="overflow-hidden">
                                    <p className="text-muted-foreground leading-relaxed">
                                        {faq.answer}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </button>
                </Card>
            ))}
        </div>
    );
}
