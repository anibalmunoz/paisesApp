import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, delay, of, tap } from 'rxjs';
import { Country } from '../intefaces/pais-interface';
import { CountryCacheStorage } from '../intefaces/cache-store.interface';
import { Region } from '../intefaces/region.type';

@Injectable({
  providedIn: 'root',
})
export class PaisService {
  private apiUrl: string = 'https://restcountries.com/v2';

  public cacheStore: CountryCacheStorage = {
    byCapital: { term: '', countries: [] },
    byCountries: { term: '', countries: [] },
    byRegion: { region: '', countries: [] },
  };

  get httpParams() {
    return new HttpParams().set(
      'fields',
      'name,capital,alpha2Code,flags,population'
    );
  }

  constructor(private http: HttpClient) {
    console.log('construyendo el service>>>>>>>');
    this.loadFromLocalStorage();
  }

  private saveToLocalStorage() {
    localStorage.setItem('cacheStore', JSON.stringify(this.cacheStore));
  }

  private loadFromLocalStorage() {
    if (!localStorage.getItem('cacheStore')) return;
    this.cacheStore = JSON.parse(localStorage.getItem('cacheStore')!);
  }

  private getCountriesRequest(url: string): Observable<Country[]> {
    return this.http.get<Country[]>(url).pipe(
      catchError(() => of([]))
      // delay(1000)
    );
  }

  buscarPais(termino: string): Observable<Country[]> {
    return this._buscar(termino, 'name').pipe(
      tap(
        (paises) =>
          (this.cacheStore.byCountries = { term: termino, countries: paises })
      ),
      tap(() => this.saveToLocalStorage())
    );
  }

  buscarCapital(termino: string): Observable<Country[]> {
    return this._buscar(termino, 'capital').pipe(
      tap(
        (paises) =>
          (this.cacheStore.byCapital = { term: termino, countries: paises })
      ),
      tap(() => this.saveToLocalStorage())
    );
  }

  getPaisPorCodigo(id: string): Observable<Country> {
    const url = `${this.apiUrl}/alpha/${id}`;
    return this.http.get<Country>(url);
  }

  buscarRegion(region: Region): Observable<Country[]> {
    return this._buscar(region, 'region').pipe(
      tap(
        (paises) =>
          (this.cacheStore.byRegion = { region: region, countries: paises })
      ),
      tap(() => this.saveToLocalStorage())
    );
  }

  private _buscar(termino: string, endpoint: string) {
    const url = `${this.apiUrl}/${endpoint}/${termino}`;
    return this.getCountriesRequest(url);
  }
}
