"use server";

import { createBooking, createContactSubmission } from "@/lib/db";
import { z } from "zod";

const bookingSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(10, "Phone number is required"),
    serviceId: z.number().optional(),
    locationArea: z.string().optional(),
    preferredDate: z.string().optional(),
    preferredTime: z.string().optional(),
    condition: z.string().optional(),
    notes: z.string().optional(),
});

const contactSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().optional(),
    subject: z.string().optional(),
    message: z.string().min(1, "Message is required"),
});

export async function submitBooking(formData: FormData) {
    try {
        const data = {
            name: formData.get("name") as string,
            email: formData.get("email") as string,
            phone: formData.get("phone") as string,
            serviceId: formData.get("serviceId") ? parseInt(formData.get("serviceId") as string) : undefined,
            locationArea: formData.get("locationArea") as string || undefined,
            preferredDate: formData.get("preferredDate") as string || undefined,
            preferredTime: formData.get("preferredTime") as string || undefined,
            condition: formData.get("condition") as string || undefined,
            notes: formData.get("notes") as string || undefined,
        };

        const validated = bookingSchema.parse(data);
        await createBooking(validated);

        return { success: true, message: "Booking submitted successfully! We'll contact you soon." };
    } catch (error) {
        if (error instanceof z.ZodError) {
            return { success: false, message: error.errors[0].message };
        }
        return { success: false, message: "Failed to submit booking. Please try again." };
    }
}

export async function submitContact(formData: FormData) {
    try {
        const data = {
            name: formData.get("name") as string,
            email: formData.get("email") as string,
            phone: formData.get("phone") as string || undefined,
            subject: formData.get("subject") as string || undefined,
            message: formData.get("message") as string,
        };

        const validated = contactSchema.parse(data);
        await createContactSubmission(validated);

        return { success: true, message: "Message sent successfully! We'll get back to you soon." };
    } catch (error) {
        if (error instanceof z.ZodError) {
            return { success: false, message: error.errors[0].message };
        }
        return { success: false, message: "Failed to send message. Please try again." };
    }
}
