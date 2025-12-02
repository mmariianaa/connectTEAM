import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const _URL_TABLERO = 'http://localhost:3000/tablero';
const _URL_TAREAS = 'http://localhost:3000/tareas'; // ⚠️ Ajusta esta URL a tu backend real

@Injectable({ providedIn: 'root' })
export class TableroService {
  private baseUrl = 'http://localhost:3000/';
  constructor(private http: HttpClient) { }

  crearTablero(tablero: any): Observable<any> {
    return this.http.post(_URL_TABLERO, tablero);
  }
  actualizarTarea(tareaId: string, payload: any): Observable<any> {
    return this.http.put(`${_URL_TAREAS}/${tareaId}`, payload);
  }

  obtenerTableros(): Observable<any> {
    return this.http.get(_URL_TABLERO);
  }

  obtenerTablerosPorPropietario(propietarioId: string): Observable<any> {
    return this.http.get(`${_URL_TABLERO}/propietario/${propietarioId}`);
  }
  unirsePorCodigo(colaboradorId: string, codigoRandom: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/tablero/unirse`, {
      colaboradorId,
      codigoRandom
    });
  }
  

  obtenerTablerosPorColaborador(colaboradorId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/tablero/colaborador/${colaboradorId}`);
  }
  obtenerIntegrantesPorTablero(tableroId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/tablero/${tableroId}/integrantes`);
  }

  asignarTareas(tableroId: string, colaboradorId: string, tareas: string[]): Observable<any> {
    return this.http.post(`http://localhost:3000/tablero/${tableroId}/asignar_tareas`, {
      colaboradorId,
      tareas
    });
  }

  obtenerTareasPorTableroYColaborador(tableroId: string, colaboradorId: string): Observable<any> {
  return this.http.get(`${this.baseUrl}/tablero/${tableroId}/colaborador/${colaboradorId}/tareas`);
}





  
}





