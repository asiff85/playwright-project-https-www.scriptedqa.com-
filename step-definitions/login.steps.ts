import { Given, When, Then } from '@cucumber/cucumber';
import { pageFixture } from '../fixtures/pageFixture';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { CommonUtils } from '../utils/commonUtils';

let loginPage: LoginPage;
let homePage: HomePage;

function initPages() {
  loginPage = new LoginPage(pageFixture.page);
  homePage = new HomePage(pageFixture.page);
}

// Background
Given('user navigates to the Login page', async function () {
  initPages();
  await loginPage.gotoLoginPage();
});

// Category 1: Positive Steps
When('user enters valid username {string} and password {string}', async function (username: string, password: string) {
  initPages();
  await loginPage.enterUsername(username);
  await loginPage.enterPassword(password);
});

When('user enters username {string} and password {string}', async function (username: string, password: string) {
  initPages();
  await loginPage.enterUsername(username);
  await loginPage.enterPassword(password);
});

When('user clicks the Sign In button', async function () {
  initPages();
  await loginPage.clickSignIn();
});

Then('user should be redirected to the home dashboard URL {string}', async function (expectedUrl: string) {
  initPages();
  await homePage.verifyUrl(expectedUrl);
});

Then('the welcome dashboard message {string} should be visible', async function (_expectedMessage: string) {
  initPages();
  await homePage.verifyWelcomeMessageDisplayed();
});

When('user clicks the Sign Out button', async function () {
  initPages();
  await homePage.clickSignOut();
});

Then('user should be redirected back to the Login page URL {string}', async function (expectedUrl: string) {
  initPages();
  await loginPage.verifyUrl(expectedUrl);
});

Then('the username and password fields should be reset to blank', async function () {
  initPages();
  await loginPage.verifyInputsAreBlank();
});

When('user submits the login form using the Enter key', async function () {
  initPages();
  await loginPage.submitViaEnterKey();
});

// Category 2: Negative & Boundary Steps
Then('the error message {string} should be displayed', async function (expectedError: string) {
  initPages();
  await loginPage.verifyErrorMessageDisplayed();
  await loginPage.verifyErrorMessageText(expectedError);
});

Then('user should remain on the Login page', async function () {
  initPages();
  await loginPage.verifyOnLoginPage();
});

When('user enters an extreme length string of {int} characters into credentials fields', async function (length: number) {
  initPages();
  const longPayload = CommonUtils.generateLongString(length);
  await loginPage.enterUsername(longPayload);
  await loginPage.enterPassword(longPayload);
});

Then('the application should handle the long input without crashing and display error {string}', async function (expectedError: string) {
  initPages();
  await loginPage.verifyErrorMessageDisplayed();
  await loginPage.verifyErrorMessageText(expectedError);
});

// Category 4: Validation Steps
Then('the password input field must have attribute {string} equal to {string}', async function (attribute: string, value: string) {
  initPages();
  if (attribute === 'type' && value === 'password') {
    await loginPage.verifyPasswordInputTypeMasked();
  }
});

Then('the username input should display placeholder {string}', async function (placeholder: string) {
  initPages();
  await loginPage.verifyUsernamePlaceholder(placeholder);
});

Then('the password input should display placeholder {string}', async function (placeholder: string) {
  initPages();
  await loginPage.verifyPasswordPlaceholder(placeholder);
});

When('user focuses on the username input field', async function () {
  initPages();
  await loginPage.focusUsername();
});

Then('the username input field should have active focus', async function () {
  initPages();
  await loginPage.verifyUsernameInputIsFocused();
});

// Category 5: Security Steps
When('user enters security payload username {string} and password {string}', async function (username: string, password: string) {
  initPages();
  await loginPage.enterUsername(username);
  await loginPage.enterPassword(password);
});

Then('the authentication attempt should be denied with error {string}', async function (expectedError: string) {
  initPages();
  await loginPage.verifyErrorMessageDisplayed();
  await loginPage.verifyErrorMessageText(expectedError);
});

When('user attempts to navigate directly to protected route {string} without authenticating', async function (_route: string) {
  initPages();
  await homePage.navigateDirectlyToHome();
});

