import { SiteHeader } from "@/components/site-header"
import { Hero } from "@/components/hero"
import { Intro } from "@/components/intro"
import { DirectionStudy } from "@/components/direction-study"
import { SignalShowcase } from "@/components/signal-showcase"
import { Services } from "@/components/services"
import { FeaturedProject } from "@/components/featured-project"
import { Approach } from "@/components/approach"
import { Team } from "@/components/team"
import { CtaBand } from "@/components/cta-band"
import { SiteFooter } from "@/components/site-footer"

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
        <DirectionStudy />
        <Services />
        <FeaturedProject />
        <SignalShowcase />
        <Approach />
        <Team />
        <CtaBand />
      </main>
      <SiteFooter />
    </>
  )
}
