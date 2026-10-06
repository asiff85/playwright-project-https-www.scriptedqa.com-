# Test Plan: Login Page - Scripted QA (https://www.scriptedqa.com/)

## 1. Overview & Scope
This test plan provides comprehensive quality assurance specifications for the **Login Page** of the web application [Scripted QA](https://www.scriptedqa.com/). The scope includes core authentication flows, user input handling, boundary conditions, field validation, security controls, and session state transitions.

### Application Details
* **Target URL**: `https://www.scriptedqa.com/`
* **Target Component**: Login Form (`<form>` containing `Username`, `Password`, and `Sign In` button)
* **Demo Credentials Provided**: `admin` / `Pass@9211`
* **Post-Login Target Route**: `https://www.scriptedqa.com/home`

---

## 2. Identified Assumptions & Environment Constraints
* **Assumptions**:
  1. The application starts from a fresh state (unauthenticated session).
  2. The server/client validates credentials dynamically and returns error indicators without page reload (Single Page App architecture).
  3. No explicit lockout mechanism is defined for consecutive failed attempts unless specified by server backend.

---

## 3. Core Functionality Test Scenarios

### Category 1: Positive Scenarios (Happy Path)

#### TC-POS-01: Successful Login with Valid Credentials
* **Objective**: Verify that a user with valid credentials can log in successfully.
* **Pre-conditions**: Browser navigated to `https://www.scriptedqa.com/`. User is unauthenticated.
* **Steps**:
  1. Enter `admin` in the **Username** input field.
  2. Enter `Pass@9211` in the **Password** input field.
  3. Click the **Sign In** button.
* **Expected Outcome**:
  - The URL changes to `https://www.scriptedqa.com/home`.
  - The dashboard renders displaying `"Welcome back, Automation Engineer!"` and a visible **Sign Out** button.

#### TC-POS-02: User Sign Out Flow
* **Objective**: Verify that signing out revokes session access and redirects back to the login page.
* **Pre-conditions**: User is logged in and located at `https://www.scriptedqa.com/home`.
* **Steps**:
  1. Click the **Sign Out** button.
* **Expected Outcome**:
  - User is redirected to `https://www.scriptedqa.com/`.
  - Login form fields are visible and reset to default blank states.

#### TC-POS-03: Keyboard Form Submission (Enter Key)
* **Objective**: Verify that pressing the `Enter` key inside input fields triggers form submission.
* **Pre-conditions**: Navigated to `https://www.scriptedqa.com/`.
* **Steps**:
  1. Type `admin` into the Username field.
  2. Type `Pass@9211` into the Password field.
  3. Press the `Enter` key on the keyboard.
* **Expected Outcome**: Form submits automatically and navigates to `https://www.scriptedqa.com/home`.

---

### Category 2: Negative Scenarios

#### TC-NEG-01: Login with Invalid Password
* **Objective**: Verify error handling when the username is valid but password is wrong.
* **Pre-conditions**: Navigated to `https://www.scriptedqa.com/`.
* **Steps**:
  1. Type `admin` in the Username field.
  2. Type `WrongPass123!` in the Password field.
  3. Click **Sign In**.
* **Expected Outcome**:
  - Navigation is blocked; URL remains `https://www.scriptedqa.com/`.
  - An error message `"Oops! The credentials are incorrect."` is displayed on screen.

#### TC-NEG-02: Login with Invalid Username
* **Objective**: Verify error handling when entering an unregistered username.
* **Pre-conditions**: Navigated to `https://www.scriptedqa.com/`.
* **Steps**:
  1. Type `unknown_user` in the Username field.
  2. Type `Pass@9211` in the Password field.
  3. Click **Sign In**.
* **Expected Outcome**:
  - Navigation is blocked.
  - Error message `"Oops! The credentials are incorrect."` is displayed.

#### TC-NEG-03: Login with Blank Username and Blank Password
* **Objective**: Verify error handling when submitting empty credentials.
* **Pre-conditions**: Navigated to `https://www.scriptedqa.com/`.
* **Steps**:
  1. Leave Username field empty.
  2. Leave Password field empty.
  3. Click **Sign In**.
* **Expected Outcome**:
  - Error message `"Oops! The credentials are incorrect."` is displayed.
  - User remains on the login page.

#### TC-NEG-04: Case Sensitivity Verification
* **Objective**: Verify that credentials enforce exact case matching.
* **Pre-conditions**: Navigated to `https://www.scriptedqa.com/`.
* **Steps**:
  1. Type `Admin` (capital A) in Username field.
  2. Type `pass@9211` (lowercase P) in Password field.
  3. Click **Sign In**.
* **Expected Outcome**: Login fails; error banner `"Oops! The credentials are incorrect."` appears.

---

### Category 3: Boundary Cases

#### TC-BND-01: Single Character Input
* **Objective**: Verify application stability when single-character strings are entered.
* **Pre-conditions**: Navigated to `https://www.scriptedqa.com/`.
* **Steps**:
  1. Type `a` into Username field.
  2. Type `P` into Password field.
  3. Click **Sign In**.
* **Expected Outcome**: Application handles short input gracefully without client-side uncaught exceptions. Displays standard error feedback.

#### TC-BND-02: Extreme Length Input String (255+ Characters)
* **Objective**: Verify input field stability and text truncation under bulk text insertion.
* **Pre-conditions**: Navigated to `https://www.scriptedqa.com/`.
* **Steps**:
  1. Generate a 300-character alphanumeric string.
  2. Paste the string into Username and Password fields.
  3. Click **Sign In**.
* **Expected Outcome**: UI layout does not break or overflow. Submit handled cleanly without DOM crash.

#### TC-BND-03: Leading and Trailing Whitespaces Handling
* **Objective**: Verify handling of leading/trailing spaces in credentials.
* **Pre-conditions**: Navigated to `https://www.scriptedqa.com/`.
* **Steps**:
  1. Enter `  admin  ` in Username field.
  2. Enter `  Pass@9211  ` in Password field.
  3. Click **Sign In**.
* **Expected Outcome**: If trimmed, login succeeds; if exact match required, displays invalid credentials message.

---

### Category 4: Validation Cases

#### TC-VAL-01: Password Input Type Masking
* **Objective**: Verify password characters are masked visually on screen.
* **Pre-conditions**: Navigated to `https://www.scriptedqa.com/`.
* **Steps**:
  1. Inspect DOM property of Password input element.
  2. Type characters into Password field.
* **Expected Outcome**: Input element possesses `type="password"`. Characters appear as bullet points (`•`).

#### TC-VAL-02: Input Placeholder and Focus State Verification
* **Objective**: Verify visual feedback and placeholder visibility.
* **Pre-conditions**: Navigated to `https://www.scriptedqa.com/`.
* **Steps**:
  1. Observe initial state of inputs.
  2. Click inside Username input field.
* **Expected Outcome**: Placeholders `"Username"` and `"Password"` are clearly legible. Focused input element displays focus ring styling.

---

### Category 5: Security-Related Scenarios

#### TC-SEC-01: SQL Injection Vulnerability Test
* **Objective**: Ensure input fields are protected against basic SQL injection payloads.
* **Pre-conditions**: Navigated to `https://www.scriptedqa.com/`.
* **Steps**:
  1. Enter `' OR '1'='1` in Username field.
  2. Enter `' OR '1'='1` in Password field.
  3. Click **Sign In**.
* **Expected Outcome**: Authentication is denied. SQL string treated as literal text; error message displayed.

#### TC-SEC-02: Cross-Site Scripting (XSS) Sanitization
* **Objective**: Ensure script tags injected into input fields are not executed by DOM.
* **Pre-conditions**: Navigated to `https://www.scriptedqa.com/`.
* **Steps**:
  1. Enter `<script>alert('xss')</script>` into Username field.
  2. Enter `<img src=x onerror=alert(1)>` into Password field.
  3. Click **Sign In**.
* **Expected Outcome**: Script is not executed. No browser dialog popup appears.

#### TC-SEC-03: Unauthenticated Direct URL Access Protection
* **Objective**: Verify that direct URL navigation to `/home` without authentication is blocked.
* **Pre-conditions**: Fresh browser context (no cookies or local storage).
* **Steps**:
  1. Navigate directly to `https://www.scriptedqa.com/home`.
* **Expected Outcome**: User is automatically redirected back to `https://www.scriptedqa.com/` or prompted with login screen.

---

## 4. Execution Summary & Deliverables
- **Spec Location**: [specs/login-page-test-plan.md](file:///d:/playwright%20projects/E-Commerce%20Website%28scriptedQA.com%29/specs/login-page-test-plan.md)
- **Target Suite**: Playwright Specs in `tests/`

