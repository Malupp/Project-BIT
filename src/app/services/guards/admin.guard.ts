import { Injectable } from "@angular/core";
import { CanActivate, UrlTree } from "@angular/router";
import { Observable, map } from "rxjs";
import { LoginService } from "src/app/login/services/login.service";

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private readonly login: LoginService) {}

  canActivate(): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.login.user$.pipe(
      map((user) => {
        let admin = false;
        if (user?.role === "ADMIN") {
          admin = true;
          console.log("Accesso come Admin");
        } else {
          admin = false;
          console.log("Accesso come User");
        }
        return admin;
      })
    );
  }
}
