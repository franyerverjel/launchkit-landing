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
  // Pricing (one-time, lifetime license).
  pricing: {
    currency: 'USD',
    tiers: [
      {
        id: 'founder',
        name: 'Founder',
        price: 249,
        priceLabel: '$249',
        cadence: 'one-time',
        seat: '1 developer · 1 commercial project',
        cta: 'Buy LaunchKit',
        // Replace with your Stripe Payment Link or Checkout URL.
        href: 'https://buy.stripe.com/REPLACE_ME_FOUNDER',
        bullets: [
          'Full source: API + web app',
          'Commercial license, 1 project',
          'Lifetime access to the code',
          '1 year of updates',
          'Community support'
        ]
      },
      {
        id: 'agency',
        name: 'Agency',
        price: 599,
        priceLabel: '$599',
        cadence: 'one-time',
        seat: 'Unlimited seats · Unlimited projects',
        cta: 'Buy Agency license',
        href: 'https://buy.stripe.com/REPLACE_ME_AGENCY',
        featured: true,
        bullets: [
          'Everything in Founder',
          'Unlimited commercial projects',
          'Lifetime updates',
          'Priority email support',
          '30-min onboarding call',
          'Use as a base for client work'
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
