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
};

export default nextConfig;
