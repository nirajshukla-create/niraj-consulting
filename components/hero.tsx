import Link from "next/link"
import Image from "next/image"
import { hero, site } from "@/lib/site"
import { HeroMotion } from "./hero-motion"
import "./market-sections.css"

/**
 * The coastal photograph settles once as it loads; nothing else moves. The large wordmark
 * is decorative; the page's headline is the positioning line beneath it.
 */
export function Hero() {
  return (
    <HeroMotion className="hero hero--editorial">
      <div className="hero__photograph" aria-hidden="true">
        <Image src="/identity/innovation-east-coast.png" alt="" fill priority sizes="100vw" quality={85} />
      </div>
      <div className="hero__photo-grade" aria-hidden="true" />
      <div className="hero__body">
        <p className="hero__title" aria-hidden="true">
          <span className="hero__line">{hero.lines[0].text}</span>
          <span className="hero__line hero__line--accent"><em>{hero.lines[1].text}</em></span>
        </p>
        <div className="hero__details">
          <div className="hero__pitch">
            <h1 id="hero-title" className="hero__headline">{hero.headline}</h1>
            <p className="hero__sub">{hero.sub}</p>
            <Link href={hero.cta.href} className="project-link">{hero.cta.label}<span aria-hidden="true">↗</span></Link>
          </div>
        </div>
      </div>
      <span className="sr-only">{site.tagline}</span>
    </HeroMotion>
  )
}
