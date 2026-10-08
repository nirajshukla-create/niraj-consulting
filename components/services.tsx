import Link from "next/link"
import type { CSSProperties } from "react"
import { services, TONES } from "@/lib/site"
import { Cover } from "./covers"
import { Reveal, Tilt } from "./motion"
import { SectionHead } from "./section-head"

export function Services() {
  return (
    <section id="services" className="band" aria-labelledby="services-title">
      <SectionHead
        n="01"
        kicker="Services"
        title={
          <>
            What we <em>do</em>
          </>
        }
        titleId="services-title"
        note="Four things, done properly. Fixed quotes, everything built in-house, and one team from the first call to launch."
      />
      <div className="cards">
        {services.map((s, i) => {
          const tone = TONES[s.tone]
          return (
            <Reveal key={s.id} effect="deal" rotate={i % 2 ? 3 : -3} delay={i * 110}>
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
      </div>
    </section>
  )
}
