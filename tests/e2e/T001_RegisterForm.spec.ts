import {test, expect} from "../fixtures/test-fixture";

const userDetails = {
    userName: "felix",
    email: "felix_test@gmail.com",
    gender: "male",
    hobbies: ["reading", "cooking"],
};

const hobbiesText = userDetails.hobbies.join(", ");

test.describe("Exercise input in Register page", () => {
    test("User Register", async ({registerPage}) => {
        // const registerPage = new RegisterPage(page);

        await test.step("Go to register page", async () => {
            await registerPage.openRegisterPage();
        });

        await test.step("Input data in the form", async () => {
            await registerPage.fillRegisterForm(userDetails);
        });

        await test.step("Submit the form", async () => {
            await registerPage.submitForm()
        })

        await test.step("Verify results table", () => {
            const userNameResult = registerPage.userNameResult;
            const emailResult = registerPage.emailResult;
            const informationResult = registerPage.informationResult;

            expect(userNameResult).toHaveText(userDetails.userName);
            expect(emailResult).toHaveText(userDetails.email);
            expect(informationResult).toContainText(
                `Gender: ${userDetails.gender}`
            );
            expect(informationResult).toContainText(`Hobbies: ${hobbiesText}`);
        });
    });
});
