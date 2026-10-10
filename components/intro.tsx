import { manifesto } from "@/lib/site"
import { Reveal } from "./motion"
import { ScrollScene } from "./scroll-scene"

export function Intro() {
  return (
    <ScrollScene className="editorial-intro" labelledBy="intro-title">
      <div className="editorial-shell">
        <header className="editorial-heading">
          <p className="editorial-heading__label">01 — Our perspective</p>
          <div className="editorial-heading__content"><h2 id="intro-title" className="editorial-heading__title">About.</h2></div>
        </header>
        <div className="editorial-intro__body">
          <p className="editorial-intro__location">St. John’s, Newfoundland<br />& Labrador</p>
          <Reveal className="editorial-intro__copy">
            <p className="intro__text">{manifesto.split(" ").map((word, index) => <span className="intro-word" key={index} style={{ "--word-index": index } as React.CSSProperties}>{word}{" "}</span>)}</p>
            <Link className="editorial-link" href="/about">About the people behind it <span aria-hidden="true">→</span></Link>
          </Reveal>
        </div>
      </div>
    </ScrollScene>
  )
}
import Link from "next/link"
