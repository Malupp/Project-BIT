import { Component } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";

import { catchError, concatMap, map, of } from "rxjs";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { FattureForm } from "src/app/features/fatture/models/fatture-form.interface";

import { CustomerService } from "src/app/features/customers/providers/services/customer-http.service";
import { FattureService } from "src/app/features/fatture/services/fatture.service";
import { Customer } from "src/app/features/customers/models/customers.interface";
import { CustomerForm, TipoClienteOption, FormIndirizzo, FormComune, FormProvincia } from "src/app/features/customers/models/customers-form.interface";
import { Fatture } from "../../models/fatture.interface";

@Component({
  selector: "academy-fatture-form",
  templateUrl: "./fatture-form.component.html",
  styleUrls: ["./fatture-form.component.scss"],
})
export class FattureFormComponent {
  form!: FormGroup<FattureForm>;
  clienti!: Array<Customer>;
  constructor(private readonly route: ActivatedRoute, private readonly fattureService: FattureService, private readonly customerService: CustomerService) {
    this.customerService.getClienti().subscribe({ next: (clienti) => (this.clienti = clienti) });

    this.route.paramMap
      .pipe(
        concatMap((paramMap: ParamMap) => {
          if (paramMap.has("id")) {
            const id = parseInt(paramMap.get("id")!);
            return this.fattureService.getFatture().pipe(
              map((fatture: Array<Fatture>) => fatture.find((c) => c.idFattura === id)),
              catchError((error: Error) => of(undefined))
            );
          } else {
            return of(undefined);
          }
        }),
        takeUntilDestroyed()
      )
      .subscribe({
        next: (fattura: Fatture | undefined) => {
          this.form = this.createForm(fattura);
        },
      });
  }

  createForm(fattura?: Fatture): FormGroup<FattureForm> {
    return new FormGroup<FattureForm>({
      idFattura: new FormControl<number>(fattura?.idFattura ?? 0, {
        nonNullable: true,
      }),
      numero: new FormControl<number>(fattura?.numero ?? 0, {
        nonNullable: true,
      }),
      importo: new FormControl<number>(fattura?.importo ?? 0, {
        nonNullable: true,
      }),
      cliente: new FormGroup<CustomerForm>({
        idCliente: new FormControl<number>(fattura?.cliente.idCliente ?? 0, {
          nonNullable: true,
        }),
        ragioneSociale: new FormControl<string>(fattura?.cliente.ragioneSociale ?? "", { nonNullable: true }),
        partitaIva: new FormControl<string>(fattura?.cliente.partitaIva ?? "", {
          nonNullable: true,
        }),
        tipoCliente: new FormControl<TipoClienteOption>(fattura?.cliente.tipoCliente ?? "", {
          nonNullable: true,
        }),
        email: new FormControl<string>(fattura?.cliente.email ?? "", {
          nonNullable: true,
        }),
        telefono: new FormControl<string>(fattura?.cliente.telefono ?? "", {
          nonNullable: true,
        }),
        indirizzo: new FormGroup<FormIndirizzo>({
          idIndirizzo: new FormControl<number>(fattura?.cliente.indirizzo.idIndirizzo ?? 0, { nonNullable: true }),
          via: new FormControl<string>(fattura?.cliente.indirizzo.via ?? "", {
            nonNullable: true,
          }),
          civico: new FormControl<string>(fattura?.cliente.indirizzo.civico ?? "", { nonNullable: true }),
          comune: new FormGroup<FormComune>({
            idComune: new FormControl<number>(fattura?.cliente.indirizzo.comune.idComune ?? 0, { nonNullable: true }),
            nome: new FormControl<string>(fattura?.cliente.indirizzo.comune.nome ?? "", { nonNullable: true }),
            provincia: new FormGroup<FormProvincia>({
              idProvincia: new FormControl<number>(fattura?.cliente.indirizzo.comune.provincia.idProvincia ?? 0, { nonNullable: true }),
              sigla: new FormControl<string>(fattura?.cliente.indirizzo.comune.provincia.sigla ?? "", { nonNullable: true }),
              nome: new FormControl<string>(fattura?.cliente.indirizzo.comune.provincia.nome ?? "", { nonNullable: true }),
            }),
          }),
        }),
        fatturato: new FormControl<number>(0, { nonNullable: true }),
      }),
    });
  }

  selectClient(e: any) {
    const client = this.clienti.find((c) => c.ragioneSociale === e.target.value);
    this.form.controls.cliente.setValue(client!);
  }

  saveFattura() {
    console.log(this.form.value);
    this.fattureService.postFattura(this.form.value as Required<Fatture>).subscribe({ next: (c) => console.log(c) });
  }
}
