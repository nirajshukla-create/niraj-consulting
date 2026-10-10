"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import { clamp01, onScroll, prefersReduced } from "./motion"

/** Replaying editorial entrances without hiding content before hydration. */
export function EditorialMotion() {
  const pathname = usePathname()

  useEffect(() => {
    const headings = Array.from(document.querySelectorAll<HTMLElement>(".editorial-heading"))
    const header = document.querySelector<HTMLElement>(".nav")
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)")
    let enabled = false
    let observer: IntersectionObserver | undefined
    let progress = 0
    let previous = -1

    const configure = () => {
      enabled = !prefersReduced()
      observer?.disconnect()
      headings.forEach(heading => {
        heading.dataset.editorialMotion = enabled ? "on" : "off"
        delete heading.dataset.entered
      })
      if (header) header.dataset.editorialMotion = enabled ? "on" : "off"
      if (!enabled) return

      observer = new IntersectionObserver(entries => {
        for (const entry of entries) {
          const heading = entry.target as HTMLElement
          heading.dataset.entered = String(entry.isIntersecting)
        }
      }, { threshold: .15, rootMargin: "0px 0px -5% 0px" })
      headings.forEach(heading => observer?.observe(heading))
    }
    configure()
    const off = onScroll({
      read: () => {
        if (!enabled) return
        const span = document.documentElement.scrollHeight - window.innerHeight
        progress = span > 0 ? clamp01(window.scrollY / span) : 0
      },
      write: () => {
        if (!enabled || !header) return
        const rounded = Math.round(progress * 1000) / 1000
        if (rounded === previous) return
        header.style.setProperty("--page-progress", String(rounded))
        previous = rounded
      },
    })
    preference.addEventListener("change", configure)
    window.addEventListener("studio-motion-change", configure)
    return () => {
      off()
      observer?.disconnect()
      preference.removeEventListener("change", configure)
      window.removeEventListener("studio-motion-change", configure)
      headings.forEach(heading => {
        delete heading.dataset.editorialMotion
        delete heading.dataset.entered
      })
      if (header) {
        delete header.dataset.editorialMotion
        header.style.removeProperty("--page-progress")
      }
    }
  }, [pathname])

  return null
}
