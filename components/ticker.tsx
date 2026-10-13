"use client"

import { useEffect, useRef } from "react"
import { prefersReduced } from "./motion"
import { site } from "@/lib/site"

const items = ["Market entry", "Lead generation", "Research", "Sales enablement", site.location.long]

export function Tickers() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const root = ref.current
    const track = root?.querySelector<HTMLElement>(".kinetic-strip__track")
    if (!root || !track) return
    let frame = 0
    let position = 0
    let width = 1
    let visible = false
    let enabled = false
    let previousTime = 0
    let previousY = window.scrollY
    let speed = 0
    const measure = () => { width = Math.max(1, track.scrollWidth / 2) }
    const loop = (time: number) => {
      frame = 0
      if (!visible || !enabled) return
      const delta = previousTime ? Math.min((time - previousTime) / 1000, .05) : 0
      previousTime = time
      speed *= .94
      position = (position + (45 + Math.min(Math.abs(speed) * 3, 210)) * delta) % width
      track.style.transform = `translateX(${-Math.round(position)}px)`
      frame = requestAnimationFrame(loop)
    }
    const start = () => { if (!frame && visible && enabled) { previousTime = 0; frame = requestAnimationFrame(loop) } }
    const sync = () => {
      enabled = !prefersReduced()
      root.dataset.motion = enabled ? "on" : "off"
      if (!enabled) { cancelAnimationFrame(frame); frame = 0; track.style.transform = "" } else start()
    }
    const scroll = () => { speed = window.scrollY - previousY; previousY = window.scrollY }
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; start() })
    observer.observe(root)
    const resize = new ResizeObserver(measure)
    resize.observe(track)
    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    media.addEventListener("change", sync)
    window.addEventListener("studio-motion-change", sync)
    window.addEventListener("scroll", scroll, { passive: true })
    measure(); sync()
    return () => {
      cancelAnimationFrame(frame); observer.disconnect(); resize.disconnect()
      media.removeEventListener("change", sync)
      window.removeEventListener("studio-motion-change", sync)
      window.removeEventListener("scroll", scroll)
    }
  }, [])
  return <div className="kinetic-strip" ref={ref}>
    <p className="sr-only">{items.join(". ")}.</p>
    <div className="kinetic-strip__track" aria-hidden="true">{[0,1].map(copy=><div className="kinetic-strip__group" key={copy}>{items.map(item=><span key={item}>{item}<i>—</i></span>)}</div>)}</div>
  </div>
}
