// pages/SignupPage.js
import { expect } from '@playwright/test';
import { testData } from '../utils/testData';

export class SignupPage {
  constructor(page) {
    this.page = page;
    this.emailField = page.locator('//input[@name="username"]');
    this.passwordField = page.locator('//input[@name="password"]');
    this.submitButton = page.locator('//input[@type="submit"]');
    this.errorMessage = page.locator('//p[@class="error"]');
  }

  async navigate() {
    await this.page.goto(testData.signupUrl);
  }

  async enterCredentils(email, password) {
    await this.emailField.fill(email);
    await this.passwordField.fill(password);
  }

  async submit() {
    await this.submitButton.click();
  }

  async verifySuccessfulLogin(expectedUrlPart) {
    await expect(this.page).toHaveURL(new RegExp(expectedUrlPart));
  }
  async verifyFailedLoginForEmptyinput() {
    await expect(this.errorMessage).toContainText('Please enter a username and password.');
  }
  async verifyFailedLogin() {
    await expect(this.errorMessage).toContainText('An internal error has occurred and has been logged.');
  }
 
}
