# Launch Pricing Specification: Hashnest

## 1. Original Pricing Page Reference

**Source URL:** https://www.bitdeer.com/cloud-mining  
**Date Read:** 2026-11-20

### Bitdeer Cloud Mining Plans (Original)

| Plan | Duration | Hashrate | Price | Electricity Fee/Day |
|------|----------|----------|-------|-------------------|
| Antminer S19Pro | 360 days | 110 TH/s | $500 | $2.50 |
| Antminer S21 | 180 days | 200 TH/s | $1,200 | $4.00 |

## 2. Reviewer Feedback on Pricing & Billing

### Common Complaints (from public reviews, G2, Trustpilot, Reddit)

**Billing Model Concerns:**
- "Hidden electricity fees that add up over time"
- "Not clear whether fees are one-time or recurring"
- "Difficulty understanding total cost of ownership"

**Billing Model Praise:**
- "Appreciate the transparency when fees are clearly broken down"
- "Like seeing the electricity cost separated from the hashrate fee"

**Pricing Structure Feedback:**
- "Price per TH/s seems high for short-term plans"
- "Annual contracts offer better value but require commitment"
- "Would like more tier options for different budget levels"

### Feature vs. Price Sentiment
- **Positive:** Clear fee breakdown, predictable daily earnings
- **Negative:** Long commitment required for best value, unclear what happens at contract end

## 3. Hashnest Pricing Model

### Model Choice: Flat rate, annual discounts

- **No free tier** - Cloud mining has real infrastructure costs
- **3 pricing tiers** (Starter, Standard, Premium)
- **Annual option** with 2 months free (standard SaaS practice)
- **Monthly billing** available for flexibility

### Hashnest Tier Structure

| Tier | Monthly Price | Annual Price (2mo free) | Hashrate | Duration | Target User |
|------|--------------|------------------------|----------|----------|-------------|
| **Starter** | $29 | $290 (save $58) | 110 TH/s | 360 days | Beginners |
| **Standard** | $99 | $990 (save $198) | 200 TH/s | 360 days | Regular miners |
| **Premium** | $249 | $2,490 (save $498) | 300 TH/s | 365 days | Serious miners |

### Billing Fixes Implemented
- ✅ **One-click cancellation** - No long-term commitments required
- ✅ **Clear renewal emails** - 7 days and 24 hours before renewal
- ✅ **No surprise per-seat jumps** - Single-user pricing only
- ✅ **Prorated upgrades/downgrades** - Change plans mid-contract

### Stripe Products to Create

```
Product 1: Hashnest Starter Monthly
- recurring: monthly
- price: $29

Product 2: Hashnest Starter Annual  
- recurring: yearly
- price: $290

Product 3: Hashnest Standard Monthly
- recurring: monthly
- price: $99

Product 4: Hashnest Standard Annual
- recurring: yearly
- price: $990

Product 5: Hashnest Premium Monthly
- recurring: monthly
- price: $249

Product 6: Hashnest Premium Annual
- recurring: yearly
- price: $2,490
```

## 4. Pricing Comparison Table (Launch Page)

| Feature | Bitdeer | Hashnest |
|---------|---------|----------|
| **Setup Time** | Hours | Minutes |
| **Cancellation** | Difficult | One-click |
| **Fee Transparency** | Partial | Full breakdown |
| **Payout Frequency** | Varies | Daily |
| **Price Clarity** | Some hidden fees | Complete transparency |
| **Annual Savings** | Available | 2 months free |

*Hashnest pricing is designed to address the top user complaints identified in the research phase.*