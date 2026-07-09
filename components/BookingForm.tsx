"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { submitBooking } from "@/app/actions";
import HoneypotFields from "@/components/HoneypotFields";
import { AlertCircle, CheckCircle2, MessageCircle } from "lucide-react";
import { useState, useTransition } from "react";
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
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
        errors.email = "Please enter a valid email address (e.g. name@example.com).";
    }
    const digits = form.phone.replace(/\D/g, "");
    if (!form.phone.trim()) {
        errors.phone = "Please enter your phone number.";
    } else if (digits.length < 10) {
        errors.phone = "Please enter a valid 10-digit phone number.";
    }
    if (!form.serviceId) errors.serviceId = "Please select a service.";
    return errors;
}

const WHATSAPP_NUMBER = "918233787737";

export function BookingForm({ services }: BookingFormProps) {
    const [isPending, startTransition] = useTransition();
    const [formData, setFormData] = useState(EMPTY_FORM);
    const [errors, setErrors] = useState<FieldErrors>({});
    const [serverError, setServerError] = useState("");
    const [submitted, setSubmitted] = useState(false);

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
        setSubmitted(false);

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
                    toast.success(result.message);
                    setSubmitted(true);
                    setFormData(EMPTY_FORM);
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
        <Card>
            <CardHeader>
                <CardTitle>Appointment Details</CardTitle>
                <CardDescription>
                    Please provide your information and we&apos;ll get back to you shortly
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
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
                                <MessageCircle className="h-4 w-4" /> Send this booking on WhatsApp instead
                            </a>
                        </div>
                    )}
                    {submitted && (
                        <div role="status" className="flex items-start gap-2 rounded-xl border border-green-300 bg-green-50 p-4 text-sm font-medium text-green-700">
                            <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
                            <span>Booking submitted successfully! Our team will contact you shortly to confirm your appointment.</span>
                        </div>
                    )}

                    {/* Personal Information */}
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="name">Full Name *</Label>
                            <Input
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={(e) => { setFormData({ ...formData, name: e.target.value }); clearError("name"); }}
                                placeholder="Enter your full name"
                                aria-invalid={!!errors.name}
                                className={errors.name ? "input-error" : ""}
                            />
                            {errors.name && <p className="form-error" role="alert">{errors.name}</p>}
                        </div>

                        <div>
                            <Label htmlFor="email">Email Address *</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={(e) => { setFormData({ ...formData, email: e.target.value }); clearError("email"); }}
                                placeholder="your.email@example.com"
                                aria-invalid={!!errors.email}
                                className={errors.email ? "input-error" : ""}
                            />
                            {errors.email && <p className="form-error" role="alert">{errors.email}</p>}
                        </div>

                        <div>
                            <Label htmlFor="phone">Phone Number *</Label>
                            <Input
                                id="phone"
                                name="phone"
                                type="tel"
                                value={formData.phone}
                                onChange={(e) => { setFormData({ ...formData, phone: e.target.value }); clearError("phone"); }}
                                placeholder="+91 98765 43210"
                                aria-invalid={!!errors.phone}
                                className={errors.phone ? "input-error" : ""}
                            />
                            {errors.phone && <p className="form-error" role="alert">{errors.phone}</p>}
                        </div>
                    </div>

                    {/* Service Selection */}
                    <div>
                        <Label htmlFor="service">Select Service *</Label>
                        <Select
                            name="serviceId"
                            value={formData.serviceId}
                            onValueChange={(value) => { setFormData({ ...formData, serviceId: value }); clearError("serviceId"); }}
                        >
                            <SelectTrigger id="service" aria-invalid={!!errors.serviceId} className={errors.serviceId ? "input-error" : ""}>
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

                    {/* Location */}
                    <div>
                        <Label htmlFor="location">Your Area/Location</Label>
                        <Input
                            id="location"
                            name="locationArea"
                            value={formData.locationArea}
                            onChange={(e) => setFormData({ ...formData, locationArea: e.target.value })}
                            placeholder="e.g., Koramangala, Bangalore"
                        />
                    </div>

                    {/* Preferred Date & Time */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="date">Preferred Date</Label>
                            <Input
                                id="date"
                                name="preferredDate"
                                type="date"
                                value={formData.preferredDate}
                                onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                            />
                        </div>

                        <div>
                            <Label htmlFor="time">Preferred Time</Label>
                            <Select
                                name="preferredTime"
                                value={formData.preferredTime}
                                onValueChange={(value) => setFormData({ ...formData, preferredTime: value })}
                            >
                                <SelectTrigger id="time">
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

                    {/* Condition */}
                    <div>
                        <Label htmlFor="condition">Your Condition/Concern</Label>
                        <Input
                            id="condition"
                            name="condition"
                            value={formData.condition}
                            onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                            placeholder="e.g., Back pain, Sports injury"
                        />
                    </div>

                    {/* Additional Notes */}
                    <div>
                        <Label htmlFor="notes">Additional Notes</Label>
                        <Textarea
                            id="notes"
                            name="notes"
                            value={formData.notes}
                            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                            placeholder="Any additional information you'd like to share"
                            rows={4}
                        />
                    </div>

                    <Button type="submit" className="w-full" size="lg" disabled={isPending}>
                        {isPending ? "Submitting..." : "Submit Booking Request"}
                    </Button>
                    <a
                        href={whatsappHref()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex w-full items-center justify-center gap-2 rounded-full border-2 border-[#25D366] px-4 py-2.5 font-semibold text-[#1F2933] hover:bg-[#25D366]/10 transition-colors"
                    >
                        <MessageCircle className="h-5 w-5 text-[#25D366]" /> Or book instantly on WhatsApp
                    </a>
                </form>
            </CardContent>
        </Card>
    );
}
