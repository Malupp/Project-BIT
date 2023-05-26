import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/customers.interface';
import { Fatture } from 'src/app/models/fatture.interface';
import { FattureService } from 'src/app/services/fatture.service';

@Component({
  selector: 'academy-fatture',
  templateUrl: './fatture.component.html',
  styleUrls: ['./fatture.component.scss'],
})
export class FattureComponent implements OnInit {
  fatture!: Array<Fatture>;
  constructor(private readonly fattureService: FattureService) {}

  min: number = 0;
  max: number = 0;

  ngOnInit(): void {
    this.fattureService.getFatture().subscribe({
      next: (fattura) => (this.fatture = fattura),
    });
  }

  getFatture(): void {
    this.fattureService.getFatture().subscribe({
      next: (fattura) => (this.fatture = fattura),
    });
  }

  getFattureByCliente(customer: Customer) {
    this.fattureService.getFattureByCliente(customer).subscribe({
      next: (fattura) => (this.fatture = fattura),
    });
  }

  getFattureByRange(min: number, max: number): void {
    this.fattureService.getFattureByRange(min, max).subscribe({
      next: (fattura) => (this.fatture = fattura),
    });
  }

  updateFattura(fattura: Fatture): void {
    this.fattureService.postFattura(fattura).subscribe({
      next: (fattura) => (this.fatture = fattura),
    });
  }

  deleteFattura(id: number): void {
    this.fattureService.deleteFattura(id).subscribe({
      next: (id) => {
        console.log(id);
        this.getFatture();
      },
    });
  }
}
