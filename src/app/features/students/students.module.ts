import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { StudentComponent } from "./components/student/student.component";
import { StudentFormComponent } from "./components/student-form/student-form.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { StudentService } from "./services/student.service";
import { StudentFacadeService } from "./services/student-facade.service";
import { StudentHobbiesComponent } from "./components/student-hobbies/student-hobbies.component";
import { StudentInfoComponent } from "./components/student-info/student-info.component";
import { StudentLanguageComponent } from "./components/student-language/student-language.component";
import { StudentsComponent } from "./components/students-page/students.component";
import { StudentRoutingModule } from "./students-routing.module";

@NgModule({
  declarations: [StudentComponent, StudentsComponent, StudentFormComponent, StudentHobbiesComponent, StudentInfoComponent, StudentLanguageComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, StudentRoutingModule],
  providers: [StudentService, StudentFacadeService],
})
export class StudentModule {}
