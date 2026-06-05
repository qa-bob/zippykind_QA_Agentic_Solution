import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class PricingPage extends BasePage {
  // Plan headings
  private readonly freePlanHeading = this.page.locator('h5').filter({ hasText: 'Free Plan' });
  private readonly meadowPlanHeading = this.page.locator('h5').filter({ hasText: 'Meadow Plan' });
  private readonly forestPlanHeading = this.page.locator('h5').filter({ hasText: 'Forest Plan' });
  private readonly orchardPlanHeading = this.page.locator('h5').filter({ hasText: 'Orchard Plan' });

  // Page headings
  private readonly mainHeading = this.page.locator('h2').filter({ hasText: 'Simple Pricing' });
  private readonly subHeading = this.page.locator('h3').filter({ hasText: /As low as/i });

  // Pricing info
  private readonly comparisonChartLink = this.page.getByRole('link', { name: /Compare our plans/i });
  private readonly comparisonChartButton = this.page.getByRole('button', { name: /SEE PRICE COMPARISON CHART/i });

  // Plan CTAs — each plan has a 'START FREE TRIAL' or 'SIGN UP' button
  private readonly planCtas = this.page.locator('.action a');

  // What your membership includes section
  private readonly membershipSection = this.page.locator('h3').filter({ hasText: /What your membership comes with/i });

  // Add-ons section
  private readonly addOnsSection = this.page.locator('h3').filter({ hasText: /Add-ons Pricing/i });

  constructor(page: Page) {
    super(page);
  }

  async navigate(): Promise<void> {
    await this.page.goto('/pricing');
    await this.waitForPageLoad();
  }

  get freePlan() { return this.freePlanHeading; }
  get meadowPlan() { return this.meadowPlanHeading; }
  get forestPlan() { return this.forestPlanHeading; }
  get orchardPlan() { return this.orchardPlanHeading; }
  get heading() { return this.mainHeading; }
  get pricingSubHeading() { return this.subHeading; }
  get comparisonLink() { return this.comparisonChartLink; }
  get comparisonButton() { return this.comparisonChartButton; }
  get ctaButtons() { return this.planCtas; }
  get membershipInfo() { return this.membershipSection; }
  get addOns() { return this.addOnsSection; }
}
