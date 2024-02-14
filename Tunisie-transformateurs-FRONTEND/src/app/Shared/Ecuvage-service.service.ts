import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Ecuvage } from './Ecuvage-service.model';

@Injectable({
  providedIn: 'root'
})
export class EcuvageServiceService {

  url: string = environment.apiBaseUrl + '/Ecuvages';

constructor(private http: HttpClient) { }

AddEcuvage(EcuvageAjouter: Ecuvage): Observable<any> {
  // Return the observable from the HTTP POST request
  return this.http.post(this.url, EcuvageAjouter);
}

getEcuvageByTransformateurId(transformateurId: number): Observable<Ecuvage[]> {
  const apiUrl = `${this.url}/ByTransformateur/${transformateurId}`;
  return this.http.get<Ecuvage[]>(apiUrl);
}

UpdateListEcuvage(Ecuvages: Ecuvage[]): Observable<any> {
  const apiUrl = `${this.url}/UpdateList`;
  // Send a PUT request to the UpdateList endpoint with the list of Bobinage entities
  return this.http.put(apiUrl, Ecuvages);
}


}
