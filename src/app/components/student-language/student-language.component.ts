import { Component, Input } from '@angular/core';
import { Language } from 'src/app/models/student.class';

@Component({
  selector: 'academy-student-language',
  templateUrl: './student-language.component.html',
  styleUrls: ['./student-language.component.scss'],
})
export class StudentLanguageComponent {
  @Input() languages: Array<Language> | undefined;
}
