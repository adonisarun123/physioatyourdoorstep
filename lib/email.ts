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
 * - ADMIN_EMAIL          additional recipient — added alongside NOTIFICATION_EMAIL,
 *                        not instead of it; both get every submission
 *
 * There is NO database: these emails are the only record of a submission.
 * Every send therefore reports success/failure to the caller (app/actions.ts),
 * which turns a failed send into a failed submission so the user is told to
 * retry or reach us on WhatsApp instead of being shown a false success.
 *
 * As a last-resort safety net, a failed send dumps the full submission to the
 * error log (see logLostSubmission), so an enquiry lost to an SMTP outage can
 * still be recovered from the platform logs.
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

/** Splits a comma/semicolon-separated env value into trimmed addresses. */
function parseAddresses(value: string | undefined): string[] {
    return (value ?? "")
        .split(/[,;]/)
        .map((address) => address.trim())
        .filter(Boolean);
}

/** Removes duplicates, comparing addresses case-insensitively. */
function dedupe(addresses: string[]): string[] {
    const seen = new Set<string>();
    return addresses.filter((address) => {
        const key = address.toLowerCase();
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
    });
}

/**
 * SMTP settings, accepting BOTH env naming conventions so a rename in the
 * Vercel dashboard can't silently break mail:
 *   SMTP_USER / SMTP_PASS / SMTP_HOST / SMTP_PORT   (generic names)
 *   GMAIL_USER / GMAIL_APP_PASSWORD                 (original names)
 *
 * Recipients: NOTIFICATION_EMAIL *and* ADMIN_EMAIL both receive every
 * notification — they are additive, not alternatives. (They used to be
 * `NOTIFICATION_EMAIL || ADMIN_EMAIL`, which silently dropped ADMIN_EMAIL
 * whenever both were set.) Either var may hold a comma-separated list.
 * If neither is set, mail goes to the sending account.
 */
export function smtpConfig() {
    const user = process.env.SMTP_USER || process.env.GMAIL_USER;
    const pass = process.env.SMTP_PASS || process.env.GMAIL_APP_PASSWORD;
    const host = process.env.SMTP_HOST || "smtp.gmail.com";
    const port = parseInt(process.env.SMTP_PORT || "465", 10);
    const configuredTo = dedupe([
        ...parseAddresses(process.env.NOTIFICATION_EMAIL),
        ...parseAddresses(process.env.ADMIN_EMAIL),
    ]);
    const to = configuredTo.length > 0 ? configuredTo : parseAddresses(user);
    return { user, pass, host, port, to };
}

function isConfigured(): boolean {
    const { user, pass } = smtpConfig();
    return Boolean(user && pass);
}

let _transporter: Transporter | null = null;

function getTransporter(): Transporter {
    if (!_transporter) {
        const { user, pass, host, port } = smtpConfig();
        _transporter = nodemailer.createTransport({
            host,
            port,
            secure: port === 465, // 465 = implicit TLS; 587 = STARTTLS
            auth: { user, pass },
            // These MUST expire before Vercel's function timeout (10s default on
            // Hobby). If the platform kills the function first, we get neither
            // the user-facing error nor the logLostSubmission recovery line —
            // the exact silent loss this design exists to prevent. Worst case
            // here is connect(4s) + greeting(4s) = 8s, leaving headroom.
            // Gmail's handshake is normally well under 2s.
            connectionTimeout: 4_000,
            greetingTimeout: 4_000,
            socketTimeout: 8_000,
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

/** Always BCC'd on team notifications; override with NOTIFICATION_BCC env var. */
const DEFAULT_BCC = "arun@monkmantra.com";

/**
 * Last-resort record of a submission whose email could not be delivered.
 * With no database this log line is the only remaining copy of the enquiry,
 * so it is written as a single greppable JSON blob:
 *   Vercel  → Project → Logs, search "LOST SUBMISSION"
 *   Railway → Deployments → Logs, same search
 */
function logLostSubmission(kind: "booking" | "contact" | "application", payload: Record<string, unknown>): void {
    console.error(
        `[Email] LOST SUBMISSION (${kind}) — email delivery failed, this is the only copy:`,
        JSON.stringify({ kind, receivedAt: nowIST(), ...payload })
    );
}

export interface MailAttachment {
    filename: string;
    content: Buffer;
    contentType?: string;
}

async function sendToTeam(
    subject: string,
    html: string,
    replyTo?: string,
    attachments?: MailAttachment[]
): Promise<boolean> {
    if (!isConfigured()) {
        console.warn("[Email] SMTP_USER/SMTP_PASS (or GMAIL_USER/GMAIL_APP_PASSWORD) not set — skipping notification email.");
        return false;
    }
    try {
        const { user, to } = smtpConfig();
        // Anyone already on the To line is dropped from the BCC, so a shared
        // address (e.g. ADMIN_EMAIL == NOTIFICATION_BCC) isn't mailed twice.
        const onTo = new Set(to.map((address) => address.toLowerCase()));
        const bcc = parseAddresses(process.env.NOTIFICATION_BCC || DEFAULT_BCC).filter(
            (address) => !onTo.has(address.toLowerCase())
        );
        await getTransporter().sendMail({
            from: `"Physio At Your Doorstep" <${user}>`,
            to,
            bcc: bcc.length > 0 ? bcc : undefined,
            subject,
            html,
            replyTo,
            attachments: attachments && attachments.length > 0 ? attachments : undefined,
        });
        return true;
    } catch (error) {
        console.error("[Email] Failed to send notification:", error);
        return false;
    }
}

/**
 * Verifies the SMTP connection + login WITHOUT sending an email.
 * Used by /api/email-health to diagnose configuration problems in production.
 */
export async function verifyEmailTransport(): Promise<{ configured: boolean; ok: boolean; error?: string }> {
    if (!isConfigured()) {
        return {
            configured: false,
            ok: false,
            error: "SMTP user/password env vars are not set (accepted names: SMTP_USER + SMTP_PASS, or GMAIL_USER + GMAIL_APP_PASSWORD).",
        };
    }
    try {
        await getTransporter().verify();
        return { configured: true, ok: true };
    } catch (error) {
        const code = (error as { code?: string })?.code ?? "";
        const msg = error instanceof Error ? error.message : String(error);
        return { configured: true, ok: false, error: `${code} ${msg}`.trim() };
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
    const sent = await sendToTeam(
        subject,
        wrapEmail("New Booking Request", "A new appointment request was submitted on the website.", rows),
        booking.email
    );
    if (!sent) logLostSubmission("booking", { reference, ...booking });
    return sent;
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

    const sent = await sendToTeam(
        `New Contact Message — ${submission.name}`,
        wrapEmail("New Contact Message", "A new message was submitted via the contact form.", rows),
        submission.email
    );
    if (!sent) logLostSubmission("contact", { ...submission });
    return sent;
}

export interface ApplicationEmailData {
    fullName: string;
    email: string;
    phone: string;
    area: string;
    otherArea?: string;
    employmentType: string;
    qualification: string;
    experience: string;
    hasTwoWheeler: string;
    currentEmployer?: string;
    message?: string;
}

const EMPLOYMENT_LABELS: Record<string, string> = {
    "full-time": "Full-time",
    "part-time": "Part-time",
    freelance: "Freelance / Visiting (per visit)",
};

const EXPERIENCE_LABELS: Record<string, string> = {
    "0-1": "Less than 1 year",
    "1-3": "1 – 3 years",
    "3-5": "3 – 5 years",
    "5-plus": "More than 5 years",
};

/**
 * Sends a careers application to the team, with the candidate's CV attached.
 *
 * As with the other forms there is no database, so this email is the entire
 * record of the application — a failed send is reported to the candidate as a
 * failed submission. The lost-submission log line cannot carry the CV file, so
 * it records the filename and size only; the candidate is asked to re-apply or
 * WhatsApp the CV instead.
 */
export async function sendApplicationNotification(
    application: ApplicationEmailData,
    resume?: MailAttachment
): Promise<boolean> {
    const areaLabel =
        application.area === "other"
            ? `Other — ${application.otherArea ?? "not specified"}`
            : application.area;

    const rows = detailRows([
        ["Name", application.fullName],
        ["Phone", application.phone],
        ["Email", application.email],
        ["Preferred area", areaLabel],
        ["Engagement", EMPLOYMENT_LABELS[application.employmentType] ?? application.employmentType],
        ["Qualification", application.qualification],
        ["Experience", EXPERIENCE_LABELS[application.experience] ?? application.experience],
        ["Own two-wheeler", application.hasTwoWheeler],
        ["Currently working at", application.currentEmployer],
        ["CV", resume ? `${resume.filename} (${Math.round(resume.content.length / 1024)} KB, attached)` : "Not attached"],
        ["Message", application.message],
        ["Received", nowIST()],
    ]);

    const sent = await sendToTeam(
        `Physiotherapist Application — ${application.fullName} (${areaLabel})`,
        wrapEmail(
            "New Physiotherapist Application",
            "A candidate applied through the careers section of the website.",
            rows
        ),
        application.email,
        resume ? [resume] : undefined
    );

    if (!sent) {
        logLostSubmission("application", {
            ...application,
            resumeFilename: resume?.filename,
            resumeBytes: resume?.content.length,
        });
    }
    return sent;
}
