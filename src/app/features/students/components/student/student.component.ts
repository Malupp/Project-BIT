import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Router } from "@angular/router";
import { Student } from "../../models/student.class";

@Component({
  selector: "academy-student",
  templateUrl: "./student.component.html",
  styleUrls: ["./student.component.scss"],
})
export class StudentComponent {
  constructor(private readonly router: Router) {}
  @Input({ required: true }) student: Student | undefined;

  @Output() remove: EventEmitter<Student> = new EventEmitter<Student>();

  editStudent(): void {
    this.router.navigateByUrl(`/students/${this.student!.id}`);
  }
}
