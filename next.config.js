const createNextIntlPlugin = require("next-intl/plugin")
const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts")

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
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
