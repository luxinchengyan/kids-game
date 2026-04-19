const { test, expect } = require('@playwright/test');

test('homepage loads', async ({ page }) => {
  await page.goto('http://localhost:4173');
  await expect(page.getByTestId('profile-setup')).toBeVisible();
  await expect(page.getByRole('banner').getByRole('heading', { name: '星光学习岛' })).toBeVisible();
});
