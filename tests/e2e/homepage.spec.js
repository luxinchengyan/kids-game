const { test, expect } = require('@playwright/test');

test('homepage loads', async ({ page }) => {
  await page.goto('http://localhost:4173');
  await expect(page.getByTestId('home')).toBeVisible();
  await expect(page.getByRole('heading', { name: /童梦飞船 · 智趣成长/ })).toBeVisible();
});
