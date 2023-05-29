import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { User } from "../models/user.interface";
import { StorageService } from "../../services/storage.service";
import { Router } from "@angular/router";
import { Users } from "../models/users.interface";

@Injectable({ providedIn: "root" })
export class LoginService {
  user$: BehaviorSubject<Users | null> = new BehaviorSubject<Users | null>(null);
  constructor(private readonly storage: StorageService, private readonly router: Router) {
    const user = this.storage.getItem<Users>("academy_logged_user");
    if (user) {
      this.setUser(user);
    }
  }

  setUser(user: Users): void {
    this.user$.next(user);
    this.storage.setItem("academy_logged_user", user);
  }

  logout(): void {
    this.user$.next(null);
    this.storage.removeItem("academy_logged_user");
    this.router.navigateByUrl("/login");
  }
}
