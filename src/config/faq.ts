/**
 * FAQ copy. Rendered by `components/landing/faq.astro` and mirrored into
 * the FAQPage JSON-LD in `layouts/main.astro`, so the two can't drift.
 * Keep answers plain-text (no markup) — the schema needs them as strings.
 */
import { stats } from "./site"

export type Faq = { q: string; a: string }

export const faqs: Faq[] = [
  {
    q: "What exactly do I get when I buy?",
    a: `Access to a private GitHub organization with two repositories: launchkit-api (Django 5.2 + DRF) and launchkit-web (Next.js 16 + React 19). Plus the AGENTS.md architecture maps, ${stats.agentSkills} agent skills, pointer files for Claude Code, Cursor and Copilot, the CI configuration, ${stats.backendTests + stats.frontendTests} automated tests, and a CHANGELOG. Everything in the box — yours.`,
  },
  {
    q: "Can I use it for commercial projects? Multiple projects?",
    a: "Commercially, yes, on both tiers — you never owe us a cut or a credit. The difference is how many products you can ship: Solo covers one, Unlimited covers as many as you like plus work you build for clients. The only thing neither tier allows is reselling the boilerplate itself as your own starter kit.",
  },
  {
    q: "What's the difference between Solo and Unlimited?",
    a: "The same source code, the same repository access, and updates for life on both. Solo licenses one product. Unlimited licenses as many as you want, adds the right to build client work on it, and comes with the private Discord, early access and a vote on the roadmap. If you ever outgrow Solo, email us and we'll credit what you paid against the difference.",
  },
  {
    q: "Do I have to credit LaunchKit anywhere?",
    a: "No. Strip every reference to LaunchKit from the codebase. Rename every file. Use it however you want.",
  },
  {
    q: "How do I get access, and how do updates work?",
    a: "Right after checkout you get an email with a claim link. Enter your GitHub username and you're invited to the private GitHub organization within minutes. Pulling updates is a normal git fetch + merge; each release ships with a CHANGELOG and migration notes when relevant. Both tiers keep receiving updates for as long as LaunchKit is maintained — there is no renewal and nothing expires.",
  },
  {
    q: "What's the refund policy?",
    a: "Honest answer: once you've claimed access to the private GitHub organization, the source code is in your hands and we can't take it back — so we don't offer refunds after that point. If you change your mind before claiming access, email us within 7 days and we'll refund in full. The best way to avoid buyer's regret is to read the FAQ, scroll through the screens, and email us if you're unsure before you check out — happy to answer anything.",
  },
  {
    q: "Can I see more before I buy?",
    a: "Yes — every screenshot in the showcase clicks open. The full feature list lives in the stack and features sections above. If you want a deeper look at a specific area (a particular page, a code pattern, the Stripe webhook handler), email us and we'll send you a short Loom or a code snippet. We'd rather walk you through it than have you regret the purchase.",
  },
  {
    q: "Do I need to know Django and Next.js to use this?",
    a: "Yes — this is a foundation, not a no-code product. If you've shipped anything in either framework, you'll be at home. The bundled AGENTS.md files and skills make it easier to onboard with any AI coding assistant.",
  },
  {
    q: "Is the frontend TypeScript?",
    a: "Entirely. Every file in the Next.js app is TypeScript under strict mode, and the API types are generated from Django\u2019s own OpenAPI schema \u2014 so a renamed serializer field breaks the build instead of surfacing as undefined in production. Type-checking runs in CI next to lint, tests and the build.",
  },
  {
    q: "Is the multi-tenant model strict isolation or schema-per-tenant?",
    a: "Logical isolation: every tenant-scoped model carries a tenant FK and the middleware sets request.tenant. ViewSets auto-scope queries. This is the right tradeoff for early-stage SaaS — schema-per-tenant adds operational complexity that you don't need until you hit thousands of tenants.",
  },
  {
    q: "What if I find a bug or need a feature?",
    a: "Email support is included on every tier — reply to your welcome email and you'll get a response within 24 hours on weekdays. Unlimited buyers also get the private Discord where I drop early builds, answer architecture questions, and pick the next features with the community. Security fixes ship to every license holder for free, regardless of tier.",
  },
]
