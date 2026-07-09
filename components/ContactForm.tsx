"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { submitContact } from "@/app/actions";
import HoneypotFields from "@/components/HoneypotFields";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";

type FieldErrors = Partial<Record<"name" | "email" | "message", string>>;

export function ContactForm() {
    const [isPending, startTransition] = useTransition();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
    });
    const [errors, setErrors] = useState<FieldErrors>({});
    const [serverError, setServerError] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const clearError = (field: keyof FieldErrors) =>
        setErrors((prev) => ({ ...prev, [field]: undefined }));

    const validate = (): FieldErrors => {
        const next: FieldErrors = {};
        if (!formData.name.trim()) next.name = "Please enter your full name.";
        if (!formData.email.trim()) {
            next.email = "Please enter your email address.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
            next.email = "Please enter a valid email address (e.g. name@example.com).";
        }
        if (!formData.message.trim()) next.message = "Please enter your message.";
        return next;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setServerError("");
        setSubmitted(false);

        const fieldErrors = validate();
        if (Object.keys(fieldErrors).length > 0) {
            setErrors(fieldErrors);
            toast.error("Please fix the highlighted fields.");
            return;
        }
        setErrors({});

        const formDataObj = new FormData(e.currentTarget);

        startTransition(async () => {
            try {
                const result = await submitContact(formDataObj);

                if (result.success) {
                    toast.success(result.message);
                    setSubmitted(true);
                    setFormData({
                        name: "",
                        email: "",
                        phone: "",
                        subject: "",
                        message: "",
                    });
                } else {
                    setServerError(result.message);
                    toast.error(result.message);
                }
            } catch {
                const message = "Something went wrong while sending your message. Please try again, or call us at +91 82337 87737.";
                setServerError(message);
                toast.error(message);
            }
        });
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Send us a Message</CardTitle>
                <CardDescription>
                    Fill out the form below and we'll get back to you as soon as possible
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                    <HoneypotFields />

                    {serverError && (
                        <div role="alert" className="flex items-start gap-2 rounded-xl border border-red-300 bg-red-50 p-4 text-sm font-medium text-red-700">
                            <AlertCircle className="h-5 w-5 flex-shrink-0" />
                            <span>{serverError}</span>
                        </div>
                    )}
                    {submitted && (
                        <div role="status" className="flex items-start gap-2 rounded-xl border border-green-300 bg-green-50 p-4 text-sm font-medium text-green-700">
                            <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
                            <span>Message sent successfully! We&apos;ll get back to you soon.</span>
                        </div>
                    )}

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
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="+91 98765 43210"
                        />
                    </div>

                    <div>
                        <Label htmlFor="subject">Subject</Label>
                        <Input
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                            placeholder="What is this regarding?"
                        />
                    </div>

                    <div>
                        <Label htmlFor="message">Message *</Label>
                        <Textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={(e) => { setFormData({ ...formData, message: e.target.value }); clearError("message"); }}
                            placeholder="Tell us how we can help you"
                            rows={6}
                            aria-invalid={!!errors.message}
                            className={errors.message ? "input-error" : ""}
                        />
                        {errors.message && <p className="form-error" role="alert">{errors.message}</p>}
                    </div>

                    <Button type="submit" className="w-full" size="lg" disabled={isPending}>
                        {isPending ? "Sending..." : "Send Message"}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
