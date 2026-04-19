const { test, expect } = require('@playwright/test');

test('microtask click plays and shows reward', async ({ page }) => {
  await page.goto('http://localhost:4173');
  await page.locator('label').filter({ hasText: '偏好主题' }).locator('select').selectOption('pinyin');
  await page.getByTestId('start-mission').click();
  await page.waitForSelector('[data-testid="battle-b"]');
  await page.click('[data-testid="play-b"]');
  await page.click('[data-testid="battle-b"]');
  await expect(page.locator('[data-testid="reward"]').first()).toBeVisible({ timeout: 1000 });
});
