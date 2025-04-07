import { test, Page, Browser, chromium, expect } from "playwright/test";
import { RegisterPage } from "../../../pages/register-page";
import { Before, Given, When, Then, BeforeAll } from "@cucumber/cucumber";

let browser: Browser;
let registerPage: RegisterPage;

Before(async function () {
  if (!browser) {
    browser = await chromium.launch({ headless: true }); // Launch the browser
  }
  const context = await browser.newContext();
  this.page = await context.newPage(); // Attach the Playwright page to the Cucumber context
  registerPage = new RegisterPage(this.page);
});

Given("I navigate to the Registration page", async function () {
  if (!this.page) {
    throw new Error("Page object is undefined");
  }
  const registerPage = new RegisterPage(this.page);
  await registerPage.openRegisterPage();
});

When(
  "I fill in the registration form with following details:",
  async function (dataTable) {
    // Convert the dataTable into a key-value pair object
    const userInformations = dataTable.rowsHash();

    // Map the extracted data to your test object
    const testUserInformations = {
      userName: userInformations["User Name"], // Extract "User Name"
      email: userInformations.Email, // Extract "Email"
      gender: userInformations.Gender, // Hardcoded value
      hobbies: userInformations.Hobbies.split(", "), // Extract hobbies from the input
    };

    // Use the extracted data to fill the registration form
    await registerPage.fillRegisterForm(testUserInformations);
  }
);

When("I submit the form", async function () {
  // Submit the registration form
});

Then(
  "The following user details should be displayed:",
  async function (dataTable) {
    const result = dataTable.rowsHash();
    const expectedUserInformations = {
      userName: result["User Name"], // Extract "User Name"
      email: result.Email, // Extract "Email"
      gender: result.Gender, // Extract "Gender"
      hobbies: result.Hobbies, // Extract hobbies from the input
    };

    const userNameResult = registerPage.userNameResult;
    const emailResult = registerPage.emailResult;
    const informationResult = registerPage.informationResult;

    expect(userNameResult).toHaveText(expectedUserInformations.userName);
    expect(emailResult).toHaveText(expectedUserInformations.email);
    expect(informationResult).toContainText(
      `Gender: ${expectedUserInformations.gender}`
    );
    expect(informationResult).toContainText(
      `Hobbies: ${expectedUserInformations.hobbies}`
    );
  }
);
