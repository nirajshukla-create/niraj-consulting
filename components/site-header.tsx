"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { nav, site } from "@/lib/site"
import { Wordmark } from "./brand-mark"

/** A fixed studio wordmark with an expandable navigation panel on small screens. */
export function SiteHeader() {
  const path = usePathname()
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    let raf = 0
    const update = () => {
      raf = 0
      setSolid(window.scrollY > 40)
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
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [path])

  useEffect(() => {
    if (!open) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return
      setOpen(false)
      menuButtonRef.current?.focus()
    }
    const onPointerDown = (event: PointerEvent) => {
      if (event.target instanceof Node && !headerRef.current?.contains(event.target)) {
        setOpen(false)
      }
    }

    document.addEventListener("keydown", onKeyDown)
    document.addEventListener("pointerdown", onPointerDown)
    return () => {
      document.removeEventListener("keydown", onKeyDown)
      document.removeEventListener("pointerdown", onPointerDown)
    }
  }, [open])

  const links = nav.map((n) => {
    const active = !n.href.includes("#") && path === n.href
    return (
      <Link key={n.href} href={n.href} aria-current={active ? "page" : undefined} onClick={() => setOpen(false)}>
        {n.label}
      </Link>
    )
  })

  return (
    <header ref={headerRef} className={`nav ${path === "/" ? "nav--home" : ""} ${solid ? "nav--solid" : ""} ${open ? "nav--open nav--solid" : ""}`}>
      <Link href="/" className="nav__brand brand-lockup" aria-label={`${site.name}, home`} onClick={() => setOpen(false)}>
        <Wordmark decorative />
      </Link>
      <nav aria-label="Primary" className="nav__links">
        {links}
      </nav>
      <div className="nav__right">
        <Link href="/contact" className="nav__cta" onClick={() => setOpen(false)}>
          Let&apos;s talk <span className="arrow" aria-hidden="true">↗</span>
        </Link>
        <button ref={menuButtonRef} type="button" className="nav__menu" aria-expanded={open} aria-controls="nav-panel" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen((o) => !o)}>
          <span />
        </button>
      </div>
      <nav id="nav-panel" aria-label="Primary, mobile" className="nav__panel" inert={!open}>
        {links}
      </nav>
    </header>
  )
}
