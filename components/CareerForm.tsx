"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import HoneypotFields from "@/components/HoneypotFields";
import { submitApplication } from "@/app/actions";
import { CAREER_AREAS } from "@/lib/careers";
import {
    EMAIL_ERROR,
    MAX_LEN,
    PHONE_ERROR,
    RESUME_ACCEPT,
    RESUME_EXT_REGEX,
    RESUME_MAX_BYTES,
    isValidEmail,
    normalizeIndianMobile,
} from "@/lib/validation";
import { AlertCircle, CheckCircle2, MessageCircle, Paperclip } from "lucide-react";
import { useRef, useState, useTransition } from "react";
import { toast } from "sonner";

const WHATSAPP_NUMBER = "918233787737";

/** Shared styling for the native selects so they match the shadcn inputs. */
const SELECT_CLASS =
    "flex h-11 w-full rounded-xl border border-input bg-transparent px-3 py-1 text-base shadow-xs outline-none transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm";

type Field =
    | "fullName"
    | "email"
    | "phone"
    | "area"
    | "otherArea"
    | "employmentType"
    | "qualification"
    | "experience"
    | "hasTwoWheeler"
    | "resume";

type FieldErrors = Partial<Record<Field, string>>;

export default function CareerForm({ defaultArea }: { defaultArea?: string }) {
    const [isPending, startTransition] = useTransition();
    const formRef = useRef<HTMLFormElement>(null);
    const [values, setValues] = useState({
        fullName: "",
        email: "",
        phone: "",
        area: defaultArea ?? "",
        otherArea: "",
        employmentType: "",
        qualification: "",
        experience: "",
        hasTwoWheeler: "",
        currentEmployer: "",
        message: "",
    });
    const [resumeName, setResumeName] = useState("");
    const [errors, setErrors] = useState<FieldErrors>({});
    const [serverError, setServerError] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const set = (field: keyof typeof values, value: string) => {
        setValues((prev) => ({ ...prev, [field]: value }));
        setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

    /** Fallback when the application can't be delivered. */
    const whatsappHref = () => {
        const lines = [
            "Hi, I tried to apply for a physiotherapist role on your website but the form didn't go through.",
            values.fullName && `Name: ${values.fullName}`,
            values.phone && `Phone: ${values.phone}`,
            values.area && `Area: ${values.area === "other" ? values.otherArea : values.area}`,
            values.employmentType && `Looking for: ${values.employmentType}`,
            "I'll send my CV here.",
        ].filter(Boolean);
        return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
    };

    const validate = (file: File | undefined): FieldErrors => {
        const next: FieldErrors = {};
        if (!values.fullName.trim()) next.fullName = "Please enter your full name.";
        if (!values.email.trim()) next.email = "Please enter your email address.";
        else if (!isValidEmail(values.email)) next.email = EMAIL_ERROR;
        if (!values.phone.trim()) next.phone = "Please enter your mobile number.";
        else if (!normalizeIndianMobile(values.phone)) next.phone = PHONE_ERROR;
        if (!values.area) next.area = "Please choose the area you can work in.";
        if (values.area === "other" && !values.otherArea.trim())
            next.otherArea = "Please tell us which area of Bangalore you can cover.";
        if (!values.employmentType) next.employmentType = "Please choose full-time, part-time or freelance.";
        if (!values.qualification) next.qualification = "Please select your qualification.";
        if (!values.experience) next.experience = "Please select your years of experience.";
        if (!values.hasTwoWheeler) next.hasTwoWheeler = "Please answer this — home visits need your own transport.";
        if (!file || file.size === 0) next.resume = "Please attach your CV (PDF or Word, up to 3 MB).";
        else if (file.size > RESUME_MAX_BYTES) next.resume = "That file is larger than 3 MB. Please upload a smaller CV.";
        else if (!RESUME_EXT_REGEX.test(file.name)) next.resume = "Please upload a PDF or Word document.";
        return next;
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setServerError("");
        setSubmitted(false);

        const formDataObj = new FormData(e.currentTarget);
        const file = formDataObj.get("resume");
        const fieldErrors = validate(file instanceof File ? file : undefined);
        if (Object.keys(fieldErrors).length > 0) {
            setErrors(fieldErrors);
            toast.error("Please fix the highlighted fields.");
            return;
        }
        setErrors({});

        startTransition(async () => {
            try {
                const result = await submitApplication(formDataObj);
                if (result.success) {
                    toast.success(result.message);
                    setSubmitted(true);
                    setValues({
                        fullName: "",
                        email: "",
                        phone: "",
                        area: defaultArea ?? "",
                        otherArea: "",
                        employmentType: "",
                        qualification: "",
                        experience: "",
                        hasTwoWheeler: "",
                        currentEmployer: "",
                        message: "",
                    });
                    setResumeName("");
                    formRef.current?.reset();
                } else {
                    setServerError(result.message);
                    toast.error(result.message);
                }
            } catch {
                const message =
                    "Something went wrong while sending your application. Please try again, or WhatsApp your CV to +91 82337 87737.";
                setServerError(message);
                toast.error(message);
            }
        });
    };

    return (
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-5" noValidate>
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
                        <MessageCircle className="h-4 w-4" /> Send on WhatsApp instead
                    </a>
                </div>
            )}

            {submitted && (
                <div
                    role="status"
                    className="flex items-start gap-2 rounded-xl border border-green-300 bg-green-50 p-4 text-sm font-medium text-green-700"
                >
                    <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
                    <span>
                        Application received. Our clinical team reviews every CV — if there&apos;s a fit for your area,
                        we&apos;ll call you.
                    </span>
                </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                        id="fullName"
                        name="fullName"
                        value={values.fullName}
                        onChange={(e) => set("fullName", e.target.value)}
                        placeholder="Dr. Your Name"
                        maxLength={MAX_LEN.name}
                        aria-invalid={!!errors.fullName}
                        className={errors.fullName ? "input-error" : ""}
                    />
                    {errors.fullName && <p className="form-error" role="alert">{errors.fullName}</p>}
                </div>

                <div>
                    <Label htmlFor="phone">Mobile Number *</Label>
                    <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={values.phone}
                        onChange={(e) => set("phone", e.target.value)}
                        placeholder="+91 98765 43210"
                        maxLength={MAX_LEN.phone}
                        aria-invalid={!!errors.phone}
                        className={errors.phone ? "input-error" : ""}
                    />
                    {errors.phone && <p className="form-error" role="alert">{errors.phone}</p>}
                </div>
            </div>

            <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                    id="email"
                    name="email"
                    type="email"
                    value={values.email}
                    onChange={(e) => set("email", e.target.value)}
                    placeholder="your.email@example.com"
                    maxLength={MAX_LEN.email}
                    aria-invalid={!!errors.email}
                    className={errors.email ? "input-error" : ""}
                />
                {errors.email && <p className="form-error" role="alert">{errors.email}</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                    <Label htmlFor="area">Area you can work in *</Label>
                    <select
                        id="area"
                        name="area"
                        value={values.area}
                        onChange={(e) => set("area", e.target.value)}
                        aria-invalid={!!errors.area}
                        className={`${SELECT_CLASS} ${errors.area ? "input-error" : ""}`}
                    >
                        <option value="">Select your area</option>
                        {CAREER_AREAS.map((a) => (
                            <option key={a.slug} value={a.area}>
                                {a.area}
                            </option>
                        ))}
                        <option value="other">Other area in Bangalore</option>
                    </select>
                    {errors.area && <p className="form-error" role="alert">{errors.area}</p>}
                </div>

                <div>
                    <Label htmlFor="employmentType">Looking for *</Label>
                    <select
                        id="employmentType"
                        name="employmentType"
                        value={values.employmentType}
                        onChange={(e) => set("employmentType", e.target.value)}
                        aria-invalid={!!errors.employmentType}
                        className={`${SELECT_CLASS} ${errors.employmentType ? "input-error" : ""}`}
                    >
                        <option value="">Select engagement type</option>
                        <option value="full-time">Full-time</option>
                        <option value="part-time">Part-time</option>
                        <option value="freelance">Freelance / visiting (per visit)</option>
                    </select>
                    {errors.employmentType && <p className="form-error" role="alert">{errors.employmentType}</p>}
                </div>
            </div>

            {values.area === "other" && (
                <div>
                    <Label htmlFor="otherArea">Which area? *</Label>
                    <Input
                        id="otherArea"
                        name="otherArea"
                        value={values.otherArea}
                        onChange={(e) => set("otherArea", e.target.value)}
                        placeholder="e.g. Yelahanka, Rajajinagar, Hebbal"
                        maxLength={MAX_LEN.locationArea}
                        aria-invalid={!!errors.otherArea}
                        className={errors.otherArea ? "input-error" : ""}
                    />
                    {errors.otherArea && <p className="form-error" role="alert">{errors.otherArea}</p>}
                </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div>
                    <Label htmlFor="qualification">Qualification *</Label>
                    <select
                        id="qualification"
                        name="qualification"
                        value={values.qualification}
                        onChange={(e) => set("qualification", e.target.value)}
                        aria-invalid={!!errors.qualification}
                        className={`${SELECT_CLASS} ${errors.qualification ? "input-error" : ""}`}
                    >
                        <option value="">Select</option>
                        <option value="BPT">BPT</option>
                        <option value="MPT">MPT</option>
                        <option value="Other">Other</option>
                    </select>
                    {errors.qualification && <p className="form-error" role="alert">{errors.qualification}</p>}
                </div>

                <div>
                    <Label htmlFor="experience">Experience *</Label>
                    <select
                        id="experience"
                        name="experience"
                        value={values.experience}
                        onChange={(e) => set("experience", e.target.value)}
                        aria-invalid={!!errors.experience}
                        className={`${SELECT_CLASS} ${errors.experience ? "input-error" : ""}`}
                    >
                        <option value="">Select</option>
                        <option value="0-1">Less than 1 year</option>
                        <option value="1-3">1 – 3 years</option>
                        <option value="3-5">3 – 5 years</option>
                        <option value="5-plus">More than 5 years</option>
                    </select>
                    {errors.experience && <p className="form-error" role="alert">{errors.experience}</p>}
                </div>

                <div>
                    <Label htmlFor="hasTwoWheeler">Own two-wheeler *</Label>
                    <select
                        id="hasTwoWheeler"
                        name="hasTwoWheeler"
                        value={values.hasTwoWheeler}
                        onChange={(e) => set("hasTwoWheeler", e.target.value)}
                        aria-invalid={!!errors.hasTwoWheeler}
                        className={`${SELECT_CLASS} ${errors.hasTwoWheeler ? "input-error" : ""}`}
                    >
                        <option value="">Select</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>
                    {errors.hasTwoWheeler && <p className="form-error" role="alert">{errors.hasTwoWheeler}</p>}
                </div>
            </div>

            <div>
                <Label htmlFor="currentEmployer">Currently working at (optional)</Label>
                <Input
                    id="currentEmployer"
                    name="currentEmployer"
                    value={values.currentEmployer}
                    onChange={(e) => set("currentEmployer", e.target.value)}
                    placeholder="Clinic / hospital name, or 'Independent practice'"
                    maxLength={MAX_LEN.subject}
                />
            </div>

            <div>
                <Label htmlFor="resume">Upload your CV *</Label>
                <div
                    className={`mt-1 flex flex-col sm:flex-row sm:items-center gap-3 rounded-xl border border-dashed p-4 ${errors.resume ? "border-red-400 bg-red-50" : "border-[#DCDCEC] bg-[#F9FAFB]"
                        }`}
                >
                    <input
                        id="resume"
                        name="resume"
                        type="file"
                        accept={RESUME_ACCEPT}
                        onChange={(e) => {
                            setResumeName(e.target.files?.[0]?.name ?? "");
                            setErrors((prev) => ({ ...prev, resume: undefined }));
                        }}
                        aria-invalid={!!errors.resume}
                        className="block w-full text-sm text-[#4B5563] file:mr-3 file:rounded-full file:border-0 file:bg-[#3B3B6D] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-[#2A2A57] file:cursor-pointer"
                    />
                    <p className="text-xs text-[#6B7280] whitespace-nowrap">PDF or Word · max 3 MB</p>
                </div>
                {resumeName && !errors.resume && (
                    <p className="mt-2 inline-flex items-center gap-1.5 text-xs text-[#3B3B6D]">
                        <Paperclip className="h-3.5 w-3.5" />
                        {resumeName}
                    </p>
                )}
                {errors.resume && <p className="form-error" role="alert">{errors.resume}</p>}
            </div>

            <div>
                <Label htmlFor="message">Anything else we should know? (optional)</Label>
                <Textarea
                    id="message"
                    name="message"
                    value={values.message}
                    onChange={(e) => set("message", e.target.value)}
                    placeholder="Specialisations, availability, languages you speak, notice period…"
                    maxLength={MAX_LEN.notes}
                    rows={4}
                />
            </div>

            <Button type="submit" className="w-full" size="lg" disabled={isPending}>
                {isPending ? "Submitting…" : "Submit Application"}
            </Button>

            <p className="text-xs text-[#6B7280] text-center">
                By applying you agree that we may contact you about physiotherapy roles at Physio At Your Doorstep.
            </p>
        </form>
    );
}
