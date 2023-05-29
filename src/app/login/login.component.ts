import { Component } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { STUDENTS } from "../features/students/data/students";
import { Router } from "@angular/router";
import { LoginService } from "./services/login.service";
import { User } from "./models/user.interface";
import { LoginForm } from "./models/user-form.interface";
import { Users } from "./models/users.interface";
import { RegisterService } from "../register/services/register.service";

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

  users!: Array<Users>;

  constructor(private readonly router: Router, private readonly registerService: RegisterService, private readonly loginService: LoginService) {
    this.registerService.users$.subscribe({
      next: (c) => {
        this.users = c;
      },
    });
  }

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
    const user = this.users?.find((el) => el.username.toLocaleLowerCase() === this.form?.value.username?.toLocaleLowerCase() && el.password === this.form.value.password);
    console.log(this.form.value);
    if (user) {
      alert("Login effettuato con successo");
      this.loginService.setUser(user);
      this.router.navigateByUrl("students");
    } else {
      alert("Credenziali sbagliate");
    }

    // if (this.data.some((el) => el.username.toLocaleLowerCase() === this.form?.value?.username?.toLocaleLowerCase() && el.password === this.form.value.password)) {
    //   alert("Accesso effettuato");
    //   this.loginService.setUser(this.form.value as User);
    //   this.router.navigateByUrl("count");
    // } else {
    //   alert("Credenziali sbagliate");
    // }
  }

  register() {
    this.router.navigateByUrl("/register");
  }
}
