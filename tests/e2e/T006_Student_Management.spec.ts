import {expect, test} from "../fixtures/test-fixture";
import {CsvUtils} from "../utils/csvUtils";
import fs from "fs";
import path from "node:path";

test.describe("Search student in Student management page", () => {
    const EXPORT_DIR = "./test-data/T006";

    test.beforeEach("Go to student management page", async ({studentManagementPage}) => {
        await studentManagementPage.openStudentManagementPage();
    })

    test.afterEach("Remove the test data", async () => {
        if (fs.existsSync(EXPORT_DIR)) {
            fs.rmSync(EXPORT_DIR, {recursive: true, force: true});
        }
    })

    test("Search student by class", async ({studentManagementPage}) => {
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

    test("Export and import the student data", async ({studentManagementPage}) => {
        const ORG_FILE_NAME = "01_original_student_list.csv";
        const REMOVED_FILE_NAME = "02_removed_students_file.csv";
        const ADDED_FILE_NAME = "03_added_students_file.csv";
        const orgFile = path.join(EXPORT_DIR, ORG_FILE_NAME);
        const removedFile = path.join(EXPORT_DIR, REMOVED_FILE_NAME);
        const addedFile = path.join(EXPORT_DIR, ADDED_FILE_NAME);

        const newStudents = [
            {
                no: "",
                fullname: "Nguyễn Văn Nam",
                class: "10A6",
                math_point: "8",
                physics_point: "8",
                chemistry_point: "8"
            },
            {
                no: "",
                fullname: "Trần Thị Nga",
                class: "10A6",
                math_point: "9",
                physics_point: "9",
                chemistry_point: "9"
            },
        ];

        await test.step("Export the student data", async () => {
            await studentManagementPage.exportStudentList(EXPORT_DIR, orgFile);
        })

        await test.step("Remove students in exported file", async () => {
            const existingStudentData = await CsvUtils.readFileContents(orgFile);
            const newStudentsList = CsvUtils.removeStudentsFromList(existingStudentData, "10A3");
            fs.writeFileSync(removedFile, newStudentsList.join('\n'));
        })

        await test.step("Add student into the file", async () => {
            const existingStudentData = await CsvUtils.readFileContents(removedFile);
            const newStudentsList = CsvUtils.addStudentsToList(existingStudentData, newStudents);
            fs.writeFileSync(addedFile, newStudentsList.join('\n'));
        })

        await test.step("Import the student data", async () => {
            await studentManagementPage.importStudentList(addedFile);
        })

        await test.step("Verify the new students", async () => {
            const studentNames = ['Nguyễn Văn A', 'Trần Thị B', 'Phạm Thị D', 'Hoàng Văn E', newStudents[0].fullname, newStudents[1].fullname];
            const allStudentBeInTable = await studentManagementPage.hasAllStudents(studentNames);
            expect(allStudentBeInTable).toBe(true)
        })
    })
})