import { FormControl } from "@angular/forms";

export interface RegisterForm {
  username: FormControl<string>;
  password: FormControl<string>;
  confermaPassword: FormControl<string>;
  email: FormControl<string>;
  confermaEmail: FormControl<string>;
}

export interface UpdateForm {
  role: FormControl<string>;
}
