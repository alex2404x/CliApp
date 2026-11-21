import { defineConfig } from '@playwright/test';

export default defineConfig({
  testMatch: 'e2e.spec.ts',
  use: { baseURL: 'http://localhost:3000' },
  webServer: { command: 'pnpm dev', url: 'http://localhost:3000', reuseExistingServer: !process.env.CI },
  workers: 2,
});
