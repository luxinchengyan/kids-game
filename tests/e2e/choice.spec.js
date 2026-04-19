const { test, expect } = require('@playwright/test');

test('choice task click shows reward', async ({ page }) => {
  await page.goto('http://localhost:4173');
  await page.locator('label').filter({ hasText: '偏好主题' }).locator('select').selectOption('math');
  await page.getByTestId('start-mission').click();
  await page.waitForSelector('[data-testid="choice-3"]');
  await page.click('[data-testid="choice-3"]');
  await expect(page.locator('[data-testid="reward"]')).toBeVisible({ timeout: 1000 });
});
