import { Locator, Page } from '@playwright/test';
import BasePage from './BasePage';

export type RegistrationData = {
  firstName: string;
  lastName: string;
  dob: string;
  street: string;
  postalCode: string;
  city: string;
  state: string;
  country: string;
  phone: string;
  email: string;
  password: string;
};

class Login extends BasePage {
  
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;
  readonly registerLink: Locator;
  
  

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.usernameInput = page.getByTestId('email');
    this.passwordInput = page.getByTestId('password');
    this.loginButton = page.getByTestId('login-submit');
    this.errorMessage = page.getByTestId('login-error');
    this.registerLink = page.getByTestId('register-link');
  }

    async performLogin(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
        await this.page.waitForTimeout(4000)
    }

    async getErrorMessage(): Promise<string> {
        await this.errorMessage.waitFor({ state: 'visible', timeout: 5000 });
        return (await this.errorMessage.innerText());
    }

    async fillRegistrationForm(data: RegistrationData) {
        await this.page.getByTestId("first-name").fill(data.firstName);
        await this.page.getByTestId("last-name").fill(data.lastName);
        await this.page.getByTestId("dob").fill(data.dob);
        await this.page.getByTestId("street").fill(data.street);
        await this.page.getByTestId("postal_code").fill(data.postalCode);
        await this.page.getByTestId("city").fill(data.city);
        await this.page.getByTestId("state").fill(data.state);
        await this.page.getByTestId("country").selectOption(data.country);
        await this.page.getByTestId("phone").fill(data.phone);
        await this.page.getByTestId("email").fill(data.email);
        await this.page.getByTestId("password").fill(data.password);
        await this.page.getByTestId("register-submit").click();
        await this.page.waitForTimeout(4000); 
    }

    async isLoggedIn(): Promise<boolean> {
        const titleLocator = this.page.getByTestId('page-title');
        console.log("Checking if logged in...", await titleLocator.innerText());
        if (await titleLocator.innerText() === "My account") {
            
            return true;
        }
        return false;
    }
    async pageTitle() {
        return await this.page.getByTestId('page-title').innerText();
    }

}



export default Login;