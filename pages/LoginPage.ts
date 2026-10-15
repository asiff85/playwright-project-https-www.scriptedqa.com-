import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * LoginPage encapsulates all locators, actions, and page-level assertions
 * for https://www.scriptedqa.com/
 */
export class LoginPage extends BasePage {
  // Centralized locators using Playwright recommended semantic methods
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly signInButton: Locator;
  readonly errorMessage: Locator;
  readonly loginHeading: Locator;
  readonly credentialsHint: Locator;

  constructor(page: Page) {
    super(page);
    this.usernameInput = page.getByPlaceholder('Username');
    this.passwordInput = page.getByPlaceholder('Password');
    this.signInButton = page.getByRole('button', { name: 'Sign In' });
    this.errorMessage = page.getByText('Oops! The credentials are incorrect.');
    this.loginHeading = page.getByText('Scripted QA', { exact: true });
    this.credentialsHint = page.getByText('CREDENTIALS', { exact: true });
  }

  async gotoLoginPage(): Promise<void> {
    await this.navigateTo('https://www.scriptedqa.com/');
    await expect(this.loginHeading).toBeVisible();
    await expect(this.signInButton).toBeVisible();
  }

  async enterUsername(username: string): Promise<void> {
    await this.usernameInput.fill(username);
  }

  async enterPassword(password: string): Promise<void> {
    await this.passwordInput.fill(password);
  }

  async clickSignIn(): Promise<void> {
    await this.signInButton.click();
  }

  async submitViaEnterKey(): Promise<void> {
    await this.passwordInput.press('Enter');
  }

  async performLogin(username: string, password: string): Promise<void> {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickSignIn();
  }

  async verifyErrorMessageDisplayed(): Promise<void> {
    await expect(this.errorMessage).toBeVisible();
  }

  async verifyErrorMessageText(expectedText: string): Promise<void> {
    await expect(this.errorMessage).toHaveText(expectedText);
  }

  async verifyPasswordInputTypeMasked(): Promise<void> {
    await expect(this.passwordInput).toHaveAttribute('type', 'password');
  }

  async verifyUsernamePlaceholder(expectedPlaceholder: string): Promise<void> {
    await expect(this.usernameInput).toHaveAttribute('placeholder', expectedPlaceholder);
  }

  async verifyPasswordPlaceholder(expectedPlaceholder: string): Promise<void> {
    await expect(this.passwordInput).toHaveAttribute('placeholder', expectedPlaceholder);
  }

  async verifyInputsAreBlank(): Promise<void> {
    await expect(this.usernameInput).toHaveValue('');
    await expect(this.passwordInput).toHaveValue('');
  }

  async focusUsername(): Promise<void> {
    await this.usernameInput.focus();
  }

  async verifyUsernameInputIsFocused(): Promise<void> {
    await expect(this.usernameInput).toBeFocused();
  }

  async verifyOnLoginPage(): Promise<void> {
    await expect(this.page).toHaveURL('https://www.scriptedqa.com/');
    await expect(this.signInButton).toBeVisible();
  }
}

