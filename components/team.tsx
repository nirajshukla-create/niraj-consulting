import Link from "next/link"
import Image from "next/image"
import type { CSSProperties } from "react"
import { about, people, TONES, type Person } from "@/lib/site"
import { Reveal, Tilt } from "./motion"
import { SectionHead } from "./section-head"

/** A colour tile with a halftone fade, giant initials (or a duotone photo) and a glass caption. */
export function PersonCard({ person, sizes = "(max-width: 900px) 100vw, 480px", short = true }: { person: Person; sizes?: string; short?: boolean }) {
  const tone = TONES[person.tone]
  return (
    <Tilt max={6} lift={6}>
      <div className="person" style={{ "--tone": tone.color, "--tone-deep": tone.deep } as CSSProperties}>
        {person.photo ? (
          <Image src={person.photo} alt={person.name} fill sizes={sizes} className="person__photo" />
        ) : (
          <p className="person__initials" aria-hidden="true">
            {person.initials}
          </p>
        )}
        <div className="person__dots" aria-hidden="true" />
        <div className="person__meta">
          <p className="person__role">{person.role}</p>
          <h3 className="person__name">{person.name}</h3>
          {short && <p className="person__short">{person.short}</p>}
        </div>
      </div>
    </Tilt>
  )
}

export function Team() {
  return (
    <section id="team" className="band sheet" style={{ "--z": 3 } as CSSProperties} aria-labelledby="team-title">
      <SectionHead
        n="03"
        kicker="Who you'll work with"
        title={
          <>
            No account <em>managers.</em>
          </>
        }
        titleId="team-title"
        note={about.teamNote}
      />
      <div className="people">
        {people.map((p, i) => (
          <Reveal key={p.id} effect="deal" rotate={i ? 3 : -3} delay={i * 140}>
            <PersonCard person={p} />
          </Reveal>
        ))}
      </div>
      <Reveal effect="fade" delay={200} style={{ marginTop: "clamp(28px, 4vw, 44px)" }}>
        <Link href="/about" className="mono-link" style={{ "--tone-deep": "var(--color-coral-deep)" } as CSSProperties}>
          More about the studio <span className="arrow">→</span>
        </Link>
      </Reveal>
    </section>
  )
}
