import { Component, OnInit } from '@angular/core';
import { UtilsService } from './providers/utils.service';
import { Observable, delay } from 'rxjs';
import { LoginService } from './services/login.service';

@Component({
  selector: 'academy-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  loading$: Observable<boolean>;
  constructor(
    private readonly utils: UtilsService,
    private readonly logoutService: LoginService
  ) {
    this.loading$ = this.utils.loading$.pipe(delay(100));
  }

  logout() {
    this.logoutService.logout();
  }
}
