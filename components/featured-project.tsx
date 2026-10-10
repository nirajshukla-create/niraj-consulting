"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef } from "react"
import { clamp01, onScroll, prefersReduced } from "./motion"
import { ProjectComparison } from "./project-comparison"
import "./featured-project.css"

/** Presentation artwork for a fictional hospitality brand, not a booking interface. */
function LowTideSite({ original = false, phone = false }: { original?: boolean; phone?: boolean }) {
  return (
    <div className={`low-tide-site ${original ? "low-tide-site--original" : ""} ${phone ? "low-tide-site--phone" : ""}`} aria-hidden="true">
      <div className="low-tide-site__nav">
        <span className="low-tide-site__wordmark">LOW TIDE<span>COASTAL STAYS</span></span>
        <span className="low-tide-site__links">The house <span>The coast</span></span>
        <span className="low-tide-site__book">Find your stay ↗</span>
      </div>
      <div className="low-tide-site__hero">
        <Image src="/concepts/low-tide-house.png" alt="" fill sizes={phone ? "260px" : "(max-width: 700px) 100vw, 1200px"} className="low-tide-site__photo" />
        <div className="low-tide-site__shade" />
        <div className="low-tide-site__message">
          <span className="low-tide-site__eyebrow">A LITTLE CLOSER TO NOWHERE</span>
          <span className="low-tide-site__headline">{original ? <>Welcome to<br />Low Tide.</> : <>Stay close<br />to <em>the wild.</em></>}</span>
          <span className="low-tide-site__description">{original ? "A coastal house for your next holiday. Explore our accommodation and find out more." : "An open door. An endless horizon. Nothing in a hurry."}</span>
          <span className="low-tide-site__cta">{original ? "Learn more" : "Come, stay a while"} <span>↗</span></span>
        </div>
        <span className="low-tide-site__coordinates">AT THE EDGE OF THE EVERYDAY</span>
      </div>
      <div className="low-tide-site__foot"><span>A slower rhythm.</span><span>Room to breathe. Space to be.</span><span>01 / THE HOUSE</span></div>
    </div>
  )
}

export function FeaturedProject() {
  const rootRef = useRef<HTMLElement>(null)
  const sceneRef = useRef<HTMLDivElement>(null)
  const probeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current
    const scene = sceneRef.current
    if (!root || !scene) return
    let enabled = false
    let top = 96
    let travel = 1000
    let progress = 0
    let previous = -1
    let frame = 0
    const measure = () => {
      enabled = !prefersReduced()
      const viewport = probeRef.current?.offsetHeight || window.innerHeight
      top = (document.querySelector<HTMLElement>(".nav")?.offsetHeight || 80) + 10
      const height = Math.max(220, Math.min(760, viewport - top - 18))
      travel = Math.max(650, viewport * 1.2)
      root.dataset.motion = enabled ? "on" : "off"
      scene.style.setProperty("--project-top", `${top}px`)
      scene.style.setProperty("--project-height", `${height}px`)
      scene.style.setProperty("--project-travel", `${travel}px`)
      previous = -1
    }
    const read = () => { progress = enabled ? clamp01((top - scene.getBoundingClientRect().top) / travel) : 1 }
    const write = () => {
      const value = Math.round(progress * 1000) / 1000
      if (value === previous) return
      previous = value
      const expand = clamp01(value / .43)
      const phone = clamp01((value - .52) / .28)
      scene.style.setProperty("--project-expand", expand.toFixed(3))
      scene.style.setProperty("--project-phone", phone.toFixed(3))
      scene.style.setProperty("--project-progress", value.toFixed(3))
      scene.dataset.chapter = value < .4 ? "1" : value < .7 ? "2" : "3"
    }
    const refresh = () => {
      measure()
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => { read(); write() })
    }
    const off = onScroll({ resize: measure, read, write })
    const observer = new ResizeObserver(refresh)
    if (probeRef.current) observer.observe(probeRef.current)
    const nav = document.querySelector(".nav")
    if (nav) observer.observe(nav)
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)")
    preference.addEventListener("change", refresh)
    window.addEventListener("studio-motion-change", refresh)
    const classes = new MutationObserver(refresh)
    classes.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })
    return () => {
      off()
      observer.disconnect()
      classes.disconnect()
      preference.removeEventListener("change", refresh)
      window.removeEventListener("studio-motion-change", refresh)
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <section className="featured-project" id="featured-work" ref={rootRef} aria-labelledby="featured-project-title">
      <div className="featured-project__viewport" ref={probeRef} aria-hidden="true" />
      <div className="featured-project__intro editorial-shell">
        <p className="featured-project__eyebrow">INDEPENDENT CONCEPT / 001</p>
        <div className="featured-project__heading">
          <h2 id="featured-project-title">A quieter kind<br />of <em>escape.</em></h2>
          <div className="featured-project__brief"><span>LOW TIDE — COASTAL STAYS</span><p>A place you feel before you arrive. An identity and digital experience for an imagined coastal retreat.</p><a href="#project-comparison">See the difference <span aria-hidden="true">↓</span></a></div>
        </div>
      </div>
      <div className="featured-project__scene" ref={sceneRef} data-chapter="1">
        <div className="featured-project__pin">
          <div className="featured-project__rail"><span>LOW TIDE / BRAND & DIGITAL</span><span>CONCEPT STUDY</span></div>
          <div className="featured-project__stage" role="img" aria-label="Low Tide concept website: an editorial coastal retreat design expands as you scroll, then reveals its mobile version.">
            <div className="featured-project__desktop">
              <div className="featured-project__browser"><span>● ● ●</span><span>LOW TIDE / A DIGITAL EXPERIENCE</span><span>↗</span></div>
              <LowTideSite />
            </div>
            <div className="featured-project__phone"><div className="featured-project__speaker" /><LowTideSite phone /></div>
          </div>
          <div className="featured-project__chapters" aria-hidden="true"><span>01 <b>A first impression</b></span><span>02 <b>Step inside</b></span><span>03 <b>Every screen</b></span><i /></div>
        </div>
      </div>
      <div className="featured-project__details editorial-shell">
        <div className="featured-project__decisions"><p><span>01 / IDENTITY</span>A little less noise.<br />A lot more character.</p><p><span>02 / EXPERIENCE</span>Lead with the feeling.<br />Make the next step clear.</p><p><span>03 / EVERY SCREEN</span>Same point of view.<br />A different composition.</p></div>
        <div className="featured-project__comparison-heading" id="project-comparison"><h3>Same place.<br /><em>Different impression.</em></h3><p>Move the divider to see how hierarchy, photography and a clearer invitation change the experience.</p></div>
        <ProjectComparison before={<LowTideSite original />} after={<LowTideSite />} />
        <div className="featured-project__end"><p>An independent design exploration. Fictional brand and AI-generated concept imagery.</p><Link href="/contact?about=web">Give your business a new perspective <span aria-hidden="true">↗</span></Link></div>
      </div>
    </section>
  )
}
