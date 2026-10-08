"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { nav, site } from "@/lib/site"

/**
 * Fixed. Transparent over the dark heroes, then a frosted cream bar once you scroll.
 * On phones the links fold into a panel behind the round menu button.
 */
export function SiteHeader() {
  const path = usePathname()
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)

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

  const links = nav.map((n) => {
    const active = !n.href.includes("#") && path === n.href
    return (
      <Link key={n.href} href={n.href} aria-current={active ? "page" : undefined} onClick={() => setOpen(false)}>
        {n.label}
      </Link>
    )
  })

  return (
    <header className={`nav ${solid ? "nav--solid" : ""} ${open ? "nav--open nav--solid" : ""}`}>
      <Link href="/" className="nav__brand" aria-label={`${site.name}, home`}>
        {site.name}
        <i aria-hidden="true">.</i>
      </Link>
      <nav aria-label="Primary" className="nav__links">
        {links}
      </nav>
      <div className="nav__right">
        <Link href="/contact" className="nav__cta">
          Let&apos;s talk
        </Link>
        <button type="button" className="nav__menu" aria-expanded={open} aria-controls="nav-panel" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen((o) => !o)}>
          <span />
        </button>
      </div>
      <nav id="nav-panel" aria-label="Primary, mobile" className="nav__panel">
        {links}
      </nav>
    </header>
  )
}
