import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { User } from '../models/user';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  authToken: string | null = null
  userURL: string = "http://localhost:8080/api/user/";

  constructor(private httpClient: HttpClient, private storageService: StorageService) {
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization':''
    })
  }

  existUser(userEmail: string): Observable<boolean>{
    const existUrl = this.userURL + 'exist/' + userEmail;
    this.authToken = this.storageService.getData("token");

    if (this.authToken) {
      this.httpOptions.headers = this.httpOptions.headers.set('Authorization', 'Bearer ' + this.authToken);
    }
    
    return this.httpClient.get(existUrl, this.httpOptions).pipe(
      map(() => true),
      catchError(() => {
        return of(false);
      })
    );
  }

  createUser(user: User): Observable<any> {
    const createUrl = this.userURL + 'create';
    this.authToken = this.storageService.getData("token");

    if (this.authToken) {
      this.httpOptions.headers = this.httpOptions.headers.set('Authorization', 'Bearer ' + this.authToken);
    }
    
    return this.httpClient.post(createUrl, user, this.httpOptions);
  }

  updateUser(user: User): Observable<any> {
    const updateUrl = this.userURL + 'update';
    this.authToken = this.storageService.getData("token");

    if (this.authToken) {
      this.httpOptions.headers = this.httpOptions.headers.set('Authorization', 'Bearer ' + this.authToken);
    }
    return this.httpClient.post(updateUrl, user, this.httpOptions);
  }

  deleteUser(userID: string): Observable<any>{
    const deleteUrl = this.userURL + 'delete/' + userID;
    this.authToken = this.storageService.getData("token");


    if (this.authToken) {
      this.httpOptions.headers = this.httpOptions.headers.set('Authorization', 'Bearer ' + this.authToken);
    }
    
    return this.httpClient.delete(deleteUrl, this.httpOptions);  
  }

  getUser(userID: string): Observable<User>{
    const getUserUrl = this.userURL + 'get/' + userID;
    this.authToken = this.storageService.getData("token");

    if (this.authToken) {
      this.httpOptions.headers = this.httpOptions.headers.set('Authorization', 'Bearer ' + this.authToken);
    }
    
    return this.httpClient.get<User>(getUserUrl, this.httpOptions).pipe(
      catchError((error: any) => {
        console.error('Error retrieving user:', error);
        throw error;
      })
    );  
  }

  getAllId(): Observable<string[]>{
    const getAllIdURL = this.userURL + 'id/all';
    this.authToken = this.storageService.getData("token");

    if (this.authToken) {
      this.httpOptions.headers = this.httpOptions.headers.set('Authorization', 'Bearer ' + this.authToken);
    }
    
    return this.httpClient.get<string[]>(getAllIdURL, this.httpOptions).pipe(
      catchError((error: any) => {
        console.error('Error retrieving all IDs:', error);
        throw error;
      })
    );  
  }

}
