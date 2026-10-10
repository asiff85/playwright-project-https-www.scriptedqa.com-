# SQA Test Documentation: Shopping & Cart Pages Core Functionality

## Section A: Application Exploration Summary

### 1. Overview of Exploration Findings
A comprehensive, empirical exploration was conducted on the **Scripted QA** application across both the **Shopping page** (`https://www.scriptedqa.com/shopping`) and the **Cart page** (`https://www.scriptedqa.com/cart`).

### 2. Verified UI Elements and Behaviors

#### Shopping Page (`https://www.scriptedqa.com/shopping`):
* **Product Catalog Grid**: Displays 15 distinct products categorized under *ELECTRONICS*, *FRUITS*, *VEGITABLES*, and *SPORTS & FITNESS*. Observed products include:
  - **Laptop** ($1000)
  - **Mobile** ($1500)
  - **Headphones** ($200)
  - **Microwave Oven** ($290)
  - **Refrigerator** ($888)
  - **Smartwatch** ($499)
  - **Mango** ($1)
  - **Apple** ($2.20)
  - **Dragon Fruit** ($5)
  - **Cauliflower** ($0.80)
  - **Eggplant** ($0.50)
  - **Treadmill** ($899)
  - **Football** ($99.99)
  - **Dumbbell** ($489)
  - **Bat** ($649)
* **Add to Cart Buttons**: Each product card contains an `Add to Cart` button. Clicking the button increments the item count on the button badge (e.g., `Add to Cart (1)`, `Add to Cart (2)`) and updates the global checkout button counter (`Checkout Items: X`).
* **Checkout Items Button**: Located at the top header. Displays the total quantity of items selected. Clicking this button triggers client-side routing to `https://www.scriptedqa.com/cart`.

#### Cart Page (`https://www.scriptedqa.com/cart`):
* **Header Title**: Displays `🧾 Bill`.
* **Top Navigation Controls**:
  - `Clear Cart`: Clears all items from the active session cart.
  - `Back to Shopping`: Navigates the user back to `/shopping`.
* **Itemized Bill Table / List**:
  - **ITEM**: Displays product title (e.g., `Laptop`, `Mango`).
  - **PRICE**: Displays unit price formatted to 2 decimal places (e.g., `$1000.00`, `$1.00`).
  - **QTY**: Displays quantity selected on the Shopping page formatted as `x1`, `x2`, etc.
  - **TOTAL**: Displays line item subtotal calculated as `PRICE × QTY` (e.g., `$1000.00`, `$2.00`).
* **Grand Total & Order Controls**:
  - **Grand Total**: Renders the sum of all line item totals (e.g., `Grand Total $1002.00`).
  - **Place Order Button**: Submits the cart items and displays a success confirmation message.
* **Empty Cart Behavior**: When the cart contains 0 items, the page renders `Your cart is empty.` along with the `Back to Shopping` button. `Clear Cart`, item rows, `Grand Total`, and `Place Order` are hidden.

### 3. Navigation Workflow
The navigation workflow between Shopping and Cart operates as follows:
1. User selects products on `/shopping` by clicking `Add to Cart`.
2. The `Checkout Items: X` button updates dynamically.
3. User clicks `Checkout Items: X` or navigates to `/cart`.
4. The Cart page (`/cart`) reads the active session state and renders the itemized bill table.

### 4. Identified Limitations & Unsupported Functionality
To maintain strict SQA data integrity, the following candidate features were empirically tested and confirmed **not supported** in the current application release:
* **In-Cart Inline Quantity Stepper (`+` / `-` buttons per item row)**: *Not supported on `/cart`*. Quantity must be selected on the Shopping page via multiple `Add to Cart` clicks.
* **Individual Line Item Delete Button**: *Not supported on `/cart`*. Removal of items is supported globally via the `Clear Cart` button.

---

## Section B: Four Core Cart Functionalities

Based on empirical exploration, the four major core functionalities prioritized for the primary shopping & cart workflow are:

### 1. Core Functionality 1: Product Selection & Shopping-to-Cart Transfer
* **Importance**: Essential for transferring user intent from catalog browsing to cart itemization.
* **Observed Behavior**: Clicking `Add to Cart` on `/shopping` updates button badges (`Add to Cart (1)`) and header count (`Checkout Items: X`). Clicking `Checkout Items` transfers selected items to `/cart`.
* **Expected Behavior**: Selected items, unit prices, and accumulated quantities must accurately transfer to `/cart` without data loss or corruption.

### 2. Core Functionality 2: Bill Itemization & Subtotal / Grand Total Calculation
* **Importance**: Critical for financial transparency and user trust prior to purchase completion.
* **Observed Behavior**: Cart page itemizes products with unit `PRICE`, `QTY` string (e.g. `x2`), line `TOTAL` (`PRICE × QTY`), and `Grand Total`.
* **Expected Behavior**: Line totals and Grand Total must recalculate accurately according to exact floating-point arithmetic formatted to two decimal places.

### 3. Core Functionality 3: Cart Reset & Empty Cart State Handling
* **Importance**: Allows users to cancel orders, clear cart state, and handles edge cases where zero items exist.
* **Observed Behavior**: Clicking `Clear Cart` removes all items and displays `Your cart is empty.` with `Back to Shopping`. Direct navigation to `/cart` with 0 items displays the empty cart view.
* **Expected Behavior**: Clearing the cart must purge all stored session items and display user-friendly empty state feedback.

### 4. Core Functionality 4: Order Placement & Purchase Confirmation Flow
* **Importance**: The ultimate goal of the shopping workflow, finalizing user purchase.
* **Observed Behavior**: Clicking `Place Order` on `/cart` renders `🎉 Order Placed Successfully! Thank you for your purchase.` and `Back to Shopping`.
* **Expected Behavior**: Submitting the order must display success feedback and prevent duplicate order submissions.

---

## Section C: Detailed Test Cases

### Core Functionality 1: Product Selection & Shopping-to-Cart Transfer

| Test Case ID | Test Case Title | Preconditions | Test Data | Test Steps | Expected Result | Priority | Test Type |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **TC-CART-001** | Verify single product addition and navigation to Cart page | User logged in (`admin`/`Pass@9211`) & on `/shopping`. | Product: `Laptop` ($1000) | 1. Locate `Laptop` product card.<br>2. Click `Add to Cart` once.<br>3. Verify button changes to `Add to Cart (1)`.<br>4. Click `Checkout Items: 1`. | 1. URL changes to `https://www.scriptedqa.com/cart`.<br>2. `Laptop` is listed in item table.<br>3. Unit price `$1000.00`, QTY `x1`, Total `$1000.00` rendered. | High | Functional |
| **TC-CART-002** | Verify multiple distinct products addition to Cart | User logged in & on `/shopping`. | Products: `Laptop` ($1000), `Mango` ($1) | 1. Click `Add to Cart` on `Laptop`.<br>2. Click `Add to Cart` on `Mango`.<br>3. Verify header displays `Checkout Items: 2`.<br>4. Click `Checkout Items: 2`. | 1. Navigates to `/cart`.<br>2. Both `Laptop` and `Mango` appear as separate rows.<br>3. `Grand Total $1001.00` is displayed. | High | Functional |
| **TC-CART-003** | Verify quantity accumulation via repeated `Add to Cart` clicks | User logged in & on `/shopping`. | Product: `Mango` ($1), Quantity: 3 | 1. Click `Add to Cart` on `Mango` 3 times in succession.<br>2. Verify button badge displays `Add to Cart (3)`.<br>3. Click `Checkout Items: 3`. | 1. Navigates to `/cart`.<br>2. `Mango` row displays `QTY: x3`.<br>3. Line total displays `$3.00`. | High | Functional / Boundary |

---

### Core Functionality 2: Bill Itemization & Subtotal / Grand Total Calculation

| Test Case ID | Test Case Title | Preconditions | Test Data | Test Steps | Expected Result | Priority | Test Type |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **TC-CART-004** | Verify line item total calculation (`PRICE × QTY`) | User logged in & on `/shopping`. | Product: `Headphones` ($200), QTY: 2 | 1. Click `Add to Cart` on `Headphones` 2 times.<br>2. Click `Checkout Items: 2`.<br>3. Inspect `Headphones` row in Bill table. | 1. Unit price displays `$200.00`.<br>2. QTY displays `x2`.<br>3. Line TOTAL displays `$400.00` (`$200.00 × 2`). | High | Functional / Data Consistency |
| **TC-CART-005** | Verify Grand Total sum calculation for multiple items | User logged in & on `/shopping`. | Products: `Mobile` ($1500), `Apple` ($2.20), `Cauliflower` ($0.80) | 1. Add 1 `Mobile`, 1 `Apple`, and 1 `Cauliflower` to cart.<br>2. Click `Checkout Items: 3`.<br>3. Inspect Grand Total at bottom of table. | 1. `Mobile` total = `$1500.00`.<br>2. `Apple` total = `$2.20`.<br>3. `Cauliflower` total = `$0.80`.<br>4. `Grand Total` displays `$1503.00` (`1500 + 2.20 + 0.80`). | High | Data Consistency |
| **TC-CART-006** | Verify decimal precision formatting for total prices | User logged in & on `/shopping`. | Product: `Football` ($99.99), QTY: 2 | 1. Add `Football` ($99.99) 2 times to cart.<br>2. Click `Checkout Items: 2`.<br>3. Inspect line TOTAL and Grand Total. | 1. Line TOTAL displays `$199.98`.<br>2. Grand Total displays `$199.98` with exact 2 decimal places. | Medium | UI / Boundary |

---

### Core Functionality 3: Cart Reset & Empty Cart State Handling

| Test Case ID | Test Case Title | Preconditions | Test Data | Test Steps | Expected Result | Priority | Test Type |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **TC-CART-007** | Verify `Clear Cart` button functionality | Cart contains items (`Laptop` $1000). | Product: `Laptop` | 1. Navigate to `/cart` with items.<br>2. Verify item table and `Clear Cart` button are visible.<br>3. Click `Clear Cart`. | 1. Cart items are purged.<br>2. Item table and `Grand Total` disappear.<br>3. UI displays `Your cart is empty.` and `Back to Shopping`. | High | Functional / State Reset |
| **TC-CART-008** | Verify empty cart page layout upon direct navigation | User logged in, 0 items added to cart. | N/A | 1. Navigate directly to `https://www.scriptedqa.com/cart`.<br>2. Inspect page layout. | 1. Header renders `🧾 Bill`.<br>2. Displays `Back to Shopping` button.<br>3. Displays message `Your cart is empty.`.<br>4. `Clear Cart` & `Place Order` are hidden. | High | Negative / UI |
| **TC-CART-009** | Verify `Back to Shopping` button navigation from empty cart | User on `/cart` with empty cart state. | N/A | 1. Verify `Your cart is empty.` message is visible.<br>2. Click `Back to Shopping` button. | 1. User is redirected to `https://www.scriptedqa.com/shopping`.<br>2. Product catalog is displayed. | Medium | Functional |

---

### Core Functionality 4: Order Placement & Purchase Confirmation Flow

| Test Case ID | Test Case Title | Preconditions | Test Data | Test Steps | Expected Result | Priority | Test Type |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **TC-CART-010** | Verify successful order placement | Cart populated with `Smartwatch` ($499). | Product: `Smartwatch` | 1. Navigate to `/cart` with item.<br>2. Verify `Place Order` button is visible.<br>3. Click `Place Order`. | 1. Confirmation banner appears: `🎉 Order Placed Successfully! Thank you for your purchase.`.<br>2. `Back to Shopping` button is rendered. | High | Functional / Positive |
| **TC-CART-011** | Verify `Place Order` button unavailable on empty cart | User on `/cart` with 0 items. | N/A | 1. Navigate to `/cart`.<br>2. Inspect page for `Place Order` button. | 1. `Place Order` button is NOT present in DOM.<br>2. Prevents empty order submission. | High | Negative / Security |
| **TC-CART-012** | Verify navigation back to catalog after placing order | User has placed order and sees confirmation screen. | N/A | 1. Verify `🎉 Order Placed Successfully!` confirmation is displayed.<br>2. Click `Back to Shopping` button. | 1. Redirects to `https://www.scriptedqa.com/shopping`.<br>2. Shopping cart counter resets to `Checkout Items: 0`. | Medium | Regression / Workflow |

---

## Section D: Test Coverage Summary

### 1. Test Case Distribution Per Core Functionality
* **Core Functionality 1 (Selection & Transfer)**: 3 Test Cases (`TC-CART-001` to `TC-CART-003`)
* **Core Functionality 2 (Itemization & Total Calculation)**: 3 Test Cases (`TC-CART-004` to `TC-CART-006`)
* **Core Functionality 3 (Cart Reset & Empty State)**: 3 Test Cases (`TC-CART-007` to `TC-CART-009`)
* **Core Functionality 4 (Order Placement & Confirmation)**: 3 Test Cases (`TC-CART-010` to `TC-CART-012`)
* **Total Executable Manual Test Cases**: **12**

### 2. Breakdown by Test Type & Priority
* **Functional Scenarios**: 7 Test Cases
* **Data Consistency / Calculation Scenarios**: 2 Test Cases
* **Negative / Boundary Scenarios**: 2 Test Cases
* **UI / Workflow Scenarios**: 1 Test Case
* **Priority Breakdown**: High = 9, Medium = 3, Low = 0

### 3. Remaining Gaps & Assumptions
* **Assumption 1**: Session cart items persist in browser LocalStorage/SessionState across page refreshes during an active login session.
* **Assumption 2**: No coupon code, tax calculation, or shipping fee rules apply to the `Grand Total`.

---

## Section E: Execution Guidance

### Manual Execution Instructions for QA Testers

#### Prerequisites:
1. Open a desktop web browser (Chrome, Firefox, Edge, or Safari).
2. Navigate to `https://www.scriptedqa.com/` and log in with username `admin` and password `Pass@9211`.

#### Step-by-Step Execution Workflow:

1. **Executing Shopping-to-Cart Transfer (`TC-CART-001` - `TC-CART-003`)**:
   - Go to `https://www.scriptedqa.com/shopping`.
   - Click `Add to Cart` on **Laptop** ($1000). Verify button shows `Add to Cart (1)`.
   - Click `Checkout Items: 1`. Verify navigation to `https://www.scriptedqa.com/cart` and confirm **Laptop** row shows `$1000.00 x1 $1000.00`.

2. **Executing Calculation Verifications (`TC-CART-004` - `TC-CART-006`)**:
   - Add 1 **Mobile** ($1500) and 1 **Apple** ($2.20) to cart.
   - Click `Checkout Items: 2`.
   - Manually sum line totals (`$1500.00 + $2.20 = $1502.20`).
   - Verify that **Grand Total** displays `Grand Total $1502.20`.

3. **Executing Clear Cart & Empty Cart Tests (`TC-CART-007` - `TC-CART-009`)**:
   - While on `/cart` with items, click `Clear Cart`.
   - Verify all items disappear and text `Your cart is empty.` appears.
   - Click `Back to Shopping` and confirm navigation back to `/shopping`.

4. **Executing Order Placement Test (`TC-CART-010` - `TC-CART-012`)**:
   - Add **Smartwatch** ($499) to cart and click `Checkout Items: 1`.
   - Click `Place Order`.
   - Confirm banner text `🎉 Order Placed Successfully! Thank you for your purchase.` appears.

