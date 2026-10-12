# Innovation East Consulting

Marketing site for Niraj Shukla and Zach Valiquette's web design, social media and strategy studio in St. John's, NL. Next.js 15 (App Router), Tailwind 4, TypeScript. Built for Vercel.

The home page follows the editorial identity of [Innovation East](https://innovationeast.ca/): Libre Bodoni serif type, italic East, Space Mono labels, monochrome coastal photography, pale paper sections and restrained rust accents. The opening has staggered photographic curtains; scrolling contracts the photograph into a frame, separates it into three offset panels, then reveals paper. The navigation, footer and share image use the same serif identity. Dark sections are pure black.

Every homepage chapter and inner page shares one editorial system: a 1160px shell, 140px label rail, consistent serif headings, fine rules and the same pale paper background. Services are four equal articles with compact monochrome illustrations; process rows and equal portrait columns carry the same rhythm through the rest of the homepage. About, Contact, Privacy and the not-found page use the same masthead, typography and compact footer.

The direction study between the introduction and services turns the same eleven bars from a striped circle into an open arrangement, then an east-pointing arrow. Native scrolling controls and reverses the composition. Its measured sticky panel fits short screens; reduced motion shows the complete arrow without the extra scroll distance.

The interactive design lab lets visitors take an imagined brand through Clarify, Refine and Transform, changing its typography, layout and colour within an ink-and-paper palette. Sculptural layers fan apart and reassemble while the backdrop morphs from circle to arch to angular cutout. Visitors can compare the original, replay and pause the sequence, or select a stage again to replay its artwork. Artwork unfolding, process stacking and portrait motion work on phones. Body copy stays upright; reduced motion keeps every layout and control usable without animated transitions.

## Run

```
pnpm install
pnpm dev        # http://localhost:3000
pnpm build      # production build (what Vercel runs)
```

## Where things live

- `lib/site.ts` — the studio name, wordmark, contacts, service descriptions, process and bios. Email and phone remain to be confirmed.
- `components/brand-mark.tsx` and `brand-identity.css` — responsive serif wordmark and navigation identity. Brand text follows `site.wordmark`; metadata and accessible labels use the full `site.name`.
- `app/editorial.css` — shared design tokens, shell, section headings, photographic hero, pale sections, design-lab frame and compact closing/footer.
- `components/editorial-motion.tsx` and `app/editorial-motion.css` — viewport-triggered heading reveals, drawn rules, page progress and the photographic opening sequence, with live reduced-motion handling.
- `components/direction-study.tsx` and `direction-study.css` — the scroll-controlled circle, arrangement and east-arrow sculpture with a static reduced-motion fallback.
- `components/featured-project.tsx` and `featured-project.css` — LOW TIDE, a clearly labelled fictional hospitality concept. The website frame expands with native scrolling, then reveals its mobile composition; reduced motion shows the finished composition without pinning. `public/concepts/low-tide-house.png` is AI-generated concept architecture, not a real property or client commission.
- `components/project-comparison.tsx` and `project-comparison.css` — an accessible native range reveals the original and redesigned concept layouts. Drag or tap the preview, use arrow keys for fine adjustments, Home for the redesign and End for the original. Vertical touch scrolling stays available.
- `components/inner-editorial.css` — About, Contact, Privacy and not-found mastheads, biography layouts, form styling and reading columns.
- `app/globals.css` — visual tokens, navigation, hero, statement, closing invitation, footer, inner pages, forms and reduced-motion rules.
- `app/cinematic.css` — crisp typography refinements, pinned hero transformations, rolling type strip and reduced-motion rules.
- `components/hero.tsx` and `hero-motion.tsx` — the coastal photographic opening, pinned scroll sequence and pointer/touch drift. The earlier SVG harbour artwork remains in `coastal-scene.tsx` but is not rendered.
- `components/services.tsx`, `service-motion.tsx` and `services.css` — four reversible, three-stage design studies: wireframe to responsive site, poster stack to campaign, scattered notes to connected route, and shapes to an identity board. The timeline runs while each illustration is in view; service copy stays fixed. Ambient details pause offscreen or in hidden tabs. These are service illustrations, not client case studies.
- `components/closing-transformation.tsx` and `closing-transformation.css` — four shapes morph and fold into the offset-cut studio mark beside the closing invitation, with no pinning or added scroll height and a settled reduced-motion fallback.
- `components/approach.tsx`, `process-motion.tsx`, `team.tsx` and `studio-sections.css` — ruled process rows, first-call information and equal portrait columns.
- `components/scroll-scene.tsx` — section progress and paragraph reveal timing. The earlier ticker component remains available but is not rendered on the homepage.
- `components/signal-showcase.tsx`, `signal-showcase.css` and `design-lab-scroll.css` — the scroll-driven Clarify / Refine / Transform design lab. The preview pins while native scrolling advances or reverses the stages. Stage buttons and keyboard controls jump within that scroll sequence; original comparison resumes on the next scroll. Reduced motion uses a natural, unpinned preview with manual stage selection.
- `components/studio-finale-motion.tsx` and `studio-finale-motion.css` — portrait wipes, drawn frames, image parallax and assembling initials; biographies and links stay fixed.
- `components/motion.tsx` — shared entrance effects and retained motion utilities.
- `public/identity/innovation-east-coast.png` — the hero photograph from `https://innovationeast.ca/assets/hero.png`, reused for the requested visual alignment.
- `public/team/niraj.jpg` — Niraj's portrait from `https://innovationeast.ca/assets/about-portrait.jpg`. Zach retains the typographic profile artwork until a portrait is supplied.
- `app/opengraph-image.tsx` — the photographic share image, rendered at build time with local Libre Bodoni and Space Mono fonts in `app/fonts/`.

## Contact form

`app/api/contact/route.ts` forwards messages through Resend. Set in Vercel:

- `RESEND_API_KEY` — required to send. Without it the form shows a prefilled email link instead.
- `CONTACT_TO` — where messages go (comma-separated). Defaults to the email in `lib/site.ts`.
- `CONTACT_FROM` — a sender on a domain verified in Resend. Until one exists, Resend's onboarding sender only delivers to the Resend account owner.

Also set `NEXT_PUBLIC_SITE_URL` once a custom domain exists, so the share image and sitemap use it.

## Motion policy

Animation is on for every visitor by default, whatever their operating system reports. (Windows with Settings → Accessibility → Visual effects → **Animation effects** switched off tells every website the user wants reduced motion, which is how the owners first saw a still site.) A visitor who wants less motion uses the **Motion on/off** switch in the footer; the choice is stored in that browser. `?motion=0` in the URL does the same thing and `?motion=1` clears it.

## Reviewing changes

Run `pnpm build` for the production check. Review `/`, `/about`, `/contact` and `/privacy` at desktop and phone widths. Scroll down and back through every design lab stage, then check stage jumps by click, tap and keyboard; Left/Right and Home/End move between its three stage controls. Check original comparison, return to Clarify, and reduced motion. Service links prefill the contact message using `?about=web`, `social`, `strategy` or `brand`. The mobile menu closes with Escape and returns focus to its button. Retained scripts in `.scratch/rig/` describe an earlier animation system and may need updating before reuse.
