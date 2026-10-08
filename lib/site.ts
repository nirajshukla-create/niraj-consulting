/**
 * Every fact the site shows lives here. Change it once and every page updates.
 *
 * WORKING NAME: "The Narrows" is a placeholder (the Narrows is the harbour entrance of
 * St. John's). Rename it here and the wordmark, titles, footer and metadata all follow.
 *
 * TO CONFIRM WITH NIRAJ AND ZACH (written 2026-10-08):
 *  - email and phone: currently Niraj's public contacts from innovationeast.ca.
 *  - bios: Niraj's draws on his public About page; Zach's describes his role only.
 *  - photos: drop files in public/team/ and set `photo` below. Until then the site shows
 *    initials on a fog tile, framed like a portrait.
 *  - social links: empty strings are hidden.
 */

export const site = {
  name: "The Narrows",
  wordmark: { lead: "The", italic: "Narrows" },
  tagline: "Less noise, more signal.",
  description:
    "Web design, social media marketing and strategy for businesses that want to be understood. A small studio in St. John's, Newfoundland and Labrador.",
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

export const hero = {
  eyebrow: "Design · Social · Strategy — St. John's, NL",
  lines: [
    { text: "Less noise,", italic: false },
    { text: "more signal.", italic: true },
  ],
  sub: "Web design, social media and strategy for businesses that want to be understood. A small studio in St. John's, Newfoundland.",
  cta: { label: "Start a project", href: "/contact" },
  scroll: { label: "What we do", href: "#services" },
}

export type CoverKind = "web" | "social" | "strategy" | "brand"

export const services: { id: string; cover: CoverKind; title: string; dek: string; includes: string[] }[] = [
  {
    id: "web",
    cover: "web",
    title: "Web design & build",
    dek: "A site that loads fast, reads clearly and tells people what to do next. Designed and built in-house, launched on modern hosting, handed over with everything you need to run it.",
    includes: ["Design & copy", "Built in Next.js", "Hosting & launch"],
  },
  {
    id: "social",
    cover: "social",
    title: "Social media marketing",
    dek: "A plan for what to say, where, and how often. Then the posts, the calendar and the monthly numbers that keep it honest.",
    includes: ["Content calendar", "Posting & replies", "Monthly report"],
  },
  {
    id: "strategy",
    cover: "strategy",
    title: "Strategy & positioning",
    dek: "Who you're for, what you offer and the words to say it. We do this before design, so the design has something to say.",
    includes: ["Positioning", "Offer & pricing", "Launch plan"],
  },
  {
    id: "brand",
    cover: "brand",
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
  sub: "Tell us what you're working on and we'll tell you honestly whether we're the right fit, and what it would cost.",
  body: "Most projects start as a website that needs to work harder, a social presence that's gone quiet, or a business that's grown past the way it describes itself. All three are fixable, and the call is free.",
  note: "Based in St. John's. Working across Atlantic Canada.",
  cta: { label: "Book a call", href: "/contact" },
}

export type Person = {
  id: string
  name: string
  role: string
  initials: string
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
    "We are a two-person studio in St. John's. Niraj leads strategy and design; Zach runs social and keeps every project moving. There are no account managers and no hand-offs: the people you meet on the first call are the people doing the work.",
    "We take on a small number of projects at a time, quote them at a fixed price, and build everything in-house. Websites are designed and coded here, not assembled from a template. Social plans are written for your business, not pulled from a deck.",
  ],
  closing: "We are always happy to talk about positioning, websites that need to work harder, or the absolute chaos of growing a business.",
}

export const contact = {
  lede: "Tell us what you're working on.",
  text: "A website, a social plan, a launch, or a business that just needs to explain itself better. Write a few lines and we'll come back with honest next steps and a price.",
}
