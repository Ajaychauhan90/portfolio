# Ajay Chauhan Portfolio

A Next.js portfolio deployed to Cloudflare Workers with OpenNext.

## Local development

1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env.local` and add your local values.
3. Use Cloudflare Turnstile test keys for local contact-form testing.
4. Run `npm run dev` and open `http://localhost:3000`.

Do not commit `.env.local`, `.dev.vars`, API keys, or Turnstile secret keys.

## Contact form setup

The contact form posts to `src/app/api/contact/route.ts`. The route validates
the request, verifies Cloudflare Turnstile, and sends a plain-text email through
the Resend REST API.

Required variables are documented in `.env.example`:

- `NEXT_PUBLIC_TURNSTILE_SITE_KEY`
- `TURNSTILE_SECRET_KEY`
- `RESEND_API_KEY`
- `CONTACT_TO_EMAIL`
- `CONTACT_FROM_EMAIL`
- `CONTACT_ALLOWED_ORIGIN`
- `CONTACT_ALLOWED_HOSTNAME`

For production, configure `NEXT_PUBLIC_TURNSTILE_SITE_KEY` as a Cloudflare build
variable. Configure the remaining values as runtime variables, and store the
Resend and Turnstile secret keys as secrets.

## Checks

```bash
npm run lint
npx tsc --noEmit --incremental false
npm run build
npm run preview
```

## Deployment

```bash
npm run deploy -- --keep-vars
```

`--keep-vars` prevents a deployment from removing variables configured in the
Cloudflare dashboard.
