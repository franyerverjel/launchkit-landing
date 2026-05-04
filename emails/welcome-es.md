# Email · Bienvenida — comprador acaba de pagar (ES)

El primer email que recibe un comprador nuevo, enviado en cuanto Polar
dispara el webhook `order.completed`. Para cuando llega ya debería tener
el invite de GitHub (Polar gestiona el alta en la org automáticamente —
ver `docs/POLAR_SETUP.md`), así que este email confirma lo que pasó,
los apunta al README y deja claro cómo contactarnos.

Este archivo es la fuente de la copy en español. Hay dos versiones
debajo (texto plano y HTML) — usa la que mejor le venga a tu herramienta
de envío. La versión en inglés vive en
[`welcome-en.md`](./welcome-en.md).

---

## Variables a sustituir

| Variable | Ejemplo | Notas |
|---|---|---|
| `{{first_name}}` | `Franyer` | Del registro de cliente en Polar |
| `{{tier_name}}` | `Lifetime` | `Standard` o `Lifetime` |
| `{{order_id}}` | `polar_o_abc123` | Para sus registros y nuestra búsqueda de soporte |
| `{{github_username}}` | `franyerv` | Capturado en el checkout — confirma a quién se invitó |
| `{{github_org_url}}` | `https://github.com/launchasaas` | La org de buyers |
| `{{api_repo_url}}` | `https://github.com/launchasaas/launchkit-api` | |
| `{{web_repo_url}}` | `https://github.com/launchasaas/launchkit-web` | |
| `{{discord_invite_url}}` | `https://discord.gg/...` | **Solo Lifetime** — omitir el bloque de Discord para Standard |
| `{{founder_name}}` | `Franyer` | Despedida |
| `{{contact_email}}` | `hello@launchasaas.dev` | Reply-to |

> **Bloque condicional de Discord.** Tanto la versión en texto plano
> como la HTML llevan una sección marcada como `{{#if tier=Lifetime}}`
> ... `{{/if}}`. Si tu herramienta de envío soporta condicionales
> (Resend con templates tipo Liquid, segmentos de ConvertKit, filtros
> de Customer.io), suprímela cuando `tier_name == "Standard"`. Si no,
> mantén dos plantillas separadas por tier.

---

## Asunto — elige uno

1. **Bienvenido a LaunchKit, {{first_name}} — tus repos están listos**  *(personal, lleva al primer paso)*
2. **Estás dentro. Así clonas LaunchKit en 60 segundos**  *(framing de activación)*
3. **{{first_name}}, tu acceso a LaunchKit ya está activo**  *(corto, calmo)*

**Pre-header (texto en gris junto al asunto):**

> Invite de GitHub, URLs de los repos, y qué leer primero.

---

## Versión en texto plano

```
Hola {{first_name}},

Gracias por comprar LaunchKit. El tier {{tier_name}} te queda como
anillo al dedo — vamos a clonar.

Lo que acaba de pasar
─────────────────────

  1. Polar cobró tu tarjeta y te envió la factura.
  2. Agregamos a "{{github_username}}" a la organización de
     buyers en GitHub. Deberías ver un invite de GitHub en tu
     bandeja en unos minutos — acéptalo y estás dentro.
  3. Tu order ID es {{order_id}}, guárdalo para tus registros.

Los dos repos que vas a querer clonar
─────────────────────────────────────

  Backend (Django + DRF)   {{api_repo_url}}
  Frontend (Next.js 16)    {{web_repo_url}}

  git clone {{api_repo_url}}.git
  git clone {{web_repo_url}}.git

5 minutos para tener la app corriendo
─────────────────────────────────────

  1. Entra a cualquiera de los dos repos y lee el README.md.
  2. cp .env.example .env, llena lo que necesites (o deja los
     defaults — el demo seed levanta data de prueba).
  3. docker compose up -d  (postgres + redis + api + worker).
  4. python manage.py seed_demo  (crea un tenant de demo con
     usuarios, planes y algunas facturas).
  5. open http://localhost:3000 → entra con las credenciales
     de demo que vienen en el README.

Lee los archivos CLAUDE.md en la raíz de cada repo antes de
ponerte a editar — mapean todos los patrones críticos del
código. Tu agente de IA (Claude, Cursor, Codex, lo que uses)
los lee en cada prompt y escribe mucho mejor código gracias a
ellos.

{{#if tier=Lifetime}}
Tus perks de Lifetime
─────────────────────

  • Canal de Discord (exclusivo Lifetime): {{discord_invite_url}}
    Subo builds tempranos, hilos de RFC y el voto del roadmap acá.
  • Updates para siempre — cada major version, sin caducidad.
  • Acceso temprano a features antes de que lleguen a Standard.
  • Voto sobre qué se construye después.

{{/if}}
Cómo funcionan los updates
──────────────────────────

Saco una release nueva cada 4–8 semanas. Cada una trae una entrada
en el CHANGELOG con notas de migración cuando aplica. Pulear es un
git normal:

  git remote add upstream {{api_repo_url}}.git
  git fetch upstream && git merge upstream/main

La mayoría va a forkear una vez y nunca más va a hacer git pull, y
está perfecto. El repo va a seguir ahí si necesitas algún update
puntual más adelante.

¿Necesitas ayuda?
─────────────────

Responde a este email. Leo cada respuesta y contesto en menos de 24
horas en días laborables. Para preguntas largas de arquitectura,
mándame un Loom — te respondo con otro.

Si tienes alguna victoria temprana shippeando con LaunchKit, me
encantaría escucharla — respóndeme contándome qué estás
construyendo.

Bienvenido a bordo. Ahora a shippear.

— {{founder_name}}
```

---

## Versión HTML (estilos inline, email-safe)

```html
<!doctype html>
<html lang="es">
<body style="margin:0;padding:24px 12px;background-color:#FAF8F2;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','Helvetica Neue',Arial,sans-serif;color:#16100D;line-height:1.6;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;margin:0 auto;background:#ffffff;border:1px solid #ebe6dc;border-radius:12px;overflow:hidden;">
    <tr>
      <td style="padding:28px 32px 8px 32px;">
        <p style="margin:0 0 18px 0;font-family:'SFMono-Regular',Menlo,monospace;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#857c70;">
          LaunchKit · {{tier_name}}
        </p>
        <h1 style="margin:0 0 18px 0;font-size:24px;font-weight:600;letter-spacing:-0.02em;line-height:1.2;color:#16100D;">
          Bienvenido a bordo, {{first_name}}.
        </h1>
        <p style="margin:0 0 16px 0;font-size:15px;color:#3a342d;">
          Gracias por comprar LaunchKit. Tus repos ya están listos —
          aquí tienes todo lo que necesitas para empezar a clonar.
        </p>
      </td>
    </tr>

    <tr>
      <td style="padding:8px 32px 0 32px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #ebe6dc;border-radius:10px;background:#FAF8F2;">
          <tr>
            <td style="padding:18px 20px;">
              <p style="margin:0 0 12px 0;font-family:'SFMono-Regular',Menlo,monospace;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#857c70;">
                Resumen del pedido
              </p>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:14px;color:#3a342d;">
                <tr>
                  <td style="padding:4px 0;color:#857c70;">Tier</td>
                  <td align="right" style="padding:4px 0;font-family:'SFMono-Regular',Menlo,monospace;color:#16100D;">{{tier_name}}</td>
                </tr>
                <tr>
                  <td style="padding:4px 0;color:#857c70;">Usuario invitado</td>
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
          Los dos repos que vas a clonar
        </h2>
        <p style="margin:0 0 14px 0;font-size:14px;color:#3a342d;">
          Acepta el invite de GitHub que acaba de llegar a tu bandeja, y luego:
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
          5 minutos para tener la app corriendo
        </h2>
        <ol style="margin:0 0 8px 0;padding-left:22px;font-size:14px;color:#3a342d;">
          <li style="margin-bottom:6px;">Lee el <code style="font-family:'SFMono-Regular',Menlo,monospace;background:#f4efe5;padding:1px 5px;border-radius:4px;color:#d96b4a;">README.md</code> en la raíz de cualquier repo.</li>
          <li style="margin-bottom:6px;"><code style="font-family:'SFMono-Regular',Menlo,monospace;background:#f4efe5;padding:1px 5px;border-radius:4px;color:#d96b4a;">cp .env.example .env</code> — los defaults funcionan para el demo.</li>
          <li style="margin-bottom:6px;"><code style="font-family:'SFMono-Regular',Menlo,monospace;background:#f4efe5;padding:1px 5px;border-radius:4px;color:#d96b4a;">docker compose up -d</code></li>
          <li style="margin-bottom:6px;"><code style="font-family:'SFMono-Regular',Menlo,monospace;background:#f4efe5;padding:1px 5px;border-radius:4px;color:#d96b4a;">python manage.py seed_demo</code></li>
          <li>Abre <strong>http://localhost:3000</strong> — entra con las credenciales de demo del README.</li>
        </ol>
        <p style="margin:14px 0 0 0;font-size:14px;color:#3a342d;">
          Lee los archivos <code style="font-family:'SFMono-Regular',Menlo,monospace;background:#f4efe5;padding:1px 5px;border-radius:4px;color:#d96b4a;">CLAUDE.md</code>
          en la raíz de cada repo antes de empezar a editar — mapean todos
          los patrones críticos del código. Cualquier agente de IA (Claude,
          Cursor, Codex) los lee en cada prompt y escribe mucho mejor
          código gracias a ellos.
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
                Perks de Lifetime
              </p>
              <p style="margin:0 0 10px 0;font-size:14px;color:#3a342d;">
                Desbloqueaste el Discord privado. Subo builds tempranos,
                hilos de RFC y el voto del roadmap ahí.
              </p>
              <p style="margin:0;">
                <a href="{{discord_invite_url}}" style="display:inline-block;background:#d96b4a;color:#ffffff;text-decoration:none;font-size:14px;font-weight:600;padding:10px 18px;border-radius:9999px;">
                  Únete al Discord de Lifetime →
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
          <strong>¿Necesitas ayuda?</strong> Responde a este email — leo
          cada respuesta y contesto en menos de 24 horas en días
          laborables. Para preguntas largas de arquitectura mándame un
          Loom y te respondo con otro.
        </p>
        <p style="margin:0 0 16px 0;font-size:14px;color:#3a342d;">
          Si shippeas algo con LaunchKit me encantaría saberlo. Respóndeme
          contándome qué estás construyendo.
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
