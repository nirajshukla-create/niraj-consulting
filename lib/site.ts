/**
 * Every fact the site shows lives here. Change it once and every page updates.
 *
 * Business name: "Innovation East", matching quotes and invoices.
 * Positioning: market entry and enterprise growth for Atlantic Canadian B2B technology
 * startups and SMEs expanding across Canada and the United States.
 *
 * PLACEHOLDERS. Anything in square brackets with a capitalised key, for example
 * "[ZACH: companies]" or "[PROJECT 1: outcome]", is information nobody has supplied yet.
 * The site highlights each one so it cannot be missed. Replace the whole bracket with the
 * real fact. Do not ship to the live site while any remain. List them with:
 *
 *     pnpm placeholders
 *
 * RULES FOR THIS FILE
 *  - No invented clients, case studies, metrics, testimonials, employers, credentials or
 *    years of experience. If a fact is not known, write a placeholder.
 *  - Do not name any current or prospective client.
 *  - Every claim must be something we can back up if a funding reviewer asks.
 */

export const site = {
  name: "Innovation East",
  /** `secondary` is an optional small line under the wordmark. Empty hides it. */
  wordmark: { primary: "Innovation East", secondary: "" },
  tagline: "Ideas into action.",
  headline: "Market entry and growth for Atlantic Canadian tech companies.",
  description:
    "Innovation East helps Atlantic Canadian B2B technology startups and SMEs enter and grow in enterprise markets across Canada and the U.S. We provide market research, entry strategy, pipeline development and sales enablement, supported by senior specialists in procurement and security. Based in St. John's, Newfoundland and Labrador.",
  email: "niraj@innovationeast.ca",
  phone: { display: "709-689-9907", tel: "+17096899907" },
  address: {
    line: "PO Box 13304, Station A",
    box: "13304",
    city: "St. John's",
    region: "NL",
    postal: "A1B 4B7",
    country: "CA",
  },
  businessNumber: "738958297",
  location: {
    city: "St. John's",
    region: "NL",
    long: "St. John's, Newfoundland and Labrador",
    served: "Atlantic Canada",
  },
  social: { linkedin: "", instagram: "" },
}

/** One line, as it appears on quotes and invoices. */
export const mailingAddress = `${site.address.line}, ${site.address.city}, ${site.address.region} ${site.address.postal}`

export const nav = [
  { href: "/#services", label: "Services" },
  { href: "/#approach", label: "Approach" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
]

export const footerNav = nav

export const hero = {
  /** The large wordmark. The page's real headline is `site.headline`. */
  lines: [
    { text: "Innovation", accent: false },
    { text: "East.", accent: true },
  ],
  headline: site.headline,
  sub: "Strategy, research, pipeline development and sales enablement for B2B technology companies selling to enterprise buyers across Canada and the U.S.",
  cta: { label: "Book a 30-minute call", href: "/contact" },
}

/** The statement that lights up word by word as you scroll into the page. */
export const manifesto =
  "Moving into a new enterprise market takes more than a list of accounts. It takes evidence, an entry plan, a working pipeline and people who understand how enterprise buyers evaluate, approve and buy. We bring those pieces together for Atlantic Canadian technology companies expanding across Canada and the U.S. Based in St. John’s, working directly with your team."

export const audience = {
  title: "Who we work with.",
  lede: "Atlantic Canadian B2B technology startups and SMEs building enterprise revenue beyond their home market.",
  prioritiesLabel: "We are especially useful when you need to",
  priorities: [
    "Choose and understand a new market",
    "Build an enterprise pipeline",
    "Equip SDR and BDR teams with research, targeting and sales assets",
    "Prepare for procurement and security review",
  ],
}

/** The topics offered on the contact form. Each service points at one of them. */
export const topics = ["Market entry", "Lead generation", "Research", "Sales enablement", "Something else"] as const
export type Topic = (typeof topics)[number]

/** Which illustration a service card uses. The four drawings are part of the design system and are static. */
export type CoverKind = "web" | "social" | "strategy" | "brand"

export type Service = {
  id: string
  cover: CoverKind
  title: string
  /** One-line summary. */
  dek: string
  /** Three to five deliverables. */
  includes: string[]
  /** Capabilities that sit inside this practice area, not sold on their own. */
  also?: string
  /** The link text at the foot of the card. */
  action: string
  /** Screen-reader description of the illustration. */
  artLabel: string
  /** The contact-form topic this card preselects. */
  topic: Topic
}

export const services: Service[] = [
  {
    id: "lead-generation",
    cover: "social",
    title: "Market Development & Lead Generation",
    dek: "Campaigns, data and tracking built to seed a pipeline of qualified B2B leads.",
    includes: [
      "B2B paid campaigns: LinkedIn and high-intent search",
      "Licensed B2B data sourcing and hygiene",
      "CRM lead routing, conversion tracking and lead scoring",
      "Cost-per-qualified-lead reporting",
      "CASL-compliant practices",
    ],
    also: "Campaign creative, brand and social media content are handled inside this work.",
    action: "Build your pipeline",
    artLabel: "Illustration: one message reaching many buyers",
    topic: "Lead generation",
  },
  {
    id: "market-entry",
    cover: "strategy",
    title: "Market Entry & Channel Development",
    dek: "A practical plan for a new city or region: who buys, how they buy and who can open the door.",
    includes: [
      "Market-entry assessments for new cities and regions",
      "Enterprise procurement and security-review readiness: vendor onboarding, security questionnaires, data residency",
      "Channel-partner mapping and introductions",
      "Export pricing and commercial terms frameworks",
    ],
    action: "Plan your entry",
    artLabel: "Illustration: routes from a starting point to new markets",
    topic: "Market entry",
  },
  {
    id: "research",
    cover: "brand",
    title: "Market Research & Competitive Benchmarking",
    dek: "Evidence before spend: who you are up against, what buyers say and how big the segment is.",
    includes: [
      "Competitor benchmarking",
      "Structured enterprise buyer interviews",
      "Market and segment sizing",
      "Trade-show market briefs",
    ],
    action: "Know your market",
    artLabel: "Illustration: competitors compared side by side",
    topic: "Research",
  },
  {
    id: "sales-enablement",
    cover: "web",
    title: "Sales Enablement Assets",
    dek: "The pages, videos and documents your sales team uses with enterprise buyers.",
    includes: [
      "Vertical landing pages, designed and built in Next.js",
      "Interactive product demo videos",
      "Enterprise case studies",
      "One-pagers and capability overviews, localized for U.S. and Canadian buyers",
    ],
    also: "Web design, brand and copywriting are handled inside this work.",
    action: "Equip your sales team",
    artLabel: "Illustration: a landing page and its mobile version",
    topic: "Sales enablement",
  },
]

export const servicesNote = "Four practice areas. One accountable team."

/** The line under the services grid. */
export const terms =
  "Clearly scoped deliverables, fixed-fee or day-rate quotes, and timesheet-backed invoicing that supports government funding programs."

export const steps = [
  {
    n: "01",
    title: "Research",
    text: "Understand the market and the buyer. Competitor benchmarking, buyer interviews and segment sizing come before any spend.",
  },
  {
    n: "02",
    title: "Enter",
    text: "Map procurement, pricing and channel partners. You get a written plan for how you get in and what it takes to be approved as a vendor.",
  },
  {
    n: "03",
    title: "Generate",
    text: "Run campaigns that seed the pipeline. Paid campaigns and clean data, with leads scored and routed into your CRM.",
  },
  {
    n: "04",
    title: "Enable",
    text: "Build the assets your own sales team sells with: landing pages, demo videos, case studies and one-pagers.",
  },
]

export const approachNote = "Four steps, in order. Each one ends with a deliverable."

/** Who does what. Shown under the four steps and on the About page. */
export const ownership = "We build the pipeline and the assets. Your team owns selling and closing. We work on fees, not commission."

export const closing = {
  title: "Which market is next?",
  text: "Tell us where you sell today and where you want to sell next. We will take it from there.",
  cta: "Book a 30-minute call",
}

export type Person = {
  id: string
  name: string
  /** Letters after the name, shown beside it. */
  credentials?: string
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
    credentials: "MBA",
    role: "Principal, Strategic Direction",
    initials: "NS",
    photo: "/team/niraj.jpg",
    short: "Provides strategic direction for Innovation East engagements. More than a decade innovation support, he has scaled his own business and helped other SMEs increase sales and break into new markets.",
    bio: [
      "Niraj provides strategic direction for Innovation East engagements, with a focus on commercialization, market entry and growth.",
      "He spent a decade with Mitacs, including five years as Regional Director for Atlantic Canada, and mentors local software founders through their first launches.",
      "He also spent more than ten years as a franchise operator, scaling multi-location restaurant brands. That operating experience is directly relevant to technology companies selling to hospitality groups and multi-location operators.",
      "He has an MBA and is a PhD candidate at Memorial University.",
    ],
  },
  {
    id: "zach",
    name: "Zach Valiquette",
    role: "Partner, Market Development & Enterprise Sales",
    initials: "ZV",
    photo: "/team/zach.jpg",
    short: "Leads market development and client delivery. Five years in SaaS startups, working directly with SDRs and BDRs to grow sales teams selling into enterprise accounts.",
    bio: [
      "Zach leads market development and is your day-to-day client lead.",
      "He has spent five years in SaaS startup environments, helping scale sales teams and working directly with SDRs, BDRs and enterprise buyers.",
      "That hands-on experience shapes how he approaches pipeline development, sales-team execution and conversations with enterprise buyers.",
    ],
  },
]

/** The specialist disciplines we bring in from our network. */
export const network = [
  "Enterprise procurement",
  "Security readiness",
  "Paid media",
  "Data and research",
  "Web development",
  "Video production",
  "Design",
]

export const about = {
  title: "Who you'll work with.",
  teamNote:
    "A senior-led core team, backed by a roster of experienced consultants. Innovation East remains accountable for quality, schedule and cost.",
  networkLabel: "Consultant network",
  lede: "Senior-led. Specialist depth when the work needs it. One firm accountable.",
  body: [
    "Innovation East is led by Niraj and Zach. Niraj provides strategic direction. Zach leads market development and is your day-to-day client lead.",
    "For each engagement, we bring in senior consultants from our network as the work requires. The roster includes people with leadership experience in enterprise procurement and security, alongside specialists in paid media, research, web development, video and design.",
    ownership,
  ],
  closing: "If you are weighing a new market, start with a 30-minute call.",
}

export const contact = {
  lede: "Tell us which market you are looking at.",
  text: "A new city, a pipeline that has stalled, a buyer you need to understand, or sales assets you need built. Write a few lines and we will come back with next steps and how we would scope the work.",
}
