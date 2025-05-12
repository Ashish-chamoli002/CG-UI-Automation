import { Locator, Page } from '@playwright/test';

class BasePage {
  
  
  constructor(public page: Page) {
    this.page = page;
  }

    async goto() {
        await this.page.goto('/');
    }

    async getToastMessage(): Promise<string> {
        const toastLocator = this.page.locator('#toast-container'); // Adjust if needs to be more specific
        await toastLocator.waitFor({ state: 'visible', timeout: 5000 });
        return await toastLocator.innerText();
    }
}

export default BasePage;