import { BasePage } from './base-page';
import { Locator, Page } from 'playwright';
import fs from 'fs';

export class StudentManagementPage extends BasePage {
  // Private selector strings
  private readonly xSearchInput = "//input[@id='searchInput']";
  private readonly xFilterCriteria = "//select[@id='filterCriteria']";
  private readonly xSearchBtn = "//button[@id='searchButton']";
  private readonly xStudentTable = "//table[@id='studentTable']";
  private readonly xExportBtn = "//button[@id='exportButton']";
  private readonly xImportBtn = "//button[@id='importButton']";

  // Public locators (or make these private too)
  readonly searchInput: Locator;
  readonly filterCriteria: Locator;
  readonly searchBtn: Locator;
  readonly studentTableBody: Locator;
  readonly exportBtn: Locator;
  readonly importBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.searchInput = this.page.locator(this.xSearchInput);
    this.filterCriteria = this.page.locator(this.xFilterCriteria);
    this.searchBtn = this.page.locator(this.xSearchBtn);
    this.studentTableBody = this.page.locator(`${this.xStudentTable}/tbody`);
    this.exportBtn = this.page.locator(this.xExportBtn);
    this.importBtn = this.page.locator(this.xImportBtn);
  }

  //functions
  openStudentManagementPage = async () => {
    await this.openMainPage();
    await this.goToPage('Xử lý import, export');
  };

  applyFilter = async (filterCriteria: string) => {
    switch (filterCriteria) {
      case 'name':
        await this.filterCriteria.selectOption('ten');
        break;
      case 'class':
        await this.filterCriteria.selectOption('lop');
        break;
      case 'mathematics score':
        await this.filterCriteria.selectOption('toan');
        break;
      case 'physics score':
        await this.filterCriteria.selectOption('ly');
        break;
      case 'chemistry score':
        await this.filterCriteria.selectOption('hoa');
        break;
    }
  };

  searchBy = async (filter: string, input: string) => {
    await this.applyFilter(filter);
    await this.searchInput.fill(input);
    await this.searchBtn.click();
    await this.page.waitForTimeout(1000);
  };

  hasStudent = async (studentName: string) => {
    const matchingStudent = this.studentTableBody.filter({ hasText: studentName });
    // const matchingStudent = this.studentTableBody.getByRole('cell', {name: studentName});
    return await matchingStudent.isVisible();
  };

  hasAllStudents = async (studentNames: string[]) => {
    for (const studentName of studentNames) {
      const hasStudent = await this.hasStudent(studentName);
      if (!hasStudent) {
        return false;
      }
    }
    return true;
  };

  exportStudentList = async (exportDir: string = './test-data', filePath: string) => {
    if (!fs.existsSync(exportDir)) {
      fs.mkdirSync(exportDir, { recursive: true });
    }

    const downloadPromise = this.page.waitForEvent('download');
    await this.exportBtn.click();
    const download = await downloadPromise;

    // Wait for the download process to complete and save the downloaded file somewhere.
    await download.saveAs(filePath);
  };

  importStudentList = async (filePath: string) => {
    // Start waiting for file chooser before clicking. Note no await.
    const fileChooserPromise = this.page.waitForEvent('filechooser');
    await this.importBtn.click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(filePath);
  };
}
