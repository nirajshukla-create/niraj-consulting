import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { PageHero } from "@/components/page-hero"
import { SiteFooter } from "@/components/site-footer"

export default function NotFound() {
  return <>
    <SiteHeader />
    <main className="inner-page">
      <PageHero kicker="404 — Not found" title="This page has moved on." sub="The address may have changed, or the page may no longer exist." />
      <section className="inner-section" aria-label="Find your way">
        <div className="editorial-shell"><Link className="editorial-link" href="/">Return to the homepage <span aria-hidden="true">→</span></Link></div>
      </section>
    </main>
    <SiteFooter />
  </>
}
