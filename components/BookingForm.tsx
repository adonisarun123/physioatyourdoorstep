"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { submitBooking } from "@/app/actions";
import HoneypotFields from "@/components/HoneypotFields";
import { EMAIL_ERROR, MAX_LEN, PHONE_ERROR, isValidEmail, normalizeIndianMobile, todayISODate } from "@/lib/validation";
import { AlertCircle, CalendarDays, MessageCircle, Stethoscope, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";

interface BookingFormProps {
    services: Array<{ id: number; title: string; slug: string }>;
}

type FieldErrors = Partial<Record<"name" | "email" | "phone" | "serviceId", string>>;

const EMPTY_FORM = {
    name: "",
    email: "",
    phone: "",
    serviceId: "",
    locationArea: "",
    preferredDate: "",
    preferredTime: "",
    condition: "",
    notes: "",
};

/** Fallback list so the dropdown is never empty, even if services fail to load. */
const FALLBACK_SERVICES = [
    "Orthopaedic Physiotherapy",
    "Neurological Physiotherapy",
    "Sports Physiotherapy",
    "Geriatric Physiotherapy",
    "Post Surgical Physiotherapy",
    "Pediatric Physiotherapy",
    "Physiotherapy in Pregnancy",
    "Pulmonary Physiotherapy",
    "Corporate Wellness Physiotherapy Program",
    "Online Physiotherapy",
].map((title, i) => ({ id: i + 1, title, slug: "" }));

function validate(form: typeof EMPTY_FORM): FieldErrors {
    const errors: FieldErrors = {};
    if (!form.name.trim()) errors.name = "Please enter your full name.";
    if (!form.email.trim()) {
        errors.email = "Please enter your email address.";
    } else if (!isValidEmail(form.email)) {
        errors.email = EMAIL_ERROR;
    }
    if (!form.phone.trim()) {
        errors.phone = "Please enter your phone number.";
    } else if (!normalizeIndianMobile(form.phone)) {
        errors.phone = PHONE_ERROR;
    }
    if (!form.serviceId) errors.serviceId = "Please select a service.";
    return errors;
}

const WHATSAPP_NUMBER = "918233787737";

/** Shared field styling so every control lines up at the same height. */
const FIELD = "mt-1.5 h-11 rounded-xl";

function SectionHeading({ icon: Icon, children }: { icon: typeof User; children: React.ReactNode }) {
    return (
        <div className="flex items-center gap-2.5 border-b border-[#EEEEF7] pb-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#EEEEF7]">
                <Icon className="h-4 w-4 text-[#3B3B6D]" />
            </span>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-[#2A2A57]">{children}</h3>
        </div>
    );
}

function Required() {
    return <span className="text-[#E31E24]" aria-hidden="true"> *</span>;
}

export function BookingForm({ services }: BookingFormProps) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [formData, setFormData] = useState(EMPTY_FORM);

    // Pre-select the service when arriving from a service page (/booking?service=<slug>).
    // Reads window.location directly: on statically prerendered pages, useSearchParams
    // does not reliably expose the query on first load in production.
    useEffect(() => {
        const slug = new URLSearchParams(window.location.search).get("service");
        if (!slug) return;
        const match = services?.find((s) => s.slug === slug);
        if (match) {
            setFormData((prev) => (prev.serviceId ? prev : { ...prev, serviceId: match.id.toString() }));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const [errors, setErrors] = useState<FieldErrors>({});
    const [serverError, setServerError] = useState("");
    // Set after mount so the server-rendered HTML (UTC) never disagrees with
    // the user's local date and causes a hydration mismatch.
    const [minDate, setMinDate] = useState("");
    useEffect(() => setMinDate(todayISODate()), []);

    const serviceOptions = services && services.length > 0 ? services : FALLBACK_SERVICES;

    const whatsappHref = () => {
        const service = serviceOptions.find((s) => s.id.toString() === formData.serviceId)?.title;
        const lines = [
            "Hi, I would like to book a physiotherapy session.",
            formData.name && `Name: ${formData.name}`,
            formData.phone && `Phone: ${formData.phone}`,
            service && `Service: ${service}`,
            formData.locationArea && `Area: ${formData.locationArea}`,
            formData.preferredDate && `Preferred date: ${formData.preferredDate}`,
            formData.preferredTime && `Preferred time: ${formData.preferredTime}`,
            formData.condition && `Condition: ${formData.condition}`,
        ].filter(Boolean);
        return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
    };

    const clearError = (field: keyof FieldErrors) =>
        setErrors((prev) => ({ ...prev, [field]: undefined }));

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setServerError("");

        const fieldErrors = validate(formData);
        if (Object.keys(fieldErrors).length > 0) {
            setErrors(fieldErrors);
            toast.error("Please fix the highlighted fields.");
            return;
        }
        setErrors({});

        const formDataObj = new FormData(e.currentTarget);

        startTransition(async () => {
            try {
                const result = await submitBooking(formDataObj);

                if (result.success) {
                    router.push(
                        result.reference
                            ? `/booking/thank-you?ref=${encodeURIComponent(result.reference)}`
                            : "/booking/thank-you"
                    );
                } else {
                    setServerError(result.message);
                    toast.error(result.message);
                }
            } catch {
                const message = "Something went wrong while submitting. Please try again, or call us at +91 82337 87737.";
                setServerError(message);
                toast.error(message);
            }
        });
    };

    return (
        <Card className="border-[#DCDCEC] shadow-[0_10px_30px_rgba(35,35,74,0.08)]">
            <CardHeader className="border-b border-[#EEEEF7] [.border-b]:pb-5">
                <CardTitle className="text-xl text-[#1F2933]">Appointment Details</CardTitle>
                <CardDescription className="text-[#4B5563]">
                    Takes less than a minute — our team will call you back to confirm.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-8" noValidate>
                    <HoneypotFields />

                    {serverError && (
                        <div role="alert" className="rounded-xl border border-red-300 bg-red-50 p-4">
                            <div className="flex items-start gap-2 text-sm font-medium text-red-700">
                                <AlertCircle className="h-5 w-5 flex-shrink-0" />
                                <span>{serverError}</span>
                            </div>
                            <a
                                href={whatsappHref()}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-3 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
                            >
                                <MessageCircle className="h-4 w-4" /> Schedule on WhatsApp instead
                            </a>
                        </div>
                    )}

                    {/* Section 1 — Personal information */}
                    <div className="space-y-4">
                        <SectionHeading icon={User}>Your Details</SectionHeading>

                        <div>
                            <Label htmlFor="name" className="text-[#1F2933]">Full Name<Required /></Label>
                            <Input
                                id="name"
                                name="name"
                                autoComplete="name"
                                value={formData.name}
                                onChange={(e) => { setFormData({ ...formData, name: e.target.value }); clearError("name"); }}
                                placeholder="Enter your full name"
                                maxLength={MAX_LEN.name}
                                aria-invalid={!!errors.name}
                                className={`${FIELD} ${errors.name ? "input-error" : ""}`}
                            />
                            {errors.name && <p className="form-error" role="alert">{errors.name}</p>}
                        </div>

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div>
                                <Label htmlFor="phone" className="text-[#1F2933]">Phone Number<Required /></Label>
                                <Input
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    inputMode="tel"
                                    autoComplete="tel"
                                    value={formData.phone}
                                    onChange={(e) => { setFormData({ ...formData, phone: e.target.value }); clearError("phone"); }}
                                    placeholder="+91 98765 43210"
                                    maxLength={MAX_LEN.phone}
                                    aria-invalid={!!errors.phone}
                                    className={`${FIELD} ${errors.phone ? "input-error" : ""}`}
                                />
                                {errors.phone
                                    ? <p className="form-error" role="alert">{errors.phone}</p>
                                    : <p className="mt-1.5 text-xs text-[#6B7280]">10-digit Indian mobile — we&apos;ll call or WhatsApp you on this number.</p>}
                            </div>

                            <div>
                                <Label htmlFor="email" className="text-[#1F2933]">Email Address<Required /></Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    value={formData.email}
                                    onChange={(e) => { setFormData({ ...formData, email: e.target.value }); clearError("email"); }}
                                    placeholder="your.email@example.com"
                                    maxLength={MAX_LEN.email}
                                    aria-invalid={!!errors.email}
                                    className={`${FIELD} ${errors.email ? "input-error" : ""}`}
                                />
                                {errors.email && <p className="form-error" role="alert">{errors.email}</p>}
                            </div>
                        </div>
                    </div>

                    {/* Section 2 — Appointment preferences */}
                    <div className="space-y-4">
                        <SectionHeading icon={CalendarDays}>Appointment Preferences</SectionHeading>

                        <div>
                            <Label htmlFor="service" className="text-[#1F2933]">Select Service<Required /></Label>
                            <Select
                                name="serviceId"
                                value={formData.serviceId}
                                onValueChange={(value) => { setFormData({ ...formData, serviceId: value }); clearError("serviceId"); }}
                            >
                                <SelectTrigger
                                    id="service"
                                    aria-invalid={!!errors.serviceId}
                                    className={`${FIELD} w-full data-[size=default]:h-11 ${errors.serviceId ? "input-error" : ""}`}
                                >
                                    <SelectValue placeholder="Choose a service" />
                                </SelectTrigger>
                                <SelectContent>
                                    {serviceOptions.map((service) => (
                                        <SelectItem key={service.id} value={service.id.toString()}>
                                            {service.title}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.serviceId && <p className="form-error" role="alert">{errors.serviceId}</p>}
                        </div>

                        <div>
                            <Label htmlFor="location" className="text-[#1F2933]">Your Area/Location</Label>
                            <Input
                                id="location"
                                name="locationArea"
                                autoComplete="address-level3"
                                value={formData.locationArea}
                                onChange={(e) => setFormData({ ...formData, locationArea: e.target.value })}
                                placeholder="e.g., Koramangala, Bangalore"
                                maxLength={MAX_LEN.locationArea}
                                className={FIELD}
                            />
                        </div>

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div>
                                <Label htmlFor="date" className="text-[#1F2933]">Preferred Date</Label>
                                <Input
                                    id="date"
                                    name="preferredDate"
                                    type="date"
                                    min={minDate || undefined}
                                    value={formData.preferredDate}
                                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                                    className={FIELD}
                                />
                            </div>

                            <div>
                                <Label htmlFor="time" className="text-[#1F2933]">Preferred Time</Label>
                                <Select
                                    name="preferredTime"
                                    value={formData.preferredTime}
                                    onValueChange={(value) => setFormData({ ...formData, preferredTime: value })}
                                >
                                    <SelectTrigger id="time" className={`${FIELD} w-full data-[size=default]:h-11`}>
                                        <SelectValue placeholder="Select time" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="morning">Morning (8 AM - 12 PM)</SelectItem>
                                        <SelectItem value="afternoon">Afternoon (12 PM - 4 PM)</SelectItem>
                                        <SelectItem value="evening">Evening (4 PM - 8 PM)</SelectItem>
                                        <SelectItem value="night">Night (8 PM - 8 AM)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>

                    {/* Section 3 — Condition */}
                    <div className="space-y-4">
                        <SectionHeading icon={Stethoscope}>Tell Us About Your Condition</SectionHeading>

                        <div>
                            <Label htmlFor="condition" className="text-[#1F2933]">Your Condition/Concern</Label>
                            <Input
                                id="condition"
                                name="condition"
                                value={formData.condition}
                                onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                                placeholder="e.g., Back pain, Sports injury"
                                maxLength={MAX_LEN.condition}
                                className={FIELD}
                            />
                        </div>

                        <div>
                            <Label htmlFor="notes" className="text-[#1F2933]">Additional Notes</Label>
                            <Textarea
                                id="notes"
                                name="notes"
                                value={formData.notes}
                                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                placeholder="Any additional information you'd like to share"
                                maxLength={MAX_LEN.notes}
                                rows={4}
                                className="mt-1.5 rounded-xl"
                            />
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="space-y-3 pt-2">
                        <Button
                            type="submit"
                            size="lg"
                            disabled={isPending}
                            className="h-12 w-full rounded-full bg-[#3B3B6D] text-base font-semibold hover:bg-[#2A2A57]"
                        >
                            {isPending ? "Submitting..." : "Submit Booking Request"}
                        </Button>

                        <div className="flex items-center gap-3 text-xs font-medium uppercase tracking-wide text-[#6B7280]">
                            <span className="h-px flex-1 bg-[#DCDCEC]" />
                            or
                            <span className="h-px flex-1 bg-[#DCDCEC]" />
                        </div>

                        <a
                            href={whatsappHref()}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex h-12 w-full items-center justify-center gap-2 rounded-full border-2 border-[#25D366] font-semibold text-[#1F2933] transition-colors hover:bg-[#25D366]/10"
                        >
                            <MessageCircle className="h-5 w-5 text-[#25D366]" /> Schedule on WhatsApp
                        </a>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
