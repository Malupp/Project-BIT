import { Customer } from './customers.interface';

export interface Fatture {
  idFattura: number;
  numero: number;
  importo: number;
  cliente: Customer;
}
