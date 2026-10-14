import Link from "next/link"
import { closing } from "@/lib/site"
import "./market-sections.css"

/** One invitation, in words. The contact details live in the footer directly beneath. */
export function CtaBand() {
  return (
    <section className="editorial-closing editorial-closing--calm" aria-labelledby="cta-title">
      <div className="editorial-shell">
        <div className="editorial-closing__rule" aria-hidden="true" />
        <div className="editorial-closing__body">
          <div className="editorial-closing__copy">
            <p className="editorial-heading__label">05 — A conversation</p>
            <h2 id="cta-title">{closing.title}</h2>
            <p>{closing.text}</p>
            <Link href="/contact" className="editorial-link">{closing.cta} <span aria-hidden="true">→</span></Link>
          </div>
        </div>
      </div>
    </section>
  )
}
