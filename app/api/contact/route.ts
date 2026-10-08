import { NextResponse } from "next/server"
import { site } from "@/lib/site"

export const runtime = "nodejs"

/**
 * Forwards a contact-form message by email through Resend.
 *
 * Env (set in Vercel → Project → Settings → Environment Variables):
 *   RESEND_API_KEY  required to send; without it the route answers 503 and the form falls
 *                   back to a prefilled mailto link.
 *   CONTACT_TO      comma-separated recipients; defaults to site.email.
 *   CONTACT_FROM    a sender on a domain verified in Resend, e.g. "The Narrows <hello@yourdomain.ca>".
 *                   Defaults to Resend's onboarding sender, which only delivers to the
 *                   Resend account owner's own address.
 */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(req: Request) {
  let body: Record<string, unknown>
  try {
    body = (await req.json()) as Record<string, unknown>
  } catch {
    return NextResponse.json({ ok: false, error: "bad json" }, { status: 400 })
  }
  const str = (k: string) => (typeof body[k] === "string" ? (body[k] as string).trim() : "")
  const name = str("name")
  const email = str("email")
  const business = str("business")
  const message = str("message")
  const website = str("website")

  // honeypot: real people never see this field
  if (website) return NextResponse.json({ ok: true })

  if (!name || !EMAIL_RE.test(email) || message.length < 5) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 })
  }
  if (name.length > 200 || email.length > 200 || business.length > 200 || message.length > 5000) {
    return NextResponse.json({ ok: false, error: "too long" }, { status: 400 })
  }

  const key = process.env.RESEND_API_KEY
  if (!key) return NextResponse.json({ ok: false, error: "unconfigured" }, { status: 503 })

  const to = (process.env.CONTACT_TO ?? site.email)
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
  const from = process.env.CONTACT_FROM ?? `${site.name} <onboarding@resend.dev>`

  const lines = [`Name: ${name}`, `Email: ${email}`]
  if (business) lines.push(`Business: ${business}`)
  lines.push("", message)

  const r = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to,
      reply_to: email,
      subject: `New enquiry from ${name}${business ? ` (${business})` : ""}`,
      text: lines.join("\n"),
    }),
  })

  if (!r.ok) {
    console.error("contact: resend failed", r.status, await r.text())
    return NextResponse.json({ ok: false, error: "send failed" }, { status: 502 })
  }
  return NextResponse.json({ ok: true })
}
