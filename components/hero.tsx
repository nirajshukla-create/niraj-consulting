import Link from "next/link"
import Image from "next/image"
import type { CSSProperties } from "react"
import { hero, site } from "@/lib/site"
import { HeroMotion } from "./hero-motion"
import "./market-sections.css"

/**
 * The coastal photograph and the large wordmark carry the identity. The page's headline,
 * the positioning statement, is the <h1> in the pitch block beneath it.
 */
export function Hero() {
  return (
    <HeroMotion className="hero hero--editorial">
      <div className="hero__photograph" aria-hidden="true">
        <Image src="/identity/innovation-east-coast.png" alt="" fill priority sizes="100vw" quality={85} />
      </div>
      <div className="hero__photo-grade" aria-hidden="true" />
      <div className="hero__photo-shutters" aria-hidden="true">
        {Array.from({ length: 5 }, (_, index) => <span key={index} style={{ "--shutter": index } as CSSProperties} />)}
      </div>
      <div className="hero__viewfinder" aria-hidden="true"><i /><i /><i /><i /></div>
      <div className="hero__body">
        <div className="hero__eyebrow"><p>{hero.eyebrow}</p></div>
        <p className="hero__title" aria-hidden="true">
          <span className="hero__line">{hero.lines[0].text}</span>
          <span className="hero__line hero__line--accent"><em>{hero.lines[1].text}</em></span>
          <span className="hero__tagline">{site.tagline}</span>
        </p>
        <div className="hero__details">
          <div className="hero__pitch">
            <h1 id="hero-title" className="hero__headline">{hero.headline}</h1>
            <p className="hero__sub">{hero.sub}</p>
            <Link href={hero.cta.href} className="project-link">{hero.cta.label}<span aria-hidden="true">↗</span></Link>
          </div>
          <a className="hero__scroll" href={hero.scroll.href}>{hero.scroll.label}<span aria-hidden="true">↓</span></a>
        </div>
      </div>
      <div className="hero__caption" aria-hidden="true"><span>Independent thinking. Practical outcomes.</span><span>St. John’s, Newfoundland & Labrador</span></div>
    </HeroMotion>
  )
}
