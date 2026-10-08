"use client"

import { useEffect, useState, type FormEvent } from "react"
import { services, site } from "@/lib/site"

type Status = "idle" | "sending" | "sent" | "unconfigured" | "error"

/**
 * Posts to /api/contact, which forwards to Resend when RESEND_API_KEY is set. Until it is,
 * the API answers 503 and the form offers a prefilled email link instead, so no message
 * is ever silently lost. A `?about=<service id>` in the URL seeds the message.
 */
export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle")
  const [draft, setDraft] = useState({ name: "", email: "", business: "", message: "" })
  const [seed, setSeed] = useState("")

  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get("about")
    const s = services.find((x) => x.id === id)
    if (s) setSeed(`I'm interested in ${s.title.toLowerCase()}. `)
  }, [])

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(e.currentTarget).entries()) as Record<string, string>
    setDraft({ name: data.name ?? "", email: data.email ?? "", business: data.business ?? "", message: data.message ?? "" })
    setStatus("sending")
    try {
      const r = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if (r.ok) setStatus("sent")
      else if (r.status === 503) setStatus("unconfigured")
      else setStatus("error")
    } catch {
      setStatus("error")
    }
  }

  const subject = encodeURIComponent(`Project enquiry from ${draft.name || "the website"}`)
  const body = encodeURIComponent(`${draft.message}\n\n${draft.name}\n${draft.business}\n${draft.email}`.trim())
  const mailto = `mailto:${site.email}?subject=${subject}&body=${body}`

  if (status === "sent") {
    return (
      <div className="form__done" role="status">
        <p className="tag">Sent</p>
        <p className="lede">Thanks, we have it.</p>
        <p>We read every message and reply personally, usually within a business day.</p>
      </div>
    )
  }

  return (
    <form className="form" onSubmit={onSubmit}>
      <div className="form__row">
        <div className="field">
          <label htmlFor="name">Name</label>
          <input id="name" name="name" required autoComplete="name" maxLength={200} />
        </div>
        <div className="field">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" required autoComplete="email" maxLength={200} />
        </div>
      </div>
      <div className="field">
        <label htmlFor="business">Business</label>
        <input id="business" name="business" autoComplete="organization" maxLength={200} />
      </div>
      <div className="field">
        <label htmlFor="message">What are you working on?</label>
        <textarea id="message" name="message" rows={6} required minLength={5} maxLength={5000} defaultValue={seed} key={seed} />
      </div>
      {/* honeypot: hidden from people, filled by bots, silently dropped by the API */}
      <div className="field field--hp" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="form__foot">
        <button type="submit" className="btn" disabled={status === "sending"}>
          {status === "sending" ? (
            "Sending…"
          ) : (
            <>
              Send message <span className="arrow">→</span>
            </>
          )}
        </button>
        <p className="form__note">No newsletter, no sequence. Just a reply.</p>
      </div>
      {status === "unconfigured" && (
        <p className="form__alert" role="alert">
          The form isn&apos;t connected yet. <a href={mailto}>Send it by email instead →</a>
        </p>
      )}
      {status === "error" && (
        <p className="form__alert" role="alert">
          Something went wrong on our side. <a href={mailto}>Send it by email instead →</a>
        </p>
      )}
    </form>
  )
}
