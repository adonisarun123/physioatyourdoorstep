/**
 * Shared form-validation helpers used by BOTH the client forms and the
 * server actions, so the two layers can never drift apart.
 *
 * Max lengths are enforced on both sides purely to keep submissions (and the
 * notification emails they become) a sane size — they no longer mirror any
 * database column, since submissions are delivered by email only.
 */

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const MAX_LEN = {
    name: 255,
    email: 320,
    phone: 20,
    subject: 255,
    locationArea: 255,
    condition: 1000,
    notes: 2000,
    message: 5000,
} as const;

export const PHONE_ERROR = "Please enter a valid 10-digit Indian mobile number.";
export const EMAIL_ERROR = "Please enter a valid email address (e.g. name@example.com).";

/**
 * Normalizes a phone entry to a canonical "+91XXXXXXXXXX" Indian mobile
 * number, or returns null when it isn't one. Accepts optional +91 / 91 / 0
 * prefixes plus spaces, dashes and parentheses.
 */
export function normalizeIndianMobile(raw: string): string | null {
    let local = raw.replace(/\D/g, "");
    // Strip STD-style leading zeros, then an optional 91 country code.
    local = local.replace(/^0+/, "");
    if (local.length === 12 && local.startsWith("91")) {
        local = local.slice(2);
    }
    if (local.length !== 10 || !/^[6-9]/.test(local)) return null;
    return `+91${local}`;
}

export function isValidEmail(value: string): boolean {
    return value.trim().length <= MAX_LEN.email && EMAIL_REGEX.test(value.trim());
}

/** Today's date as YYYY-MM-DD in the user's local timezone (for date input `min`). */
export function todayISODate(): string {
    const d = new Date();
    const pad = (n: number) => String(n).padStart(2, "0");
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}
