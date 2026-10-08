import type React from "react"
import type { Metadata } from "next"
import { Bricolage_Grotesque, DM_Sans, DM_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { people, services, site } from "@/lib/site"
import "./globals.css"

// Bricolage Grotesque carries the headlines (heavy, wide, a little eccentric), DM Sans the
// reading text and DM Mono the small labels. Swap a face here and every page follows.
const display = Bricolage_Grotesque({ subsets: ["latin"], weight: "variable", axes: ["opsz", "wdth"], variable: "--font-display-src", display: "swap" })
const sans = DM_Sans({ subsets: ["latin"], weight: "variable", axes: ["opsz"], variable: "--font-sans-src", display: "swap" })
const mono = DM_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono-src", display: "swap" })

// Vercel sets this on every deploy; set NEXT_PUBLIC_SITE_URL once a custom domain exists.
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000")

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.name} | Web design, social media and strategy, St. John's NL`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  openGraph: {
    siteName: site.name,
    title: site.name,
    description: site.description,
    type: "website",
    locale: "en_CA",
  },
  twitter: { card: "summary_large_image" },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.name,
  description: site.description,
  url: siteUrl,
  email: site.email,
  telephone: site.phone.tel,
  address: {
    "@type": "PostalAddress",
    addressLocality: site.location.city,
    addressRegion: site.location.region,
    addressCountry: "CA",
  },
  areaServed: site.location.served,
  founder: people.map((p) => ({ "@type": "Person", name: p.name, jobTitle: p.role })),
  knowsAbout: services.map((s) => s.title),
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-CA" className={`${display.variable} ${sans.variable} ${mono.variable}`} suppressHydrationWarning>
      <body>
        {/* Marks the page as scripted before anything paints, so scroll reveals only hide
            content when the script that reveals it is guaranteed to run. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <Analytics />
      </body>
    </html>
  )
}
