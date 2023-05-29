import { Component } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { RegisterForm } from "./models/register-form.interface";
import { Router } from "@angular/router";
import { RegisterService } from "./services/register.service";
import { Users } from "../login/models/users.interface";
import * as uuid from "uuid";

@Component({
  selector: "academy-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
  standalone: true,
  imports: [ReactiveFormsModule],
})
export class RegisterComponent {
  users!: Array<Users>;
  constructor(private readonly router: Router, private readonly registerService: RegisterService) {
    this.registerService.users$.subscribe({
      next: (c) => {
        this.users = c;
      },
    });
  }

  form: FormGroup<RegisterForm> = new FormGroup({
    username: new FormControl<string>("", {
      nonNullable: true,
      validators: [Validators.required],
    }),
    password: new FormControl<string>("", {
      nonNullable: true,
      validators: [Validators.required],
    }),
    confermaPassword: new FormControl<string>("", {
      nonNullable: true,
      validators: [Validators.required],
    }),
    email: new FormControl<string>("", {
      nonNullable: true,
      validators: [Validators.required],
    }),
    confermaEmail: new FormControl<string>("", {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  login() {
    this.router.navigateByUrl("/login");
  }

  registerUser(): void {
    const objUser = {
      id: uuid.v4(),
      username: this.form?.value.username,
      password: this.form?.value.password,
      email: this.form?.value.email,
      creationDate: new Date(),
      role: "USER",
    };

    if (this.users?.some((el) => el.email === this.form?.value.email)) {
      alert("Email già in uso");
    } else if (this.users?.some((el) => el.username === this.form?.value.username)) {
      alert("Username già in uso");
    } else {
      this.registerService.registerUser(objUser as Users);
    }
    this.router.navigateByUrl("/login");
  }
}
