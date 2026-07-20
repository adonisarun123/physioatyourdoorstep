import CTABar from "@/components/CTABar";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { BookingForm } from "@/components/BookingForm";
import { getAllServices } from "@/lib/content";
import { Clock, Home, ShieldCheck } from "lucide-react";
import { Suspense } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Book Appointment | Schedule Your Physiotherapy Session",
    description: "Book your home physiotherapy appointment online. Choose your service, preferred date and time. Professional physiotherapists at your doorstep.",
    alternates: { canonical: "/booking" },
    openGraph: { title: "Book an Appointment | Physio At Your Doorstep", url: "/booking", type: "website", images: ["/images/logo-square.webp"], },
};

export default function BookingPage() {
    const services = getAllServices();

    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-1">
                {/* Hero Section */}
                <section className="relative bg-gradient-to-br from-[#EEEEF7] via-white to-[#EEEEF7] section">
                    <div className="container">
                        <div className="max-w-3xl mx-auto text-center">
                            <span className="pill bg-[#3B3B6D]/10 text-[#2A2A57] border border-[#DCDCEC]">
                                Book Online
                            </span>
                            <h1 className="heading-hero mt-4 mb-4">
                                Book an <span className="text-[#E31E24]">Appointment</span>
                            </h1>
                            <p className="text-lg text-[#4B5563] leading-relaxed">
                                Fill out the form below and our team will contact you to confirm your appointment.
                            </p>
                            <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-[#4B5563]">
                                <span className="inline-flex items-center gap-2">
                                    <ShieldCheck className="h-5 w-5 text-[#3B3B6D]" /> Certified physios
                                </span>
                                <span className="inline-flex items-center gap-2">
                                    <Home className="h-5 w-5 text-[#3B3B6D]" /> At your home
                                </span>
                                <span className="inline-flex items-center gap-2">
                                    <Clock className="h-5 w-5 text-[#3B3B6D]" /> Available 24×7
                                </span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 3 Steps to Book */}
                <section className="section-sm bg-white">
                    <div className="container">
                        <div className="text-center mb-10">
                            <span className="text-sm font-semibold text-[#E31E24] uppercase tracking-wide">Patient Journey</span>
                            <h2 className="heading-section mt-3">
                                Your Recovery in <span className="text-[#3B3B6D]">3 Simple Steps</span>
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[
                                {
                                    icon: "/images/step-connect.png",
                                    title: "1. Tell Us Your Problem",
                                    description: "Fill the form below, or call/WhatsApp us with your condition and location.",
                                },
                                {
                                    icon: "/images/step-calendar.png",
                                    title: "2. Get Matched With the Right Physio",
                                    description: "We assign the physiotherapist best suited to your condition, who contacts you to fix a slot.",
                                },
                                {
                                    icon: "/images/step-confirmation.png",
                                    title: "3. Start Recovery at Home",
                                    description: "Your physiotherapist arrives at your doorstep at the scheduled time.",
                                },
                            ].map((step) => (
                                <div key={step.title} className="card-physio text-center">
                                    <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={step.icon} alt={step.title} className="w-14 h-14 object-contain" loading="lazy" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-[#1F2933] mb-2">{step.title}</h3>
                                    <p className="text-[#4B5563] text-sm">{step.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Booking Form */}
                <section className="section bg-white">
                    <div className="container max-w-2xl">
                        <Suspense fallback={null}>
                            <BookingForm services={services} />
                        </Suspense>

                        <div className="mt-8 text-center text-sm text-[#4B5563]">
                            <p>
                                By submitting this form, you agree to be contacted by our team regarding your appointment.
                            </p>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
            <CTABar />
        </div>
    );
}
