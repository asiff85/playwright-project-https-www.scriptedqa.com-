# Test Plan: Shopping Page - Scripted QA (https://www.scriptedqa.com/shopping)

## 1. Overview & Scope
This test plan provides quality assurance specifications for the **Shopping Page** of [Scripted QA](https://www.scriptedqa.com/). The scope covers product catalog rendering, dynamic category and price range filtering, product cart additions, and cart counter state updates.

### Application Details
* **Target URL**: `https://www.scriptedqa.com/shopping`
* **Pre-requisite**: Authenticated user session (`admin` / `Pass@9211`)
* **Key Components**:
  1. Product Catalog Grid (Products, Prices, Category Badges, `Add to Cart` buttons)
  2. Category Filter (`All Categories`, `electronics`, `Fruits`, `Vegitables`, `Sports & Fitness`)
  3. Price Range Filter (`All Prices`, `Under $25`, `$25 to $50`, `$50 to $100`, `$100 to $500`, `Over $500`)
  4. Header Cart Counter & Checkout Button (`Items: X`, `Checkout`)

---

## 2. 4 Major Core Functionality Test Cases

### Core Functionality 1: Product Catalog Grid Display
#### TC-SHOP-01: Verify Product Cards Rendering & Catalog Layout
* **Objective**: Verify that the Shopping page displays all available products with correct details (Title, Category Badge, Price, and Add to Cart button).
* **Pre-conditions**: User authenticated and navigated to `https://www.scriptedqa.com/shopping`.
* **Test Steps**:
  1. Navigate to `https://www.scriptedqa.com/shopping`.
  2. Verify heading `"Products"` and `"Checkout"` button are visible.
  3. Inspect product grid for cards (e.g. `Laptop`, `Mobile`, `Mango`, `Cauliflower`, `Treadmill`).
* **Expected Outcome**:
  - All product cards render with category tag badges (`ELECTRONICS`, `FRUITS`, `VEGITABLES`, `SPORTS & FITNESS`).
  - Each product card contains a price label (e.g. `$1000`, `$1`) and an **Add to Cart** button.

---

### Core Functionality 2: Working Category Filters
#### TC-SHOP-02: Verify Dynamic Category Filtering
* **Objective**: Verify that selecting a specific category from the Category dropdown filters the product grid to show only products belonging to that category.
* **Pre-conditions**: User authenticated on `https://www.scriptedqa.com/shopping`.
* **Test Steps**:
  1. Select `electronics` from the Category dropdown filter.
  2. Observe product grid updates.
  3. Select `Fruits` from the Category dropdown filter.
* **Expected Outcome**:
  - Selecting `electronics` displays 6 electronics products (Laptop, Mobile, Headphones, Microwave Oven, Refrigerator, Smartwatch).
  - Selecting `Fruits` displays 3 fruit products (Mango, Apple, Dragon Fruit) and hides non-fruit items.

---

### Core Functionality 3: Working Price Range Filters
#### TC-SHOP-03: Verify Dynamic Price Range Filtering
* **Objective**: Verify that selecting a price tier updates the product grid to display only products within the specified price boundary.
* **Pre-conditions**: User authenticated on `https://www.scriptedqa.com/shopping`.
* **Test Steps**:
  1. Select `Under $25` from the Price Range dropdown filter.
  2. Verify products displayed (e.g., Mango $1, Apple $2.2, Dragon Fruit $5, Cauliflower $0.8, Eggplant $0.5).
  3. Select `Over $500` from the Price Range dropdown filter.
* **Expected Outcome**:
  - `Under $25` filter displays only items with price < $25.
  - `Over $500` filter displays high-value items (e.g., Laptop $1000, Mobile $1500, Treadmill $899).

---

### Core Functionality 4: Add to Cart & Cart Item Counter
#### TC-SHOP-04: Verify Add to Cart Incrementation & Cart Counter State
* **Objective**: Verify that clicking the "Add to Cart" button on a product increments the header cart item counter.
* **Pre-conditions**: User authenticated on `https://www.scriptedqa.com/shopping`. Initial cart counter shows `Items: 0`.
* **Test Steps**:
  1. Observe initial cart counter display (`Items: 0`).
  2. Click **Add to Cart** on the first product card.
  3. Verify updated cart counter.
  4. Click **Add to Cart** on a second product card.
* **Expected Outcome**:
  - Cart counter increments from `Items: 0` to `Items: 1` after the first click.
  - Cart counter increments to `Items: 2` after the second click.

---

## 3. Automation Execution & Deliverables
- **Spec File Created**: [specs/shopping-page-test-plan.md](file:///d:/playwright%20projects/E-Commerce%20Website%28scriptedQA.com%29/specs/shopping-page-test-plan.md)
- **Executable Suite**: `tests/shopping-page.spec.ts`

