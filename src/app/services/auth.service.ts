import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { Observable, catchError } from 'rxjs';
import { AuthResponse } from '../models/auth-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authURL: string = "http://localhost:8083/api/user/";
  applicationId: string = "O1fwrQULUYhvrKil6GhR3PV0X9Np3cT/2VgKMUvq8PFjRC0rNJJxIR8WYS/1tkuc";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':'application/json'
    })
  }

  constructor(private httpClient: HttpClient, private storageService: StorageService) { }

  signIn(email: string, password: string, role: string): Observable<AuthResponse>{
    const signInUrl = this.authURL + 'create';
    const body = {
      "email": email,
      "password": password,
      "applicationId": this.applicationId,
      "role": role
    }
    return this.httpClient.post<AuthResponse>(signInUrl, body, this.httpOptions)
      .pipe(
        catchError((error: any) => {
          console.error('An error occurred:', error);
          throw error; // Rethrow it back to the component
        })
      );
  }

  logIn(email: string, password: string): Observable<AuthResponse>{
    const logInUrl = this.authURL + 'login';
    const body = {
      "email": email,
      "password": password,
      "applicationId": this.applicationId,
    }
    return this.httpClient.post<AuthResponse>(logInUrl, body, this.httpOptions)
      .pipe(
        catchError((error: any) => {
          console.error('An error occurred:', error);
          throw error; // Rethrow it back to the component
        })
      );
  }

  deleteUser(token: string): Observable<String>{
    const deleteUrl = this.authURL + 'delete/' + token;
    
    return this.httpClient.delete<String>(deleteUrl, this.httpOptions)
      .pipe(
        catchError((error: any) => {
          console.error('An error occurred:', error);
          throw error; // Rethrow it back to the component
        })
      );
  }
}
