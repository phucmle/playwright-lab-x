import { expect, test } from '../fixtures/test-fixture';

test.describe('captcha verification', () => {
  test.beforeEach('Go to the captcha verification page', async ({ captchaPage }) => {
    await captchaPage.openCaptchaPage();
  });

  test('should update captcha code after refresh', async ({ captchaPage }) => {
    let initialCaptcha = '';
    let refreshedCaptcha = '';

    await test.step('Capture initial captcha code', async () => {
      initialCaptcha = await captchaPage.getCaptchaFromAPI();
    });

    await test.step('Refresh captcha and verify code changes', async () => {
      await captchaPage.refreshCaptchaBtn.click();
      refreshedCaptcha = await captchaPage.getCaptchaFromAPI();

      expect(refreshedCaptcha).not.toBe(initialCaptcha);
    });
  });

  test('should show error message for invalid captcha submission', async ({ captchaPage }) => {
    await test.step('Submit an incorrect captcha and check the error message', async () => {
      await captchaPage.fillAndSubmitCaptcha('abcd');

      await expect(captchaPage.message).toContainText('Invalid captcha. Please try again.');
    });
  });

  test('should verify captcha successfully with correct code', async ({ captchaPage }) => {
    let captcha = '';

    await test.step('Retrieve the current valid captcha code', async () => {
      captcha = await captchaPage.getCaptchaFromAPI();
    });

    await test.step('Submit the correct captcha and check for success message', async () => {
      await captchaPage.fillAndSubmitCaptcha(captcha);

      await expect(captchaPage.message).toContainText('Captcha verified successfully!');
    });
  });

  //This one using the OCR method to get get the captcha,
  // but it can be unreliable at times due to the instability of the OCR method
  test('should verify captcha successfully with correct code by OCR method', async ({
    captchaPage,
  }) => {
    let captcha = '';

    await test.step('Retrieve the current valid captcha code', async () => {
      captcha = await captchaPage.getValidCaptchaFromImg();
    });

    await test.step('Submit the correct captcha and check for success message', async () => {
      await captchaPage.fillAndSubmitCaptcha(captcha);

      await expect(captchaPage.message).toContainText('Captcha verified successfully!');
    });
  });
});
