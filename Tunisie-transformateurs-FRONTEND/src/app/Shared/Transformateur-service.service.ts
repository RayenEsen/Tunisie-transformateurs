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

  refreshList() {
    this.http.get(this.url)
      .subscribe({
        next: res => {
          this.list = res as Transformateur[];
        },
        error: err => { console.log(err) }
      });
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
  UpdateTransformateur(id : number , UpdateTransformateur : Transformateur): Observable<any>
  {
    return this.http.put<Transformateur>(`${this.url}/${id}`,UpdateTransformateur);
  }
}
