//import {selector} from 'testcafe';
//import faker from 'faker';


import { Selector } from 'testcafe';

fixture`Sauce Demo Tests`
    .page`https://www.saucedemo.com`;

test('Login and checkout', async t => {
    const usernameInput = Selector('#user-name');
    const passwordInput = Selector('#password');
    const loginButton = Selector('#login-button');
    const productPrice = Selector('.inventory_item_price').withText('$49.99');
    const addToCartButtons = Selector('.btn_primary.btn_inventory');
    const cartButton = Selector('.shopping_cart_link');
    const cartItems = Selector('.cart_item');
    const checkoutButton = Selector('#checkout');
    const firstNameInput = Selector('#first-name');
    const lastNameInput = Selector('#last-name');
    const zipCodeInput = Selector('#postal-code');
    const continueButton = Selector('#continue');
    const finishButton = Selector('#finish');

    // Login method
    await t
        .typeText(usernameInput, 'performance_glitch_user')
        .typeText(passwordInput, 'secret_sauce')
        .click(loginButton);

    // Check product price and add products to cart
    await t
        .expect(productPrice.exists).ok()
        .click(addToCartButtons.nth(0))
        .click(addToCartButtons.nth(1));

    // Check cart and go to checkout
    await t
        .click(cartButton)
        .expect(cartItems.count).eql(2)
        .click(checkoutButton);

    // Fill out checkout form and complete order
    await t
        .typeText(firstNameInput, 'John')
        .typeText(lastNameInput, 'Doe')
        .typeText(zipCodeInput, '12345')
        //.typeText(firstNameInput, faker.name.firstName())
        //.typeText(lastNameInput, faker.name.lastName())
        //.typeText(zipCodeInput, faker.address.zipCode())

        .click(continueButton)
        .click(finishButton);
});
