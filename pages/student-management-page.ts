import {BasePage} from "./base-page";
import {Page} from "playwright";
import fs from "fs";

export class StudentManagementPage extends BasePage {

    //xpaths
    xSearchInput = "//input[@id='searchInput']"
    xFilterCriteria = "//select[@id='filterCriteria']"
    xSearchBtn = "//button[@id='searchButton']"
    xStudentTable = "//table[@id='studentTable']"
    xStudentTableBody = `${this.xStudentTable}/tbody`
    xExportBtn = "//button[@id='exportButton']"
    xImportBtn = "//button[@id='importButton']"

    //locators
    searchInput = this.page.locator(this.xSearchInput)
    filterCriteria = this.page.locator(this.xFilterCriteria)
    searchBtn = this.page.locator(this.xSearchBtn)
    studentTableBody = this.page.locator(this.xStudentTableBody)
    exportBtn = this.page.locator(this.xExportBtn)
    importBtn = this.page.locator(this.xImportBtn)

    constructor(page: Page) {
        super(page);
    }

    //functions
    openStudentManagementPage = async () => {
        await this.openMainPage();
        await this.goToPage("Xử lý import, export");
    }

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
    }

    searchBy = async (filter: string, input: string) => {
        await this.applyFilter(filter);
        await this.searchInput.fill(input);
        await this.searchBtn.click();
        await this.page.waitForTimeout(1000);
    }

    hasStudent = async (studentName: string) => {
        const matchingStudent = this.studentTableBody.filter({hasText: studentName});
        // const matchingStudent = this.studentTableBody.getByRole('cell', {name: studentName});
        return await matchingStudent.isVisible();
    }

    hasAllStudents = async (studentNames: string[]) => {
        for (const studentName of studentNames) {
            const hasStudent = await this.hasStudent(studentName);
            if (!hasStudent) {
                return false;
            }
        }
        return true;
    }

    exportStudentList = async (exportDir: string = "./test-data", filePath: string) => {
        if (!fs.existsSync(exportDir)) {
            fs.mkdirSync(exportDir, {recursive: true});
        }

        const downloadPromise = this.page.waitForEvent('download');
        await this.exportBtn.click();
        const download = await downloadPromise;

        // Wait for the download process to complete and save the downloaded file somewhere.
        await download.saveAs(filePath);
    }

    importStudentList = async (filePath: string) => {
        // Start waiting for file chooser before clicking. Note no await.
        const fileChooserPromise = this.page.waitForEvent('filechooser');
        await this.importBtn.click();
        const fileChooser = await fileChooserPromise;
        await fileChooser.setFiles(filePath);
    }
}