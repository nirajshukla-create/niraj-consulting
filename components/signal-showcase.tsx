"use client"

import { useEffect, useRef, useState } from "react"
import { clamp01, onScroll, prefersReduced } from "./motion"
import "./signal-showcase.css"
import "./design-lab-scroll.css"

const stages = [
  { name: "Original", title: "Everything is saying the same thing.", detail: "Equal weight. Safe colour. A message that could belong to anyone. Here’s our starting point.", type: "Default", layout: "Equal weight", colour: "Neutral", first: "Objects for", second: "everyday.", copy: "A collection of useful things for your home, your desk, and everything in between." },
  { name: "Clarify", title: "One thought. A clear place to start.", detail: "Strip away competing messages. Lead with what the objects are for, then give the visitor one next step.", type: "Direct", layout: "One priority", colour: "Focused", first: "Objects with", second: "purpose.", copy: "Considered objects. Made for the way you live." },
  { name: "Refine", title: "Give the idea a little breathing room.", detail: "A deliberate type pairing, a stronger grid, and room around the details turn a collection into a point of view.", type: "Editorial", layout: "Asymmetric", colour: "Warm", first: "Everyday,", second: "considered.", copy: "Fewer things. Better chosen." },
  { name: "Transform", title: "Give the idea a distinctive point of view.", detail: "Confident scale, an unexpected crop and the contrast of ink and paper give the same objects a different character.", type: "Expressive", layout: "Edge to edge", colour: "Ink & paper", first: "Everyday.", second: "Extraordinary.", copy: "Objects with a different point of view." },
] as const

function ObjectSculpture() {
  return <svg className="design-object" viewBox="0 0 480 500" fill="none" aria-hidden="true">
    <defs>
      <linearGradient id="object-face" x1="100" y1="80" x2="400" y2="430" gradientUnits="userSpaceOnUse"><stop stopColor="var(--object-light)" /><stop offset="1" stopColor="var(--object-shade)" /></linearGradient>
      <linearGradient id="object-edge" x1="110" y1="180" x2="370" y2="390" gradientUnits="userSpaceOnUse"><stop stopColor="var(--object-edge)" /><stop offset="1" stopColor="var(--object-shade)" /></linearGradient>
    </defs>
    <g className="design-object__construction" stroke="currentColor" strokeWidth=".8" opacity=".18">
      <path d="M42 119V52H109M371 52H438V119M42 381V448H109M371 448H438V381" />
      <path className="design-object__axis" pathLength="1" d="M42 250H438M240 52V448" strokeDasharray=".012 .024" />
    </g>
    <ellipse className="design-object__shadow" cx="240" cy="443" rx="158" ry="22" fill="#000" opacity=".13" />
    <g className="design-object__part design-object__part--lower">
      <path d="M64 304 317 258 428 318 175 370Z" fill="url(#object-face)" /><path d="M64 304 175 370V428L64 362Z" fill="var(--object-edge)" /><path d="M175 370 428 318V375L175 428Z" fill="url(#object-edge)" /><path d="M66 305 175 370 425 319" stroke="var(--object-light)" strokeOpacity=".55" />
    </g>
    <g className="design-object__part design-object__part--middle">
      <path d="M80 207 290 169 386 220 174 264Z" fill="url(#object-face)" /><path d="M80 207 174 264V324L80 269Z" fill="var(--object-edge)" /><path d="M174 264 386 220V280L174 324Z" fill="url(#object-edge)" /><path d="M81 208 174 264 384 221" stroke="var(--object-light)" strokeOpacity=".65" />
    </g>
    <g className="design-object__part design-object__part--upper">
      <path d="M88 111 287 77 373 123 173 165Z" fill="url(#object-face)" /><path d="M88 111 173 165V225L88 175Z" fill="var(--object-edge)" /><path d="M173 165 373 123V183L173 225Z" fill="url(#object-edge)" /><path d="M89 112 173 165 371 124" stroke="var(--object-light)" strokeOpacity=".65" />
    </g>
  </svg>
}

/** Native page scrolling advances one fictional brand through three design decisions. */
export function SignalShowcase() {
  const [stage, setStage] = useState(1)
  const [scrollEnabled, setScrollEnabled] = useState(false)
  const [sceneVersion, setSceneVersion] = useState(0)
  const section = useRef<HTMLElement>(null)
  const scene = useRef<HTMLDivElement>(null)
  const pin = useRef<HTMLDivElement>(null)
  const viewportProbe = useRef<HTMLDivElement>(null)
  const workspace = useRef<HTMLDivElement>(null)
  const buttons = useRef<(HTMLButtonElement | null)[]>([])
  const stageRef = useRef(1)
  const comparison = useRef<{ y: number } | null>(null)
  const metrics = useRef({ enabled: false, top: 90, travel: 1200 })
  const selected = stages[stage]

  useEffect(() => {
    const root = section.current
    const track = scene.current
    const panel = pin.current
    const canvas = workspace.current?.querySelector<HTMLElement>(".design-canvas")
    if (!root || !track || !panel || !canvas) return
    let progress = 0
    let previous = -1
    let frame = 0
    const measure = () => {
      const enabled = !prefersReduced()
      const viewport = viewportProbe.current?.offsetHeight || window.innerHeight
      const width = window.innerWidth
      const header = document.querySelector<HTMLElement>(".nav")?.offsetHeight || 80
      root.dataset.scroll = enabled ? "on" : "off"
      setScrollEnabled(enabled)
      if (enabled) {
        const overhead = panel.offsetHeight - canvas.offsetHeight
        const minimum = width >= 560 && viewport <= 520 ? 140 : width <= 680 ? 230 : 280
        const preferred = width <= 680 ? 360 : Math.min(510, Math.max(360, width * .44))
        const height = Math.round(Math.max(minimum, Math.min(preferred, viewport - header - 28 - overhead)))
        root.style.setProperty("--lab-canvas-height", `${height}px`)
      } else {
        root.style.removeProperty("--lab-canvas-height")
      }
      const height = panel.offsetHeight
      const top = Math.min(header + 12, viewport - height - 12)
      const travel = Math.round(Math.max(850, viewport * 1.5))
      metrics.current = { enabled, top, travel }
      track.style.setProperty("--lab-pin-height", `${height}px`)
      track.style.setProperty("--lab-pin-top", `${top}px`)
      track.style.setProperty("--lab-travel", `${travel}px`)
      previous = -1
    }
    const read = () => {
      if (!metrics.current.enabled) return
      progress = clamp01((metrics.current.top - track.getBoundingClientRect().top) / metrics.current.travel)
      // Comparing the original is temporary; ordinary scrolling resumes the sequence.
      if (comparison.current && Math.abs(window.scrollY - comparison.current.y) > 8) comparison.current = null
    }
    const write = () => {
      if (!metrics.current.enabled) return
      const p = Math.round(progress * 1000) / 1000
      if (p !== previous) { track.style.setProperty("--lab-progress", String(p)); previous = p }
      if (comparison.current) return
      const current = stageRef.current
      let next = p < 1 / 3 ? 1 : p < 2 / 3 ? 2 : 3
      // A little hysteresis prevents trackpad jitter from restarting the artwork.
      if (current === 1 && p < .345) next = 1
      if (current === 2 && p > .321 && p < .679) next = 2
      if (current === 3 && p > .655) next = 3
      if (next !== current) { stageRef.current = next; setStage(next) }
    }
    const refresh = () => {
      measure()
      if (frame) cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => { frame = 0; read(); write() })
    }
    const off = onScroll({ resize: measure, read, write })
    const resize = new ResizeObserver(refresh)
    resize.observe(panel)
    if (viewportProbe.current) resize.observe(viewportProbe.current)
    const header = document.querySelector<HTMLElement>(".nav")
    if (header) resize.observe(header)
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)")
    preference.addEventListener("change", refresh)
    window.addEventListener("studio-motion-change", refresh)
    const mode = new MutationObserver(refresh)
    mode.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })
    return () => {
      off(); resize.disconnect(); mode.disconnect()
      preference.removeEventListener("change", refresh)
      window.removeEventListener("studio-motion-change", refresh)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  const choose = (value: number) => {
    comparison.current = null
    stageRef.current = value
    setStage(value)
    setSceneVersion(version => version + 1)
    if (metrics.current.enabled && scene.current) {
      const origin = window.scrollY + scene.current.getBoundingClientRect().top - metrics.current.top
      window.scrollTo({ top: origin + metrics.current.travel * [0, .12, .5, .87][value], behavior: "instant" })
    }
  }
  const showOriginal = () => {
    if (metrics.current.enabled && scene.current) {
      const origin = window.scrollY + scene.current.getBoundingClientRect().top - metrics.current.top
      const target = origin + metrics.current.travel * .12
      comparison.current = { y: target }
      window.scrollTo({ top: target, behavior: "instant" })
    } else workspace.current?.scrollIntoView({ block: "start", behavior: "instant" })
    stageRef.current = 0
    setStage(0)
    setSceneVersion(version => version + 1)
  }

  return <section className="signal-showcase design-lab design-lab--editorial" id="design-lab" aria-labelledby="signal-showcase-title" data-stage={stage} ref={section}>
    <div ref={viewportProbe} className="design-lab__viewport" aria-hidden="true" />
    <div className="editorial-shell">
      <header className="editorial-heading"><p className="editorial-heading__label">03 — Design study</p><div className="editorial-heading__content"><h2 className="editorial-heading__title" id="signal-showcase-title">Design is a series of decisions.</h2><p className="editorial-heading__note">{scrollEnabled ? "Scroll through three decisions. Watch typography, composition and colour transform the same idea." : "One idea, three directions. Explore how typography, composition and colour change the result."}</p></div></header>
      <div className="design-lab__scroll-scene" ref={scene}>
      <div className="design-lab__pin" ref={pin}>
      <div className="design-lab__workspace" ref={workspace}>
      <div className="design-lab__controls" role="group" aria-label="Design stages">
        {stages.slice(1).map((item, index) => <button key={item.name} ref={el => { buttons.current[index] = el }} type="button" aria-pressed={stage === index + 1} aria-controls="design-study" onClick={() => choose(index + 1)} onKeyDown={event => {
          const next = event.key === "ArrowRight" ? (index + 1) % 3 : event.key === "ArrowLeft" ? (index + 2) % 3 : event.key === "Home" ? 0 : event.key === "End" ? 2 : -1
          if (next < 0) return
          event.preventDefault(); choose(next + 1); buttons.current[next]?.focus()
        }}><span className="design-lab__step">0{index + 1}</span><span>{item.name}</span><span className="design-lab__button-arrow" aria-hidden="true">↗</span></button>)}
      </div>
      <div className="design-study" id="design-study" role="region" aria-label={`${selected.name} design preview`}>
        <div className="design-study__bar"><span><i /><i /><i /></span><span>OBJECT / an imaginary objects studio</span><span>Concept study</span></div>
        <div className="design-canvas" data-stage={stage}>
          <div className="design-canvas__brand"><span className="design-canvas__brand-symbol" aria-hidden="true"><i /><i /></span>OBJECT<span className="design-canvas__brand-dot">01</span></div>
          <span className="design-canvas__nav" aria-hidden="true">Objects <span>Our story</span> <b>↗</b></span><div className="design-canvas__rule" />
          <div className="design-canvas__text"><p className="design-canvas__eyebrow">Objects / spaces / everyday rituals</p><h3><span>{selected.first}</span><span>{selected.second}</span></h3><p className="design-canvas__copy">{selected.copy}</p><span className="design-canvas__cta" aria-hidden="true">Explore the collection <b>↗</b></span></div>
          <div className="design-canvas__art">
            <span className="design-canvas__disc" aria-hidden="true"><i /><i /><i /></span>
            <div className="design-canvas__sculpture" key={`${stage}-${sceneVersion}`}><ObjectSculpture /></div>
          </div>
          <span className="design-canvas__object-note" aria-hidden="true">FIG. 01<br />A new perspective</span>
          <div className="design-canvas__clutter" aria-hidden="true"><span>New arrivals</span><span>Our favourites</span><span>Discover more</span></div>
          <div className="design-canvas__foot" aria-hidden="true"><span>Useful can be beautiful.</span><span>Objects for living, differently. ↗</span></div><span className="design-canvas__edition" aria-hidden="true">01—03</span>
        </div>
        <div className="design-study__specs" aria-label="Current design choices"><span><small>TYPE</small>{selected.type}</span><span><small>LAYOUT</small>{selected.layout}</span><span><small>COLOUR</small>{selected.colour}</span></div>
      </div>
      </div>
      <div className="design-lab__scroll-cue" aria-hidden="true"><span>{stage === 0 ? "Scroll to continue" : "Scroll to transform"}</span><span className="design-lab__scroll-ticks"><i /><i /><i /></span><span>↓</span></div>
      </div>
      </div>
      <div className="design-lab__bottom"><div className="design-lab__decision" aria-live={scrollEnabled ? "off" : "polite"} aria-atomic="true"><span className="design-lab__decision-number" aria-hidden="true">0{stage}</span><div><h3>{selected.title}</h3><p>{selected.detail}</p></div></div><div className="design-lab__actions"><button type="button" onClick={showOriginal} aria-pressed={stage === 0}>View original <span aria-hidden="true">↶</span></button><button type="button" onClick={() => { choose(1); if (!metrics.current.enabled) workspace.current?.scrollIntoView({ block: "start", behavior: "instant" }) }}>Back to Clarify<span aria-hidden="true">↑</span></button></div></div>
      <p className="design-lab__disclaimer">An original concept made to show our thinking. Imaginary brand, real design decisions.</p>
    </div>
  </section>
}
