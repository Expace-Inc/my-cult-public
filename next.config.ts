import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/login", destination: "/download", permanent: true },
      { source: "/signin", destination: "/download", permanent: true },
      { source: "/app", destination: "/download", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/auth/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store, no-cache, must-revalidate",
          },
        ],
      },
      {
        source: "/identify",
        headers: [{ key: "Cache-Control", value: "no-store" }],
      },
      {
        source: "/join",
        headers: [{ key: "Cache-Control", value: "no-store" }],
      },
    ];
  },
};

export default nextConfig;
