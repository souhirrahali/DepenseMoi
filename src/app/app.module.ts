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

import { BaseURL } from './shared/baseUrl';
import { LogoutComponent } from './components/auth/logout/logout.component';
import { DepensesComponent } from './components/depenses/depenses.component';
import { HttpErrorInterceptor } from './services/http.interceptor';
import { RevenusComponent } from './components/revenus/revenus.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ChartModule } from 'primeng/chart';
import { TableModule } from 'primeng/table';
import { CurrencyPipe } from '@angular/common';
import { ToolbarModule} from 'primeng/toolbar';
import { AvatarModule} from 'primeng/avatar';
import { MenuModule} from 'primeng/menu';
import { NgChartsModule } from 'ng2-charts';
import { ChartWrapperComponent } from './components/chart-wrapper/chart-wrapper.component';

import { BudgetComponent } from './components/budget/budget.component';
import { FooterComponent } from './components/footer/footer.component';
import { NotificationComponent } from './components/notification/notification.component';



@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    LoginComponent,
    RegisterComponent,
    StatsComponent,
    DashboardComponent,
    LogoutComponent,
    DepensesComponent,
    RevenusComponent,
    ChartWrapperComponent,
    FooterComponent,
    BudgetComponent,
    NotificationComponent
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    TableModule,
    ChartModule,
    ToolbarModule,
    AvatarModule,
    MenuModule,
    NgChartsModule
  ],
  providers: [CurrencyPipe,
    
    { provide: 'BaseURL', useValue: BaseURL},
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
