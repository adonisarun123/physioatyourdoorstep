import Script from "next/script";

/**
 * Google Analytics 4. The production measurement ID is the default so
 * tracking works without any env configuration; NEXT_PUBLIC_GA_MEASUREMENT_ID
 * overrides it (set it to a different ID, or to "off" to disable).
 */
const DEFAULT_GA_ID = "G-C2C5FTC2KH";

export default function GoogleAnalytics() {
    const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || DEFAULT_GA_ID;
    if (!gaId || gaId === "off") return null;

    return (
        <>
            <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
                strategy="afterInteractive"
            />
            <Script id="ga-init" strategy="afterInteractive">
                {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${gaId}', { anonymize_ip: true });
                `}
            </Script>
        </>
    );
}
