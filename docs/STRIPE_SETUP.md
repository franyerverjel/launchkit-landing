# Selling LaunchKit through Stripe

How indie devs typically sell a code product (boilerplate, template, UI kit) through Stripe — plus the gotchas nobody mentions until it's too late.

## TL;DR — the three-stage flow

```
Visitor clicks "Buy"   →   Stripe Checkout   →   Webhook fires   →   They get the code
       (landing)            (hosted by Stripe)   (your server hits      (email + GitHub
                                                  it on success)         repo invite)
```

You can do this **without writing a single line of backend code** if you accept slightly less polish, or you can wire it through `launchkit-api` for the full white-glove experience. Both paths below.

---

## Path A — Zero backend (Stripe Payment Links + Stripe email)

**Effort**: 30 minutes. **Polish**: Acceptable.

Stripe has two products you can plug together:

1. **Payment Links** — hosted checkout pages. Create one per pricing tier.
2. **After-payment customer email** — Stripe automatically emails the customer with what you put in "Confirmation page customizable message + downloadable file".

### Steps

1. **Stripe Dashboard → Products → + Add product** for each tier (Solo, Unlimited).
2. Set price as **One-time** (not subscription).
3. **Stripe Dashboard → Payment links → New** for each product.
4. Under **Confirmation page**:
   - Choose **"Show a confirmation page"** (the default).
   - In **Add custom thank-you page content**, paste:
     ```
     Thanks for buying LaunchKit!
     Your private GitHub invite will arrive within 5 minutes at the email
     you entered. Download is also available below.
     ```
   - Upload the **`.zip` of the code** (one file, max 500 MB) under **"Add a downloadable file"**. This generates a one-time signed link Stripe shows on the confirmation page AND in the receipt email.
5. **Copy the Payment Link URL** (`https://buy.stripe.com/xxxxx`) and paste it into `src/config/site.ts → tiers[].href`.

That's it. No backend needed for the basic case.

### Caveats

- The downloadable file link is **per-receipt** — not unlimited, but fine for an honest customer.
- You don't get the buyer's GitHub username automatically. You either:
  - Ask them to email you to receive a GitHub repo invite (acceptable for first 50 customers), OR
  - Use Path B below to automate it.
- No license enforcement — anyone with the receipt can download. Counter this with versioning (only paying customers get repo updates) and trust.

### Tax + invoicing

- Turn on **Stripe Tax** (Settings → Tax) — Stripe calculates VAT/GST per buyer location and adds it to checkout. Mandatory in EU/UK/AU.
- Turn on **automatic invoices** (Settings → Customer portal & emails → Invoices) so buyers get a proper PDF invoice — most companies need this for accounting.

---

## Path B — launchkit-delivery (Webhook → claim link → GitHub auto-invite)

**Effort**: An afternoon. **Polish**: Full white-glove. This is what the landing's copy describes ("repo access in minutes").

The sibling repo **`launchkit-delivery`** is a small FastAPI service that does the whole fulfilment loop, so you don't wire anything into `launchkit-api`:

```
Stripe checkout.session.completed
      → POST /webhooks/stripe   (signature-verified, idempotent by event id)
      → Order row + confirmation email (Resend) with a signed claim link
      → buyer opens GET /claim/{token}, confirms their GitHub username
      → POST /claim/{token} validates the username against GitHub and
        invites it to the buyers org team for that tier
      → welcome email (the copy in ../emails/welcome-*.md)
```

### What you need

- The two Payment Links from Path A (one per tier) — `launchkit-delivery` maps the Stripe **product id** of each to a GitHub team slug, so changing prices later doesn't break fulfilment.
- `STRIPE_WEBHOOK_SECRET` for the delivery endpoint (Stripe Dashboard → Developers → Webhooks → add `https://<delivery-host>/webhooks/stripe`, event `checkout.session.completed`).
- A GitHub org with one team per tier and a PAT scoped to `admin:org` (it only invites, it never touches repo contents).
- A Resend API key and a verified sending domain — replies must land in a real inbox, not `noreply@`.

### Stripe checkout custom field (pre-fills the claim form)

On each Payment Link, add a custom field: type **text**, key **`github_username`**, optional. The webhook reads it from `session.custom_fields` so the buyer only has to confirm it on the claim page. If you skip this, the claim form simply starts empty — validation still happens server-side either way, so a typo becomes a clear error instead of a silent "charged but no access".

### Tax, invoices, promotion codes

- Turn on **Stripe Tax** so VAT/GST is collected where required.
- Turn on **invoice creation** on the Payment Links so companies get a PDF.
- Turn on **Allow promotion codes** — the Solo → Unlimited upgrade email (`../emails/solo-upgrade.md`) relies on a promotion code pre-filled through `?prefilled_promo_code=`.

Setup, environment variables and the rate limits on the claim endpoint are documented in `launchkit-delivery/README.md`.

---

## Other things people forget

### Payment Link vs. Checkout Session

- **Payment Link** — pre-built URL. Same checkout for every visitor. Pricing fixed in dashboard. Good for sites without a backend.
- **Checkout Session** — your backend creates a session per buyer. Lets you pass metadata, custom fields, dynamic discounts, prefilled email. Required for path B.

### Refund policy

State it on the landing. The Stripe **Customer Portal** can be enabled so buyers self-serve refunds (within your policy window). Or handle via email — for code products, manual refunds are fine because volume is low.

### License keys (optional, lightweight gate)

If you want to gate updates without doing GitHub invites, generate a license key per purchase, email it to the buyer, and have a CLI script in the boilerplate that checks the key against your API on `git pull`. Most indie boilerplate sellers don't bother — too easy to bypass, hostile to honest buyers, low payoff.

### Analytics

Add a Stripe webhook handler for `payment_intent.payment_failed` too — track failed checkouts to spot abandoned-cart patterns. PostHog or Plausible can read these via webhook fan-out.

### EU MOSS / Stripe Tax

If you sell internationally, **enable Stripe Tax**. Stripe handles VAT/GST collection and you get a quarterly report. Without it, you're technically liable for unpaid VAT on EU sales. Stripe charges 0.5% on top of the normal fee — worth it.

### Affiliate program

Once you've made some sales, add an affiliate layer with **Rewardful** ($49/mo) or **Lemon Squeezy's built-in affiliate program**. Pays affiliates 20–30% per referral. Can 2x your reach.

### Lemon Squeezy as an alternative

If you don't want to deal with international tax yourself: **Lemon Squeezy** is a "merchant of record" — they handle ALL tax + invoicing in exchange for a higher fee (5% vs Stripe's 2.9%). Worth it if you're a one-person operation. Same `.zip` upload + email flow as Stripe Payment Links, but they handle the legal-tax mess.

### Minimum viable launch (literally today)

If you want to start selling tomorrow:

1. Create one Stripe Payment Link for the Founder tier ($249).
2. Upload a `.zip` of the repo (with `.git` removed) to the confirmation page.
3. Replace `tiers[0].href` in `src/config/site.ts` with the link.
4. Ship.

Iterate to Path B once you have 5–10 paying customers and you know they want lifetime updates.

---

## What goes in the `.zip` you sell

Don't ship the full repo — clean it first:

```bash
# create a clean export
git clone --depth 1 git@github.com:you/launchkit.git launchkit-v1.0.0
cd launchkit-v1.0.0

# remove your dev secrets and history
rm -rf .git
rm -f .env.prod .env.local
rm -f launchkit-api/.env launchkit-web/.env.local
find . -name "node_modules" -type d -prune -exec rm -rf {} +
find . -name "venv" -type d -prune -exec rm -rf {} +

# include the LICENSE, CHANGELOG, README, both repos
zip -r launchkit-v1.0.0.zip .
```

Verify the archive in a clean directory before uploading.

---

## Recommended stack for v1

- **Stripe** — payments + tax + invoicing
- **Cloudflare R2** (or S3) — host the `.zip` (signed URLs, expires after 7 days)
- **Resend** — transactional email (much nicer than Postmark UX-wise, free tier covers first 100 sales)
- **GitHub** — private buyers repo, invite via API
- **PostHog** (free) — track checkout starts, completions, drop-off

Total: $0/mo until you sell. Stripe takes 2.9% + 30¢. Resend free up to 3k emails/mo.
