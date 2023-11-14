import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MyAuthGuard } from './security/my-auth-guard.guard';
import { FormsModule } from '@angular/forms';
import { QRCodeModule } from 'angularx-qrcode';
import { NgChartsModule } from 'ng2-charts';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './components/home/home.component';
import { SidebarComponent } from './components/sidebars/sidebar/sidebar.component';
import { AdminMenuComponent } from './components/sidebars/admin-menu/admin-menu.component';
import { UserMenuComponent } from './components/sidebars/user-menu/user-menu.component';

import { ProfileComponent } from './components/profile/profile.component';
import { NavbarComponent } from './components/navbar/navbar.component'; // Instead of importing { clientId } from './path/to/module';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './services/user.service';
import { TaxComponent } from './components/tax/tax.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoadingComponent } from './components/loading/loading.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { PaymentsComponent } from './components/payments/payments.component';
import { CallbackComponent } from './components/callback/callback.component';
import { ToastComponent } from './components/toast/toast.component';
import Encrypter from './utils/encrypter';
import { ChartComponent } from './components/chart/chart.component';
import { WarnMainComponent } from './components/warning/warn-main/warn-main.component';
import { WarnUserComponent } from './components/warning/warn-user/warn-user.component';
import { WarnAdminComponent } from './components/warning/warn-admin/warn-admin.component';
import { AuthComponent } from './components/auth/auth.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SidebarComponent,
    AdminMenuComponent,
    UserMenuComponent,
    ProfileComponent,
    NavbarComponent,
    TaxComponent,
    DashboardComponent,
    LoadingComponent,
    ContactsComponent,
    PaymentsComponent,
    CallbackComponent,
    ToastComponent,
    ChartComponent,
    WarnMainComponent,
    WarnUserComponent,
    WarnAdminComponent,
    AuthComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    NgbModule,
    NgChartsModule,
    HttpClientModule,
    QRCodeModule,
    ScrollingModule
  ],
  providers: [
    MyAuthGuard,
    UserService,
    Encrypter
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
