import Link from "next/link"
import { services } from "@/lib/site"
import { Cover } from "./covers"
import { Reveal } from "./motion"
import { SectionHead } from "./section-head"

export function Services() {
  return (
    <section id="services" className="band band--first" aria-labelledby="services-title">
      <SectionHead
        n="01"
        kicker="Services"
        title="What we do"
        titleId="services-title"
        aside={<p className="section-head__note">Fixed quotes · Built in-house</p>}
      />
      <div className="cards">
        {services.map((s, i) => (
          <Reveal key={s.id} delay={i * 90}>
            <article className="card">
              <div className="card__cover">
                <Cover kind={s.cover} />
                <div className="grain" aria-hidden="true" />
                <span className="card__tag tag">[ {String(i + 1).padStart(2, "0")} ]</span>
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
            </article>
          </Reveal>
        ))}
      </div>
      <Reveal effect="fade" className="band__cta">
        <Link href="/contact" className="cta">
          Start a project <span className="arrow">→</span>
        </Link>
      </Reveal>
    </section>
  )
}
