class OrderPage{
    constructor(page){
        this.page = page;
        this.orderinfo = page.locator('div.payment');
        this.username = page.locator('div.user__name label');
    }





}

module.exports = {OrderPage};