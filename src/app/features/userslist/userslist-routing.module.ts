import { NgModule, inject } from "@angular/core";
import { CanActivateFn, RouterModule, Routes } from "@angular/router";
import { UserslistComponent } from "./userslist.component";
import { PopuproleComponent } from "./components/popuprole/popuprole.component";
import { AdminGuard } from "src/app/services/guards/admin.guard";

const registerIn: CanActivateFn = (route) => {
  return inject(AdminGuard).canActivate();
};

const routes: Routes = [
  { path: "", component: UserslistComponent, canActivate: [registerIn] },
  { path: "modificaUtente/:id", component: PopuproleComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersListRoutingModule {}
