// pages/DashboardPage.js
export class DashboardPage {
  constructor(page) {
    this.page = page;
    this.amountText = page.locator('//table[@id="accountTable"]//tbody/tr[1]/td[3]'); 
  }

  async getDisplayedAmount() {
    return await this.amountText.textContent();
  }
}
