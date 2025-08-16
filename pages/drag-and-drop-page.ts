import type { Page } from 'playwright';
import { BasePage } from './base-page';

export class DragAndDropPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  //xpaths
  private readonly xPuzzlePiece = (num: number) => {
    return `//div[@id='piece-${num}']`;
  };

  private readonly xDropZone = (num: number) => {
    return `//div[@data-piece=${num}]`;
  };

  //locators
  public readonly puzzlePiece = (num: number) => {
    return this.page.locator(this.xPuzzlePiece(num));
  };

  public readonly dropZone = (num: number) => {
    return this.page.locator(this.xDropZone(num));
  };

  //functions
  public openDragAndDropPage = async (): Promise<void> => {
    await this.openMainPage();
    await this.goToPage('Puzzle drag and drop game');
  };
}
