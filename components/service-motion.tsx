"use client"

import { useEffect, useRef, type ReactNode } from "react"
import type { CoverKind } from "@/lib/site"
import { clamp01, onScroll, prefersReduced } from "./motion"

function ease(start: number, end: number, progress: number) {
  const t = clamp01((progress - start) / (end - start))
  return t * t * (3 - 2 * t)
}

type Pose = [x: number, y: number, rotation: number, scale: number]
type Piece = "main" | "back" | "float" | "left" | "right" | "lower" | "core"
type Sequence = Partial<Record<Piece, [Pose, Pose, Pose]>>
const rest: Pose = [0, 0, 0, 1]
const sequences: Record<CoverKind, Sequence> = {
  web: {
    main: [[50, 10, 5, .86], [-38, 12, -3, .84], rest],
    back: [[-190, 3, -9, .48], [18, -38, 15, .86], rest],
    float: [[-250, -146, -38, .6], [-42, -58, 20, 1.4], rest],
  },
  social: {
    back: [[137, 7, 9, .88], [-13, -8, -23, .9], rest],
    main: [[-121, 22, -7, .84], [17, 12, 19, .9], rest],
    float: [[-166, -126, -35, .7], [28, -130, 25, 1.15], rest],
  },
  strategy: {
    left: [[55, 164, -26, .86], [-16, 28, -12, 1], rest],
    core: [[55, -97, 35, .66], [-18, 17, -15, 1.1], rest],
    right: [[-165, -14, 33, .92], [-26, -24, 13, 1], rest],
    lower: [[-10, -140, -25, .78], [8, 6, -13, 1], rest],
  },
  brand: {
    main: [[91, -5, 27, .67], [-19, 17, -17, .93], rest],
    back: [[-130, 11, -26, .67], [21, -19, 20, .94], rest],
    float: [[-82, -100, 78, .83], [27, 2, -22, 1.18], rest],
  },
}
const phases: Record<CoverKind, [string, string, string]> = {
  web: ["Wireframe", "Design", "Launch"],
  social: ["One idea", "Many voices", "One campaign"],
  strategy: ["Possibility", "Connection", "Direction"],
  brand: ["Elements", "Expression", "Identity"],
}

/** The artwork moves independently of its caption and the service text. */
export function ServiceArtMotion({ children, kind, caption }: { children: ReactNode; kind: CoverKind; caption: string }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    const pointer = window.matchMedia("(hover: hover) and (pointer: fine)")
    let detachScroll: (() => void) | undefined
    let pointerFrame = 0
    let enabled = false
    let pointerX = 0
    let pointerY = 0
    let pointerRect: DOMRect | null = null
    let inView = false
    let progress = 1
    let activeState = ""
    let loopState = ""
    const pieces = Object.entries(sequences[kind]).map(([name, poses]) => ({
      element: element.querySelector<SVGGElement>(`.service-art__piece--${name}`),
      poses: poses as [Pose, Pose, Pose],
    }))

    const paintComposition = (next: number) => {
      const secondHalf = next >= .48
      const t = secondHalf ? ease(.48, .98, next) : ease(0, .48, next)
      for (const piece of pieces) {
        if (!piece.element) continue
        const start = piece.poses[secondHalf ? 1 : 0]
        const end = piece.poses[secondHalf ? 2 : 1]
        const pose = start.map((value, index) => value + (end[index] - value) * t)
        piece.element.style.setProperty("--piece-transform", `translate(${pose[0].toFixed(2)}px, ${pose[1].toFixed(2)}px) rotate(${pose[2].toFixed(2)}deg) scale(${pose[3].toFixed(4)})`)
      }
      element.style.setProperty("--art-skin", ease(.3, .86, next).toFixed(4))
      element.style.setProperty("--art-connection", ease(.37, .91, next).toFixed(4))
      element.style.setProperty("--art-progress", next.toFixed(4))
      element.dataset.phase = next < .32 ? "0" : next < .73 ? "1" : "2"
    }

    const updateActivity = () => {
      const active = enabled && inView && !document.hidden
      const activeValue = active ? "true" : "false"
      const loopValue = active && progress >= .86 ? "true" : "false"
      if (activeValue !== activeState) {
        element.dataset.active = activeValue
        activeState = activeValue
      }
      if (loopValue !== loopState) {
        element.dataset.loop = loopValue
        loopState = loopValue
      }
    }

    const writePointer = () => {
      pointerFrame = 0
      element.style.setProperty("--art-pointer-x", pointerX.toFixed(3))
      element.style.setProperty("--art-pointer-y", pointerY.toFixed(3))
    }

    const resetPointer = () => {
      pointerX = 0
      pointerY = 0
      pointerRect = null
      element.dataset.pointer = "false"
      cancelAnimationFrame(pointerFrame)
      writePointer()
    }

    const enter = () => {
      if (enabled && pointer.matches) pointerRect = element.getBoundingClientRect()
    }
    const leave = (event: PointerEvent) => {
      if (event.pointerType === "mouse") resetPointer()
    }

    const move = (event: PointerEvent) => {
      if (!enabled || !pointer.matches || event.pointerType === "touch") return
      const bounds = pointerRect ?? element.getBoundingClientRect()
      pointerX = Math.max(-1, Math.min(1, ((event.clientX - bounds.left) / bounds.width - .5) * 2))
      pointerY = Math.max(-1, Math.min(1, ((event.clientY - bounds.top) / bounds.height - .5) * 2))
      element.dataset.pointer = "true"
      if (!pointerFrame) pointerFrame = requestAnimationFrame(writePointer)
    }

    const syncPreference = () => {
      detachScroll?.()
      detachScroll = undefined
      enabled = !prefersReduced()
      element.dataset.motion = enabled ? "on" : "off"
      resetPointer()
      updateActivity()

      if (!enabled) {
        progress = 1
        paintComposition(1)
        element.dataset.settled = "true"
        return
      }

      let previous = -1
      detachScroll = onScroll({
        read: () => {
          const bounds = element.getBoundingClientRect()
          const viewport = window.innerHeight
          // All three compositions pass through the visible viewport, on phones too.
          // There is no pinning or extra height: ordinary scrolling drives the study.
          const start = viewport - Math.min(bounds.height, viewport * .58) - 24
          const finish = Math.min(viewport * .16, start - 160)
          progress = clamp01((start - bounds.top) / (start - finish))
          const visibleHeight = Math.max(0, Math.min(bounds.bottom, viewport) - Math.max(bounds.top, 0))
          inView = visibleHeight >= Math.min(bounds.height, viewport) * .1
          if (pointerRect) pointerRect = bounds
        },
        write: () => {
          const next = Math.round(progress * 1000) / 1000
          if (next !== previous) {
            paintComposition(next)
            element.dataset.settled = next >= .96 ? "true" : "false"
            previous = next
          }
          // Touch devices get the same tilt and separated layers from their scroll.
          if (!pointer.matches) {
            pointerX = Math.sin(next * Math.PI * 2) * .7
            pointerY = Math.sin(next * Math.PI) * .4
            element.dataset.pointer = next > 0 && next < 1 ? "true" : "false"
            writePointer()
          }
          updateActivity()
        },
      })
    }

    // CSS owns the ambient loops; no permanent JS animation frame is needed.
    const visibility = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting && entry.intersectionRatio >= .1
      updateActivity()
    }, { threshold: [0, .1] })
    visibility.observe(element)
    syncPreference()
    media.addEventListener("change", syncPreference)
    pointer.addEventListener("change", syncPreference)
    window.addEventListener("studio-motion-change", syncPreference)
    document.addEventListener("visibilitychange", updateActivity)
    element.addEventListener("pointerenter", enter)
    element.addEventListener("pointermove", move)
    element.addEventListener("pointerleave", leave)

    return () => {
      detachScroll?.()
      visibility.disconnect()
      cancelAnimationFrame(pointerFrame)
      media.removeEventListener("change", syncPreference)
      pointer.removeEventListener("change", syncPreference)
      window.removeEventListener("studio-motion-change", syncPreference)
      document.removeEventListener("visibilitychange", updateActivity)
      element.removeEventListener("pointerenter", enter)
      element.removeEventListener("pointermove", move)
      element.removeEventListener("pointerleave", leave)
    }
  }, [kind])

  return (
    <div ref={ref} className={`service-art service-art--${kind}`} data-phase="2">
      <div className="service-art__stage">{children}</div>
      <span className="service-art__caption" aria-hidden="true">{phases[kind].map((phase, index) => <span key={phase} className={`service-art__phase service-art__phase--${index}`}><i />{phase}</span>)}</span>
      <span className="sr-only">{caption}</span>
      <span className="service-art__open" aria-hidden="true">↗</span>
    </div>
  )
}
