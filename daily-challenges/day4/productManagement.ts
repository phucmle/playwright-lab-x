// ### Requirements:

// 1. Create an object `productList` to store the product list.
// 2. Write a function `addProduct(name, price)` to add a product to the list. The product will have attributes `name` (name) and `price` (price).
// 3. Write a function `removeProduct(name)` to remove a product from the list by product name.
// 4. Write a function `calculateTotal()` to calculate the total price of all products in the list.

// ## Example:

// **Input**:

// - Add product: `"Apple"`, price: `5000`
// - Add product: `"Banana"`, price: `3000`
// - Remove product: `"Banana"`
// - Calculate total product value.

// **Output**:

// - Products in the list: `Apple: 5000`
// - Total product value: `5000`

// Declare the types.
interface IProduct {
  name: string;
  price: number;
  quantity: number;
}

let productList: IProduct[] = [];

function addProduct(name: string, price: number, quantity: number) {
  const product: IProduct = { name, price, quantity };
  productList.push(product);
}

function removeProduct(name: string) {
  productList = productList.filter((product) => product.name !== name);
}

function calculateTotal() {
  let total = 0;
  productList.forEach((product) => {
    total += product.price * product.quantity;
  });
  return total;
}

addProduct('Apple', 5000, 5);
addProduct('Banana', 2000, 1);
addProduct('Mango', 3333, 2);

removeProduct('Banana');

console.table(productList);
console.table({ 'Total is: ': calculateTotal() });
