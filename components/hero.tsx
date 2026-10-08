import Link from "next/link"
import type { CSSProperties } from "react"
import { hero } from "@/lib/site"

/**
 * The atmosphere is five stacked layers, all CSS: a grayscale fog plate with a slow push-in,
 * two blurred copies of the same plate drifting in opposite directions under a screen blend,
 * a vignette grade, a cool soft-light tint, and film grain jittering eight times a second.
 * The headline rises in a word at a time on load.
 */
export function Hero() {
  let i = 0
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__plate" aria-hidden="true" />
      <div className="hero__cloud hero__cloud--a" aria-hidden="true" />
      <div className="hero__cloud hero__cloud--b" aria-hidden="true" />
      <div className="hero__grade" aria-hidden="true" />
      <div className="hero__tint" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />

      <div className="hero__body">
        <div className="tape">
          <p>{hero.eyebrow}</p>
        </div>
        <h1 id="hero-title" className="hero__title">
          {hero.lines.map((line, li) => (
            <span key={li} className="hero__line">
              {line.text.split(" ").map((word, wi) => (
                <span key={wi}>
                  <span className="w" style={{ "--i": i++ } as CSSProperties}>
                    {line.italic ? <em>{word}</em> : word}
                  </span>{" "}
                </span>
              ))}
            </span>
          ))}
        </h1>
        <p className="hero__sub">{hero.sub}</p>
        <div className="hero__actions">
          <Link href={hero.cta.href} className="cta cta--light">
            {hero.cta.label} <span className="arrow">→</span>
          </Link>
        </div>
      </div>

      <a href={hero.scroll.href} className="hero__arrow" aria-label={`Scroll down: ${hero.scroll.label}`}>
        <span>{hero.scroll.label}</span>
        <svg viewBox="0 0 14 44" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
          <path d="M7 0v42M1 36l6 7 6-7" />
        </svg>
      </a>
    </section>
  )
}
