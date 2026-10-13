import { SiteHeader } from "@/components/site-header"
import { Hero } from "@/components/hero"
import { Intro } from "@/components/intro"
import { Audience } from "@/components/audience"
import { DirectionStudy } from "@/components/direction-study"
import { Services } from "@/components/services"
import { Approach } from "@/components/approach"
import { Experience } from "@/components/experience"
import { Team } from "@/components/team"
import { DesignLab } from "@/components/design-lab"
import { CtaBand } from "@/components/cta-band"
import { SiteFooter } from "@/components/site-footer"

/**
 * Positioning first, then what we do, how, proof and people. The concept studies for
 * fictional brands sit below all of that, under the Design lab label.
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
        <DirectionStudy />
        <Services />
        <Approach />
        <Experience />
        <Team />
        <DesignLab />
        <CtaBand />
      </main>
      <SiteFooter />
    </>
  )
}
