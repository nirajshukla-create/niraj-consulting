import { audience, manifesto } from "@/lib/site"
import "./market-sections.css"

/** One section: what we believe, then who the work is for. Static on purpose. */
export function Intro() {
  return (
    <section className="editorial-intro" aria-labelledby="intro-title">
      <div className="editorial-shell">
        <header className="editorial-heading">
          <p className="editorial-heading__label">01 — About</p>
          <div className="editorial-heading__content">
            <h2 id="intro-title" className="editorial-heading__title">About.</h2>
          </div>
        </header>
        <div className="editorial-intro__body">
          <span className="editorial-intro__location" aria-hidden="true" />
          <p className="intro__text">{manifesto}</p>
        </div>
        <div className="market-sectors">
          <p className="market-sectors__label" id="audience-title">Who we work with</p>
          <div>
            <p className="market-sectors__lede">
              {audience.lede} {audience.prioritiesLabel}:
            </p>
            <ul className="market-sectors__list" aria-labelledby="audience-title">
              {audience.priorities.map((priority) => (
                <li key={priority}>{priority}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
