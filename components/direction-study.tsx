"use client"

import { useEffect, useRef } from "react"
import { clamp01, onScroll, prefersReduced } from "./motion"
import "./direction-study.css"

const bars = Array.from({ length: 11 }, (_, index) => {
  const distance = Math.abs(index - 5)
  const circleWidth = 2 * Math.sqrt(190 ** 2 - ((index - 5) * 34) ** 2)
  const arrowLeft = distance <= 2 ? 150 : 570
  const arrowRight = 810 - distance * 36
  return {
    circle: { x: 480 - circleWidth / 2, y: 77 + index * 34, width: circleWidth, angle: 0 },
    spread: { x: 225 + (index % 3) * 110, y: 65 + index * 36, width: 260 + (index % 3) * 35, angle: (index % 3 - 1) * 13 },
    arrow: { x: arrowLeft, y: 77 + index * 34, width: arrowRight - arrowLeft, angle: 0 },
  }
})
const ease = (value: number) => { const t = clamp01(value); return t * t * (3 - 2 * t) }
const mix = (from: number, to: number, progress: number) => from + (to - from) * progress

/** The same eleven bars become three compositions, driven by native page scrolling. */
export function DirectionStudy() {
  const sceneRef = useRef<HTMLElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  const viewportRef = useRef<HTMLDivElement>(null)
  const barRefs = useRef<(SVGRectElement | null)[]>([])

  useEffect(() => {
    const scene = sceneRef.current
    const pin = pinRef.current
    if (!scene || !pin) return
    let enabled = false
    let top = 90
    let travel = 600
    let progress = 1
    let previous = -1
    let frame = 0

    const measure = () => {
      enabled = !prefersReduced()
      const viewport = viewportRef.current?.offsetHeight || window.innerHeight
      const headerHeight = document.querySelector<HTMLElement>(".nav")?.offsetHeight || 80
      const pinHeight = pin.offsetHeight
      top = Math.min(headerHeight + 12, viewport - pinHeight - 12)
      travel = Math.round(viewport * .72)
      scene.dataset.motion = enabled ? "on" : "off"
      scene.style.setProperty("--direction-pin-height", `${pinHeight}px`)
      scene.style.setProperty("--direction-travel", `${travel}px`)
      scene.style.setProperty("--direction-top", `${top}px`)
      previous = -1
    }
    const read = () => {
      progress = enabled ? clamp01((top - scene.getBoundingClientRect().top) / Math.max(1, travel)) : 1
    }
    const write = () => {
      const p = Math.round(progress * 1000) / 1000
      if (p === previous) return
      previous = p
      const first = ease(p / .46)
      const second = ease((p - .54) / .4)
      scene.dataset.phase = p < .3 ? "0" : p < .73 ? "1" : "2"
      scene.style.setProperty("--direction-progress", String(p))
      bars.forEach((bar, index) => {
        const element = barRefs.current[index]
        if (!element) return
        const x = mix(mix(bar.circle.x, bar.spread.x, first), bar.arrow.x, second)
        const y = mix(mix(bar.circle.y, bar.spread.y, first), bar.arrow.y, second)
        const width = mix(mix(bar.circle.width, bar.spread.width, first), bar.arrow.width, second)
        const angle = mix(bar.spread.angle * first, 0, second)
        element.setAttribute("x", x.toFixed(2))
        element.setAttribute("y", y.toFixed(2))
        element.setAttribute("width", width.toFixed(2))
        element.setAttribute("rx", (13 * (1 - second)).toFixed(2))
        element.setAttribute("transform", `rotate(${angle.toFixed(2)} ${(x + width / 2).toFixed(2)} ${(y + 13).toFixed(2)})`)
      })
    }
    const refresh = () => {
      measure()
      if (frame) cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => { frame = 0; read(); write() })
    }
    const off = onScroll({ resize: measure, read, write })
    const resize = new ResizeObserver(refresh)
    resize.observe(pin)
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)")
    preference.addEventListener("change", refresh)
    window.addEventListener("studio-motion-change", refresh)
    const mode = new MutationObserver(refresh)
    mode.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })
    return () => {
      off(); resize.disconnect(); mode.disconnect()
      preference.removeEventListener("change", refresh)
      window.removeEventListener("studio-motion-change", refresh)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return <section id="direction-study" className="direction-study" aria-labelledby="direction-title" ref={sceneRef} data-phase="2">
    <div className="direction-study__viewport" ref={viewportRef} aria-hidden="true" />
    <div className="direction-study__pin" ref={pinRef}>
      <div className="editorial-shell">
        <header className="editorial-heading">
          <p className="editorial-heading__label">A study in direction</p>
          <div className="editorial-heading__content"><h2 id="direction-title" className="editorial-heading__title">Ideas, taking shape.</h2></div>
        </header>
        <figure className="direction-study__figure" aria-label="Eleven black bars forming an east-pointing arrow; the same pieces transform into a circle and an open arrangement as you scroll.">
          <svg viewBox="0 0 960 520" role="img" aria-hidden="true" focusable="false">
            <path className="direction-study__axis" d="M48 260H912M480 24V496" />
            <circle className="direction-study__guide" cx="480" cy="260" r="202" />
            {bars.map((bar, index) => <rect key={index} ref={element => { barRefs.current[index] = element }} x={bar.arrow.x} y={bar.arrow.y} width={bar.arrow.width} height="26" fill="currentColor" />)}
          </svg>
          <span className="direction-study__east" aria-hidden="true">E</span>
        </figure>
        <div className="direction-study__footer">
          <ol aria-label="Transformation stages"><li><span>01</span> Explore</li><li><span>02</span> Arrange</li><li><span>03</span> Advance</li></ol>
          <span className="direction-study__cue" aria-hidden="true">Scroll to transform ↓</span>
        </div>
      </div>
    </div>
  </section>
}
