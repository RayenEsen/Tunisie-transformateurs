import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { EchauffementBT } from './EchaufementBT-service.model';

@Injectable({
  providedIn: 'root'
})
export class EchafementBTServiceService {

  url: string = environment.apiBaseUrl + '/EchauffementBTs';

  constructor(private http: HttpClient) { }

// Method to check or create an echauffement
checkOrCreateEchauffement(transformateurNumero: number, type: string): Observable<EchauffementBT[]> {
  return this.http.post<EchauffementBT[]>(`${this.url}/CheckOrCreate`, null, {
    params: {
      transformateurNumero: transformateurNumero.toString(),
      type: type
    }
  }).pipe(
    catchError(error => {
      console.error('Error:', error);
      return throwError(error);
    })
  );
}



updateEchauffement(echauffements: EchauffementBT[]): Observable<any> {
  return this.http.post<any>(`${this.url}/UpdateEchauffement`, echauffements).pipe(
    catchError(error => {
      console.error('Error:', error);
      return throwError(error);
    })
  );
}



}
