import type { Page } from 'playwright';

export class BasePage {
  public readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  public navigateTo = async (url: string): Promise<void> => {
    await this.page.goto(url);
  };

  public openMainPage = async (): Promise<void> => {
    await this.page.goto('/');
  };

  public goToPage = async (pageName: string): Promise<void> => {
    await this.page.locator(`//a[contains(text(),'${pageName}')]`).click();
    await this.page.waitForLoadState('networkidle');
  };

  public getDialogMsg = (): Promise<string> => {
    return new Promise((resolve) => {
      this.page.once('dialog', async (dialog) => {
        await dialog.accept();
        const message = dialog.message();
        resolve(message);
      });
    });
  };
}
