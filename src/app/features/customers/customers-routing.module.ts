import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CustomersComponent } from "./customers.component";
import { CustomerFormComponent } from "./components/customer-form/customer-form.component";

const routes: Routes = [
  { path: "", component: CustomersComponent },
  { path: "inserireCliente", component: CustomerFormComponent },
  { path: "modificaCliente/:id", component: CustomerFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomersRoutingModule {}
