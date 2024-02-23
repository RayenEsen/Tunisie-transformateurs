import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Conseption } from './Conseption-service.model';
@Injectable({
  providedIn: 'root'
})
export class ConseptionServiceService {

  url: string = environment.apiBaseUrl + '/Conseptions';


constructor(public http : HttpClient) { }

addConseption(ConseptionAjouter: Conseption): Observable<any> {
  // Return the observable from the HTTP POST request
  return this.http.post(this.url, ConseptionAjouter);
}

  // Method to fetch Conseptions by Transformateur ID
  getConseptionsByTransformateur(transformateurId: number): Observable<any> {
    const url = `${this.url}/Transformateur/${transformateurId}`;
    return this.http.get(url)
      .pipe(
        catchError(error => {
          console.error('Error fetching conseptions by transformateur ID:', error);
          return throwError(error);
        })
      );
  }

}
