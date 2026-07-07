import { headers } from "next/headers";

/**
 * Lightweight spam protection for public forms.
 * - Honeypot: a hidden field bots tend to fill in.
 * - Time-trap: submissions faster than a human could type are rejected.
 * - Rate limit: in-memory sliding window keyed by client IP.
 *
 * Note: the rate limiter is per-process. That's sufficient for a single
 * Railway instance; if the app is scaled horizontally, move this to Redis.
 */

// Hidden field names shared with the client forms.
export const HONEYPOT_FIELD = "company_website";
export const TIMESTAMP_FIELD = "_ts";

const MIN_FILL_MS = 2500; // minimum plausible time to fill a form
const WINDOW_MS = 60 * 60 * 1000; // 1 hour
const MAX_PER_WINDOW = 5; // max submissions per IP per window

const hits = new Map<string, number[]>();

async function getClientKey(): Promise<string> {
    try {
        const h = await headers();
        const fwd = h.get("x-forwarded-for");
        if (fwd) return fwd.split(",")[0].trim();
        return h.get("x-real-ip") ?? "unknown";
    } catch {
        return "unknown";
    }
}

function isRateLimited(key: string): boolean {
    const now = Date.now();
    const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
    recent.push(now);
    hits.set(key, recent);

    // Opportunistic cleanup so the map doesn't grow unbounded.
    if (hits.size > 5000) {
        for (const [k, v] of hits) {
            if (v.every((t) => now - t >= WINDOW_MS)) hits.delete(k);
        }
    }

    return recent.length > MAX_PER_WINDOW;
}

export interface SpamCheckResult {
    ok: boolean;
    /** True when the request looks like a bot and should be silently dropped. */
    silent?: boolean;
    message?: string;
}

/**
 * Runs all spam checks against submitted form data.
 * Returns { ok: true } when the submission should proceed.
 */
export async function checkSpam(formData: FormData): Promise<SpamCheckResult> {
    // 1. Honeypot — real users never see or fill this field.
    const honey = (formData.get(HONEYPOT_FIELD) as string | null)?.trim();
    if (honey) {
        return { ok: false, silent: true };
    }

    // 2. Time-trap — reject implausibly fast submissions.
    const tsRaw = formData.get(TIMESTAMP_FIELD) as string | null;
    const ts = tsRaw ? parseInt(tsRaw, 10) : NaN;
    if (Number.isFinite(ts) && Date.now() - ts < MIN_FILL_MS) {
        return { ok: false, silent: true };
    }

    // 3. Rate limit per IP.
    const key = await getClientKey();
    if (isRateLimited(key)) {
        return {
            ok: false,
            message: "Too many submissions. Please try again later.",
        };
    }

    return { ok: true };
}
