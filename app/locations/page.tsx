import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import CTABar from "@/components/CTABar";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { MapPin } from "lucide-react";
import Link from "next/link";
import { getAllLocations } from "@/lib/db";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Our Locations | Home Physiotherapy Services | Physio At Your Doorstep",
    description: "We provide professional home physiotherapy services across multiple locations in Bangalore and Pune. Find a physiotherapist near you.",
};

export default async function LocationsPage() {
    const locations = await getAllLocations();

    // Group locations by city
    const locationsByCity = locations.reduce((acc, location) => {
        if (!acc[location.city]) {
            acc[location.city] = [];
        }
        acc[location.city].push(location);
        return acc;
    }, {} as Record<string, typeof locations>);

    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-1">
                {/* Hero Section */}
                <section className="py-16 md:py-24 bg-gradient-to-br from-primary/10 to-secondary/10">
                    <div className="container">
                        <div className="max-w-3xl mx-auto text-center">
                            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Locations</h1>
                            <p className="text-xl text-muted-foreground">
                                Professional physiotherapy services delivered to your doorstep across multiple locations
                            </p>
                        </div>
                    </div>
                </section>

                {/* Locations Grid */}
                <section className="py-16 md:py-24">
                    <div className="container">
                        {Object.entries(locationsByCity).map(([city, cityLocations]) => (
                            <div key={city} className="mb-12 last:mb-0">
                                <h2 className="text-3xl font-bold mb-6">{city}</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {cityLocations.map((location) => (
                                        <Card key={location.id} className="hover:shadow-lg transition-shadow">
                                            <CardHeader>
                                                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                                                    <MapPin className="h-6 w-6 text-primary" />
                                                </div>
                                                <CardTitle className="text-xl">{location.title}</CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <CardDescription className="mb-4">
                                                    {location.metaDescription?.slice(0, 120)}...
                                                </CardDescription>
                                                <Button variant="outline" className="w-full" asChild>
                                                    <Link href={`/${location.slug}`}>
                                                        View Details
                                                    </Link>
                                                </Button>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-16 md:py-24 bg-primary text-primary-foreground">
                    <div className="container text-center">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Don't See Your Location?
                        </h2>
                        <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
                            We're constantly expanding our service areas. Contact us to check if we can serve your location.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button size="lg" variant="secondary" asChild>
                                <Link href="/contact-us">Contact Us</Link>
                            </Button>
                            <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
                                <Link href="/booking">Book Appointment</Link>
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
