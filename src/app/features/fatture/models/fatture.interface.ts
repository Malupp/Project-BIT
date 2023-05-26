import { Customer } from "../../customers/models/customers.interface";

export interface Fatture {
  idFattura: number;
  numero: number;
  importo: number;
  cliente: Customer;
}
