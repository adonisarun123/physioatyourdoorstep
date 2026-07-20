import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable experimental features if needed
  experimental: {
    // Enable server actions
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },

  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },

  // Enable strict mode
  reactStrictMode: true,

  // Canonical-host enforcement: every alternate host 308s to www so search
  // engines see exactly one indexable origin. (Vercel also redirects the apex
  // to www at the platform level; these rules are the versioned backstop and
  // cover the *.vercel.app deployment domain, which otherwise serves
  // duplicate content with a 200.)
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "physioatyourdoorstep.com" }],
        destination: "https://www.physioatyourdoorstep.com/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "physioatyourdoorstep.vercel.app" }],
        destination: "https://www.physioatyourdoorstep.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
