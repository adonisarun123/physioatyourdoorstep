import { getAllServices } from "@/lib/content";
import nodemailer from "nodemailer";
import type { Transporter } from "nodemailer";

/**
 * Team notification emails, sent via Gmail SMTP.
 *
 * Required env vars (set in Vercel → Project → Settings → Environment Variables):
 * - GMAIL_USER           the Gmail address used to send (e.g. yourbusiness@gmail.com)
 * - GMAIL_APP_PASSWORD   a Google "App Password" (NOT the account password) —
 *                        Google Account → Security → 2-Step Verification → App passwords
 * Optional:
 * - NOTIFICATION_EMAIL   where notifications are delivered (defaults to GMAIL_USER)
 *
 * Sending is best-effort by design: if email is unconfigured or Gmail is down,
 * the form submission still succeeds (the booking is already saved in MySQL) —
 * failures are logged, never thrown.
 */

const TIME_LABELS: Record<string, string> = {
    morning: "Morning (8 AM - 12 PM)",
    afternoon: "Afternoon (12 PM - 4 PM)",
    evening: "Evening (4 PM - 8 PM)",
    night: "Night (8 PM - 8 AM)",
};

const BRAND_NAVY = "#3B3B6D";

function escapeHtml(value: string): string {
    return value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

function isConfigured(): boolean {
    return Boolean(process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD);
}

let _transporter: Transporter | null = null;

function getTransporter(): Transporter {
    if (!_transporter) {
        _transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_APP_PASSWORD,
            },
        });
    }
    return _transporter;
}

/** Renders label/value rows, skipping empty values. All values are HTML-escaped. */
function detailRows(fields: Array<[label: string, value: string | undefined]>): string {
    return fields
        .filter((entry): entry is [string, string] => Boolean(entry[1]))
        .map(
            ([label, value]) => `
            <tr>
                <td style="padding:8px 12px;border-bottom:1px solid #EEEEF7;font-weight:600;color:#4B5563;white-space:nowrap;vertical-align:top;">${escapeHtml(label)}</td>
                <td style="padding:8px 12px;border-bottom:1px solid #EEEEF7;color:#1F2933;">${escapeHtml(value)}</td>
            </tr>`
        )
        .join("");
}

function wrapEmail(heading: string, subheading: string, rowsHtml: string): string {
    return `
    <div style="font-family:Arial,Helvetica,sans-serif;max-width:600px;margin:0 auto;border:1px solid #DCDCEC;border-radius:12px;overflow:hidden;">
        <div style="background:${BRAND_NAVY};padding:20px 24px;">
            <h1 style="margin:0;color:#FFFFFF;font-size:20px;">${escapeHtml(heading)}</h1>
            <p style="margin:6px 0 0;color:#DCDCEC;font-size:14px;">${escapeHtml(subheading)}</p>
        </div>
        <table cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;background:#FFFFFF;font-size:14px;">
            ${rowsHtml}
        </table>
        <div style="background:#F9FAFB;padding:12px 24px;color:#6B7280;font-size:12px;">
            Sent automatically by physioatyourdoorstep.com — reply to this email to respond to the customer directly.
        </div>
    </div>`;
}

async function sendToTeam(subject: string, html: string, replyTo?: string): Promise<boolean> {
    if (!isConfigured()) {
        console.warn("[Email] GMAIL_USER / GMAIL_APP_PASSWORD not set — skipping notification email.");
        return false;
    }
    try {
        await getTransporter().sendMail({
            from: `"Physio At Your Doorstep" <${process.env.GMAIL_USER}>`,
            to: process.env.NOTIFICATION_EMAIL || process.env.GMAIL_USER,
            subject,
            html,
            replyTo,
        });
        return true;
    } catch (error) {
        console.error("[Email] Failed to send notification:", error);
        return false;
    }
}

function serviceTitle(serviceId: number | undefined): string | undefined {
    if (!serviceId) return undefined;
    try {
        return getAllServices().find((s) => s.id === serviceId)?.title ?? `Service #${serviceId}`;
    } catch {
        return `Service #${serviceId}`;
    }
}

function nowIST(): string {
    return new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata", dateStyle: "medium", timeStyle: "short" });
}

export interface BookingEmailData {
    name: string;
    email: string;
    phone: string;
    serviceId?: number;
    locationArea?: string;
    preferredDate?: string;
    preferredTime?: string;
    condition?: string;
    notes?: string;
}

export async function sendBookingNotification(booking: BookingEmailData, reference?: string): Promise<boolean> {
    const rows = detailRows([
        ["Reference", reference],
        ["Name", booking.name],
        ["Phone", booking.phone],
        ["Email", booking.email],
        ["Service", serviceTitle(booking.serviceId)],
        ["Area / Location", booking.locationArea],
        ["Preferred Date", booking.preferredDate],
        ["Preferred Time", booking.preferredTime ? TIME_LABELS[booking.preferredTime] ?? booking.preferredTime : undefined],
        ["Condition", booking.condition],
        ["Notes", booking.notes],
        ["Received", nowIST()],
    ]);

    const subject = `New Booking ${reference ?? ""} — ${booking.name}`.replace(/\s+/g, " ").trim();
    return sendToTeam(
        subject,
        wrapEmail("New Booking Request", "A new appointment request was submitted on the website.", rows),
        booking.email
    );
}

export interface ContactEmailData {
    name: string;
    email: string;
    phone?: string;
    subject?: string;
    message: string;
}

export async function sendContactNotification(submission: ContactEmailData): Promise<boolean> {
    const rows = detailRows([
        ["Name", submission.name],
        ["Email", submission.email],
        ["Phone", submission.phone],
        ["Subject", submission.subject],
        ["Message", submission.message],
        ["Received", nowIST()],
    ]);

    return sendToTeam(
        `New Contact Message — ${submission.name}`,
        wrapEmail("New Contact Message", "A new message was submitted via the contact form.", rows),
        submission.email
    );
}
