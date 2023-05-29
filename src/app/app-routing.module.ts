import { NgModule, inject } from "@angular/core";
import { CanActivateFn, RouterModule, Routes } from "@angular/router";
import { LoggedGuard } from "./services/guards/logged.guard";
import { CountComponent } from "./components/count/count.component";

const loggedIn: CanActivateFn = (route) => {
  return inject(LoggedGuard).canActivate();
};

// l'ordine delle rotte è fondamentale
const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  { path: "count", component: CountComponent },
  {
    path: "register",
    loadComponent: () => import("./register/register.component").then((c) => c.RegisterComponent),
  },
  {
    path: "login",
    loadComponent: () => import("./login/login.component").then((c) => c.LoginComponent),
  },
  {
    path: "userslist",
    loadChildren: () => import("./features/userslist/userslist.module").then((c) => c.CustomersModule),
    canActivate: [loggedIn],
  },
  {
    path: "clienti",
    loadChildren: () => import("./features/customers/customers.module").then((m) => m.CustomersModule),
    canActivate: [loggedIn],
  },
  {
    path: "fatture",
    loadChildren: () => import("./features/fatture/fatture.module").then((m) => m.FattureModule),
    canActivate: [loggedIn],
  },
  {
    path: "students",
    loadChildren: () => import("./features/students/students.module").then((m) => m.StudentModule),
    canActivate: [loggedIn],
  },

  // default route dopo le rotte non ha bisogno del pathMatch ma bisogna fare attenzione con le wildcard
  // { path: '', redirectTo: 'login' },
  // wildcard sempre per ultima
  // { path: '**', component: RouteNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { bindToComponentInputs: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
