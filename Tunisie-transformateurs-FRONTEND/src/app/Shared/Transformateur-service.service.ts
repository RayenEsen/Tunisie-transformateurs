import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Transformateur } from './Transformateur-service.model';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TransformateurServiceService {

  url: string = environment.apiBaseUrl + '/Transformateurs';
  list: Transformateur[] = [];

  constructor(private http: HttpClient) { }

  getTransformateurAndItsPvs(): Observable<Transformateur[]> {
    const getUrl = `${this.url}/AllTransformateursWithPv`;
    return this.http.get<Transformateur[]>(getUrl);
  }

  refreshList() {
    this.http.get(this.url)
      .subscribe({
        next: res => {
          this.list = res as Transformateur[];
        },
        error: err => { console.log(err) }
      });
  }

  refreshList2(): Observable<Transformateur[]> {
    return this.http.get<Transformateur[]>(this.url)
      .pipe(
        catchError(err => {
          console.error(err);
          return throwError(err);
        })
      );
  }

  AddTransformateur(transformateurAjouter: Transformateur): Observable<any> {
    // Return the observable from the HTTP POST request
    return this.http.post(this.url, transformateurAjouter);
  }
  GetTransformateur(transformerId: number) {
    const urlWithId = `${this.url}/${transformerId}`;

    this.http.get(urlWithId)
      .subscribe({
        next: res => {
          this.list = [res as Transformateur];
        },
        error: err => {
          console.log(err);
        }
      });
  }

  DeleteTransformateur(id: number): Observable<any> {
    return this.http.delete(`${this.url}/${id}`)
      .pipe(
        catchError(() => {
          console.error('Error deleting transformateur');
          return throwError(() => new Error('Error deleting transformateur'));
        })
      );
  }

  searchTransformateurs(searchTerm: string): Observable<Transformateur[]> {
    const searchUrl = `${this.url}/Search?searchTerm=${searchTerm}`;
    return this.http.get<Transformateur[]>(searchUrl);
  }

  UpdateTransformateur(id : number , UpdateTransformateur : Transformateur): Observable<any>
  {
    return this.http.put<Transformateur>(`${this.url}/${id}`,UpdateTransformateur);
  }

  filter(choix1: string, choix2: string): Observable<Transformateur[]> {
    const filterUrl = `${this.url}/Filter?choix1=${choix1}&choix2=${choix2}`;
    return this.http.get<Transformateur[]>(filterUrl);
  }


}
