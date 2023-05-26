import { Component } from "@angular/core";
import { Student } from "src/app/models/student.class";
import STUDENTS from "../data/students";
import { Router } from "@angular/router";
import { StudentService } from "src/app/services/student.service";

@Component({
  selector: "academy-students",
  templateUrl: "./students.component.html",
  styleUrls: ["./students.component.scss"],
})
export class StudentsComponent {
  students: Array<Student> | null = null;

  constructor(private readonly router: Router, private readonly studentService: StudentService) {
    this.students = this.studentService.students$.getValue();
  }

  addStudent() {
    this.router.navigateByUrl("new-student");
  }

  fill() {
    this.students = structuredClone(STUDENTS.sort((a, b) => a.age - b.age));
  }

  empty() {
    this.students = [];
  }

  remove(student: Student): void {
    this.studentService.deleteStudents(student.id);
    this.students = this.studentService.students$.getValue();
    console.log("santino dove sei");
  }
}
