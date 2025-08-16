import type { Page } from 'playwright';
import { BasePage } from './base-page';
import type { IArticle } from './zing-page';

export class PersonalNotePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  //xpaths
  private readonly xTitleInput = "//input[@id='note-title']";
  private readonly xContentInput = "//textarea[@id='note-content']";
  private readonly xAddBtn = "//button[@id='add-note']";
  private readonly xNoteCount = "//*[@id='note-count']";
  private readonly xSearchInput = "//*[@id='search']";
  private readonly xSearchResults = "//*[@id='notes-list']";

  //locators
  public readonly titleInput = this.page.locator(this.xTitleInput);
  public readonly contentInput = this.page.locator(this.xContentInput);
  public readonly addButton = this.page.locator(this.xAddBtn);
  public readonly noteCount = this.page.locator(this.xNoteCount);
  public readonly searchInput = this.page.locator(this.xSearchInput);
  public readonly searchResults = this.page.locator(this.xSearchResults);

  //functions
  public openPersonalNotePage = async (): Promise<void> => {
    await this.openMainPage();
    await this.goToPage('Personal notes');
  };

  public addNotesWithArticles = async (articles: IArticle[]): Promise<void> => {
    for (const article of articles) {
      await this.titleInput.fill(article.title);
      await this.contentInput.fill(article.content);
      await this.addButton.click();
    }
  };

  public getSearchTerm = async (
    articles: IArticle[],
    searchBy: 'title' | 'content',
    numberOfSearchCharacters: number
  ): Promise<string> => {
    //Get search term by random title or content of article
    const randomIndex = Math.floor(Math.random() * articles.length);
    const randomArticle = articles[randomIndex];

    const searchTerm = randomArticle[searchBy].slice(0, numberOfSearchCharacters);

    return searchTerm.trim();
  };

  public searchByKeyword = async (keyword: string): Promise<void> => {
    const searchInput = this.searchInput;
    await searchInput.fill(keyword);
  };

  public getFirstSearchResult = async (): Promise<string> => {
    const searchResults = this.searchResults;
    const firstResult = await searchResults.first().innerText();
    return firstResult;
  };
}
