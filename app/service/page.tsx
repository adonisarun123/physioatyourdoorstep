import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import CTABar from "@/components/CTABar";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { ArrowRight, Activity, Heart, Baby, Users, Stethoscope, Brain, Bone, Wind, UserCheck, Video } from "lucide-react";
import Link from "next/link";
import { getAllServiceSlugs, getServiceMarkdown } from "@/lib/markdown";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Our Services | Professional Physiotherapy Treatments | Physio At Your Doorstep",
    description: "Comprehensive physiotherapy services including sports physiotherapy, post-surgical rehabilitation, neurological care, geriatric therapy, and more. Expert treatment at your home.",
};

// Service icons mapping
const serviceIcons: Record<string, any> = {
    "sports-physiotherapy": Activity,
    "geriatric-physiotherapy": Heart,
    "pediatric-physiotherapy": Baby,
    "corporate-wellness-physiotherapy": Users,
    "post-surgical-physiotherapy": Stethoscope,
    "neurological-physiotherapy": Brain,
    "orthopaedic-physiotherapy": Bone,
    "pulmonary-physiotherapy": Wind,
    "physiotherapy-during-pregnancy": UserCheck,
    "online-physiotherapy-consultation": Video,
};

export default async function ServicesPage() {
    const slugs = getAllServiceSlugs();

    // Fetch all services with their content
    const services = await Promise.all(
        slugs.map(async (slug) => {
            const content = await getServiceMarkdown(slug);
            return {
                slug,
                title: content?.title || slug.replace(/-/g, ' '),
                description: content?.content.split('\n\n').find(p => !p.startsWith('#') && p.trim().length > 0)?.substring(0, 150) + '...' || '',
                icon: serviceIcons[slug] || Activity,
            };
        })
    );

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
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {services.map((service) => {
                                const Icon = service.icon;
                                return (
                                    <Card
                                        key={service.slug}
                                        className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
                                    >
                                        <CardHeader>
                                            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                                                <Icon className="h-6 w-6 text-primary" />
                                            </div>
                                            <CardTitle className="text-xl capitalize">
                                                {service.title}
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <CardDescription className="mb-4 line-clamp-3">
                                                {service.description}
                                            </CardDescription>
                                            <Button
                                                variant="outline"
                                                className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                                                asChild
                                            >
                                                <Link href={`/service/${service.slug}`}>
                                                    Learn More
                                                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                                </Link>
                                            </Button>
                                        </CardContent>
                                    </Card>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="py-16 md:py-24 bg-muted/30">
                    <div className="container">
                        <div className="max-w-3xl mx-auto text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Us?</h2>
                            <p className="text-muted-foreground text-lg">
                                Professional physiotherapy services with a personal touch
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="text-center">
                                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                                    <Users className="h-8 w-8 text-primary" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Expert Therapists</h3>
                                <p className="text-muted-foreground">
                                    Qualified and experienced physiotherapists dedicated to your recovery
                                </p>
                            </div>
                            <div className="text-center">
                                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                                    <Heart className="h-8 w-8 text-primary" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Personalized Care</h3>
                                <p className="text-muted-foreground">
                                    Customized treatment plans tailored to your specific needs and goals
                                </p>
                            </div>
                            <div className="text-center">
                                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                                    <Stethoscope className="h-8 w-8 text-primary" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Home Convenience</h3>
                                <p className="text-muted-foreground">
                                    Professional treatment in the comfort and safety of your own home
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-16 md:py-24 bg-gradient-to-br from-primary to-primary/90 text-primary-foreground">
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
                            <Button
                                size="lg"
                                variant="outline"
                                className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                                asChild
                            >
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
