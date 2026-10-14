import Link from "next/link"
import { footerNav, mailingAddress, site } from "@/lib/site"
import { Wordmark } from "./brand-mark"
import { MotionToggle } from "./motion-toggle"
import "./market-sections.css"

export function SiteFooter() {
  const year = new Date().getFullYear()
  const socials = [{ label: "LinkedIn", href: site.social.linkedin }, { label: "Instagram", href: site.social.instagram }].filter((s) => s.href)
  return (
    <footer className="footer">
      <div className="editorial-shell">
      <div className="footer__top">
        <div className="footer__intro"><Link href="/" className="footer__logo brand-lockup" aria-label={`${site.name}, home`}><Wordmark decorative /></Link><p>An independent perspective.<br />Rooted in the east.</p></div>
        <nav className="footer__col" aria-label="Footer"><span className="footer__h">Find your way</span>{footerNav.map((n) => <Link key={n.href} href={n.href}>{n.label}</Link>)}</nav>
        <div className="footer__col"><span className="footer__h">Say hello</span><a href={`mailto:${site.email}`}>{site.email}</a><a href={`tel:${site.phone.tel}`}>{site.phone.display}</a><span className="footer__location">{site.location.long}</span>{socials.map((s) => <a key={s.label} href={s.href}>{s.label} ↗</a>)}</div>
      </div>
      {/* The business identity as it appears on quotes and invoices. */}
      <p className="footer__legal">
        {site.name} · {mailingAddress} · <a href={`tel:${site.phone.tel}`}>{site.phone.display}</a> · <a href={`mailto:${site.email}`}>{site.email}</a> · BN {site.businessNumber}
      </p>
      <div className="footer__bottom"><span>© {year} {site.name}</span><span>{site.tagline}</span><MotionToggle /><Link href="/privacy">Privacy</Link></div>
      </div>
    </footer>
  )
}
