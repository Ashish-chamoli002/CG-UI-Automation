import { Locator, Page } from "@playwright/test";
import BasePage from "../pages/BasePage";

class Filter extends BasePage {

    readonly searchInput: Locator;
    readonly searchButton: Locator;
    readonly hammerCheckbox: Locator;
    constructor(page: Page) {
        super(page);
        this.searchInput = page.getByTestId("search-query");
        this.searchButton = page.getByTestId("search-submit");
        this.hammerCheckbox = page.locator('label', { hasText: 'Hammer' }).locator('input[type="checkbox"][name="category_id"]');
    }

    async selectHammerCheckbox(): Promise<void> {
        await this.hammerCheckbox.isVisible();
        await this.hammerCheckbox.check();
        await this.page.waitForTimeout(4000);
    }

    async searchProduct(productName: string): Promise<void> {
        await this.searchInput.scrollIntoViewIfNeeded();
        await this.searchInput.fill(productName);
        await this.searchButton.click();
        await this.page.waitForTimeout(4000);
    }
}

export default Filter;