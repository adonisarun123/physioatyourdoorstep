import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import CTABar from "@/components/CTABar";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { getAllServices, getServiceBySlug } from "@/lib/db";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export async function generateStaticParams() {
    const services = await getAllServices();
    return services.map((service) => ({
        slug: service.slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const service = await getServiceBySlug(slug);

    if (!service) {
        return {
            title: "Service Not Found",
        };
    }

    return {
        title: service.metaTitle || service.title,
        description: service.metaDescription || `Professional ${service.title} services at your doorstep`,
    };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const service = await getServiceBySlug(slug);

    if (!service) {
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
                            <h1 className="text-4xl md:text-5xl font-bold mb-6">
                                {service.heroHeadline || service.title}
                            </h1>
                            {service.heroSubheadline && (
                                <p className="text-xl text-muted-foreground">
                                    {service.heroSubheadline}
                                </p>
                            )}
                        </div>
                    </div>
                </section>

                {/* Content Section */}
                <section className="py-16 md:py-24">
                    <div className="container max-w-4xl">
                        {service.content && (
                            <div
                                className="prose prose-lg max-w-none mb-12"
                                dangerouslySetInnerHTML={{ __html: service.content }}
                            />
                        )}

                        {/* FAQs */}
                        {service.faqs && service.faqs.length > 0 && (
                            <div className="mt-16">
                                <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions</h2>
                                <div className="space-y-6">
                                    {service.faqs.map((faq, index) => (
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
                            <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
                            <p className="text-muted-foreground mb-6">
                                Book your appointment today and experience professional physiotherapy at your doorstep
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
