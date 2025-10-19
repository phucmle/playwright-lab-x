import { createWorker } from 'tesseract.js';

export class OCRUtils {
  private worker: any;

  async initOCR(language = 'eng'): Promise<void> {
    this.worker = await createWorker(language);
  }

  async terminateOCR(): Promise<void> {
    if (this.worker) {
      await this.worker.terminate();
    }
  }

  async performOCR(imgPath: string): Promise<any> {
    const {
      data: { text },
    } = await this.worker.recognize(imgPath);

    console.log('Detected Code: ', text.trim());
    //Terminate the OCR after the process
    this.terminateOCR();

    return text.trim();
  }
}
