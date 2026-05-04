---
layout: ../layouts/legal.astro
title: Changelog
description: A running log of what we ship, in plain English.
eyebrow: Versioned · 2026 → today
heading: Changelog
---

<!--
  Internal note (not rendered):
  This file is the public-facing changelog shown at /changelog. It is
  authored by hand at each release — copy the human-readable entries
  from the engineering CHANGELOG.md at the repo root into this file
  before tagging the new version. The full technical log ships inside
  the buyer's clone as CHANGELOG.md.
-->

## Unreleased

Polish pass on top of `1.0.0`. Nothing breaks; everything reads cleaner. The
next tagged release will roll all of this into `1.1.0`.

#### Added

- **Public `/terms`, `/privacy`, `/license` and `/changelog` pages** in the
  marketing landing — same warm cream + ink + coral palette as the rest of
  the site, consistent with the in-app Terms and Privacy.
- **Welcome and renewal email templates** (EN + ES) under `emails/` —
  ready to drop into Polar / Resend / ConvertKit. Variables, subject-line
  options, plain-text and inline-HTML versions, conditional Discord block
  for Lifetime buyers.
- **Lightbox gallery** on the showcase screenshots — click any screen to
  enlarge, then navigate with on-screen arrows, ←/→ arrow keys, or swipe on
  mobile. Wrap-around, position counter, ESC to close.
- **AppLogo** as a shared component in the web app, with size and layout
  props — replaces a half-dozen inline copies of the brand markup.
- **Dashboard widgets** — `WelcomeHeader`, `StatsGrid`, `QuickActions`,
  rebuilt on the shadcn `<Card>` primitives without padding overrides.
- **Geist Mono Variable** is now bundled via `@fontsource-variable` instead
  of pulled from Google Fonts at runtime — faster LCP, no third-party call,
  no PostCSS warning about `@import` order.

#### Changed

- **Coral palette** across the demo web app (login, dashboard, sidebar,
  buttons, charts). Single hue family across the marketing site and the
  product so the brand reads as one thing.
- **Member invitation** simplified to email + role. The invitee fills in
  their own name when they accept and create their password — same UX as
  Slack, Linear, Notion, GitHub. Backend stays backward-compatible.
- **Member list** now shows a combined `Member` column (name with email
  fallback, "Pending profile" subtitle for new invites).
- **Member edit form** — identity fields (email, first/last name) are now
  shown as a read-only block. The backend was already ignoring these
  fields; the form was silently dropping changes. Now the UX matches the
  backend's intentional read-only-by-design.
- **Google sign-in is above** the email/password form on `/login` and
  `/register` (matches Linear, Vercel, Resend).
- **`Tenant` → `Workspace`** in user-facing copy across the web app.
  Internal superadmin tooling and the technical "multi-tenant architecture"
  landing copy stay as "tenant" (they're addressing different audiences).
- **Pricing reframed**: launch prices `$249` / `$499` (anchors `$349` /
  `$699`). Headline switched from "30% off" to "save up to $200" so the
  math is consistent across both tiers and the bigger absolute number leads.
- **Cards centered** on the pricing section.
- **Refund policy rewritten** to reflect digital-source-code reality —
  refunds available before repo access, not after. Honest and defensible,
  matches what ShipFast / Pegasus / Makerkit do.
- **Discord access** is now a Lifetime-exclusive perk. Standard buyers get
  email support.
- **Plan bullets** rewritten to lead with concrete numbers (100 tests,
  22 audit findings closed) and stack pillars (Multi-tenant, Stripe
  billing, RBAC, i18n) instead of generic "full source" copy.
- **Test count** updated 99 → 100 in stack section + comparison table.

#### Fixed

- **Landing header in the demo app** showed "Start free" even when the
  user was logged in — `useSession()` is now the source of truth so the
  CTA correctly switches to "Continue to dashboard" on cached / SSG'd
  pages.
- **Login showing a silent refresh on wrong password** — the axios 401
  retry + signOut path no longer fires for public auth endpoints
  (`/auth/login/`, `/auth/register/`, `/auth/password/reset/`,
  `/auth/code/`, `/auth/social/`, `/auth/token/refresh/`). Error toasts
  now surface as expected.
- **`/icon.png` 404 on the login page** for anonymous visitors —
  `proxy.js` now skips static assets via a negative-lookahead matcher.
- **`POST /auth/token/refresh/` returning 500** when the refresh token's
  user no longer exists — `SafeTokenRefreshView` returns a clean 401
  with `code: user_not_found`. Regression test pinned.
- **Forgot-password dialog** stale email — now pre-fills from the login
  form input via `useWatch` + `useEffect` instead of stale `getValues`.
- **Password length mismatch** — backend was 10 chars, UI was 8. Aligned
  on 8 across both stacks.
- **Pricing math** was inconsistent across tiers (Standard 17% off,
  Lifetime 28.6% off, label said "30% off"). Anchors retuned so both
  tiers show ~29% off and the label reads "Save up to $200".
- **`v1.0` references removed** from the marketing landing in favour of
  evergreen copy ("2026 edition", "Built for AI agents", etc).

## 1.0.0 — April 30, 2026

First production-ready release. The codebase has been audited end-to-end
(security, i18n, docstrings, tests) and is intended as a foundation that
can be sold or used to bootstrap a SaaS product.

#### Added

- Initial test suite: 100 backend tests (pytest) + 14 frontend tests
  (vitest) covering auth, permissions, subscription middleware, Stripe
  webhook idempotency, credit balance accounting.
- GitHub Actions CI: lint + format + tests on every PR for both projects.
- `transaction.on_commit` guards across signal handlers so Celery
  workers never see uncommitted rows.
- Privilege escalation guard in `manage_permissions` — members cannot
  grant permissions they don't already hold or modify higher-ranked peers.
- `secrets`-backed code generation for OTP, 2FA, password reset and
  email verification flows.
- Configurable trusted-proxy IP header (`TRUSTED_PROXY_IP_HEADER`).
- Centralized `FRONTEND_PATHS` setting — eliminates hardcoded URLs.
- Frontend custom error pages (`app/error.jsx`, `app/global-error.jsx`).
- Demo data fixtures + `python manage.py seed_demo` command.
- Email previewer command: `python manage.py preview_emails`.
- Pre-commit hooks (`ruff`, `eslint`, secrets scan).
- Dependabot configuration.
- LICENSE, SECURITY.md, this CHANGELOG.

#### Changed

- `update_subscription` always refreshes the entitlements cache.
- `Tenant.destroy` now cancels the linked Stripe subscription before
  deleting local data, in a single transaction.
- Stripe webhook handlers are idempotent and dedupe on
  `payment_intent_id` for credit purchases.
- Notification archive preserves the original `read_at` timestamp.
- MRR aggregation in superadmin dashboard normalizes monthly + yearly
  cycles and excludes unpaid trial subscriptions.
- `consume()` on `CreditBalance` is all-or-nothing by default.
- `SubscriptionItem.save()` propagates `is_base_plan` to `update_fields`.
- Tenant slug generation is atomic with retry on `IntegrityError`.

#### Fixed

- `routes.login` undefined redirect on the frontend home page.
- Axios interceptor now retries the original request after a token
  refresh instead of surfacing 401 to the caller.
- `useFetch.isMountedRef` actually flips on unmount.
- `LoginSerializer` normalizes the email used for authentication.
- Google OAuth requires `email_verified=true` on the Google identity.
- N+1 query on `UserProfileSerializer.social_accounts*`.
- `AuthCodeViewSet.validate` filters by `code_type` to prevent
  cross-type code consumption.
- Sentry no longer ships PII by default in production.

#### Security

22 findings closed in the audit pass before launch. Each one has a
matching regression test in `apps/users/tests/test_security_regressions.py`.

##### Critical

- Email/identity fields are now read-only on `PATCH /auth/user/` and on
  `PATCH /tenants/members/{id}/` — closes the account-takeover path
  that bypassed the password+code change-email flow.
- `RoleViewSet.update` enforces the same subset/hierarchy guards as
  `manage_permissions`; non-superusers can no longer escalate by
  rewriting a role to `*.*`.
- `POST /auth/code/` is hardened: only email-verification codes for
  unverified users, constant-time response shape, no enumeration signal.

##### High

- `AuthCode.generate_code()` uses `secrets.randbelow` (the `random`
  fallback survived the previous fix to the serializer).
- Tenant `destroy` and `transfer-ownership` require a fresh password
  proof — a stolen JWT can no longer wipe a tenant.
- `download_image` now refuses non-HTTP(S) schemes, private/loopback
  IPs, redirects, oversized payloads and non-image content types
  (SSRF guard).
- Asset uploads enforce an allow-list of extensions + MIME types; SVG,
  HTML, JS and other active-content formats are rejected outright.
- `UserSerializer` marks `is_staff`, `is_superuser` and `groups` as
  read-only (defence in depth against future permission changes).

##### Medium

- `Role.save()` invalidates per-member permission caches so revocations
  take effect immediately rather than after the 5-min TTL.
- `manage_permissions` validates `revoked_permissions` against the
  caller's effective permissions, not just `additional_permissions`.
- Invitation tokens use a dedicated `INVITATION_TOKEN_SIGNING_KEY` and
  default to a 48-hour lifetime (was 7 days under the access-token key).
- `login_2fa` enforces a per-user lockout in addition to the per-code
  attempt counter.
- Stripe checkout validates quantity bounds and
  `Product.supports_quantity` before calling Stripe; rejects unknown
  or inactive prices.
- `enable_2fa` no longer returns the raw TOTP secret in the JSON body
  (only the provisioning URI, which already contains it for QR rendering).
- Frontend `<CodeBlock>` HTML-escapes input before passing it to
  `sugar-high`; asset gallery's `window.open` validates the scheme and
  uses `noopener,noreferrer`.

##### Low

- Per-email throttle on login, register and password reset (in
  addition to per-IP) so a botnet cannot brute a known account by IP
  rotation.
- `PASSWORD_RESET_TIMEOUT` lowered from 7 days to 1 hour.
- Google OAuth refuses to silently rebind a stored social account to a
  different `sub` value; admin must disconnect and re-link.
- AuditLog excludes `totp_secret`, `metadata` and `last_login` on the
  User model so secrets don't end up in the audit table.
- All `fields = "__all__"` in serializers replaced with explicit field
  tuples (Tenant + SubscriptionItem) to prevent accidental leakage of
  future model columns.

---

## 0.1.0 — April 1, 2026

Initial public release of the boilerplate. Internal milestone — the
first version that compiled and booted end-to-end.
