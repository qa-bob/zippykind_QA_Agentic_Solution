import { Page, Locator } from '@playwright/test';

export abstract class BasePage {
  constructor(protected readonly page: Page) {}

  async waitForPageLoad(): Promise<void> {
    // Use 'load' — the homepage has persistent background requests (New Relic, Zendesk)
    // that prevent 'networkidle' from ever settling.
    await this.page.waitForLoadState('load');
  }

  async getTitle(): Promise<string> {
    return this.page.title();
  }

  async getCurrentUrl(): Promise<string> {
    return this.page.url();
  }

  /** Returns a nav link from the top-nav by its visible text. */
  getNavLink(text: string): Locator {
    return this.page.locator('#top-nav').getByRole('link', { name: text, exact: true });
  }

  get topNav(): Locator {
    return this.page.locator('#top-nav');
  }
}

