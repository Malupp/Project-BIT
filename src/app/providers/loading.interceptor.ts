import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, finalize, tap } from 'rxjs';
import { UtilsService } from './utils.service';

interface RespondeModel<T> {
  data: T;
  errore: Error;
  message: string;
}

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  counter = 0;

  constructor(private readonly utils: UtilsService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // l'interceptor viene invocato prima che tutte le chiamate in uscita vengano effettivamente inviate
    // e anche prima che tutte le response in entrate vengano gestite
    // come aprire e chiudere il nostro spinner una volta sola anche se ci sono chiamate in parallelo attive?
    if (!this.counter) {
      this.utils.loading$.next(true);
    }

    this.counter++;

    return next.handle(req).pipe(
      finalize(() => {
        this.counter--;
        if (!this.counter) {
          this.utils.loading$.next(false);
        }
      })
    );
  }
}
