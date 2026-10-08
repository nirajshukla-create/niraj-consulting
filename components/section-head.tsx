import type { ReactNode } from "react"
import { Reveal } from "./motion"

/** A numbered badge, a mono kicker and a big display title that wipes up from behind a line. */
export function SectionHead({ n, kicker, title, titleId, note }: { n: string; kicker: string; title: ReactNode; titleId?: string; note?: ReactNode }) {
  return (
    <div className="head">
      <div>
        <Reveal effect="fade">
          <p className="kicker head__kicker">
            <span className="num" aria-hidden="true">
              {n}
            </span>
            <span className="sr-only">Section {n}: </span>
            {kicker}
          </p>
        </Reveal>
        <Reveal effect="clip" delay={80}>
          <h2 className="head__title display" id={titleId}>
            {title}
          </h2>
        </Reveal>
      </div>
      {note && (
        <Reveal effect="left" delay={200}>
          <p className="head__note">{note}</p>
        </Reveal>
      )}
    </div>
  )
}
