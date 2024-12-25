import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.dropbox.com',
      },
    ], // Add Dropbox to the allowed domains
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '15mb',
    },
  }
};

export default nextConfig;
