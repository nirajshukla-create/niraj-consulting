import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
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
      <SiteHeader variant="dark" />
      <main>
        <Contact n="01" first />
      </main>
      <SiteFooter />
    </>
  )
}
