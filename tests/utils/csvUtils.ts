import fs from "fs";

export class CsvUtils {
    static readFileContents = async (filePath: string) => {
        const fileContents = fs.readFileSync(filePath, 'utf-8');
        return fileContents.split('\n')
            .map(line => line.split(','))
    }

    static reIndexTheList = (list: string[][]) => {
        list.forEach((line, index) => {
            //Exclude the header line
            if (index > 0) {
                line[0] = index.toString()
            }
        })
        return list;
    }

    static addStudentsToList = (studentList: string[][], newStudents: any[]) => {
        const newStudentList = [...studentList];

        newStudents.forEach(student => {
            const newStudent = [
                student.no,
                student.fullname,
                student.class,
                student.math_point,
                student.physics_point,
                student.chemistry_point
            ]
            newStudentList.push(newStudent);
        })
        return this.reIndexTheList(newStudentList);
    }

    static removeStudentsFromList = (studentList: string[][], filter: string) => {
        const newStudentList = studentList
            .filter(line => !line.includes(filter))
        return this.reIndexTheList(newStudentList);
    }
}