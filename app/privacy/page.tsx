import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { SectionHead } from "@/components/section-head"
import { site } from "@/lib/site"

export const metadata: Metadata = {
  title: "Privacy",
  description: `What ${site.name} collects on this website, and what it does not.`,
}

export default function PrivacyPage() {
  return (
    <>
      <SiteHeader variant="dark" />
      <main>
        <section className="band band--first band--last" aria-labelledby="privacy-title">
          <SectionHead n="01" kicker="Privacy" title="Privacy" titleId="privacy-title" />
          <div className="about__grid">
            <p className="lede">Short version: we collect what you type into the contact form, and nothing else about you.</p>
            <div className="prose">
              <p>
                <strong>The contact form.</strong> When you send a message we receive your name, email address, the business
                you name and the message itself. We use it to reply to you and for nothing else. It is not added to a mailing
                list and is never sold or shared.
              </p>
              <p>
                <strong>Analytics.</strong> This site uses Vercel Web Analytics, which counts page views without cookies and
                without identifying individual visitors. We cannot see who you are, only that a page was viewed.
              </p>
              <p>
                <strong>Cookies.</strong> The site sets none.
              </p>
              <p>
                <strong>Questions.</strong> Write to <a href={`mailto:${site.email}`}>{site.email}</a> and a person will answer.
              </p>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
