import { FormControl, FormGroup } from "@angular/forms";
import { CustomerForm } from "../../customers/models/customers-form.interface";

export interface FattureForm {
  idFattura?: FormControl<number>;
  numero: FormControl<number>;
  importo: FormControl<number>;
  cliente: FormGroup<CustomerForm>;
}
