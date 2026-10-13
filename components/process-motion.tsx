"use client"

import { useEffect, useRef, type ReactNode } from "react"

const clamp = (value: number) => Math.min(1, Math.max(0, value))

/** Native sticky panels keep the type sharp; only the decorative artwork transforms. */
export function ProcessMotion({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scene = ref.current
    if (!scene) return
    const root = document.documentElement
    const cards = Array.from(scene.querySelectorAll<HTMLElement>(".ap-step"))
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)")
    let frame = 0
    let active = false
    let disposed = false

    const viewportHeight = () => Math.round(window.visualViewport?.height ?? window.innerHeight)

    const measureCards = () => {
      const viewport = viewportHeight()
      const header = document.querySelector<HTMLElement>(".nav")
      const headerHeight = header?.getBoundingClientRect().height ?? 70
      const preferredTop = Math.round(headerHeight + 12)
      const bottomSpace = Math.max(14, Math.min(24, Math.round(viewport * .025)))
      const heights = cards.map((card) => Math.ceil(card.getBoundingClientRect().height))
      const tallest = Math.max(1, ...heights)
      const spare = viewport - preferredTop - bottomSpace - tallest
      // Keep a visible edge between cards when space permits. On a short screen,
      // the whole stack can pin above the top edge, after its copy has scrolled past.
      const overlap = Math.max(12, Math.min(42, Math.floor(spare / Math.max(1, cards.length - 1))))
      const baseTop = Math.min(preferredTop, ...heights.map((height, index) => viewport - bottomSpace - height - index * overlap))

      cards.forEach((card, index) => {
        const overflow = Math.max(0, heights[index] - (viewport - preferredTop - bottomSpace))
        const runway = Math.round(Math.max(90, viewport * .28) + overflow * .5)
        card.style.setProperty("--step-top", `${baseTop + index * overlap}px`)
        card.style.setProperty("--step-runway", `${runway}px`)
      })
    }

    const paint = () => {
      frame = 0
      if (!active) return
      const viewport = viewportHeight()
      const box = scene.getBoundingClientRect()
      const positions = cards.map((card) => card.getBoundingClientRect())
      const progress = clamp((viewport * .75 - box.top) / Math.max(1, box.height - viewport * .35))

      scene.style.setProperty("--process-progress", progress.toFixed(3))
      positions.forEach((position, index) => {
        // Each number and its rule finish entering while the row is comfortably
        // readable. The viewport-relative travel works on short phone screens too.
        const reveal = clamp((viewport * .94 - position.top) / Math.max(1, Math.min(440, viewport * .56)))
        const next = positions[index + 1]
        const covered = next ? clamp(1 - (next.top - position.top) / position.height) : 0
        cards[index].style.setProperty("--step-reveal", reveal.toFixed(3))
        cards[index].style.setProperty("--step-covered", covered.toFixed(3))
      })
    }

    const schedule = () => {
      if (!frame && active) frame = window.requestAnimationFrame(paint)
    }

    const configure = () => {
      if (disposed) return
      const reduce = root.classList.contains("reduce-motion") ||
        (preference.matches && !root.classList.contains("force-motion"))
      active = !reduce
      scene.dataset.motion = active ? "on" : "off"
      if (!active) {
        if (frame) window.cancelAnimationFrame(frame)
        frame = 0
        scene.style.removeProperty("--process-progress")
        cards.forEach((card) => {
          card.style.removeProperty("--step-reveal")
          card.style.removeProperty("--step-covered")
          card.style.removeProperty("--step-top")
          card.style.removeProperty("--step-runway")
        })
      } else {
        measureCards()
        schedule()
      }
    }

    configure()
    window.addEventListener("scroll", schedule, { passive: true })
    window.addEventListener("resize", configure)
    window.visualViewport?.addEventListener("resize", configure)
    window.addEventListener("studio-motion-change", configure)
    preference.addEventListener("change", configure)
    const observer = new ResizeObserver(configure)
    observer.observe(scene)
    cards.forEach((card) => observer.observe(card))
    const modeObserver = new MutationObserver(configure)
    modeObserver.observe(root, { attributes: true, attributeFilter: ["class"] })
    document.fonts.ready.then(() => { if (!disposed) configure() })

    return () => {
      disposed = true
      window.removeEventListener("scroll", schedule)
      window.removeEventListener("resize", configure)
      window.visualViewport?.removeEventListener("resize", configure)
      window.removeEventListener("studio-motion-change", configure)
      preference.removeEventListener("change", configure)
      observer.disconnect()
      modeObserver.disconnect()
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div ref={ref} className="ap-process-scene">
      <div className="ap-progress" aria-hidden="true">
        <span>From research</span>
        <span className="ap-progress__track"><span /></span>
        <span>To sales assets ↗</span>
      </div>
      <ol className="ap-process">{children}</ol>
    </div>
  )
}
