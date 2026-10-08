/** @type {import('next').NextConfig} */
const nextConfig = {
  // next/image serves sized WebP/AVIF for the team photos once they exist.
  images: { formats: ["image/avif", "image/webp"] },
}

export default nextConfig
