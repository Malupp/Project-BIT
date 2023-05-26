import { Component } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { STUDENTS } from "../features/students/data/students";
import { Router } from "@angular/router";
import { LoginService } from "./services/login.service";
import { User } from "./models/user.interface";
import { LoginForm } from "./models/user-form.interface";

@Component({
  selector: "academy-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
  standalone: true,
  imports: [ReactiveFormsModule],
})
export class LoginComponent {
  data: Array<User> = [
    ...STUDENTS.map((student) => ({
      username: student.surname.replaceAll(" ", "") + student.age.toString(),
      password: "12345",
    })),
  ];

  constructor(private readonly router: Router, private readonly loginService: LoginService) {}

  form: FormGroup<LoginForm> = new FormGroup({
    username: new FormControl<string>("", {
      nonNullable: true,
      validators: [Validators.required],
    }),
    password: new FormControl<string>("", {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  login() {
    console.log(this.form.value);
    if (this.data.some((el) => el.username.toLocaleLowerCase() === this.form?.value?.username?.toLocaleLowerCase() && el.password === this.form.value.password)) {
      alert("Accesso effettuato");
      this.loginService.setUser(this.form.value as User);
      this.router.navigateByUrl("count");
    } else {
      alert("Credenziali sbagliate");
    }
  }
}
