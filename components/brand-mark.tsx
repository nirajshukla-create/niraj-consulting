import type { CSSProperties } from "react"
import { site } from "@/lib/site"
import "./brand-identity.css"

type BrandMarkProps = {
  className?: string
  decorative?: boolean
  label?: string
}

/** Two parallel bands, cut on the same diagonal and moved out of alignment. */
export function BrandMark({ className = "", decorative = true, label = `${site.name} mark` }: BrandMarkProps) {
  return (
    <svg
      className={`brand-mark ${className}`}
      width="80"
      height="68"
      viewBox="0 0 80 68"
      fill="currentColor"
      role={decorative ? undefined : "img"}
      aria-hidden={decorative || undefined}
      aria-label={decorative ? undefined : label}
      focusable="false"
    >
      <g className="brand-mark__anchor">
        <path d="M4 22H39L33 34H4Z" />
        <path d="M4 46H27L21 58H4Z" />
      </g>
      <g className="brand-mark__offset">
        <path d="M49 10H76V22H43Z" />
        <path d="M37 34H76V46H31Z" />
      </g>
    </svg>
  )
}

type WordmarkProps = {
  className?: string
  variant?: "compact" | "display"
  decorative?: boolean
}

/** The final word is italic. The small line beneath is optional and hidden when empty. */
export function Wordmark({ className = "", variant = "compact", decorative = false }: WordmarkProps) {
  const words = site.wordmark.primary.split(" ")
  const accent = words.pop()
  const width = [...site.wordmark.primary].reduce((total, letter) => total + (letter === " " ? .25 : .53), 0)
  return (
    <span
      className={`brand-wordmark brand-wordmark--${variant} ${className}`}
      style={{ "--wordmark-width": Math.max(width, 1) } as CSSProperties}
      aria-hidden={decorative || undefined}
    >
      <span className="brand-wordmark__text">{words.length > 0 && `${words.join(" ")} `}<span className="brand-wordmark__accent">{accent}</span></span>
      {site.wordmark.secondary && <span className="brand-wordmark__descriptor">{site.wordmark.secondary}</span>}
    </span>
  )
}
