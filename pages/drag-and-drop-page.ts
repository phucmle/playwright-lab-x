import { Locator, Page } from "playwright";
import { BasePage } from "./base-page";

export class DragAndDropPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  //xpaths
  xPuzzlePiece = (num: number) => {
    return `//div[@id='piece-${num}']`;
  };

  xDropZone = (num: number) => {
    return `//div[@data-piece=${num}]`;
  };

  //locators
  puzzlePiece = (num: number) => {
    return this.page.locator(this.xPuzzlePiece(num));
  };

  dropZone = (num: number) => {
    return this.page.locator(this.xDropZone(num));
  };

  //functions
  openDragAndDropPage = async () => {
    await this.openMainPage();
    await this.goToPage("Puzzle drag and drop game");
  };
}
