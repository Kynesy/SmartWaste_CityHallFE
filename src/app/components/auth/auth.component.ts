import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LogInResponse } from 'src/app/models/log-in-response';
import { SignUpResponse } from 'src/app/models/sign-up-response';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  showLogIn: boolean | undefined = true;
  showSignUp: boolean | undefined;
  username: string = '';
  email: string = '';
  password: string = '';
  role='USER';
  showPassword: boolean = false;

  constructor(private authService: AuthService, private storageService: StorageService, private userService: UserService, private router: Router){}

  async signUp() {
    if (this.isValidForm()) {
      try {
        const response = await this.authService.signUp(this.username, this.email, this.password, this.role).toPromise();
        if (response) {
          const signUpResponse: SignUpResponse = response as SignUpResponse;
          console.log(signUpResponse.message +": " +signUpResponse.id);
          const user: User ={
            id: signUpResponse.id,
            username: this.username,
            email: this.email,
            role: this.role,
            name: '',
            surname: '',
            bdate: ''
          };

          this.userService.createUser(user).subscribe(
            () => {
              console.log("User created successfully");
            },
            (error) => {
              console.error("Error creating user: ", error);
            }
          );

          this.logIn();

        } else {
          console.error('Sign-up response is undefined');
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
        const response = await this.authService.logIn(this.username, this.password).toPromise();
        if (response) {
          const logInResponse: LogInResponse = response as LogInResponse;
          console.log('Log In Successful:', logInResponse);
          this.storageService.logInUser(logInResponse);
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

  createUser(user: User){
    this.userService.createUser(user);
  }

  isValidForm() {
    console.log(this.username);
    console.log(this.email);
    console.log(this.password);
    if(this.showLogIn){
      return this.username && this.password;
    }else{
      return this.username && this.email && this.password;
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
