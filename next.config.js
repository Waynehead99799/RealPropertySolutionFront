/** @type {import('next').NextConfig} */
const securityHeaders = [
    { key: "X-Content-Type-Options", value: "nosniff" },
    { key: "X-Frame-Options", value: "SAMEORIGIN" },
    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
    {
        key: "Permissions-Policy",
        value: "camera=(), microphone=(), geolocation=()",
    },
];

const nextConfig = {
    reactStrictMode: true,
    poweredByHeader: false,
    compress: true,
    swcMinify: true,
    env: {
        NEXT_ENV: process.env.NEXT_ENV,
        NEXT_API_ENDPOINT: process.env.NEXT_API_ENDPOINT,
    },
    images: {
        domains: ["res.cloudinary.com"],
    },
    async headers() {
        return [
            { source: "/:path*", headers: securityHeaders },
            // Cached for a week (files keep their names, so no "immutable"). Next's own hashed assets are cached forever by Next itself.
            {
                source: "/images/:path*",
                headers: [
                    {
                        key: "Cache-Control",
                        value: "public, max-age=604800, stale-while-revalidate=86400",
                    },
                ],
            },
            {
                source: "/icons/:path*",
                headers: [
                    {
                        key: "Cache-Control",
                        value: "public, max-age=604800, stale-while-revalidate=86400",
                    },
                ],
            },
            // The retirement worker must never be cached, or it cannot replace the old one.
            {
                source: "/sw.js",
                headers: [
                    {
                        key: "Cache-Control",
                        value: "no-cache, no-store, must-revalidate",
                    },
                ],
            },
        ];
    },
};

module.exports = nextConfig;
