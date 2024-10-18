class CartPage {
    constructor(page) {
        this.page = page;
        this.removeButtons = '.cart_button';
        this.checkoutButton = '.checkout_button';
    }

    async removeItem(index) {
        const buttons = await this.page.$$(this.removeButtons);
        await buttons[index].click();
    }

    async checkout() {
        await this.page.click(this.checkoutButton);
    }
}

module.exports = CartPage;
