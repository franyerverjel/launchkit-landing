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

A sale-readiness pass on top of `1.1.4`. Ships as `1.1.5`.

#### Added

- **The frontend is now TypeScript, end to end.** All 318 files, under
  `strict`, with type-checking gated in CI. The conversion turned up a set of
  quiet defects no test could catch, because each was a value that simply
  arrived as `undefined`: member avatars that never loaded, a "disabled" flag
  on the delete-role dialog that did nothing, retry buttons that never
  rendered, subscription totals that always used the dollar sign whatever the
  tenant's currency. All fixed.
- **API types generated from the Django schema.** `npm run types:api` turns
  the API's own OpenAPI document into typed request and response shapes, with
  Django's `help_text` carried through as inline documentation. Rename a
  serializer field and the frontend build fails instead of shipping
  `undefined`.
- **Demo mode.** Off by default and shipped in the box: a middleware that
  blocks the destructive and money-moving routes, a seeded tenant with a role
  picker on the login screen, and an hourly reset. It's what runs the public
  demo, and you can point it at your own domain.

#### Security

- **Dependency advisories cleared on both stacks.** `pip-audit` went from 24
  findings to 0 (Pillow 12.3.0, requests 2.33.0, Django 5.2.17, DRF 3.17.2)
  and `npm audit` from 25 to 0 — including a critical next-auth issue where a
  malformed `Authorization` header crashed the request proxy. Next.js 16.3.4.
- `X_FRAME_OPTIONS` is `DENY` on the API.

#### Fixed

- **`python manage.py` crashed on a fresh clone.** The default settings module
  needed a logging package that was never listed in `requirements/`. CI runs
  under a different settings module, so nothing caught it — the first person
  to hit it would have been you, on your first command. Pinned, and every
  settings module is now loaded by a test.
- **A third of the API was missing from the OpenAPI schema.** The generator
  inspects each view without a request, so any view filtering by the current
  user or tenant failed and was quietly emitted without its response shape.
  Assets, notifications, roles, members, tenants, support tickets and the
  credit balance were all affected — which is exactly what the frontend's
  generated types are built from. Fixed, and pinned by tests that fail if any
  view regresses or any endpoint ships an untyped response.
- `DJANGO_ADMIN_URL` now actually moves the Django admin off `/admin/`.
- Support: customers are emailed when staff resolves, closes or picks up
  their ticket — the template existed, nothing sent it.
- `npm install` works without `--legacy-peer-deps`: the abandoned
  `react-currency-format` dependency is gone, replaced by a tested formatter
  with identical output.
- Three environment variables the API never read are no longer required to
  boot; `.env.example` documents the real invitation-lifetime setting.

#### Changed

- One cached membership lookup (`TenantMember.get_active_cached`) instead of
  three copies with different query shapes.
- The `referrals` permission block, which nothing enforced, is gone from the
  role editor.
- Support email and Node/`license` metadata are configurable in
  `src/config/brand.ts` and `package.json`.

## 1.1.4 — August 11, 2026

Rolls up `1.1.0` (June 10) through `1.1.4`. The headline: four audit passes
over auth, billing, tenancy and general correctness, each finding pinned by a
test. Test suites grew from 100 → 427 backend and 14 → 39 frontend.

#### Security

- **Token-refresh lock keyed per refresh token.** A module-level promise
  could hand one user another user's tokens when their refreshes overlapped.
  Fixed, tested, and documented so it can't be reintroduced.
- Dead accounts get a clean 401 on both the access and refresh paths instead
  of a 500; a malformed `x-tenant-id` header can no longer crash the tenant
  middleware.
- Mass assignment closed on the tenant and member serializers — `owner`,
  `slug`, `metadata` and per-member permission overrides are read-only
  through normal updates.
- Member lists no longer embed teammates' full profiles.
- Upload hardening: extension + MIME allow-list, SSRF guard on image
  downloads, redirect and size limits.
- Quick actions on the dashboard gate on permissions that exist in the
  catalog (they were invisible to every role except Owner).

#### Billing

- Invoice emails resolve the subscription across Stripe API versions
  (`invoice.parent.subscription_details`).
- Grace period applies only to `past_due` / `unpaid`; cancelled subscriptions
  and ended trials expire immediately.
- Webhooks branch on persisted state, so a delayed "active" event can't
  resurrect a cancellation.
- Credits are granted only when `payment_status == "paid"`; referral
  commissions are deduplicated by a database constraint.

#### AI-ready

- **`AGENTS.md` is the agent guide** in both repos — the open standard read
  by Claude Code, Cursor, Codex, Copilot, Gemini CLI and Zed — with thin
  `CLAUDE.md`, Cursor and Copilot pointers. Nine skills in the open Agent
  Skills format.
- Pre-commit hooks actually run (the old config matched no files).
- Every command, path, setting and fixture in the docs was verified against
  the code and corrected.

#### Product

- In-app `/terms` and `/privacy` pages, a shared `<AppLogo>`, dashboard
  widgets, coral brand palette, `src/config/brand.js` as the single rebrand
  point.
- Member invitations are email + role; the invitee completes their own
  profile. Members list shows a combined identity column.
- Google sign-in moved above the email form on login and register.
- `updated_at` is written on partial saves; `update_default_roles --tenant`
  reports correctly; failed email sends are retried instead of dropped.
- Eleven list screens no longer remount their add-button on every render
  (the invite form and CSV import dialog were losing state).

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
