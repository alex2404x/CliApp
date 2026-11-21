# Backend Implementation Checklist: Bitdeer Clone

## Auth
- [x] Supabase Auth configured (Email/Password)
- [x] Public profile creation on signup (Trigger)
- [ ] OAuth (Google/Apple) - *Pending user credentials*
- [x] Account deletion logic (RLS `on delete cascade`)

## Database
- [x] SQL Migrations checked in (`replica/schema.sql`)
- [x] Row Level Security (RLS) policies defined for all tables
- [x] Seed script for active mining plans
- [ ] Automatic daily backups enabled on Supabase dashboard

## Payments (Stripe Test Mode)
- [x] Stripe Checkout integration for hashrate contracts
- [x] Webhook handler for `checkout.session.completed`
- [x] Idempotency: Webhook signature verification & event tracking
- [ ] Customer Portal for order cancellations

## Email & Jobs
- [x] Resend integration for order confirmations
- [x] Daily Reward Distribution Job (Vercel Cron)
- [x] Payout Idempotency (Database unique constraints)

## Security
- [x] Secrets only in `.env.local`
- [x] Input validation with Zod
- [x] RLS verified for multi-tenancy
- [ ] Rate limiting on auth endpoints
- [x] Webhook signature verification
- [x] No user data in URLs/Logs
