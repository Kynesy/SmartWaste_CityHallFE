import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthResponse } from 'src/app/models/auth-response';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  email: string = '';
  password: string = '';
  role='USER';
  showPassword: boolean = false;

  constructor(private authService: AuthService, private storageService: StorageService, private router: Router){}

  async signIn() {
    if (this.isValidForm()) {
      try {
        const response = await this.authService.signIn(this.email, this.password, this.role).toPromise();
        if (response) {
          const authResponse: AuthResponse = response as AuthResponse;
          console.log('Sign In Successful:', authResponse);
          this.storageService.logInUser(authResponse);
          this.router.navigate(['/', 'home']);
        } else {
          console.error('Sign-in response is undefined');
          this.storageService.logOutUser();
        }
      } catch (error) {
        console.error('Error occurred during sign in:', error);
        this.storageService.logOutUser();
      }
    } else {
      console.log('Form is invalid');
    }
  }
  

  async logIn() {
    if (this.isValidForm()) {
      try {
        const response = await this.authService.logIn(this.email, this.password).toPromise();
        if (response) {
          const authResponse: AuthResponse = response as AuthResponse;
          console.log('Log In Successful:', authResponse);
          this.storageService.logInUser(authResponse);
          this.router.navigate(['/', 'home']);
        } else {
          console.error('Log In response is undefined');
          this.storageService.logOutUser();
        }
      } catch (error) {
        console.error('Error occurred during Log In:', error);
        this.storageService.logOutUser();
      }
    } else {
      console.log('Form is invalid');
    }

  }

  isValidForm() {
    return this.email && this.password;
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
