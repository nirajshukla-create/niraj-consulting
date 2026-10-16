import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return [
    { url: "/", lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: "/about", lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: "/contact", lastModified: now, changeFrequency: "yearly", priority: 0.8 },
    { url: "/privacy", lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ]
}
