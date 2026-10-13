import { experience } from "@/lib/site"
import { Copy } from "./copy"
import { Reveal } from "./motion"
import "./market-sections.css"

const rows = [
  { key: "challenge", label: "Challenge" },
  { key: "delivered", label: "What we delivered" },
  { key: "outcome", label: "Outcome" },
] as const

/**
 * Real, anonymized engagements. Every field comes from lib/site.ts, where each one is a
 * marked placeholder until the facts are supplied. Nothing here is invented.
 */
export function Experience() {
  return (
    <section id="experience" className="market-section" aria-labelledby="experience-title">
      <div className="editorial-shell">
        <header className="editorial-heading">
          <p className="editorial-heading__label">05 — Relevant experience</p>
          <div className="editorial-heading__content">
            <h2 id="experience-title" className="editorial-heading__title">{experience.title}</h2>
            <p className="editorial-heading__note">{experience.note}</p>
          </div>
        </header>
        <div className="market-cases">
          {experience.items.map((item, index) => (
            <Reveal key={item.id} effect="fade" delay={index * 80}>
              <article className="market-case" aria-labelledby={`${item.id}-title`}>
                <p className="market-case__number" aria-hidden="true">0{index + 1}</p>
                <h3 className="market-case__sector" id={`${item.id}-title`}>
                  <Copy text={item.sector} />
                </h3>
                <dl className="market-case__facts">
                  {rows.map((row) => (
                    <div key={row.key}>
                      <dt>{row.label}</dt>
                      <dd>
                        <Copy text={item[row.key]} />
                      </dd>
                    </div>
                  ))}
                </dl>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
