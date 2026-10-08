import type { CSSProperties } from "react"
import { about, people, TONES } from "@/lib/site"
import { Reveal } from "./motion"
import { PersonCard } from "./team"

export function About() {
  return (
    <section className="band sheet" style={{ "--z": 2 } as CSSProperties} aria-label="About the studio">
      <div className="about__grid">
        <Reveal effect="left">
          <p className="lede">{about.lede}</p>
        </Reveal>
        <Reveal delay={100} className="prose">
          {about.body.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </Reveal>
      </div>

      {people.map((p, i) => {
        const tone = TONES[p.tone]
        return (
          <Reveal key={p.id} delay={60}>
            <article className="bio" aria-labelledby={`bio-${p.id}`} style={{ "--tone": tone.color, "--tone-deep": tone.deep } as CSSProperties}>
              <div>
                <p className="kicker bio__role">
                  <span className="num" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {p.role}
                </p>
                <h2 className="bio__name display" id={`bio-${p.id}`}>
                  {p.name}
                </h2>
                <div className="prose">
                  {p.bio.map((para) => (
                    <p key={para.slice(0, 24)}>{para}</p>
                  ))}
                </div>
              </div>
              <figure className="bio__portrait">
                <PersonCard person={p} sizes="(max-width: 860px) 300px, 300px" short={false} />
              </figure>
            </article>
          </Reveal>
        )
      })}

      <Reveal effect="fade" style={{ marginTop: "clamp(32px, 5vw, 56px)" }}>
        <div className="about__grid">
          <p className="about__closing">{about.closing}</p>
        </div>
      </Reveal>
    </section>
  )
}
