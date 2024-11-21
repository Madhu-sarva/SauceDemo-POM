import { test, expect } from "@playwright/test";
import { LoginPage } from "../Pages/login";
import { LogoutPage } from "../Pages/logout";

test('Login, Sort_hitolo and logout', async ({ page }) => {

    const Login = new LoginPage(page);
    await Login.gotoLoginPage();
    await Login.login('standard_user', 'secret_sauce');
    await page.getByText('Name (A to Z)Name (A to Z)').click();
    await page.locator('[data-test="product-sort-container"]').selectOption('hilo');
    //await expect(page).toHaveScreenshot({ fullPage: true },{timeout: 10000});
    await page.screenshot({ path: 'tests/' + Date.now() + 'hilo.png', fullPage: true });
    const Logout = new LogoutPage(page)
    await Logout.logout()
    await expect(page).toHaveURL('https://www.saucedemo.com');
    await expect(page).toHaveTitle("Swag Labs");

})

test('Buy a product from Homepage', async ({ page }) => {

    const Login = new LoginPage(page);
    await Login.gotoLoginPage();
    await Login.login('standard_user', 'secret_sauce');
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="shopping-cart-link"]').click();
    await page.locator('[data-test="checkout"]').click();
    await page.locator('[data-test="firstName"]').fill('Test');
    await page.locator('[data-test="lastName"]').fill('Customer');
    await page.locator('[data-test="postalCode"]').fill('AB 1CD');
    await page.locator('[data-test="continue"]').click();
    await page.locator('[data-test="finish"]').click();
    const Logout = new LogoutPage(page)
    await Logout.logout()
    await expect(page).toHaveURL('https://www.saucedemo.com');
})

test('Locked out user', async ({ page }) => {

    const Login = new LoginPage(page);
    await Login.gotoLoginPage();
    await Login.login('locked_out_user', 'secret_sauce');
    await page.locator('[data_test="error"]').isVisible();
    const errormessage = page.locator('[data_test="error"]').textContent;
    expect(errormessage === "Epic sadface: Sorry, this user has been locked out.").toBeTruthy;
})