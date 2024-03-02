import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EcuvageValues } from './EcuvageValues-service.model';
import { environment } from '../../environments/environment.development';
import { Observable, catchError, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EcuvageValuesServiceService {

  url: string = environment.apiBaseUrl + '/EcuvageValues';

constructor(private http : HttpClient) { }

AddEcuvageValues(ecuvageValuesAjouter : EcuvageValues): Observable<any>
{
  return this.http.post(this.url, ecuvageValuesAjouter);
}


getEcuvageValuesByTransformateurId(transformateurId: number): Observable<EcuvageValues[]> {
  const apiUrl = `${this.url}/ByTransformateur/${transformateurId}`;
  return this.http.get<EcuvageValues[]>(apiUrl).pipe(
    catchError(error => {
      console.error('Error getting EcuvageValues:', error);
      return throwError(error);
    })
  );
}
updateEcuvageValuesByTransformateurId(transformateurId: number, ecuvageValuesId: number, ecuvageValues: EcuvageValues): Observable<any> {
  const apiUrl = `${this.url}/UpdateByTransformateurId/${transformateurId}/${ecuvageValuesId}`;
  return this.http.put(apiUrl, ecuvageValues).pipe(
    catchError(error => {
      console.error('Error updating EcuvageValues:', error);
      return throwError(error);
    })
  );
}


}
