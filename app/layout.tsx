import type React from "react"
import type { Metadata } from "next"
import { DM_Sans, Space_Mono } from "next/font/google"
import localFont from "next/font/local"
import { Analytics } from "@vercel/analytics/next"
import { EditorialMotion } from "@/components/editorial-motion"
import { people, services, site } from "@/lib/site"
import "./globals.css"
import "./cinematic.css"
import "./editorial.css"
import "./editorial-motion.css"

// Body sans, editorial Bodoni, and monospaced labels match the Innovation East identity.
const sans = DM_Sans({ subsets: ["latin"], weight: "variable", axes: ["opsz"], variable: "--font-sans-src", display: "swap" })
const mono = Space_Mono({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-mono-src", display: "swap" })
const editorial = localFont({
  src: [
    { path: "./fonts/LibreBodoni-Regular.ttf", weight: "400", style: "normal" },
    { path: "./fonts/LibreBodoni-Italic.ttf", weight: "400", style: "italic" },
    { path: "./fonts/LibreBodoni-Bold.ttf", weight: "700", style: "normal" },
    { path: "./fonts/LibreBodoni-BoldItalic.ttf", weight: "700", style: "italic" },
  ],
  variable: "--font-editorial-src",
  display: "swap",
})

// Vercel sets this on every deploy; set NEXT_PUBLIC_SITE_URL once a custom domain exists.
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000")

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.name} | ${site.headline.replace(/\.$/, "")}`,
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
    streetAddress: site.address.line,
    postOfficeBoxNumber: site.address.box,
    addressLocality: site.address.city,
    addressRegion: site.address.region,
    postalCode: site.address.postal,
    addressCountry: site.address.country,
  },
  areaServed: site.location.served,
  member: people.map((p) => ({ "@type": "Person", name: p.name, jobTitle: p.role })),
  knowsAbout: services.map((s) => s.title),
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-CA" data-scroll-behavior="smooth" className={`${sans.variable} ${mono.variable} ${editorial.variable}`} suppressHydrationWarning>
      <body>
        {/* Marks the page as scripted before anything paints, so scroll reveals only hide
            content when the script that reveals it is guaranteed to run.

            Motion policy: animation is ON for everyone by default, whatever the operating
            system reports (Windows with "Animation effects" off reports reduced motion for
            every site, which hid everything from the owners). A visitor who wants less motion
            uses the footer toggle, which stores "reduce" in this browser. ?motion=0 in the URL
            does the same; ?motion=1 clears it. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "document.documentElement.classList.add('js');(function(){var q=new URLSearchParams(location.search).get('motion'),m='';try{m=localStorage.getItem('motion')||''}catch(e){}if(q==='0')m='reduce';if(q==='1')m='';document.documentElement.classList.add(m==='reduce'?'reduce-motion':'force-motion');try{if(q==='0')localStorage.setItem('motion','reduce');if(q==='1')localStorage.removeItem('motion')}catch(e){}})();",
          }}
        />
        {children}
        <EditorialMotion />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <Analytics />
      </body>
    </html>
  )
}
