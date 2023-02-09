import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Country } from '../intefaces/pais-interface';

@Injectable({
  providedIn: 'root',
})
export class PaisService {
  private apiUrl: string = 'https://restcountries.com/v3.1';

  constructor(private http: HttpClient) {}

  buscarPais(termino: string): Observable<Country[]> {
    return this._buscar(termino, 'name');
  }

  buscarCapital(termino: string): Observable<Country[]> {
    return this._buscar(termino, 'capital');
  }

  getPaisPorCodigo(id: string): Observable<Country> {
    const url = `${this.apiUrl}/alpha/${id} `;
    return this.http.get<Country>(url);
  }

  private _buscar(termino: string, endpoint: string) {
    const url = `${this.apiUrl}/${endpoint}/${termino} `;
    return this.http.get<Country[]>(url);
  }
}
