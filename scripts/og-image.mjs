// Regenerates public/og-image.png (1200×630) from the numbers in
// src/config/site.ts, so the social card can never advertise a different
// test count than the page. Run `npm run og` after updating `stats`.
//
// Composition: cream background with the site's halftone + coral glow,
// headline, a two-line subhead, the stats line, and the dashboard
// screenshot bleeding off the bottom-right corner in a rounded frame.
import { readFileSync, statSync } from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

import sharp from "sharp"

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const siteTs = readFileSync(path.join(root, "src/config/site.ts"), "utf8")

const num = (key) => {
  const match = siteTs.match(new RegExp(`${key}:\\s*(\\d+)`))
  if (!match) throw new Error(`stats.${key} not found in src/config/site.ts`)
  return Number(match[1])
}
const str = (key) => {
  const match = siteTs.match(new RegExp(`${key}:\\s*"([^"]+)"`))
  if (!match) throw new Error(`${key} not found in src/config/site.ts`)
  return match[1]
}

const stats = {
  backend: num("backendTests"),
  frontend: num("frontendTests"),
  i18n: num("i18nCoverage"),
}
const domain = str("domain")

const W = 1200
const H = 630
const CREAM = "#FAF8F2"
const INK = "#16100D"
const CORAL = "#D96B4A"
const MUTED = "#6F675C"
const SANS = "'Helvetica Neue', Helvetica, Arial, sans-serif"
const MONO = "Menlo, 'SF Mono', Consolas, monospace"

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;")

// Screenshot: 620 wide, top 300px, rounded corners, anchored bottom-right.
const SHOT = { x: 580, y: 330, w: 620, h: 300, r: 16 }

const base = `
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs>
    <pattern id="dots" width="6" height="6" patternUnits="userSpaceOnUse">
      <circle cx="1" cy="1" r="1" fill="${INK}" fill-opacity="0.07"/>
    </pattern>
    <radialGradient id="glow" gradientUnits="userSpaceOnUse" cx="140" cy="60" r="560">
      <stop offset="0" stop-color="${CORAL}" stop-opacity="0.30"/>
      <stop offset="1" stop-color="${CORAL}" stop-opacity="0"/>
    </radialGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="160%">
      <feGaussianBlur stdDeviation="18"/>
    </filter>
  </defs>

  <rect width="${W}" height="${H}" fill="${CREAM}"/>
  <rect width="${W}" height="${H}" fill="url(#dots)"/>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>

  <!-- Drop shadow under the screenshot frame -->
  <rect x="${SHOT.x}" y="${SHOT.y + 14}" width="${SHOT.w}" height="${SHOT.h}" rx="${SHOT.r}"
        fill="${INK}" fill-opacity="0.22" filter="url(#shadow)"/>

  <g font-family="${SANS}">
    <text x="114" y="88" font-size="22" font-weight="600" letter-spacing="-0.3" fill="${INK}">${esc(domain)}</text>

    <text x="64" y="152" font-family="${MONO}" font-size="14" letter-spacing="3.2" fill="${MUTED}">2026 EDITION  ·  PRODUCTION-READY  ·  DJANGO + NEXT.JS</text>

    <text x="62" y="240" font-size="66" font-weight="700" letter-spacing="-2.6" fill="${INK}">Ship the SaaS.</text>
    <text x="62" y="312" font-size="66" font-weight="700" letter-spacing="-2.6" fill="${MUTED}">Skip the scaffolding.</text>

    <text x="64" y="372" font-size="21" fill="${INK}" fill-opacity="0.82">Auth, multi-tenant, Stripe billing, roles, 2FA, i18n —</text>
    <text x="64" y="401" font-size="21" fill="${INK}" fill-opacity="0.82">already wired and tested.</text>

    <g font-family="${MONO}" font-size="14" letter-spacing="2.4" fill="${MUTED}">
      <text x="64" y="462"><tspan fill="${INK}" font-weight="700">${stats.backend}</tspan> BACKEND TESTS  ·  <tspan fill="${INK}" font-weight="700">${stats.frontend}</tspan> FRONTEND TESTS</text>
      <text x="64" y="490"><tspan fill="${INK}" font-weight="700">${stats.i18n}%</tspan> I18N  ·  <tspan fill="${INK}" font-weight="700">∞</tspan> PROJECTS  ·  ONE-TIME LICENSE</text>
    </g>
  </g>
</svg>`

const frame = `
<svg xmlns="http://www.w3.org/2000/svg" width="${SHOT.w}" height="${SHOT.h}">
  <rect x="0.5" y="0.5" width="${SHOT.w - 1}" height="${SHOT.h - 1}" rx="${SHOT.r}" fill="none" stroke="${INK}" stroke-opacity="0.18"/>
</svg>`

const mask = `
<svg xmlns="http://www.w3.org/2000/svg" width="${SHOT.w}" height="${SHOT.h}">
  <rect width="${SHOT.w}" height="${SHOT.h}" rx="${SHOT.r}" fill="#fff"/>
</svg>`

const screenshot = await sharp(
  path.join(root, "public/screenshots/dashboard.webp")
)
  .resize({ width: SHOT.w })
  .extract({ left: 0, top: 0, width: SHOT.w, height: SHOT.h })
  .composite([{ input: Buffer.from(mask), blend: "dest-in" }])
  .png()
  .toBuffer()

const logo = await sharp(path.join(root, "public/icon-128.png"))
  .resize({ width: 40, height: 40 })
  .png()
  .toBuffer()

const out = path.join(root, "public/og-image.png")
await sharp(Buffer.from(base))
  .composite([
    { input: logo, left: 64, top: 58 },
    { input: screenshot, left: SHOT.x, top: SHOT.y },
    { input: Buffer.from(frame), left: SHOT.x, top: SHOT.y },
  ])
  .png({ compressionLevel: 9, palette: false })
  .toFile(out)

const meta = await sharp(out).metadata()
console.log(
  `og-image.png → ${meta.width}×${meta.height}, ${Math.round(statSync(out).size / 1024)} KB`
)
console.log(
  `stats: ${stats.backend} backend · ${stats.frontend} frontend · ${stats.i18n}% i18n`
)
