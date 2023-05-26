import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Comune, Customer, Provincia } from '../models/customers.interface';

@Injectable({ providedIn: 'root' })
export class CustomerService {
  constructor(private readonly http: HttpClient) {}

  getClienti(): Observable<Array<Customer>> {
    return this.http.get<Array<Customer>>(
      `${environment.api_url}/cliente/getclienti`,
      {}
    );
  }

  getByAmount(amount: number): Observable<Array<Customer>> {
    return this.http.get<Array<Customer>>(
      `${environment.api_url}/cliente/getclientebyfatturato/${amount}`,
      {}
    );
  }
  getByName(name: string): Observable<Array<Customer>> {
    return this.http.get<Array<Customer>>(
      `${environment.api_url}/cliente/getclientebyragionesociale/${name}`,
      {}
    );
  }

  getComuni(): Observable<Array<Comune>> {
    return this.http.get<Array<Comune>>(
      `${environment.api_url}/comune/getcomuni`,
      {}
    );
  }
  getProvince(): Observable<Array<Provincia>> {
    return this.http.get<Array<Provincia>>(
      `${environment.api_url}/provincia/getprovince`,
      {}
    );
  }

  postCliente(customer: Customer) {
    return this.http.post<Customer>(
      `${environment.api_url}/cliente/postcliente`,
      customer
    );
  }

  deleteCliente(id: number) {
    return this.http.delete(
      `${environment.api_url}/cliente/deletecliente/${id}`
    );
  }
}
