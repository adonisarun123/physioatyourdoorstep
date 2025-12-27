import CTABar from "@/components/CTABar";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { BookingForm } from "@/components/BookingForm";
import { getAllServices } from "@/lib/db";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Book Appointment | Schedule Your Physiotherapy Session | Physio At Your Doorstep",
    description: "Book your home physiotherapy appointment online. Choose your service, preferred date and time. Professional physiotherapists at your doorstep.",
};

export default async function BookingPage() {
    const services = await getAllServices();

    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-1">
                {/* Hero Section */}
                <section className="py-16 md:py-24 bg-gradient-to-br from-primary/10 to-secondary/10">
                    <div className="container">
                        <div className="max-w-3xl mx-auto text-center">
                            <h1 className="text-4xl md:text-5xl font-bold mb-6">Book an Appointment</h1>
                            <p className="text-xl text-muted-foreground">
                                Fill out the form below and our team will contact you to confirm your appointment
                            </p>
                        </div>
                    </div>
                </section>

                {/* Booking Form */}
                <section className="py-16 md:py-24">
                    <div className="container max-w-2xl">
                        <BookingForm services={services} />

                        <div className="mt-8 text-center text-sm text-muted-foreground">
                            <p>
                                By submitting this form, you agree to be contacted by our team regarding your
                                appointment.
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
