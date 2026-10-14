import Link from "next/link"
import type { CSSProperties } from "react"
import { approachNote, ownership, steps } from "@/lib/site"
import { ProcessMotion } from "./process-motion"
import "./studio-sections.css"
import "./market-sections.css"

/** Kept for the circular wordmark used elsewhere on the site. */
export function Badge({ text, className = "badge" }: { text: string; className?: string }) {
  const circleId = `badge-${text.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`
  return (
    <svg viewBox="0 0 160 160" className={className} aria-hidden="true" focusable="false">
      <defs><path id={circleId} d="M80 80m-58 0a58 58 0 1 1 116 0a58 58 0 1 1 -116 0" /></defs>
      <text><textPath href={`#${circleId}`}>{text}</textPath></text>
      <circle className="badge__core" cx="80" cy="80" r="26" />
      <path d="M72 80h16M82 74l6 6-6 6" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/** Research, Enter, Generate, Enable. Then who owns what. */
export function Approach() {
  return (
    <section id="approach" className="ap-section" aria-labelledby="approach-title">
      <div className="editorial-shell">
        <div className="editorial-heading">
          <p className="editorial-heading__label">04 — Approach</p>
          <div className="editorial-heading__content">
            <h2 id="approach-title" className="editorial-heading__title">How we work.</h2>
            <p className="editorial-heading__note">{approachNote}</p>
          </div>
        </div>
        <ProcessMotion>
          {steps.map((step, index) => (
            <li key={step.n} className="ap-step" style={{ "--step-index": index } as CSSProperties}>
              <span className="ap-step__number" aria-hidden="true"><span>{step.n}</span></span>
              <div className="ap-step__copy">
                <h3 className="ap-step__title">{step.title}</h3>
                <p className="ap-step__text">{step.text}</p>
              </div>
            </li>
          ))}
        </ProcessMotion>
        <div className="ap-ownership">
          <span>Who owns what</span>
          <p>{ownership}</p>
        </div>
      </div>
    </section>
  )
}
