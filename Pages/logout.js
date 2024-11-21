export class LogoutPage {

    constructor(page) {
        this.page = page
        this.menu = page.getByRole('button', { name: 'Open Menu' })
        this.logout_option = page.locator('[data-test="logout-sidebar-link"]')

    }

    async logout() {
        await this.menu.click()
        await this.logout_option.click()
    }

}