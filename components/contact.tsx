import type { CSSProperties } from "react"
import { contact, site } from "@/lib/site"
import { ContactForm } from "./contact-form"
import { Reveal } from "./motion"

export function Contact() {
  return (
    <section id="contact" className="band sheet" style={{ "--z": 2 } as CSSProperties} aria-label="Contact">
      <div className="contact">
        <Reveal effect="left">
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
        <Reveal effect="scale" delay={120}>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  )
}
