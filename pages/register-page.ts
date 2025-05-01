import {Page} from "playwright";
import {BasePage} from "./base-page";

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
    xUserNameInput = "//input[@id='username']";
    xEmailInput = "//input[@id='email']";
    xGenderInput = (gender: string = "male") => {
        if (gender !== "male" && gender !== "female") {
            throw new Error("Gender must be either 'male' or 'female'");
        }
        return `//input[@id='${gender}']`;
    };
    xHobbies = (hobby: string) => {
        return `//input[@id='${hobby}']`;
    };
    xInterests = "//select[@id='interests']";
    xCountry = "//select[@id='country']";
    xDOB = "//input[@id='dob']";
    xProfile = "//input[@id='profile']";
    xBio = "//textarea[@id='bio']";
    xRating = "//input[@id='rating']";
    xFavourite = "//input[@id='favcolor']";
    xNewsLetter = "//input[@id='newsletter']";
    xToggleOption = "//span[@class='slider round']";
    xSubmitBtn = "//button[@type='submit']";
    xTableResult = "//table[@id='userTable']";
    xTableResultBody = `${this.xTableResult}/tbody`;
    xUserNameResult = `${this.xTableResult}//td[2]`;
    xEmailResult = `${this.xTableResult}//td[3]`;
    xInformationResult = `${this.xTableResult}//td[4]`;

    //locators
    userNameInput = this.page.locator(this.xUserNameInput);
    emailInput = this.page.locator(this.xEmailInput);
    genderInput = (gender: string) => {
        return this.page.locator(this.xGenderInput(gender));
    };
    hobbiesInput = (hobby: string) => {
        return this.page.locator(this.xHobbies(hobby));
    };
    interestsInput = this.page.locator(this.xInterests);
    countryInput = this.page.locator(this.xCountry);
    dobInput = this.page.locator(this.xDOB);
    profileInput = this.page.locator(this.xProfile);
    bioInput = this.page.locator(this.xBio);
    ratingInput = this.page.locator(this.xRating);
    favouriteInput = this.page.locator(this.xFavourite);
    newsLetterInput = this.page.locator(this.xNewsLetter);
    toggleOptionInput = this.page.locator(this.xToggleOption);
    submitBtn = this.page.locator(this.xSubmitBtn);
    tableResultBody = this.page.locator(this.xTableResultBody);
    emailResult = this.page.locator(this.xEmailResult);
    userNameResult = this.page.locator(this.xUserNameResult);
    informationResult = this.page.locator(this.xInformationResult);

    //functions
    openRegisterPage = async () => {
        await this.openMainPage();
        await this.goToPage("Register Page");
    };

    fillRegisterForm = async (userDetails: IUserInformation) => {
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
        await this.interestsInput.selectOption([
            {label: "Technology"},
            {label: "Music"},
        ]);
        //Country
        await this.countryInput.selectOption("Canada");
        //DOB
        await this.dobInput.fill("2024-03-18");
        //Profile picture
        await this.profileInput.setInputFiles("playwright.config.ts");
        //Biography
        await this.bioInput.fill("bio 22222");
        //Rate us
        await this.ratingInput.fill("1");
        //Favorite color
        await this.favouriteInput.fill("#111111");
        //Newsletter
        await this.newsLetterInput.check();
        //Enable feature
        await this.toggleOptionInput.setChecked(true);
    };

    submitForm = async () => {
        await this.submitBtn.click();
        await this.tableResultBody.waitFor({state: "visible"});
    };
}
