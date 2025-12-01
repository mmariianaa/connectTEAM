import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const _URL_TABLERO = 'http://localhost:3000/tablero';

@Injectable({ providedIn: 'root' })
export class TableroService {
  constructor(private http: HttpClient) {}

  crearTablero(tablero: any): Observable<any> {
    return this.http.post(_URL_TABLERO, tablero);
  }

  obtenerTableros(): Observable<any> {
    return this.http.get(_URL_TABLERO);
  }
}
