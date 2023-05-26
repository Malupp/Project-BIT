import { Component, OnInit } from "@angular/core";
import { Customer } from "src/app/features/customers/models/customers.interface";
import { CustomerService } from "src/app/features/customers/providers/services/customer-http.service";

@Component({
  selector: "academy-customers",
  templateUrl: "./customers.component.html",
  styleUrls: ["./customers.component.scss"],
})
export class CustomersComponent {
  customers!: Array<Customer>;
  constructor(private readonly customersService: CustomerService) {
    this.getClienti();
  }

  name: string = "";
  amount: number = 0;

  getClienti(): void {
    this.customersService.getClienti().subscribe({
      next: (customers) => (this.customers = customers),
    });
  }
  getByAmount(amount: number): void {
    this.customersService.getByAmount(amount).subscribe({
      next: (customers) => (this.customers = customers),
    });
  }

  getByName(name: string): void {
    this.customersService.getByName(name).subscribe({
      next: (customers) => (this.customers = customers),
    });
  }

  deleteCustomer(id: number) {
    console.log(id);
    this.customersService.deleteCliente(id).subscribe({
      next: () => {
        console.log("cancellazione eseguita con successo");
        this.getClienti();
      },
    });
  }
}
