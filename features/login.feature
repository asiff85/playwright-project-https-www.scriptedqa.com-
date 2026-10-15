@login
Feature: Scripted QA Login Page Functionality
  As a quality automation engineer
  I want to verify all authentication, boundary, validation, and security flows
  So that the login page behaves reliably and securely according to QA specifications

  Background:
    Given user navigates to the Login page

  # ============================================================================
  # Category 1: Positive Scenarios (Happy Path)
  # ============================================================================

  @positive @smoke
  Scenario: TC-POS-01: Successful Login with Valid Credentials
    When user enters valid username "admin" and password "Pass@9211"
    And user clicks the Sign In button
    Then user should be redirected to the home dashboard URL "https://www.scriptedqa.com/home"
    And the welcome dashboard message "Welcome back, Automation Engineer!" should be visible

  @positive
  Scenario: TC-POS-02: User Sign Out Flow
    When user enters valid username "admin" and password "Pass@9211"
    And user clicks the Sign In button
    Then user should be redirected to the home dashboard URL "https://www.scriptedqa.com/home"
    When user clicks the Sign Out button
    Then user should be redirected back to the Login page URL "https://www.scriptedqa.com/"
    And the username and password fields should be reset to blank

  @positive
  Scenario: TC-POS-03: Keyboard Form Submission (Enter Key)
    When user enters username "admin" and password "Pass@9211"
    And user submits the login form using the Enter key
    Then user should be redirected to the home dashboard URL "https://www.scriptedqa.com/home"

  # ============================================================================
  # Category 2: Negative Scenarios (Data-Driven with Examples)
  # ============================================================================

  @negative @datadriven
  Scenario Outline: TC-NEG: Login failure with invalid credentials - <testCaseId>
    When user enters username "<username>" and password "<password>"
    And user clicks the Sign In button
    Then the error message "Oops! The credentials are incorrect." should be displayed
    And user should remain on the Login page

    Examples:
      | testCaseId | username     | password        |
      | TC-NEG-01  | admin        | WrongPass123!   |
      | TC-NEG-02  | unknown_user | Pass@9211       |
      | TC-NEG-03  |              |                 |
      | TC-NEG-04  | Admin        | pass@9211       |

  # ============================================================================
  # Category 3: Boundary Cases
  # ============================================================================

  @boundary
  Scenario: TC-BND-01: Single Character Input Handling
    When user enters username "a" and password "P"
    And user clicks the Sign In button
    Then the error message "Oops! The credentials are incorrect." should be displayed
    And user should remain on the Login page

  @boundary
  Scenario: TC-BND-02: Extreme Length Input String (255+ Characters)
    When user enters an extreme length string of 300 characters into credentials fields
    And user clicks the Sign In button
    Then the application should handle the long input without crashing and display error "Oops! The credentials are incorrect."
    And user should remain on the Login page

  @boundary
  Scenario: TC-BND-03: Leading and Trailing Whitespaces Handling
    When user enters username "  admin  " and password "  Pass@9211  "
    And user clicks the Sign In button
    Then the error message "Oops! The credentials are incorrect." should be displayed
    And user should remain on the Login page

  # ============================================================================
  # Category 4: Validation Cases
  # ============================================================================

  @validation
  Scenario: TC-VAL-01: Password Input Type Masking
    Then the password input field must have attribute "type" equal to "password"

  @validation
  Scenario: TC-VAL-02: Input Placeholder and Focus State Verification
    Then the username input should display placeholder "Username"
    And the password input should display placeholder "Password"
    When user focuses on the username input field
    Then the username input field should have active focus

  # ============================================================================
  # Category 5: Security-Related Scenarios (Data-Driven with Examples)
  # ============================================================================

  @security @datadriven
  Scenario Outline: TC-SEC: Protection against unauthorized payloads - <testCaseId>
    When user enters security payload username "<username>" and password "<password>"
    And user clicks the Sign In button
    Then the authentication attempt should be denied with error "Oops! The credentials are incorrect."
    And user should remain on the Login page

    Examples:
      | testCaseId | username                     | password                     |
      | TC-SEC-01  | ' OR '1'='1                  | ' OR '1'='1                  |
      | TC-SEC-02  | <script>alert('xss')</script> | <img src=x onerror=alert(1)> |

  @security
  Scenario: TC-SEC-03: Unauthenticated Direct URL Access Protection
    When user attempts to navigate directly to protected route "https://www.scriptedqa.com/home" without authenticating
    Then user should be redirected back to the Login page URL "https://www.scriptedqa.com/"

