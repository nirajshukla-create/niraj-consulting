import Link from "next/link"
import type { CSSProperties } from "react"
import { services, TONES } from "@/lib/site"
import { Cover } from "./covers"
import { HScroll, Reveal, Tilt } from "./motion"
import { SectionHead } from "./section-head"

/**
 * On wide screens the section pins and the cards travel sideways as you scroll, each one
 * revealing as it slides in. On phones it is a plain vertical stack.
 */
export function Services() {
  return (
    <HScroll id="services">
      <div className="hscroll__head">
        <SectionHead
          n="01"
          kicker="Services"
          title={
            <>
              What we <em>do</em>
            </>
          }
          titleId="services-title"
          note="Fixed quotes. Everything built in-house. One team from the first call to launch."
        />
        <p className="hscroll__hint" aria-hidden="true">
          Keep scrolling <span className="arrow">→</span>
        </p>
      </div>
      {services.map((s, i) => {
        const tone = TONES[s.tone]
        return (
          <Reveal key={s.id} effect="deal" rotate={i % 2 ? 3 : -3} delay={i * 60}>
            <Tilt>
              <article className="card" style={{ "--tone": tone.color, "--tone-deep": tone.deep } as CSSProperties}>
                <div className="card__cover">
                  <Cover kind={s.cover} />
                  <span className="card__num" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="card__body">
                  <h3 className="card__title">{s.title}</h3>
                  <p className="card__dek">{s.dek}</p>
                  <ul className="card__list">
                    {s.includes.map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ul>
                </div>
                <Link href={`/contact?about=${s.id}`} className="mono-link card__link">
                  Start here <span className="arrow">→</span>
                </Link>
              </article>
            </Tilt>
          </Reveal>
        )
      })}
    </HScroll>
  )
}
