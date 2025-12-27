import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import CTABar from "@/components/CTABar";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { getAllLocations, getLocationBySlug } from "@/lib/db";
import { MapPin } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export async function generateStaticParams() {
    const locations = await getAllLocations();
    return locations.map((location) => ({
        location: [location.slug],
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ location: string[] }> }): Promise<Metadata> {
    const { location } = await params;
    const slug = location.join('/');
    const locationData = await getLocationBySlug(slug);

    if (!locationData) {
        return {
            title: "Location Not Found",
        };
    }

    return {
        title: locationData.metaTitle || locationData.title,
        description: locationData.metaDescription || `Professional physiotherapy services in ${locationData.area}, ${locationData.city}`,
    };
}

export default async function LocationDetailPage({ params }: { params: Promise<{ location: string[] }> }) {
    const { location } = await params;
    const slug = location.join('/');
    const locationData = await getLocationBySlug(slug);

    if (!locationData) {
        notFound();
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-1">
                {/* Hero Section */}
                <section className="py-16 md:py-24 bg-gradient-to-br from-primary/10 to-secondary/10">
                    <div className="container">
                        <div className="max-w-4xl mx-auto">
                            <div className="flex items-center gap-2 text-muted-foreground mb-4">
                                <MapPin className="h-5 w-5" />
                                <span>{locationData.area}, {locationData.city}</span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold mb-6">{locationData.title}</h1>
                            {locationData.metaDescription && (
                                <p className="text-xl text-muted-foreground">{locationData.metaDescription}</p>
                            )}
                        </div>
                    </div>
                </section>

                {/* Content Section */}
                <section className="py-16 md:py-24">
                    <div className="container max-w-4xl">
                        {locationData.content && (
                            <div
                                className="prose prose-lg max-w-none mb-12"
                                dangerouslySetInnerHTML={{ __html: locationData.content }}
                            />
                        )}

                        {/* FAQs */}
                        {locationData.faqs && locationData.faqs.length > 0 && (
                            <div className="mt-16">
                                <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions</h2>
                                <div className="space-y-6">
                                    {locationData.faqs.map((faq, index) => (
                                        <Card key={index}>
                                            <CardContent className="pt-6">
                                                <h3 className="text-lg font-semibold mb-2">{faq.q}</h3>
                                                <p className="text-muted-foreground">{faq.a}</p>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* CTA */}
                        <div className="mt-12 p-8 bg-muted/50 rounded-lg text-center">
                            <h3 className="text-2xl font-bold mb-4">Book Your Appointment in {locationData.area}</h3>
                            <p className="text-muted-foreground mb-6">
                                Professional physiotherapy services delivered to your doorstep in {locationData.area}, {locationData.city}
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button size="lg" asChild>
                                    <Link href="/booking">Book Appointment</Link>
                                </Button>
                                <Button size="lg" variant="outline" asChild>
                                    <Link href="/contact-us">Contact Us</Link>
                                </Button>
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
