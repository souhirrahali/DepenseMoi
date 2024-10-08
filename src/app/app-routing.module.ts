import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

import { AuthGuard } from './auth.guard';
import { LogoutComponent } from './components/auth/logout/logout.component';
import { DepensesComponent } from './components/depenses/depenses.component';
import { RevenusComponent } from './components/revenus/revenus.component';
import { StatsComponent } from './components/stats/stats.component';
import { BudgetComponent } from './components/budget/budget.component';
import { UserComponent } from './components/user/user.component';





const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'depenses', component: DepensesComponent, canActivate: [AuthGuard] },
  { path: 'revenus', component: RevenusComponent, canActivate: [AuthGuard] },
  { path: 'stats', component: StatsComponent, canActivate: [AuthGuard] },
  { path: 'budget', component: BudgetComponent, canActivate: [AuthGuard] },
  { path: 'user', component: UserComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: '/dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
