import type { Page } from 'playwright';
import { BasePage } from './base-page';

interface IProduct {
  name: string;
  price: number;
  quantity: number;
}

export class ProductPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  //xpaths
  private readonly xAddBtn = (name: string) => {
    return `//div[text()='${name}']/following-sibling::button`;
  };
  private readonly xCartQuantity = (name: string) => {
    return `//td[text()='${name}']/following-sibling::td[2]`;
  };
  private readonly xProductName = (name: string) => {
    return `//td[text()='${name}']/following-sibling::td[3]`;
  };
  private readonly xTotalPrice = '//td[@class="total-price"]';

  //locators
  public readonly addBtn = (name: string) => {
    return this.page.locator(this.xAddBtn(name));
  };
  public readonly cartQuantity = (name: string) => {
    return this.page.locator(this.xCartQuantity(name));
  };
  public readonly cartProductName = (name: string) => {
    return this.page.locator(this.xProductName(name));
  };
  public readonly totalPrice = this.page.locator(this.xTotalPrice);

  //functions
  public openProductPage = async (): Promise<void> => {
    await this.openMainPage();
    await this.goToPage('Product page');
  };

  public addProduct = async (product: IProduct): Promise<void> => {
    const addButton = this.addBtn(product.name);
    await addButton.waitFor({ state: 'visible' });
    await addButton.click({
      clickCount: product.quantity,
      delay: 100,
    });
  };

  public addProducts = async (products: IProduct[]): Promise<void> => {
    for (const product of products) {
      try {
        await this.addProduct(product);
      } catch (error) {
        console.error(`Failed to add product for ${product.name}`);
        throw error;
      }
    }
  };
}
