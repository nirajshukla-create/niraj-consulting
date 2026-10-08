"use client"

import { useEffect, useRef, type CSSProperties, type ReactNode, type PointerEvent as ReactPointerEvent } from "react"

type Effect = "up" | "fade" | "scale" | "deal" | "left" | "clip"

type RevealProps = {
  children: ReactNode
  className?: string
  effect?: Effect
  /** ms, for staggering siblings */
  delay?: number
  /** degrees, for the "deal" effect */
  rotate?: number
  style?: CSSProperties
}

const reduced = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches

/**
 * Scroll-triggered entrance. Hidden only when `html.js` is present, so with JavaScript off
 * everything is visible. Fires a little before the element enters so a fast scroll never
 * catches a blank card.
 */
export function Reveal({ children, className = "", effect = "up", delay = 0, rotate, style }: RevealProps) {
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
  const vars = { "--d": `${delay}ms`, ...(rotate !== undefined ? { "--r": `${rotate}deg` } : {}), ...style } as CSSProperties
  return (
    <div ref={ref} className={`reveal ${className}`} data-effect={effect} style={vars}>
      {children}
    </div>
  )
}

/** Tilts toward the pointer on devices that have one. Touch devices get the plain block. */
export function Tilt({ children, className = "", max = 7, lift = 8 }: { children: ReactNode; className?: string; max?: number; lift?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const onMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el || e.pointerType !== "mouse" || reduced()) return
    const b = el.getBoundingClientRect()
    const px = (e.clientX - b.left) / b.width - 0.5
    const py = (e.clientY - b.top) / b.height - 0.5
    el.style.transform = `perspective(900px) rotateX(${(-py * max).toFixed(2)}deg) rotateY(${(px * max).toFixed(2)}deg) translateY(-${lift}px)`
  }
  const reset = () => {
    if (ref.current) ref.current.style.transform = ""
  }
  return (
    <div ref={ref} className={`tilt ${className}`} onPointerMove={onMove} onPointerLeave={reset} onPointerCancel={reset}>
      {children}
    </div>
  )
}

/**
 * The child slides toward the pointer while it is near, and springs back when it leaves.
 * The wrapper has a padded hit area so the pull starts before the pointer reaches the button.
 */
export function Magnetic({ children, className = "", strength = 0.35 }: { children: ReactNode; className?: string; strength?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const onMove = (e: ReactPointerEvent<HTMLSpanElement>) => {
    const el = ref.current
    const child = el?.firstElementChild as HTMLElement | null
    if (!el || !child || e.pointerType !== "mouse" || reduced()) return
    const b = el.getBoundingClientRect()
    const dx = (e.clientX - (b.left + b.width / 2)) * strength
    const dy = (e.clientY - (b.top + b.height / 2)) * strength
    child.style.transform = `translate(${dx.toFixed(1)}px, ${dy.toFixed(1)}px)`
  }
  const reset = () => {
    const child = ref.current?.firstElementChild as HTMLElement | null
    if (child) child.style.transform = ""
  }
  return (
    <span ref={ref} className={`magnet ${className}`} onPointerMove={onMove} onPointerLeave={reset} onPointerCancel={reset}>
      {children}
    </span>
  )
}

/** A soft light that follows the pointer across its parent. Transform only, on a frame. */
export function Spotlight({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    const host = el?.parentElement
    if (!el || !host || reduced()) return
    let raf = 0
    let x = 0
    let y = 0
    const paint = () => {
      raf = 0
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`
    }
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return
      const b = host.getBoundingClientRect()
      x = e.clientX - b.left
      y = e.clientY - b.top
      if (!raf) raf = requestAnimationFrame(paint)
    }
    host.addEventListener("pointermove", onMove, { passive: true })
    return () => {
      host.removeEventListener("pointermove", onMove)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])
  return <div ref={ref} className={className} aria-hidden="true" />
}

/**
 * Moves its children a fraction of the scroll distance while the top of the page is in
 * view. Transform only, on a frame, skipped for reduced motion.
 */
export function ParallaxLayer({ speed = 0.2, className = "", children, style }: { speed?: number; className?: string; children?: ReactNode; style?: CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el || reduced()) return
    let raf = 0
    const update = () => {
      raf = 0
      const y = window.scrollY
      if (y > window.innerHeight * 1.2) return
      el.style.transform = `translate3d(0, ${(y * speed).toFixed(1)}px, 0)`
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [speed])
  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  )
}

/** Splits text into words and letters so each letter can move on its own. The full text stays in the accessible name. */
export function Letters({ text, className = "", accentWords = [] }: { text: string; className?: string; accentWords?: string[] }) {
  const words = text.split(" ")
  return (
    <span className={className} aria-label={text} role="text">
      {words.map((word, w) => (
        <span key={w} aria-hidden="true">
          <span className={`word ${accentWords.includes(word.replace(/[.,!?]/g, "")) ? "word--accent" : ""}`}>
            {word.split("").map((ch, c) => (
              <span key={c} className="ch" style={{ "--i": c } as CSSProperties}>
                {ch}
              </span>
            ))}
          </span>
          {w < words.length - 1 ? " " : ""}
        </span>
      ))}
    </span>
  )
}
