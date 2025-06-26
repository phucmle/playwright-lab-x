import type { Page } from 'playwright';
import { BasePage } from './base-page';

interface IUserInformation {
  userName: string;
  email: string;
  gender: string;
  hobbies: string[];
}

export class RegisterPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  //xpaths
  private readonly xUserNameInput = "//input[@id='username']";
  private readonly xEmailInput = "//input[@id='email']";
  private readonly xGenderInput = (gender = 'male') => {
    if (gender !== 'male' && gender !== 'female') {
      throw new Error("Gender must be either 'male' or 'female'");
    }
    return `//input[@id='${gender}']`;
  };
  private readonly xHobbies = (hobby: string) => {
    return `//input[@id='${hobby}']`;
  };
  private readonly xInterests = "//select[@id='interests']";
  private readonly xCountry = "//select[@id='country']";
  private readonly xDOB = "//input[@id='dob']";
  private readonly xProfile = "//input[@id='profile']";
  private readonly xBio = "//textarea[@id='bio']";
  private readonly xRating = "//input[@id='rating']";
  private readonly xFavourite = "//input[@id='favcolor']";
  private readonly xNewsLetter = "//input[@id='newsletter']";
  private readonly xToggleOption = "//span[@class='slider round']";
  private readonly xSubmitBtn = "//button[@type='submit']";
  private readonly xTableResult = "//table[@id='userTable']";
  private readonly xTableResultBody = `${this.xTableResult}/tbody`;
  private readonly xUserNameResult = `${this.xTableResult}//td[2]`;
  private readonly xEmailResult = `${this.xTableResult}//td[3]`;
  private readonly xInformationResult = `${this.xTableResult}//td[4]`;

  //locators
  public readonly userNameInput = this.page.locator(this.xUserNameInput);
  public readonly emailInput = this.page.locator(this.xEmailInput);
  public readonly genderInput = (gender: string) => {
    return this.page.locator(this.xGenderInput(gender));
  };
  public readonly hobbiesInput = (hobby: string) => {
    return this.page.locator(this.xHobbies(hobby));
  };
  public readonly interestsInput = this.page.locator(this.xInterests);
  public readonly countryInput = this.page.locator(this.xCountry);
  public readonly dobInput = this.page.locator(this.xDOB);
  public readonly profileInput = this.page.locator(this.xProfile);
  public readonly bioInput = this.page.locator(this.xBio);
  public readonly ratingInput = this.page.locator(this.xRating);
  public readonly favouriteInput = this.page.locator(this.xFavourite);
  public readonly newsLetterInput = this.page.locator(this.xNewsLetter);
  public readonly toggleOptionInput = this.page.locator(this.xToggleOption);
  public readonly submitBtn = this.page.locator(this.xSubmitBtn);
  public readonly tableResultBody = this.page.locator(this.xTableResultBody);
  public readonly emailResult = this.page.locator(this.xEmailResult);
  public readonly userNameResult = this.page.locator(this.xUserNameResult);
  public readonly informationResult = this.page.locator(this.xInformationResult);

  //functions
  public openRegisterPage = async (): Promise<void> => {
    await this.openMainPage();
    await this.goToPage('Register Page');
  };

  public fillRegisterForm = async (userDetails: IUserInformation): Promise<void> => {
    //Username
    await this.userNameInput.fill(userDetails.userName);
    //Email
    await this.emailInput.fill(userDetails.email);
    //Gender
    await this.genderInput(userDetails.gender).setChecked(true);
    //Hobbies
    for (const hobby of userDetails.hobbies) {
      await this.hobbiesInput(hobby).setChecked(true);
    }
    //Interests
    await this.interestsInput.selectOption([{ label: 'Technology' }, { label: 'Music' }]);
    //Country
    await this.countryInput.selectOption('Canada');
    //DOB
    await this.dobInput.fill('2024-03-18');
    //Profile picture
    await this.profileInput.setInputFiles('playwright.config.ts');
    //Biography
    await this.bioInput.fill('bio 22222');
    //Rate us
    await this.ratingInput.fill('1');
    //Favorite color
    await this.favouriteInput.fill('#111111');
    //Newsletter
    await this.newsLetterInput.check();
    //Enable feature
    await this.toggleOptionInput.setChecked(true);
  };

  public submitForm = async (): Promise<void> => {
    await this.submitBtn.click();
    await this.tableResultBody.waitFor({ state: 'visible' });
  };
}
