"use client";

import { useState } from "react";

// Keep these names in sync with lib/spam.ts
const HONEYPOT_FIELD = "company_website";
const TIMESTAMP_FIELD = "_ts";

/**
 * Hidden anti-spam fields for public forms:
 * - a honeypot input that real users never fill,
 * - a timestamp captured at mount to catch instant bot submissions.
 */
export default function HoneypotFields() {
    const [ts] = useState(() => Date.now().toString());

    return (
        <div aria-hidden="true" className="absolute left-[-9999px] top-[-9999px] h-0 w-0 overflow-hidden">
            <label htmlFor={HONEYPOT_FIELD}>Leave this field empty</label>
            <input
                id={HONEYPOT_FIELD}
                name={HONEYPOT_FIELD}
                type="text"
                tabIndex={-1}
                autoComplete="off"
                defaultValue=""
            />
            <input type="hidden" name={TIMESTAMP_FIELD} value={ts} readOnly />
        </div>
    );
}
