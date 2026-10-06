import { test, expect } from '@playwright/test';

test.describe('Home Page Navigation Suite', () => {
  test('Verify Home page has visible Shopping tab and navigates to Shopping page', async ({ page }) => {
    // 1. Navigate to ScriptedQA Login Page
    await page.goto('https://www.scriptedqa.com/');

    // 2. Log in with demo credentials
    await page.fill('input[placeholder="Username"]', 'admin');
    await page.fill('input[placeholder="Password"]', 'Pass@9211');
    await page.click('button:has-text("Sign In")');

    // 3. Verify landing on Home Page
    await expect(page).toHaveURL('https://www.scriptedqa.com/home');

    // 4. Verify Shopping tab is visible
    const shoppingTab = page.locator('text=Shopping');
    await expect(shoppingTab).toBeVisible();

    // 5. Click Shopping tab
    await shoppingTab.click();

    // 6. Verify navigation to Shopping Page
    await expect(page).toHaveURL('https://www.scriptedqa.com/shopping');
    await expect(page.locator('text=Products')).toBeVisible();
    await expect(page.locator('text=Checkout')).toBeVisible();
  });
});

