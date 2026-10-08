import type { CSSProperties, ReactNode } from "react"

/** The inner pages' opening: the same night sky, a kicker pill, a title that flips in. */
export function PageHero({ kicker, title, sub }: { kicker: string; title: ReactNode; sub?: string }) {
  const words = typeof title === "string" ? title.split(" ") : null
  return (
    <section className="page-hero" aria-label={typeof title === "string" ? title : kicker}>
      <div className="hero__sky" aria-hidden="true">
        <div className="blob blob--a" />
        <div className="blob blob--b" />
        <div className="aurora" />
      </div>
      <div className="pill">
        <span className="pill__dot" aria-hidden="true" />
        <span>{kicker}</span>
      </div>
      <h1 className="page-hero__title display">
        {words
          ? words.map((w, i) => (
              <span key={i}>
                <span className="w" style={{ "--i": i } as CSSProperties}>
                  {w}
                </span>{" "}
              </span>
            ))
          : title}
      </h1>
      {sub && <p className="page-hero__sub">{sub}</p>}
    </section>
  )
}
