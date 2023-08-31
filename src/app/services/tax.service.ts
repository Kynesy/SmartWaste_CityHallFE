import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Fee } from '../models/fee';
import { Observable } from 'rxjs';
import { StorageService } from './storage.service';
import { WasteStatistics } from '../models/waste-statistics';

@Injectable({
  providedIn: 'root'
})
export class TaxService {
  getAllTaxesByPayment(arg0: number, arg1: number) {
    throw new Error('Method not implemented.');
  }
  authToken: string | null = null
  baseUrl: string = "http://localhost:8082/api/fee";

  constructor(private authService: AuthService, private httpClient: HttpClient, private storageService: StorageService) {
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization':''
    })
  }

  createAllTaxes(wasteStatList: WasteStatistics[]): Observable<Fee[]>{
    const createAllTaxesURL = this.baseUrl + '/create/all';

    this.authToken = this.storageService.getData("token");
    if (this.authToken) {
      this.httpOptions.headers = this.httpOptions.headers.set('Authorization', 'Bearer ' + this.authToken);
    }

    return this.httpClient.post<Fee[]>(createAllTaxesURL,wasteStatList, this.httpOptions);
  }

  getAllTaxes(): Observable<Fee[]>{
    const allTaxesURL = this.baseUrl + '/get/all';

    this.authToken = this.storageService.getData("token");
    if (this.authToken) {
      this.httpOptions.headers = this.httpOptions.headers.set('Authorization', 'Bearer ' + this.authToken);
    }

    return this.httpClient.get<Fee[]>(allTaxesURL, this.httpOptions);
  }

  getAllUserTaxes(userId: string): Observable<Fee[]>{
    const allUserTaxesURL = this.baseUrl + '/get/user/' + userId;

    this.authToken = this.storageService.getData("token");
    if (this.authToken) {
      this.httpOptions.headers = this.httpOptions.headers.set('Authorization', 'Bearer ' + this.authToken);
    }

    return this.httpClient.get<Fee[]>(allUserTaxesURL, this.httpOptions);
  }

  payTax(taxId: string): Observable<string>{
    const payTaxURL = this.baseUrl + '/pay/' + taxId;

    this.authToken = this.storageService.getData("token");
    if (this.authToken) {
      this.httpOptions.headers = this.httpOptions.headers.set('Authorization', 'Bearer ' + this.authToken);
    }

    return this.httpClient.post<string>(payTaxURL, null, this.httpOptions);
  }




}
