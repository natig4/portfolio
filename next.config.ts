import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    // 85 keeps UI text in screenshots crisp; 75 is the default for everything else.
    qualities: [75, 85],
  },
  async redirects() {
    // /experience was merged into /about. Redirects run before the i18n proxy,
    // so the source carries the locale prefix (bare /experience gets one first).
    return [
      {
        source: "/:locale(he|en)/experience",
        destination: "/:locale/about#experience",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), geolocation=(), interest-cohort=()",
          },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
