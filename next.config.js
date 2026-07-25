/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  allowedDevOrigins: ["192.168.29.155"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
      {
        protocol: "https",
        hostname: "apmgroups.in",
      },
    ],
  },
  async redirects() {
    return [
      { source: "/solutions/fleet-management", destination: "/solutions/vehicle-solutions/fleet-management", permanent: true },
      { source: "/solutions/video-surveillance", destination: "/solutions/vehicle-solutions/video-telematics", permanent: true },
      { source: "/solutions/public-transport-solutions", destination: "/solutions/vehicle-solutions/public-transport", permanent: true },
      { source: "/solutions/vehicle-compliance", destination: "/solutions/vehicle-solutions/vehicle-compliance", permanent: true },
      { source: "/solutions/vehicle-safety", destination: "/solutions/vehicle-solutions/vehicle-safety", permanent: true },
      { source: "/solutions/asset-tracking", destination: "/solutions/vehicle-solutions/asset-tracking", permanent: true },
      { source: "/solutions/electric-mobility", destination: "/solutions/vehicle-solutions/electric-mobility", permanent: true },
      { source: "/solutions/road-safety-solutions", destination: "/solutions/workplace-safety/road-safety-solutions", permanent: true },
      { source: "/solutions/printing-identification", destination: "/solutions/printing-identification-solutions", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
          { key: "X-DNS-Prefetch-Control", value: "on" },
        ],
      },
    ];
  },
}

module.exports = nextConfig
