"use client"

import { useEffect, useState } from "react"

/**
 * The visitor's own switch for motion. Animation is on for everyone by default; turning it
 * off here stores the choice in this browser, applies it instantly (every motion component
 * listens for "studio-motion-change") and survives reloads. The inline script in
 * app/layout.tsx applies the stored choice before first paint.
 */
export function MotionToggle() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    setReduced(document.documentElement.classList.contains("reduce-motion"))
  }, [])
  const apply = (next: boolean) => {
    const root = document.documentElement
    root.classList.toggle("reduce-motion", next)
    root.classList.toggle("force-motion", !next)
    try {
      if (next) localStorage.setItem("motion", "reduce")
      else localStorage.removeItem("motion")
    } catch {}
    setReduced(next)
    window.dispatchEvent(new Event("studio-motion-change"))
  }
  return (
    <button type="button" className="motion-toggle" aria-pressed={!reduced} onClick={() => apply(!reduced)}>
      <span className="motion-toggle__dot" aria-hidden="true" />
      Motion {reduced ? "off" : "on"}
    </button>
  )
}
