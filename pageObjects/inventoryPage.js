class InventoryPage {
    constructor(page) {
        this.page = page;
        this.addToCartButtons = '.btn_inventory';
        this.cartLink = '.shopping_cart_link';
    }

    async addItemToCart(index) {
        const buttons = await this.page.$$(this.addToCartButtons);
        await buttons[index].click();
    }

    async getItemsCount() {
        const buttons = await this.page.$$(this.addToCartButtons);
        return buttons.length;
    }

    async goToCart() {
        await this.page.click(this.cartLink);
    }
}

module.exports = InventoryPage;
