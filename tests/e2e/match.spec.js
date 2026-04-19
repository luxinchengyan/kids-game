const { test, expect } = require('@playwright/test');

test('match task drag-and-drop shows reward', async ({ page }) => {
  await page.goto('http://localhost:4173');
  await page.locator('label').filter({ hasText: '偏好主题' }).locator('select').selectOption('pinyin');
  await page.getByTestId('start-mission').click();
  await page.click('[data-testid="battle-b"]');
  await page.waitForSelector('[data-testid="drag-b"]');
  await page.click('[data-testid="drag-b"]');
  await page.click('[data-testid="drop-b"]');
  await page.click('[data-testid="drag-a"]');
  await page.click('[data-testid="drop-a"]');
  await page.click('[data-testid="drag-ba"]');
  await page.click('[data-testid="drop-ba"]');
  await expect(page.locator('[data-testid="reward"]').first()).toBeVisible({ timeout: 2000 });
});
