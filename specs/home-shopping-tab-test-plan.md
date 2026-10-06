# Test Plan Spec: Home Page - Shopping Tab Navigation

## 1. Feature Overview
* **Target Web Application**: [Scripted QA](https://www.scriptedqa.com/)
* **Target Component**: Navigation Sidebar / Categories Bar on the Home Page (`https://www.scriptedqa.com/home`)
* **Feature Under Test**: Shopping Tab Visibility and Page Navigation

---

## 2. Test Case Specification

### TC-HOME-SHOPPING-01: Verify Shopping Tab Visibility and Navigation on Home Page

#### Test Case Summary
Verify that upon successful authentication, the Home page (`/home`) renders the **Shopping** tab within the Categories navigation menu, and clicking the **Shopping** tab navigates the user to the dedicated Shopping page (`/shopping`).

#### Pre-conditions
1. User is unauthenticated.
2. Web browser is open at `https://www.scriptedqa.com/`.

#### Test Execution Steps

| Step # | Action Description | Expected Result |
| :--- | :--- | :--- |
| **Step 1** | Enter valid username `admin` in the Username input field. | Username field contains `admin`. |
| **Step 2** | Enter valid password `Pass@9211` in the Password input field. | Password field contains `Pass@9211` (masked). |
| **Step 3** | Click the **Sign In** button. | User is authenticated and redirected to `https://www.scriptedqa.com/home`. |
| **Step 4** | Inspect the Categories sidebar/navigation menu on the Home page. | The **Shopping** tab (`text=Shopping`) is visible on screen. |
| **Step 5** | Click on the **Shopping** tab. | Browser initiates navigation to the Shopping page. |
| **Step 6** | Verify the target URL and rendered page elements. | 1. URL changes to `https://www.scriptedqa.com/shopping`.<br>2. Page heading displays `Products`.<br>3. Product items (e.g., Laptop, Mobile, Headphones) and `Add to Cart` buttons are visible. |

---

## 3. Playwright Automation Spec Blueprint

```typescript
import { test, expect } from '@playwright/test';

test.describe('Home Page Navigation', () => {
  test('TC-HOME-SHOPPING-01: Verify Shopping tab visibility and navigation to /shopping', async ({ page }) => {
    // 1. Navigate to base login page
    await page.goto('https://www.scriptedqa.com/');

    // 2. Perform authentication
    await page.fill('input[placeholder="Username"]', 'admin');
    await page.fill('input[placeholder="Password"]', 'Pass@9211');
    await page.click('button:has-text("Sign In")');

    // 3. Assert redirection to Home Page
    await expect(page).toHaveURL('https://www.scriptedqa.com/home');

    // 4. Verify Shopping tab visibility on Home page
    const shoppingTab = page.locator('text=Shopping');
    await expect(shoppingTab).toBeVisible();

    // 5. Click on Shopping tab
    await shoppingTab.click();

    // 6. Assert redirection to Shopping Page and product display
    await expect(page).toHaveURL('https://www.scriptedqa.com/shopping');
    await expect(page.locator('text=Products')).toBeVisible();
    await expect(page.locator('text=Checkout')).toBeVisible();
  });
});
```

---

## 4. Execution Summary
- **Spec File Created**: [specs/home-shopping-tab-test-plan.md](file:///d:/playwright%20projects/E-Commerce%20Website%28scriptedQA.com%29/specs/home-shopping-tab-test-plan.md)
- **Headed Execution**: Verified live with `{ headless: false, slowMo: 1000 }`.
- **Target URL Reached**: `https://www.scriptedqa.com/shopping`

