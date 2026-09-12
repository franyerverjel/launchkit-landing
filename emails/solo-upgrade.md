# Email · Solo buyer — upgrade to Unlimited

An offer to a Solo buyer who is building a second product, or doing client
work, and therefore needs the Unlimited licence.

**This is not a renewal.** Nothing about a Solo licence expires: the code is
theirs, updates keep coming, repository access is never revoked. The only
reason to upgrade is that they want to ship more than one product. Send it
that way — as an offer that arrives when it's useful, not as a deadline.

> Replaces the old `standard-renewal.md`, which was written when tiers split
> on an update window. They no longer do; see `src/config/site.ts`.

---

## When to send it

There is no clock to trigger this on, which is the point. Good signals:

- They reply to the welcome email, or post in support, mentioning a second
  product, a client, or an agency.
- They ask a question that only makes sense if they're running two codebases.
- A light annual touch — "still on one product?" — is fine, but once. This is
  an offer, and an offer that repeats becomes nagging.

Do **not** send it on a timer to everyone. A Solo buyer with one happy product
has nothing to upgrade for, and telling them otherwise reads as a shakedown.

---

## Variables to substitute

| Variable | Example | Notes |
|---|---|---|
| `{{first_name}}` | `Franyer` | From the Stripe customer record |
| `{{purchase_date}}` | `May 4, 2026` | Order created date |
| `{{upgrade_credit}}` | `$249` | What they paid for Solo — credited in full |
| `{{upgrade_price}}` | `$250` | Unlimited minus the credit. Default: `$499 − $249 = $250` |
| `{{upgrade_url}}` | `https://buy.stripe.com/...?prefilled_promo_code=SOLO-CREDIT-249` | The Unlimited Payment Link with the credit's promotion code pre-filled |
| `{{founder_name}}` | `Franyer` | Sign-off |

> **Building the upgrade URL.** In Stripe, create a coupon worth
> `{{upgrade_credit}}` (amount off, one-time) restricted to the Unlimited
> product, then a promotion code for it (e.g. `SOLO-CREDIT-249`) limited to one
> redemption and, ideally, to that customer. Append it to the Unlimited Payment
> Link: `?prefilled_promo_code=SOLO-CREDIT-249`. Make sure "Allow promotion
> codes" is on for that Payment Link.

---

## Subject line — pick one

1. **Shipping a second one?**  *(short, curious, no pressure)*
2. **{{first_name}}, about that second product**  *(personal, assumes the signal)*
3. **Your Solo licence, and what happens when you outgrow it**  *(informational)*

**Pre-header:**

> Your $249 counts toward Unlimited. No deadline.

---

## Plain-text version

```
Hi {{first_name}},

Sounds like you're building more than one thing with LaunchKit — which
is great, and also the one case where the Solo licence stops fitting.

Quick recap of where you stand, because none of this is urgent:

  Bought        {{purchase_date}}
  Tier          Solo — one licensed product
  Updates       Still coming, for as long as I maintain LaunchKit
  Expires       Never. Nothing about your licence runs out.

Solo covers one product, commercially, forever. Unlimited covers as
many as you want, plus anything you build for clients — same code,
same repos, same updates, just a broader licence. It also comes with
the private Discord, early access to new builds, and a vote on what
gets built next.

Since you already paid for Solo, you don't pay twice:

  Unlimited            $499
  Your Solo credit    -{{upgrade_credit}}
  ─────────────────────────
  You pay             {{upgrade_price}}

  {{upgrade_url}}

That link has your credit baked in and doesn't expire. If you're still
on one product, ignore this — nothing changes and nothing lapses. And
if you'd rather talk it through first, just reply. I read every one.

— {{founder_name}}

PS — if you've shipped something with LaunchKit, I'd genuinely love to
see it. Reply with a link.
```

---

## HTML version (inline-styled, email-safe)

```html
<!doctype html>
<html lang="en">
<body style="margin:0;padding:24px 12px;background-color:#FAF8F2;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','Helvetica Neue',Arial,sans-serif;color:#16100D;line-height:1.6;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;margin:0 auto;background:#ffffff;border:1px solid #ebe6dc;border-radius:12px;overflow:hidden;">
    <tr>
      <td style="padding:28px 32px 8px 32px;">
        <p style="margin:0 0 18px 0;font-family:'SFMono-Regular',Menlo,monospace;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#857c70;">
          LaunchKit · Licence
        </p>
        <h1 style="margin:0 0 18px 0;font-size:24px;font-weight:600;letter-spacing:-0.02em;line-height:1.2;color:#16100D;">
          Shipping a second one?
        </h1>
        <p style="margin:0 0 16px 0;font-size:15px;color:#3a342d;">
          Hi {{first_name}} — sounds like you're building more than one thing
          with LaunchKit. That's the one case where the Solo licence stops
          fitting, so here's the offer. No deadline attached.
        </p>
      </td>
    </tr>

    <tr>
      <td style="padding:8px 32px 0 32px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #ebe6dc;border-radius:10px;background:#FAF8F2;">
          <tr>
            <td style="padding:18px 20px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:14px;color:#3a342d;">
                <tr>
                  <td style="padding:4px 0;color:#857c70;">Bought</td>
                  <td align="right" style="padding:4px 0;font-family:'SFMono-Regular',Menlo,monospace;color:#16100D;">{{purchase_date}}</td>
                </tr>
                <tr>
                  <td style="padding:4px 0;color:#857c70;">Tier</td>
                  <td align="right" style="padding:4px 0;font-family:'SFMono-Regular',Menlo,monospace;color:#16100D;">Solo — one product</td>
                </tr>
                <tr>
                  <td style="padding:4px 0;color:#857c70;">Updates</td>
                  <td align="right" style="padding:4px 0;font-family:'SFMono-Regular',Menlo,monospace;color:#16100D;">Still coming</td>
                </tr>
                <tr>
                  <td style="padding:4px 0;color:#857c70;">Expires</td>
                  <td align="right" style="padding:4px 0;font-family:'SFMono-Regular',Menlo,monospace;color:#16100D;">Never</td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <tr>
      <td style="padding:24px 32px 8px 32px;">
        <p style="margin:0 0 16px 0;font-size:15px;color:#3a342d;">
          Solo covers <strong>one product</strong>, commercially, forever.
          Unlimited covers as many as you want plus anything you build for
          clients — same code, same repos, same updates, just a broader
          licence. It also comes with the private Discord, early access to new
          builds, and a vote on what gets built next.
        </p>
      </td>
    </tr>

    <tr>
      <td style="padding:0 32px 24px 32px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #16100D;border-radius:12px;background:#16100D;color:#FAF8F2;">
          <tr>
            <td style="padding:20px 24px;">
              <p style="margin:0 0 12px 0;font-family:'SFMono-Regular',Menlo,monospace;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:rgba(250,248,242,0.55);">
                You don't pay twice
              </p>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:15px;">
                <tr>
                  <td style="padding:5px 0;color:rgba(250,248,242,0.85);">Unlimited</td>
                  <td align="right" style="padding:5px 0;font-family:'SFMono-Regular',Menlo,monospace;">$499</td>
                </tr>
                <tr>
                  <td style="padding:5px 0;color:rgba(250,248,242,0.85);">Your Solo credit</td>
                  <td align="right" style="padding:5px 0;font-family:'SFMono-Regular',Menlo,monospace;color:#d96b4a;">−{{upgrade_credit}}</td>
                </tr>
                <tr>
                  <td colspan="2" style="border-top:1px solid rgba(250,248,242,0.15);padding-top:8px;"></td>
                </tr>
                <tr>
                  <td style="padding:5px 0;font-weight:600;">You pay</td>
                  <td align="right" style="padding:5px 0;font-family:'SFMono-Regular',Menlo,monospace;font-weight:600;font-size:18px;">{{upgrade_price}}</td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <tr>
      <td align="center" style="padding:0 32px 8px 32px;">
        <a href="{{upgrade_url}}" style="display:inline-block;background:#d96b4a;color:#ffffff;text-decoration:none;font-size:15px;font-weight:600;padding:14px 28px;border-radius:9999px;box-shadow:0 4px 14px -4px rgba(217,107,74,0.45);">
          Upgrade to Unlimited — {{upgrade_price}} →
        </a>
      </td>
    </tr>

    <tr>
      <td style="padding:8px 32px 24px 32px;">
        <p style="margin:0;font-size:13px;color:#857c70;text-align:center;">
          Your credit is baked into that link and doesn't expire.
        </p>
      </td>
    </tr>

    <tr>
      <td style="padding:0 32px 28px 32px;border-top:1px solid #ebe6dc;">
        <p style="margin:24px 0 12px 0;font-size:14px;color:#3a342d;">
          Still on one product? Ignore this — nothing changes and nothing
          lapses. If you'd rather talk it through, just reply. I read every one.
        </p>
        <p style="margin:0 0 18px 0;font-size:14px;color:#3a342d;">— {{founder_name}}</p>
        <p style="margin:0;font-size:13px;color:#857c70;font-style:italic;">
          PS — if you've shipped something with LaunchKit, I'd genuinely love to
          see it. Reply with a link.
        </p>
      </td>
    </tr>
  </table>

  <p style="max-width:560px;margin:16px auto 0;text-align:center;font-size:11px;color:#857c70;font-family:'SFMono-Regular',Menlo,monospace;letter-spacing:0.1em;">
    LaunchKit · launchasaas.dev
  </p>
</body>
</html>
```

---

## What NOT to do

- **Don't imply anything expires.** It doesn't. Saying otherwise to create
  urgency is a lie your own licence page contradicts, and buyers check.
- **Don't auto-charge.** Solo is one-time, not a subscription.
- **Don't send it more than twice.** They paid you in good faith.
- **Don't police it.** There is no technical gate on project count and there
  shouldn't be. If someone quietly ships two products on a Solo licence, the
  cost of chasing them exceeds the $250, and the goodwill you burn is worth
  more than that.
