import {expect, test} from "../fixtures/test-fixture";

test.describe("Search student in Student management page", () => {
    test("Search student by class", async ({studentManagementPage}) => {
        await test.step("Go to student management page", async () => {
            await studentManagementPage.openStudentManagementPage();
        })

        await test.step("Search student by class filter", async () => {
            await studentManagementPage.searchBy('class', '10A4');
        })

        await test.step("Verify results table", async () => {
            const hasStudent = await studentManagementPage.hasStudent('Phạm Thị D');
            expect(hasStudent).toBe(true)
        })

        await test.step("Search all students", async () => {
            await studentManagementPage.searchBy('class', '');
        })

        await test.step("Verify results table", async () => {
            const studentNames = ['Nguyễn Văn A', 'Trần Thị B', 'Lê Văn C', 'Phạm Thị D', 'Hoàng Văn E'];

            const allStudentBeInTable = await studentManagementPage.hasAllStudents(studentNames);
            expect(allStudentBeInTable).toBe(true)
        })
    })
})