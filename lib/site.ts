/**
 * Every fact the site shows lives here. Change it once and every page updates.
 *
 * WORKING NAME: "Easterly" (an easterly is the wind off the Atlantic; St. John's is the
 * easternmost city in North America; it nods to Niraj's Innovation East). No NL agency
 * uses it as of 2026-10-08. Rename it here and the wordmark, titles, footer and metadata
 * all follow.
 *
 * TO CONFIRM WITH NIRAJ AND ZACH:
 *  - email and phone: currently Niraj's public contacts from innovationeast.ca.
 *  - bios: Niraj's draws on his public About page; Zach's describes his role only.
 *  - photos: drop files in public/team/ and set `photo` below. Until then the tiles show
 *    initials; a photo renders in duotone on the person's colour.
 *  - social links: empty strings are hidden.
 */

export const site = {
  name: "Easterly",
  tagline: "Less noise, more signal.",
  description:
    "Web design, social media marketing and strategy for businesses that want to be noticed. A small studio in St. John's, Newfoundland and Labrador.",
  email: "niraj@innovationeast.ca",
  phone: { display: "+1 (709) 689-9907", tel: "+17096899907" },
  location: {
    city: "St. John's",
    region: "NL",
    long: "St. John's, Newfoundland and Labrador",
    served: "Atlantic Canada",
  },
  social: { linkedin: "", instagram: "" },
}

export const nav = [
  { href: "/#services", label: "Services" },
  { href: "/#approach", label: "Approach" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
]

/** The four accent colours, one per service and one per person. Muted, from the houses at dusk. */
export type Tone = "coral" | "mustard" | "sea" | "plum"
export const TONES: Record<Tone, { color: string; deep: string }> = {
  coral: { color: "#d8573a", deep: "#b3432b" },
  mustard: { color: "#d7a23f", deep: "#a87a22" },
  sea: { color: "#1e8c86", deep: "#176c67" },
  plum: { color: "#5b4a99", deep: "#41346f" },
}

export const hero = {
  eyebrow: "Design · Social · Strategy — St. John's",
  lines: [
    { text: "Less noise,", accent: false },
    { text: "more signal.", accent: true },
  ],
  sub: "Web design, social media and strategy for businesses that want to be noticed. A small studio in St. John's, Newfoundland.",
  cta: { label: "Start a project", href: "/contact" },
  scroll: { label: "See what we do", href: "#services" },
}

export const ticker = [
  "Web design",
  "Social media",
  "Strategy",
  "Brand & content",
  "St. John's, NL",
  "Fixed quotes",
  "Built in-house",
  "No account managers",
]

/** The statement that lights up word by word as you scroll into the page. */
export const manifesto =
  "We build websites that load fast, social that gets replies, and strategy that fits on one page. A two-person studio in St. John's, working for businesses that want to be noticed."

export type CoverKind = "web" | "social" | "strategy" | "brand"

export const services: { id: string; cover: CoverKind; tone: Tone; title: string; dek: string; includes: string[] }[] = [
  {
    id: "web",
    cover: "web",
    tone: "sea",
    title: "Web design & build",
    dek: "A site that loads fast, reads clearly and tells people what to do next. Designed and built in-house, launched on modern hosting, handed over with everything you need to run it.",
    includes: ["Design & copy", "Built in Next.js", "Hosting & launch"],
  },
  {
    id: "social",
    cover: "social",
    tone: "coral",
    title: "Social media marketing",
    dek: "A plan for what to say, where, and how often. Then the posts, the calendar and the monthly numbers that keep it honest.",
    includes: ["Content calendar", "Posting & replies", "Monthly report"],
  },
  {
    id: "strategy",
    cover: "strategy",
    tone: "mustard",
    title: "Strategy & positioning",
    dek: "Who you're for, what you offer and the words to say it. We do this before design, so the design has something to say.",
    includes: ["Positioning", "Offer & pricing", "Launch plan"],
  },
  {
    id: "brand",
    cover: "brand",
    tone: "plum",
    title: "Brand & content",
    dek: "The identity, photography direction and copy that make everything you put out look like it came from the same place.",
    includes: ["Identity refresh", "Copywriting", "Art direction"],
  },
]

export const steps = [
  {
    n: "01",
    title: "Listen",
    text: "A working session on what you sell, who buys it and what isn't working. We'd rather hear the awkward parts early.",
  },
  {
    n: "02",
    title: "Shape",
    text: "One plan, one fixed price. Strategy first, then design you can react to, with the copy written alongside it, not after.",
  },
  {
    n: "03",
    title: "Build & run",
    text: "We build it, launch it and stay on: monthly socials, small changes, and a report you'll actually read.",
  },
]

export const panel = {
  tag: "How it starts",
  title: "A 30-minute call. No deck, no pitch.",
  sub: "Tell us what you're working on and we'll tell you honestly whether we're the right fit, and what it would cost. Most projects start as a website that needs to work harder, a social presence that's gone quiet, or a business that's grown past the way it describes itself.",
  note: "St. John's · Atlantic Canada",
  cta: { label: "Book a call", href: "/contact" },
}

export const cta = {
  title: "Let's make something people notice.",
  accent: ["notice"],
  button: "Start a project",
}

export type Person = {
  id: string
  name: string
  role: string
  initials: string
  tone: Tone
  /** Path under /public, e.g. "/team/niraj.jpg". null shows the initials tile. */
  photo: string | null
  short: string
  bio: string[]
}

export const people: Person[] = [
  {
    id: "niraj",
    name: "Niraj Shukla",
    role: "Principal · Strategy & design",
    initials: "NS",
    tone: "coral",
    photo: null,
    short: "Leads strategy and design. Twenty years at the intersection of industry, academia and government in Atlantic Canada, and more than a decade running restaurants, which is where the marketing instinct comes from.",
    bio: [
      "Niraj leads strategy and design. He has spent his career at the intersection of industry, academia and government in Atlantic Canada: a decade with Mitacs, including five years as Regional Director for Atlantic Canada, and now Director of Intellectual Property Programs at Springboard Atlantic, helping startups and scale-ups navigate, fund and protect their ideas.",
      "The marketing instinct comes from somewhere less academic. He spent more than a decade as a franchise operator scaling multiple restaurant brands, where the website, the social feed and the sign out front all had to pay for themselves.",
      "He has an MBA and is a PhD candidate at Memorial University, holds certifications in AI policy and governance from Oxford, mentors local software founders through their first launches, and has trained as both a Commissioned and Non-Commissioned Member of the Canadian Armed Forces. He designs and builds the websites himself.",
    ],
  },
  {
    id: "zach",
    name: "Zach Valiquette",
    role: "Social media & client lead",
    initials: "ZV",
    tone: "sea",
    photo: null,
    short: "Runs the social media side and keeps every project moving. The person clients talk to most, from first call to launch and the months after.",
    bio: [
      "Zach runs the social media side of the studio: the content calendar, the posting, the replies and the monthly numbers that show whether any of it is working.",
      "He is also the person clients talk to most. From the first call to launch, and through the months of care after it, Zach is the one who knows where every project stands and what happens next.",
    ],
  },
]

export const about = {
  title: "Two people, one studio.",
  lede: "Strategy first, then design, then the long work of keeping it going.",
  body: [
    "We are a two-person studio in St. John's. Niraj leads strategy and design; Zach runs social and keeps every project moving. No account managers, no hand-offs: the people you meet on the first call are the people doing the work.",
    "We take on a small number of projects at a time, quote them at a fixed price, and build everything in-house. Websites are designed and coded here, not assembled from a template. Social plans are written for your business, not pulled from a deck.",
  ],
  closing: "We are always happy to talk about positioning, websites that need to work harder, or the absolute chaos of growing a business.",
}

export const contact = {
  lede: "Tell us what you're working on.",
  text: "A website, a social plan, a launch, or a business that just needs to explain itself better. Write a few lines and we'll come back with honest next steps and a price.",
}
