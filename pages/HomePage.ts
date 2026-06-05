import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  // Navigation
  private readonly loginLink = this.page.getByRole('link', { name: 'Login' });

  // Footer
  private readonly copyrightText = this.page.locator('.sub-footer');
  private readonly facebookLink = this.page.getByRole('link').filter({ has: this.page.locator('[src*="facebook"]') });

  constructor(page: Page) {
    super(page);
  }

  async navigate(): Promise<void> {
    await this.page.goto('/');
    await this.waitForPageLoad();
  }

  async clickLogin(): Promise<void> {
    await this.loginLink.click();
  }

  get loginNav() {
    return this.loginLink;
  }

  get footer() {
    return this.copyrightText;
  }
}
