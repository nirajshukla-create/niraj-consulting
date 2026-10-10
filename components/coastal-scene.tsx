import type { CSSProperties } from "react"

/** An original, code-drawn interpretation of the colourful harbour at St. John's. */
const houses = [
  { x: -28, y: 151, w: 105, h: 145, c: "#b85d48", roof: 1 },
  { x: 82, y: 122, w: 88, h: 174, c: "#ccaa5f", roof: 0 },
  { x: 175, y: 163, w: 93, h: 133, c: "#648d82", roof: 1 },
  { x: 273, y: 112, w: 97, h: 184, c: "#8a859f", roof: 0 },
  { x: 375, y: 140, w: 83, h: 156, c: "#c37656", roof: 1 },
  { x: 463, y: 95, w: 104, h: 201, c: "#c6b890", roof: 0 },
  { x: 572, y: 127, w: 89, h: 169, c: "#587f81", roof: 1 },
  { x: 666, y: 156, w: 96, h: 140, c: "#ba735e", roof: 0 },
  { x: 767, y: 178, w: 85, h: 118, c: "#b19558", roof: 1 },
  { x: 857, y: 189, w: 88, h: 107, c: "#718279", roof: 0 },
]

export function CoastalScene() {
  return (
    <svg className="coast" viewBox="0 0 1600 420" fill="none" preserveAspectRatio="xMidYMax slice" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="coast-water" x1="800" y1="298" x2="800" y2="420" gradientUnits="userSpaceOnUse"><stop stopColor="#202020" /><stop offset="1" stopColor="#000000" /></linearGradient>
        <linearGradient id="coast-light"><stop stopColor="#efd8a0" stopOpacity="0" /><stop offset="1" stopColor="#efd8a0" stopOpacity=".22" /></linearGradient>
      </defs>
      <path className="coast__hills" d="M0 233C187 200 256 258 400 229S635 145 839 211 1038 239 1130 179 1310 145 1600 221V320H0Z" fill="#151515" />
      <g className="coast__sky-mark">
      <circle cx="1344" cy="84" r="44" fill="#e1d7b8" />
      <circle cx="1344" cy="84" r="60" stroke="#e1d7b8" strokeOpacity=".12" />
      <path className="coast__beam" d="M1397 134 710 38V240Z" fill="url(#coast-light)" />
      </g>
      <g className="coast__street">
        {houses.map((h, i) => {
          const rows = Math.floor((h.h - 38) / 42)
          return <g className="coast__house" key={h.x} style={{ "--house-i": i, "--house-x": (i - 4.5) * 12, "--house-rise": 25 + (i % 4) * 19, "--house-angle": (i % 2 ? 1 : -1) * (3 + i % 3) } as CSSProperties}>
            <rect x={h.x + h.w - 23} y={h.y - 26} width="10" height="25" fill="#242424" />
            <path d={h.roof ? `M${h.x-3} ${h.y}L${h.x+h.w/2} ${h.y-30}L${h.x+h.w+3} ${h.y}Z` : `M${h.x-3} ${h.y}L${h.x+9} ${h.y-17}H${h.x+h.w-9}L${h.x+h.w+3} ${h.y}Z`} fill="#242424" />
            <rect x={h.x} y={h.y} width={h.w} height={h.h} fill={h.c} />
            {Array.from({ length: Math.floor(h.h / 8) }, (_, j) => <path key={j} d={`M${h.x} ${h.y+8*j}h${h.w}`} stroke="#000000" strokeOpacity=".13" />)}
            <rect x={h.x+h.w-8} y={h.y} width="8" height={h.h} fill="#000000" fillOpacity=".2" />
            <path d={`M${h.x-3} ${h.y}h${h.w+6}`} stroke="#eee5d0" strokeOpacity=".7" strokeWidth="3" />
            {Array.from({ length: rows * 2 }, (_, j) => {
              const x = h.x + 18 + (j % 2) * (h.w-43)
              const y = h.y + 16 + Math.floor(j / 2) * 42
              const lit = (i+j) % 3 !== 0
              return <g key={j}>
                <rect x={x-2} y={y-2} width="20" height="29" fill="#e2d9c2" fillOpacity=".75" />
                <rect x={x} y={y} width="16" height="25" fill={lit ? "#e1bc7f" : "#202020"} />
                <path d={`M${x+8} ${y}v25M${x} ${y+12}h16`} stroke="#3b3b3b" strokeOpacity=".7" strokeWidth="1.5" />
                <path d={`M${x-4} ${y+28}h24`} stroke="#e2d9c2" strokeOpacity=".7" strokeWidth="3" />
              </g>
            })}
            <rect x={h.x+h.w/2-11} y="260" width="22" height="36" fill="#e6ddc8" />
            <rect x={h.x+h.w/2-8} y="263" width="16" height="33" fill="#242424" />
            <circle cx={h.x+h.w/2+4} cy="281" r="1.4" fill="#d7b879" />
          </g>
        })}
      </g>
      <g className="coast__headland">
      <path d="M922 298 1014 263 1090 276 1159 233 1220 242 1309 191 1425 180 1503 221 1600 226V322H922Z" fill="#353535" />
      <path d="M1110 296 1220 254 1290 265 1362 226 1467 251 1600 259V324H1110Z" fill="#222222" />
      <path d="m1320 277 49-32m91-18 42 12m-276 37 29-12" stroke="#73857b" strokeOpacity=".3" />
      <g className="coast__lighthouse">
        <path d="m1381 147-10 82h52l-10-82" fill="#e8dfca" />
        <path d="m1413 147 10 82h-10l-8-82" fill="#b2b4a4" />
        <path d="M1378 174h38l3 20h-43Z" fill="#cb6a50" />
        <path d="M1380 126h34v22h-34Z" fill="#d9d3bd" />
        <path d="M1385 130h24v12h-24Z" fill="#e9c78a" />
        <path d="M1392 129v14m9-14v14" stroke="#303030" strokeWidth="2" />
        <path d="m1375 126 22-17 22 17Z" fill="#333333" />
        <path d="M1374 146h46m-44 5h42" stroke="#333333" strokeWidth="3" />
        <path d="M1393 209h9v20h-9Z" fill="#202020" />
      </g>
      </g>
      <g className="coast__water">
      <path d="M0 296h945l39 13h616v111H0Z" fill="url(#coast-water)" />
      <path d="M0 300h938" stroke="#d8c49b" strokeOpacity=".45" strokeWidth="2" />
      <g stroke="#a5b9af" strokeOpacity=".22" strokeLinecap="round">
        <path d="M59 334h190m37 0h88m299 0h104m405 0h261M150 356h285m265 0h111m74 0h228m120 0h142M37 383h122m130 0h138m231 0h274m144 0h321" />
      </g>
      <g stroke="#e4c394" strokeOpacity=".17" strokeWidth="3"><path d="M480 324h54m-46 9h44m-52 10h66m-42 11h24M1371 320h55m-43 11h37m-52 11h62m-41 13h27" /></g>
      </g>
      <path d="m1083 109 7-4 7 4m-46-17 8-4 7 4" stroke="#b6bdb0" strokeOpacity=".6" strokeWidth="1.5" />
    </svg>
  )
}
