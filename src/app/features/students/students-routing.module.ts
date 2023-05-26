import { RouterModule, Routes } from "@angular/router";
import { StudentFormComponent } from "./components/student-form/student-form.component";
import { NgModule } from "@angular/core";
import { StudentsComponent } from "./components/students-page/students.component";

const routes: Routes = [
  { path: "", component: StudentsComponent },
  { path: "new-student", component: StudentFormComponent },
  { path: ":id", component: StudentFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentRoutingModule {}
