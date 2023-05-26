import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'academy-count',
  templateUrl: './count.component.html',
  styleUrls: ['./count.component.scss'],
})
export class CountComponent {
  count = 0;

  onIncrement() {
    if (this.count < 10) {
      this.count += 1;
    }
  }

  onDecrement() {
    if (this.count > 0) {
      this.count -= 1;
    }
  }
}
