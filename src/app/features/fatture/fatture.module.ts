import { NgModule } from "@angular/core";
import { FattureComponent } from "./fatture.component";
import { FattureFormComponent } from "./components/fatture-form/fatture-form.component";
import { CommonModule } from "@angular/common";
import { FattureRoutingModule } from "./fatture-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FattureService } from "src/app/features/fatture/services/fatture.service";
import { CustomerService } from "../customers/providers/services/customer-http.service";

@NgModule({
  declarations: [FattureComponent, FattureFormComponent],
  imports: [CommonModule, FattureRoutingModule, FormsModule, ReactiveFormsModule],
  providers: [FattureService, CustomerService],
})
export class FattureModule {}
