"use client"

import { useEffect, useRef } from "react"
import { ticker } from "@/lib/site"
import { prefersReduced } from "./motion"

/**
 * Two tilted bands scrolling against each other. Driven by a frame loop instead of a CSS
 * animation so they react to you: scrolling speeds them up and slants the type, scrolling
 * back up reverses them. Idle when off screen, still for reduced motion.
 */
export function Tickers() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const root = ref.current
    if (!root || prefersReduced()) return
    const tracks = Array.from(root.querySelectorAll<HTMLElement>(".ticker__track"))
    const pos = tracks.map(() => 0)
    const dirs = [1, -1]
    const base = [64, 50] // px per second at rest
    let vel = 0
    let lastY = window.scrollY
    let lastT = performance.now()
    let raf = 0
    let visible = false
    const tick = (t: number) => {
      const dt = Math.min(0.05, (t - lastT) / 1000)
      lastT = t
      vel *= 0.88
      const dir = vel < -2 ? -1 : 1
      const boost = Math.min(Math.abs(vel), 80) * 9
      const skew = Math.max(-14, Math.min(14, vel * 0.3))
      tracks.forEach((tr, i) => {
        const half = tr.scrollWidth / 2
        pos[i] -= dirs[i] * dir * (base[i] + boost) * dt
        if (pos[i] <= -half) pos[i] += half
        if (pos[i] > 0) pos[i] -= half
        tr.style.transform = `translate3d(${pos[i].toFixed(1)}px, 0, 0) skewX(${(-skew * dirs[i]).toFixed(2)}deg)`
      })
      raf = visible ? requestAnimationFrame(tick) : 0
    }
    const io = new IntersectionObserver(
      ([e]) => {
        visible = e.isIntersecting
        if (visible && !raf) {
          lastT = performance.now()
          raf = requestAnimationFrame(tick)
        }
      },
      { rootMargin: "240px 0px" },
    )
    io.observe(root)
    const onScroll = () => {
      const y = window.scrollY
      vel += y - lastY
      lastY = y
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      io.disconnect()
      window.removeEventListener("scroll", onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  const band = (items: string[], tone: "mustard" | "ink") => (
    <div className={`ticker ticker--${tone}`} aria-label={items.join(", ")}>
      <div className="ticker__track">
        {[...items, ...items].map((t, i) => (
          <span key={i} className="ticker__item" aria-hidden={i >= items.length ? true : undefined}>
            {t}
            <i aria-hidden="true" />
          </span>
        ))}
      </div>
    </div>
  )

  return (
    <div ref={ref} className="tickers">
      {band(ticker, "mustard")}
      {band([...ticker].reverse(), "ink")}
    </div>
  )
}
