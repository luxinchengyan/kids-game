const { test, expect } = require('@playwright/test');

test('microtask click plays and shows reward', async ({ page }) => {
  await page.goto('http://localhost:4173');
  await page.getByTestId('start-mission').click();
  await page.waitForSelector('[data-testid="play-b"]');
  await page.click('[data-testid="play-b"]');
  await page.click('[data-testid="select-b"]');
  await expect(page.locator('[data-testid="reward"]')).toBeVisible({ timeout: 1000 });
});
