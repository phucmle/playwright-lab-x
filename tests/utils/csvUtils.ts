import fs from 'fs';

export class CsvUtils {
  public static readFileContents = async (filePath: string) => {
    const fileContents = fs.readFileSync(filePath, 'utf-8');
    return fileContents.split('\n').map((line) => line.split(','));
  };

  public static reIndexTheList = (list: string[][]) => {
    list.forEach((line, index) => {
      //Exclude the header line
      if (index > 0) {
        line[0] = index.toString();
      }
    });
    return list;
  };

  public static addStudentsToList = (studentList: string[][], newStudents: INewStudent[]) => {
    const newStudentList = [...studentList];

    newStudents.forEach((student) => {
      const newStudent = [
        student.no,
        student.fullname,
        student.class,
        student.math_point,
        student.physics_point,
        student.chemistry_point,
      ];
      newStudentList.push(newStudent);
    });
    return this.reIndexTheList(newStudentList);
  };

  public static removeStudentsFromList = (studentList: string[][], filter: string) => {
    const newStudentList = studentList.filter((line) => !line.includes(filter));
    return this.reIndexTheList(newStudentList);
  };
}

interface INewStudent {
  no: string;
  fullname: string;
  class: string;
  math_point: string;
  physics_point: string;
  chemistry_point: string;
}
