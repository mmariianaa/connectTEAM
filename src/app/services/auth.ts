import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { _URL_LOGIN } from '../config/config';
import { _URL_REGISTER } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  constructor(private http: HttpClient) {}

  public login(data:any): Observable<any> {
    return this.http.post(_URL_LOGIN, data);
  }
  public register(data:any): Observable<any> {
    return this.http.post(_URL_REGISTER, data);
  }
  
}
