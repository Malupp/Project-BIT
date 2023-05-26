import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Fatture } from '../models/fatture.interface';
import { Customer } from '../models/customers.interface';

@Injectable({ providedIn: 'root' })
export class FattureService {
  constructor(private readonly http: HttpClient) {}

  getFatture(): Observable<Array<Fatture>> {
    return this.http.get<Array<Fatture>>(
      `${environment.api_url}/fattura/getallfatture`,
      {}
    );
  }

  getFattureByCliente(customer: Customer): Observable<Array<Fatture>> {
    return this.http.post<Array<Fatture>>(
      `${environment.api_url}/fattura/getbycliente`,
      customer
    );
  }

  getFattureByRange(min: number, max: number): Observable<Array<Fatture>> {
    return this.http.get<Array<Fatture>>(
      `${environment.api_url}/fattura/getfatturebyimporto/${min}/${max}`,
      {}
    );
  }

  postFattura(fattura: Fatture): Observable<Array<Fatture>> {
    return this.http.post<Array<Fatture>>(
      `${environment.api_url}/fattura/postfattura`,
      fattura
    );
  }

  updateFattura(fattura: Fatture): Observable<Array<Fatture>> {
    return this.http.post<Array<Fatture>>(
      `${environment.api_url}/fattura/postfattura`,
      fattura
    );
  }

  deleteFattura(id: number) {
    return this.http.delete(
      `${environment.api_url}/fattura/deletefattura/${id}`
    );
  }
}
