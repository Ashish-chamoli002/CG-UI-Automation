import { Page, Locator } from "@playwright/test";
import BasePage from "./BasePage";

class CheckoutPage extends BasePage {
  // CART STEP
  readonly productTitle: Locator;
  readonly productQuantity: Locator;
  readonly productPrice: Locator;
  readonly productLineTotal: Locator;
  readonly cartTotal: Locator;
  readonly proceedToCheckoutBtnStep1: Locator;
  

  // LOGIN STEP
  readonly proceedToCheckoutBtnStep2: Locator;
  

  // BILLING ADDRESS STEP
  readonly streetInput: Locator;
  readonly cityInput: Locator;
  readonly stateInput: Locator;
  readonly countryInput: Locator;
  readonly postalCodeInput: Locator;
  readonly proceedToCheckoutBtnStep3: Locator;

  // PAYMENT STEP
  readonly paymentMethodDropdown: Locator;
  readonly confirmButton: Locator;

  // ORDER CONFIRMATION STEP
  readonly orderConfirmationMessage: Locator;

  constructor(page: Page) {
    super(page);

    // Cart Step
    this.productTitle = page.getByTestId('product-title');
    this.productQuantity = page.getByTestId('product-quantity');
    this.productPrice = page.getByTestId('product-price');
    this.productLineTotal = page.getByTestId('line-price');
    this.cartTotal = page.getByTestId('cart-total');
    this.proceedToCheckoutBtnStep1 = page.getByTestId('proceed-1');

    // Login Step
    this.proceedToCheckoutBtnStep2 = page.getByTestId('proceed-2');

    // Billing Step
    this.streetInput = page.getByTestId('street');
    this.cityInput = page.getByTestId('city');
    this.stateInput = page.getByTestId('state');
    this.countryInput = page.getByTestId('country');
    this.postalCodeInput = page.getByTestId('postal_code');
    this.proceedToCheckoutBtnStep3 = page.getByTestId('proceed-3');

    // Payment Step
    this.paymentMethodDropdown = page.getByTestId('payment-method');
    this.confirmButton = page.getByTestId('finish');
  }

  // Step 1: Cart
  async proceedFromCart() {
    await this.proceedToCheckoutBtnStep1.click();
  }

  async removeProductFromCartByName(productName: string) {
    const row = this.page.locator('tr', {
      has: this.page.getByTestId('product-title').filter({ hasText: productName })
    });

    const deleteButton = row.locator('a.btn.btn-danger');
    await deleteButton.click();
    await this.page.waitForTimeout(2000);
  }

  // Step 3: Billing
  async fillBillingDetails(details: {
    street: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
  }) {
    await this.streetInput.fill(details.street);
    await this.cityInput.fill(details.city);
    await this.stateInput.fill(details.state);
    await this.countryInput.fill(details.country);
    await this.postalCodeInput.fill(details.postalCode);
    await this.proceedToCheckoutBtnStep3.click();
  }

  // Step 4: Payment
  async selectPaymentMethod(method: string) {
    await this.paymentMethodDropdown.selectOption(method);
  }

  async confirmOrder() {
    await this.confirmButton.click();
    await this.page.waitForTimeout(6000);
  }

  async completeCheckout(
    email: string,
    password: string,
    billingDetails: {
      street: string;
      city: string;
      state: string;
      country: string;
      postalCode: string;
    },
    paymentMethod: string
  ) {
    await this.proceedFromCart();
   // await this.login.performLogin(email, password);
    await this.fillBillingDetails(billingDetails);
    await this.selectPaymentMethod(paymentMethod);
    await this.confirmOrder();
  }

  async isOrderConfirmed() {
    return await this.orderConfirmationMessage.innerText();
  }
}

export default CheckoutPage;
