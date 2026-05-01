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

1. **Stripe Dashboard → Products → + Add product** for each tier (Founder, Agency).
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

## Path B — Custom backend (Webhook + GitHub auto-invite)

**Effort**: A weekend. **Polish**: Full white-glove.

You handle checkout success yourself, send a customized email, and **automatically invite the buyer to a private GitHub repo** so they get updates forever.

### What you need

- `STRIPE_SECRET_KEY` (from Stripe Dashboard → Developers → API keys)
- `STRIPE_WEBHOOK_SECRET` (from Stripe Dashboard → Developers → Webhooks → your endpoint)
- A GitHub Personal Access Token with `repo` + `admin:org` scope (so you can invite collaborators)
- A transactional email provider (Resend, Postmark, or SES — Resend is easiest)
- The **launchkit-api** already has a Celery + StripeEvent + idempotent webhook handler you can reuse — don't roll your own.

### The flow

1. **Stripe Checkout Session** created from your landing's "Buy" button (call your API, which calls `stripe.checkout.Session.create`).
2. Buyer pays.
3. Stripe sends `checkout.session.completed` to your webhook endpoint.
4. Your webhook handler (Celery task, idempotent) does **all four** of:
   - Create a `Purchase` row (email, tier, stripe_session_id) for your records.
   - Upload the `.zip` to a signed URL (S3 or R2 with 7-day expiry).
   - Send a templated email via Resend with: invoice, download link, "what's next".
   - Hit the GitHub API to invite the buyer's GitHub username (asked at checkout via a Stripe **custom field**) as a collaborator on `launchkit-buyers/<repo>`.

### Stripe checkout custom field (so you get the GitHub username)

When you create the Checkout Session, pass:

```python
stripe.checkout.Session.create(
    line_items=[{"price": "price_xxxxx", "quantity": 1}],
    mode="payment",
    success_url=f"{settings.FRONTEND_URL}/thanks?session_id={{CHECKOUT_SESSION_ID}}",
    cancel_url=f"{settings.FRONTEND_URL}/pricing",
    custom_fields=[
        {
            "key": "github_username",
            "label": {"type": "custom", "custom": "Your GitHub username"},
            "type": "text",
            "text": {"minimum_length": 1, "maximum_length": 39},
        }
    ],
    customer_creation="always",
    invoice_creation={"enabled": True},
    automatic_tax={"enabled": True},
    allow_promotion_codes=True,
)
```

The buyer sees a single text field on Stripe's checkout. The username arrives in `session.custom_fields` in the webhook event.

### The webhook (Celery task — idempotent)

```python
# apps/sales/tasks.py  (in your launchkit-api fork)
@shared_task(bind=True, max_retries=5)
def handle_purchase_completed(self, stripe_event_id, session):
    if Purchase.objects.filter(stripe_session_id=session["id"]).exists():
        return  # already processed — Celery retried, we're fine

    with transaction.atomic():
        purchase = Purchase.objects.create(
            email=session["customer_details"]["email"],
            tier=session["metadata"]["tier"],
            github_username=_get_custom_field(session, "github_username"),
            stripe_session_id=session["id"],
        )

    transaction.on_commit(lambda: _post_commit_actions(purchase.id))


def _post_commit_actions(purchase_id):
    purchase = Purchase.objects.get(id=purchase_id)
    download_url = generate_signed_download_url(purchase)
    invite_to_github_repo(purchase.github_username, REPO_FOR_TIER[purchase.tier])
    send_purchase_email(purchase, download_url)
```

### GitHub invite

```python
# apps/sales/services/github.py
import requests

def invite_to_github_repo(username, repo):
    response = requests.put(
        f"https://api.github.com/repos/your-org/{repo}/collaborators/{username}",
        headers={
            "Authorization": f"Bearer {settings.GITHUB_TOKEN}",
            "Accept": "application/vnd.github+json",
        },
        json={"permission": "pull"},  # read-only — they can pull but not push
        timeout=10,
    )
    response.raise_for_status()
```

The buyer gets an email from GitHub instantly. Accepting the invite gives them `git clone` + `git pull` access for life.

### Email template (Resend example)

```
Subject: Welcome to LaunchKit — your code is ready

Hi {{first_name}},

Thanks for buying the {{tier}} license. Two things:

1. Download the code right now: {{download_url}}
   (Link expires in 7 days. Re-download from your account anytime.)

2. We've sent a GitHub invite to @{{github_username}} for the
   buyers-only repo. Accept it, then `git clone` to get future updates.

Need help? Just reply to this email — we read everything.

— The LaunchKit team
```

Don't use `noreply@`. Replies go to a real inbox.

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
