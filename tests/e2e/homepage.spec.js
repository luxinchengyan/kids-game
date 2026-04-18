const { test, expect } = require('@playwright/test');

test('homepage loads', async ({ page }) => {
  await page.goto('http://localhost:4173');
  await expect(page.locator('body')).toBeVisible();
});
