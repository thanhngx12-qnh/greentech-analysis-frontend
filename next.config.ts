// File: next.config.ts
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

// Khai báo đường dẫn đến file cấu hình next-intl vừa tạo
const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

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

// Bọc nextConfig bằng plugin của next-intl
export default withNextIntl(nextConfig);
