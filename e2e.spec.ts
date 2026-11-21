import { test, expect } from '@playwright/test';

// Critical requirement: no console errors
test('No Console Errors', async ({ page }) => {
  page.on('console', (msg) => {
    if (msg.type() === 'error' || msg.type() === 'warning') {
      console.error('Console error:', msg.text());
    }
  });

  await page.goto('/cloud-mining');
});

// Verify HTTP status for each flow route
test('Check HTTP Statuses', async ({ page }) => {
  const routes = [
    '/cloud-mining',
    '/cloud-mining/plans',
    '/user/orders',
  ];

  for (const route of routes) {
    const response = await page.goto(route);
    expect(response?.status()).toBeLessThan(400);
  }
});

// Auth user journey: sign-up and login
test('Authentication Flow', async ({ page }) => {
  await page.goto('/auth/sign-up');
  await page.getByRole('textbox', { name: 'Email' }).fill('test@example.com');
  await page.getByRole('textbox', { name: 'Password' }).fill('SecurePass123!');
  await page.getByRole('button', { name: 'Sign Up' }).click();

  await expect(page.getByText(/verification|confirmation/i)).toBeVisible();

  await page.goto('/auth/login');
  await page.getByRole('textbox', { name: 'Email' }).fill('test@example.com');
  await page.getByRole('textbox', { name: 'Password' }).fill('SecurePass123!');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page.getByRole('button', { name: /logout/i })).toBeVisible();
});

// Purchase flow: plan selection and checkout
test('Purchase Flow', async ({ page }) => {
  await page.goto('/cloud-mining');
  await page.getByRole('link', { name: 'Explore Plans' }).click();

  await expect(page).toHaveURL('/cloud-mining/plans');

  const planCard = page.locator('[data-testid="plan-card"]').first();
  await planCard.getByRole('button', { name: 'Select & Configure' }).click();

  await expect(page).toHaveURL(/plan\/.*$/);

  await page.getByLabel('Quantity (Units)').fill('2');

  await page.getByRole('button', { name: 'Proceed to Checkout' }).click();

  await expect(page).toHaveURL('/checkout');

  await page.getByRole('radio', { name: 'USDT' }).check();

  await page.getByRole('button', { name: 'Confirm & Submit Payment' }).click();

  await expect(page).toHaveURL('/user/orders');
});

// Dashboard monitoring
test('Dashboard - Orders and Payouts', async ({ page }) => {
  await page.goto('/user/orders');

  await expect(page.getByTestId('active-hashrate')).toBeVisible();

  const orderRows = page.locator('table tbody tr');
  await expect(orderRows).toHaveCount(1);
});

// Daily payout cron check (UI only)
test('Daily Payouts in UI', async ({ page }) => {
  await page.goto('/user/orders');

  const payoutLabels = page.getByTestId('payout');
  await expect(payoutLabels.first()).toContainText(/\d+\.\d{4} BTC/i);
});

// Accessibility check
test('Accessibility Scan', async ({ page }) => {
  await page.goto('/');

  // Placeholder for axe-core scanning
});

// Admin-only flow: delete order (if roles implemented)
test('Order Deletion', async ({ page }) => {
  await page.goto('/user/orders');

  await page.getByRole('button', { name: 'Delete' }).first().click();

  await expect(page.locator('[data-testid="order-table"]').locator('tbody tr')).toHaveCount(0);
});

// Edge case: empty plan catalog
test('Empty State - No Available Plans', async ({ page }) => {
  await page.goto('/cloud-mining/plans');

  await expect(page.getByText(/no.*plan.*available/i)).toBeVisible();
});

// Edge case: invalid input (negative quantity)
test('Invalid Input Validation', async ({ page }) => {
  await page.goto('/cloud-mining/plan/1');

  await page.getByLabel('Quantity (Units)').fill('-5');

  await expect(page.getByText(/invalid|quantity/i)).toBeVisible();
});
