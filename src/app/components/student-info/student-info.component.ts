import { Component, Input } from '@angular/core';

@Component({
  selector: 'academy-student-info',
  templateUrl: './student-info.component.html',
  styleUrls: ['./student-info.component.scss'],
})
export class StudentInfoComponent {
  @Input() name: string | undefined;
  @Input() surname: string | undefined;
  @Input() age: number | undefined;
}
