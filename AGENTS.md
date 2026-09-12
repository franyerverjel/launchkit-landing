# AGENTS.md

Guidance for AI coding agents working in this repository.

LaunchKit Landing — the **sales site** for the LaunchKit boilerplate. Astro,
static output (no adapter, no SSR), Tailwind v4. This repo is seller
infrastructure: it is not part of what a buyer receives.

## Commands

```bash
npm run dev        # http://localhost:4321
npm run build      # static output into dist/
npm run lint       # ESLint
npm run typecheck  # astro check
npm run format     # Prettier (writes)
```

## How it's organised

- `src/config/site.ts` is the **single source of truth** for brand, pricing
  tiers and Stripe Payment Links. Change prices there, never in a component.
- One `.astro` component per landing section in `src/components/landing/`,
  composed by `src/pages/index.astro` in narrative order.
- Legal pages (`terms`, `privacy`, `license`) use `src/layouts/legal.astro`.
- Analytics config is `src/config/analytics.ts`; the script tag, the event
  vocabulary and the handful of scripted events live in
  `src/components/analytics.astro`.
- Section copy lives **inline in each component**, not in an i18n catalog — this
  is a single-language sales page by design.

## Conventions

Prettier here differs from `launchkit-web` on purpose (Astro ecosystem defaults):
**double quotes**, `trailingComma: "es5"`, no semicolons, 80 columns. Run
`npm run format` rather than hand-formatting.

- Tailwind classes are sorted by `prettier-plugin-tailwindcss`; don't reorder by
  hand.
- Design tokens (the coral accent, halftone background, display type) live in
  `src/styles/global.css`. Reuse the tokens instead of hardcoding colors.
- Product screenshots live in `public/screenshots/` and are referenced by
  `showcase.astro`.

## Analytics

Umami, self-hosted and cookie-less. Add a click event by putting attributes on
the element — no JavaScript:

```astro
<a href="#pricing" data-umami-event="cta-click" data-umami-event-location="hero"
></a>
```

Every `data-umami-event-<prop>` becomes a property on the event. The vocabulary
in use is listed at the top of `src/components/analytics.astro`; reuse a name
rather than inventing a synonym, because renaming one splits its history in the
dashboard.

- **The Stripe buy buttons must never carry `data-umami-event`.** Umami's
  handler cancels a link click and waits for the beacon before navigating, so a
  slow metrics host would sit between a buyer and checkout. They carry
  `data-checkout-tier`/`data-checkout-price` instead, which a listener reads and
  reports without touching the navigation.
- `data-domains` in the rendered tag restricts reporting to the production
  hostnames, which is what keeps `npm run dev` and `npm run preview` out of the
  stats. Empty `domains` in the config to verify new wiring locally, then put it
  back.
- **What the tracker collects is described in `/privacy` §6.** Adding a field,
  or swapping Umami for anything that sets a cookie, means editing that section
  and re-checking whether a consent banner is now required.

## Things that are easy to get wrong

- **Every number on the page reads from `stats` in `site.ts`** (test counts,
  skill count, i18n coverage). Update it there, verify against the real
  suites, then run `npm run og` — the social card is generated from the same
  values and must not drift from the page. Prices live in `site.ts` too.
- FAQ copy lives in `src/config/faq.ts` and feeds both the FAQ section and
  the FAQPage JSON-LD; edit it once.
- **Tiers split on product count, not on an update window.** Solo licenses one
  product; Unlimited licenses any number plus client work, and adds the
  Discord. Both get updates for life. That promise is repeated in `site.ts`,
  `src/config/faq.ts`, `/license`, `/terms` and the welcome emails — change
  them together, because a buyer who reads two versions believes the more
  generous one.
- Nothing enforces the project count technically, and nothing should: it is a
  licence term on identical source. Don't add a gate.
- **Never let a formatter reflow the inside of a `<pre>`.** Whitespace there is
  rendered, so Prettier breaking `<pre><code>{...}</code></pre>` across lines
  silently doubles the line spacing and indents every row. The code block in
  `features.astro` builds its lines from an expression, so it is guarded with
  `{/* prettier-ignore */}` — leave that comment in place. The `<pre>` blocks in
  `hero.astro` and `ai-ready.astro` hold literal text, which Prettier won't
  touch, but keep their opening `><code>` glued to the content all the same.
- `href` values in `site.ts` are Stripe Payment Links. The placeholders
  (`REPLACE_ME_*`) must be swapped before launch or the buy buttons 404.
- Static output: there is no server at runtime. Don't add API routes or
  server-only code without first adding an adapter.
- External links need `rel="noopener noreferrer"` with `target="_blank"`.

## Before you finish

Run `npm run lint && npm run typecheck && npm run build`.
