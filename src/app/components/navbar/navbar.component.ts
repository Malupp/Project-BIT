import { Component } from "@angular/core";
import { LoginService } from "src/app/login/services/login.service";

@Component({
  selector: "academy-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent {
  constructor(private readonly logoutService: LoginService) {}

  logout() {
    this.logoutService.logout();
  }
}
