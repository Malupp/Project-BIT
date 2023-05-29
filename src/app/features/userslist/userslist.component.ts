import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Role, Users } from "src/app/login/models/users.interface";
import { RegisterService } from "src/app/register/services/register.service";

@Component({
  selector: "academy-userslist",
  templateUrl: "./userslist.component.html",
  styleUrls: ["./userslist.component.scss"],
})
export class UserslistComponent {
  users!: Array<Users>;
  newRole: Role = "USER";

  constructor(private readonly registerService: RegisterService, private readonly route: Router, private readonly access: ActivatedRoute) {
    this.registerService.users$.subscribe({
      next: (c) => {
        this.users = c;
      },
    });
  }
}
