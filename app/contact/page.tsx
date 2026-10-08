import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { PageHero } from "@/components/page-hero"
import { Contact } from "@/components/contact"
import { SiteFooter } from "@/components/site-footer"
import { site } from "@/lib/site"

export const metadata: Metadata = {
  title: "Contact",
  description: `Start a project with ${site.name}: web design, social media marketing and strategy from ${site.location.long}.`,
}

export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <PageHero kicker="Contact" title="Start a project." sub="Fixed quotes, honest answers, and no pitch deck. Tell us what you're working on." />
        <Contact />
      </main>
      <SiteFooter />
    </>
  )
}
