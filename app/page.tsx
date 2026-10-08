import { SiteHeader } from "@/components/site-header"
import { Hero } from "@/components/hero"
import { Tickers } from "@/components/ticker"
import { Intro } from "@/components/intro"
import { Services } from "@/components/services"
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
        <Tickers />
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
