import Link from "next/link"
import { contact, site } from "@/lib/site"
import { ContactForm } from "./contact-form"
import { Reveal } from "./motion"

export function Contact() {
  return (
    <section id="contact" className="inner-section contact-editorial" aria-label="Contact details and enquiry form">
      <div className="editorial-shell contact-editorial__grid">
        <Reveal effect="fade" className="contact-editorial__details">
          <h2 className="inner-lede">{contact.lede}</h2>
          <p className="contact-editorial__text">{contact.text}</p>
          <dl className="contact-editorial__facts">
            <div>
              <dt className="inner-label">Email</dt>
              <dd>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </dd>
            </div>
            <div>
              <dt className="inner-label">Phone</dt>
              <dd>
                <a href={`tel:${site.phone.tel}`}>{site.phone.display}</a>
              </dd>
            </div>
            <div>
              <dt className="inner-label">Based in</dt>
              <dd>{site.location.long}</dd>
            </div>
          </dl>
          <Link className="inner-text-link" href="/about">Meet the people behind the work <span aria-hidden="true">↗</span></Link>
        </Reveal>
        <Reveal effect="fade" delay={80} className="contact-editorial__form">
          <h2 className="contact-editorial__form-title">Send a note.</h2>
          <ContactForm />
          <p className="contact-editorial__privacy"><Link href="/privacy">How we handle your information</Link></p>
        </Reveal>
      </div>
    </section>
  )
}
