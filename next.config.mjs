/** @type {import('next').NextConfig} */
const nextConfig = {
  // Keep the coastal image and portraits sharp while serving sized WebP/AVIF.
  images: { formats: ["image/avif", "image/webp"], qualities: [75, 85] },
}

export default nextConfig
