"use client"

import { useEffect, useRef, type ReactNode } from "react"
import { clamp01, onScroll, prefersReduced } from "./motion"

export function ScrollScene({ children, className, labelledBy }: { children: ReactNode; className: string; labelledBy: string }) {
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    const element = ref.current
    if (!element) return
    const paragraph = element.querySelector<HTMLElement>(".intro__text")
    let progress = 1
    let textProgress = 1
    let lastProgress = -1
    let lastTextProgress = -1
    const update = () => { window.dispatchEvent(new Event("resize")) }
    const off = onScroll({
      read: () => {
        if (prefersReduced()) {
          progress = 1
          textProgress = 1
          return
        }
        const viewport = window.innerHeight
        progress = clamp01((viewport * .9 - element.getBoundingClientRect().top) / (viewport * .7))
        // The paragraph enters after the heading, particularly in the mobile layout.
        textProgress = paragraph
          ? clamp01((viewport * .9 - paragraph.getBoundingClientRect().top) / (viewport * .65))
          : 1
      },
      write: () => {
        if (progress === lastProgress && textProgress === lastTextProgress) return
        lastProgress = progress
        lastTextProgress = textProgress
        element.style.setProperty("--scene-p", progress.toFixed(4))
        element.style.setProperty("--text-p", textProgress.toFixed(4))
      },
    })
    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    window.addEventListener("studio-motion-change", update)
    media.addEventListener("change", update)
    return () => {
      off()
      window.removeEventListener("studio-motion-change", update)
      media.removeEventListener("change", update)
    }
  }, [])
  return <section ref={ref} className={className} aria-labelledby={labelledBy}>{children}</section>
}
