import type { CSSProperties } from "react"

/**
 * The row houses of downtown St. John's at dusk, drawn flat from a seeded generator so the
 * street is the same on every build, with the lighthouse at the Narrows on the right.
 *
 * Two SVGs share one street so the browser never repaints the big one:
 *   <Skyline />       the houses, dark windows, lighthouse and street. Static. Painted once.
 *   <SkylineLights /> only the things that move: lit windows (twinkle), chimney smoke, lamp.
 * The lighthouse beam is an HTML element placed with CSS (see .beam in globals.css), so its
 * rotation is composited instead of repainting a 1700px gradient every frame.
 * `animated: false` (share image) folds the lights into the static drawing.
 */
const PALETTE = ["#d8573a", "#d7a23f", "#1e8c86", "#5b4a99", "#e9e2d3", "#c0623c", "#3f6b9e", "#a84f66", "#4d8a5c", "#c9865c"]
const INK = "#0f1626"
const LIT = "#f3cf7a"
const GROUND = 400
/** The lamp, in viewBox units. .beam in globals.css is anchored to the same point. */
export const LAMP = { x: 1552, y: 238 }

type House = {
  x: number
  w: number
  h: number
  color: string
  roof: "flat" | "gable" | "mansard"
  chimney: boolean
  windows: { x: number; y: number; lit: boolean; delay: number }[]
  door: number
}

function rng(seed: number) {
  let s = seed >>> 0
  return () => {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0
    return s / 4294967296
  }
}

export function buildStreet(seed = 11, width = 1470, ground = GROUND): House[] {
  const r = rng(seed)
  const houses: House[] = []
  let x = -24
  let last = -1
  while (x < width) {
    const w = 64 + Math.floor(r() * 92)
    const h = 130 + Math.floor(r() * 190)
    let ci = Math.floor(r() * PALETTE.length)
    if (ci === last) ci = (ci + 1) % PALETTE.length
    last = ci
    const roof = (["flat", "gable", "mansard", "flat"] as const)[Math.floor(r() * 4)]
    const cols = Math.max(1, Math.floor((w - 22) / 34))
    const rows = Math.max(1, Math.floor((h - 76) / 52))
    const windows: House["windows"] = []
    const gapX = (w - 20) / cols
    for (let row = 0; row < rows; row++) {
      for (let c = 0; c < cols; c++) {
        windows.push({ x: x + 10 + c * gapX + gapX / 2 - 8, y: ground - h + 22 + row * 52, lit: r() < 0.62, delay: r() * 7 })
      }
    }
    houses.push({ x, w, h, color: PALETTE[ci], roof, chimney: r() < 0.45, windows, door: x + w / 2 - 10 + (r() - 0.5) * (w - 40) })
    x += w + 1 + Math.floor(r() * 5)
  }
  return houses
}

const SVG = { viewBox: "0 0 1600 430", preserveAspectRatio: "xMidYMax slice", "aria-hidden": true as const, focusable: "false" as const }

export function Skyline({ animated = true, className = "skyline" }: { animated?: boolean; className?: string }) {
  const houses = buildStreet()
  return (
    <svg {...SVG} className={className}>
      {!animated && (
        <defs>
          <radialGradient id="lamp-glow-static">
            <stop offset="0" stopColor="#fff2c8" stopOpacity="0.9" />
            <stop offset="1" stopColor="#fff2c8" stopOpacity="0" />
          </radialGradient>
        </defs>
      )}
      {houses.map((hs, i) => {
        const top = GROUND - hs.h
        return (
          <g key={i}>
            {hs.chimney && <rect x={hs.x + hs.w - 22} y={top - 26} width="12" height="34" fill={INK} opacity="0.85" />}
            <rect x={hs.x} y={top} width={hs.w} height={hs.h} fill={hs.color} />
            <rect x={hs.x + hs.w - Math.max(6, hs.w * 0.12)} y={top} width={Math.max(6, hs.w * 0.12)} height={hs.h} fill={INK} opacity="0.24" />
            {hs.roof === "gable" && <polygon points={`${hs.x - 4},${top} ${hs.x + hs.w / 2},${top - 34} ${hs.x + hs.w + 4},${top}`} fill={hs.color} />}
            {hs.roof === "gable" && <polygon points={`${hs.x - 4},${top} ${hs.x + hs.w / 2},${top - 34} ${hs.x + hs.w + 4},${top}`} fill={INK} opacity="0.4" />}
            {hs.roof === "mansard" && <polygon points={`${hs.x - 3},${top} ${hs.x + 14},${top - 26} ${hs.x + hs.w - 14},${top - 26} ${hs.x + hs.w + 3},${top}`} fill={INK} opacity="0.45" />}
            {hs.roof === "flat" && <rect x={hs.x - 3} y={top - 7} width={hs.w + 6} height="9" fill={INK} opacity="0.45" />}
            <rect x={hs.x - 3} y={top - (hs.roof === "flat" ? 7 : 0)} width={hs.w + 6} height="2" fill="#fff" opacity="0.35" />
            {hs.windows.map((w, j) =>
              w.lit && animated ? null : (
                <rect key={j} x={w.x} y={w.y} width="16" height="24" rx="2" fill={w.lit ? LIT : INK} opacity={w.lit ? 1 : 0.5} />
              ),
            )}
            <rect x={hs.door} y={GROUND - 36} width="20" height="36" rx="2" fill={INK} opacity="0.6" />
          </g>
        )
      })}

      {/* the lighthouse on its rock at the Narrows */}
      <polygon points="1470,400 1500,342 1560,330 1610,352 1640,400" fill="#0b1020" />
      <polygon points="1540,338 1564,338 1570,262 1534,262" fill="#e9e2d3" />
      <rect x="1534" y="296" width="36" height="12" fill="#d8573a" />
      <rect x="1538" y="248" width="28" height="16" fill={INK} />
      <polygon points="1534,248 1552,232 1570,248" fill={INK} />
      <circle cx={LAMP.x} cy={LAMP.y + 4} r="7" fill="#fff2c8" />
      {!animated && <circle cx={LAMP.x} cy={LAMP.y + 4} r="26" fill="url(#lamp-glow-static)" />}

      {/* the street and the harbour's edge */}
      <rect x="0" y={GROUND - 2} width="1600" height="40" fill="#0b1020" />
      <rect x="0" y={GROUND + 6} width="1600" height="2" fill="#fff" opacity="0.08" />
    </svg>
  )
}

/** The moving parts, drawn over the static street in a second, much smaller SVG. */
export function SkylineLights({ className = "skyline skyline-lights" }: { className?: string }) {
  const houses = buildStreet()
  let smokers = 0
  return (
    <svg {...SVG} className={className}>
      <defs>
        <radialGradient id="lamp-glow">
          <stop offset="0" stopColor="#fff2c8" stopOpacity="0.9" />
          <stop offset="1" stopColor="#fff2c8" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="smoke-grad">
          <stop offset="0" stopColor="#e9e2d3" stopOpacity="0.55" />
          <stop offset="0.6" stopColor="#e9e2d3" stopOpacity="0.18" />
          <stop offset="1" stopColor="#e9e2d3" stopOpacity="0" />
        </radialGradient>
      </defs>
      {houses.map((hs, i) => {
        const top = GROUND - hs.h
        const smoke = hs.chimney && smokers < 4 ? ++smokers : 0
        return (
          <g key={i}>
            {smoke > 0 &&
              [0, 1, 2].map((k) => (
                <circle key={k} className="smoke" cx={hs.x + hs.w - 16} cy={top - 30} r="7" fill="url(#smoke-grad)" style={{ "--d": `${(-k * 1.6 - i * 0.7).toFixed(1)}s` } as CSSProperties} />
              ))}
            {hs.windows.map((w, j) =>
              w.lit ? (
                <rect key={j} className="win win--lit" x={w.x} y={w.y} width="16" height="24" rx="2" fill={LIT} style={{ "--d": `-${w.delay.toFixed(1)}s` } as CSSProperties} />
              ) : null,
            )}
          </g>
        )
      })}
      <circle className="lamp" cx={LAMP.x} cy={LAMP.y + 4} r="26" fill="url(#lamp-glow)" />
    </svg>
  )
}
