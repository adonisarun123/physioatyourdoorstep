import CTABar from "@/components/CTABar";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { SITE } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Terms of Service | Physio At Your Doorstep",
    description: "Terms governing the use of Physio At Your Doorstep's website and home physiotherapy services.",
    alternates: { canonical: "/terms-of-service" },
    robots: { index: true, follow: true },
};

export default function TermsOfServicePage() {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
                <section className="relative bg-gradient-to-br from-[#EEEEF7] via-white to-[#EEEEF7] section-sm">
                    <div className="container max-w-3xl">
                        <h1 className="heading-hero">Terms of <span className="text-[#E31E24]">Service</span></h1>
                        <p className="text-[#4B5563] mt-3">Last updated: July 2026</p>
                    </div>
                </section>
                <section className="section-sm bg-white">
                    <div className="container max-w-3xl space-y-8 text-[#4B5563] leading-relaxed">
                        <div>
                            <h2 className="heading-subsection text-[#1F2933] mb-3">Our Services</h2>
                            <p>
                                {SITE.name} provides professional physiotherapy services delivered at your home or chosen
                                location across Bangalore and Pune. Booking a session through this website, by phone, or on
                                WhatsApp constitutes acceptance of these terms.
                            </p>
                        </div>
                        <div>
                            <h2 className="heading-subsection text-[#1F2933] mb-3">Appointments &amp; Cancellations</h2>
                            <p>
                                Appointment requests made through this website are confirmed by our team by phone or
                                WhatsApp before they become binding. If you need to reschedule or cancel, please inform us
                                as early as possible so the slot can be offered to another patient.
                            </p>
                        </div>
                        <div>
                            <h2 className="heading-subsection text-[#1F2933] mb-3">Medical Disclaimer</h2>
                            <p>
                                Content on this website, including blog articles, is provided for general information and
                                education only. It is not a substitute for a professional diagnosis or personalised medical
                                advice. Always consult a qualified healthcare professional about your specific condition.
                                Treatment plans are prepared individually after assessment, and outcomes vary from person to
                                person.
                            </p>
                        </div>
                        <div>
                            <h2 className="heading-subsection text-[#1F2933] mb-3">Payments</h2>
                            <p>
                                Fees are communicated before your session begins. Payment terms, accepted methods, and any
                                package pricing are confirmed directly with our team at the time of booking.
                            </p>
                        </div>
                        <div>
                            <h2 className="heading-subsection text-[#1F2933] mb-3">Limitation of Liability</h2>
                            <p>
                                While our physiotherapists follow evidence-based protocols and exercise all reasonable
                                professional care, {SITE.name} is not liable for outcomes arising from information withheld
                                during assessment, non-adherence to prescribed home-exercise programs, or use of website
                                content without professional consultation.
                            </p>
                        </div>
                        <div>
                            <h2 className="heading-subsection text-[#1F2933] mb-3">Contact</h2>
                            <p>
                                Questions about these terms? Write to{" "}
                                <a href={`mailto:${SITE.email}`} className="text-[#E31E24] font-medium">{SITE.email}</a> or
                                call <a href={`tel:${SITE.phoneRaw}`} className="text-[#E31E24] font-medium">{SITE.phone}</a>.
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
