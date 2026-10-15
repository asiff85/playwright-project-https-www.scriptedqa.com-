import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * HomePage encapsulates all locators, actions, and page-level assertions
 * for https://www.scriptedqa.com/home
 */
export class HomePage extends BasePage {
  readonly welcomeHeading: Locator;
  readonly signOutButton: Locator;
  readonly categoriesNav: Locator;
  readonly shoppingNav: Locator;

  constructor(page: Page) {
    super(page);
    this.welcomeHeading = page.getByText('Welcome back, Automation Engineer!');
    this.signOutButton = page.getByRole('button', { name: 'Sign Out' });
    this.categoriesNav = page.getByText('Categories', { exact: true });
    this.shoppingNav = page.getByText('Shopping', { exact: true });
  }

  async verifyOnHomePage(): Promise<void> {
    await expect(this.page).toHaveURL('https://www.scriptedqa.com/home');
  }

  async verifyWelcomeMessageDisplayed(): Promise<void> {
    await expect(this.welcomeHeading).toBeVisible();
  }

  async clickSignOut(): Promise<void> {
    await expect(this.signOutButton).toBeVisible();
    await this.signOutButton.click();
  }

  async navigateDirectlyToHome(): Promise<void> {
    await this.navigateTo('https://www.scriptedqa.com/home');
  }

  async verifyCategoriesNavVisible(): Promise<void> {
    await expect(this.categoriesNav).toBeVisible();
  }

  async verifyShoppingTabVisible(): Promise<void> {
    await expect(this.shoppingNav).toBeVisible();
  }

  async clickShoppingTab(): Promise<void> {
    await expect(this.shoppingNav).toBeVisible();
    await this.shoppingNav.click();
  }
}

