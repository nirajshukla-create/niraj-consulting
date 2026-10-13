import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { PageHero } from "@/components/page-hero"
import { Contact } from "@/components/contact"
import { SiteFooter } from "@/components/site-footer"
import { site } from "@/lib/site"

export const metadata: Metadata = {
  title: "Contact",
  description: `Book a 30-minute call with ${site.name} about market entry, lead generation, research or sales enablement.`,
}

export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <main className="inner-page">
        <PageHero kicker="Book a 30-minute call" title="Contact." />
        <Contact />
      </main>
      <SiteFooter />
    </>
  )
}
