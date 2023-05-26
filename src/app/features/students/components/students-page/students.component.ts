import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { StudentService } from "src/app/features/students/services/student.service";
import { Student } from "../../models/student.class";
import { STUDENTS } from "../../data/students";

@Component({
  selector: "academy-students",
  templateUrl: "./students.component.html",
  styleUrls: ["./students.component.scss"],
})
export class StudentsComponent {
  students: Array<Student> | null = null;

  constructor(private readonly router: Router, private readonly studentService: StudentService) {
    // this.students = this.studentService.students$.getValue();
    this.studentService.students$.subscribe({
      next: (c) => {
        this.students = c;
      },
    });
  }

  addStudent() {
    this.router.navigateByUrl("/students/new-student");
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
