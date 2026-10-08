// Generates the site's two textures with no image libraries beyond what Next installs:
//   public/hero-fog.webp  a 1600x1000 fog bank over a low dark coastline (fractal noise,
//                         domain-warped so the clouds billow instead of blurring)
//   public/grain.png      a 256px tile of gaussian film grain
//   public/og-bg.jpg      the same fog cropped to 1200x630 for the social share image
// The PNGs are written by a 40-line encoder; sharp (bundled with Next) makes the WebP/JPEG.
// Run with: pnpm textures   (deterministic: same seeds, same pixels)

import { deflateSync } from "node:zlib"
import { mkdirSync, statSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const out = join(root, "public")
mkdirSync(out, { recursive: true })

// ---------------------------------------------------------------- PNG (8-bit grey)
const CRC = new Uint32Array(256)
for (let n = 0; n < 256; n++) {
  let c = n
  for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
  CRC[n] = c >>> 0
}
function crc32(buf) {
  let c = 0xffffffff
  for (let i = 0; i < buf.length; i++) c = CRC[(c ^ buf[i]) & 0xff] ^ (c >>> 8)
  return (c ^ 0xffffffff) >>> 0
}
function chunk(type, data) {
  const len = Buffer.alloc(4)
  len.writeUInt32BE(data.length, 0)
  const td = Buffer.concat([Buffer.from(type, "ascii"), data])
  const crc = Buffer.alloc(4)
  crc.writeUInt32BE(crc32(td), 0)
  return Buffer.concat([len, td, crc])
}
function greyPng(width, height, pixels) {
  const raw = Buffer.alloc((width + 1) * height)
  for (let y = 0; y < height; y++) {
    raw[y * (width + 1)] = 0 // filter: none
    raw.set(pixels.subarray(y * width, (y + 1) * width), y * (width + 1) + 1)
  }
  const ihdr = Buffer.alloc(13)
  ihdr.writeUInt32BE(width, 0)
  ihdr.writeUInt32BE(height, 4)
  ihdr[8] = 8 // bit depth
  ihdr[9] = 0 // greyscale
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk("IHDR", ihdr),
    chunk("IDAT", deflateSync(raw, { level: 9 })),
    chunk("IEND", Buffer.alloc(0)),
  ])
}

// ---------------------------------------------------------------- noise
function rng(seed) {
  let s = seed >>> 0
  return () => {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0
    return s / 4294967296
  }
}
function makeNoise(seed) {
  const r = rng(seed)
  const p = Array.from({ length: 256 }, (_, i) => i)
  for (let i = 255; i > 0; i--) {
    const j = Math.floor(r() * (i + 1))
    ;[p[i], p[j]] = [p[j], p[i]]
  }
  const perm = new Uint8Array(512)
  for (let i = 0; i < 512; i++) perm[i] = p[i & 255]
  const grid = new Float32Array(65536)
  const r2 = rng(seed ^ 0x9e3779b9)
  for (let i = 0; i < 65536; i++) grid[i] = r2()
  const fade = (t) => t * t * t * (t * (t * 6 - 15) + 10)
  const at = (a, b) => grid[(perm[a & 255] << 8) | perm[(b + perm[a & 255]) & 255]]
  return (x, y) => {
    const xi = Math.floor(x)
    const yi = Math.floor(y)
    const u = fade(x - xi)
    const v = fade(y - yi)
    const a = at(xi, yi)
    const b = at(xi + 1, yi)
    const c = at(xi, yi + 1)
    const d = at(xi + 1, yi + 1)
    return (a * (1 - u) + b * u) * (1 - v) + (c * (1 - u) + d * u) * v
  }
}
function fbm(n, x, y, oct, gain = 0.5, lac = 2) {
  let amp = 1
  let f = 1
  let s = 0
  let norm = 0
  for (let i = 0; i < oct; i++) {
    s += amp * n(x * f, y * f)
    norm += amp
    amp *= gain
    f *= lac
  }
  return s / norm
}
const smooth = (a, b, t) => {
  const x = Math.min(1, Math.max(0, (t - a) / (b - a)))
  return x * x * (3 - 2 * x)
}
const clamp8 = (v) => Math.max(0, Math.min(255, Math.round(v * 255)))

// ---------------------------------------------------------------- fog plate
const W = 1600
const H = 1000
const nCloud = makeNoise(7)
const nWarp = makeNoise(99)
const nCoast = makeNoise(1234)
const nWater = makeNoise(4321)
const px = new Uint8Array(W * H)

// the coastline: a low, irregular silhouette around 71% down, like a headland across the harbour
const horizon = new Float32Array(W)
for (let x = 0; x < W; x++) {
  const u = x / W
  horizon[x] = 0.71 + 0.045 * (fbm(nCoast, u * 1.6 + 3.1, 0.5, 4) - 0.5) * 2 + 0.012 * (fbm(nCoast, u * 9 + 11, 2.5, 3) - 0.5) * 2
}

const t0 = Date.now()
for (let y = 0; y < H; y++) {
  const v = y / H
  for (let x = 0; x < W; x++) {
    const u = x / W
    const hz = horizon[x]
    let val
    if (v < hz) {
      const t = v / hz // 0 at the top, 1 at the coastline
      const sx = u * 3.2
      const sy = t * 1.5 * (1 + 1.1 * t) // clouds flatten as they near the horizon
      const qx = fbm(nWarp, sx + 5.2, sy + 1.3, 3)
      const qy = fbm(nWarp, sx + 1.7, sy + 9.2, 3)
      const n = fbm(nCloud, sx + 0.9 * qx, sy + 0.9 * qy, 7, 0.55)
      const wisp = fbm(nWarp, sx * 3 + 20, sy * 3 + 7, 3) // fine, faint streaks in the clear sky
      const cloud = smooth(0.42, 0.72, n) + 0.08 * (wisp - 0.5)
      const base = 0.5 + 0.1 * t // the sky lightens toward the horizon haze
      const haze = 0.12 * smooth(0.55, 1, t)
      val = base + haze + 0.3 * cloud
    } else {
      const d = (v - hz) / (1 - hz) // 0 at the coastline, 1 at the bottom
      const land = smooth(0, 0.035, d) // soft 3-4 px edge, then dark
      const streak = fbm(nWater, u * 7, v * 90, 3)
      const dark = 0.16 - 0.07 * d + 0.07 * (streak - 0.5) + 0.05 * Math.exp(-d * 16)
      const edge = 0.5 + 0.1 * smooth(0.55, 1, 1) // the haze colour the edge fades from
      val = edge * (1 - land) + dark * land
    }
    const dx = u - 0.5
    const dy = v - 0.45
    val *= 1 - 0.22 * (dx * dx * 2.2 + dy * dy * 1.6) // vignette
    px[y * W + x] = clamp8(val)
  }
}
const fogPng = greyPng(W, H, px)
writeFileSync(join(out, "hero-fog.png"), fogPng)
console.log(`fog plate: ${W}x${H}, ${(fogPng.length / 1024).toFixed(0)} KB png, ${((Date.now() - t0) / 1000).toFixed(1)}s`)

// ---------------------------------------------------------------- grain tile
const G = 256
const gp = new Uint8Array(G * G)
const gr = rng(42)
for (let i = 0; i < G * G; i++) {
  const a = gr()
  const b = gr()
  const g = Math.sqrt(-2 * Math.log(a + 1e-9)) * Math.cos(2 * Math.PI * b) // gaussian
  gp[i] = Math.max(0, Math.min(255, Math.round(128 + g * 38)))
}
const grainPng = greyPng(G, G, gp)
writeFileSync(join(out, "grain.png"), grainPng)
console.log(`grain tile: ${G}x${G}, ${(grainPng.length / 1024).toFixed(0)} KB png`)

// ---------------------------------------------------------------- webp + og
try {
  const sharp = (await import("sharp")).default
  await sharp(fogPng).webp({ quality: 74 }).toFile(join(out, "hero-fog.webp"))
  console.log(`hero-fog.webp: ${(statSync(join(out, "hero-fog.webp")).size / 1024).toFixed(0)} KB`)
  await sharp(fogPng).resize(1200, 630, { fit: "cover", position: "bottom" }).jpeg({ quality: 82 }).toFile(join(out, "og-bg.jpg"))
  console.log(`og-bg.jpg: ${(statSync(join(out, "og-bg.jpg")).size / 1024).toFixed(0)} KB`)
} catch (e) {
  console.log("sharp unavailable, keeping the PNG only:", e.message)
}
