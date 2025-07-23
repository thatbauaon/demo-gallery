import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      'placehold.co',
      'img.daisyui.com',
      'images.pexels.com',
      'flowbite.s3.amazonaws.com',
      'images.unsplash.com',
    ],
    remotePatterns: [
      {
        protocol: 'http', // ใช้ 'http' สำหรับ localhost
        hostname: 'localhost', // Hostname ของ Next.js app ของคุณ
        port: '3000', // Port ที่ Next.js app ของคุณรันอยู่ (ค่าเริ่มต้น)
        pathname: '/api/placeholder-svg/**', // Path ไปยัง API Route ที่คุณสร้าง
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
