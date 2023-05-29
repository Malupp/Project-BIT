import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Role, Users } from "src/app/login/models/users.interface";
import { StorageService } from "src/app/services/storage.service";

@Injectable({ providedIn: "root" })
export class RegisterService {
  users$: BehaviorSubject<Array<Users>> = new BehaviorSubject<Array<Users>>([]);

  constructor(private readonly storageService: StorageService) {
    let storedUsers = this.storageService.getItem<Array<Users>>("registeredUsers");
    if (storedUsers) {
      this.users$.next(storedUsers);
    }
  }

  registerUser(user: Users) {
    const users = this.users$.getValue();
    users.push(user);
    this.users$.next(users);
    this.storageService.setItem<Array<Users>>("registeredUsers", this.users$.getValue());
  }

  setUser(users: Array<Users>) {
    this.users$.next(users);
    this.storageService.setItem("registeredUsers", users);
  }

  edit(id: string, ruolo: Role) {
    const users = this.users$.getValue();
    users?.map((el) => (el.id === id ? (el.role = ruolo) : (el.role = el.role)));
    this.setUser(users);
  }
}
