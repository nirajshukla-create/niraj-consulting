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
      <div className="hero__photo-study" aria-hidden="true">
        {[0, 1, 2].map((index) => (
          <div className="hero__photo-strip" key={index} style={{
            "--slice-start": `${Math.max(0, index * 100 / 3 - .08)}%`,
            "--slice-end": `${Math.max(0, (2 - index) * 100 / 3 - .08)}%`,
            "--slice-center": `${(index + .5) * 100 / 3}%`,
            "--slice-x": index - 1,
            "--slice-y": [1, -.8, .5][index],
            "--slice-angle": [-5, 2, 5][index],
          } as CSSProperties}>
            <Image src="/identity/innovation-east-coast.png" alt="" fill sizes="100vw" quality={85} loading="eager" />
          </div>
        ))}
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
      <div className="hero__iris" aria-hidden="true" />
      <div className="hero__arrival" aria-hidden="true">
        <div className="hero__arrival-topline"><span>Independent thinking.</span><span>Practical outcomes. ↗</span></div>
        <div className="hero__arrival-main">
          <div className="hero__arrival-copy">
            <p className="hero__arrival-title">Ideas into<br /><em>action.</em></p>
            <p className="hero__arrival-note">{hero.arrival.note[0]}<br />{hero.arrival.note[1]}</p>
          </div>
          <div className="hero__arrival-art">
            <div className="hero__arrival-outline" />
            <div className="hero__arrival-photo"><Image src="/identity/innovation-east-coast.png" alt="" fill sizes="(max-width: 680px) 65vw, 45vw" quality={85} /></div>
            <svg className="hero__arrival-arrow" viewBox="0 0 160 160" fill="none"><path d="M20 140 140 20M25 20h115v115" stroke="currentColor" strokeWidth="15" /></svg>
            <span className="hero__arrival-location">St. John’s / Newfoundland & Labrador</span>
          </div>
        </div>
        <div className="hero__arrival-disciplines">
          {hero.arrival.words.map((word, index) => (
            <div key={word}><span>0{index + 1} /</span><strong>{word}</strong></div>
          ))}
        </div>
      </div>
      <div className="hero__caption" aria-hidden="true"><span>Independent thinking. Practical outcomes.</span><span>St. John’s, Newfoundland & Labrador</span></div>
    </HeroMotion>
  )
}
