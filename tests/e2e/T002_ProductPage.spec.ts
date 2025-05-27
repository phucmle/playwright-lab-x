import { test, expect } from '../fixtures/test-fixture';

const products = [
  { name: 'Product 1', price: 10, quantity: 5 },
  { name: 'Product 2', price: 20, quantity: 3 },
  { name: 'Product 3', price: 30, quantity: 1 },
];

test.describe('Exercise add product in Product page', () => {
  test('Product page', async ({ productPage }) => {
    await test.step('Go to product page', async () => {
      await productPage.openProductPage();
    });

    await test.step('Add product', async () => {
      await productPage.addProducts(products);
    });

    await test.step('Verify the result table', async () => {
      let grandTotal = 0;
      const totalPrice = productPage.totalPrice;

      for (const product of products) {
        const subTotal = product.quantity * product.price;
        grandTotal += subTotal;

        const cartProductName = productPage.cartProductName(product.name);
        const cartQuantity = productPage.cartQuantity(product.name);

        await expect(cartProductName).toContainText(subTotal.toString());
        await expect(cartQuantity).toHaveText(product.quantity.toString());
      }

      await expect(totalPrice).toContainText(grandTotal.toString());
    });
  });
});
