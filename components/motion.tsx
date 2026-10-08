"use client"

import { useEffect, useRef, type CSSProperties, type ReactNode, type PointerEvent as ReactPointerEvent } from "react"

type Effect = "up" | "fade" | "scale" | "deal" | "left" | "clip"

/**
 * True when the visitor asked for reduced motion, unless the owner override is on
 * (`?motion=1` sets html.force-motion; see app/layout.tsx).
 */
export const prefersReduced = () =>
  typeof window !== "undefined" &&
  !document.documentElement.classList.contains("force-motion") &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches

export const clamp01 = (v: number) => Math.min(1, Math.max(0, v))

/* ------------------------------------------------------------------ scroll registry
   One passive scroll listener and one animation frame for every scroll-linked effect, in
   two phases: every subscriber READS layout first, then every subscriber WRITES styles.
   Interleaving reads and writes forces the browser to re-layout for each subscriber;
   this way it lays out once per frame at most. */
type Sub = { read?: () => void; write: () => void; resize?: () => void }
const subs = new Set<Sub>()
let raf = 0
let bound = false
function flush() {
  raf = 0
  subs.forEach((s) => s.read?.())
  subs.forEach((s) => s.write())
}
function schedule() {
  if (!raf) raf = requestAnimationFrame(flush)
}
function onResize() {
  subs.forEach((s) => s.resize?.())
  schedule()
}
export function onScroll(sub: Sub | (() => void)) {
  const s: Sub = typeof sub === "function" ? { write: sub } : sub
  subs.add(s)
  if (!bound) {
    bound = true
    window.addEventListener("scroll", schedule, { passive: true })
    window.addEventListener("resize", onResize)
  }
  s.resize?.()
  schedule()
  return () => {
    subs.delete(s)
  }
}

/* ------------------------------------------------------------------ reveal */
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

/**
 * Entrance when the element scrolls (or slides) into view. Hidden only when `html.js` is
 * present, so with JavaScript off everything is visible.
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

/* ------------------------------------------------------------------ scrub
   Sets --p (0 → 1) on its element as it travels from `start` to `end` of the viewport
   height (fractions from the top). CSS turns --p into whatever transform it likes. */
export function Scrub({ children, className = "", style, start = 0.9, end = 0.3 }: { children: ReactNode; className?: string; style?: CSSProperties; start?: number; end?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el || prefersReduced()) return
    let p = 0
    let last = -1
    return onScroll({
      read: () => {
        const r = el.getBoundingClientRect()
        const vh = window.innerHeight
        p = clamp01((vh * start - r.top) / (vh * start - vh * end))
      },
      write: () => {
        const q = Math.round(p * 500) / 500
        if (q === last) return
        last = q
        el.style.setProperty("--p", q.toFixed(3))
      },
    })
  }, [start, end])
  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  )
}

/** A paragraph whose words light up one after another as you scroll it through the viewport. */
export function FillText({ text, className = "" }: { text: string; className?: string }) {
  const words = text.split(" ")
  return (
    <Scrub className={`fill ${className}`} start={0.88} end={0.32} style={{ "--n": words.length } as CSSProperties}>
      <p className="fill__text">
        {words.map((w, i) => (
          <span key={i} className="fill__w" style={{ "--i": i } as CSSProperties}>
            {w}{" "}
          </span>
        ))}
      </p>
    </Scrub>
  )
}

/* ------------------------------------------------------------------ horizontal scroll
   A tall section whose inner panel pins to the viewport while its track slides sideways
   in step with the scroll. Sizes are measured on resize, never per frame. Below 900px
   (and for reduced motion) the CSS turns the track into a plain vertical stack. */
export function HScroll({ children, className = "", id }: { children: ReactNode; className?: string; id?: string }) {
  const wrap = useRef<HTMLElement>(null)
  const pin = useRef<HTMLDivElement>(null)
  const track = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const w = wrap.current
    const pn = pin.current
    const t = track.current
    if (!w || !pn || !t) return
    const wide = window.matchMedia("(min-width: 900px)")
    let active = false
    let span = 1
    let shift = 0
    let top = 0
    let x = 0
    let last = -1
    const off = onScroll({
      resize: () => {
        active = wide.matches && !prefersReduced()
        if (!active) {
          t.style.transform = ""
          return
        }
        span = Math.max(1, w.offsetHeight - window.innerHeight)
        shift = Math.max(0, t.scrollWidth - pn.clientWidth)
      },
      read: () => {
        if (active) top = w.getBoundingClientRect().top
      },
      write: () => {
        if (!active) return
        x = Math.round(-clamp01(-top / span) * shift)
        if (x === last) return
        last = x
        t.style.transform = `translate3d(${x}px, 0, 0)`
      },
    })
    const ro = new ResizeObserver(() => onResize())
    ro.observe(t)
    return () => {
      off()
      ro.disconnect()
    }
  }, [])
  return (
    <section id={id} ref={wrap} className={`hscroll ${className}`}>
      <div ref={pin} className="hscroll__pin">
        <div ref={track} className="hscroll__track">
          {children}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ stacking cards
   Children are sticky cards; each one slides over the last. --p on a card is how far the
   next card has covered it, so the CSS can shrink and dim it as it goes under. */
export function Stack({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el || prefersReduced()) return
    const cards = Array.from(el.children) as HTMLElement[]
    const p = cards.map(() => 0)
    const last = cards.map(() => -1)
    return onScroll({
      read: () => {
        for (let i = 0; i < cards.length - 1; i++) {
          const a = cards[i].getBoundingClientRect()
          const b = cards[i + 1].getBoundingClientRect()
          p[i] = Math.round(clamp01(1 - (b.top - a.top) / Math.max(1, a.height)) * 200) / 200
        }
      },
      write: () => {
        for (let i = 0; i < cards.length - 1; i++) {
          if (p[i] === last[i]) continue
          last[i] = p[i]
          cards[i].style.setProperty("--p", p[i].toFixed(3))
        }
      },
    })
  }, [])
  return (
    <div ref={ref} className={`stack ${className}`}>
      {children}
    </div>
  )
}

/* ------------------------------------------------------------------ pointer effects */

/**
 * Tilts toward the pointer on devices that have one, and tells the children where the
 * pointer is (--mx/--my) so a card can light up under it. Touch devices get the plain block.
 */
export function Tilt({ children, className = "", max = 7, lift = 8 }: { children: ReactNode; className?: string; max?: number; lift?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const onMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el || e.pointerType !== "mouse" || prefersReduced()) return
    const b = el.getBoundingClientRect()
    const px = (e.clientX - b.left) / b.width - 0.5
    const py = (e.clientY - b.top) / b.height - 0.5
    el.style.transform = `perspective(900px) rotateX(${(-py * max).toFixed(2)}deg) rotateY(${(px * max).toFixed(2)}deg) translateY(-${lift}px)`
    el.style.setProperty("--mx", `${((px + 0.5) * 100).toFixed(1)}%`)
    el.style.setProperty("--my", `${((py + 0.5) * 100).toFixed(1)}%`)
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

/** The child slides toward the pointer while it is near, and springs back when it leaves. */
export function Magnetic({ children, className = "", strength = 0.35 }: { children: ReactNode; className?: string; strength?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const onMove = (e: ReactPointerEvent<HTMLSpanElement>) => {
    const el = ref.current
    const child = el?.firstElementChild as HTMLElement | null
    if (!el || !child || e.pointerType !== "mouse" || prefersReduced()) return
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
    if (!el || !host || prefersReduced()) return
    let raf = 0
    let x = 0
    let y = 0
    const paint = () => {
      raf = 0
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`
    }
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return
      x = e.clientX
      y = e.clientY - host.getBoundingClientRect().top
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

/** Moves its children a fraction of the scroll distance while the top of the page is in view. */
export function ParallaxLayer({ speed = 0.2, className = "", children, style }: { speed?: number; className?: string; children?: ReactNode; style?: CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el || prefersReduced()) return
    let last = -1
    return onScroll(() => {
      const y = window.scrollY
      if (y > window.innerHeight * 1.2) return
      const v = Math.round(y * speed)
      if (v === last) return
      last = v
      el.style.transform = `translate3d(0, ${v}px, 0)`
    })
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
