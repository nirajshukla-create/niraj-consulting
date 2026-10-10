import { ImageResponse } from "next/og"
import { readFile } from "node:fs/promises"
import { join } from "node:path"
import { hero, site } from "@/lib/site"

export const runtime = "nodejs"
export const alt = `${site.name} — ${site.tagline}`
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

/** The same serif identity and original monochrome coastline as the home page. */
export default async function Image() {
  const [regular, italic, labels, coast] = await Promise.all([
    readFile(join(process.cwd(), "app", "fonts", "LibreBodoni-Bold.ttf")),
    readFile(join(process.cwd(), "app", "fonts", "LibreBodoni-BoldItalic.ttf")),
    readFile(join(process.cwd(), "app", "fonts", "SpaceMono-Regular.ttf")),
    readFile(join(process.cwd(), "public", "identity", "innovation-east-coast.png")),
  ])
  const words = site.wordmark.primary.split(" ")
  const accent = words.pop()

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", position: "relative", backgroundColor: "#000000", color: "#f3f0e8", fontFamily: "Bodoni", fontWeight: 700, overflow: "hidden" }}>
        {/* A bottom-aligned crop keeps the coastline in the wide share format. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`data:image/png;base64,${coast.toString("base64")}`} alt="" width={1200} height={900} style={{ position: "absolute", left: 0, bottom: 0 }} />
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(90deg, rgba(0,0,0,.82) 0%, rgba(0,0,0,.58) 58%, rgba(0,0,0,.3) 100%)" }} />
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", margin: "34px 60px 0", paddingBottom: 20, borderBottom: "1px solid #f3f0e840" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
            <div style={{ display: "flex", fontSize: 29, letterSpacing: -1 }}><span>{words.join(" ")}&nbsp;</span><span style={{ fontStyle: "italic" }}>{accent}</span></div>
            <span style={{ fontFamily: "Labels", fontWeight: 400, fontSize: 9, letterSpacing: 3 }}>{site.wordmark.secondary.toUpperCase()}</span>
          </div>
          <span style={{ fontFamily: "Labels", fontWeight: 400, fontSize: 11, letterSpacing: 2 }}>ST. JOHN’S, NEWFOUNDLAND</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", margin: "32px 60px 0", fontSize: 132, lineHeight: .99, letterSpacing: -5 }}>
          {hero.lines.map((line) => <span key={line.text} style={{ fontStyle: line.accent ? "italic" : "normal" }}>{line.text}</span>)}
        </div>
        <span style={{ display: "flex", margin: "19px 64px 0", fontFamily: "Labels", fontWeight: 400, fontSize: 13, letterSpacing: 5 }}>{site.wordmark.secondary.toUpperCase()}</span>
        <div style={{ position: "absolute", left: 60, right: 60, bottom: 36, display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 20, borderTop: "1px solid #f3f0e840", fontFamily: "Labels", fontWeight: 400, fontSize: 11, letterSpacing: 1.2 }}>
          <span>WEB DESIGN · SOCIAL MEDIA · STRATEGY</span>
          <span>{site.tagline}</span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Bodoni", data: regular, style: "normal", weight: 700 },
        { name: "Bodoni", data: italic, style: "italic", weight: 700 },
        { name: "Labels", data: labels, style: "normal", weight: 400 },
      ],
    },
  )
}
