"use client"

import { useEffect, useRef } from "react"
import { prefersReduced } from "./motion"

/**
 * A dot that sits on the pointer and a ring that chases it, blended with whatever is
 * underneath. The ring grows over anything you can press. Mouse-only: it never renders
 * on touch devices, and stays off for reduced motion.
 */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const d = dot.current
    const r = ring.current
    if (!d || !r) return
    if (!window.matchMedia("(pointer: fine)").matches || prefersReduced()) return
    const root = document.documentElement
    let x = window.innerWidth / 2
    let y = window.innerHeight / 2
    let rx = x
    let ry = y
    let raf = 0
    const loop = () => {
      rx += (x - rx) * 0.16
      ry += (y - ry) * 0.16
      d.style.transform = `translate3d(${x}px, ${y}px, 0)`
      r.style.transform = `translate3d(${rx.toFixed(1)}px, ${ry.toFixed(1)}px, 0)`
      raf = Math.abs(x - rx) > 0.2 || Math.abs(y - ry) > 0.2 ? requestAnimationFrame(loop) : 0
    }
    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return
      x = e.clientX
      y = e.clientY
      root.classList.add("has-cursor")
      if (!raf) raf = requestAnimationFrame(loop)
    }
    const over = (e: Event) => {
      const t = (e.target as Element | null)?.closest("a, button, .tilt, input, textarea, select, [role=button]")
      root.classList.toggle("cursor-hover", !!t)
    }
    const leave = () => root.classList.remove("has-cursor")
    window.addEventListener("pointermove", move, { passive: true })
    document.addEventListener("pointerover", over)
    document.addEventListener("mouseleave", leave)
    return () => {
      window.removeEventListener("pointermove", move)
      document.removeEventListener("pointerover", over)
      document.removeEventListener("mouseleave", leave)
      if (raf) cancelAnimationFrame(raf)
      root.classList.remove("has-cursor", "cursor-hover")
    }
  }, [])
  return (
    <>
      <div ref={dot} className="cursor cursor--dot" aria-hidden="true" />
      <div ref={ring} className="cursor cursor--ring" aria-hidden="true" />
    </>
  )
}
