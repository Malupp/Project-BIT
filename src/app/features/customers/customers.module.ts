import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CustomersComponent } from "./customers.component";
import { CustomerFormComponent } from "./components/customer-form/customer-form.component";
import { CustomerService } from "./providers/services/customer-http.service";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CustomerAddressPipe } from "./providers/pipes/customer-address.pipe";
import { CustomerFacadeService } from "./providers/services/customer.facade.service";
import { CustomersRoutingModule } from "./customers-routing.module";

@NgModule({
  declarations: [CustomersComponent, CustomerFormComponent, CustomerAddressPipe],
  imports: [CommonModule, CustomersRoutingModule, FormsModule, ReactiveFormsModule],
  providers: [CustomerService, CustomerFacadeService],
})
export class CustomersModule {}
