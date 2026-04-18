const { test, expect } = require('@playwright/test');

test('parent summary copy button works', async ({ page }) => {
  await page.goto('http://localhost:4173');
  // ensure some interaction occurs to populate score
  const play = page.locator('[data-testid="play-a"]')
  if (await play.count()) {
    await play.first().click();
  }
  await page.waitForSelector('[data-testid="copy-summary"]');
  await page.click('[data-testid="copy-summary"]');
  await expect(page.locator('text=Copied!')).toBeVisible({ timeout: 2000 });
});
