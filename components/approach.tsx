import { approachNote, ownership, steps } from "@/lib/site"
import "./studio-sections.css"
import "./market-sections.css"

/** Research, Enter, Generate, Enable, as a plain ruled list. Then who owns what. */
export function Approach() {
  return (
    <section id="approach" className="ap-section" aria-labelledby="approach-title">
      <div className="editorial-shell">
        <div className="editorial-heading">
          <p className="editorial-heading__label">03 — Approach</p>
          <div className="editorial-heading__content">
            <h2 id="approach-title" className="editorial-heading__title">How we work.</h2>
            <p className="editorial-heading__note">{approachNote}</p>
          </div>
        </div>
        <ol className="ap-process">
          {steps.map((step) => (
            <li key={step.n} className="ap-step">
              <span className="ap-step__number" aria-hidden="true"><span>{step.n}</span></span>
              <div className="ap-step__copy">
                <h3 className="ap-step__title">{step.title}</h3>
                <p className="ap-step__text">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
        <p className="ap-ownership">{ownership}</p>
      </div>
    </section>
  )
}
