import { verifyEmailTransport } from "@/lib/email";
import { NextResponse } from "next/server";

/**
 * Production email diagnostics: GET /api/email-health?key=<EMAIL_DIAG_KEY>
 *
 * Verifies the Gmail SMTP connection (no email is sent) and reports which
 * env vars are present — never their values. Returns 404 unless the
 * EMAIL_DIAG_KEY env var is set AND matches the `key` query param, so the
 * endpoint is invisible without the secret.
 *
 * Submissions are email-only (no database), so a red result here means the
 * booking and contact forms are down — this is the fastest way to confirm it.
 */

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
    const key = new URL(request.url).searchParams.get("key");
    const expected = process.env.EMAIL_DIAG_KEY;
    if (!expected || key !== expected) {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const result = await verifyEmailTransport();

    return NextResponse.json(
        {
            ...result,
            env: {
                SMTP_USER: Boolean(process.env.SMTP_USER),
                SMTP_PASS: Boolean(process.env.SMTP_PASS),
                SMTP_HOST: Boolean(process.env.SMTP_HOST),
                SMTP_PORT: Boolean(process.env.SMTP_PORT),
                GMAIL_USER: Boolean(process.env.GMAIL_USER),
                GMAIL_APP_PASSWORD: Boolean(process.env.GMAIL_APP_PASSWORD),
                ADMIN_EMAIL: Boolean(process.env.ADMIN_EMAIL),
                NOTIFICATION_EMAIL: Boolean(process.env.NOTIFICATION_EMAIL),
                NOTIFICATION_BCC: Boolean(process.env.NOTIFICATION_BCC),
            },
        },
        { status: result.ok ? 200 : 500 }
    );
}
