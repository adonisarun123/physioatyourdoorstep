import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { TooltipProvider } from "@/components/ui/tooltip";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import JsonLd from "@/components/JsonLd";
import { organizationSchema, websiteSchema, localBusinessSchema } from "@/lib/seo";
import "./globals.css";

export const metadata: Metadata = {
    metadataBase: new URL("https://www.physioatyourdoorstep.com"),
    title: {
        default: "Physio At Your Doorstep - Professional Physiotherapy Services at Home",
        template: "%s | Physio At Your Doorstep"
    },
    description: "Professional physiotherapy services delivered to your doorstep. Expert care for sports injuries, post-surgery recovery, geriatric care, and more across Bangalore and Pune.",
    keywords: ["physiotherapy", "home physiotherapy", "sports physiotherapy", "geriatric care", "post-surgical rehabilitation", "Bangalore", "Pune"],
    authors: [{ name: "Physio At Your Doorstep" }],
    openGraph: {
        type: "website",
        locale: "en_IN",
        url: "https://www.physioatyourdoorstep.com",
        siteName: "Physio At Your Doorstep",
        title: "Physio At Your Doorstep - Professional Physiotherapy Services at Home",
        description: "Professional physiotherapy services delivered to your doorstep. Expert care for sports injuries, post-surgery recovery, geriatric care, and more.",
        images: [{ url: "/images/logo-square.webp", width: 512, height: 512, alt: "Physio At Your Doorstep" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Physio At Your Doorstep",
        description: "Professional physiotherapy services delivered to your doorstep.",
        images: ["/images/logo-square.webp"],
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body>
                <JsonLd data={[organizationSchema(), websiteSchema(), localBusinessSchema()]} />
                <GoogleAnalytics />
                <ThemeProvider
                    attribute="class"
                    defaultTheme="light"
                    enableSystem={false}
                    disableTransitionOnChange
                >
                    <TooltipProvider>
                        {children}
                    </TooltipProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
