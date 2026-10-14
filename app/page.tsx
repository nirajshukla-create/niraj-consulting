import { SiteHeader } from "@/components/site-header"
import { Hero } from "@/components/hero"
import { Intro } from "@/components/intro"
import { Services } from "@/components/services"
import { Approach } from "@/components/approach"
import { Team } from "@/components/team"
import { CtaBand } from "@/components/cta-band"
import { SiteFooter } from "@/components/site-footer"

/**
 * Five sections, and nothing moves except the hero photograph settling as it loads:
 * positioning, about (with who it is for), what we do, how, who, one invitation.
 * The concept studies live on their own page, /design-lab.
 */
export default function Home() {
  return (
    <>
      <a href="#services" className="skip-link">
        Skip to content
      </a>
      <SiteHeader />
      <main>
        <Hero />
        <Intro />
        <Services />
        <Approach />
        <Team />
        <CtaBand />
      </main>
      <SiteFooter />
    </>
  )
}
