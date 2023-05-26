import { Injectable } from "@angular/core";
import { UrlTree } from "@angular/router";
import { Observable, map } from "rxjs";
import { LoginService } from "../../login/services/login.service";

@Injectable()
export class LoggedGuard {
  constructor(private readonly login: LoginService) {}

  canActivate(): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.login.user$.pipe(
      map((user) => {
        console.log(!!user ? "Accesso eseguito" : "Non puoi accedere, fai login");
        return !!user;
      })
    );
  }
}
