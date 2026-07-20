"use server";

import { sendBookingNotification, sendContactNotification } from "@/lib/email";
import { checkSpam } from "@/lib/spam";
import { EMAIL_ERROR, MAX_LEN, PHONE_ERROR, normalizeIndianMobile } from "@/lib/validation";
import { randomInt } from "node:crypto";
import { z } from "zod";

/**
 * Server-side schemas are the source of truth: client-side checks can be
 * bypassed (bots, curl), so everything enforced in the UI is re-enforced
 * here. Max lengths are defined in lib/validation.ts and shared with the
 * client forms.
 *
 * NOTE: submissions are delivered by EMAIL ONLY — there is no database.
 * That makes the notification send the authoritative step: if it fails, the
 * enquiry is lost, so a failed send must be reported to the user as a failed
 * submission (never a silent success). See lib/email.ts.
 */

const requiredPhone = z
    .string()
    .trim()
    .min(1, "Phone number is required")
    .max(MAX_LEN.phone, PHONE_ERROR)
    .transform((value, ctx) => {
        const normalized = normalizeIndianMobile(value);
        if (!normalized) {
            ctx.addIssue({ code: "custom", message: PHONE_ERROR });
            return z.NEVER;
        }
        return normalized;
    });

/** Optional phone: empty is fine, but anything entered must be valid. */
const optionalPhone = z
    .string()
    .trim()
    .max(MAX_LEN.phone, PHONE_ERROR)
    .optional()
    .transform((value, ctx) => {
        if (!value) return undefined;
        const normalized = normalizeIndianMobile(value);
        if (!normalized) {
            ctx.addIssue({ code: "custom", message: PHONE_ERROR });
            return z.NEVER;
        }
        return normalized;
    });

const requiredName = z
    .string()
    .trim()
    .min(1, "Name is required")
    .max(MAX_LEN.name, `Name must be at most ${MAX_LEN.name} characters.`);

const requiredEmail = z
    .string()
    .trim()
    .min(1, "Email is required")
    .max(MAX_LEN.email, EMAIL_ERROR)
    .pipe(z.email(EMAIL_ERROR));

const bookingSchema = z.object({
    name: requiredName,
    email: requiredEmail,
    phone: requiredPhone,
    serviceId: z
        .number({ error: "Please select a service." })
        .int("Please select a service.")
        .positive("Please select a service."),
    locationArea: z.string().trim().max(MAX_LEN.locationArea).optional(),
    preferredDate: z
        .string()
        .trim()
        .regex(/^\d{4}-\d{2}-\d{2}$/, "Please enter a valid date.")
        .optional(),
    preferredTime: z.enum(["morning", "afternoon", "evening", "night"]).optional(),
    condition: z.string().trim().max(MAX_LEN.condition).optional(),
    notes: z.string().trim().max(MAX_LEN.notes).optional(),
});

const contactSchema = z.object({
    name: requiredName,
    email: requiredEmail,
    phone: optionalPhone,
    subject: z.string().trim().max(MAX_LEN.subject).optional(),
    message: z
        .string()
        .trim()
        .min(1, "Message is required")
        .max(MAX_LEN.message, `Message must be at most ${MAX_LEN.message} characters.`),
});

/** Reads a FormData text field, treating empty strings as undefined. */
function optionalField(formData: FormData, key: string): string | undefined {
    const value = formData.get(key);
    return typeof value === "string" && value.trim() ? value : undefined;
}

/**
 * Builds a booking reference like "PYD-2607201234" — the IST date (YYMMDD)
 * plus four random digits.
 *
 * Previously this was the database row id, which made it sequential and
 * unique. Without a database it is only a human handle for phone/WhatsApp
 * follow-ups, so same-day collisions (~1 in 10,000) are acceptable. The
 * digits-only shape keeps the /^PYD-\d{1,10}$/ guard on the thank-you page
 * working unchanged.
 */
function makeBookingReference(): string {
    // en-CA gives YYYY-MM-DD, which slices cleanly into YYMMDD.
    const istDate = new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" });
    const yymmdd = istDate.slice(2).replace(/-/g, "");
    return `PYD-${yymmdd}${String(randomInt(0, 10000)).padStart(4, "0")}`;
}

/** Shown when the notification email could not be delivered. */
const BOOKING_SEND_FAILED =
    "We couldn't submit your booking just now. Please try again, or reach us on WhatsApp or +91 82337 87737 — we'll get you booked right away.";

const CONTACT_SEND_FAILED =
    "We couldn't send your message just now. Please try again, or reach us on WhatsApp or +91 82337 87737.";

export interface SubmitResult {
    success: boolean;
    message: string;
    /** Booking reference (e.g. "PYD-2607201234") — set on successful bookings only. */
    reference?: string;
}

export async function submitBooking(formData: FormData): Promise<SubmitResult> {
    try {
        const spam = await checkSpam(formData);
        if (!spam.ok) {
            // Silently drop bot submissions with a success-looking message.
            if (spam.silent) {
                return { success: true, message: "Booking submitted successfully! We'll contact you soon." };
            }
            return { success: false, message: spam.message ?? "Unable to submit. Please try again later." };
        }

        const serviceIdRaw = formData.get("serviceId");
        const serviceId =
            typeof serviceIdRaw === "string" && /^\d+$/.test(serviceIdRaw)
                ? parseInt(serviceIdRaw, 10)
                : undefined;

        const data = {
            name: (formData.get("name") as string) ?? "",
            email: (formData.get("email") as string) ?? "",
            phone: (formData.get("phone") as string) ?? "",
            serviceId,
            locationArea: optionalField(formData, "locationArea"),
            preferredDate: optionalField(formData, "preferredDate"),
            preferredTime: optionalField(formData, "preferredTime"),
            condition: optionalField(formData, "condition"),
            notes: optionalField(formData, "notes"),
        };

        const validated = bookingSchema.parse(data);

        // Human-friendly booking reference shown on the thank-you page.
        const reference = makeBookingReference();

        // The email IS the submission — nothing else records it, so a failed
        // send must surface as a failed booking rather than a false success.
        const sent = await sendBookingNotification(validated, reference);
        if (!sent) {
            return { success: false, message: BOOKING_SEND_FAILED };
        }

        return { success: true, reference, message: "Booking submitted successfully! We'll contact you soon." };
    } catch (error) {
        if (error instanceof z.ZodError) {
            return { success: false, message: error.issues[0].message };
        }
        return { success: false, message: BOOKING_SEND_FAILED };
    }
}

export async function submitContact(formData: FormData): Promise<SubmitResult> {
    try {
        const spam = await checkSpam(formData);
        if (!spam.ok) {
            if (spam.silent) {
                return { success: true, message: "Message sent successfully! We'll get back to you soon." };
            }
            return { success: false, message: spam.message ?? "Unable to submit. Please try again later." };
        }

        const data = {
            name: (formData.get("name") as string) ?? "",
            email: (formData.get("email") as string) ?? "",
            phone: optionalField(formData, "phone"),
            subject: optionalField(formData, "subject"),
            message: (formData.get("message") as string) ?? "",
        };

        const validated = contactSchema.parse(data);

        // As with bookings, the email is the only record — report send failures.
        const sent = await sendContactNotification(validated);
        if (!sent) {
            return { success: false, message: CONTACT_SEND_FAILED };
        }

        return { success: true, message: "Message sent successfully! We'll get back to you soon." };
    } catch (error) {
        if (error instanceof z.ZodError) {
            return { success: false, message: error.issues[0].message };
        }
        return { success: false, message: CONTACT_SEND_FAILED };
    }
}
