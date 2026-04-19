const { test, expect } = require('@playwright/test');

test('match task drag-and-drop shows reward', async ({ page }) => {
  await page.goto('http://localhost:4173');
  await page.locator('label').filter({ hasText: '偏好主题' }).locator('select').selectOption('pinyin');
  await page.getByTestId('start-mission').click();
  await page.click('[data-testid="select-b"]');
  await page.waitForSelector('[data-testid="drag-b"]');
  await page.dragAndDrop('[data-testid="drag-b"]', '[data-testid="drop-b"]');
  await page.dragAndDrop('[data-testid="drag-m"]', '[data-testid="drop-m"]');
  await page.dragAndDrop('[data-testid="drag-f"]', '[data-testid="drop-f"]');
  await expect(page.locator('[data-testid="reward"]').first()).toBeVisible({ timeout: 2000 });
});
