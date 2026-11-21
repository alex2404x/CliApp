-- Schema Migration for Bitdeer Cloud Mining Clone
create extension if not exists "uuid-ossp";

create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  full_name text,
  balance_usd numeric(12, 2) not null default 0.00,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table plans (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  miner_model text not null,
  hashrate_th numeric(10, 2) not null,
  duration_days integer not null,
  hashrate_price_usd numeric(12, 2) not null,
  daily_electricity_fee_usd numeric(10, 2) not null,
  status text not null default 'available' check (status in ('available', 'sold_out', 'archived')),
  created_at timestamptz not null default now()
);

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
