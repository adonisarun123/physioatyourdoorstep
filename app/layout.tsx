import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
// import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

export const metadata: Metadata = {
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
        url: "https://physioatyourdoorstep.com",
        siteName: "Physio At Your Doorstep",
        title: "Physio At Your Doorstep - Professional Physiotherapy Services at Home",
        description: "Professional physiotherapy services delivered to your doorstep. Expert care for sports injuries, post-surgery recovery, geriatric care, and more.",
    },
    twitter: {
        card: "summary_large_image",
        title: "Physio At Your Doorstep",
        description: "Professional physiotherapy services delivered to your doorstep.",
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
                <ThemeProvider
                    attribute="class"
                    defaultTheme="light"
                    enableSystem={false}
                    disableTransitionOnChange
                >
                    <TooltipProvider>
                        {children}
                        // <Toaster />
                    </TooltipProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
