import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { _URL_LOGIN, _URL_REGISTER } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  constructor(private http: HttpClient) {}

  public login(email: string, password: string): Observable<any> {
    const data = { email, password };
    return this.http.post(_URL_LOGIN, data);
  }

  public register(email: string, password: string, role: string): Observable<any> {
    const data = { email, password, role };
    return this.http.post(_URL_REGISTER, data);
  }
}