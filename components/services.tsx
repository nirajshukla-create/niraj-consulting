import Link from "next/link"
import { services, servicesNote, terms, type CoverKind } from "@/lib/site"
import { ServiceArtMotion } from "./service-motion"
import "./services.css"
import "./market-sections.css"

/**
 * Original illustrations, not client case studies. Each practice area in lib/site.ts picks
 * one by its `cover`: reach (social), routes (strategy), comparison (brand), a page (web).
 */
function ServiceArtwork({ kind }: { kind: CoverKind }) {
  if (kind === "web") {
    return (
      <svg viewBox="0 0 600 410" className="service-art__drawing" aria-hidden="true" focusable="false">
        <path d="M0 333H600M62 0V410M538 0V410" fill="none" stroke="#000000" strokeOpacity=".13" />
        <circle cx="509" cy="74" r="42" fill="none" stroke="#000000" strokeOpacity=".25" />
        <g className="service-art__piece service-art__piece--main"><g transform="rotate(-5 300 205)">
          <rect x="96" y="62" width="432" height="299" fill="#000000" fillOpacity=".2" />
          <rect x="80" y="46" width="432" height="299" fill="#f7f6f0" stroke="#000000" strokeWidth="1.4" />
          <path d="M80 86H512" stroke="#000000" strokeWidth="1.2" />
          <circle cx="99" cy="66" r="3" fill="#a65632" />
          <circle cx="110" cy="66" r="3" fill="#d4c5b5" />
          <circle cx="121" cy="66" r="3" fill="#cbc8bd" />
          <path className="service-art__ambient service-art__trace" pathLength="1" d="M220 66H372" stroke="#000000" strokeOpacity=".2" />
          <g className="service-art__wireframe" fill="none" stroke="#000000" strokeOpacity=".4" strokeWidth="1.1">
            <rect x="104" y="108" width="380" height="214" />
            <path d="M104 155H484M341 155V322M104 268H341M341 155L484 322M484 155L341 322" />
            <path d="M121 183H310M121 202H294M121 228H247M121 293H204" strokeWidth="7" />
          </g>
          <g className="service-art__skin">
          <path className="service-art__ambient service-art__trace service-art__trace--later" pathLength="1" d="M108 112H170M108 122H148" stroke="#000000" strokeWidth="3" />
          <path d="M471 111H484M471 116H484" stroke="#000000" />
          <text x="104" y="203" className="service-art__display" fontSize="46" fontWeight="800" letterSpacing="-.8">A good</text>
          <text x="104" y="255" className="service-art__display" fontSize="46" fontWeight="800" letterSpacing="-.8">place to land.</text>
          <rect x="108" y="277" width="114" height="34" rx="17" fill="#000000" />
          <text x="124" y="299" fill="#f7f6f0" className="service-art__display" fontSize="17">Explore</text>
          <path d="M197 288L204 294L197 300M189 294H204" fill="none" stroke="#f7f6f0" strokeWidth="1.5" />
          <circle cx="436" cy="177" r="40" fill="#a65632" />
          <path d="M414 177H458M446 165L458 177L446 189" fill="none" stroke="#000000" strokeWidth="3" />
          <path className="service-art__ambient service-art__trace service-art__trace--last" pathLength="1" d="M363 294H484M363 300H456" stroke="#000000" strokeOpacity=".3" />
          </g>
        </g></g>
        <g className="service-art__piece service-art__piece--back"><g transform="rotate(9 483 260)">
          <rect x="422" y="148" width="131" height="225" rx="17" fill="#000000" fillOpacity=".2" />
          <rect x="414" y="139" width="131" height="225" rx="17" fill="#000000" />
          <rect x="421" y="147" width="117" height="209" rx="11" fill="#a65632" />
          <rect x="458" y="153" width="43" height="5" rx="2.5" fill="#000000" />
          <text x="434" y="204" className="service-art__display" fontSize="27" fontWeight="800">Made</text>
          <text x="434" y="235" className="service-art__display" fontSize="27" fontWeight="800">to move.</text>
          <circle cx="479" cy="289" r="35" fill="#000000" />
          <path d="M461 289H497M486 278L497 289L486 300" fill="none" stroke="#f2f3f1" strokeWidth="3" />
          <path d="M462 341H497" stroke="#000000" strokeWidth="3" strokeLinecap="round" />
        </g></g>
        <g className="service-art__piece service-art__piece--float"><path d="M501 329L517 365L524 349L540 341Z" fill="#000000" stroke="#f7f6f0" strokeWidth="2" /></g>
      </svg>
    )
  }

  if (kind === "social") {
    return (
      <svg viewBox="0 0 600 410" className="service-art__drawing" aria-hidden="true" focusable="false">
        <g className="service-art__piece service-art__piece--back"><g transform="translate(-32 0)">
          <rect x="79" y="68" width="227" height="281" fill="#f2f3f1" />
          <path d="M105 104H279M105 116H218" stroke="#000000" strokeOpacity=".4" />
          <g className="service-art__ambient service-art__globe">
          <circle cx="193" cy="231" r="77" fill="#cbc8bd" />
          <path d="M193 164C161 195 161 265 193 298M193 164C225 195 225 265 193 298M119 231H267M133 194H253M133 269H253" fill="none" stroke="#000000" strokeWidth="1.1" />
          </g>
          <path d="M114 315H270" stroke="#000000" strokeOpacity=".3" />
        </g></g>
        <g className="service-art__piece service-art__piece--main"><g transform="translate(71 0)">
          <rect x="236" y="48" width="254" height="326" fill="#000000" fillOpacity=".2" />
          <rect x="222" y="35" width="254" height="326" fill="#000000" />
          <text x="241" y="132" fill="#f2f3f1" className="service-art__display" fontSize="63" fontWeight="800" letterSpacing="-1">Find</text>
          <text x="241" y="190" fill="#f2f3f1" className="service-art__display" fontSize="53" fontWeight="800" letterSpacing="-1">your</text>
          <text x="241" y="248" fill="#f2f3f1" className="service-art__display" fontSize="53" fontWeight="800" letterSpacing="-1">buyer.</text>
          <path className="service-art__ambient service-art__trace" pathLength="1" d="M242 268C278 254 311 281 349 269C386 257 412 265 448 262" fill="none" stroke="#d4c5b5" strokeWidth="5" />
          <path d="M246 326H339" stroke="#f2f3f1" strokeOpacity=".3" strokeWidth="2" />
        </g></g>
        <g className="service-art__piece service-art__piece--float"><g transform="translate(16 54)">
          <rect x="427" y="255" width="108" height="47" rx="23.5" fill="#d4c5b5" />
          <path className="service-art__ambient service-art__pulse" d="M447 278C447 273 454 271 458 277C463 270 470 273 470 278C470 283 458 290 458 290C458 290 447 283 447 278Z" fill="#000000" />
          <text x="478" y="284" className="service-art__display" fontSize="15" fontWeight="700">Hi!</text>
        </g></g>
      </svg>
    )
  }

  if (kind === "strategy") {
    return (
      <svg viewBox="0 0 600 410" className="service-art__drawing" aria-hidden="true" focusable="false">
        <defs>
          <pattern id="strategy-dots" width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="12" cy="12" r="1" fill="#000000" fillOpacity=".18" />
          </pattern>
        </defs>
        <rect width="600" height="410" fill="url(#strategy-dots)" />
        <g>
          <path className="service-art__route" pathLength="1" d="M141 129C210 129 190 214 246 214M354 214C401 214 391 110 450 110M353 214C411 214 393 318 450 318" fill="none" stroke="#000000" strokeWidth="1.6" />
          <path className="service-art__ambient service-art__flow" pathLength="1" d="M141 129C210 129 190 214 246 214M354 214C401 214 391 110 450 110M353 214C411 214 393 318 450 318" fill="none" stroke="#000000" strokeWidth="4" strokeLinecap="round" />
          <path d="M441 105L450 110L441 115M441 313L450 318L441 323" fill="none" stroke="#000000" strokeWidth="1.6" />
          <g className="service-art__piece service-art__piece--left"><g transform="rotate(-6 135 124)">
            <rect x="57" y="72" width="158" height="109" fill="#f2f3f1" />
            <text x="75" y="121" className="service-art__display" fontSize="24" fontWeight="700">Local</text>
            <text x="75" y="151" className="service-art__display" fontSize="24" fontWeight="700">traction.</text>
          </g></g>
          <g className="service-art__piece service-art__piece--core">
          <circle cx="300" cy="214" r="77" fill="#000000" />
          <circle className="service-art__ambient service-art__ring" cx="300" cy="214" r="66" fill="none" stroke="#f2f3f1" strokeOpacity=".6" strokeDasharray="18 12" />
          <text x="300" y="207" textAnchor="middle" fill="#f2f3f1" className="service-art__display" fontSize="30" fontWeight="700">Entry</text>
          <text x="300" y="241" textAnchor="middle" fill="#f2f3f1" className="service-art__display" fontSize="30" fontWeight="700">plan.</text>
          </g>
          <g className="service-art__piece service-art__piece--right"><g transform="rotate(5 467 110)">
            <rect x="409" y="70" width="140" height="79" fill="#a65632" />
            <text x="424" y="105" className="service-art__display" fontSize="23" fontWeight="700">New</text>
            <text x="424" y="132" className="service-art__display" fontSize="23" fontWeight="700">market.</text>
          </g></g>
          <g className="service-art__piece service-art__piece--lower"><g transform="rotate(-3 463 316)">
            <rect x="406" y="278" width="146" height="81" fill="#cbc8bd" />
            <text x="423" y="312" className="service-art__display" fontSize="23" fontWeight="700">Channel</text>
            <text x="423" y="340" className="service-art__display" fontSize="23" fontWeight="700">partner.</text>
          </g></g>
          <path d="M120 258C118 239 158 248 151 273C146 293 111 292 112 272C114 251 174 258 167 281" fill="none" stroke="#000000" strokeWidth="1.5" />
        </g>
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 600 410" className="service-art__drawing" aria-hidden="true" focusable="false">
      <g className="service-art__piece service-art__piece--back"><g transform="rotate(6 406 208)">
        <rect className="service-art__identity-plane" x="304" y="44" width="213" height="315" fill="#a65632" />
        <g className="service-art__skin">
        <text x="320" y="189" fill="#000000" className="service-art__display" fontSize="112" fontWeight="700" letterSpacing="-2">vs</text>
        <path d="M326 214H494" stroke="#000000" strokeOpacity=".4" />
        <text x="356" y="248" fill="#000000" className="service-art__display" fontSize="28" letterSpacing="2">A · B · C</text>
        </g>
        <rect x="326" y="293" width="37" height="38" fill="#a65632" />
        <rect x="369" y="293" width="37" height="38" fill="#d4c5b5" />
        <rect x="412" y="293" width="37" height="38" fill="#cbc8bd" />
        <rect x="455" y="293" width="37" height="38" fill="#f2f3f1" />
      </g></g>
      <g className="service-art__piece service-art__piece--main"><g transform="rotate(-8 209 216)">
        <rect className="service-art__identity-paper" x="79" y="87" width="266" height="272" fill="#000000" fillOpacity=".17" />
        <rect className="service-art__identity-paper" x="67" y="75" width="266" height="272" fill="#f2f3f1" />
        <path d="M94 112H306" stroke="#000000" strokeOpacity=".3" />
        <g className="service-art__skin">
        <text x="90" y="187" className="service-art__display" fontSize="47" fontWeight="700" letterSpacing="-.5">Ask.</text>
        <text x="90" y="247" className="service-art__display" fontSize="47" fontWeight="700" letterSpacing="-.5">Measure.</text>
        <path className="service-art__ambient service-art__trace" pathLength="1" d="M94 290H272M94 304H230" stroke="#000000" strokeOpacity=".3" strokeWidth="2" />
        </g>
        <g className="service-art__identity-mark" fill="#000000">
          <circle cx="164" cy="210" r="48" />
          <path d="M218 162L270 210L218 258Z" />
        </g>
      </g></g>
      <g className="service-art__piece service-art__piece--float"><g transform="rotate(9 422 323)">
        <rect x="343" y="282" width="169" height="80" fill="#deded8" />
        <circle className="service-art__ambient service-art__swatch" cx="385" cy="322" r="24" fill="#000000" />
        <circle className="service-art__ambient service-art__swatch service-art__swatch--second" cx="421" cy="322" r="24" fill="#a65632" />
        <circle className="service-art__ambient service-art__swatch service-art__swatch--third" cx="457" cy="322" r="24" fill="#d4c5b5" />
      </g></g>
      <path d="M518 29V49M508 39H528" stroke="#f2f3f1" strokeWidth="1.2" />
      <path d="M59 363V383M49 373H69" stroke="#f2f3f1" strokeWidth="1.2" />
    </svg>
  )
}

export function Services() {
  return (
    <section className="studio-services" id="services" aria-labelledby="services-title">
      <div className="editorial-shell">
        <header className="editorial-heading">
          <p className="editorial-heading__label">03 — Expertise</p>
          <div className="editorial-heading__content">
            <h2 id="services-title" className="editorial-heading__title">What we do.</h2>
            <p className="editorial-heading__note">{servicesNote}</p>
          </div>
        </header>
        <div className="studio-services__grid">
          {services.map((service, index) => (
              <article className="service-editorial" key={service.id}>
                <Link href={`/contact?about=${service.id}`} className="service-editorial__link" aria-labelledby={`service-${service.id}-title`}>
                  <p className="service-editorial__category"><span aria-hidden="true">0{index + 1}</span>{service.category}</p>
                  <ServiceArtMotion kind={service.cover} caption={service.artLabel} phases={service.phases}>
                    <ServiceArtwork kind={service.cover} />
                  </ServiceArtMotion>
                  <div className="service-editorial__body">
                    <div className="service-editorial__heading">
                      <h3 id={`service-${service.id}-title`}>{service.title}</h3>
                    </div>
                    <p className="service-editorial__dek">{service.dek}</p>
                    <ul className="service-editorial__includes">
                      {service.includes.map((item) => <li key={item}>{item}</li>)}
                    </ul>
                    {service.also && <p className="service-editorial__also">{service.also}</p>}
                    <span className="service-editorial__cta">{service.action} <span aria-hidden="true">↗</span></span>
                  </div>
                </Link>
              </article>
          ))}
        </div>
        <div className="studio-services__terms">
          <span>How we quote</span>
          <p>{terms}</p>
        </div>
      </div>
    </section>
  )
}
