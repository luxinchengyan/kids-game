const { test, expect } = require('@playwright/test');

test('microtask click plays and shows reward', async ({ page }) => {
  await page.goto('http://localhost:4173');
  // Wait for body to be ready
  await expect(page.locator('body')).toBeVisible();
  // Click the play button for item 'a'
  await page.click('[data-testid="play-a"]');
  // Expect an ephemeral reward element to appear
  await expect(page.locator('[data-testid="reward"]')).toBeVisible({ timeout: 1000 });
});
