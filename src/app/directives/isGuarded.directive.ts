import { Directive, TemplateRef, ViewContainerRef } from "@angular/core";
import { LoginService } from "../login/services/login.service";
import { map } from "rxjs";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { Users } from "../login/models/users.interface";

@Directive({
  selector: "[isGuarded]",
  standalone: true,
})
export class isGuardedDirective {
  hasView: boolean = false;
  constructor(private readonly templateRef: TemplateRef<unknown>, private readonly viewContainer: ViewContainerRef, private readonly login: LoginService) {
    this.login.user$
      .pipe(
        map((user: Users | null) => user?.role === "ADMIN"),
        takeUntilDestroyed()
      )
      .subscribe({
        next: (isLogged: boolean) => {
          if (isLogged && !this.hasView) {
            this.viewContainer.createEmbeddedView(this.templateRef);
            this.hasView = true;
          } else if (!isLogged && this.hasView) {
            this.viewContainer.clear();
            this.hasView = false;
          }
        },
      });
  }
}
