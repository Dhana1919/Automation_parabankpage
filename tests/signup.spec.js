// tests/signup.spec.js
import { test, expect } from '@playwright/test';
import { SignupPage } from '../pages/SignupPage.js';
import { DashboardPage } from '../pages/DashboardPage.js';
import { testData } from '../utils/testData.js';
import { saveResultsToExcel } from '../utils/excelreporter.js';

test.describe('Sign-up and verify amount flow', () => {
    const results = [];
    test.afterAll(async () => {
        // Write all test results after suite finishes
        saveResultsToExcel(results);
      });
test('valid User login to the website', async ({ page }) => {
    const signupPage = new SignupPage(page);
    const dashboardPage = new DashboardPage(page);
    const username= testData.validUsername;
    const password = testData.validPassword;
    try{
    // Step 1: Navigate to sign-up
    await signupPage.navigate(testData.signupUrl);
    // Step 2: Fill the Usernmae and password
    await signupPage.enterCredentils(username, password);
    // Step 3: Login to the site
    await signupPage.submit();
    // Step 4: Verify user redirected to dashboard
    await signupPage.verifySuccessfulLogin(testData.dashboardUrl);
    results.push({
        name: 'Valid Login Test',
        status: 'PASS',
        message: `Logged in successfully`,
        timestamp: new Date().toLocaleString(),
      });
    } catch (error) {
      results.push({
        name: 'Valid Login Test',
        status: 'FAIL',
        message: error.message,
        timestamp: new Date().toLocaleString(),
      });
      throw error;
    }
    
  });
  test('Negative: invalid username', async ({ page }) => {
    const signupPage = new SignupPage(page);
    const dashboardPage = new DashboardPage(page);
    const username= testData.invaalidUsername;
    const password = testData.validPassword;
    try{
     // Step 1: Navigate to sign-up
     await signupPage.navigate(testData.signupUrl);
     // Step 2: Fill the Usernmae and password
     await signupPage.enterCredentils(username, password);
     // Step 3: login to the site with invalid username
     await signupPage.submit();
     // Step 4: Verify the error
     await signupPage.verifyFailedLogin();
     results.push({
        name: 'Invalid Username',
        status: 'PASS',
        message: `Proper error message displayed for invalid credentials.`,
        timestamp: new Date().toLocaleString(),
      });
    } catch (error) {
      results.push({
        name: 'Invalid Username',
        status: 'FAIL',
        message: error.message,
        timestamp: new Date().toLocaleString(),
      });
      throw error;
    }
  });
  test('Negative: invalid password', async ({ page }) => {
    const signupPage = new SignupPage(page);
    const dashboardPage = new DashboardPage(page);
    const username= testData.validUsername;
    const password = testData.invalidPassword;
    try{
     // Step 1: Navigate to sign-up
     await signupPage.navigate(testData.signupUrl);
     // Step 2: Fill the Usernmae and password
     await signupPage.enterCredentils(username, password);
     // Step 3: login to the site with invalid password
     await signupPage.submit();
     // Step 4: Verify the error
     await signupPage.verifyFailedLogin();
     results.push({
        name: 'Invalid Password',
        status: 'PASS',
        message: `Proper error message displayed for invalid credentials.`,
        timestamp: new Date().toLocaleString(),
      });
    } catch (error) {
      results.push({
        name: 'Invalid paswword',
        status: 'FAIL',
        message: error.message,
        timestamp: new Date().toLocaleString(),
      });
      throw error;
    }
  });
  test('Negative: empty input fields', async ({ page }) => {
    
    const signupPage = new SignupPage(page);
    try{
      // Step 1: Navigate to sign-up
    await signupPage.navigate(testData.signupUrl);
     // Step 2:login to the site without entering username ans password
     await signupPage.submit();
     // Step 3: Verify the error
     await signupPage.verifyFailedLoginForEmptyinput();
     results.push({
        name: 'Empty Username and Password',
        status: 'PASS',
        message: `Proper error message displayed for invalid credentials.`,
        timestamp: new Date().toLocaleString(),
      });
    } catch (error) {
      results.push({
        name: 'Empty Username and password',
        status: 'FAIL',
        message: error.message,
        timestamp: new Date().toLocaleString(),
      });
      throw error;
    }
  });
  test('User can sign up and see amount on dashboard', async ({ page }) => {
    const signupPage = new SignupPage(page);
    const dashboardPage = new DashboardPage(page);
    const username= testData.validUsername;
    const password = testData.validPassword;
    try{
    // Step 1: Navigate to sign-up
    await signupPage.navigate(testData.signupUrl);
    // Step 2: Fill the Usernmae and password
    await signupPage.enterCredentils(username, password);
    // Step 3: login to the site.
    await signupPage.submit();
    // Step 4: Verify user redirected to dashboard
    await signupPage.verifySuccessfulLogin(testData.dashboardUrl);
    // Step 5: Get and log the displayed amount
    const amount = await dashboardPage.getDisplayedAmount();
    console.log('✅Amount:', amount);
    // Step 6: Validate amount is not empty
    expect(amount).not.toBeNull();
    results.push({
        name: 'Checking amount',
        status: 'PASS',
        message: `Logged in successfully. Amount: ${amount}`,
        timestamp: new Date().toLocaleString(),
      });
    } catch (error) {
      results.push({
        name: 'Checking the amount',
        status: 'FAIL',
        message: error.message,
        timestamp: new Date().toLocaleString(),
      });
      throw error;
    }
  });
});
