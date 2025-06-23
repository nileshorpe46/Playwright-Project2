class CartPage{
    constructor(page){
        this.page = page;
        this.cartItems = page.locator('div.cart li');
        this.checkoutButton = page.locator('button:has-text("Checkout")');
    }

    async getCartItemLocator(productName){
        await this.cartItems.last().waitFor();
        this.cartProduct = this.page.locator('h3:has-text(\''+productName+'\')');
        return this.cartProduct;
    }

    async navigateToOrderPage(){
        await this.checkoutButton.click();
    }
}

module.exports = {CartPage};