import { test as fixture } from '@playwright/test'
import Login from './Login'
import Navigation from '../section/Navigation'
import CheckoutPage from './Checkout';
import Product from './Product';
import Home from './Home';
import Filter from '../section/Filter';

type CustomFixtures = {
	login: Login;	
	navigate: Navigation;
    checkout: CheckoutPage;
    product: Product;
	home: Home;	
	filter: Filter
};

const test = fixture.extend<CustomFixtures>({
	login: async ({ page }, use) => {
		await use(new Login(page));
	},
	
	navigate: async ({ page }, use) => {
		await use(new Navigation(page));
	},

	checkout: async ({ page }, use) => {
		await use(new CheckoutPage(page));
	},

	product: async ({ page }, use) => {
		await use(new Product(page));
	},
	home: async ({ page }, use) => {
		await use(new Home(page));
	},
	filter: async ({ page }, use) => {
		await use(new Filter(page));
	}
});

export default test