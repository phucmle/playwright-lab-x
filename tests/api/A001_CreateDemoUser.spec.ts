import { APIRequestContext } from "playwright";
import { expect, test } from "../fixtures/test-fixture";

const DEMO_URL = "https://demoqa.com/Account/v1/User";
const DEMO_PASSWORD = "Password123!@#";

const generateRandomUserName = () =>
  `test_user_${Math.floor(Math.random() * 1000000)}`;

async function createDemoAccount(
  request: APIRequestContext,
  userName: string,
  password: string = DEMO_PASSWORD
) {
  const response = await request.post(DEMO_URL, {
    headers: { "Content-Type": "application/json" },
    data: { userName: userName, password: password },
  });
  let jsonResponse;
  try {
    jsonResponse = await response.json();
  } catch (e) {
    jsonResponse = null;
  }
  return { response, jsonResponse };
}

test.describe("Create new demo account via API", () => {
  test("Create new account successfully", async ({ request }) => {
    let newUserName = generateRandomUserName();

    const { response, jsonResponse } = await createDemoAccount(
      request,
      newUserName
    );

    console.log("Status:", response.status());
    console.log("Body:", jsonResponse);
    expect(response.status()).toBe(201);
    expect(jsonResponse.username).toBe(newUserName);
  });

  test("Cannot create with duplicated username", async ({ request }) => {
    const { response, jsonResponse } = await createDemoAccount(
      request,
      "test_user243324"
    );

    console.log("Status:", response.status());
    console.log("Body:", jsonResponse);
    expect(response.status()).toBe(406);
    expect(jsonResponse.message).toBe("User exists!");
  });
});
