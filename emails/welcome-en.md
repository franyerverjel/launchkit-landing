# Email · Welcome — buyer just purchased (EN)

The first email a new buyer gets from us, sent immediately after Polar
fires the `order.completed` webhook. By the time it lands they should
already have the GitHub invite (Polar handles the org membership
automatically — see `docs/POLAR_SETUP.md`), so this email confirms
what just happened, points them at the README, and sets expectations
for how to reach us.

This file is the source of truth for the EN copy. Plain-text and
HTML versions are below — pick whichever your sending tool prefers.
The Spanish version lives in [`welcome-es.md`](./welcome-es.md).

---

## Variables to substitute

| Variable | Example | Notes |
|---|---|---|
| `{{first_name}}` | `Franyer` | From the Polar customer record |
| `{{tier_name}}` | `Lifetime` | `Standard` or `Lifetime` |
| `{{order_id}}` | `polar_o_abc123` | For their records / our support lookup |
| `{{github_username}}` | `franyerv` | Captured at checkout — confirms invite target |
| `{{github_org_url}}` | `https://github.com/launchasaas` | The buyers org |
| `{{api_repo_url}}` | `https://github.com/launchasaas/launchkit-api` | |
| `{{web_repo_url}}` | `https://github.com/launchasaas/launchkit-web` | |
| `{{discord_invite_url}}` | `https://discord.gg/...` | **Lifetime only** — omit the Discord block for Standard |
| `{{founder_name}}` | `Franyer` | Sign-off |
| `{{contact_email}}` | `hello@launchasaas.dev` | Reply-to |

> **Conditional Discord block.** The plain-text and HTML versions both
> contain a section labelled `{{#if tier=Lifetime}}` ... `{{/if}}`. If
> your sending tool supports conditional logic (Resend with
> liquid-style templates, ConvertKit segments, Customer.io filters),
> drop that block when `tier_name == "Standard"`. Otherwise maintain
> two separate templates per tier.

---

## Subject line — pick one

1. **Welcome to LaunchKit, {{first_name}} — your repos are ready**  *(personal, leads with action)*
2. **You're in. Here's how to clone LaunchKit in 60 seconds**  *(activation framing)*
3. **{{first_name}}, your LaunchKit access is live**  *(short, calm)*

**Pre-header:**

> GitHub invite, repo URLs, and what to read first.

---

## Plain-text version

```
Hey {{first_name}},

Thanks for buying LaunchKit. The {{tier_name}} tier suits you well —
let's get you cloning.

What just happened
──────────────────

  1. Polar charged your card and sent you an invoice.
  2. We added "{{github_username}}" to the LaunchKit buyers
     organization on GitHub. You should see an invite email from
     GitHub within a few minutes — accept it and you're in.
  3. Your order ID is {{order_id}}, save it for your records.

The two repos you'll want to clone
──────────────────────────────────

  Backend (Django + DRF)   {{api_repo_url}}
  Frontend (Next.js 16)    {{web_repo_url}}

  git clone {{api_repo_url}}.git
  git clone {{web_repo_url}}.git

The 5-minute path to a running app
──────────────────────────────────

  1. cd into either repo and read the README.md.
  2. cp .env.example .env, fill the bits you need (or leave the
     defaults — the demo seed will spin up fake data).
  3. docker compose up -d  (postgres + redis + api + worker).
  4. python manage.py seed_demo  (creates a demo tenant with users,
     plans, and a few invoices).
  5. open http://localhost:3000 → log in with the demo creds in the
     README.

Read the CLAUDE.md files at the root of each repo before you start
editing — they map every load-bearing pattern in the codebase. Your
AI agent (Claude, Cursor, Codex, whatever you use) reads them on
every prompt and writes much better code as a result.

{{#if tier=Lifetime}}
Your Lifetime perks
───────────────────

  • Discord channel (Lifetime-only): {{discord_invite_url}}
    I drop early builds, RFC threads, and the roadmap vote here.
  • Updates forever — every major version, no expiry.
  • Early access to new features before they ship to Standard.
  • A vote on what gets built next.

{{/if}}
How updates work
────────────────

I ship a new release every 4–8 weeks. Each one has a CHANGELOG entry
with migration notes when needed. Pulling is a normal:

  git remote add upstream {{api_repo_url}}.git
  git fetch upstream && git merge upstream/main

Most of you will fork once and never `git pull` again, and that's
totally fine. The repo will still be there if you ever need a
specific update.

Need help?
──────────

Reply to this email. I read every reply and answer within 24 hours
on weekdays. For longer architecture questions, paste the question
into Discord (Lifetime) or shoot me a Loom — I'll send one back.

If you have any quick wins shipping with LaunchKit, I'd love to
hear about them — reply with what you're building.

Welcome aboard. Now go ship.

— {{founder_name}}
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
          LaunchKit · {{tier_name}}
        </p>
        <h1 style="margin:0 0 18px 0;font-size:24px;font-weight:600;letter-spacing:-0.02em;line-height:1.2;color:#16100D;">
          Welcome aboard, {{first_name}}.
        </h1>
        <p style="margin:0 0 16px 0;font-size:15px;color:#3a342d;">
          Thanks for buying LaunchKit. Your repos are wired up — here's
          everything you need to start cloning.
        </p>
      </td>
    </tr>

    <tr>
      <td style="padding:8px 32px 0 32px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #ebe6dc;border-radius:10px;background:#FAF8F2;">
          <tr>
            <td style="padding:18px 20px;">
              <p style="margin:0 0 12px 0;font-family:'SFMono-Regular',Menlo,monospace;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#857c70;">
                Order summary
              </p>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:14px;color:#3a342d;">
                <tr>
                  <td style="padding:4px 0;color:#857c70;">Tier</td>
                  <td align="right" style="padding:4px 0;font-family:'SFMono-Regular',Menlo,monospace;color:#16100D;">{{tier_name}}</td>
                </tr>
                <tr>
                  <td style="padding:4px 0;color:#857c70;">GitHub user invited</td>
                  <td align="right" style="padding:4px 0;font-family:'SFMono-Regular',Menlo,monospace;color:#16100D;">{{github_username}}</td>
                </tr>
                <tr>
                  <td style="padding:4px 0;color:#857c70;">Order ID</td>
                  <td align="right" style="padding:4px 0;font-family:'SFMono-Regular',Menlo,monospace;font-size:12px;color:#857c70;">{{order_id}}</td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <tr>
      <td style="padding:24px 32px 8px 32px;">
        <h2 style="margin:0 0 12px 0;font-size:17px;font-weight:600;letter-spacing:-0.015em;color:#16100D;">
          The two repos to clone
        </h2>
        <p style="margin:0 0 14px 0;font-size:14px;color:#3a342d;">
          Accept the GitHub invite that just landed in your inbox, then:
        </p>
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#16100D;border-radius:10px;color:#FAF8F2;font-family:'SFMono-Regular',Menlo,monospace;font-size:13px;line-height:1.6;">
          <tr>
            <td style="padding:16px 20px;">
              <span style="color:#d96b4a;">$</span> git clone {{api_repo_url}}.git<br>
              <span style="color:#d96b4a;">$</span> git clone {{web_repo_url}}.git
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <tr>
      <td style="padding:24px 32px 0 32px;">
        <h2 style="margin:0 0 12px 0;font-size:17px;font-weight:600;letter-spacing:-0.015em;color:#16100D;">
          5 minutes to a running app
        </h2>
        <ol style="margin:0 0 8px 0;padding-left:22px;font-size:14px;color:#3a342d;">
          <li style="margin-bottom:6px;">Read the <code style="font-family:'SFMono-Regular',Menlo,monospace;background:#f4efe5;padding:1px 5px;border-radius:4px;color:#d96b4a;">README.md</code> at the root of either repo.</li>
          <li style="margin-bottom:6px;"><code style="font-family:'SFMono-Regular',Menlo,monospace;background:#f4efe5;padding:1px 5px;border-radius:4px;color:#d96b4a;">cp .env.example .env</code> — defaults work for the demo.</li>
          <li style="margin-bottom:6px;"><code style="font-family:'SFMono-Regular',Menlo,monospace;background:#f4efe5;padding:1px 5px;border-radius:4px;color:#d96b4a;">docker compose up -d</code></li>
          <li style="margin-bottom:6px;"><code style="font-family:'SFMono-Regular',Menlo,monospace;background:#f4efe5;padding:1px 5px;border-radius:4px;color:#d96b4a;">python manage.py seed_demo</code></li>
          <li>Open <strong>http://localhost:3000</strong> — log in with the demo creds in the README.</li>
        </ol>
        <p style="margin:14px 0 0 0;font-size:14px;color:#3a342d;">
          Read the <code style="font-family:'SFMono-Regular',Menlo,monospace;background:#f4efe5;padding:1px 5px;border-radius:4px;color:#d96b4a;">CLAUDE.md</code>
          files at the root of each repo before you start editing — they
          map every load-bearing pattern in the codebase. Any AI agent
          (Claude, Cursor, Codex) reads them on every prompt and writes
          much better code as a result.
        </p>
      </td>
    </tr>

    {{#if tier=Lifetime}}
    <tr>
      <td style="padding:24px 32px 0 32px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #d96b4a;border-radius:12px;background:#fdf3ee;">
          <tr>
            <td style="padding:18px 20px;">
              <p style="margin:0 0 8px 0;font-family:'SFMono-Regular',Menlo,monospace;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#d96b4a;">
                Lifetime perks
              </p>
              <p style="margin:0 0 10px 0;font-size:14px;color:#3a342d;">
                You unlocked the private Discord. I drop early builds,
                RFC threads, and the roadmap vote there.
              </p>
              <p style="margin:0;">
                <a href="{{discord_invite_url}}" style="display:inline-block;background:#d96b4a;color:#ffffff;text-decoration:none;font-size:14px;font-weight:600;padding:10px 18px;border-radius:9999px;">
                  Join the Lifetime Discord →
                </a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    {{/if}}

    <tr>
      <td style="padding:28px 32px 28px 32px;border-top:1px solid #ebe6dc;">
        <p style="margin:24px 0 12px 0;font-size:14px;color:#3a342d;">
          <strong>Need help?</strong> Reply to this email — I read every
          one and answer within 24 hours on weekdays. For longer
          architecture questions, drop me a Loom and I'll send one back.
        </p>
        <p style="margin:0 0 16px 0;font-size:14px;color:#3a342d;">
          If you ship something with LaunchKit, I'd love to hear about
          it. Reply with what you're building.
        </p>
        <p style="margin:0 0 8px 0;font-size:14px;color:#3a342d;">— {{founder_name}}</p>
      </td>
    </tr>
  </table>

  <p style="max-width:560px;margin:16px auto 0;text-align:center;font-size:11px;color:#857c70;font-family:'SFMono-Regular',Menlo,monospace;letter-spacing:0.1em;">
    LaunchKit · launchasaas.dev · {{contact_email}}
  </p>
</body>
</html>
```
