import type { Locator, Page } from 'playwright';
import { BasePage } from './base-page';

export class ToDoPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  //xpaths
  private readonly xTaskInput = '//input[@id="new-task"]';
  private readonly xAddTaskBtn = '//button[@id="add-task"]';
  private readonly xDeleteBtns = '//button[contains(@id,"delete")]';

  //locators
  public readonly taskInput = this.page.locator(this.xTaskInput);
  public readonly addTaskBtn = this.page.locator(this.xAddTaskBtn);
  public readonly deleteButtons = this.page.locator(this.xDeleteBtns);

  //functions
  private getBtnId = (btn: Locator): Promise<string | null> => {
    return btn.getAttribute('id');
  };

  public openToDoPage = async (): Promise<void> => {
    await this.openMainPage();
    await this.goToPage('Todo page');
  };

  public addTasks = async (numberOfTasks: number, taskPrefix = 'Todo '): Promise<void> => {
    for (let i = 1; i <= numberOfTasks; i++) {
      const taskName = taskPrefix + i;
      await this.taskInput.fill(taskName);
      await this.addTaskBtn.click();
    }
  };

  public deleteOddTasks = async (): Promise<void> => {
    const deleteButtons = await this.deleteButtons.all();

    // Common issue when trying to delete elements in a loop while using a pre-collected list of locators.
    // The problem occurs because the DOM structure changes after each deletion, making the original locators invalid
    // for (const deleteButton of deleteButtons) {
    //   const buttonId = await deleteButton.getAttribute("id");
    //   console.log("🚀 ~ awaittest.step ~ buttonId:", buttonId);
    //   if (!buttonId) {
    //     throw new Error("Button id not found");
    //   }
    //   const number = buttonId?.split("-")[1];
    //   if (parseInt(number) % 2 === 1) {
    //     page.once("dialog", (dialog) => dialog.accept());
    //     await deleteButton.click();
    //   }
    // }

    // Solution: Loop through the array in reverse order
    for (let i = deleteButtons.length - 1; i >= 0; i--) {
      const deleteButton = deleteButtons[i];
      const buttonId = await this.getBtnId(deleteButton);
      if (!buttonId) {
        throw new Error('Button id not found');
      }

      const idNumber = buttonId.split('-')[1];
      const isOdd: boolean = parseInt(idNumber) % 2 !== 0;

      if (isOdd) {
        this.page.once('dialog', (dialog) => dialog.accept());
        await deleteButton.click();
      }
    }
  };
}
