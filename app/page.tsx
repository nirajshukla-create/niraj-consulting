import { SiteHeader } from "@/components/site-header"
import { Hero } from "@/components/hero"
import { Services } from "@/components/services"
import { Approach } from "@/components/approach"
import { Team } from "@/components/team"
import { Contact } from "@/components/contact"
import { SiteFooter } from "@/components/site-footer"

export default function Home() {
  return (
    <>
      <a href="#services" className="skip-link">
        Skip to content
      </a>
      <SiteHeader variant="overlay" />
      <main>
        <Hero />
        <Services />
        <Approach />
        <Team />
        <Contact n="04" />
      </main>
      <SiteFooter />
    </>
  )
}
