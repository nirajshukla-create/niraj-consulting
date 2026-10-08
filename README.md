# Easterly (working name)

Marketing site for Niraj Shukla and Zach Valiquette's web design, social media and strategy studio in St. John's, NL. Next.js 15 (App Router), Tailwind 4, TypeScript. Built for Vercel.

The home page is built around scroll-linked transformations: a pinned hero that zooms out under the page, a manifesto that lights up word by word, a pinned services section whose cards travel sideways, approach steps that pile up as cards, tickers that react to scroll speed, and a custom cursor. All of it runs through one scroll listener and one animation frame in `components/motion.tsx`, and every effect has a plain fallback for phones and reduced motion.

## Run

```
pnpm install
pnpm dev        # http://localhost:3000
pnpm build      # production build (what Vercel runs)
```

## Where things live

- `lib/site.ts` — every fact and line of copy: name, contacts, services, steps, bios, the four accent colours. Change it once and every page updates. The working name, email and phone are placeholders to confirm.
- `app/globals.css` — the whole visual system: tokens, keyframes, hero sky, tickers, cards, sheets, footer, reduced-motion rules.
- `components/` — one file per section. `motion.tsx` holds the scroll reveals, 3D tilt, magnetic buttons, pointer spotlight and parallax; `skyline.tsx` draws the row houses from a seed; `covers.tsx` is the animated art on the service cards.
- `public/team/` — drop portraits here and set `photo` in `lib/site.ts`; a photo renders in duotone on the person's colour.
- `app/opengraph-image.tsx` — the share image, rendered at build time with `app/fonts/BricolageGrotesque-ExtraBold.ttf`.

## Contact form

`app/api/contact/route.ts` forwards messages through Resend. Set in Vercel:

- `RESEND_API_KEY` — required to send. Without it the form shows a prefilled email link instead.
- `CONTACT_TO` — where messages go (comma-separated). Defaults to the email in `lib/site.ts`.
- `CONTACT_FROM` — a sender on a domain verified in Resend. Until one exists, Resend's onboarding sender only delivers to the Resend account owner.

Also set `NEXT_PUBLIC_SITE_URL` once a custom domain exists, so the share image and sitemap use it.

## Seeing the motion on a machine with animations turned off

The site honours the operating system's reduced-motion preference: if Windows has Settings → Accessibility → Visual effects → **Animation effects** switched off (or macOS has Reduce Motion on), every animation and scroll transformation is disabled and the page reads as a still layout. To review the site as visitors with animations on see it, either turn that setting on, or open any page with `?motion=1` once; that stores an owner override in the browser. `?motion=0` clears it.

## Reviewing changes

`.scratch/rig/` (not committed) has Playwright scripts that screenshot every page at desktop and phone widths, prove each animation runs, and measure long tasks and layout shift against a production server on port 3100.
