import { Page, expect } from '@playwright/test';

/**
 * BasePage provides reusable navigation, URL verification, and common browser interactions.
 */
export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateTo(url: string): Promise<void> {
    await this.page.goto(url);
  }

  async getUrl(): Promise<string> {
    return this.page.url();
  }

  async verifyUrl(expectedUrl: string): Promise<void> {
    await expect(this.page).toHaveURL(expectedUrl);
  }

  async verifyUrlStartsWith(prefix: string): Promise<void> {
    await expect(this.page).toHaveURL(new RegExp(`^${prefix}`));
  }

  async getPageTitle(): Promise<string> {
    return this.page.title();
  }

  async pressKeyboardKey(key: string): Promise<void> {
    await this.page.keyboard.press(key);
  }
}

