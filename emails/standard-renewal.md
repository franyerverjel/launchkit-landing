# Email · Standard buyer — update window ending

A 30-day-out reminder for Standard buyers nudging them toward Lifetime.
Send roughly **11 months after purchase** so they have a real window to
decide before access updates stop.

This file is the source of truth for the copy. Two versions are
provided below: a **plain-text** version (paste into Polar's automation
or any email tool that doesn't render HTML), and an **inline-styled
HTML** version (copy directly into Resend, Customer.io, ConvertKit,
etc.). Both use the same variables and message — pick whichever your
sending tool prefers.

---

## Variables to substitute

Replace these wherever they appear before sending. Most email tools
support templating with `{{var}}` syntax — adapt to your platform.

| Variable | Example | Notes |
|---|---|---|
| `{{first_name}}` | `Franyer` | From the Polar customer record |
| `{{purchase_date}}` | `May 4, 2026` | Order created date |
| `{{end_date}}` | `June 4, 2027` | `purchase_date + 12 months` |
| `{{releases_count}}` | `12` | Releases shipped during their window — pull from CHANGELOG |
| `{{upgrade_credit}}` | `$249` | What they paid for Standard |
| `{{upgrade_price}}` | `$250` | Lifetime current price minus credit. Default: `$499 - $249 = $250` |
| `{{upgrade_url}}` | `https://buy.polar.sh/...` | Polar discount-coded checkout for the upgrade |
| `{{founder_name}}` | `Franyer` | Sign-off |
| `{{discord_url}}` | `https://discord.gg/...` | Optional CTA secondary |

> **Building the upgrade URL.** In Polar, create a one-time discount
> code worth `{{upgrade_credit}}` (e.g. `STANDARD-CREDIT-249`) that's
> only valid on the Lifetime product. Append it to the checkout URL:
> `?discount_code=STANDARD-CREDIT-249`. Limit one redemption per
> customer email so it can't be reused.

---

## Subject line — pick one

Test 2-3 of these in your tool. The first reads as the most personal,
which usually wins on indie SaaS. Avoid anything that sounds automated.

1. **Quick heads-up about your LaunchKit license**  *(personal, low-key)*
2. **{{first_name}}, your update window wraps next month**  *(specific, clear)*
3. **11 months in — what's next for your LaunchKit license**  *(milestone framing)*
4. **One year of LaunchKit updates — and what comes next**  *(bookends the journey)*

**Pre-header** (the gray text after the subject):

> A note about your access, no urgency, just the math.

---

## Plain-text version

```
Hi {{first_name}},

Quick note — your 12 months of LaunchKit updates wrap on
{{end_date}}, about a month from now. Wanted to give you the heads-up
before you got there, not after.

Here's where you stand:

  Purchased       {{purchase_date}}
  Tier            Standard
  Updates so far  {{releases_count}} releases (every CHANGELOG entry shipped to you)
  Window ends     {{end_date}}

After {{end_date}}, your repo access stays — the code you already
cloned is yours forever, that doesn't change. What changes is that
new releases land for Lifetime buyers, and you'd stop pulling
upstream. Most folks fork once and never look back, so for a lot of
buyers this is a non-event.

But — if you've actually been pulling updates this past year, or
you're planning to ship a few more SaaS in the next year or two,
the Lifetime upgrade is the right call.

The math:

  Lifetime today      $499
  Your Standard credit  -{{upgrade_credit}}
  ─────────────────────────
  You pay             {{upgrade_price}}

That's a single payment, and you keep getting every update I ship —
forever. Same private repo access, same Discord, plus the
Lifetime-only channel and early access to new features.

Upgrade with your credit:
  {{upgrade_url}}

This link bakes in your Standard credit and works until
{{end_date}}. If you don't upgrade, no hard feelings — your code is
still yours, and you can always come back at full price later.

If you'd rather chat first, reply to this email. I read every reply.

Thanks for trusting LaunchKit with your project this year. Genuinely.

— {{founder_name}}

PS — if you've already shipped something with LaunchKit, I'd love to
see it. Reply with a link and I'll add you to the showcase if you're
up for it.
```

---

## HTML version (inline-styled, email-safe)

Paste into any tool that accepts raw HTML. Tested visually in Gmail,
Apple Mail, Outlook 365 web. Inline styles only — no `<style>` block,
no external CSS, no JavaScript. Width capped at 560px.

```html
<!doctype html>
<html lang="en">
<body style="margin:0;padding:24px 12px;background-color:#FAF8F2;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','Helvetica Neue',Arial,sans-serif;color:#16100D;line-height:1.6;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;margin:0 auto;background:#ffffff;border:1px solid #ebe6dc;border-radius:12px;overflow:hidden;">
    <tr>
      <td style="padding:28px 32px 8px 32px;">
        <p style="margin:0 0 18px 0;font-family:'SFMono-Regular',Menlo,monospace;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#857c70;">
          LaunchKit · License update
        </p>
        <h1 style="margin:0 0 18px 0;font-size:24px;font-weight:600;letter-spacing:-0.02em;line-height:1.2;color:#16100D;">
          Your update window wraps next month.
        </h1>
        <p style="margin:0 0 16px 0;font-size:15px;color:#3a342d;">
          Hi {{first_name}} — quick note. Your 12 months of LaunchKit updates
          wrap on <strong>{{end_date}}</strong>, about a month from now.
          Wanted to give you the heads-up before you got there, not after.
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
                  <td style="padding:4px 0;color:#857c70;">Purchased</td>
                  <td align="right" style="padding:4px 0;font-family:'SFMono-Regular',Menlo,monospace;color:#16100D;">{{purchase_date}}</td>
                </tr>
                <tr>
                  <td style="padding:4px 0;color:#857c70;">Tier</td>
                  <td align="right" style="padding:4px 0;font-family:'SFMono-Regular',Menlo,monospace;color:#16100D;">Standard</td>
                </tr>
                <tr>
                  <td style="padding:4px 0;color:#857c70;">Updates so far</td>
                  <td align="right" style="padding:4px 0;font-family:'SFMono-Regular',Menlo,monospace;color:#16100D;">{{releases_count}} releases</td>
                </tr>
                <tr>
                  <td style="padding:4px 0;color:#857c70;">Window ends</td>
                  <td align="right" style="padding:4px 0;font-family:'SFMono-Regular',Menlo,monospace;color:#d96b4a;">{{end_date}}</td>
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
          After {{end_date}}, <strong>your repo access stays</strong> — the
          code you already cloned is yours forever. What changes is that
          new releases land for Lifetime buyers, and you'd stop pulling
          upstream. Most folks fork once and never look back, so for a lot
          of buyers this is a non-event.
        </p>
        <p style="margin:0 0 24px 0;font-size:15px;color:#3a342d;">
          But — if you've actually been pulling updates this past year,
          or you're planning to ship more SaaS in the next year or two,
          the Lifetime upgrade is the right call.
        </p>
      </td>
    </tr>

    <tr>
      <td style="padding:0 32px 24px 32px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #16100D;border-radius:12px;background:#16100D;color:#FAF8F2;">
          <tr>
            <td style="padding:20px 24px;">
              <p style="margin:0 0 12px 0;font-family:'SFMono-Regular',Menlo,monospace;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:rgba(250,248,242,0.55);">
                Upgrade math
              </p>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:15px;">
                <tr>
                  <td style="padding:5px 0;color:rgba(250,248,242,0.85);">Lifetime today</td>
                  <td align="right" style="padding:5px 0;font-family:'SFMono-Regular',Menlo,monospace;">$499</td>
                </tr>
                <tr>
                  <td style="padding:5px 0;color:rgba(250,248,242,0.85);">Your Standard credit</td>
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
          Upgrade to Lifetime — {{upgrade_price}} →
        </a>
      </td>
    </tr>

    <tr>
      <td style="padding:8px 32px 24px 32px;">
        <p style="margin:0;font-size:13px;color:#857c70;text-align:center;">
          This link bakes in your Standard credit and works until {{end_date}}.
        </p>
      </td>
    </tr>

    <tr>
      <td style="padding:0 32px 28px 32px;border-top:1px solid #ebe6dc;">
        <p style="margin:24px 0 12px 0;font-size:14px;color:#3a342d;">
          If you'd rather chat first, just reply to this email. I read every one.
        </p>
        <p style="margin:0 0 12px 0;font-size:14px;color:#3a342d;">
          Thanks for trusting LaunchKit with your project this year. Genuinely.
        </p>
        <p style="margin:0 0 18px 0;font-size:14px;color:#3a342d;">— {{founder_name}}</p>
        <p style="margin:0;font-size:13px;color:#857c70;font-style:italic;">
          PS — if you've already shipped something with LaunchKit, I'd love
          to see it. Reply with a link and I'll add you to the showcase if
          you're up for it.
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

## Suggested send schedule

Most marketing tools let you trigger an email N days after a customer
property. Two well-tested patterns:

1. **One-shot, 30 days out** — single email, no follow-up. Lower volume,
   but Standard buyers who upgrade usually do so within a week of
   reading the email anyway.
2. **Two-touch sequence** — same email at day −30, then a shorter
   reminder at day −7 ("Quick reminder — link expires {{end_date}}").
   Roughly 1.5× the conversion of single-shot in similar indie funnels,
   based on the Marc Lou / Pieter Levels writeups.

Avoid sending more than two reminders. Standard buyers paid you in
good faith — three+ emails reads as nagging and damages goodwill for
the future.

## What NOT to do

- **Don't revoke their repo access.** Even if they don't upgrade, leave
  them in the GitHub team. The cost to you is zero; the goodwill is
  high. They might come back at full price next year, or refer a friend.
- **Don't auto-charge.** Standard is one-time, not a subscription.
  Auto-charging would violate the original purchase terms and trigger
  chargebacks.
- **Don't use scarcity language** ("ONLY 24 HOURS LEFT!"). The window
  is real but spelled out calmly. Indie devs hate growth-hack pressure.
- **Don't apologize for upselling.** You built something useful,
  shipped 12 months of updates, and you're offering a fair upgrade
  with their original payment fully credited. That's the deal.
