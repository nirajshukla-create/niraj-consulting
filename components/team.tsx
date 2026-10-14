import Link from "next/link"
import Image from "next/image"
import { about, network, people, site, type Person } from "@/lib/site"
import { Copy } from "./copy"
import { PortraitMotion } from "./studio-finale-motion"
import "./studio-sections.css"
import "./studio-finale-motion.css"
import "./market-sections.css"

/** Supplied portraits sit alongside the studio's typographic portrait artwork. */
export function PersonCard({ person, sizes = "(max-width: 760px) 100vw, 50vw", short = true }: { person: Person; sizes?: string; short?: boolean }) {
  return (
    <article className={`studio-person${person.photo ? " studio-person--has-photo" : ""}${short ? " studio-person--edition" : " studio-person--compact"}`}>
      <PortraitMotion>
        {person.photo ? (
          <Image src={person.photo} alt={person.name} fill sizes={sizes} className="studio-person__photo" />
        ) : (
          <>
            <div className="studio-person__art-top" aria-hidden="true">{person.name}</div>
            <p className="studio-person__initials" aria-hidden="true">
              {person.initials.split("").map((letter, index) => <span className={`studio-assembly__letter studio-assembly__letter--${index}`} key={index}>{letter}</span>)}
            </p>
            <div className="studio-assembly__rule" aria-hidden="true" />
          </>
        )}
      </PortraitMotion>
      <div className="studio-person__body">
        <p className="studio-person__role">{person.role}</p>
        <h3 className="studio-person__name">{person.name}{person.credentials && <span className="studio-person__credentials">, {person.credentials}</span>}</h3>
        {short && <p className="studio-person__short"><Copy text={person.short} /></p>}
        {short && <Link href={`/about#bio-${person.id}`} className="studio-person__more">Meet {person.name.split(" ")[0]}<span aria-hidden="true">↗</span></Link>}
      </div>
    </article>
  )
}

/** The core team, then the specialist disciplines brought in from the network. */
export function Team() {
  return (
    <section id="team" className="studio-section" aria-labelledby="team-title">
      <div className="editorial-shell">
        <div className="editorial-heading">
          <p className="editorial-heading__label">05 — Team</p>
          <div className="editorial-heading__content">
            <h2 id="team-title" className="editorial-heading__title">The team.</h2>
            <p className="editorial-heading__note">{about.teamNote}</p>
          </div>
        </div>
        <div className="studio-people">{people.map((person) => <PersonCard key={person.id} person={person} />)}</div>
        <div className="studio-network">
          <p className="studio-network__label">{about.networkLabel}</p>
          <ul className="studio-network__list">{network.map((discipline) => <li key={discipline}>{discipline}</li>)}</ul>
        </div>
        <div className="studio-foot">
          <span className="studio-foot__note">{site.location.city}. {site.location.served}.</span>
          <Link href="/about" className="studio-about-link">More about the team <span aria-hidden="true">↗</span></Link>
        </div>
      </div>
    </section>
  )
}
