/**
 * Every fact the site shows lives here. Change it once and every page updates.
 *
 * Business name: "Innovation East", matching quotes and invoices.
 * Positioning: export market entry and enterprise sales enablement for Atlantic Canadian
 * tech startups and SMEs expanding into mainland Canada and the United States.
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
    "Innovation East helps Atlantic Canadian B2B tech startups and SMEs enter mainland Canadian and U.S. markets: market research, market-entry planning, lead generation and sales enablement assets. Based in St. John's, Newfoundland and Labrador.",
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
  { href: "/#experience", label: "Experience" },
  { href: "/#design-lab", label: "Design lab" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
]

export const hero = {
  eyebrow: "Market entry & growth for tech companies",
  /** The large wordmark. The page's real headline is `site.headline`. */
  lines: [
    { text: "Innovation", accent: false },
    { text: "East.", accent: true },
  ],
  headline: site.headline,
  sub: "Strategy, pipeline, research and sales assets that help B2B startups win enterprise buyers in Canada and the U.S.",
  cta: { label: "Book a 30-minute call", href: "/contact" },
  scroll: { label: "See what we do", href: "#services" },
  /** The panel the photograph resolves into as you scroll. Three short words. */
  arrival: {
    note: ["A clear way into a new market.", "Then the pipeline to grow there."],
    words: ["Markets.", "Pipeline.", "Assets."],
  },
}

/** The statement that lights up word by word as you scroll into the page. */
export const manifesto =
  "Local traction is one thing. Enterprise buyers in mainland Canada and the United States are another. We help Atlantic Canadian tech companies make that move: research the market, plan the entry, build the pipeline and produce the assets your sales team sells with. Based in St. John’s, working directly with you."

export const audience = {
  title: "Who we work with.",
  lede: "Atlantic Canadian SaaS and tech startups and SMEs moving from local traction to national and U.S. markets.",
  sectorsLabel: "Especially companies selling into",
  sectors: ["Property management", "Multi-location retail", "Hospitality"],
}

/** The topics offered on the contact form. Each service points at one of them. */
export const topics = ["Market entry", "Lead generation", "Research", "Sales enablement", "Something else"] as const
export type Topic = (typeof topics)[number]

/** Which illustration a service card uses. The four drawings are part of the design system. */
export type CoverKind = "web" | "social" | "strategy" | "brand"

export type Service = {
  id: string
  cover: CoverKind
  /** Short label above the illustration. */
  category: string
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
  /** The three stages named under the illustration as it assembles. */
  phases: [string, string, string]
  /** The contact-form topic this card preselects. */
  topic: Topic
}

export const services: Service[] = [
  {
    id: "lead-generation",
    cover: "social",
    category: "Pipeline",
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
    phases: ["Audience", "Campaign", "Qualified lead"],
    topic: "Lead generation",
  },
  {
    id: "market-entry",
    cover: "strategy",
    category: "Market entry",
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
    phases: ["Options", "Partners", "Entry plan"],
    topic: "Market entry",
  },
  {
    id: "research",
    cover: "brand",
    category: "Research",
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
    phases: ["Sources", "Comparison", "Findings"],
    topic: "Research",
  },
  {
    id: "sales-enablement",
    cover: "web",
    category: "Sales assets",
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
    phases: ["Wireframe", "Design", "Launch"],
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

export const panel = {
  tag: "How it starts",
  title: "A 30-minute call. No deck, no pitch.",
  sub: "Tell us which market you are looking at and where your pipeline stands. We will talk through the fit, the next steps and how the work would be scoped and priced.",
  note: "St. John's · Atlantic Canada",
  cta: { label: "Book a 30-minute call", href: "/contact" },
}

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
    role: "Principal, Strategy & Market Entry",
    initials: "NS",
    photo: "/team/niraj.jpg",
    short: "Leads strategy and market entry. A decade at Mitacs, including five years as Regional Director for Atlantic Canada, and now Director of Intellectual Property Programs at Springboard Atlantic.",
    bio: [
      "Niraj leads strategy and market entry. His work is with startups on commercialization and go-to-market: he mentors local software founders through their first launches, and he is Director of Intellectual Property Programs at Springboard Atlantic, helping startups and scale-ups navigate, fund and protect their ideas.",
      "Before that he spent a decade with Mitacs, including five years as Regional Director for Atlantic Canada.",
      "He also spent more than a decade as a franchise operator, scaling multiple restaurant brands. He has an MBA and is a PhD candidate at Memorial University.",
    ],
  },
  {
    id: "zach",
    name: "Zach Valiquette",
    role: "Partner, Market Development & Enterprise Sales",
    initials: "ZV",
    photo: null,
    short: "Leads market development and is your client lead. SDR and BDR experience with startups at [ZACH: companies] over [ZACH: years].",
    bio: [
      "Zach leads market development and enterprise sales support. His background is in SDR and BDR roles with startups at [ZACH: companies], over [ZACH: years].",
      "He has built and run outbound prospecting programs, worked enterprise buying cycles from first contact to qualified opportunity, and built pipeline in [ZACH: segments sold into].",
      "[ZACH: one or two verifiable results]",
      "He is also your client lead. From the first call through delivery, Zach knows where each engagement stands and what happens next.",
    ],
  },
]

/** The specialist disciplines we bring in from our network. */
export const network = ["Paid media", "Data and research", "Web development", "Video production", "Design"]

export const about = {
  title: "Who you'll work with.",
  teamNote:
    "A principal-led core team, plus a vetted network of specialists. Innovation East is accountable for quality, schedule and cost.",
  networkLabel: "Specialist network",
  lede: "Principal-led. Specialists where the work needs them. One firm accountable.",
  body: [
    "Innovation East is a principal-led core team. Niraj leads strategy and market entry. Zach leads market development and is your client lead.",
    "For each engagement we bring in vetted specialists from our network: paid media, data and research, web development, video production and design. You deal with one firm. Innovation East is accountable for quality, schedule and cost.",
    ownership,
  ],
  closing: "If you are weighing a new market, start with a 30-minute call.",
}

/**
 * Real, anonymized B2B or startup engagements. Every field is a placeholder until the
 * facts are supplied. Do not fill these with invented examples, and do not name a client.
 */
export type Engagement = { id: string; sector: string; challenge: string; delivered: string; outcome: string }
export const experience: { title: string; note: string; items: Engagement[] } = {
  title: "Relevant experience.",
  note: "Selected B2B and startup engagements. Clients are not named.",
  items: [
    {
      id: "project-1",
      sector: "[PROJECT 1: sector]",
      challenge: "[PROJECT 1: challenge]",
      delivered: "[PROJECT 1: what we delivered]",
      outcome: "[PROJECT 1: outcome]",
    },
    {
      id: "project-2",
      sector: "[PROJECT 2: sector]",
      challenge: "[PROJECT 2: challenge]",
      delivered: "[PROJECT 2: what we delivered]",
      outcome: "[PROJECT 2: outcome]",
    },
    {
      id: "project-3",
      sector: "[PROJECT 3: sector]",
      challenge: "[PROJECT 3: challenge]",
      delivered: "[PROJECT 3: what we delivered]",
      outcome: "[PROJECT 3: outcome]",
    },
  ],
}

export const designLab = {
  title: "Concept work.",
  note: "Two self-initiated design studies for fictional brands. They show how we approach design. They are not client projects.",
}

export const contact = {
  lede: "Tell us which market you are looking at.",
  text: "A new city, a pipeline that has stalled, a buyer you need to understand, or sales assets you need built. Write a few lines and we will come back with next steps and how we would scope the work.",
}
