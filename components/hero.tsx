import Link from "next/link"
import type { CSSProperties } from "react"
import { hero } from "@/lib/site"
import { Magnetic, ParallaxLayer, Spotlight } from "./motion"
import { Skyline } from "./skyline"

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

/**
 * Night over the harbour. Three colour blobs and an aurora curtain loop on their own
 * timings, the moon floats, stars breathe, a spotlight follows the pointer, and the
 * sky and the row houses slide at different speeds as you scroll. The headline flips in
 * a word at a time on load.
 */
export function Hero() {
  let i = 0
  return (
    <section className="hero" aria-labelledby="hero-title">
      <ParallaxLayer speed={0.28} className="hero__sky" aria-hidden="true">
        <div className="blob blob--a" />
        <div className="blob blob--b" />
        <div className="blob blob--c" />
        <div className="aurora" />
        {STARS.map((s, k) => (
          <i key={k} className="star" style={{ left: `${s.left}%`, top: `${s.top}%`, "--d": `${s.d}s`, "--t": `${s.t}s`, transform: `scale(${s.s})` } as CSSProperties} />
        ))}
        <div className="moon" />
      </ParallaxLayer>
      <Spotlight className="hero__spot" />

      <div className="hero__body">
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
        <Skyline />
      </ParallaxLayer>
    </section>
  )
}
