import { test, expect } from '@playwright/test';

test.describe('Shopping & Cart Pages Core Functionality Suite', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate and authenticate
    await page.goto('https://www.scriptedqa.com/');
    await page.fill('input[placeholder="Username"]', 'admin');
    await page.fill('input[placeholder="Password"]', 'Pass@9211');
    await page.click('button:has-text("Sign In")');

    await expect(page).toHaveURL('https://www.scriptedqa.com/home');
  });

  test('TC-CART-001: Verify single product addition and navigation to Cart page', async ({ page }) => {
    await page.click('text=Shopping');
    await expect(page).toHaveURL('https://www.scriptedqa.com/shopping');

    // Add Laptop ($1000)
    const laptopCard = page.locator('div').filter({ hasText: 'Laptop' }).filter({ hasText: 'Add to Cart' }).last();
    await laptopCard.locator('button:has-text("Add to Cart")').click();

    // Click Checkout Items button
    await page.click('button:has-text("Checkout")');
    await expect(page).toHaveURL('https://www.scriptedqa.com/cart');

    // Verify Laptop listed in Bill table
    await expect(page.locator('text=Laptop')).toBeVisible();
    await expect(page.locator('text=$1000.00').first()).toBeVisible();
  });

  test('TC-CART-002: Verify multiple distinct products addition to Cart', async ({ page }) => {
    await page.click('text=Shopping');
    await expect(page).toHaveURL('https://www.scriptedqa.com/shopping');

    // Add Laptop ($1000) and Mango ($1)
    await page.locator('button:has-text("Add to Cart")').first().click(); // Laptop
    await page.locator('button:has-text("Add to Cart")').nth(6).click(); // Mango

    await page.click('button:has-text("Checkout")');
    await expect(page).toHaveURL('https://www.scriptedqa.com/cart');

    await expect(page.locator('text=Laptop')).toBeVisible();
    await expect(page.locator('text=Mango')).toBeVisible();
    await expect(page.locator('text=Grand Total')).toBeVisible();
  });

  test('TC-CART-007: Verify Clear Cart button functionality', async ({ page }) => {
    await page.click('text=Shopping');
    await page.locator('button:has-text("Add to Cart")').first().click();

    await page.click('button:has-text("Checkout")');
    await expect(page).toHaveURL('https://www.scriptedqa.com/cart');

    // Click Clear Cart
    await page.click('button:has-text("Clear Cart")');
    await expect(page.locator('text=Your cart is empty.')).toBeVisible();
  });

  test('TC-CART-010: Verify successful order placement', async ({ page }) => {
    await page.click('text=Shopping');
    await page.locator('button:has-text("Add to Cart")').first().click();

    await page.click('button:has-text("Checkout")');
    await expect(page).toHaveURL('https://www.scriptedqa.com/cart');

    // Click Place Order
    await page.click('button:has-text("Place Order")');
    await expect(page.locator('text=Order Placed Successfully!')).toBeVisible();
  });
});
