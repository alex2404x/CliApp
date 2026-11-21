# Test Plan: Bitdeer Cloud Mining Clone

## F01-H1: Happy Path - Purchase a Cloud Mining Plan
- **Steps:**
  1. Navigate to landing page (`S01`) and click "Explore Plans"
  2. Select "Antminer S19Pro Plan" on catalog page (`S02`)
  3. Configure quantity to 1 on calculator (`S03`)
  4. Proceed to checkout (`S04`), select USDT as payment currency
  5. Submit and verify redirect to dashboard (`S05`) with active order
- **Expected:** Order is created in Supabase with status "active", daily payout job runs successfully
- **Evidence:** Visual confirmation of order table populated, DB state, and successful page navigation

## F01-H2: Cart Persistence
- **Steps:** Select multiple plans, verify they maintain across page navigation
- **Expected:** App state preserved for plan selections
- **Evidence:** Persistence verified through browser devtools/network inspection

## F01-E1: Empty Input Handling
- **Steps:** Attempt checkout with zero quantity
- **Expected:** Form validation prevents submission
- **Evidence:** Error message displayed, checkout button disabled

## F01-E2: Insufficient Balance
- **Steps:** Proceed with premium plan without sufficient profile balance
- **Expected:** Payment process blocks order submission
- **Evidence:** Error toast, no order created in DB

## F01-E3: Payment Failure Simulation
- **Steps:** Use Stripe test card (4000 0000 0000 0002) expecting failure
- **Expected:** Order remains pending, payment validation page displayed
- **Evidence:** Order DB shows status "pending" with failed webhook

## F01-N1: Wrong Password Login
- **Steps:** Attempt sign-up (if implemented) with incorrect credentials
- **Expected:** Authentication prevents access
- **Evidence:** Error message, no session created

## F01-N2: Deleted Account Accessibility
- **Steps:** Account deletion process completed
- **Expected:** No order data visible, account inaccessible
- **Evidence:** All profile/order data removed from Supabase

## F02-H1: Daily Earnings Monitoring
- **Steps:** Navigate to dashboard (`S05`), verify active hashrate and daily payouts
- **Expected:** Payouts display correctly, USD/BTC calculations accurate
- **Evidence:** UI stats match DB records

## F02-E1: Maintenance Mode
- **Steps:** Simulate external mining pool outage
- **Expected:** Dashboard shows "maintenance" alert, displays zero payouts
- **Evidence:** Maintenance flag visible, payout calculations paused

## F02-E2: Time Zone Handling
- **Steps:** View payouts when system timezone differs from order location
- **Expected:** Correct local time display on dashboard
- **Evidence:** Date/time formatted per user profile timezone

## F02-N1: Unauthorized Access
- **Steps:** Attempt to access other users' orders via direct URL
- **Expected:** Access denied, RLS policies enforce visibility
- **Evidence:** Redirection, no data revealed

## F02-N2: Screen Reader Labels
- **Steps:** Navigate dashboard with screen reader
- **Expected:** ARIA labels, semantic HTML provide full context
- **Evidence:** Accessibility audit passes AA standards

## F02-N3: Mobile Width Validation
- **Steps:** Test dashboard at 390px and 1440px
- **Expected:** Layout adapts, tables scroll horizontally
- **Evidence:** Responsive behavior verified via browser devtools
