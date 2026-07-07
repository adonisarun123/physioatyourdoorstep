import CTABar from "@/components/CTABar";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { BookingForm } from "@/components/BookingForm";
import { getAllServices } from "@/lib/content";
import { Clock, Home, ShieldCheck } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Book Appointment | Schedule Your Physiotherapy Session | Physio At Your Doorstep",
    description: "Book your home physiotherapy appointment online. Choose your service, preferred date and time. Professional physiotherapists at your doorstep.",
    alternates: { canonical: "/booking" },
    openGraph: { title: "Book an Appointment | Physio At Your Doorstep", url: "/booking", type: "website" },
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
                            <h1 className="heading-hero mt-6 mb-6">
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
                                    <Clock className="h-5 w-5 text-[#3B3B6D]" /> Same-day slots
                                </span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Booking Form */}
                <section className="section bg-white">
                    <div className="container max-w-2xl">
                        <BookingForm services={services} />

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
