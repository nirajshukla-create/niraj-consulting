import Image from "next/image"
import Link from "next/link"
import { about, network, people } from "@/lib/site"
import { Copy } from "./copy"
import { Reveal } from "./motion"
import "./market-sections.css"

export function About() {
  return (
    <section className="inner-section about-editorial" aria-label="About Innovation East">
      <div className="editorial-shell">
        <div className="about-editorial__intro">
          <Reveal effect="fade"><h2 className="inner-lede">{about.lede}</h2></Reveal>
          <Reveal effect="fade" delay={80} className="inner-prose">
            {about.body.map((paragraph) => <p key={paragraph.slice(0, 24)}><Copy text={paragraph} /></p>)}
            <Link className="inner-text-link" href="/#services">Explore our services <span aria-hidden="true">↗</span></Link>
          </Reveal>
        </div>

        <div className="about-editorial__people">
          {people.map((person) => (
            <Reveal key={person.id} effect="fade">
              <article className="about-bio" id={`bio-${person.id}`} aria-labelledby={`bio-${person.id}-title`}>
                <div className="about-bio__visual">
                  {person.photo ? (
                    <div className="about-bio__portrait"><Image src={person.photo} alt={person.name} fill sizes="(max-width: 680px) 280px, 320px" className="about-bio__photo" /></div>
                  ) : (
                    <div className="about-bio__initials" aria-hidden="true">{person.initials}</div>
                  )}
                </div>
                <div className="about-bio__content">
                  <p className="inner-label about-bio__role">{person.role}</p>
                  <h2 className="about-bio__name" id={`bio-${person.id}-title`}>{person.name}{person.credentials && <span className="about-bio__credentials">, {person.credentials}</span>}</h2>
                  <div className="inner-prose">{person.bio.map((paragraph) => <p key={paragraph.slice(0, 24)}><Copy text={paragraph} /></p>)}</div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="studio-network">
          <p className="studio-network__label">{about.networkLabel}</p>
          <ul className="studio-network__list">{network.map((discipline) => <li key={discipline}>{discipline}</li>)}</ul>
        </div>

        <div className="inner-endnote">
          <p>{about.closing}</p>
          <Link className="inner-text-link" href="/contact">Book a 30-minute call <span aria-hidden="true">↗</span></Link>
        </div>
      </div>
    </section>
  )
}
