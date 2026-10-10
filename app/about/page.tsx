import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { PageHero } from "@/components/page-hero"
import { About } from "@/components/about"
import { SiteFooter } from "@/components/site-footer"
import { about, site } from "@/lib/site"

export const metadata: Metadata = {
  title: "About",
  description: `${about.title} ${about.lede} ${site.name} is a web design, social media and strategy studio in ${site.location.long}.`,
}

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main className="inner-page">
        <PageHero kicker="The people & the practice" title="About." />
        <About />
      </main>
      <SiteFooter />
    </>
  )
}
