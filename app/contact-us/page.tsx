import CTABar from "@/components/CTABar";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { ContactForm } from "@/components/ContactForm";
import { SITE } from "@/lib/seo";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact Us | Get in Touch | Physio At Your Doorstep",
    description: "Contact Physio At Your Doorstep for professional home physiotherapy services. Call us, email us, or fill out our contact form. We're here to help!",
    alternates: { canonical: "/contact-us" },
    openGraph: { title: "Contact Us | Physio At Your Doorstep", url: "/contact-us", type: "website", images: ["/images/logo-square.webp"], },
};

export default function ContactUsPage() {
    const whatsappNumber = SITE.phoneRaw.replace("+", "");

    const contactMethods = [
        {
            icon: Phone,
            title: "Phone",
            description: "Call us for immediate assistance",
            value: SITE.phone,
            href: `tel:${SITE.phoneRaw}`,
        },
        {
            icon: Mail,
            title: "Email",
            description: "Send us an email anytime",
            value: SITE.email,
            href: `mailto:${SITE.email}`,
        },
    ];

    const availability = { icon: Clock, title: "Working Hours", value: "Available 24×7 — all days of the week" };

    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-1">
                {/* Hero Section */}
                <section className="relative bg-gradient-to-br from-[#EEEEF7] via-white to-[#EEEEF7] section">
                    <div className="container">
                        <div className="max-w-3xl mx-auto text-center">
                            <span className="pill bg-[#3B3B6D]/10 text-[#2A2A57] border border-[#DCDCEC]">
                                Contact Us
                            </span>
                            <h1 className="heading-hero mt-6 mb-6">
                                We&apos;re Here to <span className="text-[#E31E24]">Help</span>
                            </h1>
                            <p className="text-lg text-[#4B5563] leading-relaxed">
                                Have questions? Reach out through any of the channels below and our team will get back to you.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Contact Section */}
                <section className="section bg-white">
                    <div className="container">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                            {/* Contact Information */}
                            <div className="space-y-8">
                                <div>
                                    <h2 className="heading-subsection text-[#1F2933] mb-4">Get in Touch</h2>
                                    <p className="text-[#4B5563]">
                                        We&apos;re available to answer your questions and schedule appointments. Choose the
                                        contact method that works best for you.
                                    </p>
                                </div>

                                <div className="space-y-4">
                                    {contactMethods.map((m) => (
                                        <a key={m.title} href={m.href} className="card-physio flex items-start gap-4 !py-5">
                                            <div className="w-12 h-12 rounded-xl bg-[#EEEEF7] flex items-center justify-center flex-shrink-0">
                                                <m.icon className="h-6 w-6 text-[#3B3B6D]" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-[#1F2933] mb-1">{m.title}</h3>
                                                <p className="text-[#4B5563] text-sm mb-1">{m.description}</p>
                                                <span className="text-[#E31E24] font-medium break-all">{m.value}</span>
                                            </div>
                                        </a>
                                    ))}
                                    <div className="card-physio flex items-start gap-4 !py-5">
                                        <div className="w-12 h-12 rounded-xl bg-[#FDECEC] flex items-center justify-center flex-shrink-0">
                                            <availability.icon className="h-6 w-6 text-[#E31E24]" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-[#1F2933] mb-1">{availability.title}</h3>
                                            <p className="text-[#E31E24] text-sm font-semibold">{availability.value}</p>
                                        </div>
                                    </div>
                                    <div className="card-physio flex items-start gap-4 !py-5">
                                        <div className="w-12 h-12 rounded-xl bg-[#EEEEF7] flex items-center justify-center flex-shrink-0">
                                            <MapPin className="h-6 w-6 text-[#3B3B6D]" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-[#1F2933] mb-1">Service Areas</h3>
                                            <p className="text-[#4B5563] text-sm">We serve patients across Bangalore and Pune</p>
                                        </div>
                                    </div>
                                </div>

                                <a
                                    href={`https://wa.me/${whatsappNumber}?text=Hi, I would like to know more about your services`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-primary w-full sm:w-auto"
                                >
                                    WhatsApp Us
                                </a>
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
