class DashboardPage {
    constructor(page) {
        this.page = page;
        this.product = page.locator('div.card-body');
        this.cartLink = page.locator('button[routerlink*="/cart"]');
    }

    async addProductToCart(productName) {
        const productCount = await this.product.count();

        for (let i = 0; i < productCount; i++) {
            if (await this.product.nth(i).locator('b').textContent() == productName) {
                await this.product.nth(i).locator('text="Add To Cart"').click();
                break;
            }
        }
    }

    async navigateToCart() {
        await this.cartLink.click();
    }
}

module.exports = {DashboardPage};