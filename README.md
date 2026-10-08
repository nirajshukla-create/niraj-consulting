# Consulting site (working name: The Narrows)

Marketing site for Niraj Shukla and Zach Valiquette's web design, social media and strategy studio in St. John's, NL. Next.js 15 (App Router), Tailwind 4, TypeScript. Built for Vercel.

## Run

```
pnpm install
pnpm dev        # http://localhost:3000
pnpm build      # production build (what Vercel runs)
pnpm textures   # regenerate public/hero-fog.webp, grain.png and og-bg.jpg
```

## Where things live

- `lib/site.ts` — every fact and line of copy: name, contacts, services, steps, bios. Change it once and every page updates. The working name, email and phone are placeholders to confirm.
- `app/globals.css` — the whole visual system: tokens, keyframes, hero atmosphere, cards, footer, reduced-motion rules.
- `components/` — one file per section. `motion.tsx` is the scroll-reveal; `covers.tsx` is the animated line art on the service cards.
- `public/team/` — drop portraits here and set `photo` in `lib/site.ts` to show them instead of the initials tiles.

## Contact form

`app/api/contact/route.ts` forwards messages through Resend. Set in Vercel:

- `RESEND_API_KEY` — required to send. Without it the form shows a prefilled email link instead.
- `CONTACT_TO` — where messages go (comma-separated). Defaults to the email in `lib/site.ts`.
- `CONTACT_FROM` — a sender on a domain verified in Resend. Until one exists, Resend's onboarding sender only delivers to the Resend account owner.

Also set `NEXT_PUBLIC_SITE_URL` once a custom domain exists, so share images and the sitemap use it.
