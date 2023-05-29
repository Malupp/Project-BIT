import { Component, Input } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Role } from "src/app/login/models/users.interface";
import { UpdateForm } from "src/app/register/models/register-form.interface";
import { RegisterService } from "src/app/register/services/register.service";

@Component({
  selector: "academy-popuprole",
  templateUrl: "./popuprole.component.html",
  styleUrls: ["./popuprole.component.scss"],
})
export class PopuproleComponent {
  @Input() id!: string;
  form: FormGroup<UpdateForm> = new FormGroup<UpdateForm>({ role: new FormControl<Role>("USER", { nonNullable: true }) });
  constructor(private readonly registerService: RegisterService) {}

  editRole() {
    console.log(this.form.value.role);
    this.registerService.edit(this.id, this.form.value.role as Role);
  }
}
