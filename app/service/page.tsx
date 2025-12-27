import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import CTABar from "@/components/CTABar";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { getAllServices } from "@/lib/db";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Our Services | Professional Physiotherapy Treatments | Physio At Your Doorstep",
    description: "Comprehensive physiotherapy services including sports physiotherapy, post-surgical rehabilitation, neurological care, geriatric therapy, and more. Expert treatment at your home.",
};

export default async function ServicesPage() {
    const services = await getAllServices();

    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-1">
                {/* Hero Section */}
                <section className="py-16 md:py-24 bg-gradient-to-br from-primary/10 to-secondary/10">
                    <div className="container">
                        <div className="max-w-3xl mx-auto text-center">
                            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Services</h1>
                            <p className="text-xl text-muted-foreground">
                                Comprehensive physiotherapy services tailored to your specific needs, delivered
                                professionally at your doorstep
                            </p>
                        </div>
                    </div>
                </section>

                {/* Services Grid */}
                <section className="py-16 md:py-24">
                    <div className="container">
                        {services && services.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {services.map((service) => (
                                    <Card key={service.id} className="hover:shadow-lg transition-shadow">
                                        <CardHeader>
                                            <CardTitle className="text-xl">{service.title}</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <CardDescription className="mb-4">
                                                {service.metaDescription || service.heroSubheadline || "Professional physiotherapy service"}
                                            </CardDescription>
                                            <Button variant="outline" className="w-full" asChild>
                                                <Link href={`/service/${service.slug}`}>
                                                    Learn More
                                                    <ArrowRight className="ml-2 h-4 w-4" />
                                                </Link>
                                            </Button>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <p className="text-muted-foreground mb-4">No services available at the moment.</p>
                                <Button asChild>
                                    <Link href="/contact-us">Contact Us</Link>
                                </Button>
                            </div>
                        )}
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-16 md:py-24 bg-primary text-primary-foreground">
                    <div className="container text-center">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Not Sure Which Service You Need?
                        </h2>
                        <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
                            Contact us for a free consultation. Our experts will assess your condition and recommend
                            the best treatment plan for you.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button size="lg" variant="secondary" asChild>
                                <Link href="/booking">Book Consultation</Link>
                            </Button>
                            <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
                                <Link href="/contact-us">Contact Us</Link>
                            </Button>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
            <CTABar />
        </div>
    );
}
