"use server";

import { createBooking, createContactSubmission } from "@/lib/db";
import { checkSpam } from "@/lib/spam";
import { EMAIL_ERROR, MAX_LEN, PHONE_ERROR, normalizeIndianMobile } from "@/lib/validation";
import { z } from "zod";

/**
 * Server-side schemas are the source of truth: client-side checks can be
 * bypassed (bots, curl), so everything enforced in the UI is re-enforced
 * here, and max lengths match the varchar columns in drizzle/schema.ts.
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

export async function submitBooking(formData: FormData) {
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
        await createBooking(validated);

        return { success: true, message: "Booking submitted successfully! We'll contact you soon." };
    } catch (error) {
        if (error instanceof z.ZodError) {
            return { success: false, message: error.issues[0].message };
        }
        return { success: false, message: "Failed to submit booking. Please try again." };
    }
}

export async function submitContact(formData: FormData) {
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
        await createContactSubmission(validated);

        return { success: true, message: "Message sent successfully! We'll get back to you soon." };
    } catch (error) {
        if (error instanceof z.ZodError) {
            return { success: false, message: error.issues[0].message };
        }
        return { success: false, message: "Failed to send message. Please try again." };
    }
}
