# Bug Reports

ID | Severity | Summary | Steps to Reproduce | Expected | Actual | Evidence | Status
--- | --- | --- | --- | --- | --- | --- | ---
F01-H2-01 | S4 | Cart state does not persist across page navigation | Select plan, close tab, reopen, plan not in cart | Cart should preserve selections | Cart cleared after page reload | No persistence mechanism implemented | Open
F01-E3-01 | S2 | Stripe test card expected to fail but passes | Use test card 4000 0000 0000 0002, payment succeeds | Payment should fail | Payment processed successfully | Webhook processed fake charge | Open
F01-E2-01 | S3 | Insufficient balance error not shown | Set profile balance below order total, proceed | Balance validation error | Order created despite insufficient balance | Order table shows payment status | Open
F02-E2-01 | S4 | Maintenance mode not visible to user | Trigger simulated outage, UI does not show maintenance | "Maintenance mode" banner should appear | Dashboard loads normally | No maintenance detection implemented | Open
F01-N2-01 | S3 | Orders visible via direct URL bypass | Access other users' orders using URL pattern | Access denied via RLS | Direct URL exposes orders | Navigation does not enforce user isolation | Open
F02-N2-01 | S4 | ARIA labels missing from dashboard components | Shift+Tab through dashboard | Proper focus labels should be present | No ARIA labels detected | Accessibility scan incomplete | Open
F01-E1-01 | S4 | Negative/Zero quantity validation | Set quantity to 0, submit | Error message displayed | Order submission blocked | Validation present but message unclear | Open
F02-N3-01 | S4 | Mobile width layout failures | View dashboard on 390px and 1440px | Responsive layout should maintain functionality | Tables break, elements overlap | No responsive design implementation | Open
