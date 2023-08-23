import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AuthModule } from '@auth0/auth0-angular';
import { MyAuthGuard } from './security/my-auth-guard.guard';
import { FormsModule } from '@angular/forms';
import { QRCodeModule } from 'angularx-qrcode';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './components/home/home.component';
import { SidebarComponent } from './components/sidebars/sidebar/sidebar.component';
import { AdminMenuComponent } from './components/sidebars/admin-menu/admin-menu.component';
import { UserMenuComponent } from './components/sidebars/user-menu/user-menu.component';
import { LoginButtonComponent } from './components/auth/login-button/login-button.component';

import { LogoutButtonComponent } from './components/auth/logout-button/logout-button.component';
import { ProfileComponent } from './components/profile/profile.component';
import { NavbarComponent } from './components/navbar/navbar.component'; // Instead of importing { clientId } from './path/to/module';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './services/user.service';
import { TaxComponent } from './components/tax/tax.component';
import { NotAuthorizedComponent } from './components/auth/not-authorized/not-authorized.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoadingComponent } from './components/loading/loading.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { PaymentsComponent } from './components/payments/payments.component';
import { WarningComponent } from './components/warning/warning.component';
import { CallbackComponent } from './components/callback/callback.component';
import { ToastComponent } from './components/toast/toast.component';
import Encrypter from './utils/encrypter';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SidebarComponent,
    AdminMenuComponent,
    UserMenuComponent,
    LoginButtonComponent,
    LogoutButtonComponent,
    ProfileComponent,
    NavbarComponent,
    TaxComponent,
    NotAuthorizedComponent,
    DashboardComponent,
    LoadingComponent,
    ContactsComponent,
    PaymentsComponent,
    WarningComponent,
    CallbackComponent,
    ToastComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    QRCodeModule,
    AuthModule.forRoot({
      domain: "smart-city-waste-management.eu.auth0.com",
      clientId: "LAHwz0bzECZDGI2bAzfzxgrK0LGen4AN",
      authorizationParams: {
        redirect_uri: window.location.origin + '/callback'
      }
    }),
  ],
  providers: [
    MyAuthGuard,
    UserService,
    Encrypter
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
