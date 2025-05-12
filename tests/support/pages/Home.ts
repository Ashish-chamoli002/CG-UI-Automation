import { Locator, Page } from "@playwright/test";
import BasePage from "./BasePage";

class Home extends BasePage {
  readonly productCards: Locator;

  constructor(page: Page) {
    super(page);
    this.productCards = page.locator('[data-test^="product-"]');
  }

  /**
   * Gets a product card element by partial data-test attribute and product name text.
   * This ensures we select the correct card even when IDs are dynamic.
   */
  getProductCardByName(name: string): Locator {
    return this.page.locator('[data-test^="product-"]', {
      has: this.page.locator('[data-test="product-name"]', { hasText: name })
    });
  }

  /**
   * Clicks a product card by product name
   */
  async openProductCard(name: string) {
    const card = this.getProductCardByName(name);
    await card.click();
  }

  /**
   * Get product price by name
   */
  async getProductPrice(name: string): Promise<string> {
    const card = this.getProductCardByName(name);
    return await card.locator('[data-test="product-price"]').innerText();
  }

  /**
   * Returns all product names as a string array
   */
  async getAllProductNames(): Promise<string[]> {
    const names = this.page.locator('[data-test="product-name"]');
    const count = await names.count();
    const productNames: string[] = [];

    for (let i = 0; i < count; i++) {
      productNames.push(await names.nth(i).innerText());
    }

    return productNames;
  }
}

export default Home;
