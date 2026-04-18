const { test, expect } = require('@playwright/test');

test('match task drag-and-drop shows reward', async ({ page }) => {
  await page.goto('http://localhost:4173');
  await page.waitForSelector('[data-testid="drag-a"]');
  // Use dragAndDrop via page API
  await page.dragAndDrop('[data-testid="drag-a"]', '[data-testid="drop-a"]');
  await expect(page.locator('[data-testid="reward"]')).toBeVisible({ timeout: 2000 });
});
