"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { nav, site } from "@/lib/site"

/**
 * "overlay" floats over the hero on the home page; "dark" is the solid top bar every
 * inner page uses, the way the reference's About page does it.
 */
export function SiteHeader({ variant = "overlay" }: { variant?: "overlay" | "dark" }) {
  const path = usePathname()
  return (
    <header className={`nav nav--${variant}`}>
      <Link href="/" className="nav__brand" aria-label={`${site.name}, home`}>
        {site.wordmark.lead} <em>{site.wordmark.italic}</em>
        <i>.</i>
      </Link>
      <nav aria-label="Primary" className="nav__links">
        {nav.map((n) => {
          const active = !n.href.includes("#") && path === n.href
          return (
            <Link key={n.href} href={n.href} aria-current={active ? "page" : undefined}>
              {n.label}
            </Link>
          )
        })}
      </nav>
    </header>
  )
}
