/**
 * Single source of truth for landing-wide constants. Editing this file is
 * how you brand the sales site for your own boilerplate.
 *
 * Copy lives next to each Astro section (kept inline rather than i18n —
 * this is a single-language sales page). Move to a JSON file or add
 * `astro-i18n` if you decide to translate later.
 */

export const site = {
  brand: "LaunchKit",
  tagline: "Ship the SaaS, not the scaffolding.",

  /**
   * Pricing strategy:
   *   - 2 tiers — same boilerplate, both unlimited projects.
   *   - Difference is the *support window*: 1 year of updates + community
   *     support, or lifetime updates + priority support.
   *   - Anchor with strikethrough launch-week prices to lift conversions.
   *
   * Replace `href` with your Stripe Payment Link when you go live.
   * See `docs/STRIPE_SETUP.md` for the full buyer-onboarding flow
   * (Stripe webhook → launchkit-delivery invites the buyer to the private
   * GitHub org and sends the welcome email).
   */
  pricing: {
    currency: "USD",
    /**
     * Discount label shown next to the pricing headline. We frame it as
     * a dollar amount rather than a percentage because the absolute
     * savings ($200 on Lifetime) reads bigger than the equivalent
     * "29% off" — and because the percentage doesn't divide cleanly
     * across both tiers without breaking the launch price.
     *
     * If you change the tier prices below, also update this label so
     * the numbers reconcile (rule: label should match the *largest*
     * Lifetime saving — anchor minus launch).
     */
    discount: {
      enabled: true,
      label: "Launch week — save up to $200",
    },
    tiers: [
      {
        id: "standard",
        name: "Standard",
        price: 249,
        priceLabel: "$249",
        // Anchor at $349 so Standard shows a $100 launch saving — same
        // ~29% discount as Lifetime, keeps the math consistent across
        // the two tiers.
        originalPriceLabel: "$349",
        cadence: "one-time",
        seat: "Unlimited projects · Use commercially",
        cta: "Buy Standard",
        // Stripe Payment Link. Replace with your real link — see
        // docs/STRIPE_SETUP.md for the buyer onboarding flow.
        href: "https://buy.stripe.com/REPLACE_ME_STANDARD",
        bullets: [
          "Django + Next.js · 400 backend tests · multi-pass audited",
          "Multi-tenant, Stripe billing, RBAC, i18n (EN+ES) — wired",
          "AI agent skills (CLAUDE.md ready)",
          "Unlimited commercial projects · Use for client work",
          "1 year of updates · Email support",
        ],
      },
      {
        id: "lifetime",
        name: "Lifetime",
        price: 499,
        priceLabel: "$499",
        originalPriceLabel: "$699",
        cadence: "one-time",
        seat: "Unlimited projects · Use commercially",
        cta: "Buy Lifetime",
        // Stripe Payment Link — see docs/STRIPE_SETUP.md.
        href: "https://buy.stripe.com/REPLACE_ME_LIFETIME",
        featured: true,
        badge: "Best value",
        bullets: [
          "Everything in Standard, and:",
          "Lifetime updates (every major version, forever)",
          "Private Discord community (Lifetime-only)",
          "Early access to new features",
          "Vote on the roadmap",
        ],
      },
    ],
  },

  social: {
    twitter: "",
    github: "",
    email: "hello@launchasaas.dev",
  },
}

export default site
