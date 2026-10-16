import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { PageHero } from "@/components/page-hero"
import { About } from "@/components/about"
import { SiteFooter } from "@/components/site-footer"
import { about, site } from "@/lib/site"

export const metadata: Metadata = {
  title: "About",
  description: `${about.teamNote} ${site.name} helps Atlantic Canadian technology companies grow in enterprise markets across Canada and the U.S.`,
}

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main className="inner-page">
        <PageHero kicker="The team & how we deliver" title="About." />
        <About />
      </main>
      <SiteFooter />
    </>
  )
}
