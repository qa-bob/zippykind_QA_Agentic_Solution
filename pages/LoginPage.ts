import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  // Form fields — IDs from live HTML
  private readonly emailInput = this.page.locator('#email_address').first();
  private readonly passwordInput = this.page.locator('#password');
  private readonly loginButton = this.page.getByRole('button', { name: /LOG IN/i });
  private readonly rememberMeCheckbox = this.page.locator('#remember');
  private readonly forgotPasswordLink = this.page.getByText('Forgot password?');

  // Forgot password form
  private readonly forgotPasswordEmailInput = this.page.locator('#frm_forgotpass #email_address');
  private readonly forgotPasswordSubmitButton = this.page.locator('#frm_forgotpass button');
  private readonly backToLoginLink = this.page.getByText('Go back');

  // Logo
  private readonly logo = this.page.getByRole('img').first();

  // Sign up link — HTML text is "Click here", not "sign up"
  private readonly signUpLink = this.page.locator('a[href="/signup"]');

  constructor(page: Page) {
    super(page);
  }

  async navigate(): Promise<void> {
    await this.page.goto('/app/login');
    await this.waitForPageLoad();
  }

  async login(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async clickForgotPassword(): Promise<void> {
    await this.forgotPasswordLink.click();
  }

  async submitForgotPassword(email: string): Promise<void> {
    await this.forgotPasswordEmailInput.fill(email);
    await this.forgotPasswordSubmitButton.click();
  }

  // Expose locators for test assertions
  get email() { return this.emailInput; }
  get password() { return this.passwordInput; }
  get submitButton() { return this.loginButton; }
  get rememberMe() { return this.rememberMeCheckbox; }
  get forgotPassword() { return this.forgotPasswordLink; }
  get brandLogo() { return this.logo; }
  get signUp() { return this.signUpLink; }
}
