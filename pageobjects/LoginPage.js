class LoginPage {
    constructor(page) {
        this.page = page;
        this.username = page.locator('input#userEmail');
        this.password = page.locator('input#userPassword');
        this.loginButton = page.locator('input#login');
    }

    async openUrl(url) {
        await this.page.goto(url);
    }

    async doLogin(username, password) {
        await this.username.fill(username);
        await this.password.fill(password);
        await this.loginButton.click();
        await this.page.waitForLoadState('networkidle');
    }
}

module.exports = { LoginPage };