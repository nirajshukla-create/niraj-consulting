import type { CSSProperties } from "react"
import type { CoverKind } from "@/lib/site"

/**
 * Little animated scenes for the service cards, drawn as inline SVG on each card's colour.
 * Each one loops on its own and speeds up while the card is hovered (see globals.css).
 */
export function Cover({ kind }: { kind: CoverKind }) {
  switch (kind) {
    case "web":
      return <Browser />
    case "social":
      return <Bubbles />
    case "strategy":
      return <Target />
    case "brand":
      return <Swatches />
  }
}

const common = { viewBox: "0 0 400 300", className: "cover", "aria-hidden": true as const, focusable: "false" as const }
const INK = "#141c33"
const PAPER = "#f7f2e8"

/** A page being built: blocks in place, a progress bar filling, a cursor roaming and clicking. */
function Browser() {
  return (
    <svg {...common}>
      <rect x="54" y="46" width="292" height="214" rx="14" fill={PAPER} />
      <rect x="54" y="46" width="292" height="28" rx="14" fill={INK} opacity="0.1" />
      <circle cx="72" cy="60" r="4" fill="#ff5a4e" />
      <circle cx="86" cy="60" r="4" fill="#f4b62f" />
      <circle cx="100" cy="60" r="4" fill="#1fa39c" />
      <rect x="76" y="96" width="150" height="16" rx="4" fill={INK} />
      <rect x="76" y="120" width="112" height="8" rx="4" fill={INK} opacity="0.35" />
      <rect x="76" y="134" width="90" height="8" rx="4" fill={INK} opacity="0.35" />
      <rect x="76" y="158" width="78" height="26" rx="13" fill="#ff5a4e" />
      <rect x="242" y="96" width="82" height="88" rx="10" fill="#1fa39c" opacity="0.9" />
      <path d="M242 184l24-32 18 20 12-14 28 26z" fill={PAPER} opacity="0.7" />
      <rect x="76" y="206" width="248" height="10" rx="5" fill={INK} opacity="0.12" />
      <rect className="bar" x="76" y="206" width="248" height="10" rx="5" fill="#f4b62f" />
      <rect x="76" y="228" width="248" height="6" rx="3" fill={INK} opacity="0.12" />
      <g className="cursor" style={{ transform: "translate(0,0)" } as CSSProperties}>
        <circle cx="120" cy="170" r="10" fill={INK} opacity="0.18" />
        <path d="M112 162l16 6-7 2-2 7z" fill={INK} />
      </g>
    </svg>
  )
}

/** Conversations: speech bubbles popping up in turn, hearts rising from a liked post. */
function Bubbles() {
  const hearts = [
    { x: 300, y: 230, d: 0 },
    { x: 322, y: 240, d: 1.2 },
    { x: 282, y: 244, d: 2.4 },
  ]
  return (
    <svg {...common}>
      <g className="bubble" style={{ "--d": "0s" } as CSSProperties}>
        <rect x="56" y="70" width="170" height="52" rx="18" fill={PAPER} />
        <path d="M76 120l-10 18 24-14z" fill={PAPER} />
        <rect x="74" y="88" width="110" height="7" rx="3.5" fill={INK} opacity="0.7" />
        <rect x="74" y="101" width="70" height="7" rx="3.5" fill={INK} opacity="0.35" />
      </g>
      <g className="bubble" style={{ "--d": "1.4s", transformOrigin: "80% 100%" } as CSSProperties}>
        <rect x="170" y="140" width="176" height="52" rx="18" fill={INK} />
        <path d="M326 190l10 18-24-14z" fill={INK} />
        <rect x="190" y="158" width="118" height="7" rx="3.5" fill={PAPER} opacity="0.85" />
        <rect x="190" y="171" width="78" height="7" rx="3.5" fill={PAPER} opacity="0.45" />
      </g>
      <g className="bubble" style={{ "--d": "2.8s" } as CSSProperties}>
        <rect x="56" y="206" width="130" height="44" rx="16" fill="#f4b62f" />
        <circle cx="82" cy="228" r="5" fill={INK} />
        <circle cx="104" cy="228" r="5" fill={INK} />
        <circle cx="126" cy="228" r="5" fill={INK} />
      </g>
      {hearts.map((h, i) => (
        <path
          key={i}
          className="heart"
          style={{ "--d": `${h.d}s` } as CSSProperties}
          d={`M${h.x} ${h.y}c-6-9-20-7-20 4 0 9 12 15 20 23 8-8 20-14 20-23 0-11-14-13-20-4z`}
          fill={PAPER}
        />
      ))}
    </svg>
  )
}

/** Aim: an arrow flying into the bullseye, the rings jolting on impact, a compass turning behind. */
function Target() {
  return (
    <svg {...common}>
      <g className="spin-slow" opacity="0.28" fill="none" stroke={INK} strokeWidth="2">
        <circle cx="200" cy="150" r="128" strokeDasharray="4 10" />
        <path d="M200 10v24M200 266v24M60 150h24M316 150h24" />
      </g>
      <g className="ring">
        <circle cx="200" cy="150" r="92" fill={PAPER} />
        <circle cx="200" cy="150" r="68" fill={INK} />
        <circle cx="200" cy="150" r="44" fill={PAPER} />
        <circle cx="200" cy="150" r="20" fill="#ff5a4e" />
      </g>
      <g className="arrow-fly">
        <path d="M212 138l118-118" stroke={INK} strokeWidth="7" strokeLinecap="round" />
        <path d="M330 20l-38 6M330 20l-6 38" stroke="#ff5a4e" strokeWidth="7" strokeLinecap="round" />
        <path d="M200 150l20-20" stroke={INK} strokeWidth="7" strokeLinecap="round" />
      </g>
    </svg>
  )
}

/** Brand: colour chips fanning out from a stack, with a monogram dot at the pivot. */
function Swatches() {
  const chips = [
    { c: "#ff5a4e", r: -36 },
    { c: "#f4b62f", r: -12 },
    { c: "#1fa39c", r: 12 },
    { c: PAPER, r: 36 },
  ]
  return (
    <svg {...common}>
      {chips.map((ch, i) => (
        <g key={i} className="swatch" style={{ "--r": `${ch.r}deg` } as CSSProperties}>
          <rect x="160" y="60" width="80" height="190" rx="14" fill={ch.c} />
          <rect x="176" y="78" width="48" height="48" rx="10" fill={INK} opacity={ch.c === PAPER ? 0.9 : 0.25} />
          <rect x="176" y="140" width="40" height="6" rx="3" fill={INK} opacity="0.5" />
          <rect x="176" y="152" width="28" height="6" rx="3" fill={INK} opacity="0.3" />
        </g>
      ))}
      <circle cx="200" cy="258" r="14" fill={INK} />
      <circle cx="200" cy="258" r="6" fill={PAPER} />
    </svg>
  )
}
