import { test, expect } from "../../fixtures/test-fixture";

const testUserInformations = {
  userName: "felix",
  email: "felix_test@gmail.com",
  gender: "male",
  hobbies: ["reading", "cooking"],
};

const hobbiesText = testUserInformations.hobbies.join(", ");

test.describe("Exercise input in Register page", () => {
  test("User Register", async ({ registerPage }) => {
    await test.step("Go to register page", async () => {
      await registerPage.openRegisterPage();
    });

    await test.step("Input data in the form", async () => {
      await registerPage.fillRegisterForm(testUserInformations);
    });

    await test.step("Submit the form data", async () => {
      await registerPage.submitForm();
    });

    await test.step("Verify results table", async () => {
      const userNameResult = registerPage.userNameResult;
      const emailResult = registerPage.emailResult;
      const informationResult = registerPage.informationResult;

      await expect(userNameResult).toHaveText(testUserInformations.userName);
      await expect(emailResult).toHaveText(testUserInformations.email);
      await expect(informationResult).toContainText(
        `Gender: ${testUserInformations.gender}`
      );
      await expect(informationResult).toContainText(`Hobbies: ${hobbiesText}`);
    });
  });
});
