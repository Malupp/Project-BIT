import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatToolbarModule } from "@angular/material/toolbar";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CountComponent } from "./components/count/count.component";
import { LoadingInterceptor } from "./providers/loading.interceptor";
import { DelayInterceptor } from "./providers/delay.interceptor";
import { LoggedGuard } from "./services/guards/logged.guard";
import { isLoggedDirective } from "./directives/isLogged.directive";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { AdminGuard } from "./services/guards/admin.guard";
import { isGuardedDirective } from "./directives/isGuarded.directive";

@NgModule({
  declarations: [AppComponent, CountComponent, NavbarComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, MatProgressSpinnerModule, MatToolbarModule, isLoggedDirective, isGuardedDirective, BrowserAnimationsModule],
  providers: [
    // L'ORDINE DEGLI INTERCEPTOR è FONDAMENTALE
    // provide DI tokens
    LoggedGuard,
    AdminGuard,
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: DelayInterceptor, multi: true },
    // Auth Key interceptor
    // notification popup interceptor
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
