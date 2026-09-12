# LaunchKit Landing

The sales site for the LaunchKit boilerplate — [launchasaas.dev](https://launchasaas.dev).
Astro 6, static output, Tailwind v4, self-hosted Geist. This repo is **seller
infrastructure**: buyers receive `launchkit-api` and `launchkit-web`, not this.

## Commands

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # static output in dist/
npm run preview    # serve dist/ locally
npm run lint       # ESLint
npm run typecheck  # astro check
npm run format     # Prettier (writes)
npm run og         # regenerate public/og-image.png from src/config/site.ts
```

## Where things live

| Path | What |
|---|---|
| `src/config/site.ts` | Brand, domain, **prices, Stripe Payment Links, and every number quoted on the page** (`stats`) |
| `src/config/faq.ts` | FAQ copy — rendered on the page and mirrored into the FAQPage JSON-LD |
| `src/components/landing/*.astro` | One component per section, composed in `src/pages/index.astro` |
| `src/pages/{license,terms,privacy}.astro` | Legal pages on `src/layouts/legal.astro` |
| `src/pages/changelog.md` | Buyer-facing release notes (hand-curated from the product CHANGELOGs) |
| `src/pages/404.astro` | Branded not-found page |
| `public/screenshots/` | Product screenshots (1920×1200 WebP) used by the showcase and the OG card |
| `emails/` | Copy for the welcome and Solo→Unlimited upgrade emails (the sending lives in `launchkit-delivery`) |
| `docs/STRIPE_SETUP.md` | How the Stripe → claim link → GitHub invite flow is wired |

## Before you go live

- [ ] Replace the two `REPLACE_ME_*` Payment Links in `src/config/site.ts` — the buy buttons 404 until you do.
- [ ] Re-check `stats` in `site.ts` against the real suites, then `npm run og`.
- [ ] Set `social.twitter` (adds the `twitter:site` tags) and confirm `social.email` is a monitored inbox.
- [ ] Replace `jurisdiction` in `src/pages/terms.astro` and update `lastUpdated` on the legal pages.
- [ ] Point `site` in `astro.config.mjs` at the production domain (canonicals, OG and sitemap URLs derive from it).
- [ ] Run `npm run lint && npm run typecheck && npm run build`.

## Deploying

Static site — Cloudflare Pages, Netlify or Vercel build it from the repo with
`npm run build` and serve `dist/`. `.github/workflows/deploy.yml` is a
manual-trigger rsync template for the VPS path; see the comments at the top.
