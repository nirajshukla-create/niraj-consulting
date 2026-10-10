import Link from "next/link"
import Image from "next/image"
import type { CSSProperties } from "react"
import { hero, site } from "@/lib/site"
import { HeroMotion } from "./hero-motion"

/** The same coastal photograph and editorial voice as Innovation East. */
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
        <div className="hero__eyebrow"><p>Strategy, design & digital communications</p></div>
        <h1 id="hero-title" className="hero__title" aria-label={site.name}>
          <span className="hero__line" aria-hidden="true">{hero.lines[0].text}</span>
          <span className="hero__line hero__line--accent" aria-hidden="true"><em>{hero.lines[1].text}</em></span>
          <span className="hero__consulting" aria-hidden="true">Consulting</span>
        </h1>
        <div className="hero__details">
          <div className="hero__pitch">
            <p>{hero.sub}</p>
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
            <p className="hero__arrival-note">A clear direction.<br />Something worth putting into the world.</p>
          </div>
          <div className="hero__arrival-art">
            <div className="hero__arrival-outline" />
            <div className="hero__arrival-photo"><Image src="/identity/innovation-east-coast.png" alt="" fill sizes="(max-width: 680px) 65vw, 45vw" quality={85} /></div>
            <svg className="hero__arrival-arrow" viewBox="0 0 160 160" fill="none"><path d="M20 140 140 20M25 20h115v115" stroke="currentColor" strokeWidth="15" /></svg>
            <span className="hero__arrival-location">St. John’s / Newfoundland & Labrador</span>
          </div>
        </div>
        <div className="hero__arrival-disciplines">
          <div><span>01 /</span><strong>Strategy.</strong></div>
          <div><span>02 /</span><strong>Design.</strong></div>
          <div><span>03 /</span><strong>Digital.</strong></div>
        </div>
      </div>
      <div className="hero__caption" aria-hidden="true"><span>Independent thinking. Practical outcomes.</span><span>St. John’s, Newfoundland & Labrador</span></div>
    </HeroMotion>
  )
}
