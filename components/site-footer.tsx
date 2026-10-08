import Link from "next/link"
import { nav, site } from "@/lib/site"
import { Letters } from "./motion"

export function SiteFooter() {
  const year = new Date().getFullYear()
  const socials = [
    { label: "LinkedIn", href: site.social.linkedin },
    { label: "Instagram", href: site.social.instagram },
  ].filter((s) => s.href)
  return (
    <footer className="footer">
      <p className="footer__mark display">
        <Letters text={site.name} />
        <i aria-hidden="true">.</i>
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
          © {year} {site.name} · {site.location.city}, {site.location.region}
        </span>
        <Link href="/privacy" className="footer__small">
          Privacy
        </Link>
      </div>
    </footer>
  )
}
