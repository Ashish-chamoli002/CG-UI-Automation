import test from '../support/pages/IndexPage';
import { expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { RegistrationData } from '../support/pages/Login';
import dotenv from 'dotenv';
dotenv.config();

test.describe("Invalid Login", () => {
  test("should show error on invalid credentials", async ({ login, navigate }) => {
    await login.goto();
    navigate.toSignIn(); 
    await login.performLogin("ashishwas@gmail.com", "wrongpass");

    const toast = await login.getErrorMessage();
    expect(toast).toContain("Invalid email or password");
  });
});

test.describe("Valid Login", () => {
    let userData :RegistrationData= {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        dob: faker.date.birthdate({ min: 18, max: 50, mode: 'age' }).toISOString().split('T')[0],
        street: faker.location.streetAddress(),
        postalCode: faker.location.zipCode(),
        city: faker.location.city(),
        state: faker.location.state(),
        country: 'IN',
        phone: '9876543219',
        email: process.env.COVERGO_EMAIL!,
        password: process.env.COVERGO_PASSWORD!
    };
    test.beforeEach(async ({ login, navigate }) => {
        await login.goto();
        await navigate.toSignIn(); 
    });

  test("should login successfully with correct credentials", async ({ login, navigate }) => {
        
    await login.registerLink.click();
    await login.fillRegistrationForm(userData);
    await login.performLogin(userData.email, userData.password);

    expect((await navigate.signedInName.innerText()).trim()).toBe(userData.firstName + " " + userData.lastName);
  });
});

test.describe("Add Product to Cart", () => {
    let userData :RegistrationData= {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        dob: faker.date.birthdate({ min: 18, max: 50, mode: 'age' }).toISOString().split('T')[0],
        street: faker.location.streetAddress(),
        postalCode: faker.location.zipCode(),
        city: faker.location.city(),
        state: faker.location.state(),
        country: 'IN',
        phone: '9876543219',
        email: process.env.COVERGO_EMAIL!,
        password: process.env.COVERGO_PASSWORD!
    };
    const billingDetails = {
      street: userData.street,
      city: userData.city,
      state: userData.state,
      country: userData.country,
      postalCode: userData.postalCode,
    };
    test.beforeEach(async ({ login, navigate }) => {
        await login.goto();
        await navigate.toSignIn();
        await login.registerLink.click();
        await login.fillRegistrationForm(userData);
        await login.performLogin(userData.email, userData.password);
    });
    test("should open product page and add item to cart", async ({ home, product, checkout, navigate, login }) => {
        await navigate.toHome();
        await home.openProductCard("Combination Pliers");
        expect(await product.getProductName()).toContain("Combination Pliers");

        await product.setQuantity(2);
        await product.addToCart();

        const toast = await product.getToastMessage();
        expect(toast.toLowerCase()).toContain("added");

        await navigate.toCart();
        await checkout.page.waitForTimeout(2000);
        await checkout.proceedToCheckoutBtnStep1.click();
        await checkout.page.waitForTimeout(2000);
        await checkout.proceedToCheckoutBtnStep2.click();
        await checkout.fillBillingDetails(billingDetails);
        await checkout.selectPaymentMethod("Cash on Delivery");
        await checkout.confirmOrder();
        expect(await checkout.orderConfirmationMessage.innerText()).toContain("Order confirmed");
    });
});

test.describe("Product Filtering", () => {
    
    test.beforeEach(async ({ login }) => {
        await login.goto();
    });
    test("should filter products when Pliers category is selected", async ({ home, filter, navigate }) => {
        await navigate.toHome();
        await filter.selectHammerCheckbox();
        const productNames = await home.getAllProductNames();
        for (const name of productNames) {
          expect(name.toLowerCase()).toContain('hammer');
        }
    });
});

test.describe("Product Search", () => {
    test.beforeEach(async ({ login }) => {
        await login.goto();
    });
    test("should search for a product and verify the result", async ({ home, filter, navigate }) => {
        await navigate.toHome();
        await filter.searchProduct("Claw Hammer with Shock Reduction Grip");
        const productNames = await home.getAllProductNames();
        for (const name of productNames) {
          expect(name.toLowerCase()).toContain('claw hammer with shock reduction grip');
        }
    });
});

test.describe("Remove Product from Cart", () => {
    
    test.beforeEach(async ({ login, navigate }) => {
        await login.goto();
    });
    test("should update the count shown in cart", async ({ home, product, checkout, navigate }) => {
        await navigate.toHome();
        await home.openProductCard("Claw Hammer with Shock Reduction Grip");
        
        await product.setQuantity(2);
        await product.addToCart();
        expect(await navigate.cartCount.innerText()).toContain("2");

        await navigate.toCart();
        await checkout.page.waitForTimeout(2000);
        await checkout.removeProductFromCartByName("Claw Hammer with Shock Reduction Grip");
        const toast = await product.getToastMessage();
        expect(toast.toLowerCase()).toContain("product deleted");
        await checkout.page.waitForTimeout(2000);

        await expect(navigate.cart).not.toBeVisible();
    });
});

test.describe("Validate Line total in Cart", () => {
    
    test.beforeEach(async ({ login, navigate }) => {
        await login.goto();
    });
    test("should open product page and add item to cart", async ({ home, product, checkout, navigate }) => {
        await navigate.toHome();
        await home.openProductCard("Combination Pliers");

        await product.setQuantity(1);
        await product.addToCart();

        const toast = await product.getToastMessage();
        expect(toast.toLowerCase()).toContain("added");

        await navigate.toCart();
        await checkout.page.waitForTimeout(2000);
        let productPrice = await checkout.productPrice.innerText();
        let productLineTotal = await checkout.productLineTotal.innerText();
        expect(productPrice).toEqual(productLineTotal);
        await checkout.productQuantity.fill("2");
        await checkout.productQuantity.press("Enter");
        await checkout.page.waitForTimeout(4000);
        productPrice = await checkout.productPrice.innerText();
        productLineTotal = await checkout.productLineTotal.innerText();
        expect(productPrice).not.toEqual(productLineTotal);
    });
});