const { test, expect } = require('@playwright/test');

test('choice task click shows reward', async ({ page }) => {
  await page.goto('http://localhost:4173');
  await page.waitForSelector('[data-testid="choice-a"]');
  await page.click('[data-testid="choice-a"]');
  await expect(page.locator('[data-testid="reward"]')).toBeVisible({ timeout: 1000 });
});
