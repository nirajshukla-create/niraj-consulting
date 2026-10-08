import Link from "next/link"
import { nav, site } from "@/lib/site"

const ROMAN: [number, string][] = [
  [1000, "M"], [900, "CM"], [500, "D"], [400, "CD"], [100, "C"], [90, "XC"],
  [50, "L"], [40, "XL"], [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"],
]
function roman(n: number) {
  let out = ""
  for (const [v, s] of ROMAN) while (n >= v) { out += s; n -= v }
  return out
}

export function SiteFooter() {
  const year = roman(new Date().getFullYear())
  const socials = [
    { label: "LinkedIn", href: site.social.linkedin },
    { label: "Instagram", href: site.social.instagram },
  ].filter((s) => s.href)
  return (
    <footer className="footer">
      <p className="footer__mark" aria-label={site.name}>
        {site.wordmark.lead} <em>{site.wordmark.italic}</em>
        <i>.</i>
      </p>
      <div className="footer__cols">
        <div className="footer__col">
          <span className="footer__h">Explore</span>
          {nav.map((n) => (
            <Link key={n.href} href={n.href}>
              {n.label}
            </Link>
          ))}
        </div>
        <div className="footer__col">
          <span className="footer__h">Contact</span>
          <a className="footer__email" href={`mailto:${site.email}`}>
            {site.email}
          </a>
          <a href={`tel:${site.phone.tel}`}>{site.phone.display}</a>
          <span className="dim">{site.location.long}</span>
        </div>
        {socials.length > 0 && (
          <div className="footer__col">
            <span className="footer__h">Elsewhere</span>
            {socials.map((s) => (
              <a key={s.label} href={s.href} rel="noopener">
                {s.label}
              </a>
            ))}
          </div>
        )}
      </div>
      <div className="footer__bottom">
        <span className="footer__small">
          © {year} {site.name}
        </span>
        <Link href="/privacy" className="footer__small">
          Privacy
        </Link>
      </div>
    </footer>
  )
}
