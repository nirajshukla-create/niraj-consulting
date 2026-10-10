"use client"

import { useEffect, useRef, type ReactNode, type RefObject } from "react"
import { clamp01, onScroll, prefersReduced } from "./motion"

function useStudioArtMotion(ref: RefObject<HTMLElement | null>, variant: "portrait" | "finale") {
  useEffect(() => {
    const element = ref.current
    if (!element) return
    let enabled = !prefersReduced()
    let progress = 1
    let pointerFrame = 0
    let refreshFrame = 0
    let pointerX = 0
    let pointerY = 0
    let journey = .5
    let disposed = false
    const hover = window.matchMedia("(hover: hover) and (pointer: fine)")

    const configure = () => {
      enabled = !prefersReduced()
      element.dataset.artMotion = enabled ? "on" : "off"
      element.style.setProperty("--art-hover", "0")
      element.style.setProperty("--art-invert", "0")
      if (hover.matches) {
        element.style.setProperty("--art-x", "0")
        element.style.setProperty("--art-y", "0")
      }
      if (!enabled) {
        if (pointerFrame) cancelAnimationFrame(pointerFrame)
        pointerFrame = 0
        pointerX = 0
        pointerY = 0
        element.style.setProperty("--art-progress", "1")
        element.style.setProperty("--art-journey", ".5")
        element.style.setProperty("--art-x", "0")
        element.style.setProperty("--art-y", "0")
      }
    }
    const read = () => {
      if (!enabled || disposed) return
      const rect = element.getBoundingClientRect()
      const viewport = window.visualViewport?.height ?? window.innerHeight
      const travel = variant === "portrait" ? viewport * .55 : viewport * .8
      progress = clamp01((viewport * .96 - rect.top) / Math.max(1, travel))
      journey = clamp01((viewport - rect.top) / Math.max(1, viewport + rect.height))
    }
    const write = () => {
      if (enabled && !disposed) {
        element.style.setProperty("--art-progress", progress.toFixed(4))
        element.style.setProperty("--art-journey", journey.toFixed(4))
        if (!hover.matches) {
          element.style.setProperty("--art-x", (Math.sin(journey * Math.PI * 2) * .8).toFixed(3))
          element.style.setProperty("--art-y", (Math.sin(journey * Math.PI) * .4).toFixed(3))
          element.style.setProperty("--art-hover", clamp01((journey - .15) / .35).toFixed(3))
          element.style.setProperty("--art-invert", journey >= .325 ? "1" : "0")
        }
      }
    }
    const scroll = onScroll({ resize: configure, read, write })
    const refresh = () => {
      if (!refreshFrame && !disposed) refreshFrame = requestAnimationFrame(() => {
        refreshFrame = 0
        read()
        write()
      })
    }

    const paintPointer = () => {
      pointerFrame = 0
      element.style.setProperty("--art-x", enabled ? pointerX.toFixed(3) : "0")
      element.style.setProperty("--art-y", enabled ? pointerY.toFixed(3) : "0")
    }
    const schedulePointer = () => {
      if (!pointerFrame) pointerFrame = requestAnimationFrame(paintPointer)
    }
    const pointerMove = (event: PointerEvent) => {
      if (!enabled || !hover.matches || event.pointerType !== "mouse") return
      const bounds = element.getBoundingClientRect()
      pointerX = Math.max(-1, Math.min(1, ((event.clientX - bounds.left) / Math.max(1, bounds.width) - .5) * 2))
      pointerY = Math.max(-1, Math.min(1, ((event.clientY - bounds.top) / Math.max(1, bounds.height) - .5) * 2))
      schedulePointer()
    }
    const pointerLeave = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return
      pointerX = 0; pointerY = 0; schedulePointer()
    }
    const motionChanged = () => {
      configure()
      refresh()
    }
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)")
    preference.addEventListener("change", motionChanged)
    hover.addEventListener("change", motionChanged)
    window.addEventListener("studio-motion-change", motionChanged)
    window.visualViewport?.addEventListener("resize", motionChanged)
    element.addEventListener("pointermove", pointerMove, { passive: true })
    element.addEventListener("pointerleave", pointerLeave)
    element.addEventListener("pointercancel", pointerLeave)
    const modeObserver = new MutationObserver(motionChanged)
    modeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })
    const observer = new IntersectionObserver(([entry]) => {
      element.dataset.artVisible = String(entry.isIntersecting)
      if (entry.isIntersecting) refresh()
    }, { rootMargin: "100px" })
    observer.observe(element)

    return () => {
      disposed = true
      scroll()
      preference.removeEventListener("change", motionChanged)
      hover.removeEventListener("change", motionChanged)
      window.removeEventListener("studio-motion-change", motionChanged)
      window.visualViewport?.removeEventListener("resize", motionChanged)
      element.removeEventListener("pointermove", pointerMove)
      element.removeEventListener("pointerleave", pointerLeave)
      element.removeEventListener("pointercancel", pointerLeave)
      observer.disconnect()
      modeObserver.disconnect()
      if (pointerFrame) cancelAnimationFrame(pointerFrame)
      if (refreshFrame) cancelAnimationFrame(refreshFrame)
    }
  }, [ref, variant])
}

export function PortraitMotion({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  useStudioArtMotion(ref, "portrait")
  return <div ref={ref} className="studio-person__art studio-assembly">{children}</div>
}

export function FinaleMotion({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLElement>(null)
  useStudioArtMotion(ref, "finale")
  return <section ref={ref} className="closing closing-finale" aria-labelledby="cta-title">{children}</section>
}
