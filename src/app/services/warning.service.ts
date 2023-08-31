import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { StorageService } from './storage.service';
import { Warning } from '../models/warning';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WarningService {
  authToken: string | null = null
  userURL: string = "http://localhost:8080/api/warning";

  constructor(private authService: AuthService, private httpClient: HttpClient, private storageService: StorageService) {
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization':''
    })
  }

  createWarning(warning: Warning): Observable<any>{
    const createWarningURL = this.userURL + '/create';
    this.authToken = this.storageService.getData("token");

    if (this.authToken) {
      this.httpOptions.headers = this.httpOptions.headers.set('Authorization', 'Bearer ' + this.authToken);
    }
    
    return this.httpClient.post(createWarningURL, warning, this.httpOptions);
  }

  getAllByUserID(userId: string): Observable<Warning[]> {
    const getAllWarningURL = this.userURL + '/get/user/' + userId;
    this.authToken = this.storageService.getData("token");

    if (this.authToken) {
      this.httpOptions.headers = this.httpOptions.headers.set('Authorization', 'Bearer ' + this.authToken);
    }
    
    return this.httpClient.get<Warning[]>(getAllWarningURL, this.httpOptions);
  }

  deleteByID(warningId: string): Observable<string> {
    const deleteURL = this.userURL + '/delete/' + warningId;
    this.authToken = this.storageService.getData("token");

    if (this.authToken) {
      this.httpOptions.headers = this.httpOptions.headers.set('Authorization', 'Bearer ' + this.authToken);
    }
    
    return this.httpClient.delete<string>(deleteURL, this.httpOptions);
  }

  
}