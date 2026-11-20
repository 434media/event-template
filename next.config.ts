import type { NextConfig } from "next";

// DEMO MODE: BotID wrapper removed for demo deployment.
// In production, this wraps the config with: import { withBotId } from 'botid/next/config'
// export default withBotId(nextConfig)

// Security headers (Security Policy finding SW-9). The CSP lists only what the
// site loads: images and video from the two S3 asset buckets and Unsplash,
// everything else same-origin. Scripts keep 'unsafe-inline' because the pages
// are static and Next's inline flight scripts carry no nonce; every other
// directive is locked down.
const isPreview = process.env.VERCEL_ENV === "preview";
const isDev = process.env.NODE_ENV === "development";
const assets = "https://ampd-asset.s3.us-east-2.amazonaws.com https://devsa-assets.s3.us-east-2.amazonaws.com";

const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}${isPreview ? " https://vercel.live" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  `img-src 'self' data: blob: ${assets} https://images.unsplash.com https://placehold.co https://*.public.blob.vercel-storage.com${isPreview ? " https://vercel.live https://vercel.com" : ""}`,
  `font-src 'self' data:${isPreview ? " https://vercel.live" : ""}`,
  `media-src 'self' ${assets}`,
  `connect-src 'self'${isPreview ? " https://vercel.live wss://ws-us3.pusher.com" : ""}`,
  `frame-src ${isPreview ? "https://vercel.live" : "'none'"}`,
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ampd-asset.s3.us-east-2.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "devsa-assets.s3.us-east-2.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
      },
    ],
  },
};

export default nextConfig;
