import Link from "next/link"
import Image from "next/image"
import { about, people, site, type Person } from "@/lib/site"
import { Reveal } from "./motion"
import { SectionHead } from "./section-head"

/** A 4:5 portrait, grayscale with a vignette and grain. Shows initials on fog until a photo exists. */
export function Portrait({ person, sizes = "(max-width: 900px) 100vw, 420px" }: { person: Person; sizes?: string }) {
  return (
    <div className={`portrait ${person.photo ? "" : "portrait--placeholder"}`}>
      {person.photo ? (
        <Image src={person.photo} alt={person.name} fill sizes={sizes} />
      ) : (
        <span className="portrait__mono" aria-hidden="true">
          {person.initials}
        </span>
      )}
      <div className="portrait__vignette" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />
    </div>
  )
}

export function Team() {
  return (
    <section id="about" className="band" aria-labelledby="team-title">
      <SectionHead n="03" kicker="Who we are" title={about.title} titleId="team-title" />
      <div className="people">
        {people.map((p, i) => (
          <Reveal key={p.id} delay={i * 120}>
            <div className="person">
              <Portrait person={p} />
              <p className="person__cap">
                {p.name} — {site.location.city}, {site.location.region}
              </p>
              <h3 className="person__name">{p.role}</h3>
              <p className="person__short">{p.short}</p>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal effect="fade" className="band__cta" style={{ justifyContent: "flex-start" }}>
        <Link href="/about" className="mono-link">
          More about the studio <span className="arrow">→</span>
        </Link>
      </Reveal>
    </section>
  )
}
