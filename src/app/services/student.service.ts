import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Student } from "../models/student.class";
import { StorageService } from "./storage.service";
import STUDENTS from "../components/data/students";

@Injectable({ providedIn: "root" })
export class StudentService {
  students$: BehaviorSubject<Array<Student> | null> = new BehaviorSubject<Array<Student> | null>(null);

  constructor(private readonly storageService: StorageService) {
    let students = this.storageService.getItem<Array<Student>>("students");
    this.setStudents(students ?? STUDENTS);
  }

  setStudents(students: Array<Student>) {
    this.storageService.setItem("students", students);
    this.students$.next(students);
  }

  postStudents(student: Student) {
    let storeStudent = this.students$.getValue();
    storeStudent?.push(student);
    this.setStudents(storeStudent!);
  }

  putStudents(student: Student) {
    let storeStudent = this.students$.getValue();
    storeStudent = storeStudent?.map((el) => (el.id === student.id ? student : el)) || [];
    this.setStudents(storeStudent!);
  }

  deleteStudents(id: string) {
    let storeStudent = this.students$.getValue();
    storeStudent = storeStudent?.filter((el) => el.id !== id) || [];
    this.setStudents(storeStudent!);
  }
}
