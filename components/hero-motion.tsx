"use client"

import { useEffect, useRef, type ReactNode } from "react"
import { clamp01, onScroll, prefersReduced } from "./motion"

const ease = (value: number) => { const p = clamp01(value); return p * p * (3 - 2 * p) }

/** The full coastline contracts into a split image study, then clears into paper. */
export function HeroMotion({ children, className = "hero" }: { children: ReactNode; className?: string }) {
  const stageRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLElement>(null)
  const viewportRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const stage = stageRef.current
    const hero = heroRef.current
    if (!stage || !hero) return
    let enabled = false
    let height = 0
    let span = 1
    let stickyTop = 0
    let progress = 0
    let textProgress = 0
    let lastProgress = -1
    let lastTextProgress = -1
    let visible = true
    const hover = window.matchMedia("(hover: hover) and (pointer: fine)")
    let pointerFrame = 0
    let px = 0
    let py = 0
    const measure = () => {
      lastProgress = -1
      lastTextProgress = -1
      enabled = !prefersReduced()
      height = hero.offsetHeight
      // The small viewport stays stable when a phone's address bar collapses.
      const viewport = viewportRef.current?.offsetHeight || window.innerHeight
      const width = hero.offsetWidth
      span = Math.max(340, Math.round(viewport * .72))
      stickyTop = Math.min(0, viewport - height)
      stage.dataset.motion = enabled ? "on" : "off"
      hero.dataset.touch = String(!hover.matches)
      stage.style.setProperty("--hero-height", height + "px")
      stage.style.setProperty("--hero-travel", span + "px")
      stage.style.setProperty("--hero-pin-offset", -stickyTop + "px")
      stage.style.setProperty("--hero-view-height", viewport + "px")
      stage.style.setProperty("--hero-arrival-top", Math.round(-stickyTop + Math.max(104, viewport * .12)) + "px")
      stage.style.setProperty("--hero-arrival-height", Math.round(viewport - Math.max(104, viewport * .12) - Math.max(24, viewport * .05)) + "px")
      // The framed composition stays inside the visible portion of a tall mobile hero.
      stage.style.setProperty("--hero-frame-top", Math.round(-stickyTop + viewport * .16) + "px")
      stage.style.setProperty("--hero-frame-bottom", Math.round(Math.max(0, height + stickyTop - viewport * .78)) + "px")
      stage.style.setProperty("--hero-frame-side", Math.round(Math.min(180, width * (width <= 680 ? .09 : .12))) + "px")
      stage.style.setProperty("--hero-split-x", Math.round(Math.min(width * .075, 88)) + "px")
      stage.style.setProperty("--hero-split-y", Math.round(Math.min(viewport * (width <= 680 ? .045 : .09), width <= 680 ? 32 : 70)) + "px")
      hero.style.top = enabled ? stickyTop + "px" : ""
    }
    const off = onScroll({
      resize: measure,
      read: () => {
        if (!enabled) { progress = 0; textProgress = 0; return }
        if (!visible && lastProgress === 1) return
        const top = stage.getBoundingClientRect().top
        progress = enabled ? clamp01((stickyTop - top) / span) : 0
        // Let the lettering move while it is still visible on a short screen.
        textProgress = enabled ? clamp01(-top / (span * .5)) : 0
      },
      write: () => {
        if (progress === lastProgress && textProgress === lastTextProgress) return
        lastProgress = progress
        lastTextProgress = textProgress
        stage.dataset.scrolled = textProgress > .001 ? "true" : "false"
        stage.dataset.detailsHidden = progress >= .56 ? "true" : "false"
        stage.style.setProperty("--hero-p", progress.toFixed(4))
        stage.style.setProperty("--hero-exit", textProgress.toFixed(4))
        stage.style.setProperty("--hero-depth", clamp01(progress / .7).toFixed(4))
        stage.style.setProperty("--hero-frame", ease((progress - .1) / .33).toFixed(4))
        stage.style.setProperty("--hero-split", ease((progress - .31) / .29).toFixed(4))
        stage.style.setProperty("--hero-iris", ease((progress - .61) / .39).toFixed(4))
        stage.style.setProperty("--hero-arrival", ease((progress - .73) / .24).toFixed(4))
        stage.style.setProperty("--title-left", Math.round(textProgress * -170) + "px")
        stage.style.setProperty("--title-right", Math.round(textProgress * 175) + "px")
        stage.style.setProperty("--coast-lift", Math.round(progress * -160) + "px")
        if (!hover.matches) {
          hero.style.setProperty("--pointer-x", Math.round(Math.sin(progress * Math.PI * 2) * 8) + "px")
          hero.style.setProperty("--pointer-y", Math.round(Math.sin(progress * Math.PI) * -5) + "px")
        }
      },
    })
    const updateMotion = () => { measure(); window.dispatchEvent(new Event("resize")) }
    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    media.addEventListener("change", updateMotion)
    hover.addEventListener("change", updateMotion)
    window.addEventListener("studio-motion-change", updateMotion)
    const resize = new ResizeObserver(() => window.dispatchEvent(new Event("resize")))
    resize.observe(hero)
    if (viewportRef.current) resize.observe(viewportRef.current)
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      hero.dataset.visible = String(visible)
      if (visible) window.dispatchEvent(new Event("resize"))
    })
    observer.observe(hero)
    const paintPointer = () => {
      pointerFrame = 0
      hero.style.setProperty("--pointer-x", Math.round(px) + "px")
      hero.style.setProperty("--pointer-y", Math.round(py) + "px")
    }
    const move = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || !enabled) return
      const rect = hero.getBoundingClientRect()
      px = ((event.clientX - rect.left) / rect.width - .5) * 16
      py = ((event.clientY - rect.top) / rect.height - .5) * 10
      if (!pointerFrame) pointerFrame = requestAnimationFrame(paintPointer)
    }
    const reset = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return
      cancelAnimationFrame(pointerFrame); px = 0; py = 0; paintPointer()
    }
    hero.addEventListener("pointermove", move, { passive: true })
    hero.addEventListener("pointerleave", reset)
    return () => {
      off(); resize.disconnect(); observer.disconnect()
      media.removeEventListener("change", updateMotion)
      hover.removeEventListener("change", updateMotion)
      window.removeEventListener("studio-motion-change", updateMotion)
      hero.removeEventListener("pointermove", move)
      hero.removeEventListener("pointerleave", reset)
      if (pointerFrame) cancelAnimationFrame(pointerFrame)
    }
  }, [])
  return <div className="hero-stage" ref={stageRef}><div ref={viewportRef} aria-hidden="true" style={{ position: "absolute", width: 0, height: "100svh", visibility: "hidden", pointerEvents: "none" }} /><section ref={heroRef} className={className} aria-labelledby="hero-title" onFocusCapture={() => {
    // Restore the opening frame when a keyboard user reaches a faded hero link.
    if (stageRef.current?.dataset.detailsHidden === "true") stageRef.current.scrollIntoView({ block: "start", behavior: "instant" })
  }}>{children}</section></div>
}
