import { manifesto } from "@/lib/site"
import { FillText } from "./motion"

/** The first thing that slides over the pinned hero: one statement that lights up word by word as you scroll. */
export function Intro() {
  return (
    <section className="intro" aria-label="What we believe">
      <FillText text={manifesto} />
    </section>
  )
}
