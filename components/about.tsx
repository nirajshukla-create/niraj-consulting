import { about, people, site } from "@/lib/site"
import { Reveal } from "./motion"
import { SectionHead } from "./section-head"
import { Portrait } from "./team"

export function About() {
  return (
    <section className="band band--first band--last" aria-labelledby="about-title">
      <SectionHead n="01" kicker="About" title="About" titleId="about-title" />
      <div className="about__grid">
        <Reveal>
          <p className="lede">{about.lede}</p>
        </Reveal>
        <Reveal delay={100} className="prose">
          {about.body.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </Reveal>
      </div>

      {people.map((p, i) => (
        <Reveal key={p.id} delay={60}>
          <article className="bio" aria-labelledby={`bio-${p.id}`}>
            <div>
              <p className="bio__role tag">
                [ {String(i + 1).padStart(2, "0")} — {p.role} ]
              </p>
              <h3 className="bio__name" id={`bio-${p.id}`}>
                {p.name}
              </h3>
              <div className="prose">
                {p.bio.map((para) => (
                  <p key={para.slice(0, 24)}>{para}</p>
                ))}
              </div>
            </div>
            <figure className="bio__portrait">
              <Portrait person={p} sizes="(max-width: 860px) 260px, 240px" />
              <figcaption className="bio__cap">
                {p.name} — {site.location.city}, {site.location.region}
              </figcaption>
            </figure>
          </article>
        </Reveal>
      ))}

      <Reveal effect="fade">
        <div className="about__grid">
          <p className="about__closing">{about.closing}</p>
        </div>
      </Reveal>
    </section>
  )
}
