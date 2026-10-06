import { test, expect } from '@playwright/test';

test.describe('Shopping Page Core Functionality Suite', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate and authenticate before each test
    await page.goto('https://www.scriptedqa.com/');
    await page.fill('input[placeholder="Username"]', 'admin');
    await page.fill('input[placeholder="Password"]', 'Pass@9211');
    await page.click('button:has-text("Sign In")');

    await expect(page).toHaveURL('https://www.scriptedqa.com/home');
    await page.click('text=Shopping');
    await expect(page).toHaveURL('https://www.scriptedqa.com/shopping');
  });

  test('TC-SHOP-01: Verify Product Cards Rendering & Catalog Layout', async ({ page }) => {
    await expect(page.locator('text=Products')).toBeVisible();
    await expect(page.locator('text=Checkout')).toBeVisible();

    // Verify presence of sample product items
    await expect(page.locator('text=Laptop')).toBeVisible();
    await expect(page.locator('text=Mango')).toBeVisible();
    await expect(page.locator('text=Treadmill')).toBeVisible();
  });

  test('TC-SHOP-02: Verify Dynamic Category Filtering', async ({ page }) => {
    const categorySelect = page.locator('select').first();

    // Select Fruits category
    await categorySelect.selectOption('Fruits');
    await expect(page.locator('text=Mango')).toBeVisible();
    await expect(page.locator('text=Apple')).toBeVisible();
    await expect(page.locator('text=Laptop')).not.toBeVisible();

    // Select electronics category
    await categorySelect.selectOption('electronics');
    await expect(page.locator('text=Laptop')).toBeVisible();
    await expect(page.locator('text=Mobile')).toBeVisible();
    await expect(page.locator('text=Mango')).not.toBeVisible();
  });

  test('TC-SHOP-03: Verify Dynamic Price Range Filtering', async ({ page }) => {
    const priceSelect = page.locator('select').nth(1);

    // Filter by Under $25
    await priceSelect.selectOption('Under $25');
    await expect(page.locator('text=Mango')).toBeVisible();
    await expect(page.locator('text=Laptop')).not.toBeVisible();

    // Filter by Over $500
    await priceSelect.selectOption('Over $500');
    await expect(page.locator('text=Laptop')).toBeVisible();
    await expect(page.locator('text=Mobile')).toBeVisible();
    await expect(page.locator('text=Mango')).not.toBeVisible();
  });

  test('TC-SHOP-04: Verify Add to Cart Incrementation & Cart Counter State', async ({ page }) => {
    // Initial state check
    await expect(page.locator('text=Items:')).toBeVisible();

    const addBtn = page.locator('button:has-text("Add to Cart")').first();
    await addBtn.click();

    // Verify counter updated to 1
    await expect(page.getByText(/Items:\s*1/)).toBeVisible();

    await addBtn.click();
    // Verify counter updated to 2
    await expect(page.getByText(/Items:\s*2/)).toBeVisible();
  });
});
