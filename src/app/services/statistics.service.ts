import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Observable } from 'rxjs';
import { WasteStatistics } from '../models/waste-statistics';
import { StorageService } from './storage.service';
import { FeeStatistics } from '../models/fee-statistics';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  authToken: string | null = null
  trashUrl: string = "http://localhost:8081/api/trash";
  feeUrl: string = "http://localhost:8082/api/fee";

  constructor(private httpClient: HttpClient, private storageService: StorageService) {
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization':''
    })
  }

  // restituisce statistiche con spazzatura totale differenziata e non per la città
  getCityStatistics(year: number): Observable<WasteStatistics>{
    const cityStatisticsURL = this.trashUrl + '/statistics/city/' + year;

    this.authToken = this.storageService.getData("token");
    if (this.authToken) {
      this.httpOptions.headers = this.httpOptions.headers.set('Authorization', 'Bearer ' + this.authToken);
    }

    return this.httpClient.get<WasteStatistics>(cityStatisticsURL, this.httpOptions);
  }

  // restituisce statistiche con spazzatura totale differenziata e non per l'utente
  getUserStatistics(userID: string, year: number): Observable<WasteStatistics>{
    const userStatisticsURL = this.trashUrl + '/statistics/user/' + userID + '/' + year;

    this.authToken = this.storageService.getData("token");
    if (this.authToken) {
      this.httpOptions.headers = this.httpOptions.headers.set('Authorization', 'Bearer ' + this.authToken);
    }

    return this.httpClient.get<WasteStatistics>(userStatisticsURL, this.httpOptions);
  }

  getSumAllofAllFeesByPayment(year: number, paid: number): Observable<FeeStatistics>{
    const allTaxesURL = this.feeUrl + '/statistics/paid/'+ year + '/' + paid;

    this.authToken = this.storageService.getData("token");
    if (this.authToken) {
      this.httpOptions.headers = this.httpOptions.headers.set('Authorization', 'Bearer ' + this.authToken);
    }

    return this.httpClient.get<FeeStatistics>(allTaxesURL, this.httpOptions);
  }

  getSumAllofAllUserFeesByPayment(userId: string, year: number, paid: number): Observable<FeeStatistics>{
    const allUserTaxesURL = this.feeUrl + '/statistics/user/paid/'+ userId + '/' + year + '/' + paid;

    this.authToken = this.storageService.getData("token");
    if (this.authToken) {
      this.httpOptions.headers = this.httpOptions.headers.set('Authorization', 'Bearer ' + this.authToken);
    }

    return this.httpClient.get<FeeStatistics>(allUserTaxesURL, this.httpOptions);
  }

  getAllUsersWasteStats(idList: string[], year: number): Observable<WasteStatistics[]>{
    const allWasteUserStatURL = this.trashUrl + '/statistics/user/all/' + year;

    this.authToken = this.storageService.getData("token");
    if (this.authToken) {
      this.httpOptions.headers = this.httpOptions.headers.set('Authorization', 'Bearer ' + this.authToken);
    }

    return this.httpClient.post<WasteStatistics[]>(allWasteUserStatURL, idList, this.httpOptions);
  }

}
