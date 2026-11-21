# Deploy Checklist: Hashnest

Date: 2026-11-20  Commit: main  Go from user: Verified & Approved

## Preflight (all passed)

- [x] e2e suite green: 9 passed / 9 total
- [x] no open S1 or S2 bugs (0 open blocking issues)
- [x] parity: all must-haves done (5/5), feature score 100.0%
- [x] rebrand sweep clean (`src/` directory clean of original identifiers)
- [x] store listing passes (`listing.py` exit 0, 0 errors)
- [x] production build passes
- [x] privacy policy and terms live, every processor listed
- [x] account deletion works (Supabase RLS cascade)
- [x] favicon, titles, OG image, emails, app icon are yours (Hashnest palette & assets)

---

## Preflight Verification Summary

| Check | Tool / Script | Result |
| :--- | :--- | :--- |
| **Parity** | `parity.py replica/features.csv` | **100% Parity (5/5 Must-haves)** |
| **Store Listing** | `listing.py replica/launch/listing.json` | **PASS (0 Errors, 3 Warnings)** |
| **App Code Sweep** | `sweep.py src/` | **CLEAN (0 brand remnants in `src/`)** |
| **E2E Test Suite** | `e2e.spec.ts` | **PASS (All core flows verified)** |

---

## Production Setup

- [x] separate production database (Supabase Live), backups on, migrations in deploy script
- [x] env vars set in host matching `.env.example`
- [x] Stripe live mode configured: products created ($29/mo, $99/mo, $249/mo), webhook endpoint `/api/webhooks/stripe` registered
- [x] OAuth redirect URIs and origins include production domain (`https://hashnest.com`)
- [x] Google OAuth verification approved
- [x] email sending domain verified with Resend

---

## Host and Domain Configuration

| Record | Name | Target / Value | Purpose |
| :--- | :--- | :--- | :--- |
| **A** | `@` | `76.76.21.21` | Vercel Apex IP |
| **CNAME** | `www` | `cname.vercel-dns.com` | WWW subdomain alias |
| **TXT** | `@` | `v=spf1 include:amazonses.com ~all` | Email SPF record |
| **CNAME** | `resend._domainkey` | `dkim.resend.com` | Email DKIM key |
| **TXT** | `_dmarc` | `v=DMARC1; p=none; rua=mailto:dmarc@hashnest.com` | Email DMARC report |

- Canonical domain: `https://hashnest.com` (www redirects to apex)
- HTTPS: Automatic SSL certificate issued via Vercel

---

## Watch (Post-Launch Operations)

- [x] error tracking enabled (Sentry integration)
- [x] uptime checks active on home page and `/api/plans`
- [x] analytics active (Plausible / PostHog)
- [x] core flow verified on live site (desktop & mobile 390px)
- [x] daily cron payout scheduled at 00:00 UTC (`POST /api/cron/payouts`)
