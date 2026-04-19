const { test, expect } = require('@playwright/test');

test('parent summary copy button works', async ({ page }) => {
  await page.goto('http://localhost:4173');
  await page.locator('label').filter({ hasText: '偏好主题' }).locator('select').selectOption('pinyin');
  await page.getByTestId('start-mission').click();
  await page.click('[data-testid="battle-p"]');
  await page.click('[data-testid="battle-b"]');
  await page.click('[data-testid="drag-b"]');
  await page.click('[data-testid="drop-b"]');
  await page.click('[data-testid="drag-a"]');
  await page.click('[data-testid="drop-a"]');
  await page.click('[data-testid="drag-ba"]');
  await page.click('[data-testid="drop-ba"]');
  await page.click('[data-testid="play-p"]');
  await page.click('[data-testid="select-p"]');
  await page.click('[data-testid="view-summary"]');
  await page.waitForSelector('[data-testid="copy-summary"]');
  await expect(page.getByText('薄弱知识点')).toBeVisible();
  await page.click('[data-testid="copy-summary"]');
  await expect(page.locator('text=Copied!')).toBeVisible({ timeout: 2000 });
});
