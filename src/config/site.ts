/**
 * Single source of truth for landing-wide constants. Editing this file is
 * how you brand the sales site for your own boilerplate.
 *
 * Copy lives next to each Astro section (kept inline rather than i18n —
 * this is a single-language sales page). Move to a JSON file or add
 * `astro-i18n` if you decide to translate later.
 */

/**
 * Every number quoted on the page — hero stats, comparison table, pricing
 * bullets, feature copy and the social card — reads from here, so a stale
 * figure can only be stale in one place.
 *
 * Before a release, re-check them against the real suites
 * (`pytest -q` in launchkit-api, `npm test` in launchkit-web) and run
 * `npm run og` to regenerate `public/og-image.png`.
 */
export const stats = {
  backendTests: 500,
  frontendTests: 39,
  /** next-intl (web) and gettext (api) coverage, both at 100%. */
  i18nCoverage: 100,
  /** apps/users/tests/test_security_regressions.py — one test per closed audit finding. */
  securityRegressionTests: 17,
  /** Agent Skills shipped across both repos (.claude/skills/, open agentskills.io format). */
  agentSkills: 9,
  /** Distinct screens in launchkit-web: 8 auth + 3 onboarding + 10 settings + 3 billing. */
  screens: 24,
}

/**
 * A pricing tier. `originalPriceLabel` is declared but normally absent: it is
 * the struck-through "was $X" that only appears while `pricing.discount` is
 * enabled. Keeping it in the type means the template compiles either way, and
 * that turning a discount on is a deliberate edit here rather than a silently
 * empty element on the page.
 */
export interface PricingTier {
  id: string
  name: string
  price: number
  priceLabel: string
  originalPriceLabel?: string
  cadence: string
  seat: string
  cta: string
  href: string
  bullets: string[]
  featured?: boolean
  badge?: string
}

/** The tiers on the pricing table, in display order. */
const tiers: PricingTier[] = [
  {
    id: "solo",
    name: "Solo",
    price: 249,
    priceLabel: "$249",
    cadence: "one-time",
    seat: "One product · Updates for life",
    cta: "Buy Solo",
    // Stripe Payment Link. Replace with your real link — see
    // docs/STRIPE_SETUP.md for the buyer onboarding flow.
    href: "https://buy.stripe.com/REPLACE_ME_SOLO",
    bullets: [
      `Django 5.2 + Next.js 16 · ${stats.backendTests + stats.frontendTests} automated tests · audited`,
      "Multi-tenant, Stripe billing, RBAC, 2FA, i18n (EN+ES) — wired",
      `AGENTS.md + ${stats.agentSkills} agent skills — Claude Code, Cursor, Codex, Copilot`,
      "Ship one product, commercially, forever",
      "Updates for life · Email support",
    ],
  },
  {
    id: "unlimited",
    name: "Unlimited",
    price: 499,
    priceLabel: "$499",
    cadence: "one-time",
    seat: "Unlimited products · Client work",
    cta: "Buy Unlimited",
    featured: true,
    badge: "Best value",
    // Stripe Payment Link — see docs/STRIPE_SETUP.md.
    href: "https://buy.stripe.com/REPLACE_ME_UNLIMITED",
    bullets: [
      "Everything in Solo, and:",
      "Ship unlimited products on one licence",
      "Build with it for clients",
      "Private Discord community",
      "Early access to new features · vote on the roadmap",
    ],
  },
]

export const site = {
  brand: "LaunchKit",
  domain: "launchasaas.dev",
  tagline: "Ship the SaaS, not the scaffolding.",
  stats,

  /**
   * Pricing.
   *
   * The tiers split on **how many products you ship**, not on how long you
   * receive updates. Two reasons:
   *
   *   1. Capping updates is a weak differentiator. Most buyers fork once and
   *      never pull again, so the cap costs them nothing and earns you
   *      nothing — while every direct competitor now bundles updates for
   *      life, which makes a capped tier look worse than it is.
   *   2. Project count is what actually tracks the value a buyer extracts.
   *      An agency shipping client work gets far more out of this than
   *      someone with one idea, and should pay accordingly.
   *
   * Both tiers ship identical source and identical repository access. The
   * difference is a licence term, not a technical gate — see docs note in
   * `src/pages/license.astro`.
   *
   * Replace `href` with your Stripe Payment Link when you go live. See
   * `docs/STRIPE_SETUP.md` for the buyer-onboarding flow (Stripe webhook →
   * launchkit-delivery emails a claim link → the buyer enters their GitHub
   * username → invite to the private org + welcome email).
   */
  pricing: {
    currency: "USD",
    /**
     * Launch discount, off by default.
     *
     * A struck-through "was $X" is only lawful for EU/UK consumers when $X
     * was the actual price for at least 30 days beforehand (Omnibus
     * Directive) — and you sell into the EU the moment Stripe Tax is on.
     * To run one honestly: sell at the higher price for a month, then set
     * `enabled: true` and add `originalPriceLabel` back to each tier.
     */
    discount: {
      enabled: false,
      label: "Launch week — save $100",
    },
    tiers,
  },

  social: {
    /** X handle including the @ — e.g. "@launchasaas". Leave empty to omit the twitter:site tags. */
    twitter: "",
    github: "",
    email: "hello@launchasaas.dev",
  },
}

export default site
