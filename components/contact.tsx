import { contact, site } from "@/lib/site"
import { ContactForm } from "./contact-form"
import { Reveal } from "./motion"
import { SectionHead } from "./section-head"

export function Contact({ n = "01", first = false }: { n?: string; first?: boolean }) {
  return (
    <section id="contact" className={`band band--last ${first ? "band--first" : ""}`} aria-labelledby="contact-title">
      <SectionHead n={n} kicker="Contact" title="Start a project" titleId="contact-title" />
      <div className="contact">
        <Reveal>
          <p className="lede">{contact.lede}</p>
          <p className="contact__text">{contact.text}</p>
          <dl className="contact__facts">
            <div>
              <dt className="kicker">Email</dt>
              <dd>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </dd>
            </div>
            <div>
              <dt className="kicker">Phone</dt>
              <dd>
                <a href={`tel:${site.phone.tel}`}>{site.phone.display}</a>
              </dd>
            </div>
            <div>
              <dt className="kicker">Studio</dt>
              <dd>{site.location.long}</dd>
            </div>
          </dl>
        </Reveal>
        <Reveal delay={120}>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  )
}
