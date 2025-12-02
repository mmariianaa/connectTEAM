import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { _URL_LOGIN, _URL_REGISTER } from '../config/config';
// ESTE APOARTADO LO IMPLENTE YO (MARIANA) PARA HACER EL LOGIN Y REGISTER
@Injectable({
  providedIn: 'root'
})
export class Auth {
  constructor(private http: HttpClient) {}

  public login(email: string, password: string): Observable<any> {
    const data = { email, password };
    return this.http.post(_URL_LOGIN, data);
  }

  public register(email: string, password: string, role: string, nombre: string): Observable<any> {
    const data = { email, password, role, nombre };
    return this.http.post(_URL_REGISTER, data);
  }
}