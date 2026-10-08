import Link from "next/link"
import type { CSSProperties } from "react"
import { hero } from "@/lib/site"
import { HeroMotion } from "./hero-motion"
import { Magnetic, ParallaxLayer, Spotlight } from "./motion"
import { Skyline, SkylineLights } from "./skyline"

function rng(seed: number) {
  let s = seed >>> 0
  return () => {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0
    return s / 4294967296
  }
}
const r = rng(3)
// negative delays start every star mid-twinkle instead of all of them popping in at once
const STARS = Array.from({ length: 46 }, () => ({ left: r() * 100, top: r() * 58, d: -(r() * 5), t: 3 + r() * 4, s: 0.6 + r() * 1 }))
const SHOOTERS = [
  { left: 62, top: 8, t: 11, d: -2 },
  { left: 34, top: 14, t: 15, d: -9 },
  { left: 84, top: 22, t: 13, d: -5 },
]

/**
 * Night over the harbour. Colour blobs and an aurora curtain loop on their own timings,
 * the moon floats, stars breathe and the odd one falls, the lighthouse sweeps its beam
 * across the sky, chimneys smoke, fog rolls along the street, and the sky and houses
 * drift with the mouse and the scroll at different depths. The headline flips in a word
 * at a time; the whole scene zooms out and dims as the page slides over it.
 */
export function Hero() {
  let i = 0
  return (
    <HeroMotion className="hero">
      <ParallaxLayer speed={0.28} className="hero__sky" aria-hidden="true">
        <div className="hero__layer" data-depth="-10">
          <div className="blob blob--a" />
          <div className="blob blob--b" />
          <div className="blob blob--c" />
          <div className="aurora" />
          {STARS.map((s, k) => (
            <i key={k} className="star" style={{ left: `${s.left}%`, top: `${s.top}%`, "--d": `${s.d}s`, "--t": `${s.t}s`, "--s": s.s } as CSSProperties} />
          ))}
          {SHOOTERS.map((s, k) => (
            <i key={k} className="shoot" style={{ left: `${s.left}%`, top: `${s.top}%`, "--t": `${s.t}s`, "--d": `${s.d}s` } as CSSProperties} />
          ))}
        </div>
        <div className="hero__layer" data-depth="-22">
          <div className="moon" />
        </div>
      </ParallaxLayer>
      <Spotlight className="hero__spot" />

      <div className="hero__body" data-depth="-5">
        <div className="pill">
          <span className="pill__dot" aria-hidden="true" />
          <span>{hero.eyebrow}</span>
        </div>
        <h1 id="hero-title" className="hero__title display">
          {hero.lines.map((line, li) => (
            <span key={li} className={`hero__line ${line.accent ? "hero__line--accent" : ""}`}>
              {line.text.split(" ").map((word, wi) => (
                <span key={wi}>
                  <span className="w" style={{ "--i": i++ } as CSSProperties}>
                    {word}
                  </span>{" "}
                </span>
              ))}
            </span>
          ))}
        </h1>
        <p className="hero__sub">{hero.sub}</p>
        <div className="hero__actions">
          <Magnetic>
            <Link href={hero.cta.href} className="btn">
              {hero.cta.label} <span className="arrow">→</span>
            </Link>
          </Magnetic>
          <a href={hero.scroll.href} className="btn btn--ghost">
            {hero.scroll.label}
          </a>
        </div>
      </div>

      <ParallaxLayer speed={0.08} className="skyline-wrap" aria-hidden="true">
        <div className="hero__layer" data-depth="8">
          <div className="beam" />
          <Skyline />
          <SkylineLights />
          <div className="fog fog--a" />
          <div className="fog fog--b" />
        </div>
      </ParallaxLayer>
      <div className="hero__dim" aria-hidden="true" />
    </HeroMotion>
  )
}
