import * as fs from 'fs';
import type { Page } from 'playwright';
import { OCRUtils } from '../tests/utils/ocrUtils';
import { BasePage } from './base-page';

export class CaptchaPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  //xpaths
  private readonly xRefreshCaptchaBtn = '#refresh-captcha';
  private readonly xCaptchaInput = '#captcha-input';
  private readonly xVerifyCaptchaBtn = '#verify-captcha';
  private readonly xMessage = '#message';
  private readonly xCaptchaImg = '#captcha-canvas';

  //locators
  public readonly refreshCaptchaBtn = this.page.locator(this.xRefreshCaptchaBtn);
  public readonly captchaInput = this.page.locator(this.xCaptchaInput);
  public readonly verifyCaptchaBtn = this.page.locator(this.xVerifyCaptchaBtn);
  public readonly message = this.page.locator(this.xMessage);
  public readonly captchaImgLocator = this.page.locator(this.xCaptchaImg);

  //functions
  public openCaptchaPage = async (): Promise<void> => {
    await this.page.goto('/036-captcha.html');
  };

  public getCaptchaFromAPI = async (): Promise<string> => {
    const response = await this.page.waitForResponse(
      (response) =>
        response.url().includes('captcha.php?action=generate') && response.status() === 200
    );
    const body = await response.json();
    return body.captcha.toString();
  };

  public fillAndSubmitCaptcha = async (captcha: string): Promise<void> => {
    await this.captchaInput.fill(captcha);
    await this.verifyCaptchaBtn.click();
    await this.message.waitFor({ state: 'visible' });
  };

  public getCaptchaFromImg = async (): Promise<string> => {
    const ocrUtils = new OCRUtils();
    await ocrUtils.initOCR();

    const fileName = 'captcha.png';
    await this.captchaImgLocator.screenshot({ path: fileName });

    const detectedCode = await ocrUtils.performOCR(fileName);

    // Clean up screenshot file
    if (fs.existsSync(fileName)) {
      fs.unlinkSync(fileName);
    }

    return detectedCode;
  };

  public getValidCaptchaFromImg = async (maxAttemps = 5): Promise<string> => {
    let captcha = await this.getCaptchaFromImg();
    const attempts = 0;

    while (this.isInValidCaptcha(captcha) && attempts <= maxAttemps) {
      await this.refreshCaptchaBtn.click();
      await this.page.waitForTimeout(2000);

      captcha = await this.getCaptchaFromImg();
    }
    return captcha;
  };

  public isInValidCaptcha = (captcha: string): boolean => {
    return captcha.length !== 4 || isNaN(Number(captcha));
  };
}
