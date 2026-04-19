const { test, expect } = require('@playwright/test');

test('parent summary copy button works', async ({ page }) => {
  await page.goto('http://localhost:4173');
  await page.locator('label').filter({ hasText: '偏好主题' }).locator('select').selectOption('math');
  await page.getByTestId('start-mission').click();
  await page.click('[data-testid="choice-3"]');
  await page.click('[data-testid="select-3"]');
  await page.click('[data-testid="select-b"]');
  await page.click('[data-testid="view-summary"]');
  await page.waitForSelector('[data-testid="copy-summary"]');
  await page.click('[data-testid="copy-summary"]');
  await expect(page.locator('text=Copied!')).toBeVisible({ timeout: 2000 });
});
