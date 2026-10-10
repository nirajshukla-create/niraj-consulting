"use client"

import { useEffect, useRef } from "react"
import { clamp01, onScroll, prefersReduced } from "./motion"
import "./closing-transformation.css"

type Shape = { points: number[]; angle: number }
const pieces: { loose: Shape; open: Shape; joined: Shape }[] = [
  { loose: { points: [80,74,240,74,240,204,80,204], angle: -18 }, open: { points: [180,68,348,104,310,246,142,210], angle: -12 }, joined: { points: [112,136,357,136,315,220,112,220], angle: 0 } },
  { loose: { points: [440,42,600,42,600,172,440,172], angle: 22 }, open: { points: [426,66,594,122,546,268,378,212], angle: 20 }, joined: { points: [427,52,616,52,616,136,385,136], angle: 0 } },
  { loose: { points: [128,258,268,258,268,388,128,388], angle: 14 }, open: { points: [198,238,368,280,326,414,156,372], angle: 24 }, joined: { points: [112,304,273,304,231,388,112,388], angle: 0 } },
  { loose: { points: [470,256,642,256,642,386,470,386], angle: -23 }, open: { points: [446,212,626,252,584,398,404,358], angle: -16 }, joined: { points: [343,220,616,220,616,304,301,304], angle: 0 } },
]
const ease = (value: number) => { const p = clamp01(value); return p * p * (3 - 2 * p) }
const mix = (a: number, b: number, p: number) => a + (b - a) * p

/** Four loose shapes fold into the studio's offset-cut mark. Native scroll is reversible. */
export function ClosingTransformation() {
  const ref = useRef<HTMLDivElement>(null)
  const shapeRefs = useRef<(SVGPolygonElement | null)[]>([])

  useEffect(() => {
    const element = ref.current
    if (!element) return
    let enabled = false
    let progress = 1
    let previous = -1
    const measure = () => { enabled = !prefersReduced(); previous = -1; element.dataset.motion = enabled ? "on" : "off" }
    const read = () => {
      const viewport = window.innerHeight
      const rect = element.getBoundingClientRect()
      // Keep the whole composition visible for the important part of the morph.
      const start = viewport * .94 - Math.min(rect.height, viewport * .6)
      progress = enabled ? clamp01((start - rect.top) / Math.max(viewport * .22, start - viewport * .16)) : 1
    }
    const write = () => {
      const p = Math.round(progress * 1000) / 1000
      if (p === previous) return
      previous = p
      element.style.setProperty("--closing-progress", String(p))
      element.dataset.phase = p < .32 ? "0" : p < .72 ? "1" : "2"
      pieces.forEach((piece, i) => {
        const shape = shapeRefs.current[i]
        if (!shape) return
        const first = ease((p - i * .025) / .42)
        const second = ease((p - .45 - i * .035) / .43)
        const points = piece.loose.points.map((value, index) => mix(mix(value, piece.open.points[index], first), piece.joined.points[index], second))
        const x = (points[0] + points[2] + points[4] + points[6]) / 4
        const y = (points[1] + points[3] + points[5] + points[7]) / 4
        const angle = mix(mix(piece.loose.angle, piece.open.angle, first), 0, second)
        shape.setAttribute("points", points.map(value => value.toFixed(2)).join(" "))
        shape.setAttribute("transform", `rotate(${angle.toFixed(2)} ${x.toFixed(2)} ${y.toFixed(2)})`)
      })
    }
    const refresh = () => { measure(); window.dispatchEvent(new Event("resize")) }
    const off = onScroll({ resize: measure, read, write })
    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    media.addEventListener("change", refresh)
    window.addEventListener("studio-motion-change", refresh)
    const mode = new MutationObserver(refresh)
    mode.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })
    return () => { off(); mode.disconnect(); media.removeEventListener("change", refresh); window.removeEventListener("studio-motion-change", refresh) }
  }, [])

  return <div className="closing-transformation" ref={ref} data-phase="2" aria-hidden="true">
    <div className="closing-transformation__top"><span>From parts to a whole.</span><span>IE / 04</span></div>
    <svg viewBox="0 0 760 440" focusable="false">
      <path className="closing-transformation__grid" d="M0 136H760M0 220H760M0 304H760M112 0V440M357 0V440M616 0V440" />
      <circle className="closing-transformation__guide" cx="380" cy="220" r="185" />
      {pieces.map((piece, index) => <polygon key={index} ref={element => { shapeRefs.current[index] = element }} points={piece.joined.points.join(" ")} className={`closing-transformation__piece closing-transformation__piece--${index}`} />)}
    </svg>
    <div className="closing-transformation__stages"><span>Separate</span><span>Explore</span><span>Connect</span></div>
  </div>
}
