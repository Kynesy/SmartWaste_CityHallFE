import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { Observable, catchError } from 'rxjs';
import { SignUpResponse } from '../models/sign-up-response';
import { LogInResponse } from '../models/log-in-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authURL: string = "http://localhost:8083/api/auth";
  applicationId: string = "O1fwrQULUYhvrKil6GhR3PV0X9Np3cT/2VgKMUvq8PFjRC0rNJJxIR8WYS/1tkuc";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':'application/json'
    })
  }

  constructor(private httpClient: HttpClient, private storageService: StorageService) { }

  signUp(username: string, email: string, password: string, role: string): Observable<SignUpResponse>{
    const signUpUrl = this.authURL + '/signup';
    const body = {
      "email": email,
      "password": password,
      "username": username,
      "role": role
    }
    return this.httpClient.post<SignUpResponse>(signUpUrl, body, this.httpOptions)
      .pipe(
        catchError((error: any) => {
          console.error('An error occurred:', error);
          throw error; // Rethrow it back to the component
        })
      );
  }

  logIn(username: string, password: string): Observable<LogInResponse>{
    const logInUrl = this.authURL + '/signin';
    const body = {
      "username": username,
      "password": password
    }
    return this.httpClient.post<LogInResponse>(logInUrl, body, this.httpOptions)
      .pipe(
        catchError((error: any) => {
          console.error('An error occurred:', error);
          throw error; // Rethrow it back to the component
        })
      );
  }

  deleteUser(token: string): Observable<String>{
    const deleteUrl = this.authURL + '/delete/' + token;
    
    return this.httpClient.delete<String>(deleteUrl, this.httpOptions)
      .pipe(
        catchError((error: any) => {
          console.error('An error occurred:', error);
          throw error; // Rethrow it back to the component
        })
      );
  }
}
