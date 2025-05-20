import {BasePage} from "./base-page";
import {Page} from "playwright";

export class StudentManagementPage extends BasePage {

    //xpaths
    xSearchInput = "//input[@id='searchInput']"
    xFilterCriteria = "//select[@id='filterCriteria']"
    xSearchBtn = "//button[@id='searchButton']"
    xStudentTable = "//table[@id='studentTable']"
    xStudentTableBody = `${this.xStudentTable}/tbody`

    //locators
    searchInput = this.page.locator(this.xSearchInput)
    filterCriteria = this.page.locator(this.xFilterCriteria)
    searchBtn = this.page.locator(this.xSearchBtn)
    studentTableBody = this.page.locator(this.xStudentTableBody)

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
}