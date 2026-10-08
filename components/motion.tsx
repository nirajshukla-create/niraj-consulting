"use client"

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react"

type RevealProps = {
  children: ReactNode
  className?: string
  /** "up" rises 26px while fading; "fade" only fades. */
  effect?: "up" | "fade"
  /** ms, for staggering siblings */
  delay?: number
  style?: CSSProperties
}

/**
 * Scroll-triggered entrance. The element is hidden only when `html.js` is present, so with
 * JavaScript off everything is visible. The observer fires a little before the element
 * enters, so a fast scroll never catches a blank card.
 */
export function Reveal({ children, className = "", effect = "up", delay = 0, style }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            el.classList.add("in")
            io.disconnect()
          }
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -6% 0px" },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  const vars = { "--d": `${delay}ms`, ...style } as CSSProperties
  return (
    <div ref={ref} className={`reveal ${className}`} data-effect={effect} style={vars}>
      {children}
    </div>
  )
}
