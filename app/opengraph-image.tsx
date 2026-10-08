import { ImageResponse } from "next/og"
import { readFile } from "node:fs/promises"
import { join } from "node:path"
import { Skyline } from "@/components/skyline"
import { hero, site } from "@/lib/site"

// The share image: the night sky, the headline in Bricolage Grotesque and the row houses.
// Rendered once at build time because nothing in it is dynamic.
export const runtime = "nodejs"
export const alt = `${site.name} — ${site.tagline}`
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function Image() {
  const font = await readFile(join(process.cwd(), "app", "fonts", "BricolageGrotesque-ExtraBold.ttf"))

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          backgroundColor: "#141c33",
          backgroundImage: "linear-gradient(to bottom, #0d1330 0%, #141c33 55%, #1b2548 100%)",
          color: "#f7f2e8",
          fontFamily: "Bricolage",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", left: -200, top: -320, width: 760, height: 760, borderRadius: 380, background: "radial-gradient(circle, rgba(31,163,156,0.75), rgba(31,163,156,0) 62%)" }} />
        <div style={{ position: "absolute", right: -220, top: -260, width: 700, height: 700, borderRadius: 350, background: "radial-gradient(circle, rgba(108,71,184,0.8), rgba(108,71,184,0) 62%)" }} />
        <div style={{ position: "absolute", left: 420, top: 120, width: 640, height: 420, borderRadius: 320, background: "radial-gradient(circle, rgba(255,90,78,0.45), rgba(255,90,78,0) 62%)" }} />
        <div style={{ position: "absolute", right: 150, top: 70, width: 92, height: 92, borderRadius: 46, background: "radial-gradient(circle at 36% 34%, #fff8e1, #f3dfa6 58%, #d8bb75)", boxShadow: "0 0 60px 20px rgba(244,182,47,0.25)" }} />
        <div style={{ display: "flex", flexDirection: "column", padding: "64px 72px 0" }}>
          <div style={{ display: "flex", fontSize: 20, letterSpacing: 4, textTransform: "uppercase", opacity: 0.85 }}>{hero.eyebrow}</div>
          <div style={{ display: "flex", flexDirection: "column", fontSize: 128, lineHeight: 0.92, letterSpacing: -5, marginTop: 18 }}>
            <span>{hero.lines[0].text}</span>
            <span style={{ color: "#ff5a4e" }}>{hero.lines[1].text}</span>
          </div>
          <div style={{ display: "flex", marginTop: 26, fontSize: 24, opacity: 0.9 }}>
            {site.name} · {site.location.long}
          </div>
        </div>
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, display: "flex", height: 210 }}>
          <Skyline animated={false} className="" />
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Bricolage", data: font, style: "normal", weight: 800 }],
    },
  )
}
