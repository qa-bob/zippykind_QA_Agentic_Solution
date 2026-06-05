import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class FeaturesPage extends BasePage {
  // Main headings
  private readonly pageHeading = this.page.locator('h2').filter({ hasText: "Zippykind's Software and App Features" });

  // Feature section headings (H3)
  private readonly mapDashboardSection = this.page.locator('h3').filter({ hasText: 'Interactive Map Dashboard' });
  private readonly trackDriversSection = this.page.locator('h3').filter({ hasText: 'Track Your Drivers' });
  private readonly heatmapSection = this.page.locator('h3').filter({ hasText: 'Delivery History Heatmap' });
  private readonly sendTicketsSection = this.page.locator('h3').filter({ hasText: 'Easily Send Delivery Tickets To Your Drivers' });
  private readonly notificationTemplatesSection = this.page.locator('h3').filter({ hasText: 'Notification Templates' });

  // Feature row headings (H2)
  private readonly driversEfficientSection = this.page.locator('h2').filter({ hasText: 'Drivers Stay Efficient' });
  private readonly communicateBetterSection = this.page.locator('h2').filter({ hasText: 'Communicate Better With Customers' });
  private readonly dispatchDashboardSection = this.page.locator('h2').filter({ hasText: "Dispatch Operator's Dashboard" });

  constructor(page: Page) {
    super(page);
  }

  async navigate(): Promise<void> {
    await this.page.goto('/features');
    await this.waitForPageLoad();
  }

  get mainHeading() { return this.pageHeading; }
  get mapDashboard() { return this.mapDashboardSection; }
  get trackDrivers() { return this.trackDriversSection; }
  get heatmap() { return this.heatmapSection; }
  get sendTickets() { return this.sendTicketsSection; }
  get notificationTemplates() { return this.notificationTemplatesSection; }
  get driversEfficient() { return this.driversEfficientSection; }
  get communicateBetter() { return this.communicateBetterSection; }
  get dispatchDashboard() { return this.dispatchDashboardSection; }
}
