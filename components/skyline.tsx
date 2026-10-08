import type { CSSProperties } from "react"

/**
 * The jellybean row houses of downtown St. John's, drawn flat from a seeded generator so
 * the street is the same on every build. Lit windows carry a CSS twinkle; the moonlit roof
 * edges glow. `animated: false` strips the CSS hooks for the share image.
 */
const PALETTE = ["#ff5a4e", "#f4b62f", "#1fa39c", "#6c47b8", "#f7f2e8", "#e8734a", "#3d7bd9", "#d94f8a", "#58b368", "#ff8a65"]
const INK = "#141c33"
const LIT = "#ffd76a"

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

export function buildStreet(seed = 11, width = 1600, ground = 400): House[] {
  const r = rng(seed)
  const houses: House[] = []
  let x = -24
  let last = -1
  while (x < width + 40) {
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

export function Skyline({ animated = true, className = "skyline" }: { animated?: boolean; className?: string }) {
  const ground = 400
  const houses = buildStreet()
  return (
    <svg viewBox="0 0 1600 430" preserveAspectRatio="xMidYMax slice" className={className} aria-hidden="true" focusable="false">
      {houses.map((hs, i) => {
        const top = ground - hs.h
        return (
          <g key={i}>
            {hs.chimney && <rect x={hs.x + hs.w - 22} y={top - 26} width="12" height="34" fill={INK} opacity="0.85" />}
            <rect x={hs.x} y={top} width={hs.w} height={hs.h} fill={hs.color} />
            {/* shaded side for depth */}
            <rect x={hs.x + hs.w - Math.max(6, hs.w * 0.12)} y={top} width={Math.max(6, hs.w * 0.12)} height={hs.h} fill={INK} opacity="0.22" />
            {hs.roof === "gable" && <polygon points={`${hs.x - 4},${top} ${hs.x + hs.w / 2},${top - 34} ${hs.x + hs.w + 4},${top}`} fill={hs.color} />}
            {hs.roof === "gable" && <polygon points={`${hs.x - 4},${top} ${hs.x + hs.w / 2},${top - 34} ${hs.x + hs.w + 4},${top}`} fill={INK} opacity="0.35" />}
            {hs.roof === "mansard" && <polygon points={`${hs.x - 3},${top} ${hs.x + 14},${top - 26} ${hs.x + hs.w - 14},${top - 26} ${hs.x + hs.w + 3},${top}`} fill={INK} opacity="0.4" />}
            {hs.roof === "flat" && <rect x={hs.x - 3} y={top - 7} width={hs.w + 6} height="9" fill={INK} opacity="0.4" />}
            {/* moonlit edge */}
            <rect x={hs.x - 3} y={top - (hs.roof === "flat" ? 7 : 0)} width={hs.w + 6} height="2" fill="#fff" opacity="0.45" className={animated ? "moonlight" : undefined} />
            {hs.windows.map((w, j) =>
              w.lit ? (
                <rect
                  key={j}
                  x={w.x}
                  y={w.y}
                  width="16"
                  height="24"
                  rx="2"
                  fill={LIT}
                  className={animated ? "win win--lit" : undefined}
                  style={animated ? ({ "--d": `-${w.delay.toFixed(1)}s` } as CSSProperties) : undefined}
                />
              ) : (
                <rect key={j} x={w.x} y={w.y} width="16" height="24" rx="2" fill={INK} opacity="0.5" />
              ),
            )}
            <rect x={hs.door} y={ground - 36} width="20" height="36" rx="2" fill={INK} opacity="0.6" />
          </g>
        )
      })}
      {/* the street and the harbour's edge */}
      <rect x="0" y={ground - 2} width="1600" height="40" fill="#0f1630" />
      <rect x="0" y={ground + 6} width="1600" height="2" fill="#fff" opacity="0.08" />
    </svg>
  )
}
