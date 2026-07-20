import type { MetadataRoute } from "next";

const BASE_URL = "https://www.physioatyourdoorstep.com";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: "*",
            allow: "/",
            disallow: "/booking/thank-you",
        },
        sitemap: `${BASE_URL}/sitemap.xml`,
        host: BASE_URL,
    };
}
