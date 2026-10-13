import { designLab } from "@/lib/site"
import { FeaturedProject } from "./featured-project"
import { SignalShowcase } from "./signal-showcase"
import "./market-sections.css"

/**
 * The two concept studies, grouped under one label and clearly marked as concept work for
 * fictional brands. They sit below the real services, approach, experience and team.
 */
export function DesignLab() {
  return (
    <>
      <section id="design-lab" className="design-lab-intro" aria-labelledby="design-lab-title">
        <div className="editorial-shell">
          <header className="editorial-heading">
            <p className="editorial-heading__label">07 — Design lab</p>
            <div className="editorial-heading__content">
              <h2 id="design-lab-title" className="editorial-heading__title">{designLab.title}</h2>
              <p className="editorial-heading__note">{designLab.note}</p>
            </div>
          </header>
        </div>
      </section>
      <FeaturedProject />
      <SignalShowcase />
    </>
  )
}
