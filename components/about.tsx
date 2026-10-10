import Image from "next/image"
import Link from "next/link"
import { about, people } from "@/lib/site"
import { Reveal } from "./motion"

export function About() {
  return (
    <section className="inner-section about-editorial" aria-label="About the studio">
      <div className="editorial-shell">
        <div className="about-editorial__intro">
          <Reveal effect="fade"><h2 className="inner-lede">{about.lede}</h2></Reveal>
          <Reveal effect="fade" delay={80} className="inner-prose">
            {about.body.map((paragraph) => <p key={paragraph.slice(0, 24)}>{paragraph}</p>)}
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
                  <h2 className="about-bio__name" id={`bio-${person.id}-title`}>{person.name}</h2>
                  <div className="inner-prose">{person.bio.map((paragraph) => <p key={paragraph.slice(0, 24)}>{paragraph}</p>)}</div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="inner-endnote">
          <p>{about.closing}</p>
          <Link className="inner-text-link" href="/contact">Start a conversation <span aria-hidden="true">↗</span></Link>
        </div>
      </div>
    </section>
  )
}
