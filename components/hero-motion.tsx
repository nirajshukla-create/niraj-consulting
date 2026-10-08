"use client"

import { useEffect, useRef, type ReactNode } from "react"
import { clamp01, onScroll, prefersReduced } from "./motion"

/**
 * The hero's two pointer-and-scroll behaviours. It is pinned under the page: as you scroll,
 * --p runs 0 → 1 over the first screen and the CSS zooms the whole scene out and dims it
 * while the next section slides over. Layers marked data-depth drift with the mouse at
 * their own depth. Once fully covered the scene is hidden so its loops stop costing anything.
 */
export function HeroMotion({ children, className = "hero" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const reduce = prefersReduced()
    let last = -1
    const off = onScroll(() => {
      const y = window.scrollY
      const p = reduce ? 0 : Math.round(clamp01(y / (window.innerHeight * 0.9)) * 200) / 200
      if (p !== last) {
        last = p
        el.style.setProperty("--p", p.toFixed(3))
        el.classList.toggle("hero--zooming", p > 0.02)
      }
      el.classList.toggle("hero--away", y > window.innerHeight * 1.05)
    })
    const layers = Array.from(el.querySelectorAll<HTMLElement>("[data-depth]"))
    let raf = 0
    let mx = 0
    let my = 0
    const paint = () => {
      raf = 0
      for (const l of layers) {
        const d = Number(l.dataset.depth)
        l.style.transform = `translate3d(${(mx * d).toFixed(1)}px, ${(my * d).toFixed(1)}px, 0)`
      }
    }
    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || reduce) return
      mx = (e.clientX / window.innerWidth - 0.5) * 2
      my = (e.clientY / window.innerHeight - 0.5) * 2
      if (!raf) raf = requestAnimationFrame(paint)
    }
    el.addEventListener("pointermove", move, { passive: true })
    return () => {
      off()
      el.removeEventListener("pointermove", move)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])
  return (
    <section ref={ref} className={className} aria-labelledby="hero-title">
      {children}
    </section>
  )
}
