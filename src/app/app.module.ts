import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StudentsComponent } from './components/students/students.component';
import { StudentComponent } from './components/student/student.component';
import { StudentHobbiesComponent } from './components/student-hobbies/student-hobbies.component';
import { StudentInfoComponent } from './components/student-info/student-info.component';
import { StudentLanguageComponent } from './components/student-language/student-language.component';
import { CountComponent } from './components/count/count.component';
import { StudentFormComponent } from './components/student-form/student-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { CustomersComponent } from './features/customers/customers.component';
import { FattureComponent } from './features/fatture/fatture.component';
import { CustomerFormComponent } from './features/customers/components/customer-form/customer-form.component';
import { CustomerAddressPipe } from './features/customers/customer-address.pipe';
import { LoadingInterceptor } from './providers/loading.interceptor';
import { DelayInterceptor } from './providers/delay.interceptor';
import { FattureFormComponent } from './features/fatture/components/fatture-form/fatture-form.component';
import { LoggedGuard } from './services/guards/logged.guard';
import { isLoggedDirective } from './directives/isLogged.directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    StudentsComponent,
    StudentComponent,
    StudentHobbiesComponent,
    StudentInfoComponent,
    StudentLanguageComponent,
    CountComponent,
    StudentFormComponent,
    LoginComponent,
    CustomersComponent,
    FattureComponent,
    CustomerFormComponent,
    CustomerAddressPipe,
    FattureFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    isLoggedDirective,
    BrowserAnimationsModule,
  ],
  providers: [
    // L'ORDINE DEGLI INTERCEPTOR è FONDAMENTALE
    // provide DI tokens
    LoggedGuard,
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: DelayInterceptor, multi: true },
    // Auth Key interceptor
    // notification popup interceptor
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
