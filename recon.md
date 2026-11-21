# Recon Map: Bitdeer Cloud Mining Platform Clone

## 1. Scope
- **App & Platform:** Bitdeer Cloud Mining Platform (Web, responsive mobile web)
- **Slice:** The Core Cloud Hash Rate Purchase & Earnings Loop (Plan selection, pricing breakdown, order placement, and dashboard earnings overview). Excludes direct physical mining rig hosting (Hosting mode) and institutional treasury management services.
- **Target Audience:** Retail crypto enthusiasts looking to purchase cloud mining hashrate without owning physical mining hardware.

---

## 2. Sources Table

| Source | What it gives you | URL |
| --- | --- | --- |
| Marketing & Landing Page | Core value proposition, brand positioning, steps | https://www.bitdeer.com/cloud-mining |
| Pricing & Plans View | Hashrate pricing, electricity fee tiering, duration options | https://www.bitdeer.com/cloud-mining |
| Help Center / Docs | Plan lifecycle, settlement rules, maintenance fees | https://support.bitdeer.com |
| User Dashboard (Simulated / Public layout) | Order status, daily payout history, hash rate monitoring | `https://www.bitdeer.com/user/dashboard` (Reference layout) |

---

## 3. Screen Inventory

| ID | Screen | Route / Access | Purpose | Key Components | States Seen |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **S01** | Landing / Cloud Mining Home | `/cloud-mining` | Introduction to plans and promotional offers | Hero banner, Feature highlights, Mystery box banner, CTA "Start Mining" | Loaded, Mobile view |
| **S02** | Plan Catalog / Selection | `/cloud-mining/plans` | Browse active hashrate plans by miner model & duration | Filter tabs, Plan cards (Spec, Hashrate, Duration, Est. Output), Pricing badges | Empty (sold out), Filled, Loading |
| **S03** | Plan Details & Calculator | `/cloud-mining/plan/{id}` | Detailed breakdown of costs and projected returns | Hashrate selector, Estimated earnings calculator, Fee breakdown table (Hashrate + Electricity) | Default, Error (insufficient balance), Active |
| **S04** | Order Checkout / Payment | `/checkout` | Order summary and payment method selection | Order summary box, Coupon/Mystery Box code input, Payment asset selector (USDT, BTC, Fiat), Terms checkbox | Default, Processing, Success, Payment Failed |
| **S05** | User Dashboard / Orders | `/user/orders` | Overview of active and historical cloud mining contracts | Order status table, Active hashrate graphs, Quick stats (Total mined, Hashrate active) | Empty (no orders), Filled |

---

## 4. User Flows

### F01: Purchase a Cloud Mining Plan
* **Goal:** Browse, configure, and purchase a cloud mining hashrate contract.
* **Path:** `S01 Landing` -> `S02 Plan Catalog` -> `S03 Plan Details & Calculator` -> `S04 Order Checkout` -> `S05 User Dashboard`
* **Click Count (Happy Path):** 5 clicks.
* **Edge Cases:** 
  * Plan sells out while user is configuring parameters.
  * Payment fails or cryptocurrency transaction times out.
  * Insufficient wallet balance at checkout.

### F02: Monitor Daily Earnings
* **Goal:** View mined cryptocurrency payouts and current active hashrate performance.
* **Path:** `S05 User Dashboard` -> Inspect active order metrics & daily payout ledger.
* **Click Count:** 2 clicks.
* **Edge Cases:**
  * Network maintenance interruption / zero payout day due to high difficulty or low coin price.

---

## 5. Component List

| Component | Variants | States | Used In |
| :--- | :--- | :--- | :--- |
| **Plan Card** | Featured, Standard, Sold Out | Default, Hover, Disabled | S01, S02 |
| **Calculator Slider / Input** | Hashrate quantity, Duration selector | Active, Readonly | S03 |
| **Fee Breakdown Table** | Standard, Detailed | Expanded, Collapsed | S03, S04 |
| **Payment Method Selector** | Crypto (USDT/BTC), Credit Card | Selected, Unselected, Disabled | S04 |
| **Data Metric Tile** | Stat Card, Hashrate Graph tile | Normal, Loading, Alert | S05 |

---

## 6. Inferred Data Model

* **Plan**
  * `id`: string (UUID)
  * `name`: string (e.g., "Antminer S19Pro")
  * `hashrate_th`: decimal (Terahashes per second)
  * `duration_days`: integer
  * `hashrate_price_usd`: decimal
  * `daily_electricity_fee_usd`: decimal
  * `status`: enum (`available` | `sold_out`)
  * *Evidence:* S02 plan cards and S03 calculator.
  * *Confidence:* High

* **Order**
  * `id`: string (UUID)
  * `user_id`: string
  * `plan_id`: string
  * `quantity`: integer
  * `total_amount_usd`: decimal
  * `payment_currency`: string (`USDT` | `BTC` | `USD`)
  * `status`: enum (`pending` | `active` | `completed` | `cancelled`)
  * `created_at`: timestamp
  * *Evidence:* S04 checkout & S05 orders table.
  * *Confidence:* High

* **DailyPayout**
  * `id`: string (UUID)
  * `order_id`: string
  * `date`: date
  * `amount_btc`: decimal
  * `electricity_deducted_usd`: decimal
  * `net_profit_usd`: decimal
  * *Evidence:* S05 dashboard payout records.
  * *Confidence:* Medium

---

## 7. Feature Matrix

See `replica/features.csv` for the full feature matrix.

---

## 8. What Cannot Be Cloned

* **Real Physical Mining Infrastructure:** We cannot clone the underlying multi-megawatt data centers, Antminer ASIC hardware fleets, and direct power utility contracts.
* **Actual Cryptocurrency Mining Network Rewards:** The clone will simulate or mock live blockchain mining reward generation rather than connecting to real Proof-of-Work SHA-256 pools.
* **Real Payment Gateway Integration:** Actual fiat banking rails and live cryptocurrency on-chain settlement will be simulated for testing purposes.

---

## 9. Size It & Next Steps

* **Size Estimate:** **M** (A few weeks for frontend catalog, calculator, order placement, and simulated dashboard metrics).
* **Next Step:** `/replica-architect`
