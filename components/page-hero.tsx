import type { ReactNode } from "react"
import "./inner-editorial.css"

/** A quiet editorial opening shared by the studio's inner pages. */
export function PageHero({ kicker, title, sub }: { kicker: string; title: ReactNode; sub?: string }) {
  return (
    <header className="inner-masthead">
      <div className="editorial-shell">
        <div className="editorial-heading">
          <p className="editorial-heading__label">{kicker}</p>
          <div className="editorial-heading__content">
            <h1 className="editorial-heading__title">{title}</h1>
            {sub && <p className="editorial-heading__note">{sub}</p>}
          </div>
        </div>
      </div>
    </header>
  )
}
