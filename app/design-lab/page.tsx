import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { PageHero } from "@/components/page-hero"
import { FeaturedProject } from "@/components/featured-project"
import { SignalShowcase } from "@/components/signal-showcase"
import { SiteFooter } from "@/components/site-footer"
import { designLab, site } from "@/lib/site"

export const metadata: Metadata = {
  title: "Design lab",
  description: `${designLab.note} ${site.name}, ${site.location.long}.`,
}

/**
 * The two concept studies for fictional brands, kept off the home page so it stays calm.
 * Both are marked as concept work, not client projects.
 */
export default function DesignLabPage() {
  return (
    <>
      <SiteHeader />
      <main className="inner-page">
        <PageHero kicker={designLab.kicker} title={designLab.title} sub={designLab.note} />
        <FeaturedProject />
        <SignalShowcase />
      </main>
      <SiteFooter />
    </>
  )
}
