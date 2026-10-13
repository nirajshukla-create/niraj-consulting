import { audience } from "@/lib/site"
import { Reveal } from "./motion"
import "./market-sections.css"

/** Who the work is for: the kind of company, and the buyers they sell to. No clients named. */
export function Audience() {
  return (
    <section id="who-we-work-with" className="market-section" aria-labelledby="audience-title">
      <div className="editorial-shell">
        <header className="editorial-heading">
          <p className="editorial-heading__label">02 — Who we work with</p>
          <div className="editorial-heading__content">
            <h2 id="audience-title" className="editorial-heading__title">{audience.title}</h2>
            <p className="editorial-heading__note">{audience.lede}</p>
          </div>
        </header>
        <Reveal effect="fade" className="market-sectors">
          <p className="market-sectors__label">{audience.sectorsLabel}</p>
          <ul className="market-sectors__list">
            {audience.sectors.map((sector, index) => (
              <li key={sector}>
                <span aria-hidden="true">0{index + 1}</span>
                {sector}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
