// File: next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        // Bắt mọi request từ frontend bắt đầu bằng /api/proxy
        source: "/api/proxy/:path*",
        // Chuyển hướng ngầm về backend đang chạy ở port 3000
        destination: "http://localhost:3000/api/:path*",
      },
    ];
  },
};

export default nextConfig;
