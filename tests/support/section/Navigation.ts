import { Locator, Page } from '@playwright/test';

class NavigationPage {
  readonly page: Page;
  readonly homeLink: Locator;
  readonly categories: Locator;
  readonly contact: Locator;
  readonly signIn: Locator;
  readonly signedInName: Locator;
  readonly language: Locator;
  readonly cart: Locator;
  readonly cartCount: Locator;

  constructor(page: Page) {
    this.page = page;
    this.homeLink = page.getByTestId('nav-home');
    this.categories = page.getByTestId('nav-categories');
    this.contact = page.getByTestId('nav-contact');
    this.signIn = page.getByTestId('nav-sign-in');
    this.language = page.getByTestId('language-select');
    this.cart = page.getByTestId('nav-cart');
    this.cartCount = page.getByTestId('cart-quantity');
    this.signedInName = page.getByTestId('nav-menu');
  }

  async toSignIn() {
    await this.signIn.click();
  }
  async toHome() {
    await this.homeLink.click();
  }
  async toCart() {
    await this.cart.click();
  }
}
export default NavigationPage;