const createNextIntlPlugin = require("next-intl/plugin")
const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts")

// CSP policy — collapse to single line (no newlines allowed in header values)
const ContentSecurityPolicy = [
  "default-src 'self'",
  // Next.js requires unsafe-inline for hydration; unsafe-eval needed by some third-party libs
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com",
  "style-src 'self' 'unsafe-inline'",
  // Images: supabase storage, unsplash, google/facebook OAuth avatars, data URIs, blob URLs
  "img-src 'self' data: blob: https://*.supabase.co https://images.unsplash.com https://*.googleusercontent.com https://*.fbcdn.net https://graph.facebook.com",
  "font-src 'self' data:",
  // API calls: supabase REST + realtime websockets, vercel analytics
  "connect-src 'self' https://*.supabase.co wss://*.supabase.co https://vitals.vercel-insights.com https://va.vercel-scripts.com",
  // OAuth providers open in popups/iframes
  "frame-src https://accounts.google.com https://www.facebook.com https://appleid.apple.com",
  "frame-ancestors 'none'",
  "form-action 'self' https://accounts.google.com https://www.facebook.com",
  "base-uri 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ")

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  // frame-ancestors in CSP supersedes X-Frame-Options but keep both for legacy browsers
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Content-Security-Policy", value: ContentSecurityPolicy },
]

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async headers() {
    return [
      // Security headers on all routes
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
      // Cache public pages for 60s, stale-while-revalidate 24h
      // Note: Next.js does not allow capturing groups in source patterns,
      // so we list each pattern separately.
      ...["/", "/marketplace", "/sell", "/about", "/contact", "/legal/:path*", "/listings/:path*"].map(
        (source) => ({
          source,
          headers: [
            {
              key: "Cache-Control",
              value: "public, s-maxage=60, stale-while-revalidate=86400",
            },
          ],
        })
      ),
    ]
  },
}

module.exports = withNextIntl(nextConfig)
