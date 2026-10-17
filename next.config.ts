import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      // Raised for the careers CV upload (3 MB cap enforced in app/actions.ts).
      // Must stay under Vercel's ~4.5 MB request-body ceiling.
      bodySizeLimit: '4mb',
    },
  },

  // Image optimization — serve modern formats (AVIF first, WebP fallback)
  // and let Next generate right-sized responsive variants.
  images: {
    formats: ['image/avif', 'image/webp'],
    // Only hosts that actually serve site images; an open wildcard would let
    // anyone use the image optimizer as a free proxy.
    remotePatterns: [
      { protocol: 'https', hostname: 'ik.imagekit.io' },
    ],
  },

  reactStrictMode: true,
  poweredByHeader: false,

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
