import { ImageResponse } from "next/og"
import { readFile } from "node:fs/promises"
import { join } from "node:path"
import { hero, site } from "@/lib/site"

// The share image: the fog plate with the headline set in Instrument Serif. Rendered once
// at build time because nothing in it is dynamic.
export const runtime = "nodejs"
export const alt = `${site.name} — ${site.tagline}`
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function Image() {
  const fonts = join(process.cwd(), "app", "fonts")
  const [regular, italic, bg] = await Promise.all([
    readFile(join(fonts, "InstrumentSerif-Regular.ttf")),
    readFile(join(fonts, "InstrumentSerif-Italic.ttf")),
    readFile(join(process.cwd(), "public", "og-bg.jpg")),
  ])
  const bgUrl = `data:image/jpeg;base64,${bg.toString("base64")}`

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "64px 72px",
          backgroundColor: "#1a1d22",
          backgroundImage: `url(${bgUrl})`,
          backgroundSize: "1200px 630px",
          color: "#f4f5f3",
          fontFamily: "Instrument Serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 1200,
            height: 630,
            background: "linear-gradient(to bottom, rgba(18,20,23,0.3), rgba(18,20,23,0) 30%, rgba(18,20,23,0.72))",
          }}
        />
        <div style={{ display: "flex", fontSize: 24, letterSpacing: 5, textTransform: "uppercase", opacity: 0.8 }}>
          {hero.eyebrow}
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 148, lineHeight: 0.95, letterSpacing: -3, marginTop: 18 }}>
          <span>{hero.lines[0].text}</span>
          <span style={{ fontStyle: "italic" }}>{hero.lines[1].text}</span>
        </div>
        <div style={{ display: "flex", marginTop: 30, fontSize: 30, opacity: 0.85 }}>
          {site.name} · {site.location.long}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Instrument Serif", data: regular, style: "normal", weight: 400 },
        { name: "Instrument Serif", data: italic, style: "italic", weight: 400 },
      ],
    },
  )
}
