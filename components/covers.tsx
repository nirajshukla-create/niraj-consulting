import type { CSSProperties } from "react"
import type { CoverKind } from "@/lib/site"

/**
 * Line art in each card's own colour on the dark glass: a page whose strokes draw
 * themselves, a signal pulsing outward, a marker riding a route, and orbits turning.
 * Every scene loops on its own and speeds up while the card is hovered (see globals.css).
 */
export function Cover({ kind }: { kind: CoverKind }) {
  switch (kind) {
    case "web":
      return <Wireframe />
    case "social":
      return <Signal />
    case "strategy":
      return <Route />
    case "brand":
      return <Orbits />
  }
}

const common = { viewBox: "0 0 400 300", className: "cover", "aria-hidden": true as const, focusable: "false" as const }
const d = (s: number) => ({ "--d": `${s}s` }) as CSSProperties

/** A page drawing itself: frame, header rule, headline, body lines, button, image well. */
function Wireframe() {
  return (
    <svg {...common}>
      <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect className="draw" x="70" y="56" width="260" height="190" rx="14" pathLength={1} style={d(0)} />
        <path className="draw" d="M70 92H330" pathLength={1} style={d(0.4)} />
        <rect className="draw" x="96" y="116" width="118" height="14" rx="5" pathLength={1} style={d(0.8)} />
        <path className="draw" d="M96 150h92M96 170h70" pathLength={1} style={d(1.2)} />
        <rect className="draw" x="96" y="196" width="66" height="26" rx="13" pathLength={1} style={d(1.6)} />
        <rect className="draw" x="240" y="116" width="66" height="106" rx="10" pathLength={1} style={d(2)} />
        <path className="draw" d="M248 206l18-24 14 16 10-12 18 22" pathLength={1} style={d(2.4)} />
      </g>
      <circle className="dot" cx="129" cy="209" r="4" fill="currentColor" />
      <circle cx="86" cy="74" r="2.5" fill="currentColor" opacity="0.6" />
      <circle cx="97" cy="74" r="2.5" fill="currentColor" opacity="0.6" />
      <circle cx="108" cy="74" r="2.5" fill="currentColor" opacity="0.6" />
    </svg>
  )
}

/** A signal going out: rings pulsing from one point, a few listeners lighting up. */
function Signal() {
  return (
    <svg {...common}>
      <g fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle className="sonar" cx="200" cy="150" r="40" style={d(0)} />
        <circle className="sonar" cx="200" cy="150" r="40" style={d(-1.3)} />
        <circle className="sonar" cx="200" cy="150" r="40" style={d(-2.6)} />
      </g>
      <circle className="dot" cx="200" cy="150" r="7" fill="currentColor" />
      <g fill="currentColor">
        <circle cx="92" cy="92" r="3.5" opacity="0.55" />
        <circle cx="318" cy="78" r="3.5" opacity="0.55" />
        <circle cx="330" cy="220" r="3.5" opacity="0.55" />
        <circle cx="74" cy="228" r="3.5" opacity="0.55" />
        <circle cx="262" cy="248" r="2.5" opacity="0.4" />
        <circle cx="140" cy="48" r="2.5" opacity="0.4" />
      </g>
      <g fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3 6" opacity="0.4">
        <path d="M200 150L92 92M200 150l118-72M200 150l130 70M200 150L74 228" />
      </g>
    </svg>
  )
}

const ROUTE = "M56 238 C 118 238, 118 108, 196 108 S 274 196, 344 70"

/** A route with waypoints; the marker travels it there and back. */
function Route() {
  return (
    <svg {...common}>
      <path d={ROUTE} fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 7" opacity="0.55" />
      <path className="draw" d={ROUTE} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" pathLength={1} style={d(0)} />
      <g fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="56" cy="238" r="7" />
        <circle cx="196" cy="108" r="7" />
        <circle cx="344" cy="70" r="9" />
      </g>
      <circle cx="344" cy="70" r="3.5" fill="currentColor" />
      <g className="travel" style={{ offsetPath: `path('${ROUTE}')`, offsetRotate: "0deg" } as CSSProperties}>
        <circle r="12" fill="currentColor" opacity="0.25" />
        <circle r="6" fill="currentColor" />
      </g>
    </svg>
  )
}

/** Three orbits at different speeds around a core, each carrying its own light. */
function Orbits() {
  const rings = [
    { rot: 0, t: "22s", r: 0 },
    { rot: 60, t: "30s", r: 1 },
    { rot: 120, t: "38s", r: 0 },
  ]
  return (
    <svg {...common}>
      {rings.map((o, i) => (
        <g key={i} transform={`rotate(${o.rot} 200 150)`}>
          <g className={`orbit ${o.r ? "orbit--r" : ""}`} style={{ "--t": o.t } as CSSProperties}>
            <ellipse cx="200" cy="150" rx="128" ry="46" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
            <circle cx="328" cy="150" r="5" fill="currentColor" />
          </g>
        </g>
      ))}
      <circle cx="200" cy="150" r="22" fill="currentColor" opacity="0.2" />
      <circle className="dot" cx="200" cy="150" r="11" fill="currentColor" />
    </svg>
  )
}
