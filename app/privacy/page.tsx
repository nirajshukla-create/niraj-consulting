import type { Metadata } from "next"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { PageHero } from "@/components/page-hero"
import { SiteFooter } from "@/components/site-footer"
import { site } from "@/lib/site"

export const metadata: Metadata = {
  title: "Privacy",
  description: `What ${site.name} collects on this website, and what it does not.`,
}

export default function PrivacyPage() {
  return (
    <>
      <SiteHeader />
      <main className="inner-page">
        <PageHero kicker="Your information" title="Privacy." sub="How information is handled on this website." />
        <section className="inner-section privacy-editorial" aria-label="Privacy details">
          <div className="editorial-shell privacy-editorial__grid">
            <nav className="privacy-editorial__index" aria-label="Privacy sections">
              <a href="#privacy-contact">Contact form</a>
              <a href="#privacy-analytics">Analytics</a>
              <a href="#privacy-storage">Cookies & storage</a>
              <a href="#privacy-questions">Questions</a>
            </nav>
            <div className="privacy-editorial__body inner-prose">
              <section id="privacy-contact" aria-labelledby="privacy-contact-title">
                <h2 id="privacy-contact-title">The contact form.</h2>
                <p>When you send a message we receive your name, email address, the business you name and the message itself. We use it to reply to you. It is not added to a mailing list or sold.</p>
                <p>Messages sent through the form are delivered using Resend. If sending is unavailable, the form offers a link to send your message by email instead.</p>
              </section>
              <section id="privacy-analytics" aria-labelledby="privacy-analytics-title">
                <h2 id="privacy-analytics-title">Analytics.</h2>
                <p>This site uses Vercel Web Analytics, which counts page views without cookies and without identifying individual visitors. We cannot see who you are, only that a page was viewed.</p>
              </section>
              <section id="privacy-storage" aria-labelledby="privacy-storage-title">
                <h2 id="privacy-storage-title">Cookies & browser storage.</h2>
                <p>The site sets no cookies. The motion preview setting is saved in your browser’s local storage so it can remember how animations should run.</p>
              </section>
              <section id="privacy-questions" aria-labelledby="privacy-questions-title">
                <h2 id="privacy-questions-title">Questions.</h2>
                <p>Write to <a href={`mailto:${site.email}`}>{site.email}</a> and a person will answer.</p>
                <Link className="inner-text-link" href="/contact">Go to contact <span aria-hidden="true">↗</span></Link>
              </section>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
