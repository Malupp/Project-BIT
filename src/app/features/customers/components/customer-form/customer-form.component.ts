import { Component } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { Comune, Customer, Provincia } from "src/app/features/customers/models/customers.interface";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { catchError, combineLatestWith, concatMap, forkJoin, map, of, switchMap, tap } from "rxjs";
import { CustomerService } from "src/app/features/customers/providers/services/customer-http.service";
import { CustomerFacadeService } from "../../providers/services/customer.facade.service";
import { CustomerForm, TipoClienteOption, FormIndirizzo, FormComune, FormProvincia } from "../../models/customers-form.interface";

@Component({
  selector: "academy-customer-form",
  templateUrl: "./customer-form.component.html",
  styleUrls: ["./customer-form.component.scss"],
})
export class CustomerFormComponent {
  form!: FormGroup<CustomerForm>;
  comuni!: Array<Comune>;
  province!: Array<Provincia>;
  customers!: Array<Customer>;
  tipoClienteOption: TipoClienteOption[] = ["SRL", "SPA", "SAS", "SNC", "PA", ""];
  edit: boolean = false;
  constructor(private readonly customersService: CustomerService, private readonly route: ActivatedRoute, private readonly facadeService: CustomerFacadeService) {
    this.facadeService.comuni$
      .pipe(
        combineLatestWith(this.facadeService.province$),
        switchMap(([comuni, province]) => {
          if (comuni.length && province.length) {
            return of([comuni, province] as [Array<Comune>, Array<Provincia>]);
          } else {
            return forkJoin([this.customersService.getComuni(), this.customersService.getProvince()]).pipe(
              tap(([comuni, province]) => {
                this.facadeService.comuni$.next(comuni);
                this.facadeService.province$.next(province);
              })
            );
          }
        }),
        takeUntilDestroyed()
      )
      .subscribe({
        next: ([comuni, province]: [Array<Comune>, Array<Provincia>]) => {
          this.comuni = comuni;
          this.province = province;
        },
      });

    // concatMap
    this.route.paramMap
      .pipe(
        concatMap((paramMap: ParamMap) => {
          if (paramMap.has("id")) {
            const id = parseInt(paramMap.get("id")!);
            return this.customersService.getClienti().pipe(
              map((customers: Array<Customer>) => customers.find((c) => c.idCliente === id)),
              catchError((error: Error) => of(undefined))
            );
          } else {
            return of(undefined);
          }
        }),
        takeUntilDestroyed()
      )
      .subscribe({
        next: (customer: Customer | undefined) => {
          this.form = this.modifyForm(customer);
        },
      });
  }

  modifyForm(customer?: Customer): FormGroup<CustomerForm> {
    return new FormGroup<CustomerForm>({
      idCliente: new FormControl<number>(customer?.idCliente ?? 0, {
        nonNullable: true,
      }),
      ragioneSociale: new FormControl<string>(customer?.ragioneSociale ?? "", {
        nonNullable: true,
      }),
      partitaIva: new FormControl<string>(customer?.partitaIva ?? "", {
        nonNullable: true,
      }),
      tipoCliente: new FormControl<TipoClienteOption>(customer?.tipoCliente ?? "", {
        nonNullable: true,
      }),
      email: new FormControl<string>(customer?.email ?? "", {
        nonNullable: true,
      }),
      telefono: new FormControl<string>(customer?.telefono ?? "", {
        nonNullable: true,
      }),
      indirizzo: new FormGroup<FormIndirizzo>({
        idIndirizzo: new FormControl<number>(customer?.indirizzo.idIndirizzo ?? 0, { nonNullable: true }),
        via: new FormControl<string>(customer?.indirizzo.via ?? "", {
          nonNullable: true,
        }),
        civico: new FormControl<string>(customer?.indirizzo.civico ?? "", {
          nonNullable: true,
        }),
        comune: new FormGroup<FormComune>({
          idComune: new FormControl<number>(customer?.indirizzo.comune.idComune ?? 0, { nonNullable: true }),
          nome: new FormControl<string>(customer?.indirizzo.comune.nome ?? "", {
            nonNullable: true,
          }),
          provincia: new FormGroup<FormProvincia>({
            idProvincia: new FormControl<number>(customer?.indirizzo.comune.provincia.idProvincia ?? 0, { nonNullable: true }),
            sigla: new FormControl<string>(customer?.indirizzo.comune.provincia.sigla ?? "", { nonNullable: true }),
            nome: new FormControl<string>(customer?.indirizzo.comune.provincia.nome ?? "", { nonNullable: true }),
          }),
        }),
      }),
      fatturato: new FormControl<number>(0, { nonNullable: true }),
    });
  }

  getComune(): void {
    this.customersService.getComuni().subscribe({
      next: (comune) => {
        this.comuni = comune;
        console.log(this.comuni);
      },
    });
  }

  getProvince(): void {
    this.customersService.getProvince().subscribe({
      next: (provincia) => {
        this.province = provincia;
        console.log(this.province);
      },
    });
  }

  takeComune(e: any) {
    const comune = e.target.value;
    console.log(comune);
    const objComune = this.comuni.filter((el) => el.nome === comune)[0];
    console.log(objComune);
    this.form.controls.indirizzo.controls.comune.setValue(objComune);
  }

  saveCustomer() {
    console.log(this.form.value);
    this.customersService.postCliente(this.form.value as Required<Customer>).subscribe({ next: (c) => console.log(c) });
  }
}
