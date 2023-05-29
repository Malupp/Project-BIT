import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "academy-count",
  templateUrl: "./count.component.html",
  styleUrls: ["./count.component.scss"],
})
export class CountComponent {
  count = 0;
  timeoutId: any;

  startAutoCounter() {
    this.onIncrement();
  }

  onIncrement() {
    if (this.count < 10) {
      this.count += 1;
      this.timeoutId = setTimeout(() => {
        this.onIncrement();
      }, 100);
    }
  }

  onDecrement() {
    if (this.count > 0) {
      this.count = 0;
    }
  }
}
