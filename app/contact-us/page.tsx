import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import CTABar from "@/components/CTABar";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { ContactForm } from "@/components/ContactForm";
import { Mail, MapPin, Phone } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact Us | Get in Touch | Physio At Your Doorstep",
    description: "Contact Physio At Your Doorstep for professional home physiotherapy services. Call us, email us, or fill out our contact form. We're here to help!",
};

export default function ContactUsPage() {
    const whatsappNumber = "918233787737";

    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-1">
                {/* Hero Section */}
                <section className="py-16 md:py-24 bg-gradient-to-br from-primary/10 to-secondary/10">
                    <div className="container">
                        <div className="max-w-3xl mx-auto text-center">
                            <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
                            <p className="text-xl text-muted-foreground">
                                Have questions? We're here to help. Reach out to us through any of the channels below
                            </p>
                        </div>
                    </div>
                </section>

                {/* Contact Section */}
                <section className="py-16 md:py-24">
                    <div className="container">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                            {/* Contact Information */}
                            <div className="space-y-8">
                                <div>
                                    <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
                                    <p className="text-muted-foreground mb-8">
                                        We're available to answer your questions and schedule appointments. Choose the
                                        contact method that works best for you.
                                    </p>
                                </div>

                                <div className="space-y-6">
                                    <Card>
                                        <CardContent className="pt-6">
                                            <div className="flex items-start gap-4">
                                                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                                                    <Phone className="h-6 w-6 text-primary" />
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold mb-1">Phone</h3>
                                                    <p className="text-muted-foreground mb-2">
                                                        Call us for immediate assistance
                                                    </p>
                                                    <a
                                                        href="tel:+918233787737"
                                                        className="text-primary hover:underline"
                                                    >
                                                        +91 82337 87737
                                                    </a>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    <Card>
                                        <CardContent className="pt-6">
                                            <div className="flex items-start gap-4">
                                                <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0">
                                                    <Mail className="h-6 w-6 text-secondary" />
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold mb-1">Email</h3>
                                                    <p className="text-muted-foreground mb-2">
                                                        Send us an email anytime
                                                    </p>
                                                    <a
                                                        href="mailto:contact@physioatyourdoorstep.com"
                                                        className="text-primary hover:underline"
                                                    >
                                                        contact@physioatyourdoorstep.com
                                                    </a>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    <Card>
                                        <CardContent className="pt-6">
                                            <div className="flex items-start gap-4">
                                                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                                                    <MapPin className="h-6 w-6 text-accent" />
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold mb-1">Service Areas</h3>
                                                    <p className="text-muted-foreground">
                                                        We serve patients across Bangalore and Pune
                                                    </p>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>

                                <div className="pt-4">
                                    <Button size="lg" className="w-full sm:w-auto" asChild>
                                        <a
                                            href={`https://wa.me/${whatsappNumber}?text=Hi, I would like to know more about your services`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            WhatsApp Us
                                        </a>
                                    </Button>
                                </div>
                            </div>

                            {/* Contact Form */}
                            <div>
                                <ContactForm />
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
