import Link from "next/link"
import { closing, site } from "@/lib/site"
import { ScrollScene } from "./scroll-scene"
import { ClosingTransformation } from "./closing-transformation"

export function CtaBand() {
  return (
    <ScrollScene className="editorial-closing editorial-closing--transform" labelledBy="cta-title">
      <div className="editorial-shell">
        <div className="editorial-closing__rule" aria-hidden="true" />
        <div className="editorial-closing__body">
          <div className="editorial-closing__copy">
            <p className="editorial-heading__label">06 — A conversation</p>
            <h2 id="cta-title">{closing.title}</h2>
            <p>{closing.text}</p>
            <Link href="/contact" className="editorial-link">{closing.cta} <span aria-hidden="true">→</span></Link>
            <a className="editorial-closing__email" href={`mailto:${site.email}`}>{site.email}</a>
          </div>
          <ClosingTransformation />
        </div>
      </div>
    </ScrollScene>
  )
}
