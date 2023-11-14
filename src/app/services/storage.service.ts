import { Injectable } from '@angular/core';
import { AuthResponse } from '../models/auth-response';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  public isUserLogged(){
    if(sessionStorage.getItem("logged")){
      return true;
    }
    return false;
  }

  public logInUser(authResponse: AuthResponse){
    sessionStorage.setItem("email", authResponse.email);
    sessionStorage.setItem("role", authResponse.role);
    sessionStorage.setItem("id", authResponse.id);
    sessionStorage.setItem("token", authResponse.token);
    sessionStorage.setItem("logged", "true");
  }

  public logOutUser(){
    sessionStorage.clear();
  }

  public saveData(key: string, value: string) {
    sessionStorage.setItem(key, value);
  }

  public getData(key: string) {
    return sessionStorage.getItem(key)
  }
  public removeData(key: string) {
    sessionStorage.removeItem(key);
  }

  public clearData() {
    sessionStorage.clear();
  }
}
