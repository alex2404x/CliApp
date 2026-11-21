# Architecture Specification: Bitdeer Cloud Mining Platform Clone

## 1. The Stack

| Layer | Choice | Why |
| --- | --- | --- |
| **Web App** | Next.js 14 (App Router) + TypeScript | Standard full-stack React framework with robust server actions and API routes. |
| **Styling** | Tailwind CSS + Design Tokens | Rapid, responsive styling matching the crypto/fintech dark-mode aesthetic. |
| **Database** | PostgreSQL on Supabase | Managed relational DB with robust row-level security (RLS) and real-time capabilities. |
| **ORM** | Drizzle ORM | Lightweight, type-safe SQL-first ORM with straightforward migrations. |
| **Auth** | Supabase Auth | Secure, built-in email/password and OAuth authentication. |
| **Payments** | Stripe Checkout + Billing (Mocked/Simulated for Crypto Rails) | Standard payment processing infrastructure for fiat/crypto gateway simulation. |
| **Email** | Resend | Reliable transactional email for order confirmations and payout alerts. |
| **Jobs** | Vercel Cron | Automated daily calculation and distribution of mined crypto rewards. |
| **Hosting** | Vercel | Seamless Next.js deployment and edge functions. |

---

## 2. The Database Schema (`replica/schema.sql`)

```sql
-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Users Profile table
create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  full_name text,
  balance_usd numeric(12, 2) not null default 0.00,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Plans table (Cloud mining contracts)
create table plans (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  miner_model text not null,
  hashrate_th numeric(10, 2) not null, -- Terahashes per second
  duration_days integer not null,
  hashrate_price_usd numeric(12, 2) not null,
  daily_electricity_fee_usd numeric(10, 2) not null,
  status text not null default 'available' check (status in ('available', 'sold_out', 'archived')),
  created_at timestamptz not null default now()
);

-- Orders table (User purchases of cloud mining plans)
create table orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  plan_id uuid not null references plans(id) on delete restrict,
  quantity integer not null default 1,
  total_amount_usd numeric(12, 2) not null,
  payment_currency text not null check (payment_currency in ('USDT', 'BTC', 'USD')),
  status text not null default 'pending' check (status in ('pending', 'active', 'completed', 'cancelled')),
  starts_at timestamptz,
  ends_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index on orders (user_id, status);
create index on orders (plan_id);

-- Daily Payouts table (Mined crypto distributions)
create table daily_payouts (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references orders(id) on delete cascade,
  user_id uuid not null references profiles(id) on delete cascade,
  payout_date date not null,
  mined_btc numeric(16, 8) not null,
  electricity_deducted_usd numeric(10, 2) not null,
  net_profit_usd numeric(12, 2) not null,
  created_at timestamptz not null default now(),
  constraint unique_order_date unique (order_id, payout_date)
);

create index on daily_payouts (user_id, payout_date);
create index on daily_payouts (order_id);

-- Row Level Security (RLS) Policies
alter table profiles enable row level security;
alter table plans enable row level security;
alter table orders enable row level security;
alter table daily_payouts enable row level security;

create policy "Public profiles are viewable by everyone" on profiles for select using (true);
create policy "Users can update own profile" on profiles for update using (auth.uid() = id);

create policy "Plans are viewable by everyone" on plans for select using (true);

create policy "Users can view own orders" on orders for select using (auth.uid() = user_id);
create policy "Users can insert own orders" on orders for insert with check (auth.uid() = user_id);

create policy "Users can view own payouts" on daily_payouts for select using (auth.uid() = user_id);
```

---

## 3. The API Specification

| Method | Path | What it does | Who can call it | Input | Output | Flow |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `GET` | `/api/plans` | List available cloud mining plans | Public | None | JSON array of plans | F01 |
| `GET` | `/api/plans/{id}` | Get plan details & calculator stats | Public | Plan ID | Plan object & calc metrics | F01 |
| `POST` | `/api/orders` | Create a new cloud mining order | Authenticated User | `plan_id`, `quantity`, `payment_currency` | Order object & payment details | F01 |
| `GET` | `/api/orders` | List user's active/historical orders | Authenticated User | Query params (status) | JSON array of orders | F05 |
| `GET` | `/api/payouts` | Get daily mined earnings ledger | Authenticated User | Date range filters | JSON array of daily payouts | F06 |
| `POST` | `/api/cron/payouts` | Execute daily reward distribution | Cron Worker (System) | Secret API key | Success count | Background Job |

---

## 4. The Parts That Bite

* **Idempotency in Daily Payouts:** Cron jobs distributing daily mined BTC must be strictly idempotent (enforced by the `unique_order_date` constraint on `daily_payouts`) to prevent double-crediting if a job retries.
* **Currency Precision:** Bitcoin amounts (`numeric(16, 8)`) and financial amounts (`numeric(12, 2)`) must be handled using exact numeric types, never floating-point math, to prevent rounding errors.
* **Contract Lifecycle Management:** Automatically transitioning orders from `pending` to `active` upon payment confirmation, and from `active` to `completed` when `ends_at` is reached, requires robust background cron handling.

---

## 5. Build Order

1. **Vertical Slice (Milestone 1):**
   - **Screens:** S01 (Landing), S02 (Catalog), S03 (Calculator).
   - **Tables:** `plans`.
   - **Routes:** `GET /api/plans`, `GET /api/plans/{id}`.
   - **Goal:** Render available cloud mining plans with interactive calculator.
2. **Must-Haves (Milestone 2):**
   - **Screens:** S04 (Checkout), S05 (Dashboard).
   - **Tables:** `profiles`, `orders`.
   - **Routes:** `POST /api/orders`, `GET /api/orders`.
   - **Goal:** Enable user sign-in, order placement, and order management.
3. **Should-Haves & Rewards (Milestone 3):**
   - **Features:** Daily payout ledger, automated daily cron payout distribution, balance tracking.
   - **Tables:** `daily_payouts`.
   - **Routes:** `GET /api/payouts`, `POST /api/cron/payouts`.

---

## Summary
- **Stack:** Next.js 14 + Tailwind CSS + Supabase (PostgreSQL) + Drizzle ORM
- **Table Count:** 4 tables (`profiles`, `plans`, `orders`, `daily_payouts`)
- **Route Count:** 6 API endpoints / Server Actions
- **Riskiest Parts:** Exact decimal precision for BTC payouts, cron idempotency, and contract lifecycle state management.
- **Next Step:** `/replica-design`
