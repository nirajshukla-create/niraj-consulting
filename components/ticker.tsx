import type { CSSProperties } from "react"
import { ticker } from "@/lib/site"

function Band({ items, tone, speed }: { items: string[]; tone: "mustard" | "ink"; speed: number }) {
  const row = (
    <div className="ticker__track" style={{ "--t": `${speed}s` } as CSSProperties}>
      {[...items, ...items].map((t, i) => (
        <span key={i} className="ticker__item" aria-hidden={i >= items.length ? true : undefined}>
          {t}
          <i aria-hidden="true" />
        </span>
      ))}
    </div>
  )
  return (
    <div className={`ticker ticker--${tone}`} aria-label={items.join(", ")}>
      {row}
    </div>
  )
}

/** Two tilted bands crossing the seam under the hero, scrolling against each other. Pause on hover. */
export function Tickers() {
  return (
    <div className="tickers" aria-hidden="false">
      <Band items={ticker} tone="mustard" speed={42} />
      <Band items={[...ticker].reverse()} tone="ink" speed={54} />
    </div>
  )
}
