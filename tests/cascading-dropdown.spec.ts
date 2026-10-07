import { test, expect } from '@playwright/test';

test.describe('Cascading Dropdown Feature Test Suite', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate and authenticate
    await page.goto('https://www.scriptedqa.com/');
    await page.fill('input[placeholder="Username"]', 'admin');
    await page.fill('input[placeholder="Password"]', 'Pass@9211');
    await page.click('button:has-text("Sign In")');

    await expect(page).toHaveURL('https://www.scriptedqa.com/home');

    // TC-DD-01: Navigate to Dropdown page
    const dropdownLink = page.locator('text=Dropdown');
    await expect(dropdownLink).toBeVisible();
    await dropdownLink.click();

    await expect(page).toHaveURL('https://www.scriptedqa.com/dropDown');
  });

  test('TC-DD-02: Verify Initial Render State of Cascading Dropdown', async ({ page }) => {
    const cascadingCard = page.locator('div:has-text("Cascading Dropdown")').last();
    const categorySelect = cascadingCard.locator('select').first();
    const itemSelect = cascadingCard.locator('select').nth(1);

    // Verify Category default option
    await expect(categorySelect).toHaveValue('');
    
    // Verify Item dropdown is disabled initially
    await expect(itemSelect).toBeDisabled();
  });

  test('TC-DD-03 & TC-DD-04: Verify Beverages + Coffee Selection & Summary Accuracy', async ({ page }) => {
    const cascadingCard = page.locator('div:has-text("Cascading Dropdown")').last();
    const categorySelect = cascadingCard.locator('select').first();
    const itemSelect = cascadingCard.locator('select').nth(1);

    // Select Beverages
    await categorySelect.selectOption('Beverages');
    await expect(itemSelect).toBeEnabled();

    // Verify expected beverage items (Coffee, Tea, Smoothie, Fruit Juice)
    const options = await itemSelect.evaluate(s => Array.from((s as HTMLSelectElement).options).map(o => o.text));
    expect(options).toContain('Coffee');
    expect(options).toContain('Tea');
    expect(options).toContain('Smoothie');
    expect(options).toContain('Fruit Juice');

    // Select Coffee
    await itemSelect.selectOption('Coffee');

    // Verify Selection Summary
    const summaryCard = cascadingCard.locator('div:has-text("SELECTION SUMMARY")');
    await expect(summaryCard).toContainText('Category: Beverages');
    await expect(summaryCard).toContainText('Item: Coffee');
  });

  test('TC-DD-05: Verify Beverages + Fruit Juice Selection & Summary Accuracy', async ({ page }) => {
    const cascadingCard = page.locator('div:has-text("Cascading Dropdown")').last();
    const categorySelect = cascadingCard.locator('select').first();
    const itemSelect = cascadingCard.locator('select').nth(1);

    await categorySelect.selectOption('Beverages');
    await itemSelect.selectOption('Fruit Juice');

    const summaryCard = cascadingCard.locator('div:has-text("SELECTION SUMMARY")');
    await expect(summaryCard).toContainText('Category: Beverages');
    await expect(summaryCard).toContainText('Item: Fruit Juice');
  });

  test('TC-DD-06: Verify Fruits + Apple Selection & Summary Accuracy', async ({ page }) => {
    const cascadingCard = page.locator('div:has-text("Cascading Dropdown")').last();
    const categorySelect = cascadingCard.locator('select').first();
    const itemSelect = cascadingCard.locator('select').nth(1);

    await categorySelect.selectOption('Fruits');
    await itemSelect.selectOption('Apple');

    const summaryCard = cascadingCard.locator('div:has-text("SELECTION SUMMARY")');
    await expect(summaryCard).toContainText('Category: Fruits');
    await expect(summaryCard).toContainText('Item: Apple');
  });

  test('TC-DD-07: Verify Category Switch Resets Item Selection', async ({ page }) => {
    const cascadingCard = page.locator('div:has-text("Cascading Dropdown")').last();
    const categorySelect = cascadingCard.locator('select').first();
    const itemSelect = cascadingCard.locator('select').nth(1);

    // 1. Select Beverages -> Coffee
    await categorySelect.selectOption('Beverages');
    await itemSelect.selectOption('Coffee');

    // 2. Switch Category to Fruits
    await categorySelect.selectOption('Fruits');

    // Verify Item options updated to Fruits
    const options = await itemSelect.evaluate(s => Array.from((s as HTMLSelectElement).options).map(o => o.text));
    expect(options).toContain('Apple');
    expect(options).not.toContain('Coffee');

    // Verify Selection Summary reflects Category: Fruits
    const summaryCard = cascadingCard.locator('div:has-text("SELECTION SUMMARY")');
    await expect(summaryCard).toContainText('Category: Fruits');
  });
});

