/**
 * Single source of truth for landing-wide constants. Editing this file is
 * how you brand the sales site for your own boilerplate.
 *
 * Copy lives next to each Astro section (kept inline rather than i18n —
 * this is a single-language sales page). Move to a JSON file or add
 * `astro-i18n` if you decide to translate later.
 */

export const site = {
  brand: 'LaunchKit',
  tagline: 'Ship the SaaS, not the scaffolding.',

  /**
   * Pricing strategy:
   *   - 2 tiers — same boilerplate, both unlimited projects.
   *   - Difference is the *support window*: 1 year of updates + community
   *     support, or lifetime updates + priority support.
   *   - Anchor with strikethrough launch-week prices to lift conversions.
   *
   * Replace `href` with your Stripe Payment Link URL when you go live.
   * See `docs/STRIPE_SETUP.md` for the full flow.
   */
  pricing: {
    currency: 'USD',
    discount: {
      enabled: true,
      label: 'Launch week — 30% off'
    },
    tiers: [
      {
        id: 'standard',
        name: 'Standard',
        price: 199,
        priceLabel: '$199',
        originalPriceLabel: '$279',
        cadence: 'one-time',
        seat: 'Unlimited projects · Use commercially',
        cta: 'Buy Standard',
        href: 'https://buy.stripe.com/REPLACE_ME_STANDARD',
        bullets: [
          'Full source: API + web app',
          'Unlimited commercial projects',
          '1 year of updates included',
          'Community support (Discord)',
          'Private buyers GitHub repo',
          'Use as a base for client work'
        ]
      },
      {
        id: 'lifetime',
        name: 'Lifetime',
        price: 399,
        priceLabel: '$399',
        originalPriceLabel: '$549',
        cadence: 'one-time',
        seat: 'Unlimited projects · Use commercially',
        cta: 'Buy Lifetime',
        href: 'https://buy.stripe.com/REPLACE_ME_LIFETIME',
        featured: true,
        badge: 'Best value',
        bullets: [
          'Everything in Standard',
          'Lifetime updates (every major version)',
          'Priority email support',
          '30-min onboarding call',
          'Dedicated Slack channel',
          'Vote on the roadmap'
        ]
      }
    ]
  },

  social: {
    twitter: '',
    github: '',
    email: 'hello@launchkit.dev'
  }
}

export default site
