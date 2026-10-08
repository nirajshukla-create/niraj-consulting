import Link from "next/link"
import type { CSSProperties } from "react"
import { panel, steps } from "@/lib/site"
import { Reveal } from "./motion"
import { SectionHead } from "./section-head"

export function Approach() {
  return (
    <section id="approach" className="band" aria-labelledby="approach-title">
      <SectionHead n="02" kicker="Approach" title="How we work" titleId="approach-title" />
      <div className="steps">
        {steps.map((s, i) => (
          <Reveal key={s.n} delay={i * 140}>
            <div className="step" style={{ "--d": `${i * 140}ms` } as CSSProperties}>
              <div className="step__n" aria-hidden="true">
                {s.n}
              </div>
              <h3 className="step__title">
                <span className="sr-only">Step {s.n}: </span>
                {s.title}
              </h3>
              <p className="step__text">{s.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal className="feature">
        <article className="panel">
          <p className="feature__tag tag">[ {panel.tag} ]</p>
          <h3 className="feature__title">{panel.title}</h3>
          <p className="feature__sub">{panel.sub}</p>
          <p className="feature__body">{panel.body}</p>
          <div className="feature__foot">
            <p className="feature__note">{panel.note}</p>
            <Link href={panel.cta.href} className="cta">
              {panel.cta.label} <span className="arrow">→</span>
            </Link>
          </div>
        </article>
      </Reveal>
    </section>
  )
}
