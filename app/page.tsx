import { SiteHeader } from "@/components/site-header"
import { Hero } from "@/components/hero"
import { Intro } from "@/components/intro"
import { Audience } from "@/components/audience"
import { Services } from "@/components/services"
import { Approach } from "@/components/approach"
import { Team } from "@/components/team"
import { CtaBand } from "@/components/cta-band"
import { SiteFooter } from "@/components/site-footer"

/**
 * Kept deliberately short: positioning, who it is for, what we do, how, who, and one
 * invitation. The concept studies live on their own page, /design-lab.
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
        <Audience />
        <Services />
        <Approach />
        <Team />
        <CtaBand />
      </main>
      <SiteFooter />
    </>
  )
}
