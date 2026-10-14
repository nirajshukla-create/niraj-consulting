import Link from "next/link"
import Image from "next/image"
import { about, network, people, type Person } from "@/lib/site"
import { Copy } from "./copy"
import "./studio-sections.css"
import "./studio-finale-motion.css"
import "./market-sections.css"

/** A portrait or a typographic initials tile, then role, name and a short line. Static. */
export function PersonCard({ person, sizes = "(max-width: 760px) 100vw, 50vw" }: { person: Person; sizes?: string }) {
  return (
    <article className={`studio-person studio-person--edition${person.photo ? " studio-person--has-photo" : ""}`}>
      <div className="studio-person__art studio-assembly">
        {person.photo ? (
          <Image src={person.photo} alt={person.name} fill sizes={sizes} className="studio-person__photo" />
        ) : (
          <>
            <div className="studio-person__art-top" aria-hidden="true">{person.name}</div>
            <p className="studio-person__initials" aria-hidden="true">{person.initials}</p>
            <div className="studio-assembly__rule" aria-hidden="true" />
          </>
        )}
      </div>
      <div className="studio-person__body">
        <p className="studio-person__role">{person.role}</p>
        <h3 className="studio-person__name">{person.name}{person.credentials && <span className="studio-person__credentials">, {person.credentials}</span>}</h3>
        <p className="studio-person__short"><Copy text={person.short} /></p>
      </div>
    </article>
  )
}

/** The core team, the specialist disciplines brought in from the network, one link to the full bios. */
export function Team() {
  return (
    <section id="team" className="studio-section" aria-labelledby="team-title">
      <div className="editorial-shell">
        <div className="editorial-heading">
          <p className="editorial-heading__label">04 — Team</p>
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
          <Link href="/about" className="studio-about-link">More about the team <span aria-hidden="true">↗</span></Link>
        </div>
      </div>
    </section>
  )
}
