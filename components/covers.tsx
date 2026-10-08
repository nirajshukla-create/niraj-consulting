import type { CoverKind } from "@/lib/site"

/**
 * Line-art covers for the service cards, drawn as inline SVG so they stay crisp at any size
 * and can move: a scan line sweeps the wireframe, the signal waves drift, the contour map
 * breathes and the brand marks turn. All transform-only, all paused for reduced motion.
 */
export function Cover({ kind }: { kind: CoverKind }) {
  switch (kind) {
    case "web":
      return <Wireframe />
    case "social":
      return <Signal />
    case "strategy":
      return <Contours />
    case "brand":
      return <Marks />
  }
}

const common = { viewBox: "0 0 300 200", className: "cover", "aria-hidden": true as const, focusable: "false" as const }

function Wireframe() {
  return (
    <svg {...common}>
      <defs>
        <pattern id="cv-grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M20 0H0V20" fill="none" stroke="currentColor" strokeOpacity="0.1" />
        </pattern>
        <clipPath id="cv-clip">
          <rect x="60" y="30" width="180" height="140" />
        </clipPath>
      </defs>
      <rect width="300" height="200" fill="url(#cv-grid)" />
      <g fill="none" stroke="currentColor" strokeOpacity="0.6">
        <rect x="60.5" y="30.5" width="179" height="139" />
        <path d="M60.5 46.5H239.5" />
        <circle cx="68" cy="38.5" r="1.8" fill="currentColor" stroke="none" />
        <circle cx="75" cy="38.5" r="1.8" fill="currentColor" stroke="none" />
        <circle cx="82" cy="38.5" r="1.8" fill="currentColor" stroke="none" />
        <rect x="72" y="60" width="92" height="9" fill="currentColor" fillOpacity="0.7" stroke="none" />
        <rect x="72" y="74" width="64" height="5" fill="currentColor" fillOpacity="0.3" stroke="none" />
        <rect x="72" y="84" width="48" height="5" fill="currentColor" fillOpacity="0.3" stroke="none" />
        <rect x="72.5" y="98.5" width="40" height="13" />
        <rect x="174.5" y="60.5" width="53" height="51" />
        <path d="M174.5 111.5l20-24 14 16 9-9 10 17" strokeOpacity="0.45" />
        <path d="M72 130H228M72 142H204M72 154H216" strokeOpacity="0.28" />
      </g>
      <g clipPath="url(#cv-clip)">
        <g className="scan">
          <path d="M60 30H240" stroke="var(--color-accent)" strokeWidth="1" />
          <rect x="60" y="20" width="180" height="10" fill="var(--color-accent)" fillOpacity="0.12" />
        </g>
      </g>
    </svg>
  )
}

function wavePath(amp: number, yc: number, phase: number) {
  const pts: string[] = []
  for (let x = 0; x <= 450; x += 5) {
    const y = yc + amp * Math.sin((x / 150) * Math.PI * 2 + phase)
    pts.push(`${x === 0 ? "M" : "L"}${x} ${y.toFixed(1)}`)
  }
  return pts.join(" ")
}

function Signal() {
  return (
    <svg {...common}>
      <g fill="none" stroke="currentColor" strokeWidth="1">
        <path className="wave" d={wavePath(26, 100, 0)} strokeOpacity="0.6" />
        <path className="wave wave--2" d={wavePath(16, 100, 1.4)} strokeOpacity="0.35" />
        <path className="wave wave--3" d={wavePath(38, 100, 2.6)} strokeOpacity="0.18" />
      </g>
      <g fill="none" stroke="var(--color-accent)" strokeWidth="1">
        <circle className="ring" cx="150" cy="100" r="14" />
        <circle className="ring ring--2" cx="150" cy="100" r="14" />
      </g>
      <circle cx="150" cy="100" r="3.5" fill="var(--color-accent)" />
      <g fill="currentColor" fillOpacity="0.5">
        <rect x="36" y="160" width="28" height="4" />
        <rect x="70" y="160" width="12" height="4" />
        <rect x="88" y="160" width="40" height="4" />
        <rect x="236" y="36" width="28" height="4" />
        <rect x="222" y="36" width="8" height="4" />
      </g>
    </svg>
  )
}

function contourPath(k: number) {
  const cx = 150
  const cy = 100
  const N = 72
  const pts: string[] = []
  for (let i = 0; i <= N; i++) {
    const t = (i / N) * Math.PI * 2
    const r = 12.5 * k * (1 + 0.14 * Math.sin(3 * t + k * 0.9) + 0.07 * Math.cos(5 * t - k * 1.7))
    const x = cx + Math.cos(t) * r * 1.45
    const y = cy + Math.sin(t) * r
    pts.push(`${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`)
  }
  return pts.join(" ") + " Z"
}

function Contours() {
  return (
    <svg {...common}>
      <g className="contours" fill="none" stroke="currentColor" strokeWidth="1">
        {[1, 2, 3, 4, 5, 6].map((k) => (
          <path key={k} d={contourPath(k)} strokeOpacity={0.62 - k * 0.07} />
        ))}
      </g>
      <path className="route" d="M28 172 L84 138 L118 118 L150 100" fill="none" stroke="var(--color-accent)" strokeWidth="1.2" />
      <path d="M22 166l12 12M34 166l-12 12" stroke="currentColor" strokeWidth="1" strokeOpacity="0.7" />
      <circle cx="150" cy="100" r="3" fill="var(--color-accent)" />
      <circle className="blink" cx="150" cy="100" r="7" fill="none" stroke="var(--color-accent)" />
    </svg>
  )
}

function Marks() {
  return (
    <svg {...common}>
      <g stroke="currentColor" strokeOpacity="0.55" fill="none">
        <path d="M24 40V24h16M276 40V24h-16M24 160v16h16M276 160v16h-16" />
        <path d="M60 100h180" strokeOpacity="0.25" />
        <path d="M150 40v120" strokeOpacity="0.25" />
      </g>
      <g className="spin" fill="none" stroke="currentColor" strokeOpacity="0.6">
        <rect x="118" y="68" width="64" height="64" />
      </g>
      <g className="spin spin--r" fill="none" stroke="currentColor" strokeOpacity="0.4">
        <rect x="106" y="56" width="88" height="88" strokeDasharray="6 5" />
      </g>
      <circle cx="150" cy="100" r="44" fill="none" stroke="currentColor" strokeOpacity="0.6" />
      <circle cx="150" cy="100" r="5" fill="var(--color-accent)" />
      <g fill="currentColor" fillOpacity="0.5">
        <rect x="36" y="150" width="20" height="4" />
        <rect x="62" y="150" width="34" height="4" />
      </g>
    </svg>
  )
}
