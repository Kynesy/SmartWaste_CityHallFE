import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { TaxComponent } from './components/tax/tax.component';


import { AuthGuard } from '@auth0/auth0-angular';
import { MyAuthGuard } from './security/my-auth-guard.guard';
import { NotAuthorizedComponent } from './components/auth/not-authorized/not-authorized.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { PaymentsComponent } from './components/payments/payments.component';
import { CallbackComponent } from './components/callback/callback.component';
import { WarnMainComponent } from './components/warning/warn-main/warn-main.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {path: 'home', component: HomeComponent},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'contacts', component: ContactsComponent},

  {path: 'admin/dashboard', component: DashboardComponent, canActivate: [MyAuthGuard], data: { requiredRole: 'ADMIN' }},
  {path: 'admin/tax', component: TaxComponent, canActivate: [MyAuthGuard], data: { requiredRole: 'ADMIN' }},
  {path: 'admin/payments', component: PaymentsComponent, canActivate: [MyAuthGuard], data: { requiredRole: 'ADMIN' }},
  {path: 'admin/warning', component: WarnMainComponent, canActivate: [MyAuthGuard], data: { requiredRole: 'ADMIN' }},

  {path: 'user/dashboard', component: DashboardComponent, canActivate: [MyAuthGuard], data: { requiredRole: 'USER' }},
  {path: 'user/payments', component: PaymentsComponent, canActivate: [MyAuthGuard], data: { requiredRole: 'USER' }},
  {path: 'user/warning', component: WarnMainComponent, canActivate: [MyAuthGuard], data: { requiredRole: 'USER' }},


  {path: 'unauthorized', component: NotAuthorizedComponent},
  {path: 'callback', component: CallbackComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
