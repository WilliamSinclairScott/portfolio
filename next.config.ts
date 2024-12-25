import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['www.dropbox.com'], // Add Dropbox to the allowed domains
  }
};

export default nextConfig;
