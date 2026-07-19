import { getDb } from "@/lib/db";
import { verifyEmailTransport } from "@/lib/email";
import { sql } from "drizzle-orm";
import { NextResponse } from "next/server";

/**
 * Production email diagnostics: GET /api/email-health?key=<EMAIL_DIAG_KEY>
 *
 * Verifies the Gmail SMTP connection (no email is sent) and reports which
 * env vars are present — never their values. Returns 404 unless the
 * EMAIL_DIAG_KEY env var is set AND matches the `key` query param, so the
 * endpoint is invisible without the secret.
 */

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
    const key = new URL(request.url).searchParams.get("key");
    const expected = process.env.EMAIL_DIAG_KEY;
    if (!expected || key !== expected) {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const result = await verifyEmailTransport();

    // Database connectivity check — bookings are saved BEFORE email is sent,
    // so a broken DB silently kills notifications too.
    const db: { urlSet: boolean; ok: boolean; error: string | null } = {
        urlSet: Boolean(process.env.DATABASE_URL),
        ok: false,
        error: null,
    };
    try {
        const conn = await getDb();
        if (!conn) {
            db.error = "DATABASE_URL is not set (or the connection failed to initialize).";
        } else {
            await conn.execute(sql`select 1`);
            db.ok = true;
        }
    } catch (error) {
        // Drizzle wraps the driver error — surface the underlying cause + code.
        const parts: string[] = [];
        let e: unknown = error;
        while (e instanceof Error) {
            const code = (e as { code?: string }).code;
            parts.push(`${code ? `[${code}] ` : ""}${e.message}`);
            e = (e as { cause?: unknown }).cause;
        }
        db.error = parts.join(" <- ") || String(error);
    }

    return NextResponse.json(
        {
            ...result,
            db,
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
                DATABASE_URL: Boolean(process.env.DATABASE_URL),
            },
        },
        { status: result.ok && db.ok ? 200 : 500 }
    );
}
