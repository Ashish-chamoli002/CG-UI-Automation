import { Locator, Page } from "@playwright/test";
import BasePage from "./BasePage";

class Product extends BasePage {
  readonly productName: Locator;
  readonly productPrice: Locator;
  readonly productDescription: Locator;
  readonly quantityInput: Locator;
  readonly increaseQuantityButton: Locator;
  readonly decreaseQuantityButton: Locator;
  readonly addToCartButton: Locator;
  readonly addToFavoritesButton: Locator;

  constructor(page: Page) {
    super(page);
    this.productName = page.getByTestId("product-name");
    this.productPrice = page.getByTestId("unit-price");
    this.productDescription = page.getByTestId("product-description");
    this.quantityInput = page.getByTestId("quantity");
    this.increaseQuantityButton = page.getByTestId("increase-quantity");
    this.decreaseQuantityButton = page.getByTestId("decrease-quantity");
    this.addToCartButton = page.getByTestId("add-to-cart");
    this.addToFavoritesButton = page.getByTestId("add-to-favorites");
  }

  async getProductName(): Promise<string> {
    return await this.productName.innerText();
  }

  async getProductPrice(): Promise<string> {
    return await this.productPrice.innerText();
  }

  async getProductDescription(): Promise<string> {
    return await this.productDescription.innerText();
  }

  async setQuantity(value: number): Promise<void> {
    await this.quantityInput.fill(String(value));
  }

  async incrementQuantity(times = 1): Promise<void> {
    for (let i = 0; i < times; i++) {
      await this.increaseQuantityButton.click();
    }
  }

  async decrementQuantity(times = 1): Promise<void> {
    for (let i = 0; i < times; i++) {
      await this.decreaseQuantityButton.click();
    }
  }

  async addToCart(): Promise<void> {
    await this.addToCartButton.click();
  }

  async addToFavorites(): Promise<void> {
    await this.addToFavoritesButton.click();
  }
}

export default Product;
