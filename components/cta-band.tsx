import Link from "next/link"
import type { CSSProperties } from "react"
import { cta, site } from "@/lib/site"
import { Badge } from "./approach"
import { Letters, Magnetic, Reveal } from "./motion"

/** The loud close: a giant headline whose letters wave when you brush a word, a turning badge, one button. */
export function CtaBand() {
  return (
    <section className="band band--coral sheet cta-band" style={{ "--z": 4 } as CSSProperties} aria-labelledby="cta-title">
      <div className="cta-band__big" aria-hidden="true" />
      <div className="cta-band__badge">
        <Badge text="Start a project · St. John's NL · " className="badge" />
      </div>
      <Reveal effect="clip">
        <h2 id="cta-title" className="cta-band__title display">
          <Letters text={cta.title} accentWords={cta.accent} />
        </h2>
      </Reveal>
      <Reveal effect="up" delay={160}>
        <div className="cta-band__row">
          <Magnetic>
            <Link href="/contact" className="btn btn--ink">
              {cta.button} <span className="arrow">→</span>
            </Link>
          </Magnetic>
          <div className="cta-band__contact">
            <a href={`mailto:${site.email}`}>{site.email}</a>
            <a href={`tel:${site.phone.tel}`}>{site.phone.display}</a>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
