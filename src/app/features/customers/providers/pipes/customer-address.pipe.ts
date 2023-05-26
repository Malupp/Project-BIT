import { Pipe, PipeTransform } from "@angular/core";
import { Indirizzo } from "src/app/features/customers/models/customers.interface";

@Pipe({ name: "customerAddress" })
export class CustomerAddressPipe implements PipeTransform {
  transform(value: Indirizzo): string {
    if (value && value.via && value.civico && value.comune && value.comune.nome && value.comune.provincia && value.comune.provincia.sigla) {
      return `${value.via} ${value.civico} ${value.comune.nome} ${value.comune.provincia.sigla}`;
    } else {
      return "";
    }
  }
}
