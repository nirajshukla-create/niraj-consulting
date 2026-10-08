import Link from "next/link"
import type { CSSProperties } from "react"
import { panel, steps } from "@/lib/site"
import { Magnetic, Reveal, Stack } from "./motion"
import { SectionHead } from "./section-head"

/** Text on a circle, turning. The core dot gets the accent colour from CSS. */
export function Badge({ text, className = "badge" }: { text: string; className?: string }) {
  return (
    <svg viewBox="0 0 160 160" className={className} aria-hidden="true" focusable="false">
      <defs>
        <path id="badge-circle" d="M80 80m-58 0a58 58 0 1 1 116 0a58 58 0 1 1 -116 0" />
      </defs>
      <text>
        <textPath href="#badge-circle">{text}</textPath>
      </text>
      <circle className="badge__core" cx="80" cy="80" r="26" />
      <path d="M72 80h16M82 74l6 6-6 6" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

const CARD_TONES = ["paper", "mustard", "coral"] as const

/** Three stages as cards that pile up as you scroll: each slides over the last, which shrinks and dims beneath it. */
export function Approach() {
  return (
    <section id="approach" className="band band--ink sheet" style={{ "--z": 2 } as CSSProperties} aria-labelledby="approach-title">
      <SectionHead
        n="02"
        kicker="Approach"
        title={
          <>
            How we <em>work</em>
          </>
        }
        titleId="approach-title"
        note="Three stages. The first one is a conversation, the last one never really ends."
      />
      <Stack>
        {steps.map((s, i) => (
          <article key={s.n} className={`stack__card stack__card--${CARD_TONES[i]}`} style={{ "--i": i } as CSSProperties}>
            <div className="stack__n" aria-hidden="true">
              {s.n}
            </div>
            <div className="stack__body">
              <h3 className="stack__title">
                <span className="sr-only">Step {s.n}: </span>
                {s.title}
              </h3>
              <p className="stack__text">{s.text}</p>
            </div>
            <div className="stack__mark" aria-hidden="true">
              {s.n}
            </div>
          </article>
        ))}
      </Stack>
      <Reveal effect="scale" delay={120}>
        <article className="feature">
          <div>
            <p className="feature__tag">{panel.tag}</p>
            <h3 className="feature__title">{panel.title}</h3>
            <p className="feature__sub">{panel.sub}</p>
            <div className="feature__foot">
              <Magnetic>
                <Link href={panel.cta.href} className="btn">
                  {panel.cta.label} <span className="arrow">→</span>
                </Link>
              </Magnetic>
              <p className="feature__note">{panel.note}</p>
            </div>
          </div>
          <div className="feature__badge">
            <Badge text="Free 30-minute call · No deck · No pitch · " />
          </div>
        </article>
      </Reveal>
    </section>
  )
}
