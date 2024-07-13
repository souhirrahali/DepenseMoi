import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { StatsComponent } from './components/stats/stats.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { BaseURL } from './shared/baseUrl';
import { LogoutComponent } from './components/auth/logout/logout.component';
import { DepensesComponent } from './components/depenses/depenses.component';
import { HttpErrorInterceptor } from './services/http.interceptor';
import { RevenusComponent } from './components/revenus/revenus.component';
import { NgxPaginationModule } from 'ngx-pagination';




@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    LoginComponent,
    RegisterComponent,
    StatsComponent,
    DashboardComponent,
    AboutusComponent,
    LogoutComponent,
    DepensesComponent,
    RevenusComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ],
  providers: [
    { provide: 'BaseURL', useValue: BaseURL},
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
