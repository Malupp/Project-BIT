import { NgModule, inject } from '@angular/core';
import { CanActivateFn, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { StudentFormComponent } from './components/student-form/student-form.component';
import { StudentsComponent } from './components/students/students.component';
import { CustomersComponent } from './features/customers/customers.component';
import { FattureComponent } from './features/fatture/fatture.component';
import { CustomerFormComponent } from './features/customers/components/customer-form/customer-form.component';
import { FattureFormComponent } from './features/fatture/components/fatture-form/fatture-form.component';
import { LoggedGuard } from './services/guards/logged.guard';
import { CountComponent } from './components/count/count.component';

const loggedIn: CanActivateFn = (route) => {
  return inject(LoggedGuard).canActivate();
};

// l'ordine delle rotte è fondamentale
const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'count', component: CountComponent },
  { path: 'login', component: LoginComponent },
  { path: 'students', component: StudentsComponent, canActivate: [loggedIn] },
  { path: 'students/:id', component: StudentFormComponent },
  { path: 'new-student', component: StudentFormComponent },
  { path: 'customers', component: CustomersComponent },
  { path: 'customer-form', component: CustomerFormComponent },
  { path: 'customers/:id', component: CustomerFormComponent },
  { path: 'fatture', component: FattureComponent },
  { path: 'fatture-form', component: FattureFormComponent },
  { path: 'fatture-form/:id', component: FattureFormComponent },

  // default route dopo le rotte non ha bisogno del pathMatch ma bisogna fare attenzione con le wildcard
  // { path: '', redirectTo: 'login' },
  // wildcard sempre per ultima
  // { path: '**', component: RouteNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
