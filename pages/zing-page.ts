import type { Locator, Page } from 'playwright';
import { BasePage } from './base-page';

export interface IArticle {
  title: string;
  content: string;
}

export class ZingPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  public readonly zingUrl = 'https://znews.vn/';

  //xpath
  private readonly xArticles = '//article[contains(@class,article-item)]';

  //locator
  public readonly articles = this.page.locator(this.xArticles);

  //functions
  public openZingPage = async (): Promise<void> => {
    await this.navigateTo(this.zingUrl);
  };

  private getArticleTitle = async (article: Locator): Promise<string> => {
    return await article.locator("//p[@class='article-title']").innerText();
  };

  private getArticleSummary = async (article: Locator): Promise<string> => {
    return await article.locator("//p[@class='article-summary']").innerText();
  };

  public getArticles = async (numberOfNotes: number): Promise<IArticle[]> => {
    const articles: IArticle[] = [];
    //Get all articles
    const allArticles = await this.articles.all();

    for (const article of allArticles) {
      const newsTitle: string = await this.getArticleTitle(article);
      const newsContent: string = await this.getArticleSummary(article);

      const hasTitleAndContent: boolean =
        Boolean(newsTitle?.trim()) && Boolean(newsContent?.trim());

      // Check if the article has both title and content
      if (hasTitleAndContent) {
        articles.push({ title: newsTitle, content: newsContent });
        const hasExpectedNumberOfNotes: boolean = articles.length === numberOfNotes;
        //Exit for loop when it reaches the expected number
        if (hasExpectedNumberOfNotes) {
          break;
        }
      }
    }

    return articles;
  };
}
