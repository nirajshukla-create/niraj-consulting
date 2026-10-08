import type { ReactNode } from "react"

/** "01 — SERVICES  What we do" with the hairline underneath, the reference's section rhythm. */
export function SectionHead({ n, kicker, title, titleId, aside }: { n: string; kicker: string; title: string; titleId?: string; aside?: ReactNode }) {
  return (
    <div className="section-head">
      <div className="section-head__group">
        <span className="kicker">
          {n} — {kicker}
        </span>
        <h2 className="section-title" id={titleId}>
          {title}
        </h2>
      </div>
      {aside}
    </div>
  )
}
